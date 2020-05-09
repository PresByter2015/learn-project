import React, { Component } from 'react'
import { connect } from 'react-redux'
import { optionsRefresh, optionsDataType } from 'store/options/actions'
import { Table, Form, Select, Button, Checkbox } from 'antd'
import Input from 'components/form/Controls/Input'
import intl from 'src/intl'

const footer = () => intl.formatMessage({ defaultMessage: '* 显示名默认为字段名，也可根据需求进行编辑更改', 
  id: '* the display name defaults to the field name and can also be edited as needed' })
const scroll = { y: 280 }

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

class EditForm extends Component {
  static propTypes = {
    id: React.PropTypes.string,
    form: React.PropTypes.object,
    field: React.PropTypes.array,
    dispatch: React.PropTypes.func,
    refreshTime: React.PropTypes.array,
    dataType: React.PropTypes.array,
    firPrev: React.PropTypes.func,
    secNext: React.PropTypes.func,
    onChange: React.PropTypes.func,
    time: React.PropTypes.string,
  }

  onChangeTrue(index, key, e) {
    let newField = this.state.dataSetField
    newField.map(() => {
      newField[index][key] = e.target.checked
    })

    let newObj = this.state.isChecked
    newField.map((item, key) => {
      newObj['isCheck' + key] = item.isCheck
    })

    this.setState({
      dataSetField: newField,
      isChecked: newObj
    })
  }

  onChange(index, key, e) {
    let newField = this.state.dataSetField
    newField.map(() => {
      newField[index][key] = e.target.value
    })

    this.setState({
      dataSetField: newField
    })
  }

  onChangeDataType(index, key, e) {
    let newField = this.state.dataSetField
    newField.map(() => {
      newField[index][key] = e
    })

    this.setState({
      dataSetField: newField
    })
  }

  refreshTime(value) {
    this.props.onChange(value)
  }

  constructor(props) {
    super(props)

    let obj = {}
    this.props.field.map((item, key) => {
      obj['isCheck' + key] = item.isCheck
    })
    this.state = {
      size: 'middle',
      dataSetField: this.props.field,
      footer: footer,
      scroll: scroll,
      value: 'Text',
      arr: null,
      isChecked: obj
    }

    this.columns = [{
      title: '',
      dataIndex: 'isCheck',
      key: 'isCheck',
      width: 40,
      render: (value, row, index) => {
        let {
          getFieldDecorator
        } = this.props.form
        return (

          <Form horizontal>
            <FormItem>
              {
                getFieldDecorator('isCheck' + index)(
                  <Checkbox checked={value}
                    onChange={this.onChangeTrue.bind(this, index, 'isCheck')}
                    style={{ left: '13px' }}
                  />
                )
              }
            </FormItem>
          </Form>
        )
      }
    }, {
      title: intl.formatMessage({ id: 'field name', defaultMessage: '字段名称' }),
      dataIndex: 'fieldName',
      key: 'fieldName',
      width: 150,
    }, {
      title: intl.formatMessage({ id: 'show name', defaultMessage: '显示名称' }),
      dataIndex: 'displayName',
      key: 'displayName',
      width: 150,
      render: (value, row, index) => {
        let {
          getFieldDecorator
        } = this.props.form

        return (
          <Form horizontal>
            <FormItem>
              {
                getFieldDecorator('displayName' + index, { initialValue: row.displayName })(
                  <Input type="text"
                    disabled={ !this.state.isChecked[['isCheck'] + index] }
                    placeholder={ intl.formatMessage({ id: 'within 50 characters', defaultMessage: '最多50个字符' }) }
                    maxLength="50"
                    onChange={this.onChange.bind(this, index, 'displayName')}/>
                )
              }
            </FormItem>
          </Form>
        )
      }
    }, {
      title: intl.formatMessage({ id: 'data type', defaultMessage: '数据类型' }),
      dataIndex: 'datatype',
      key: 'datatype',
      width: 150,
      render: (value, row, index) => {
        let {
          getFieldDecorator
        } = this.props.form
        let {
          dataType
        } = this.props
        let datatypeOptionsComponent = this.getOptionsComponent(dataType)
        return (
          <Form horizontal>
            <FormItem>
              {
                getFieldDecorator('dataType' + index, { initialValue: row.dataType })(
                  <Select style={{ width: '90%' }}
                    disabled={ !this.state.isChecked['isCheck' + index] }
                    onChange={this.onChangeDataType.bind(this, index, 'dataType')}
                  >
                    { datatypeOptionsComponent }
                  </Select>
                )
              }
            </FormItem>
          </Form>
        )
      }
    }]

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.field !== nextProps.field) {
      let isCheckObj = {}
      nextProps.field.map((item, key) => {
        isCheckObj['isCheck' + key] = item.isCheck
      })
      this.setState({
        dataSetField: nextProps.field,
        isChecked: isCheckObj
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  componentWillMount() {
    // 刷新周期
    this.props.dispatch(optionsRefresh())
    // 数据类型
    this.props.dispatch(optionsDataType())

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

  render() {
    let {
      getFieldDecorator
    } = this.props.form

    let field = this.props.field

    getFieldDecorator('field', {
      initialValue: this.state.dataSetField
    })

    let {
      refreshTime, time
    } = this.props

    let refreshTimeOptionsComponent = this.getOptionsComponent(refreshTime)

    return (
      <div>
        <Form horizontal onSubmit={ this.handleSubmit.bind(this) } className="set">

          <Table {...this.state}
            columns={this.columns}
            dataSource={field}
            pagination={false}
            locale={ { emptyText: intl.formatMessage({ id: 'no data', defaultMeseeage: '暂无数据' }) } }
            className="setFields"
          />

          <div className="clearfix">
            <div className="left-form">
              <FormItem {...formItemLayout} 
                label={ intl.formatMessage({ id: 'refresh cycle', defaultMessage: '刷新周期' }) } 
                className="ant-width">
                {
                  getFieldDecorator('refreshTime', { initialValue: time })(
                    <Select
                      onChange={this.refreshTime.bind(this)}
                    >{ refreshTimeOptionsComponent }</Select>
                  )
                }
              </FormItem>
            </div>
          </div>

        </Form>

        <div className="btn-group-vertical">
          <Button type="primary" onClick={this.props.firPrev}>
            { intl.formatMessage({ id: 'previous', defaultMessage: '上一步' }) }
          </Button>
          <Button type="primary" onClick={this.props.secNext}>
            { intl.formatMessage({ id: 'next', defaultMessage: '下一步' }) }
          </Button>
        </div>

      </div>
    )
  }
}

EditForm = Form.create()(EditForm)

const mapStateToProps = (state) => {
  let {
    field
  } = state.dataSet
  let {
    refreshTime,
    dataType
  } = state.options

  return {
    field,
    refreshTime,
    dataType
  }
}

export default connect(mapStateToProps, null, null, {
  withRef: true
})(EditForm)
