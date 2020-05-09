import React, {
  Component
} from 'react'
import { Form, Button, Select, Checkbox, message } from 'antd'
import Input from 'components/form/Controls/Input'
import {
  getDataSource,
  getDataSources,
  createDataSource,
  dataSourceTest,
  changeDataSource
} from 'store/data-source/actions'
import intl from 'src/intl'

let saveDataSourceFailed = intl.formatMessage({ id: 'failed to save data source', defaultMessage: '保存数据源失败！' })
let correctNameOrPass = intl.formatMessage({ id: 'please enter the correct username or password', 
  defaultMessage: '请填写正确的用户名或密码' })
let correctAdress = intl.formatMessage({ id: 'please enter the correct address', defaultMessage: '请填写正确的地址' })
let testConnectError = intl.formatMessage({ id: 'test connection error', defaultMessage: '测试连接出错' })
let correctCertification = intl.formatMessage({ id: 'please enter the correct certification information',
  defaultMessage: '请填写正确的认证信息' })
let correctDbName = intl.formatMessage({ id: 'please enter the correct database name', 
  defaultMessage: '请填写正确的数据库名' })

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

class AddSource extends Component {
  static propTypes = {
    form: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    typeSource: React.PropTypes.array,
    oneSource: React.PropTypes.object,
    isEdit: React.PropTypes.bool,
    isConnected: React.PropTypes.bool,
    onSuccess: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onChangeIsConnected: React.PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      saveLoading: false,
      loading: false,
      isConnected: this.props.isConnected
    }
  }

  // 保存按钮接口
  saveDataSource(data) {
    this.setState({ saveLoading: true })

    const isEdit = this.props.isEdit

    if (isEdit) {
      this.props.dispatch(
        changeDataSource(this.props.oneSource.id, data)
      ).then(() => {
        this.props.dispatch(getDataSource(this.props.oneSource.id))
        if (this.props.onSuccess) {
          this.props.onSuccess(data)
        }
        this.props.dispatch(getDataSources()).then(
          this.props.onCancel(),
          this.setState({ saveLoading: false })
        )
      })
        .catch(() => {
          message.error(saveDataSourceFailed)
          this.setState({ saveLoading: false })
        })
    } else {
      this.props.dispatch(
        createDataSource(data)
      ).then(() => {
        if (this.props.oneSource.id) {
          this.props.dispatch(getDataSource(this.props.oneSource.id))
        }

        if (this.props.onSuccess) {
          this.props.onSuccess(data)
        }
        this.props.dispatch(getDataSources())
        this.props.onCancel()
        this.setState({ saveLoading: false })
      })
        .catch(() => {
          message.error(saveDataSourceFailed)
          this.setState({ saveLoading: false })
        })
    }
  }

  // 提交新增数据集表单
  handleSubmit(e) {
    e.preventDefault()

    // 先验证数据的正确性
    this.props.form.validateFields((error, values) => {
      if (error) {
        return
      }
      if (values.userNameApi) {
        values.userName = values.userNameApi
        values.password = values.passwordApi
        delete values.userNameApi
        delete values.passwordApi
      }
      if (values.urlDb) {
        values.url = values.urlDb
        delete values.urlDb
      }
      if (!values.class) {
        values.class = this.props.oneSource.class
      }
      this.saveDataSource(values)
    })
  }

  // 处理测试连接
  handleTestConnect() {
    // setTimeout(() => {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return
      } else {
        if (values.userNameApi) {
          values.userName = values.userNameApi
          values.password = values.passwordApi
          delete values.userNameApi
          delete values.passwordApi
        }
        if (values.basicAuth === undefined) {
          values.basicAuth = false
        }
        if (values.urlDb) {
          values.url = values.urlDb
          delete values.urlDb
        }
        if (!values.class) {
          values.class = this.props.oneSource.class
        }
        this.setState({ loading: true })
        this.testConnect(values).then((res) => {
          if (res.errCode !== 200) {
            this.connectFailure(values, res)
          }
          this.setState({ loading: false })
        })
          .catch(()=> {
            message.error(testConnectError)
            this.setState({ loading: false })
          })
      }
    })
    // })
  }

  // 测试连接
  testConnect(data) {
    return new Promise((resolve, reject) => {
      this.props.dispatch(
        dataSourceTest(data)
      )
        .then((res) => {
          if (res.errCode === 200) {
            this.setState({ isConnected: true })
            this.props.onChangeIsConnected(true)
            this.setState({ loading: false })
          }
          resolve(res)
        })
        .catch(res => {
          this.setState({ isConnected: false })
          this.props.onChangeIsConnected(false)
          this.setState({ loading: false })
          reject(res)
        })
    })
  }

  // 连接失败
  connectFailure(values, res) { 
    if (values.class === 'API Gateway' && values.basicAuth === false) {
      this.props.form.setFields({
        url: {
          value: values.url,
          errors: res.errCode === 402 ? 
            [new Error(correctCertification)] 
            : 
            [new Error(correctAdress)]
        }
      })
    }
    if (values.class === 'API Gateway' && values.basicAuth === true) {
      this.props.form.setFields({
        url: {
          value: values.url,
          errors: res.errCode === 402 ? 
            null 
            : 
            [new Error(correctAdress)]
        },
        userNameApi: {
          value: values.userName,
          errors: res.errCode === 402 ? 
            [new Error(correctNameOrPass)] 
            : 
            null
        },
        passwordApi: {
          value: values.password,
          errors: res.errCode === 402 ? 
            [new Error(correctNameOrPass)] 
            : 
            null
        },
      })
    }
    else {
      this.props.form.setFields({
        urlDb: {
          value: values.url,
          errors: res.errCode === 402 ? null :
            (res.errCode === 4003 ? 
              [new Error(correctDbName)] 
              : 
              [new Error(correctAdress)])
        },
        userName: {
          value: values.userName,
          errors: res.errCode === 402 ? 
            [new Error(correctNameOrPass)] 
            : 
            null
        },
        password: {
          value: values.password,
          errors: res.errCode === 402 ? 
            [new Error(correctNameOrPass)] 
            : 
            null
        },
      })
    }
  }


  chooseType() {
    this.handleChange()
    this.props.form.resetFields()
  }

  // 选择下拉組件
  getOptionsComponent(options) {
    if (!options) {
      return []
    }

    return options.map((item) => {
      let key = Object.keys(item)[0]

      return <Option key={key} value={key}>{item[key]}</Option>
    })
  }

  handleCancel() {
    this.props.onCancel()
    this.props.form.resetFields()
    this.setState({
      isConnected: false,
      loading: false
    })
    this.props.onChangeIsConnected(false)
  }

  handleChange() {
    setTimeout(() => {
      this.setState({ isConnected:false })
      this.props.onChangeIsConnected(false)
      let values = this.props.form.getFieldsValue()
      this.props.onChange(values)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isConnected !== nextProps.isConnected) {
      this.setState({ isConnected: nextProps.isConnected })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    let { oneSource, typeSource } = this.props

    let datasourceOptionsComponent = this.getOptionsComponent(typeSource)

    return (
      <Form horizontal onSubmit={ this.handleSubmit.bind(this) } className="add-form">
        <FormItem {...formItemLayout} hasFeedback
          label={ intl.formatMessage({ id: 'data source name', defaultMessage: '数据源名称' }) } >
          {
            getFieldDecorator('name', {
              initialValue: oneSource.name,
              rules: [{
                required: true,
                hasFeedback: true,
                message: intl.formatMessage({ id: 'please name the data source', defaultMessage: '请为数据源命名' })
              }],
            })(
              <Input type="text" onChange={this.handleChange.bind(this, 'name')} maxLength="30"
                placeholder={ intl.formatMessage({ id: 'within 30 characters', 
                  defaultMessage: '请为数据源命名，30个字符以内' }) } />
            )
          }
        </FormItem>

        { this.props.isEdit === true ?
          <FormItem {...formItemLayout} 
            label={ intl.formatMessage({ id: 'type', defaultMessage: '数据源类型' }) } >
            <span style={{ float: 'left', textIndent: '2px' }}>{oneSource.class}</span>
          </FormItem> :
          <FormItem {...formItemLayout} 
            label={ intl.formatMessage({ id: 'type', defaultMessage: '数据源类型' }) } >
            {
              getFieldDecorator('class', { initialValue: oneSource.class })(
                <Select className="choose" onChange={this.chooseType.bind(this)}
                  placeholder={ intl.formatMessage({ id: 'please select the type', defaultMessage: '请选择类型' }) } >
                  { datasourceOptionsComponent }
                </Select>
              )
            }
          </FormItem>
        }

        {(() => {
          if (oneSource.class === 'API Gateway') {
            return (
              <div>
                <FormItem {...formItemLayout} hasFeedback 
                  label={ intl.formatMessage({ id: 'address', defaultMessage:'网关地址' }) } >
                  {
                    getFieldDecorator('url', {
                      initialValue: oneSource.url,
                      rules: [{
                        required: true,
                        type: 'url',
                        hasFeedback: true,
                        message: intl.formatMessage({ id: 'please enter the correct data source address', 
                          defaultMessage: '请填写正确的数据源地址' })
                      }]
                    })(
                      <Input type="text" onChange={this.handleChange.bind(this)} 
                        placeholder={
                          `${intl.formatMessage({ id: 'format', defaultMessage: '格式' })}: http://localhost` 
                        } />
                    )
                  }
                </FormItem>

                <FormItem {...formItemLayout} className="approve"
                  label={ intl.formatMessage({ id: 'authentication', defaultMessage: '认证方式' }) } >
                  {
                    getFieldDecorator('basicAuth', { valuePropName: 'checked', initialValue: oneSource.basicAuth })(
                      <Checkbox onChange={this.handleChange.bind(this)}>
                        Basic Auth
                      </Checkbox>
                    )
                  }
                </FormItem>

                { oneSource.basicAuth === true ?
                  <div>
                    <FormItem {...formItemLayout} hasFeedback
                      label={ intl.formatMessage({ id: 'username', defaultMessage: '用户名' }) } >
                      {
                        getFieldDecorator('userNameApi', {
                          initialValue: oneSource.userNameApi,
                          rules: [{
                            required: true,
                            hasFeedback: true,
                            message: intl.formatMessage({ id: 'please enter username', 
                              defaultMessage: '请填写用户名' })
                          }]
                        })(
                          <Input type="text" onChange={this.handleChange.bind(this)} maxLength="30"
                            placeholder={ intl.formatMessage({ id: 'please enter the username within 30 characters', 
                              defaultMessage: '请输入用户名，30个字符以内' }) } />
                        )
                      }
                    </FormItem>
                    <FormItem {...formItemLayout} hasFeedback
                      label={ intl.formatMessage({ id: 'password', defaultMessage: '密码' }) } >
                      {
                        getFieldDecorator('passwordApi', {
                          initialValue: oneSource.passwordApi,
                          rules: [{
                            required: true,
                            hasFeedback: true,
                            message: intl.formatMessage({ id: 'please enter password', 
                              defaultMessage: '请填写密码' })
                          }]
                        })(
                          <Input type="password" maxLength="30" onChange={this.handleChange.bind(this)} 
                            placeholder={ intl.formatMessage({ id: 'please enter the password within 30 characters', 
                              defaultMessage: '请输入密码，30个字符以内' }) } />
                        )
                      }
                    </FormItem>
                  </div> : null
                }
              </div>
            )
          }
          else if (oneSource.class === 'API') {
            return
          }
          else {
            return (
              <div>
                <FormItem {...formItemLayout} 
                  label={ intl.formatMessage({ id:'address', defaultMessage:'地址' }) }>
                  {
                    getFieldDecorator('urlDb', {
                      initialValue: oneSource.urlDb,
                      rules: [{
                        required: true,
                        hasFeedback: true,
                        message: intl.formatMessage({ id: 'please enter the address',
                          defaultMessage: '请填写地址' })
                      }]
                    })(
                      <Input className="uleft"
                        onChange={this.handleChange.bind(this)} type="text" placeholder="localhost" />
                    )
                  }
                  {
                    getFieldDecorator('port', {
                      initialValue: oneSource.port,
                      rules: [{
                        required: true,
                        hasFeedback: true,
                        message: intl.formatMessage({ id: 'please enter the port', 
                          defaultMessage: '请填写端口' })
                      }]
                    })(
                      <Input className="url" onChange={this.handleChange.bind(this)} type="number" 
                        placeholder={intl.formatMessage({ id :'port',defaultMessage:'端口号' })} />
                    )
                  }
                  {
                    getFieldDecorator('databaseName', {
                      initialValue: oneSource.databaseName,
                      rules: [{
                        required: true,
                        hasFeedback: true,
                        message: intl.formatMessage({ id: 'please enter the database name', 
                          defaultMessage: '请填写数据库名' })
                      }]
                    })(
                      <Input className="uright" onChange={this.handleChange.bind(this)} type="text" 
                        placeholder={ intl.formatMessage({ id: 'database name', defaultMessage: '数据库名' }) } />
                    )
                  }
                </FormItem>

                <FormItem {...formItemLayout} hasFeedback
                  label={ intl.formatMessage({ id: 'username', defaultMessage: '用户名' }) } >
                  {
                    getFieldDecorator('userName', {
                      initialValue: oneSource.userName,
                      rules: [{
                        required: true,
                        hasFeedback: true,
                        message: intl.formatMessage({ id: 'please enter username',
                          defaultMessage: '请填写用户名' })
                      }]
                    })(
                      <Input type="text" maxLength="30" onChange={this.handleChange.bind(this)} 
                        placeholder={ intl.formatMessage({ id: 'please enter the username within 30 characters', 
                          defaultMessage: '请输入用户名，30个字符以内' }) } />
                    )
                  }
                </FormItem>
                <FormItem {...formItemLayout} hasFeedback
                  label={ intl.formatMessage({ id: 'password', defaultMessage: '密码' }) } >
                  {
                    getFieldDecorator('password', {
                      initialValue: oneSource.password,
                      rules: [{
                        required: true,
                        hasFeedback: true,
                        message: intl.formatMessage({ id: 'please enter password', 
                          defaultMessage: '请填写密码' })
                      }]
                    })(
                      <Input type="password" onChange={this.handleChange.bind(this)} maxLength="30"
                        placeholder={ intl.formatMessage({ id: 'please enter the username within 30 characters', 
                          defaultMessage: '请输入密码' }) } />
                    )
                  }
                </FormItem>
              </div>
            )
          }
        })()}

        { oneSource.class === 'API' ?
          <FormItem>
            <div className="btn-group-vertical">
              <Button key={'save'}
                type="primary"
                htmlType="submit"
              >
                { intl.formatMessage({ id: 'save', defaultMessage: '保存' }) }
              </Button>
              <Button key={'cancel'} type="primary" onClick={this.handleCancel.bind(this)}>
                { intl.formatMessage({ id: 'cancel', defaultMessage: '取消' }) }
              </Button>
            </div>
          </FormItem> :
          <FormItem>
            <div className="btn-group-vertical">
              <Button key={'save'}
                type="primary"
                loading={this.state.saveLoading}
                htmlType="submit"
                disabled={!this.state.isConnected}>
                { intl.formatMessage({ id: 'save', defaultMessage: '保存' }) }
              </Button>
              <Button key={'submit'}
                type="primary"
                loading={this.state.loading}
                onClick={this.handleTestConnect.bind(this)}
                className="test">
                { intl.formatMessage({ id: 'test connection', defaultMessage: '测试连接' }) }
              </Button>
              <Button key={'cancel'} type="primary" onClick={this.handleCancel.bind(this)}>
                { intl.formatMessage({ id: 'cancel', defaultMessage: '取消' }) }
              </Button>
            </div>
          </FormItem>
        }
      </Form>
    )
  }
}

AddSource = Form.create()(AddSource)

export default AddSource
