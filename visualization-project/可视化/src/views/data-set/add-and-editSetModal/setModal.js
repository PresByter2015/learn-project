import React, { Component } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'
import {
  emptyDataSet,
  dataSetGet,
  dataSetGetField,
  dataSetGetFieldEdit,
  dataSetGetTable,
  dataSetGetTableEdit,
} from 'store/data-set/actions'
import { optionsRecent } from 'store/options/actions'
import Detail from './detail'
import DetailChange from './detailChange'

import AddDataSet from './addDataSet'
import DataSetHeader from './dataSetHeader'
import EditForm from './edit-form'
import EditFormChange from './edit-formChange'
import _ from 'lodash'

class addAndEditSetModal extends Component {
  static className = 'setModal'

  static propTypes = {
    dispatch: React.PropTypes.func,
    location: React.PropTypes.object,

    setInfo: React.PropTypes.object,
    recentTime: React.PropTypes.array,

    isEdit: React.PropTypes.bool,
    visible: React.PropTypes.bool,
    sourceId: React.PropTypes.string,
    id: React.PropTypes.string,
    dataType: React.PropTypes.string,
    handleHide: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      id: null,

      setInfo: {
        recentTime: '1h',
      },
      next: false,
      time: '0s',
      timeChange: null,

      data: {},
      dataSet: {},
      dataSetVisible: true,
      editModalVisible: false,
      detailModalVisible: false,
      // 新建数据集header状态
      header: {
        firPercent: 100,
        secPercent: 0,
        thiPercent: 0,
        circle1: 'current-status',
        circle2: 'idle-status',
        circle3: 'idle-status',
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(optionsRecent())
    if (this.props.isEdit === true) {
      this.props.dispatch(dataSetGet(this.props.id))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id && nextProps.isEdit === true) {
      this.props.dispatch(dataSetGet(nextProps.id))
    }
    if (this.props.setInfo !== nextProps.setInfo) {
      this.setState({
        setInfo: { ...nextProps.setInfo }
      })
    }
    if (this.props.visible !== nextProps.visible && nextProps.isEdit === false) {
      this.setState({
        setInfo: {
          recentTime: '1h'
        },
        time: '0s',
      })
    }
    if (this.props.visible !== nextProps.visible) {
      this.setState({
        next: false
      })
    }
  }

  rowClassName(row) {
    if (row.sourceName === 'ADD') {
      return 'addButton' + ' sourceChild'
    }
    else if (row.children) {
      return 'source'
    }
    else {
      return 'sourceChild'
    }
  }

  firNext(id, sourceId, isEdit) {
    let form = this.refs.addDataSet.getWrappedInstance()
    this.state.data = form.getFieldsValue()
    if (this.state.data.supportTime === undefined) {
      this.state.data.supportTime = false
    }

    if (isEdit === false) {
      this.setState({
        setInfo: { ...this.state.data }
      })
      this.state.data.id = sourceId
      this.props.dispatch(
        dataSetGetField(this.state.data)
      ).then()
    }

    if (isEdit === true) {
      delete this.state.data.id
      this.setState({
        setInfo: _.merge({}, this.state.data, {
          recentTime: '1h'
        })
      })
      this.props.dispatch(
        dataSetGetFieldEdit(this.state.data, id)
      ).then((data) => {
        this.setState({ timeChange: data.refreshTime })
      })
    }

    this.setState({
      dataSetVisible: false,
      editModalVisible: true,
      next: false,
      header: {
        firPercent: 100,
        secPercent: 100,
        circle1: 'completion-status',
        circle2: 'current-status',
        circle3: 'idle-status',
      }
    })

  }

  firPrev() {
    this.setState({
      dataSetVisible: true,
      editModalVisible: false,
      header: {
        firPercent: 100,
        secPercent: 0,
        circle1: 'current-status',
        circle2: 'idle-status',
        circle3: 'idle-status',
      }
    })
  }

  secNext(id, isEdit) {
    this.setState({
      detailModalVisible: true,
      editModalVisible: false,
      header: {
        firPercent: 100,
        secPercent: 100,
        thiPercent: 100,
        circle1: 'completion-status',
        circle2: 'completion-status',
        circle3: 'current-status',
      }
    })
    if (isEdit === false) {
      let form = this.refs.editForm.getWrappedInstance()

      let jsonData = form.getFieldsValue()
      let dataSet = Object.assign(this.state.data, jsonData)

      this.setState({
        dataSet: { ...dataSet }
      })

      this.props.dispatch(
        dataSetGetTable(dataSet)
      ).then()
    }

    if (isEdit === true) {
      let form = this.refs.editFormChange.getWrappedInstance()

      let jsonData = form.getFieldsValue()
      let dataSet = Object.assign(this.state.data, jsonData)
      this.setState({
        dataSet: { ...dataSet }
      })

      this.props.dispatch(
        dataSetGetTableEdit(dataSet, id)
      ).then()
    }
  }

  secPrev() {
    this.setState({
      detailModalVisible: false,
      editModalVisible: true,
      header: {
        firPercent: 100,
        secPercent: 100,
        thiPercent: 0,
        circle1: 'completion-status',
        circle2: 'current-status',
        circle3: 'idle-status',
      }
    })
  }

  handleChange(setInfo) {
    let newSetInfo = Object.assign({}, this.state.setInfo, setInfo)
    this.setState({ setInfo: newSetInfo })
  }
  onChangeNext(next) {
    let newNext = next
    this.setState({ next: newNext })
  }
  changeTime(time) {
    let newTime = time
    this.setState({ time: newTime })
  }
  changeRefresh(time) {
    let newTimeChange = time
    this.setState({ timeChange: newTimeChange })
  }
  changeHeader(header) {
    let newHeader = header
    this.setState({ header: newHeader })
  }


  render() {

    return (
      <Modal className="addDataSet"

        title={ <DataSetHeader headerState={this.state.header} isEdit={this.props.isEdit}/> }
        visible={this.props.visible}
        onCancel={this.handleHideModal.bind(this)}
        footer={null}
      >

        {(() => {
          if (this.state.dataSetVisible) {
            return (
              <AddDataSet
                ref="addDataSet"
                isEdit={this.props.isEdit || false}
                dataType={this.props.dataType}
                firNext={this.firNext.bind(this, this.props.id, this.props.sourceId, this.props.isEdit || false)}
                dispatch={this.props.dispatch}
                sourceId={this.props.sourceId}
                id={this.props.id}
                setInfo={this.state.setInfo}
                recentTime={this.props.recentTime}
                onChange={this.handleChange.bind(this)}
                next={this.state.next}
                onChangeNext={this.onChangeNext.bind(this)}
                headerState={this.state.header}
              />)
          }
          if (this.state.editModalVisible && this.props.isEdit === false) {
            return (
              <EditForm ref="editForm"
                time={this.state.time}
                onChange={this.changeTime.bind(this)}
                firPrev={this.firPrev.bind(this)}
                secNext={this.secNext.bind(this, this.props.id, this.props.isEdit || false)}
                id={this.props.id}
              />)
          }
          if (this.state.editModalVisible && this.props.isEdit === true) {
            return (
              <EditFormChange ref="editFormChange"
                timeChange={this.state.timeChange}
                onChange={this.changeRefresh.bind(this)}
                firPrev={this.firPrev.bind(this)}
                secNext={this.secNext.bind(this, this.props.id, this.props.isEdit || false)}
                id={this.props.id}
              />)
          }
          if (this.state.detailModalVisible && this.props.isEdit === false) {
            return (
              <Detail
                secPrev={this.secPrev.bind(this, this.props.id, this.props.isEdit || false)}
                id={this.props.id}
                dataSet={this.state.dataSet}
                onSuccess={this.props.onSuccess}
                states={this}
                handleHideModal={this.handleHideModal.bind(this)}
              />)
          }
          if (this.state.detailModalVisible && this.props.isEdit === true) {
            return (
              <DetailChange
                secPrev={this.secPrev.bind(this, this.props.id, this.props.isEdit || false)}
                id={this.props.id}
                dataSet={this.state.dataSet}
                onSuccess={this.props.onSuccess}
                states={this}
                handleHideModal={this.handleHideModal.bind(this)}
              />)
          }
        })()}

      </Modal>

    )
  }

  handleHideModal() {
    if (this.refs.addDataSet) {
      this.refs.addDataSet.getWrappedInstance().resetFields()
    } else if (this.refs.editForm) {
      this.refs.editForm.getWrappedInstance().resetFields()
    } else if (this.refs.editFormChange) {
      this.refs.editFormChange.getWrappedInstance().resetFields()
    }
    this.setState({
      setInfo: {},
      dataSetVisible: true,
      editModalVisible: false,
      // 新建数据集header状态
      header: {
        firPercent: 100,
        secPercent: 0,
        thiPercent: 0,
        circle1: 'current-status',
        circle2: 'idle-status',
        circle3: 'idle-status',
      }
    })
    this.props.handleHide()

    this.props.dispatch(emptyDataSet())
  }

}

const mapStateToProps = (state) => {
  let { setInfo } = state.dataSet
  let { recentTime } = state.options

  return {
    setInfo,
    recentTime
  }
}

export default connect(mapStateToProps)(addAndEditSetModal)
