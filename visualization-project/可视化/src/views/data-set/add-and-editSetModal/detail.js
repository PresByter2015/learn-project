import React, { Component } from 'react'
import { Table, Button, message } from 'antd'
import { connect } from 'react-redux'
import { dataSetSave } from 'store/data-set/actions'
import { getDataSources } from 'store/data-source/actions'
import intl from 'src/intl'
// import { delay } from 'utils'

class Detail extends Component {
  static propTypes = {
    id: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    detail: React.PropTypes.array,
    keysList: React.PropTypes.object,
    dataSet: React.PropTypes.object,
    states: React.PropTypes.object,
    secPrev: React.PropTypes.func,
    onSuccess: React.PropTypes.func,
    handleHideModal: React.PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      page: 1,
      loading: false,
      saveLoading: false,
      open: false,
      checkedList: null
    }
  }

  // 分页请求
  // request(params = {}, id) {
  //   id = id || this.props.id
  //   params.page = params.page || 1

  //   this.props.dispatch(
  //       fetchDataSetKeysList(id, params)
  //     )
  //     .then(() => {
  //       delay(() => {
  //         this.setState({
  //           loading: false
  //         })
  //       }, 1000)
  //     })
  // }

  // 获取新数据
  // handleRefresh() {
  //   this.setState({
  //     loading: true
  //   })

  //   this.request()
  // }

  // 配置table
  parseColumns(columns) {
    if (columns) {
      return columns.map((col) => {
        return {
          key: col,
          title: col.length > 13 ? <span title={col}>{col.substring(0, 13) + '...'}</span> : col,
          dataIndex: col,
          width: columns.length < 7 ? 728 / columns.length : 112
        }
      })
    }

    return []
  }

  componentDidMount() {
    // 查看数据时获取字段
    // this.props.dispatch(fetchDataSetKeysList(this.props.id, {
    //   page: 1
    // }))

    // 查看数据时，带上查看筛选字段
    // this.props.dispatch(fetchDataSetDetail(this.props.id))
  }

  // componentWillReceiveProps(nextProps) {
  //   let {
  //     id
  //   } = nextProps

  //   // id 不等同的情况下请求数据
  //   if (id !== this.props.id) {
  //     this.request({
  //       page: 1
  //     }, id)
  //   }
  // }

  // 配置table表格
  parse(data) {
    let columns = []
    let dataSource = []

    // 刚开始数据有时会取不到，所以要判断data存不存在
    if (data && Object.keys(data).length) {

      // 判断每个字段数据条数并填充空数据
      let fillinEmptyValueFields = {
        ...data[0]
      }
      Object.keys(fillinEmptyValueFields).map((index) => {
        fillinEmptyValueFields[index] = ''
      })

      if (this.state.checkedList) {

        columns = this.parseColumns(this.state.checkedList)

        if (columns.length === 0) {
          let a = []
          for (let len2 = 0; len2 < 10; len2++) {
            a.push(fillinEmptyValueFields)
          }

          dataSource = a
        } else {
          for (let len1 = data.length % 10; len1 > 0 && len1 < 10; len1++) {
            data.push(fillinEmptyValueFields)
          }

          dataSource = data
        }

      } else {
        columns = this.parseColumns(Object.keys(data[0]))

        for (let len1 = data.length % 10; len1 > 0 && len1 < 10; len1++) {
          data.push(fillinEmptyValueFields)
        }

        dataSource = data
      }
    }

    return {
      columns,
      dataSource
    }

  }

  onChange(checkedValues) {
    this.setState({
      checkedList: checkedValues
    })

    this.parse()
  }

  render() {
    let {
      detail
    } = this.props
    let {
      dataSource,
      columns
    } = this.parse(this.props.detail)

    // 配置分页器
    // const pagination = {
    //   total: keysList.total,
    //   onChange: (current) => {
    //     this.request({
    //       page: current
    //     })
    //   }
    // }

    const pagination = {
      total: detail.length,
      // showTotal: total => `Total ${total} items`,
      pageSize: 10,
      defaultCurrent: 1
    }

    return (
      <div>
        { this.state.loading
          ?
          <div className="data-loading">
            <p className="title">{intl.formatMessage({ id:'is going to get the data',
              defaultMeseeage:'正在玩命获取数据,请稍后……' })}</p>
            <div className="spinner ">
              <div className="spinner-blade"/>
              <div className="spinner-blade"/>
              <div className="spinner-blade"/>
            </div>
          </div>
          :
          <div className="detail">
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={pagination}
              locale={ { emptyText: intl.formatMessage({ id: 'no data', defaultMeseeage: '暂无数据' }) } }
              scroll={{ x: columns.length * 112 }}
            />

            <div className="btn-group-vertical">
              <Button type="primary" onClick={this.props.secPrev}>
                { intl.formatMessage({ id: 'previous', defaultMessage: '上一步' }) }
              </Button>
              <Button type="primary" loading={this.state.saveLoading}
                onClick={this.save.bind(this)} disabled={this.state.open} >
                { intl.formatMessage({ id: 'save', defaultMessage: '保存' }) }
              </Button>
            </div>

          </div>
        }
      </div>
    )
  }

  save() {
    this.setState({
      saveLoading: true
    })
    let dataSet = this.props.dataSet
    dataSet.dataSourceId = dataSet.id
    delete dataSet.id
    if ((dataSet.supportTime === undefined || dataSet.supportTime === false) && !dataSet.apiSupportTime) {
      dataSet.supportTime = false
      dataSet.startTime = ''
      dataSet.endTime = ''
    }
    if ((dataSet.supportTime === undefined || dataSet.supportTime === false) && dataSet.apiSupportTime === true) {
      dataSet.supportTime = dataSet.apiSupportTime
    }

    this.props.dispatch(
      dataSetSave(dataSet)
    ).then(() => {
      this.props.dispatch(getDataSources())

      if (this.props.onSuccess) {
        this.props.onSuccess()
      }
      this.setState({ saveLoading: false, open: true })
      this.props.handleHideModal()
    })
      .catch(() => {
        message.error(intl.formatMessage({ id:'saving data set failed',defaultMeseeage:'保存数据集失败' }))
        this.setState({ saveLoading: false, open: true })
        this.props.handleHideModal()
      })

  }

}

const mapStateToProps = (state) => {
  let {
    detail
  } = state.dataSet

  return {
    detail
  }
}
export default connect(mapStateToProps)(Detail)
