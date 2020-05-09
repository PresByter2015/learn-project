import React, { Component, PropTypes } from 'react'
import intl from 'src/intl'
import { Form, Checkbox, Select } from 'antd'
import Input from 'components/form/Controls/Input'

const FormItem = Form.Item
const Option = Select.Option
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

class InteractComponent extends Component {
  static propTypes = {
    form: PropTypes.object,
    onChange: PropTypes.func,
    data: PropTypes.object
  }

  constructor() {
    super()
    this.state = {
      isChecked: false,
      actionType: 'webpage',
      url: ''
    }
  }

  componentWillMount() {
    this.setState({
      isChecked: this.props.data.interact_click,
      actionType: this.props.data.interact_type,
      url: this.props.data.interact_url
    })
  }

  handleCheckBoxChange(name, e) {
    if (e && e.target) {
      const value = e.target.checked
      this.props.onChange(name, value)
      this.setState({ isChecked: value })
    }
  }

  handleSelectChange(name, value) {
    this.setState({ actionType: value })
    this.props.onChange(name, value)
  }

  handleUrlChange() {
    setTimeout(() => {
      let value = this.props.form.getFieldValue('interactUrl')
      this.props.form.validateFields((errors) => {
        if (!!errors) {
          return
        } else {
          this.setState({ url: value })
          this.props.onChange('interact_url', value)
        }
      })
    }, 0)
  }

  checkUrl(rule, value, callback) {
    value = value.trim()
    if (value.length <= 0) {
      callback([new Error( intl.formatMessage({ id: 'the url address is not empty',
        defaultMessage: '地址不能为空' }) )])
    } else if (!/^https?:\/\/.+$/.test(value)) {
      callback([new Error( intl.formatMessage({ id: 'please enter the valid url address',
        defaultMessage: '请输入合法地址' }) )])
    } else {
      callback()
    }
  }

  componentWillReceiveProps(nextprops) {
    if (this.props.data !== nextprops.data) {
      this.setState({
        isChecked: nextprops.data.interact_click,
        actionType: nextprops.data.interact_type,
        url: nextprops.data.interact_url
      })
      this.props.form.resetFields()
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    let { isChecked, actionType, url } = this.state
    let formClass = isChecked ? 'show' : 'hide'

    return (
      <div>
        <FormItem {...formItemLayout} key={'click'}>
          <Checkbox onChange={ this.handleCheckBoxChange.bind(this, 'interact_click') }
            checked={ isChecked } defaultChecked={false}>
            { intl.formatMessage({ id: 'click', defaultMessage: '单击' }) }
          </Checkbox>
        </FormItem>

        <FormItem {...formItemLayout} key={'action'} className={formClass}
          label={ intl.formatMessage({ id: 'action', defaultMessage: '动作' })}>

          <Select onChange={ this.handleSelectChange.bind(this, 'interact_type') }
            placeholder={ intl.formatMessage({ id: 'please select the action', defaultMessage: '请选择动作' }) }
            defaultValue={ actionType } value={actionType}>

            <Option key='webpage' value='webpage'>
              { intl.formatMessage({ id: 'open the webpage', defaultMessage: '打开webpage' }) }
            </Option>

          </Select>
        </FormItem>

        <FormItem {...formItemLayout} key={'url'} className={formClass}
          label={ intl.formatMessage({ id: 'url', defaultMessage: '地址' })}>
          { getFieldDecorator('interactUrl', {
            initialValue: url,
            rules: [{ validator: this.checkUrl }]
          })(
            <Input placeholder={ intl.formatMessage({ id: 'please enter the url address', defaultMessage: '请输入地址' }) }
              name="url" onChange={this.handleUrlChange.bind(this)}/>
          )}
        </FormItem>
      </div>
    )
  }
}

InteractComponent = Form.create()(InteractComponent)

export default InteractComponent
