import React from 'react';
import { connect } from 'react-redux';
import Widget from './widget';
import NodeComp from './node';
import EdgeComp from './edge';
import { findDOMNode } from 'react-dom';
import { generateUUID } from 'utils/generate-uuid';
import Chart from 'modules/chart';
import _ from 'lodash';
import $ from 'jquery';
import Node from 'modules/canvas/node';
import { gridCoord2absCoord } from 'modules/canvas/util/grid';
import { calcLinePath, endDirection, didSelectLine } from 'modules/canvas/util/line';
import { isClosely, isInRect } from 'utils/math';
import { updateEdge, updateEdges } from 'store/window/actions';

const DIRS = ['n', 's', 'w', 'e'];

let Canvas = React.createClass({
  propTypes: {
    nodes: React.PropTypes.object,

    activeWidgetId: React.PropTypes.string,
    cellWidth: React.PropTypes.number.isRequired,
    cellHeight: React.PropTypes.number.isRequired,
    scale: React.PropTypes.number,
    canOperate: React.PropTypes.bool.isRequired,

    dispatch: React.PropTypes.func,
    eventHook: React.PropTypes.func,
    onDestroy: React.PropTypes.func,
    getWidget: React.PropTypes.func,

    tool: React.PropTypes.object, //来自状态树
  },

  getInitialState() {
    return {
      nodeInstances: this.getNodeInstances(this.props)
    };
  },

  getNodeInstances(props) {
    let nodeInstances = {};
    _.map(props.nodes, (node) => {
      //nodes中包含widget，mold以及edge
      if (node && Node.isTopoNode(node)) {
        //接近测试 节点池
        nodeInstances[node.id] = new Node(node.id,
          gridCoord2absCoord(node, props.cellWidth, props.cellHeight, 1));
      }
    });
    return nodeInstances; //以x,y,width,height表示的node，以及取各个坐标的方法
  },

  //接近测试
  approachWidget(point) {
    for (let id in this.state.nodeInstances) {
      for (let i = 0; i < DIRS.length; i++) {
        if (isClosely(point, this.state.nodeInstances[id][DIRS[i]], this.props.scale)) {
          return { id: id, direction: DIRS[i] };
        }
      }

      if (this.props.tool.operate === 'straight' && isInRect(point, this.state.nodeInstances[id].coords)) {
        return { id: id, direction: 'c' };
      }
    }
    return null;
  },

  handleNodeChange() {
    this.isNodeChange = true;
  },

  handleClickEdge(el, props, e) {
    let scale = props.scale;
    //相对edge
    let boundry = el.getBoundingClientRect();
    let mouseX = e.clientX - boundry.left;
    let mouseY = e.clientY - boundry.top;
    if (didSelectLine(props.points, mouseX, mouseY, scale)) {
      this.props.eventHook(e, 'onClick', props, 'edge');
      e.stopPropagation();
      return;
    }

    //相对画布
    let gridBoundry = $('.grid')[0].getBoundingClientRect();
    let mouseXX = e.clientX - gridBoundry.left;
    let mouseYY = e.clientY - gridBoundry.top;
    let point = { x: mouseXX / scale, y: mouseYY / scale };

    for (let id in this.props.nodes) {
      let edge = this.props.nodes[id];
      if (edge && id !== props.id && Node.isTopoEdge(edge)) { //是edge并且不是上面那个
        if (isInRect(point, edge)) { //点到edge里了
          boundry = $('.canvas-edge[data-id="' + edge.id + '"]')[0].getBoundingClientRect();
          mouseX = e.clientX - boundry.left;
          mouseY = e.clientY - boundry.top;
          if (didSelectLine(edge.points, mouseX, mouseY, scale)) {
            this.props.eventHook(e, 'onClick', edge, 'edge');
            e.stopPropagation();
            return;
          }
        }
      }
    }
  },

  componentDidMount() {
    let $el = $(findDOMNode(this));
    let startX = 0, startY = 0, endX = 0, endY = 0;
    let source = {}, target = {};

    let fuuid = 0;
    let chart = null;

    //创建一条新的edge
    this.linkMove = (e) => {
      let offset = $el.offset();
      endX = e.pageX - offset.left;
      endY = e.pageY - offset.top;

      target = {
        point: {
          x: endX / this.props.scale,
          y: endY / this.props.scale
        }
      };

      let endWidget = this.approachWidget(target.point);
      if (endWidget) {
        target.id = endWidget.id;
        target.direction = endWidget.direction;
        target.point = this.state.nodeInstances[endWidget.id][endWidget.direction];
        target.boundry = this.state.nodeInstances[endWidget.id].coords;
      } else {
        target.id = null;
        target.direction = endDirection(startX, startY, endX, endY);
        target.boundry = {
          x: target.point.x,
          y: target.point.y,
          width: 0, height: 0
        };
      }

      let edgeOption = calcLinePath(this.props.tool.operate, {
        src: source,
        dst: target
      });

      this.props.dispatch(updateEdge(_.merge({
        id: fuuid,
        chart: chart,
        line: this.props.tool.operate,
        source: source,
        target: target
      }, edgeOption.style, edgeOption.attr)));
    };

    $el.on('mousedown', '.node-connect-point', (e) => {
      if (this.props.tool.operate !== 'straight' && this.props.tool.operate !== 'broken') {
        return;
      }
      e.stopPropagation();
      fuuid = generateUUID(); //在连接点上按下时新建uuid
      chart = Chart.parseChartManual('edge');
      let $target = $(e.currentTarget);
      let id = $target.data('id');//是这个achor所属node的id
      let direction = $target.data('direction');
      let nodeInstance = this.state.nodeInstances[id];
      source = {
        id: id,
        point: nodeInstance[direction],
        direction: direction,
        boundry: nodeInstance.coords
      };
      startX = source.point.x;
      startY = source.point.y;
      $el.on('mousemove', this.linkMove);
    }).on('mousedown', '.node', (e) => {
      if (this.props.tool.operate !== 'straight') {
        return;
      }
      e.stopPropagation();
      fuuid = generateUUID(); //在连接点上按下时新建uuid
      chart = Chart.parseChartManual('edge');
      let $target = $(e.currentTarget);
      let id = $target.data('id');//是这个achor所属node的id
      let direction = 'c';
      let nodeInstance = this.state.nodeInstances[id];
      // TODO：现在是gridStack里面保存的位置不对，以后改正确了就可以从gridStack里取了爽歪歪
      // let gridStackCoords = this.props.getWidget(id).coords
      // let nodeInstanceCoords = nodeInstance.coords
      // console.log(gridStackCoords.x1, gridStackCoords.y1,
      //   nodeInstanceCoords.x, nodeInstanceCoords.y,
      //   gridStackCoords.x1 - nodeInstanceCoords.x, gridStackCoords.y1 - nodeInstanceCoords.y);
      source = {
        id: id,
        point: nodeInstance[direction],
        direction: direction,
        boundry: nodeInstance.coords
      };
      startX = source.point.x;
      startY = source.point.y;
      $el.on('mousemove', this.linkMove);
    }).on('mouseup', () => {
      $el.off('mousemove', this.linkMove);
    });
  },

  componentWillMount() {
    let nodeInstances = this.getNodeInstances(this.props);
    this.setState({ nodeInstances: nodeInstances }); //保证重拉的线起终点正确
  },

  /**
   * nodes(mold): 1, 2, 3, 4, 5, 6, 7
   * nodes(edge): 1: 1->3
   *              2: 1->4
   *              3: 2->5
   * 如何保证当edges涉及到的node发生变化时edge才重新计算
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.cellWidth !== nextProps.cellWidth
      || this.props.cellHeight !== nextProps.cellHeight
      || this.isNodeChange) {
      //TODO: 刚添加进的widget不能触发

      this.isNodeChange = false;

      let nodeInstances = this.getNodeInstances(nextProps);
      this.setState({ nodeInstances: nodeInstances }); //保证重拉的线起终点正确

      let edges = {};
      _.map(nextProps.nodes, (node) => {
        if (node && Node.isTopoEdge(node)) {
          let edge = node;

          let source = edge.source;
          let target = edge.target;

          if (!source || !target) {
            return;
          }

          if (source.id) {
            source = _.merge({}, source, {
              point: nodeInstances[source.id][source.direction],
              boundry: nodeInstances[source.id].coords
            });
          }

          if (target.id) {
            target = _.merge({}, target, {
              point: nodeInstances[target.id][target.direction],
              boundry: nodeInstances[target.id].coords
            });
          }

          let edgeOption = calcLinePath(edge.line, {
            src: source,
            dst: target
          });

          edge.points = null;
          edges[edge.id] = _.merge({}, edge, edgeOption.style, edgeOption.attr);
        }
      });

      this.props.dispatch(updateEdges(edges));
    } else if (Object.keys(nextProps.nodes).length !== Object.keys(this.props.nodes).length) {
      let nodeInstances = this.getNodeInstances(nextProps);
      this.setState({ nodeInstances: nodeInstances }); //添加新node
    }
  },

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        {_.map(this.props.nodes, (node, id) => {
          if (node && Node.isTopoEdge(node)) {
            let { x, y, width, height, chart, line, points, styleSetting } = node;
            return (<EdgeComp key={id} id={id} type={chart.type}
                              onClickEdge={this.handleClickEdge}
                              canOperate={this.props.canOperate}
                              scale={this.props.scale}
                              chart={chart} active={this.props.activeWidgetId === id}
                              styleSetting={styleSetting}
                              x={x} y={y} width={width} height={height}
                              line={line} points={points}/>);
          }
          return null;
        })}
        {_.map(this.props.nodes, (node, id) => {
          if (node && !Node.isTopoEdge(node)) {
            let { col, row, sizex, sizey, chart, setting, dataSetting, styleSetting } = node;
            if (Node.isTopoNode(node)) {
              return (<NodeComp key={id} id={id} type={chart.type} theme={chart.theme}
                                col={col} row={row} sizex={sizex} sizey={sizey}
                                chart={chart} setting={setting} dataSetting={dataSetting} styleSetting={styleSetting}
                                active={this.props.activeWidgetId === id}
                                scale={this.props.scale}
                                isInner={chart.isInner}
                                content={chart.content}
                                name={chart.name}
                                baseWidth={this.props.cellWidth}
                                baseHeight={this.props.cellHeight}
                                canOperate={this.props.canOperate}
                                onDestroy={this.props.onDestroy}
                                eventHook={this.props.eventHook}
                                onNodeChange={this.handleNodeChange}/>);
            } else {
              // console.log('id ==1== ', id);
              // console.log('setting =1= ', setting);
              //
              // if (setting && setting.zIndex) {
              //   zIndexs.push(setting.zIndex);
              // }

              return (<Widget key={id} id={id} type={chart.type} theme={chart.theme}
                              col={col} row={row} sizex={sizex} sizey={sizey}
                              chart={chart} setting={setting} dataSetting={dataSetting} styleSetting={styleSetting}
                              active={this.props.activeWidgetId === id}
                              scale={this.props.scale}
                              baseWidth={this.props.cellWidth}
                              baseHeight={this.props.cellHeight}
                              canOperate={this.props.canOperate}
                              onDestroy={this.props.onDestroy}
                              eventHook={this.props.eventHook}/>);
            }
          }
          return null;
        })}
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  const { tool } = state.editor;

  // console.log('zIndexs == ', zIndexs);
  // window.topIndex =

  return {
    tool
  };
};

export default connect(mapStateToProps)(Canvas);
