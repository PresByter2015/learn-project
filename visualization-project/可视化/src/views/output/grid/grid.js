import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import delayRetry from 'utils/delay-retry';
import { deepCopy } from 'utils/serialize';
import { prefix as urlPrefix } from 'config/urls';
import GridStack from '../gridstack';
import event from '../event';
import Canvas from './canvas';
import GridCellList from './cell-list';
import ContextMenu from './context-menu';
import computeLayerZindex from 'utils/computeLayerZindex';

import Keyboard from '../keyboard';
import DestroyModal from './DestroyModal';

import { calculateZoom } from 'utils/font-resize';
import {
  setCloneWidgetId,
  destroyWidget,
  addWidget,
  updateWidget,
  destroyWidgets
} from 'store/window/actions';
import { changeActiveWidget, updateIframeModal } from 'store/editor/actions';

class Grid extends Component {
  static propTypes = {
    canOperate: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
    cols: React.PropTypes.number,
    rows: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    _width: React.PropTypes.number,
    _height: React.PropTypes.number,
    widgets: React.PropTypes.object,
    bg: React.PropTypes.string,
    bgType: React.PropTypes.number,
    windowId: React.PropTypes.string,
    aspectRatio: React.PropTypes.string,
    cloneWidgetId: React.PropTypes.string,
    tool: React.PropTypes.object,
    activeWidgetId: React.PropTypes.string,
    iframeModal: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.isLink = props.tool.operate === 'straight' || props.tool.operate === 'broken';
    this.state = {
      isShowCellList: false,
      widgetMargins: [0, 0],
      contextMenu: {
        visible: false,
        position: { left: 0, top: 0 }
      },
      destroyModal: {
        visible: false
      },
      activeWidget: null,
      activeWidgetId: null
    };
  }

  getWidget(id) {
    return this.gridStack.getWidget(id);
  }

  moveWidget(dir) {
    let { activeWidgetId } = this.state;

    if (activeWidgetId && dir) {
      let widget = this.props.widgets[activeWidgetId];

      GridStack().then(gridstack => {
        let { id, col, row, sizex, sizey } = widget;
        let data = gridstack.moveWidget(id, col, row, sizex, sizey, dir);
        this.props.dispatch(updateWidget(id, data));
      });
    }
  }

  // 粘贴组件
  pasteWidget(type) {
    if (!this.props.cloneWidgetId) {
      return;
    }

    let widgetData = deepCopy(this.props.widgets[this.props.cloneWidgetId]);
    let colRow = {};

    // 跳过没有数据的组件
    if (!widgetData.id) {
      return;
    }

    delete widgetData.id;
    delete widgetData.buuid;

    // 快捷键方式
    if (type === 'keyboard') {
      colRow = this.gridStack.getCorrectColRow(widgetData.col + 1, widgetData.row + 1,
        widgetData.sizex, widgetData.sizey);
    }

    if (type === 'mouse') {
      let contextMenuRect = this.contextMenu.getBoundingClientRect();
      colRow = this.gridStack.getWidgetPosition({
        left: contextMenuRect.left,
        top: contextMenuRect.top
      }, {
        sizex: widgetData.sizex,
        sizey: widgetData.sizey
      });
    }

    Object.assign(widgetData, colRow);

    this.props.dispatch(addWidget(widgetData)).then(data => {
      this.gridStack.addWidget(widgetData.sizex, widgetData.sizey, `#widget-${data.id}`, widgetData);
    });
  }

  // 拷贝组件
  copyWidget(id) {
    return new Promise(resolve => {
      id = id || this.state.activeWidgetId;

      if (id) {
        this.props.dispatch(setCloneWidgetId(id)).then(() => {
          resolve();
        });
      }
    });
  }

  //复制并粘贴
  copyAndPasteWidget(id, type) {
    this.copyWidget(id).then(() => {
      this.pasteWidget(type);
      this.hideContextMenu();
    });
  }

