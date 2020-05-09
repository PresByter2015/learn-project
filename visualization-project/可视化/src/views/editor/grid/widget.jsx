import React from 'react';
import Chart from 'components/chart';
import { findDOMNode } from 'react-dom';
import Charts from 'modules/chart/cache';
import { hex2rgb } from 'utils/hex2rgba';
import { prefix as urlPrefix } from 'config/urls';

/**
 * Widget
 */
let Widget = React.createClass({
  propTypes: {
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
    onDestroy: React.PropTypes.func
  },

  getInitialState() {
    return {
      headerHeight: null
    };
  },

  getWidgetClassName() {
    let text = 'widget gs-w';

    if (this.props.active) {
      text += this.props.active ? ' active' : '';
    }

    if (!this.props.canOperate) {
      text += ' disabed';
    }

    return text;
  },

  componentDidMount() {
    this.el = findDOMNode(this);
    this.widgetTitle = findDOMNode(this.refs.widgetTitle);
    this.setHeaderState();
  },

  componentWillReceiveProps(nextProps) {
    let { fontSize, title } = this.props.setting;
    let { setting } = nextProps;

    // 标题、字体大小改变的时候，需要重新计算组件头部的高度
    if (setting.title !== title || setting.fontSize !== fontSize || nextProps.scale !== this.props.scale) {
      this.setHeaderState();
    }
  },

  setHeaderState() {
    setTimeout(() => {
      let rect = this.widgetTitle.getBoundingClientRect();
      this.setState({
        headerHeight: rect.height
      });
    }, 200);
  },

  handleClickWidget(e) {
    e.stopPropagation();
    if (!this.props.canOperate) {
      return;
    }
    this.props.eventHook(e, 'onClick', this.props, 'widget');
  },

  handleContextMenu(e) {
    e.preventDefault();
    this.props.eventHook(e, 'onContextMenu', this.props, 'widget');
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
    style.zIndex = typeof zIndex === 'number' ? zIndex : 1;
    // style.zIndex = typeof zIndex === 'number' ? zIndex : (window.topIndex + 1);

    return style;
  },

  parseFontStyle(setting) {
    let fontStyle = {};

    if (!setting) {
      return fontStyle;
    }

    let { fontSize, textColor, textColorOpacity } = setting;

    fontStyle.fontSize = `${fontSize}px`;
    fontStyle.color = hex2rgb(textColor, textColorOpacity);

    return fontStyle;
  },

  render() {
    let {
      col, row, sizex, sizey,
      type, theme,
      setting, baseWidth, baseHeight
    } = this.props;

    let { borderSize } = setting;
    let style = this.parseStyle(setting);
    let fontStyle = this.parseFontStyle(setting);
    let innerStyle = this.parseInnerStyle(setting);
    let scale = this.props.scale;

    // 部件的高度
    let widgetHeight = baseHeight * sizey;

    // 头部的高度
    let headerStyle = {};
    headerStyle.height = this.state.headerHeight;

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
    chartProps.height = widgetHeight - headerStyle.height / scale - border;

    let widgetProps = {
      width: chartProps.width * scale,
      height: chartProps.height * scale
    };

    let transformProps = {
      x: (widgetProps.width - chartProps.width) / 2 / scale,
      y: (widgetProps.height - chartProps.height) / 2 / scale,
      scale: scale
    };

    fontStyle.width = chartProps.width;
    //this.state.headerHeight是缩放后的高度
    let offsetHeight = this.state.headerHeight * (1 - 1 / scale) / 2 / scale;
    fontStyle.transform = 'scale(' + scale + ') translate(' + transformProps.x + 'px,' + offsetHeight + 'px)';

    return (
      <div ref="widget"
           id={`widget-${this.props.id}`}
           className={this.getWidgetClassName()}
           style={style}
           data-id={this.props.id}
           data-type={type} data-theme={theme}
           data-sizex={sizex} data-sizey={sizey}
           data-col={col} data-row={row}
           onClick={this.handleClickWidget}
           onContextMenu={this.handleContextMenu}>
        <div className="inner" style={innerStyle}>
          <header className="widget-header"
                  style={{ height: this.state.headerHeight }}>
            <div ref="widgetTitle" className="widget-title" style={fontStyle}>
              {this.props.setting.title}
            </div>
          </header>
          {this.props.chart
            ? <Chart {...this.props.chart}
                     {...chartProps}
                     widgetId={this.props.id}
                     transformProps={transformProps}
                     dataSetting={this.props.dataSetting}
                     styleSetting={this.props.styleSetting}
                     register={this.register}
                     klass={this.props.chart.klass}/>
            : null}
        </div>
        <span className="gs-resize-handle gs-control-point gs-resize-handle-both"/>
      </div>
    );
  }
});

export default Widget;
