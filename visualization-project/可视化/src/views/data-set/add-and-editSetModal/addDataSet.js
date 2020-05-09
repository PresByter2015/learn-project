import intl from 'src/intl'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Select, Checkbox, Button, message } from 'antd'
import { dataSetTest, dataSetTestEdit } from 'store/data-set/actions'
import Input from 'components/form/Controls/Input'

let loginFailed = intl.formatMessage({ id: 'login failed', defaultMessage: '登录失败' })
let unableGetData = intl.formatMessage({ id: 'unable to get data', defaultMessage: '无法获取数据' })
let wrongAdress = intl.formatMessage({ id: 'wrong address', defaultMessage: '地址错误' })
let wrongUsernameOrPass = intl.formatMessage({ id: 'incorrect username or password', defaultMessage: '账号或密码错误' })

let msg = intl.formatMessage({ id: 'get data exceeds maximum', defaultMessage: '获取数据超过最大值' })


let sqlSentenceError = intl.formatMessage({ id: 'sql statement error', defaultMessage: 'SQL语句出错' })
let connectDbError = intl.formatMessage({ id: 'unable to connect to the database', defaultMessage: '连接数据库失败' })
let testConnectError = intl.formatMessage({ id: 'test connection error', defaultMessage: '测试连接出错' })
let tableOrViewNotExist = intl.formatMessage({ id: 'the table or view does not exist', defaultMessage: '表或视图不存在' })
let unknowError = intl.formatMessage({ id: 'unknown mistake', defaultMessge: '未知错误' })
let nameDataSet = intl.formatMessage({ id: 'please name the dataset', defaultMessage: '请为数据集命名' })
let nameDataSetWithLong = intl.formatMessage({ id: 'please name the dataset within 30 characters', 
  defaultMessage: '请为数据集命名，30个字符以内' })

let nextStep = intl.formatMessage({ id: 'next', defaultMessage: '下一步' })
let testConnection = intl.formatMessage({ id: 'test connection', defaultMessage: '测试连接' })
let dataSetAdress = intl.formatMessage({ id: 'data set address', defaultMessage: '数据集地址' })
let dataSetName = intl.formatMessage({ id: 'data set name', defaultMessage: '数据集名称' })
let _recentTime = intl.formatMessage({ id: 'recent time', defaultMessage: '最近时间' })
let _supportTimeQuery = intl.formatMessage({ id: 'time interval query', defaultMessage: '支持时间区间查询' })
let correctDataSetAddress = intl.formatMessage({ id: 'please enter the correct data set address',
  defaultMessage: '请填写正确的数据集地址' })

let _enterStartTimeParamName = intl.formatMessage({ id: 'please enter the start time parameter name', 
  defaultMessage: '请填写开始时间参数名称' })
let enterEndTimeParamName = intl.formatMessage({ id: 'please enter the end time parameter name', 
  defaultMessage: '请填写结束时间参数名称' })
let startTimeParamName = intl.formatMessage({ id: 'start time parameter name', defaultMessage: '开始时间参数名称' })
let endTimeParamName = intl.formatMessage({ id: 'end time parameter name', defaultMessage: '结束时间参数名称' })

/**
 * 为了sql语句输入框换行
 */

let sqlPlaceholder = `${
  intl.formatMessage({ id: 'sample: select*from test.', defaultMessage: '样例：select*from test；' }) }
${ intl.formatMessage({ id: 'tips: within 2000 characters.', defaultMessage: '提示：最多不超过2000个字符' }) }
`

const FormItem = Form.Item
const Option = Select.Option
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  },
}

class AddDataSet extends Component {
  static propTypes = {
    form: React.PropTypes.object,
    dispatch: React.PropTypes.func,

    testDataSet: React.PropTypes.func,
    recentTime: React.PropTypes.array,
    firNext: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onChangeNext: React.PropTypes.func,
    dataType: React.PropTypes.string,
    sourceId: React.PropTypes.string,
    id: React.PropTypes.string,
    setInfo: React.PropTypes.object,
    isEdit: React.PropTypes.bool,
    next: React.PropTypes.bool,
  }

