import intl from 'src/intl'
import React, { Component } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import {
  getDataSource
} from 'store/data-source/actions'

// import _ from 'lodash'

import { optionsDataSource } from 'store/options/actions'

import AddSource from './sourceForm'

class AddandEditSourceModal extends Component {
  static className = 'sourceModal'

  static propTypes = {
    dispatch: React.PropTypes.func,
    location: React.PropTypes.object,
    oneSource: React.PropTypes.object,
    typeSource: React.PropTypes.array,
    isEdit: React.PropTypes.bool,
    visible: React.PropTypes.bool,
    id: React.PropTypes.string,
    onSuccess: React.PropTypes.func,
    handleHide: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
 
    this.state = {
      oneSource: {
        class: 'API Gateway'
      },
      isConnected: false
    }
  }

  componentDidMount() {
    this.props.dispatch(optionsDataSource())
    if (this.props.isEdit === true) {
      this.props.dispatch(getDataSource(this.props.id))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id && nextProps.isEdit === true) {
      this.props.dispatch(getDataSource(nextProps.id))
    }
    else if (this.props.oneSource !== nextProps.oneSource
      || (this.props.visible !== nextProps.visible && nextProps.isEdit === true
          && nextProps.visible === true
      )) {
      this.setState({
        oneSource: { ...nextProps.oneSource }
        // oneSource: _.clone(nextProps.oneSource, true)
      })
    }
    if (this.props.visible !== nextProps.visible && nextProps.isEdit === false) {
      this.setState({
        oneSource: {
          class: 'API Gateway'
        }
      })
    }
    if (this.props.visible !== nextProps.visible && nextProps.visible === true) {
      this.setState({ isConnected: false })
    }
  }

  render() {
    return (
      <Modal title={ 
        this.props.isEdit === true ? 
          intl.formatMessage({ id: 'edit data source', defaultMessage: '编辑数据源' })
          : 
          intl.formatMessage({ id: 'create data source', defaultMessage: '新建数据源' })
      }
      className="addSource"
      visible={this.props.visible}
      onCancel={this.handleCancel.bind(this)}
      footer={null}
      >
        <AddSource ref="addSource"
          oneSource={this.state.oneSource}
          typeSource={this.props.typeSource}
          dispatch={this.props.dispatch}
          isEdit={this.props.isEdit || false}
          isConnected={this.state.isConnected}
          onChange={this.handleChange.bind(this)}
          onChangeIsConnected={this.handleChangeIsConnected.bind(this)}
          onSuccess={this.props.onSuccess}
          onCancel={this.handleCancel.bind(this)}
        />
      </Modal>
    )
  }

  handleChange(oneSource) {
    let newOneSource = Object.assign({}, this.state.oneSource, oneSource)
    this.setState({
      oneSource: newOneSource
    })
  }

  handleChangeIsConnected(isConnected) {
    let newIsConnected = isConnected
    this.setState({
      isConnected: newIsConnected
    })
  }

  handleCancel() {
    this.setState({ oneSource: { class: 'API Gateway' } })
    this.props.handleHide()
    this.refs.addSource.resetFields()
  }

}

const mapStateToProps = (state) => {
  let { typeSource } = state.options
  let { oneSource } = state.dataSource

  return {
    typeSource,
    oneSource
  }
}

export default connect(mapStateToProps)(AddandEditSourceModal)
