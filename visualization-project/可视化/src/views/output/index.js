import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { message } from 'antd';

import $ from 'jquery';
import { delay } from 'utils';
import delayRetry from 'utils/delay-retry';
import win from 'utils/window';
import Dom from 'utils/dom';
import DragDrop from 'modules/dragdrop';
import Snapshot from 'modules/snapshot';
import { Grid as GridConfig, Grids, GridPanelPadding } from 'config';
import { fetchDashboard, updateWindow, addWidget } from 'store/window/actions';
import { togglePreview, toggleFullScreen } from 'store/global/actions';

import { hex2rgb } from 'utils/hex2rgba';
import aspectRatio from 'utils/aspectRatio';

import GridStack from './gridstack';
// import Header from './header';
// import Grid from './grid';
// import Panel from './panel';
// import Widget from './widget';
// import NavPanel from './widget/nav-panel';
// import Tool from './tool';

// import SettingModal from './setting-modal';
// import WidgetDestroyModal from './WidgetDestroyModal';
// import IframeModal from './iframe-modal';

// import ColorPickerModal from 'components/color-picker/modal';
import DataPoller from 'modules/data-poller';
import Chart from 'modules/chart';

import event from './event';
import RecordManager from 'modules/records-change';

import browser from 'utils/browser';
// import * as constants from './constants';
import { getWidgetData } from './utils';
import { ChangeNavPanel } from 'store/editor/actions';

import SocketModule from 'modules/data-poller/socket';
import intl from 'src/intl';

import Charts from 'modules/chart/cache';
import _ from 'lodash';
import Grid from 'views/output/grid';