  constructor(props) {
    super(props)

    this.state =  {
      apiNext: this.props.next,
      loading: false
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataType: nextProps.dataType,
      isEdit: nextProps.isEdit,
    })
  }

  // 提交新增数据集表单
  handleSubmit(e) {
    e.preventDefault()
  }

  onChange() {
    setTimeout(() => {
      this.setState({ apiNext:false })
      this.props.onChangeNext(false)
      let values = this.props.form.getFieldsValue()
      this.props.onChange(values)
    })
  }

  // 连接失败
  connectFailure(values, res, dataType, isEdit) {
    if (isEdit === false) {
      if (dataType === 'API Gateway') {
        this.props.form.setFields({
          url: {
            value: values.url,
            errors: (() => {
              if (res.errCode === 402) {
                return [new Error(loginFailed)]
              }
              if (res.errCode === 203) {
                return [new Error(msg)]
              }
              if (res.errCode === 404) {
                return [new Error(unableGetData)]
              }
              else {
                return [new Error(wrongAdress)]
              }
            })()
          }
        })
      }
      else if (dataType === 'API') {
        if (values.basicAuth) {
          this.props.form.setFields({
            userName: {
              value: values.userName,
              errors: (() => {
                if (res.errCode === 402) {
                  return [new Error(wrongUsernameOrPass)]
                }
              })()
            },
            password: {
              value: values.password,
              errors: (() => {
                if (res.errCode === 402) {
                  return [new Error(wrongUsernameOrPass)]
                }
              })()
            },
            url: {
              value: values.url,
              errors: (() => {
                if (res.errCode === 402) {
                  return
                }
                else if (res.errCode === 203) {
                  return [new Error(msg)]
                }
                else if (res.errCode === 404) {
                  return [new Error(unableGetData)]
                }
                else {
                  return [new Error(wrongAdress)]
                }
              })()
            }
          })
        } else {
          this.props.form.setFields({
            url: {
              value: values.url,
              errors: (() => {
                if (res.errCode === 402) {
                  return [new Error(loginFailed)]
                }
                else if (res.errCode === 203) {
                  return [new Error(msg)]
                }
                else if (res.errCode === 404) {
                  return [new Error(unableGetData)]
                }
                else {
                  return [new Error(wrongAdress)]
                }
              })()
            }
          })
        }
      }
      else {
        this.props.form.setFields({
          url: {
            value: values.url,
            errors: (() => {
              if (res.errCode === 402) {
                return [new Error(loginFailed)]
              }
              if (res.errCode === 203) {
                return [new Error(msg)]
              }
              if (res.errCode === 4005) {
                return [new Error(sqlSentenceError)]
              }
              if (res.errCode === 4007) {
                return [new Error(tableOrViewNotExist)]
              }
              if (res.errCode === 404) {
                return [new Error(unableGetData)]
              }
              else {
                return [new Error(unknowError)]
              }
            })()
          }
        })
      }
    }
    if (isEdit === true) {
      if (dataType === 'API Gateway') {
        this.props.form.setFields({
          url: {
            value: values.url,
            errors: (() => {
              if (res.errCode === 402) {
                return [new Error(loginFailed)]
              }
              else if (res.errCode === 203) {
                return [new Error(msg)]
              }
              else if (res.errCode === 404) {
                return [new Error(unableGetData)]
              }
              else {
                return [new Error(wrongAdress)]
              }
            })()
          }
        })
      }
      else if (dataType === 'API') {
        if (values.basicAuth) {
          this.props.form.setFields({
            userName: {
              value: values.userName,
              errors: (() => {
                if (res.errCode === 402) {
                  return [new Error(wrongUsernameOrPass)]
                }
              })()
            },
            password: {
              value: values.password,
              errors: (() => {
                if (res.errCode === 402) {
                  return [new Error(wrongUsernameOrPass)]
                }
              })()
            },
            url: {
              value: values.url,
              errors: (() => {
                if (res.errCode === 402) {
                  return
                }
                else if (res.errCode === 203) {
                  return [new Error(msg)]
                }
                else if (res.errCode === 404) {
                  return [new Error(unableGetData)]
                }
                else {
                  return [new Error(wrongAdress)]
                }
              })()
            }
          })
        } else {
          this.props.form.setFields({
            url: {
              value: values.url,
              errors: (() => {
                if (res.errCode === 402) {
                  return [new Error(loginFailed)]
                }
                else if (res.errCode === 203) {
                  return [new Error(msg)]
                }
                else if (res.errCode === 404) {
                  return [new Error(unableGetData)]
                }
                else {
                  return [new Error(wrongAdress)]
                }
              })()
            }
          })
        }
      }
      else {
        this.props.form.setFields({
          url: {
            value: values.url,
            errors: (() => {
              if (res.errCode === 203) {
                return [new Error(msg)]
              }
              if (res.errCode === 4001) {
                return [new Error(connectDbError)]
              }
              if (res.errCode === 4005) {
                return [new Error(sqlSentenceError)]
              }
            })()
          }
        })
      }
    }

  }

  // 测试连接接口
  testConnect(data, isEdit, id) {
    return new Promise((resolve, reject) => {
      isEdit === false ?
        this.props.dispatch(
          dataSetTest(data)
        )
          .then((res) => {
            if (res.errCode === 200) {
              this.setState({ apiNext: true })
              this.props.onChangeNext(true)
            }
            resolve(res)
          })
          .catch(res => {
            this.setState({ apiNext: false })
            this.props.onChangeNext(false)
            reject(res)
          }) :
        this.props.dispatch(
          dataSetTestEdit(data, id)
        )
          .then((res) => {
            if (res.errCode === 200) {
              this.setState({ apiNext: true })
              this.props.onChangeNext(true)
              this.setState({ loading: false })
            }
            resolve(res)
          })
          .catch(res => {
            this.setState({ apiNext: false })
            this.props.onChangeNext(false)
            this.setState({ loading: false })
            reject(res)
          })
    })
  }

  // 测试连接or验证
  testDataSet(dataType, isEdit) {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      }
      this.setState({ loading: true })
      // let values = this.props.form.getFieldsValue()
      if (isEdit === false) {
        values.id = this.props.sourceId

        if (values.supportTime === undefined) {
          values.supportTime = false
        }
        if (values.basicAuth === undefined) {
          values.basicAuth = false
        }
        this.testConnect(values, isEdit).then((res) => {
          if (res.errCode !== 200) {
            this.connectFailure(values, res, dataType, isEdit)
          }
          this.setState({ loading: false })
        })
          .catch(()=> {
            message.error(testConnectError)
            this.setState({ loading: false })
          })
      }
      if (isEdit === true) {
        delete values.id
        this.testConnect(values, isEdit, this.props.id).then((res) => {
          if (res.errCode !== 200) {
            this.connectFailure(values, res, dataType, isEdit)
            this.setState({ loading: false })
          }
        })
          .catch(()=> {
            message.error(testConnectError)
            this.setState({ loading: false })
          })
      }
    })
  }

  // 选择下拉組件
  getOptionsComponent(options) {
    if (!options) {
      return []
    }

    return options.map((item, index) => {
      let key = Object.keys(item)[0]

      return <Option key={index} value={key}>{item[key]}</Option>
    })
  }

  chooseTime() {
    this.onChange()
  }

  render() {
    const {
      getFieldDecorator
    } = this.props.form

    let { recentTime, setInfo } = this.props
    
    let recentTimeOptionsComponent = this.getOptionsComponent(recentTime)
    
    return (
      <div>
        {(() => {
          if (this.props.dataType === 'API Gateway') {
            return (
              <div className="clearfix">
                <Form horizontal onSubmit={ this.handleSubmit.bind(this) } className="add-form">
                  <FormItem {...formItemLayout} label={ dataSetName } hasFeedback>
                    {
                      getFieldDecorator('name', {
                        initialValue: setInfo.name,
                        rules: [{
                          required: true,
                          hasFeedback: true,
                          message: nameDataSet
                        }]
                      })(
                        <Input type="text" onChange={this.onChange.bind(this)}
                          placeholder={ nameDataSetWithLong } maxLength="30"/>
                      )
                    }
                  </FormItem>
        
                  <FormItem {...formItemLayout} label={ dataSetAdress } hasFeedback>
                    {
                      getFieldDecorator('url', {
                        initialValue: setInfo.url,
                        rules: [{
                          required: true,
                          hasFeedback: true,
                          message: correctDataSetAddress
                        }]
                      })(
                        <Input type="text" onChange={this.onChange.bind(this)} 
                          placeholder={ 
                            intl.formatMessage({ id: 'format', defaultMessage: '格式' }) + ':api/1.0/xxx' } />
                      )
                    }
                  </FormItem>

                  <FormItem {...formItemLayout} label={ _supportTimeQuery } >
                    {
                      getFieldDecorator('supportTime', { valuePropName: 'checked', initialValue: setInfo.supportTime })
                      (
                        <Checkbox onChange={this.onChange.bind(this)} className="supportTime" />
                      )
                    }
                  </FormItem>

                  { setInfo.supportTime === true ?
                    <div>
                      <FormItem {...formItemLayout} label={ startTimeParamName } className="ant-width" hasFeedback>
                        {
                          getFieldDecorator('startTime', {
                            initialValue: setInfo.startTime,
                            rules: [{
                              required: true,
                              hasFeedback: true,
                              message: _enterStartTimeParamName
                            }]
                          })(
                            <Input type="text" onChange={this.onChange.bind(this)} placeholder="startTime"/>
                          )
                        }
                      </FormItem>

                      <FormItem {...formItemLayout} label={ endTimeParamName } className="ant-width" hasFeedback>
                        {
                          getFieldDecorator('endTime', {
                            initialValue: setInfo.endTime,
                            rules: [{
                              required: true,
                              hasFeedback: true,
                              message: enterEndTimeParamName
                            }]
                          })(
                            <Input type="text" onChange={this.onChange.bind(this)} placeholder="endTime"/>
                          )
                        }
                      </FormItem>

                      <FormItem {...formItemLayout} label={ _recentTime } className="ant-width">
                        {
                          getFieldDecorator('recentTime', { initialValue: setInfo.recentTime })(
                            <Select onChange={this.chooseTime.bind(this)} >
                              { recentTimeOptionsComponent }
                            </Select>
                          )
                        }
                      </FormItem>
                    </div>
                    : null
                  }

                  <div className="btn-group-vertical">
                    <Button type="primary"
                      loading={this.state.loading}
                      onClick={this.testDataSet.bind(this, this.props.dataType, this.props.isEdit || false)}
                    >
                      { testConnection }
                    </Button>
                    <Button type="primary" onClick={this.props.firNext}
                      disabled={!this.state.apiNext}>
                      { nextStep }
                    </Button>
                  </div>

                </Form>
              </div>
            )
          }
          else if (this.props.dataType === 'API') {
            return (
              <div className="clearfix">
                <Form horizontal onSubmit={ this.handleSubmit.bind(this) } className="add-form">
                  <FormItem {...formItemLayout} label={ dataSetName } hasFeedback>
                    {
                      getFieldDecorator('name', {
                        initialValue: setInfo.name,
                        rules: [{
                          required: true,
                          hasFeedback: true,
                          message: nameDataSet
                        }]
                      })(
                        <Input type="text"
                          onChange={this.onChange.bind(this)}
                          placeholder={ nameDataSetWithLong } maxLength="30"/>
                      )
                    }
                  </FormItem>

                  <FormItem {...formItemLayout} label={ dataSetAdress } hasFeedback>
                    {
                      getFieldDecorator('url', {
                        initialValue: setInfo.url,
                        rules: [{
                          required: true,
                          hasFeedback: true,
                          message: correctDataSetAddress
                        }]
                      })(
                        <Input type="text" onChange={this.onChange.bind(this)} 
                          placeholder={ 
                            `${ intl.formatMessage({ id: 'format', defaultMessage: '格式' }) }:http://ip:port/xxx` } />
                      )
                    }
                  </FormItem>

                  <FormItem {...formItemLayout} label="Basic Auth" >
                    {
                      getFieldDecorator('basicAuth', { valuePropName: 'checked', initialValue: setInfo.basicAuth })(
                        <Checkbox onChange={this.onChange.bind(this)} className="supportTime" />
                      )
                    }
                  </FormItem>

                  { setInfo.basicAuth === true ?
                    <div>
                      <FormItem {...formItemLayout} hasFeedback
                        label={ intl.formatMessage({ id: 'username', defaultMessage: '用户名' }) } >
                        {
                          getFieldDecorator('userName', {
                            initialValue: setInfo.userName,
                            rules: [{
                              required: true,
                              hasFeedback: true,
                              message: intl.formatMessage({ id: 'please enter username',
                                defaultMessage: '请填写用户名' })
                            }]
                          })(
                            <Input type="text" onChange={this.onChange.bind(this)} maxLength="30"
                              placeholder={ intl.formatMessage({ id: 'please enter the username within 30 characters', 
                                defaultMessage: '请输入用户名，30个字符以内' }) } />
                          )
                        }
                      </FormItem>
                      <FormItem {...formItemLayout} hasFeedback
                        label={ intl.formatMessage({ id: 'password', defaultMessage: '密码' }) } >
                        {
                          getFieldDecorator('password', {
                            initialValue: setInfo.password,
                            rules: [{
                              required: true,
                              hasFeedback: true,
                              message: intl.formatMessage({ id: 'please enter password', 
                                defaultMessage: '请填写密码' })
                            }]
                          })(
                            <Input type="password" onChange={this.onChange.bind(this)} maxLength="30"
                              placeholder={ intl.formatMessage({ id: 'please enter the password within 30 characters', 
                                defaultMessage: '请输入密码，30个字符以内' }) } />
                          )
                        }
                      </FormItem>
                    </div> : null
                  }

                  <FormItem {...formItemLayout} label={ _supportTimeQuery } >
                    {
                      getFieldDecorator('apiSupportTime', { 
                        valuePropName: 'checked', initialValue: setInfo.apiSupportTime 
                      })(
                        <Checkbox onChange={this.onChange.bind(this)} className="supportTime" />
                      )
                    }
                  </FormItem>

                  { setInfo.apiSupportTime === true ?
                    <div>
                      <FormItem {...formItemLayout} className="ant-width" hasFeedback label={ startTimeParamName } >
                        {
                          getFieldDecorator('startTime', {
                            initialValue: setInfo.startTime,
                            rules: [{
                              required: true,
                              hasFeedback: true,
                              message: _enterStartTimeParamName
                            }]
                          })(
                            <Input type="text" onChange={this.onChange.bind(this)} placeholder="startTime"/>
                          )
                        }
                      </FormItem>

                      <FormItem {...formItemLayout} className="ant-width" hasFeedback label={ endTimeParamName } >
                        {
                          getFieldDecorator('endTime', {
                            initialValue: setInfo.endTime,
                            rules: [{
                              required: true,
                              hasFeedback: true,
                              message: enterEndTimeParamName
                            }]
                          })(
                            <Input type="text" onChange={this.onChange.bind(this)} placeholder="endTime"/>
                          )
                        }
                      </FormItem>

                      <FormItem {...formItemLayout} label={ _recentTime } className="ant-width">
                        {
                          getFieldDecorator('recentTime', { initialValue: setInfo.recentTime })(
                            <Select
                              onChange={this.chooseTime.bind(this)}
                            >{ recentTimeOptionsComponent }</Select>
                          )
                        }
                      </FormItem>
                    </div>
                    : null
                  }

                  <div className="btn-group-vertical">
                    <Button type="primary"
                      loading={this.state.loading}
                      onClick={this.testDataSet.bind(this, this.props.dataType, this.props.isEdit || false)}
                    >
                      { testConnection }
                    </Button>
                    <Button type="primary" onClick={this.props.firNext}
                      disabled={!this.state.apiNext}>
                      { nextStep }
                    </Button>
                  </div>

                </Form>
              </div>
            )
          }
          else {
            return (
              <div className="clearfix">
                <Form horizontal onSubmit={ this.handleSubmit.bind(this) } className="add-form">
                  <FormItem {...formItemLayout} label={ dataSetName } hasFeedback>
                    {
                      getFieldDecorator('name', {
                        initialValue: setInfo.name,
                        rules: [{
                          required: true,
                          hasFeedback: true,
                          message: nameDataSet
                        }]
                      })(
                        <Input type="text"
                          onChange={this.onChange.bind(this)}
                          placeholder={ nameDataSet } maxLength="30"/>
                      )
                    }
                  </FormItem>

                  <FormItem {...formItemLayout} label="SQL" hasFeedback>
                    {
                      getFieldDecorator('url', {
                        initialValue: setInfo.url,
                        rules: [{
                          required: true,
                          hasFeedback: true,
                          message: intl.formatMessage({ id: 'please enter sql statement', 
                            defaultMessage: '请填写SQL语句' })
                        }]
                      })(
                        <Input className="sql" type="textarea" onChange={this.onChange.bind(this)} maxLength="2000"
                          placeholder={sqlPlaceholder} />
                      )
                    }
                  </FormItem>
                </Form>

                <div className="btn-group-vertical">
                  <Button type="primary" loading={this.state.loading}
                    onClick={this.testDataSet.bind(this, this.props.dataType, this.props.isEdit || false, setInfo.id)} >
                    { intl.formatMessage({ id:'verification',defaultMessage:'验证' }) }
                  </Button>
                  <Button type="primary" onClick={this.props.firNext} disabled={!this.state.apiNext}>
                    { nextStep }
                  </Button>
                </div>

              </div>
            )
          }
        })()}
      </div>
    )
  }

}

AddDataSet = Form.create()(AddDataSet)

const mapStateToProps = (state) => {
  let { recentTime } = state.options
  return {
    recentTime,
  }
}

export default connect(mapStateToProps, null, null, {
  withRef: true
})(AddDataSet)


