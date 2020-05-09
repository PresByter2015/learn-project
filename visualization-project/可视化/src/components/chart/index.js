import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import ChartFactory from 'modules/chart';
import delayRetry from 'utils/delay-retry';
import Converter from 'modules/converter';
import DataPoller from 'modules/data-poller';
import eventEmitter from '../../views/editor/event';
import { connect } from 'react-redux';
import { updateChartOption } from 'store/window/actions';

class Chart extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    klass: React.PropTypes.string.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    widgetId: React.PropTypes.string,
    active: React.PropTypes.bool,
    theme: React.PropTypes.string,
    type: React.PropTypes.string,
    option: React.PropTypes.object,
    transformProps: React.PropTypes.object,
    setting: React.PropTypes.object,
    dataSetting: React.PropTypes.object,
    styleSetting: React.PropTypes.object,
    register: React.PropTypes.func,
    scale: React.PropTypes.number,
    isInner: React.PropTypes.bool,
    content: React.PropTypes.string,
    name: React.PropTypes.string
  };

  constructor() {
    super();
    this.chart = null;
  }

  registerTask(config) {
    if (!config) {
      return;
    }

    // 如果有数据配置，注册到图表数据请求队列中
    if (config.id) {
      DataPoller.handleDataSet(this.props.dataSetting, this.props.widgetId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.chart) {
      this.chart.setOption(nextProps.option);
    }
    if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
      this.chart && this.chart.resize(nextProps);
    }
    if (this.props.active !== nextProps.active) {
      this.chart && this.chart.changeActiveStatus && this.chart.changeActiveStatus(nextProps.active);
    }
  }

  componentDidMount() {
    /**
     * 宽度和高度不小于零的时候才初始化图形
     * 在节点宽高不存在的情况下，echarts 会报警告
     */
    delayRetry(() => {
      return this.props.width > 0 && this.props.height > 0;
    }, () => {
      let chartNode = findDOMNode(this.refs.chart);
      if (chartNode && !this.chart) {
        let { klass, type, option, theme, scale } = this.props;
        this.chart = ChartFactory.create(klass, type, this.refs.chart, option, theme, this.props, scale);

        if (typeof this.props.register === 'function') {
          this.props.register(this.props.widgetId, this.chart);
        }

        if (this.props.styleSetting) {
          this.chart.setStyle(this.props.styleSetting);
        }

        if (this.props.dataSetting && this.props.dataSetting.id) {
          this.registerTask(this.props.dataSetting);
        } else {
          this.chart.render();
        }
      }
    });

    // 监听图表数据处理方法
    this.handlePoolChartDataHandler = (subscriber, data) => {
      // 数据必须提供一个 id 来标名请求的数据
      if (!data || !this.props.dataSetting ||
        !(this.props.dataSetting && this.props.dataSetting.id)) {
        return;
      }

      let { klass, type, theme } = this.props;
      let converter = new Converter(klass, type, theme, this.chart.pureOption);
      let parsedOption = converter.parse(data, subscriber.option.dataSet,
        subscriber.option.fields, false, this.chart.style.toObject());

      if (parsedOption && parsedOption.type && parsedOption.type === 'dynamicimage') {
        //动态图片组件更新option到状态树
        this.props.dispatch(updateChartOption(
          this.props.widgetId, parsedOption
        ));
      }

      if ('setData' in this.chart) {
        this.chart.setData(converter.partialOption, subscriber.option.dataSet);
      } else {
        let option = converter.merge(this.chart.option);
        if (option) {
          this.chart.setOption(option);
        }
      }
    };

    DataPoller.on(`pool.${this.props.widgetId}`, this.handlePoolChartDataHandler);

    eventEmitter.on('styleSettingChange', (id, data) => {
      if (this.chart && this.props.widgetId === id && data.name) {
        this.chart.setStyle(data.name, data.value, this.props.dataSetting);
      }
    });

    eventEmitter.on('moldBaseSettingChange', (id, data) => {
      if (this.chart && this.props.widgetId === id && data) {
        this.chart.setMoldBase(data);
      }
    });

    eventEmitter.on('moldBaseNameChange', (id, data) => {
      if (this.chart && this.props.widgetId === id && data) {
        this.chart.setMoldBaseName(data);
      }
    });
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    // 移除图表数据监听事件
    if (this.handlePoolChartDataHandler) {
      DataPoller.removeListener(`pool.${this.props.widgetId}`, this.handlePoolChartDataHandler);
    }
  }

  getChartStyle(style) {
    return style;
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.width < 0 || nextProps.heigth < 0) {
      return false;
    }
    return true;
  }

  render() {
    let { width, height, transformProps } = this.props;
    let chartStyle = this.getChartStyle({ width, height });

    if (transformProps) {
      chartStyle.transform = 'scale(' + transformProps.scale
        + ') translate(' + transformProps.x + 'px, ' + transformProps.y + 'px)';
    }

    // 截屏功能依赖data-chart-klass属性
    return (
      <div className="chart" style={chartStyle}
           data-chart-klass={this.props.klass}
           data-chart-type={this.props.type}
           data-chart-theme={this.props.theme}>
        <div ref="chart"/>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Chart);
