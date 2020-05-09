import React, { Component } from 'react'
import { connect } from 'react-redux'
import NoopSetting from '../NoopSetting'
import { updateChartStyleSetting, updateChartSetting } from 'store/window/actions'
import eventEmitter from '../../event'
import Chart from 'modules/chart'
import StyleSettingForm from 'components/chart/StyleSettingForm'

import WidgetSetting from '../widget-setting'
import ChartOptionSettingItem from 'components/chart/chart-option-setting-item'
import MoldStyleSetting from './mold'
import intl from 'src/intl'

class GrapherSetting extends Component {
  static propTypes = {
    form: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    height: React.PropTypes.number,
    widget: React.PropTypes.object,
    activeWidgetId: React.PropTypes.string
  }

  constructor() {
    super()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeWidgetId !== this.props.activeWidgetId) {
      for (let key in this.refs) {
        if (key.includes('form')) {
          this.refs[key].resetFields()
        }
      }
    }
  }

  handleChartSettingChange(data) {
    let { widget } = this.props
    this.props.dispatch(updateChartSetting(widget.id, data))
  }

  handleChangeStyleSetting(name, value) {
    let { widget } = this.props
    this.props.dispatch(updateChartStyleSetting(widget.id, name, value))
    eventEmitter.emit('styleSettingChange', widget.id, { name, value })
  }

  render() {
    let { widget, activeWidgetId } = this.props
    let chart = null
    let component = null
    if (activeWidgetId && widget) {
      chart = widget.chart
      const { type, theme } = chart

      let SettingComponent = null
      let styleSetting

      //图形配置表单的字段配置来源于theme
      styleSetting = Chart.getConfig(type, theme)

      SettingComponent = (<StyleSettingForm
        id={activeWidgetId}
        config={styleSetting}
        data={this.props.widget.styleSetting}
        dataSetting={this.props.widget.dataSetting}
        onChange={this.handleChangeStyleSetting.bind(this)}
      />)
      if (type === 'mold') {
        SettingComponent = (
          <MoldStyleSetting
            id={ activeWidgetId }
            onChange={ this.handleChangeStyleSetting.bind(this) }
            data={ this.props.widget.styleSetting } />
        )
      }

      component = (
        <div className="chart-option-setting">
          {
            type === 'edge'
              ? null
              : <ChartOptionSettingItem title={ intl.formatMessage({ id: 'basic', defaultMessage: '基础' }) }>
                <WidgetSetting />
              </ChartOptionSettingItem>
          }

          { SettingComponent }
        </div>
      )
    } else {
      component = (<NoopSetting />)
    }

    return (
      <div className="grapher-setting setting-pane" style={{ height: this.props.height }}>
        {component}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { options } = state
  const { activeWidgetId } = state.editor
  const { widgets } = state.window

  return {
    options,
    activeWidgetId,
    widget: widgets[activeWidgetId]
  }
}

export default connect(mapStateToProps)(GrapherSetting)
