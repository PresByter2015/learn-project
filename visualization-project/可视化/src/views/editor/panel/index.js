import React, { Component } from 'react'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import { Tabs } from 'antd'
import { setCoords } from 'store/editor/actions'
import { fetchDataSources } from 'store/data-source/actions'
const TabPane = Tabs.TabPane
import DataSetSetting from './data-set-setting'
import StyleSetting from './style-setting'
import NotSupportSetting from './NotSupportSetting'
import intl from 'src/intl'

class Panel extends Component {
  static propTypes = {
    height: React.PropTypes.number,
    style: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    widget: React.PropTypes.object,
    activeWidgetId: React.PropTypes.string,
    visible: React.PropTypes.bool
  }

  constructor() {
    super()
    this.state = {
      widgetDropdownVisible: false
    }
  }

  onTabChange(key) {
    // tab 为 data-set-setting 时，获取数据集的数据
    if (key === 'data-set-setting') {
      this.props.dispatch(fetchDataSources())
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setCoords('panel', { width: 0 }))
  }

  componentDidMount() {
    this.props.dispatch(setCoords('panel', { width: findDOMNode(this).offsetWidth }))
  }

  toggleWidgetDropdown() {
    this.setState({
      widgetDropdownVisible: this.state.widgetDropdownVisible ? false : true
    })
  }

  render() {
    let className = 'panel expand'
    let height = this.props.height - 65
    let { activeWidgetId, widget } = this.props
    let chartConfig = {}

    if (activeWidgetId && widget) {
      if (widget.chart) {
        let chart = widget.chart
        chartConfig = {
          klass: chart.klass,
          type: chart.type,
          theme: chart.theme
        }
      }
    }

    let style = {
      height: this.props.height
    }
    style.display = this.props.visible ? 'block' : 'none'

    return (
      <div className={className} style={style}>
        <Tabs defaultActiveKey="data-set-setting" onChange={this.onTabChange.bind(this)}>
          <TabPane tab={ intl.formatMessage({ id: 'data configuration', defaultMessage: '数据配置' }) } 
            key="data-set-setting">
            {
              this.props.activeWidgetId && chartConfig.type === 'edge'
                ? <NotSupportSetting />
                : <DataSetSetting widgetId={this.props.activeWidgetId}
                  chartConfig={chartConfig}
                  data={this.props.widget && this.props.widget.dataSetting }
                  height={ height }/>
            }
            
          </TabPane>
          <TabPane tab={ intl.formatMessage({ id: 'graphics configuration', defaultMessage: '图形配置' }) } key="2">
            <StyleSetting height={ height }/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { activeWidgetId } = state.editor
  const { widgets } = state.window

  return {
    activeWidgetId,
    widget: widgets[activeWidgetId]
  }
}

export default connect(mapStateToProps)(Panel)