  componentDidMount() {
    this.el = findDOMNode(this);
    this.contextMenu = findDOMNode(this.refs.contextMenu);

    this.initGridStack();

    //主要给工具栏提供删除部件、复制粘贴部件、置顶、置底等方法的调用
    event.on('destroyWidget', this.showDestroyModal, this);
    event.on('copyPasteWidget', this.copyAndPasteWidget, this);
    event.on('placeWidget', this.handleContextMenuSelect, this);
  }

  componentWillUnmount() {
    this.props.dispatch(changeActiveWidget(null));

    if (this.gridStack) {
      this.gridStack.destroy();
    }

    this.props.dispatch(destroyWidgets());

    //移除监听事件
    event.removeListener('destroyWidget', this.showDestroyModal, this);
    event.removeListener('copyPasteWidget', this.copyAndPasteWidget, this);
    event.removeListener('placeWidget', this.handleContextMenuSelect, this);
  }

  redrawGridStack(props) {
    let { cols, rows, width, height } = props;
    this.gridStack.redraw({
      cols, rows,
      width, height,
      widgetBaseDimensions: [
        width / cols - this.state.widgetMargins[0],
        height / rows - this.state.widgetMargins[1]
      ]
    });
  }

  componentWillReceiveProps(nextProps) {
    /**
     * 处理组件的重新绘制
     * 条件:
     * 1. width height 改变
     * 2. cols rows 改变
     */
    if (this.gridStack) {
      if ((nextProps.width !== this.props.width || nextProps.height !== this.props.height)
        || (nextProps.cols !== this.props.cols || nextProps.rows !== this.props.rows)) {
        this.redrawGridStack(nextProps);
        this.checkIsDisableGridStack();
        this.checkIframeModal();
      }
    }

    if (this.props.activeWidgetId !== nextProps.activeWidgetId) {
      this.setState({
        activeWidgetId: nextProps.activeWidgetId
      });
    }
    if (this.props.tool.operate !== nextProps.tool.operate) {
      if (nextProps.tool.operate === 'straight' || nextProps.tool.operate === 'broken') {
        this.gridStack.disable();
        this.isLink = true;
        this.props.dispatch(changeActiveWidget(null));
      } else {
        this.gridStack.enable();
        this.isLink = false;
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return !(nextProps.width < 0 || nextProps.height < 0);
  }

  initGridStack() {
    let initGridStack = () => {
      GridStack(this.el, {
        cols: this.props.cols,
        rows: this.props.rows,
        width: this.props.width,
        height: this.props.height,
        aspectRatio: this.props.aspectRatio,
        widgetBaseDimensions: [
          this.props.width / this.props.cols - this.state.widgetMargins[0], // - 20,
          this.props.height / this.props.rows - this.state.widgetMargins[1] // - 20
        ],
        resize: {
          onStart() {
          },
          onResize: (id, coords) => {
            let { sizex, sizey } = coords;
            this.props.dispatch(updateWidget(id, { sizex, sizey }));
          },
          onStop: (id, coords) => {
            let { sizex, sizey } = coords;
            this.props.dispatch(updateWidget(id, { sizex, sizey }));
          }
        },
        onDragStop: (id, data) => {
          this.props.dispatch(updateWidget(id, data));
        }
      }).then(gridStack => {
        this.gridStack = gridStack;
        this.checkIsDisableGridStack();
      });
    };

    // 宽度和高度大于 0 的情况下才初始化 GridStack
    delayRetry(() => {
      return this.props.width > 0 && this.props.height > 0;
    }, () => initGridStack());
  }

  checkIsDisableGridStack() {
    if (this.props.canOperate && !this.isLink) {
      this.gridStack.enable();
    } else {
      this.gridStack.disable();
    }
  }

  checkIframeModal() {
    if (this.props.canOperate) {
      if (this.props.iframeModal.visible) {
        //隐藏iframe弹窗
        this.props.dispatch(updateIframeModal({
          visible: false,
          url: ''
        }));
      }
    }
  }

  handleClickGrid(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.activeWidgetId) {
      this.setState({
        activeWidgetId: null
      });
      event.emit('editor.changeActiveWidget');
      this.props.dispatch(changeActiveWidget());
    }

    this.hideContextMenu();
  }

  handleWidgetDestroy() {
    let { activeWidgetId } = this.state;

    if (activeWidgetId) {
      // 如果销毁的组件 id 和 拷贝的组件 id 一样，则删除拷贝的组件 id
      if (this.props.cloneWidgetId === activeWidgetId) {
        this.props.dispatch(setCloneWidgetId(null));
      }
      this.props.dispatch(destroyWidget(activeWidgetId))
        .then(() => {
          this.hideDestroyModal();
          this.props.dispatch(changeActiveWidget());
        });
    }
  }

  showDestroyModal(id, widget) {
    widget = widget || this.state.activeWidget;

    let { destroyModal } = this.state;
    destroyModal.visible = true;
    if (widget.setting && widget.setting.title) {
      destroyModal.title = widget.setting.title;
    } else {
      destroyModal.title = widget.chart.title;
    }

    this.setState({ destroyModal });
  }

  hideDestroyModal() {
    let { destroyModal } = this.state;
    destroyModal.visible = false;
    this.setState({ destroyModal });
  }

  // 处理 widget 的鼠标事件
  handleWidgetMouseEvent(event, eventType, data, type) {
    if (this.isLink) {
      return;
    }

    let state = {};
    state.activeWidget = data;
    state.activeWidgetId = data.id;

    if (eventType === 'onContextMenu') {
      // let widgets = this.gridStack.getCrossedWidget(data.id)
      this.showContextMenu(event, ['copy', 'paste']);
    }

    // 组件点击的时候隐藏 contextMenu
    if (eventType === 'onClick') {
      this.props.dispatch(changeActiveWidget(data.id, type));
      this.hideContextMenu();
    }

    this.setState(state);
  }

  hideContextMenu() {
    let { contextMenu } = this.state;
    contextMenu.visible = false;

    this.setState({ contextMenu });
  }

  // 显示 contextmenu
  showContextMenu(event/*, options*/) {
    let { contextMenu } = this.state;

    contextMenu.position.left = event.clientX;
    contextMenu.position.top = event.clientY;
    contextMenu.visible = true;

    this.setState({ contextMenu });
  }

  // 处理 contextMenu 选中时的事件
  handleContextMenuSelect(event, type) {
    let action = type;
    if (type !== 'copyAndPaste') {
      this.hideContextMenu();
    }

    if (action === 'top' || action === 'bottom') {
      // 获取交叉的组件
      let widgetId = this.state.activeWidgetId;
      let widgets = this.gridStack.getCrossedWidget(widgetId);
      let widget = this.gridStack.getWidget(widgetId);
      widgets = widgets.map(widget => {
        return { id: widget.id, zIndex: widget.getOption('zIndex') };
      });

      let zIndexObj = computeLayerZindex(widget.id, widget.getOption('zIndex'), widgets, type);

      // 有相互交叉的组件才能设置层级
      if (Object.keys(widgets).length) {
        let hasFloor = !!~widgets.findIndex(ele => !+ele.zIndex);
        //当前有存在zIndex为0 且操作为置底时
        if (hasFloor && action === 'bottom') {
          zIndexObj = { [widgetId]: 0 };
          widgets.forEach(ele => {
            this.props.dispatch(updateWidget(ele.id, {
              setting: {
                zIndex: +ele.zIndex + 1
              }
            }));
            this.gridStack.setWidgetsZIndex({ [ele.id]: +ele.zIndex + 1 });
          });
        }
        this.props.dispatch(updateWidget(widgetId, {
          
          setting: {
            zIndex: zIndexObj[widgetId]
          }

          // setting: {
          //   zIndex: `${zIndexObj[widgetId]}`
          // }
        }));

        this.gridStack.setWidgetsZIndex(zIndexObj);
      }
    }
  }

  // 获取z-index
  getTopIndex() {
    const widgets = this.props.widgets;
    let zIndexs = [];

    for (let one in widgets) {
      if (widgets[one] && widgets[one].setting && widgets[one].setting.zIndex) {
        zIndexs.push(widgets[one].setting.zIndex);
      }
    }

    if (zIndexs.length) {
      zIndexs.sort((a, b) => {
        return a > b;
      });

      window.topIndex = zIndexs[zIndexs.length - 1];
    }
  }

  /**
   * grid渲染时已经有了视窗的宽度和高度
   * @return {[type]} [description]
   */
  render() {
    //width、height是视窗的宽高
    let { width, height, cols, rows, _width, _height } = this.props;
    //单位格子表示的尺寸在 16:9(1920*1080) 或 4:3(1920*1440)
    let cellWidth = _width / cols;
    let cellHeight = _height / rows;

    const operate = this.props.tool.operate;

    let gridStyle = {
      position: 'relative',
      width: this.props.width,
      height: this.props.height,
      cursor: (operate === 'broken' || operate === 'straight') ? 'crosshair' : 'default'
    };

    let scale = calculateZoom(width, height, _width, _height);

    let gridWidgetListStyle = {
      width: 100 / scale + '%',
      height: 100 / scale + '%'
    };

    //画布背景图、背景色节点样式
    let gridBgStyle = {
      width: this.props.width,
      height: this.props.height,
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: '-999'
    };
    if (this.props.bgType === 2) {
      gridBgStyle.backgroundImage = `url(${urlPrefix}${this.props.bg})`;
      gridBgStyle.backgroundSize = 'cover';
      gridBgStyle.backgroundPosition = 'center';
    } else {
      gridBgStyle.background = `${this.props.bg}`;
    }

    let gridCellListStyle = {
      position: 'absolute',
      top: 0
    };

    //拖拽遮罩层样式
    let gridDragCoverStyle = {
      width: gridStyle.width,
      height: gridStyle.height,
      display: this.props.tool.operate === 'drag' ? 'block' : 'none'
    };

    this.getTopIndex();

    return (
      <div className="grid" style={gridStyle}
           data-cols={cols} data-rows={rows}
           onClick={this.handleClickGrid.bind(this)}>
        <div className="grid-drag-cover" style={gridDragCoverStyle}/>
        <div className="grid-widget-list" style={gridWidgetListStyle}>
          <div className="grid-bg" style={gridBgStyle}/>
          {this.props.widgets
            ? <Canvas nodes={this.props.widgets} activeWidgetId={this.state.activeWidgetId}
                      cellWidth={cellWidth} cellHeight={cellHeight} scale={scale}
                      canOperate={this.props.canOperate}
                      onDestroy={this.showDestroyModal.bind(this)}
                      eventHook={this.handleWidgetMouseEvent.bind(this)}
                      getWidget={this.getWidget.bind(this)}/>
            : null}
        </div>
        {this.props.canOperate && width > 0 && height > 0 ?
          <GridCellList style={gridCellListStyle}
                        visible={this.props.canOperate}
                        cols={cols} rows={rows}
                        width={width}
                        height={height}
          />
          : null}
        {/* 右键菜单 */}
        <ContextMenu ref="contextMenu"
                     container={this.el}
                     {...this.state.contextMenu}
                     onCopy={this.copyWidget.bind(this)}
                     onPaste={this.pasteWidget.bind(this)}
                     onCopyAndPaste={this.copyAndPasteWidget.bind(this)}
                     onDelete={this.showDestroyModal.bind(this)}
                     onSelect={this.handleContextMenuSelect.bind(this)}
        />
        { /* 键盘快捷键 */}
        <Keyboard
          widgetId={this.state.activeWidgetId}
          moveWidget={this.moveWidget.bind(this)}
          copyWidget={this.copyWidget.bind(this)}
          pasteWidget={this.pasteWidget.bind(this)}
          destroyWidget={this.showDestroyModal.bind(this)}
        />
        { /* */}
        <DestroyModal {...this.state.destroyModal}
                      ok={this.handleWidgetDestroy.bind(this)}
                      cancel={this.hideDestroyModal.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { cloneWidgetId, widgets, window } = state.window;
  const { activeWidgetId, iframeModal } = state.editor;

  return {
    widgets,
    cloneWidgetId,
    aspectRatio: window.screenRatio,
    activeWidgetId,
    iframeModal
  };
};

export default connect(mapStateToProps)(Grid);
