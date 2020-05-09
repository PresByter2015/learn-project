import React from 'react'

import './dynamic-image.styl'

import { Form , Select } from 'antd'
import _ from 'lodash'
import intl from 'src/intl'
import { FormattedMessage } from 'react-intl'

import Upload from 'components/upload-image'

let notFoundContent = intl.formatMessage({ defaultMessage: '没有可用选项', id: 'no options available' })

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

export default React.createClass({
  propTypes: {
    conbinations: React.PropTypes.array,
    form: React.PropTypes.object,
    data: React.PropTypes.object,
    theme: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    fields: React.PropTypes.array,
    widgetId: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      conbinations: [1,2,3,4,5,6,7]
    }
  },
  getInitialState() {
    let { series = [] } = this.props.data

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
  },

  handleChange() {
    setTimeout(() => {
      this.props.handleChange()
    })
  },

  render() {

    const { getFieldDecorator } = this.props.form

    return (
      <div className="dynamic-image-setting">
        <FormItem {...formItemLayout}
          label={ intl.formatMessage({ id: 'status', defaultMessage: '状态' }) } >
          {
            getFieldDecorator('sequence', { initialValue: this.props.data.sequence })
            (<Select placeholder={ intl.formatMessage({ defaultMessage: '请选择值系列对应的字段',
              id: 'please select the field corresponding to the value series' }) }
            notFoundContent={ notFoundContent }
            onSelect={this.handleChange}>
              {this.props.fields}
            </Select>)
          }
        </FormItem>

        <div className="conbination-group">
          <FormItem {...formItemLayout}
            label={ <FormattedMessage id="normal" defaultMessage="正常" /> } >
            {
              getFieldDecorator('series[0]', {
                initialValue: this.state.series[0],
                valuePropName: 'uploadBg',
                trigger: 'onUploadSuccess'
              })
              (<Upload onUploadSuccess={this.handleChange} />)
            }
          </FormItem>
        </div>

        <div className="conbination-group">
          <FormItem {...formItemLayout}
            label={ <FormattedMessage id="error" defaultMessage="异常" /> } >
            {
              getFieldDecorator('series[1]', {
                initialValue: this.state.series[1],
                valuePropName: 'uploadBg',
                trigger: 'onUploadSuccess'
              })
              (<Upload onUploadSuccess={this.handleChange} />)
            }
          </FormItem>
        </div>

      </div>
    )

  }
})
