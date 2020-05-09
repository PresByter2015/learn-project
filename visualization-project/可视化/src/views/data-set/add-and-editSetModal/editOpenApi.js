import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from 'components/form/Controls/Input'
import { Modal, Table, Button, Select, Checkbox, Form } from 'antd'
import { optionsDataType } from 'store/options/actions'
import { saveOpenApi, dataSetGetFieldEdit } from 'store/data-set/actions'
import { deepCopy } from 'utils/serialize'
import intl from 'src/intl'

const footer = () => intl.formatMessage({ defaultMessage: '* 显示名默认为字段名，也可根据需求进行编辑更改', 
  id: '* the display name defaults to the field name and can also be edited as needed' })
const scroll = { y: 280 }

const FormItem = Form.Item
const Option = Select.Option

class EditOpenApiModal extends Component {
  static propTypes = {
    id: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    form: React.PropTypes.object,

    dataType: React.PropTypes.array,
    type: React.PropTypes.string,
    fieldEdit: React.PropTypes.array,
    handleHide: React.PropTypes.func,
    visible: React.PropTypes.bool,
    isDataSetPage: React.PropTypes.bool,
    onSuccess: React.PropTypes.func,
  }
  constructor(props) {
    super(props)

    let obj = {}

    this.data = deepCopy(props.fieldEdit)
    this.data.length && this.data.map((item, key) => {
      obj['isCheck' + key] = item.isCheck
    })

    this.state = {
      size: 'middle',
      footer: footer,
      scroll: scroll,
      isChecked: obj,
      dataSetField: this.data,
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
                  <Checkbox
                    checked={value}
                    onChange={this.onChangeTrue.bind(this, index, 'isCheck')}
                    style={{ left: '13px' }}
                  />)

              }
            </FormItem>
          </Form>
        )
      }
    },{
      // title: '字段名称',
      title: intl.formatMessage({ id: 'field name', defaultMessage: '字段名称' }),
      dataIndex: 'fieldName',
      key: 'fieldName',
      width: 150
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
                    placeholder={ intl.formatMessage({ id: 'within 50 characters', defaultMessage:'最多50个字符' }) }
                    maxLength="50"
                    onChange={this.onChange.bind(this, index, 'displayName')}
                  />)
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
                  </Select>)
              }
            </FormItem>
          </Form>
        )
      }
    }]
  }

  componentDidMount() {
    this.props.dispatch(optionsDataType())
    if (this.props.id && this.props.visible) {
      this.props.dispatch(dataSetGetFieldEdit({}, this.props.id))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id) {
      if (this.props.id !== nextProps.id &&
        nextProps.type === 'OpenAPI') {
        this.props.dispatch(dataSetGetFieldEdit({}, nextProps.id))
      }
      if (!this.props.isDataSetPage && this.props.visible !== nextProps.visible && nextProps.visible) {
        this.props.dispatch(dataSetGetFieldEdit({}, nextProps.id))
      }
    }
    if (this.props.fieldEdit !== nextProps.fieldEdit) {
      let isCheckObj = {}
      let nextFieldEdit = [ ...nextProps.fieldEdit ]
      nextFieldEdit.map((item, key) => {
        isCheckObj['isCheck' + key] = item.isCheck
      })
      this.setState({
        dataSetField: nextFieldEdit,
        isChecked: isCheckObj
      })
    }
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
    let { getFieldDecorator, getFieldValue } = this.props.form
    let fieldEdit = this.props.fieldEdit

    getFieldDecorator('field', { initialValue: this.state.dataSetField })
    let fields = getFieldValue('field')
    return (
      <Modal
        title={ intl.formatMessage({ id: 'edit', defaultMessage: '编辑' }) }
        className="editOpenApi"
        visible={this.props.visible}
        onCancel={this.handleHideModal}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={this.handleOk.bind(this, fields)}>
            { intl.formatMessage({ id: 'save', defaultMessage: '保存' }) }
          </Button>,
          <Button key="back" size="large" onClick={this.handleHideModal}>
            { intl.formatMessage({ id: 'cancel', defaultMessage: '取消' }) }
          </Button>
        ]}
      >
        <Table
          {...this.state}
          className="setFields"
          pagination={false}
          locale={ { emptyText: intl.formatMessage({ id: 'no data', defaultMeseeage: '暂无数据' }) } }
          columns={this.columns}
          dataSource={fieldEdit}
        />
      </Modal>
    )
  }

  handleOk = (fields) => {
    let data = {}
    data.field = fields
    this.props.dispatch(saveOpenApi(data, this.props.id))
    if (this.props.onSuccess) {
      this.props.onSuccess()
    }
    this.handleHideModal()
  }

  handleHideModal = () => {
    this.props.form.resetFields()
    this.props.handleHide()
  }
}

EditOpenApiModal = Form.create()(EditOpenApiModal)

const mapStateToProps = (state) => {
  let { dataType } = state.options
  let { fieldEdit }  = state.dataSet

  return {
    dataType,
    fieldEdit
  }
}

export default connect(mapStateToProps, null, null, {
  withRef: true
})(EditOpenApiModal)
