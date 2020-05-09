import React from 'react';
import { connect } from 'react-redux';
import Chart from 'components/chart';
import Charts from 'modules/chart/cache';
import { hex2rgb } from 'utils/hex2rgba';
import { prefix as urlPrefix } from 'config/urls';
import _ from 'lodash';
import Node from 'modules/canvas/node';
import { gridCoord2absCoord } from 'modules/canvas/util/grid';
import { updateIframeModal } from 'store/editor/actions';

const HANDLE_SHAPE_RADIUS = 3;
/**
 * Node
 */
let NodeComp = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func,
    id: React.PropTypes.oneOfType([
      React.PropTypes.number.isRequired,
      React.PropTypes.string.isRequired
    ]),
    type: React.PropTypes.string,
    theme: React.PropTypes.string,
    col: React.PropTypes.number.isRequired,
    row: React.PropTypes.number.isRequired,
    sizex: React.PropTypes.number.isRequired,
    sizey: React.PropTypes.number.isRequired,
    chart: React.PropTypes.object.isRequired,
    setting: React.PropTypes.object,
    dataSetting: React.PropTypes.object,
    styleSetting: React.PropTypes.object,

    active: React.PropTypes.bool.isRequired,
    baseWidth: React.PropTypes.number.isRequired,
    baseHeight: React.PropTypes.number.isRequired,
    scale: React.PropTypes.number,
    canOperate: React.PropTypes.bool.isRequired,

    eventHook: React.PropTypes.func,
    onNodeChange: React.PropTypes.func,
    onDestroy: React.PropTypes.func,
    isInner: React.PropTypes.bool.isRequired,
    content: React.PropTypes.string,
    name: React.PropTypes.string,

    tool: React.PropTypes.object, //来自状态树
    widgets: React.PropTypes.object
  },

  initElastic(props) {
    let nodeBox = Node.relativeDirectionPoints(gridCoord2absCoord({
      col: props.col,
      row: props.row,
      sizex: props.sizex,
      sizey: props.sizey
    }, props.baseWidth, props.baseHeight, props.scale), HANDLE_SHAPE_RADIUS);

    let controlPoints = {};
    let connectPoints = {};

    _.map(['nw', 'ne', 'se', 'sw'], function (direction) {
      controlPoints[direction] = nodeBox[direction];
    });
    _.map(['n', 'e', 's', 'w'], function (direction) {
      connectPoints[direction] = nodeBox[direction];
    });

    return {
      nodeBox: nodeBox,
      connectPoints: connectPoints,
      controlPoints: controlPoints
    };
  },

  getInitialState() {
    return this.initElastic(this.props);
  },

  componentWillReceiveProps(nextProps) {
    //col,row,sizex,sizey,baseWidth,baseHeight,scale 更新时需重计算
    let flag = (this.props.col !== nextProps.col || this.props.row !== nextProps.row
      || this.props.sizex !== nextProps.sizex || this.props.sizey !== nextProps.sizey
      || this.props.baseWidth !== nextProps.baseWidth || this.props.baseHeight !== nextProps.baseHeight);
    if (flag) {
      this.props.onNodeChange();
    }
    if (flag || this.props.scale !== nextProps.scale) {
      this.setState(this.initElastic(nextProps));
    }
  },

  // 处理删除组件
  handleDestroyWidget() {
    this.props.onDestroy(this.props.id, this.props);
  },

  handleClickWidget(e) {
    e.stopPropagation();

    if (!this.props.canOperate) {
      //处理模具交互事件
      let widget = this.props.widgets[this.props.id];
      if (widget && widget.styleSetting && widget.styleSetting.interact_click) {
        let action = widget.styleSetting.interact_type;
        let url = widget.styleSetting.interact_url;
        if (action && action.indexOf('webpage') >= 0) {
          if (url) {
            //展示iframe弹窗
            this.props.dispatch(updateIframeModal({
              visible: true,
              url: url
            }));
          }
        }
      }
      return;
    }

    this.props.eventHook(e, 'onClick', this.props, 'mold');
  },

  handleContextMenu(e) {
    e.preventDefault();
    this.props.eventHook(e, 'onContextMenu', this.props, 'mold');
  },

  // 注册图表
  register(id, chart) {
    Charts.add(id, chart);
  },

  parseInnerStyle(setting) {
    let style = {
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundClip: 'content-box',
      backgroundRepeat: 'no-repeat'
    };

    let {
      borderColor, borderSize, borderColorOpacity,
      backgroundType, backgroundColor, backgroundOpacity, backgroundImage
    } = setting;

    //border style
    borderSize = borderSize * this.props.scale;
    style.borderWidth = `${borderSize}px`;
    style.borderStyle = 'solid';
    if (borderColor) {
      style.borderColor = hex2rgb(borderColor, borderColorOpacity);
    } else {
      style.borderColor = 'transparent';
    }

    //background style
    if (backgroundType === 1) {
      style.backgroundColor = hex2rgb(backgroundColor, backgroundOpacity); //转换成rgba
    } else if (backgroundImage) {
      style.backgroundImage = `url(${urlPrefix}${backgroundImage})`;
    }

    return style;
  },

  parseStyle(setting) {
    let style = {
      position: 'absolute'
      // overflow: 'hidden' // 没发现问题的情况下去掉这个样式
    };

    if (!setting) {
      return style;
    }

    let { zIndex } = setting;

    style.zIndex = typeof zIndex === 'number'
      ? zIndex
      : 1;

    return style;
  },

  render() {
    let {
      col, row, sizex, sizey,
      type, theme, isInner, content, name,
      setting, baseWidth, baseHeight, active
    } = this.props;

    //this.props.chart.isInner = isInner
    //this.props.chart.content = content
    //因为不允许修改props
    let cloneObject = _.cloneDeep(this.props.chart);
    cloneObject.isInner = isInner;
    cloneObject.content = content;
    cloneObject.name = name;
    let { borderSize } = setting;
    let style = this.parseStyle(setting);
    let innerStyle = this.parseInnerStyle(setting);

    let scale = this.props.scale;
    // 部件的高度
    let widgetHeight = baseHeight * sizey;

    // 图表的宽高
    // let chartOptions=this.getChartOptions(setting)
    let chartProps = {};
    // 处理边框的缩放问题
    let border = 0;
    if (borderSize > 0) {
      border = Math.ceil(Math.ceil(borderSize * scale) / scale) * 2;
    }
    chartProps.width = baseWidth * sizex - border;
    //widgetHeight是在1920时的高，要减掉header在1920时的高才是实际的chart区域在1920时的高
    chartProps.height = widgetHeight - border;

    let widgetProps = {
      width: chartProps.width * scale,
      height: chartProps.height * scale
    };

    let transformProps = {
      x: (widgetProps.width - chartProps.width) / 2 / scale,
      y: (widgetProps.height - chartProps.height) / 2 / scale,
      scale: scale
    };

    return (
      <div ref="widget"
           id={`widget-${this.props.id}`}
           className='widget gs-w node'
           style={style}
           data-id={this.props.id}
           data-type={type} data-theme={theme}
           data-sizex={sizex} data-sizey={sizey}
           data-col={col} data-row={row}
           onClick={this.handleClickWidget}
           onContextMenu={this.handleContextMenu}>
        <div className="inner" style={innerStyle}>
          {this.props.chart
            ? <Chart {...cloneObject}
                     {...chartProps}
                     widgetId={this.props.id}
                     transformProps={transformProps}
                     dataSetting={this.props.dataSetting}
                     styleSetting={this.props.styleSetting}
                     scale={this.props.scale}
                     register={this.register}
                     klass={this.props.chart.klass}/>
            : null}
        </div>

        <div className="node-elastic-box" style={{
          width: this.state.nodeBox.coords.width,
          height: this.state.nodeBox.coords.height,
          left: 0, top: 0,
          display: active ? 'block' : 'none'
        }}/>
        {
          _.map(this.state.connectPoints, (p, d) => {
            let style = {
              width: 2 * HANDLE_SHAPE_RADIUS,
              height: 2 * HANDLE_SHAPE_RADIUS,
              left: p.x,
              top: p.y,
              display: this.props.tool.operate === 'broken'
              || this.props.tool.operate === 'straight' ? 'block' : 'none'
            };
            return (<div key={d} className={'node-connect-point ' + d}
                         data-direction={d} data-id={this.props.id} style={style}/>);
          })
        }

        {
          _.map(this.state.controlPoints, (p, d) => {
            let style = {
              width: 2 * HANDLE_SHAPE_RADIUS,
              height: 2 * HANDLE_SHAPE_RADIUS,
              left: p.x,
              top: p.y,
              display: active ? 'block' : 'none'
            };
            return <div key={d} className={'node-control-point gs-control-point ' + d} style={style}/>;
          })
        }

      </div>
    );
  }
});

const mapStateToProps = (state) => {
  let { tool } = state.editor;
  let { widgets } = state.window;

  return { tool, widgets };
};

export default connect(mapStateToProps)(NodeComp);
