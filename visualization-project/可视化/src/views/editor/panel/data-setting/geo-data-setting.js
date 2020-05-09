import './index.styl'

import React from 'react'

import { Form , Select } from 'antd'
import _ from 'lodash'
import { FormattedMessage } from 'react-intl'

const FormItem = Form.Item
// const Option = Select.Option

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

export default React.createClass({
  propTypes: {
    form: React.PropTypes.object,
    data: React.PropTypes.object,
    theme: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    fields: React.PropTypes.array,
    widgetId: React.PropTypes.string
  },
  getInitialState() {
    let { series = [{}] } = this.props.data

    return {
      series: series
    }
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.data.series !== nextProps.data.series && _.isArray(nextProps.data.series)) {
      this.setState({
        series: nextProps.data.series
      })
    }

    if (this.props.widgetId !== nextProps.widgetId) {
      this.props.form.resetFields(['markType'])
    }
  },

  renderScatteSetting() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="geo-mark-setting">
        { _.map(this.state.series, (serie, index) => {
          return (
            <div key={index}>
              <FormItem {...formItemLayout} 
                label={ <FormattedMessage id="mark longitude" defaultMessage="标记点经度" /> }>
                {
                  getFieldDecorator(`series[${index}][lon]`, { initialValue: serie.lon })
                  (<Select placeholder={ <FormattedMessage id="please select the corresponding field for the series"
                    defaultMessage="请选择系列对应的字段" /> }
                  onSelect={this.handleChange}
                  notFoundContent={ <FormattedMessage id="no options available" defaultMessage="没有可用选项" /> } >
                    {this.props.fields}
                  </Select>)
                }
              </FormItem>
              <FormItem {...formItemLayout} 
                label={ <FormattedMessage id="mark latitude" defaultMessage="标记点纬度" /> } >
                {
                  getFieldDecorator(`series[${index}][lat]`, { initialValue: serie.lat })
                  (<Select placeholder={ <FormattedMessage id="please select the corresponding field for the series"
                    defaultMessage="请选择系列对应的字段" /> }
                  onSelect={this.handleChange}
                  notFoundContent={ <FormattedMessage id="no options available" defaultMessage="没有可用选项" /> } >
                    {this.props.fields}
                  </Select>)
                }
              </FormItem>
              <FormItem {...formItemLayout} 
                label={ <FormattedMessage id="mark the label" defaultMessage="标记点标签" /> } >
                {
                  getFieldDecorator(`series[${index}][scatterName]`, { initialValue: serie.scatterName })
                  (<Select placeholder={ <FormattedMessage id="please select the corresponding field for the series"
                    defaultMessage="请选择系列对应的字段" /> }
                  onSelect={this.handleChange}
                  notFoundContent={ <FormattedMessage id="no options available" defaultMessage="没有可用选项" /> } >
                    {this.props.fields}
                  </Select>)
                }
              </FormItem>
              <FormItem {...formItemLayout} 
                label={ <FormattedMessage id="mark the point value" defaultMessage="标记点值" /> } >
                {
                  getFieldDecorator(`series[${index}][scatterValue]`, { initialValue: serie.scatterValue })
                  (<Select placeholder={ <FormattedMessage id="please select the corresponding field for the series"
                    defaultMessage="请选择系列对应的字段" /> }
                  onSelect={this.handleChange}
                  notFoundContent={ <FormattedMessage id="no options available" defaultMessage="没有可用选项" /> } >
                    {this.props.fields}
                  </Select>)
                }
              </FormItem>
            </div>
          )
        }) }
      </div>
    )
  },

  renderLineSetting() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="geo-mark-setting">
        { _.map(this.state.series, (serie, index) => {
          return (
            <div key={index}>
              <FormItem {...formItemLayout} 
                label={ <FormattedMessage id="start point longitude" defaultMessage="起点经度" /> } >
                {
                  getFieldDecorator(`series[${index}][startLon]`, { initialValue: serie.startLon })
                  (<Select placeholder={ <FormattedMessage id="please select the corresponding field for the series"
                    defaultMessage="请选择系列对应的字段" /> }
                  onSelect={this.handleChange}
                  notFoundContent={ <FormattedMessage id="no options available" defaultMessage="没有可用选项" /> } >
                    {this.props.fields}
                  </Select>)
                }
              </FormItem>
              <FormItem {...formItemLayout} 
                label={ <FormattedMessage id="start point latitude" defaultMessage="起点纬度" /> } >
                {
                  getFieldDecorator(`series[${index}][startLat]`, { initialValue: serie.startLat })
                  (<Select placeholder={ <FormattedMessage id="please select the corresponding field for the series"
                    defaultMessage="请选择系列对应的字段" /> }
                  onSelect={this.handleChange}
                  notFoundContent={ <FormattedMessage id="no options available" defaultMessage="没有可用选项" /> } >
                    {this.props.fields}
                  </Select>)
                }
              </FormItem>
              <FormItem {...formItemLayout} 
                label={ <FormattedMessage id="start label" defaultMessage="起点标签" /> } >
                {
                  getFieldDecorator(`series[${index}][startName]`, { initialValue: serie.startName })
                  (<Select placeholder={ <FormattedMessage id="please select the corresponding field for the series"
                    defaultMessage="请选择系列对应的字段" /> }
                  onSelect={this.handleChange}
                  notFoundContent={ <FormattedMessage id="no options available" defaultMessage="没有可用选项" /> } >
                    {this.props.fields}
                  </Select>)
                }
              </FormItem>
              <FormItem {...formItemLayout} 
                label={ <FormattedMessage id="end point longitude" defaultMessage="终点经度" /> } >
                {
                  getFieldDecorator(`series[${index}][endLon]`, { initialValue: serie.endLon })
                  (<Select placeholder={ <FormattedMessage id="please select the corresponding field for the series"
                    defaultMessage="请选择系列对应的字段" /> }
                  onSelect={this.handleChange}
                  notFoundContent={ <FormattedMessage id="no options available" defaultMessage="没有可用选项" /> } >
                    {this.props.fields}
                  </Select>)
                }
              </FormItem>
              <FormItem {...formItemLayout} 
                label={ <FormattedMessage id="end point latitude" defaultMessage="终点纬度" /> } >
                {
                  getFieldDecorator(`series[${index}][endLat]`, { initialValue: serie.endLat })
                  (<Select placeholder={ <FormattedMessage id="please select the corresponding field for the series"
                    defaultMessage="请选择系列对应的字段" /> }
                  onSelect={this.handleChange}
                  notFoundContent={ <FormattedMessage id="no options available" defaultMessage="没有可用选项" /> } >
                    {this.props.fields}
                  </Select>)
                }
              </FormItem>
              <FormItem {...formItemLayout} 
                label={ <FormattedMessage id="end label" defaultMessage="终点标签" /> } >
                {
                  getFieldDecorator(`series[${index}][endName]`, { initialValue: serie.endName })
                  (<Select placeholder={ <FormattedMessage id="please select the corresponding field for the series"
                    defaultMessage="请选择系列对应的字段" /> }
                  onSelect={this.handleChange}
                  notFoundContent={ <FormattedMessage id="no options available" defaultMessage="没有可用选项" /> } >
                    {this.props.fields}
                  </Select>)
                }
              </FormItem>
              <FormItem {...formItemLayout} 
                label={ <FormattedMessage id="fly line value" defaultMessage="飞线值" /> } >
                {
                  getFieldDecorator(`series[${index}][LinesValue]`, { initialValue: serie.LinesValue })
                  (<Select placeholder={ <FormattedMessage id="please select the corresponding field for the series"
                    defaultMessage="请选择系列对应的字段" /> }
                  onSelect={this.handleChange}
                  notFoundContent={ <FormattedMessage id="no options available" defaultMessage="没有可用选项" /> } >
                    {this.props.fields}
                  </Select>)
                }
              </FormItem>
            </div>
          )
        }) }
      </div>
    )
  },

  renderHotSetting() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="geo-mark-setting">
        { _.map(this.state.series, (serie, index) => {
          return (
            <div key={index}>
              <FormItem {...formItemLayout} 
                label={ <FormattedMessage id="hot zone area" defaultMessage="热区区域" /> } >
                {
                  getFieldDecorator(`series[${index}][province]`, { initialValue: serie.province })
                  (<Select placeholder={ <FormattedMessage id="please select the corresponding field for the series"
                    defaultMessage="请选择系列对应的字段" /> }
                  onSelect={this.handleChange}
                  notFoundContent={ <FormattedMessage id="no options available" defaultMessage="没有可用选项" /> } >
                    {this.props.fields}
                  </Select>)
                }
              </FormItem>
              <FormItem {...formItemLayout} 
                label={ <FormattedMessage id="hot value" defaultMessage="热区值" /> } >
                {
                  getFieldDecorator(`series[${index}][hotValue]`, { initialValue: serie.hotValue })
                  (<Select placeholder={ <FormattedMessage id="please select the corresponding field for the series"
                    defaultMessage="请选择系列对应的字段" /> }
                  onSelect={this.handleChange}
                  notFoundContent={ <FormattedMessage id="no options available" defaultMessage="没有可用选项" /> } >
                    {this.props.fields}
                  </Select>)
                }
              </FormItem>
            </div>
          )
        }) }
      </div>
    )
  },

  handleChange() {
    setTimeout(() => {
      this.props.handleChange()
    })
  },

  render() {
    const theme = this.props.theme

    return (
      <div>
        { theme === 'scatter'
          ? this.renderScatteSetting()
          : theme === 'lines'
            ? this.renderLineSetting()
            : this.renderHotSetting() }
      </div>
    )

  }
})