class Output extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    editor: React.PropTypes.object,
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    window: React.PropTypes.object,
    widget: React.PropTypes.object,
    widgets: React.PropTypes.object,
    bg: React.PropTypes.string,
    isPreview: React.PropTypes.bool,
    isFullScreen: React.PropTypes.bool,
    tool: React.PropTypes.object
  };

  constructor(props) {
    super(props);

    this.cols = GridConfig.cols || 12;
    this.rows = GridConfig.rows || 9;
    this.page = 'editor';

    this.state = {
      canOperate: false,
      gridSize: { width: 0, height: 0 },
      panelSize: { height: 0 },
      gridWrapSize: { width: 0, height: 0 },
      gridPadding: GridConfig.padding,
      gridPanelPadding: GridPanelPadding,
      // gridBoxMargin: 50,
      grid: { ...GridConfig },
      zoom: 1 // 表示画布的缩放等级 1-5
    };
  }

  getContainerWidth() {
    if (this.container) {
      return this.container.offsetWidth;
    }
    return document.documentElement.clientWidth;
  }

  getContainerHeight() {
    return document.documentElement.clientHeight;
  }

  // 计算尺寸
  calcSize() {
    let containerWidth = this.getContainerWidth();
    let containerHeight = this.getContainerHeight();
    let panelWidth = 0;
    let widgetWidth = 0;
    let headerHeight = 0;
    let publicHeaderHeight = 0;
    let { gridPanelPadding, gridPadding } = this.state;

    if (!this.props.user.canOperate) {
      panelWidth = 0;
      widgetWidth = 0;
    }

    if (this.props.isPreview) {
      gridPanelPadding = 0;
      gridPadding = 0;
      headerHeight = 0;
      panelWidth = 0;
      widgetWidth = 0;
    } else {
      containerHeight -= publicHeaderHeight;
    }

    let size = {
      width: containerWidth - panelWidth - gridPanelPadding - widgetWidth,
      height: containerHeight - headerHeight - gridPadding
    };

    if (this.props.isPreview) {
      size.width = document.documentElement.clientWidth;
      size.height = containerHeight;
    }

    // 计算 gridWrapSize 的尺寸
    let gridWrapSize = {
      width: this.getContainerWidth() - panelWidth - widgetWidth,
      height: this.getContainerHeight() - headerHeight - publicHeaderHeight
    };

    if (this.props.isFullScreen) {
      gridWrapSize.width = this.getContainerWidth();
      gridWrapSize.height = this.getContainerHeight();
    }

    return {
      gridWrapSize,
      panel: {
        height: this.getContainerHeight() - publicHeaderHeight - headerHeight
      }
    };
  }

  // 获取 grid 区域的尺寸
  getContentWrapSize() {
    let panelWidth = this.props.user.canOperate
      ? this.props.editor.panel.width
      : 0;

    return {
      width: this.getContainerWidth() - panelWidth,
      height: this.getContainerHeight()
    };
  }

  handlePreview() {
    if (!browser.msie || (browser.msie && browser.versionNumber > 10)) {
      this.props.dispatch(togglePreview(true));
      this.props.dispatch(toggleFullScreen(true));
    }
    this.redraw();
  }

  handleResolveFetchDashboard() {
  }

  onBeforeUnload(e) {
    const windowRecord = RecordManager.get('window');//获取窗口实例
    let changeData = windowRecord.getRecords();
    let changed = Object.keys(changeData).length > 0 ? true : false;
    //如果有改动则提示
    if (changed) {
      let dialogText = intl.formatMessage({ id: 'are you sure you leave?', defaultMessage: '确定离开吗?' });
      let event = e || window.event;
      event.returnValue = dialogText;
      return dialogText;
    }
  }

  listenWindowResize() {
    // 动态方法，防止路由切换无法移除 window resize
    /* eslint-disable react/no-did-mount-set-state */
    this.redraw = () => {
      let { grid, gridWrapSize, panel } = this.calcSize();
      let contentWrapSize = this.getContentWrapSize();
      this.setState({ gridSize: grid, gridWrapSize, panelSize: panel, contentWrapSize });
    };
    /* eslint-enable */
    win.on('resize', this.redraw);
  }

  componentWillMount() {
    let { id } = this.props.params;

    this.props.dispatch(fetchDashboard(id))
      .then(
        this.handleResolveFetchDashboard.bind(this), (res) => {
          if (res.errCode === 404) {
            message.error(res.message);
          }
        });


    this.snapshot = (id, callback) => {
      let $grid = $('.grid');

      Snapshot($('.grid-widget-list')[0], {
        width: $grid.width(),
        height: $grid.height()
      }).then((src) => {
        this.props.dispatch(updateWindow(id || this.props.window.id, {
          icon: src
        }));
        if (callback && typeof callback === 'function') {
          callback();
        }
      });
    };

    // 销毁数据集轮询
    DataPoller.destroy();
    event.on('editor.snapshot', this.snapshot);

    this.listenWindowResize();

    // 建立websocket连接
    if (!SocketModule.isConnect()) {
      SocketModule.connect();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(nextState.gridWrapSize.width <= 0 || nextState.gridWrapSize.height <= 0);
  }

  componentDidMount() {
    Dom.body.attr('data-page', 'output');
    this.container = findDOMNode(this.refs.container);
    delay(this.redraw.bind(this), 200);

    delayRetry(() => {
      return this.state.gridWrapSize.width;
    }, () => this.initDragDrop());

    //监听离开页面
    if (this.onBeforeUnload) {
      window.addEventListener('beforeunload', this.onBeforeUnload);
    }

    RecordManager.register('window');//注册窗口
  }

  componentWillUnmount() {
    win.removeListener('resize', this.redraw);
    event.removeListener('editor.snapshot', this.snapshot);

    //断开socket连接
    if (SocketModule.isConnect()) {
      SocketModule.disconnect();
    }

    Dom.body
      .removeClass('preview')
      .removeAttr('data-page');

    if (this.dragdrop) {
      this.dragdrop.destroy();
    }

    this.redraw = null;
    this.container = null;

    if (this.onBeforeUnload) {
      window.removeEventListener('beforeunload', this.onBeforeUnload);
    }

    const windowRecord = RecordManager.get('window');//获取窗口实例
    windowRecord.resetChange();//清除窗口记录修改的数据

    RecordManager.remove('window'); //移除注册的窗口

    Charts.clear();

    message.destroy();//全局清除message
  }

  // 初始化拖拽添加组件
  initDragDrop() {
    this.dragdrop = new DragDrop({
      drag: {
        elem: '.draggable',
        parentSelector: '.nav-panel',
        onStart: (event, elem) => {
          let cate = elem.getAttribute('data-cate');
          let type = elem.getAttribute('data-type');
          let theme = elem.getAttribute('data-theme');

          //模具才拥有的属性
          let isInner = elem.getAttribute('data-isInner');
          let moldContent = elem.getAttribute('data-moldContent');
          let moldName = elem.getAttribute('data-moldName');
          let moldTag = elem.getAttribute('data-moldTag');

          if (type && theme) {
            if (!_.isNull(isInner) && !_.isNull(moldContent) && !_.isNull(moldName) && !_.isNull(moldTag)) {
              event.dataTransfer.setData('Text',
                `${cate},${type},${theme},${isInner},${moldName},${moldTag},${moldContent}`
              );
            } else {
              event.dataTransfer.setData('Text', `${cate},${type},${theme}`);
            }
          }
        }
      },
      drop: {
        elem: '.grid',
        onDrop: (e, text) => {
          let { col, row } = this.refs.grid.getWidgetCoordsWithPosition({
            left: e.clientX,
            top: e.clientY
          });

          if (text) {
            let [cate, type, theme] = text.split(',');

            if (text.split(',').length > 3) {
              //模具组件
              let arg = /^([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),(.+)$/.exec(text);
              let [isInner, moldName, moldTag, moldContent] = [arg[4], arg[5], arg[6], arg[7]];
              isInner = isInner === 'true';

              this.addWidget(type, theme, col, row, cate, isInner, moldName, moldTag, moldContent);
            } else {
              this.addWidget(type, theme, col, row, cate);
            }
          }
        }
      }
    });
  }

  /**
   * 添加组件
   */
  addWidget(type, theme, col, row, cate, isInner, moldName, moldTag, moldContent) {
    let chart = Chart.get(type, theme);
    let size = Chart.getSize(type, theme);

    //模具数据合并到chart字段中
    if (moldContent) {
      chart = Object.assign({}, chart, {
        isInner: isInner,
        content: moldContent,
        name: moldName,
        tag: moldTag
      });
    }

    let widgetData = getWidgetData(chart, size, col, row,
      this.state.grid.cols,
      this.state.grid.rows,
      'drag');

    GridStack().then(gridStack => {
      this.props.dispatch(addWidget(this.props.window.id,
        Object.assign({}, widgetData)
      )).then(data => {
        let { id } = data;
        gridStack.addWidget(widgetData.sizex, widgetData.sizey, `#widget-${id}`, widgetData);
      });
    });
  }

  handleHideNavPanel() {
    this.props.dispatch(ChangeNavPanel({
      visible: false
    }));
  }

  handleZoom(zoom) {
    if (zoom < 1) {
      return;
    }
    this.setState({
      zoom: zoom
    });
  }

  componentWillReceiveProps(nextProps) {
    // 宽高比变动的情况下，需要重新设置 grid 的状态
    if (nextProps.window.screenRatio !== this.state.grid.screenRatio) {
      let ratio = nextProps.window.screenRatio;
      let grid = Grids[ratio];
      grid.ratio = ratio;
      grid.aspectRatio = ratio;
      grid.keepAspectRatio = nextProps.window.keepScreenRatio;
      this.setState({ grid });
    }
  }

  render() {
    let bg = this.props.window.bgType === 2 ? this.props.window.bg :
      hex2rgb(this.props.window.bgColor, this.props.window.bgColorOpacity);
    let { gridWrapSize, panelSize, canOperate } = this.state;

    let { isPreview } = this.props;
    if (this.props.user.canOperate) {
      // 预览状态下，不允许用户修改数据
      canOperate = !isPreview;
    } else {
      canOperate = false;
    }

    if (isPreview) {
      Dom.body.addClass('preview');
    } else {
      Dom.body.removeClass('preview');
    }

    let containerStyle = {
      position: 'relative',
      zIndex: 9,
      height: panelSize.height,
      overflow: 'hidden'
    };

    // 工具栏的样式
    let toolbarStyle = {};

    // 全屏
    if (this.props.isFullScreen) {
      // 全屏时占据整个窗口的高度
      containerStyle.height = this.getContainerHeight();

      // 计算 toolbar 的样式
      // gridWrap - gridBox 得出空白间距的值
      let gridBoxSize = aspectRatio(gridWrapSize.width,
        gridWrapSize.height,
        this.state.grid.ratio,
        this.state.grid.keepAspectRatio);
      toolbarStyle.marginTop = ((gridWrapSize.height - gridBoxSize.height) / 2 + 10);
      toolbarStyle.marginRight = ((gridWrapSize.width - gridBoxSize.width) / 2 + 15);
      // 全屏时加上头部的高度
      // containerStyle.height = panelSize.height + constants.PUBLIC_HEADER_HEIGHT + constants.WINDOW_HEADER_HEIGHT
    }

    let contentWrapStyle = {};
    if (!canOperate) {
      contentWrapStyle.marginLeft = 0;
    }

    return (
      <div className="page-output">
        <section ref="container" style={containerStyle}>
          <div className="editor-wrap">
            <div className="content-wrap" style={contentWrapStyle}>
              {(gridWrapSize.width && gridWrapSize.height) && (
                <Grid ref="grid" {...gridWrapSize}
                      cols={this.state.grid.cols}
                      rows={this.state.grid.rows}
                      _width={this.state.grid._width}
                      _height={this.state.grid._height}
                      zoom={this.state.zoom}
                      canOperate={canOperate}
                      isFullScreen={this.props.isFullScreen}
                      aspectRatio={this.state.grid.ratio}
                      keepAspectRatio={this.state.grid.keepAspectRatio}
                      window={this.props.window}
                      bg={bg}
                      tool={this.props.tool}
                />
              )}
            </div>
            {/*<Panel ref="panel" {...panelSize} visible={canOperate}/>*/}
          </div>
        </section>

        {/*<WidgetDestroyModal/>*/}

        {/*<SettingModal check={this.props.window.bgType}/>*/}

        {/*<ColorPickerModal/>*/}

        {/*<IframeModal/>*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { window, user, editor } = state;
  const { activeWidgetId, tool } = editor;

  return {
    user,
    editor,
    tool,
    isPreview: state.global.isPreview,
    isFullScreen: state.global.isFullScreen,
    window: window.window,
    widgets: window.widgets,
    widget: window.widgets[activeWidgetId]
  };
};

export default connect(mapStateToProps)(Output);
