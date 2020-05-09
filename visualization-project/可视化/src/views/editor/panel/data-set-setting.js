import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Icon, Select } from 'antd'
import { fetchDataSetByKey, fetchDataSetByDataSource, dataSetGet, fetchDataSetKeysList } from 'store/data-set/actions'
import { updateWidget } from 'store/window/actions'
import { fetchDataSources } from 'store/data-source/actions'
import GeoDataSetting from './data-setting/geo-data-setting'
import MoldDataSetting from './data-setting/mold-data-setting'
import DynamicImageSetting from './data-setting/dynamic-image-setting'
import $ from 'utils/deparam'
import AddandEditSourceModal from 'views/data-set/add-and-editSourceModal/sourceModal'
import AddandEditSetModal from 'views/data-set/add-and-editSetModal/setModal'
import EditOpenApiModal from 'views/data-set/add-and-editSetModal/editOpenApi'
import ViewDataModal from 'views/data-set/viewDataModal'
import NoopSetting from './NoopSetting'
import intl from 'src/intl'

let notFoundContent = intl.formatMessage({ defaultMessage: '没有可用选项', id: 'no options available' })
let deleteSeries = intl.formatMessage({ id: 'remove the series', defaultMessage: '删除系列' })

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

class DataSetSetting extends Component {
  static propTypes = {
    form: React.PropTypes.object,
    height: React.PropTypes.number,
    dispatch: React.PropTypes.func,
    dataSet: React.PropTypes.object,
    data: React.PropTypes.object,
    widgetId: React.PropTypes.string,
    chartConfig: React.PropTypes.object,
    dataSource: React.PropTypes.object
  }

  constructor() {
    super()
    this.state = {
      fields: null,
      series: [],
      seriesSecond: [],
      dataSetting: {},
      dataSets: null,
      data: {},
      initialDataSource: undefined,
      initialDataSet: undefined,
      isStateSource: false, //静态数据源
      dataSourceClass: '',
      isShowAddSourceModal: false,
      isShowAddSetModal: false,
      isShowOpenApiModal: false,
      isShowViewDataModal: false,
      isEdit: false,
      seriesList: null //系列下拉选项值组成的数组
    }
  }

  handleSubmit() {

  }

  // 数据源下拉
  getDataSourcesComponent() {
    let dataSourceList = this.props.dataSource.list
    let component = []

    if (dataSourceList && dataSourceList.length) {
      component = this.createOptionsComponent(dataSourceList)
    }

    return component
  }

  // 创建 Options 组件
  createOptionsComponent(items, key = 'id', text = 'name') {
    return items.map(item => {
      let id = item[key]
      let name = item[text]

      return (
        <Option key={id} title={name} value={id}>
          {name}
        </Option>
      )
    })
  }

  getDataSetsComponentByDataSource(sourceId) {
    //根据数据源id获取数据集
    this.props.dispatch(fetchDataSetByDataSource(sourceId))
      .then(data => {
        let dataSets = this.createOptionsComponent(data)
        this.setState({ dataSets })
      })
  }

  handleDataSetChange(val) {
    setTimeout(() => {
      this.setState({
        data: {}
      })

      this.handleDealResetSeries()

      this.handleDealFormData()

      if (val) {
        this.renderSubSelect(val)
      }
    })
  }

  handleDataSourceChange(val) {
    setTimeout(() => {
      //获取数据源class
      let filtedItems = this.handleFilterArray(this.props.dataSource.list, val)
      if (filtedItems) {
        let currentDatasource = filtedItems[0]
        this.setState({
          dataSourceClass: currentDatasource.class
        })
      }

      this.setState({
        data: {},
        dataSets: null,
        initialDataSet: undefined,
        fields: null,
        seriesList: null
      })

      this.handleDealResetSeries()

      this.props.form.setFieldsValue({
        id: undefined
      })

      this.handleDealFormData()

      this.getDataSetsComponentByDataSource(val)
    })
  }

  handleFilterArray(array, currentVal) {
    let filtedItems
    if (array) {
      filtedItems = array.filter(item => {
        return item.id === currentVal
      })
    }
    return filtedItems
  }

  handleDealResetSeries() {
    //处理清空时恢复默认系列
    let { series, seriesSecond } = this.handleDealChartConfig(this.props.chartConfig)

    if (series) {
      this.setState({
        series: [undefined]
      })
    }

    if (seriesSecond) {
      this.setState({
        seriesSecond: [undefined]
      })
    }
  }

  handleDealFormData() {
    let formData = this.props.form.getFieldsValue()
    if (formData.hasOwnProperty('guageSeriesKey')) {
      formData.seriesKey = formData.guageSeriesKey
      delete formData.guageSeriesKey
    }

    let tmp = $.deparamObj(formData, true)    //处理data
    this.props.dispatch(updateWidget(this.props.widgetId, { dataSetting: tmp }))
  }

  handleChange() {
    setTimeout(() => {
      this.handleDealFormData()
    })
  }

  // 创建系列下拉组件
  createSeriesOptions(data) {
    let seriesList = []

    let fields = Object.keys(data).map(id => {
      let item = data[id]
      seriesList.push(item.FieldName)

      return (<Option key={item.FieldName} value={item.FieldName}>
        {item.DisplayName || item.FieldName}
      </Option>)
    })

    return {
      fields, seriesList
    }
  }

  renderSubSelect(id) {
    //根据数据集id获取系列
    this.props.dispatch(fetchDataSetByKey(id))
      .then(data => {
        let { fields, seriesList } = this.createSeriesOptions(data)

        this.setState({ fields, seriesList })
      })
  }

  getValidSeriesOption(formData, dataSetId) {
    //过滤数据源 数据集
    let currentSeries = {}
    for (let key in formData) {
      if (!['id', 'source'].includes(key)) {
        let value = formData[key]
        currentSeries[key] = value
      }
    }

    //过滤已选系列是否被关闭
    this.props.dispatch(fetchDataSetByKey(dataSetId))
      .then(data => {
        //根据数据集id获取系列
        let { fields, seriesList } = this.createSeriesOptions(data)

        this.setState({ fields, seriesList })

        for (let key in currentSeries) {
          if (!seriesList.includes(currentSeries[key])) {
            this.props.form.setFieldsValue({
              [`${key}`]: undefined
            })
          }
        }

        //更新数据
        setTimeout(() => {
          this.handleDealFormData()
        })

      })
  }

  // 添加系列
  handleAddSeries(type) {
    let state = this.state[`${type}`]
    state.push(undefined)
    this.setState({
      [`${type}`]: state
    })

    setTimeout(() => {
      this.handleDealFormData()
    })
  }

  // 移除系列
  handleRemoveSeries(id, type, e) {
    e.preventDefault()
    let state = this.state[`${type}`].slice()
    state.splice(id, 1)

    state.forEach((value, index) => {
      let seriesKey = `series[${index}]`
      this.props.form.setFieldsValue({
        [`${seriesKey}`]: value
      })
    })

    this.setState({
      [`${type}`]: state
    })

    setTimeout(() => {
      this.handleDealFormData()
    })
  }

  handleShowSourceModal() {
    this.setState({
      isShowAddSourceModal: true
    })
  }

  handleHideSourceModal() {
    this.setState({
      isShowAddSourceModal: false
    })
  }

  //新增数据源成功回调
  handleAddSourceSuccess() {
    this.props.dispatch(fetchDataSources())
  }

  handleShowAddSetModal(type, id) {
    if (type.indexOf('edit') >= 0) {
      this.props.dispatch(dataSetGet(id))
      this.setState({
        isEdit: true
      })
    } else {
      this.setState({
        isEdit: false
      })
    }

    this.setState({
      isShowAddSetModal: true
    })
  }

  handleHideAddSetModal() {
    this.setState({
      isShowAddSetModal: false
    })
  }

  //新增数据集、编辑数据集成功回调
  handleAddSetSuccess() {
    //更新数据集列表
    let sourceId = this.props.form.getFieldValue('source')
    this.getDataSetsComponentByDataSource(sourceId)

    //更新系列列表 (编辑数据集场景)
    if (this.state.isEdit ||
      this.state.dataSourceClass === 'OpenAPI') {
      let dataId = this.props.form.getFieldValue('id')
      let formData = this.props.form.getFieldsValue()
      this.getValidSeriesOption(formData, dataId)
    }
  }

  handleShowOpenApiModal() {
    this.setState({
      isShowOpenApiModal: true
    })
  }

  handleHideOpenApiModal() {
    this.setState({
      isShowOpenApiModal: false
    })
  }

  handleShowViewDataModal(id) {
    this.props.dispatch(fetchDataSetKeysList(id, {
      page: 1
    }))
    this.setState({
      isShowViewDataModal: true
    })
  }

  handleHideViewDataModal() {
    this.setState({
      isShowViewDataModal: false
    })
  }

  //有默认值的图表类型处理
  handleDealChartConfig(chartConfig) {
    let series = false
    let seriesSecond = false
    if (chartConfig.type === 'bar' ||
      chartConfig.type === 'line' ||
      chartConfig.type === 'table' ||
      chartConfig.type === 'scatter' ||
      chartConfig.type === 'radar' ||
      chartConfig.type === 'card'
    ) {
      series = true

      if (chartConfig.theme === 'barLine') {
        seriesSecond = true
      }
    }

    return { series, seriesSecond }
  }

  // 清空所有表单值
  clearFields() {
    let fields = {}
    let fieldsValue = this.props.form.getFieldsValue()

    Object.keys(fieldsValue).forEach(key => {
      fields[key] = undefined
    })

    this.props.form.setFieldsValue(fields)

    this.setState({
      dataSets: null,
      data: {},
      fields: null,
      seriesList: null
    })
  }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.data && nextProps.data !== this.props.data) {

      this.setState({
        data: nextProps.data
      })
      this.props.form.resetFields()

      this.props.form.setFieldsValue({
        source: nextProps.data.source,
        id: nextProps.data.id
      })

      if (nextProps.data.source) {
        this.getDataSetsComponentByDataSource(nextProps.data.source)

        //获取数据源class
        let filtedItems = this.handleFilterArray(this.props.dataSource.list, nextProps.data.source)
        if (filtedItems && filtedItems.length) {
          let currentDatasource = filtedItems[0]
          this.setState({
            dataSourceClass: currentDatasource.class
          })
        }

        //若为静态数据源
        if (nextProps.data.source === '9129f99351e64517a4e11562fa86cea3') {
          this.setState({
            isStateSource: true
          })
        } else {
          this.setState({
            isStateSource: false
          })
        }
      } else {
        this.setState({
          isStateSource: false
        })
      }

      if (nextProps.data.id) {
        this.renderSubSelect(nextProps.data.id)
      }

      if (nextProps.data.series) {
        this.setState({
          series: nextProps.data.series
        })
      } else {
        this.setState({ series: [] })
      }

      if (nextProps.data.seriesSecond) {
        this.setState({
          seriesSecond: nextProps.data.seriesSecond
        })
      } else {
        this.setState({ seriesSecond: [] })
      }

      if (Object.keys(nextProps.data).length <= 0) {
        //部件没有配置过数据
        this.setState({
          dataSets: null,
          fields: null,
          data: {},
          seriesList: null
        })
      }
    } else if (!nextProps.data && nextProps.data !== this.props.data) {
      //组件删除
      this.clearFields()
    }

    //设置默认值系列
    if (nextProps.chartConfig && nextProps.chartConfig !== this.props.chartConfig) {

      let { series, seriesSecond } = this.handleDealChartConfig(nextProps.chartConfig)

      if (series) {
        if (!nextProps.data || (nextProps.data && !nextProps.data.series)) {
          this.setState({
            series: [undefined]
          })
        }
      }

      if (seriesSecond) {
        if (!nextProps.data || (nextProps.data && !nextProps.data.seriesSecond)) {
          this.setState({
            seriesSecond: [undefined]
          })
        }
      }
    }

  }

  componentWillMount() {
    //获取数据源
    this.props.dispatch(fetchDataSources())

    this.setState({
      data: this.props.data || {}
    })

    if (this.props.data && this.props.data.id) {
      this.setState({
        initialDataSet: this.props.data.id
      })
    }

    if (this.props.data && this.props.data.source) {
      this.setState({
        initialDataSource: this.props.data.source
      })
    }

  }

  componentDidMount() {
  }

  getChartSelectComponents(chartConfig, data) {
    const { getFieldDecorator } = this.props.form
    const { klass, type, theme } = chartConfig
    let components = []

    // 柱状图配置 折线图配置 散点图配置
    if (type === 'bar' || type === 'line' || type === 'scatter') {
      if (theme === 'basic' || theme === 'barLine') {
        components.push(
          <FormItem key="xAxis" {...formItemLayout}
            label={ intl.formatMessage({ id: 'x axis', defaultMessage: 'X轴' }) }>
            {
              getFieldDecorator('xAxis', { initialValue: data.xAxis })
              (<Select placeholder={ intl.formatMessage({
                defaultMessage: '请选择X轴对应的字段',
                id: 'please select the field corresponding to the x axis'
              }) }
              notFoundContent={ notFoundContent }
              onSelect={this.handleChange.bind(this)}>
                {this.state.fields}
              </Select>)
            }
          </FormItem>
        )
      }

      if (type === 'scatter') {
        components.push(
          <FormItem key="size" {...formItemLayout}
            label={ intl.formatMessage({ id: 'size series', defaultMessage: '大小系列' }) }>
            {
              getFieldDecorator('size', { initialValue: data.size })
              (<Select placeholder={ intl.formatMessage({
                defaultMessage: '请选择大小系列对应的字段',
                id: 'please select the field corresponding to the size series'
              }) }
              notFoundContent={ notFoundContent }
              onSelect={this.handleChange.bind(this)}>
                {this.state.fields}
              </Select>)
            }
          </FormItem>
        )
      }

      if (theme === 'rank') {
        components.push(
          <FormItem key="yAxis" {...formItemLayout}
            label={ intl.formatMessage({ id: 'y axis', defaultMessage: 'Y轴' }) }>
            {
              getFieldDecorator('yAxis', { initialValue: data.yAxis })
              (<Select placeholder={ intl.formatMessage({
                defaultMessage: '请选择Y轴对应的字段',
                id: 'please select the field corresponding to the y axis'
              }) }
              notFoundContent={ notFoundContent }
              onSelect={this.handleChange.bind(this)}>
                {this.state.fields}
              </Select>)
            }
          </FormItem>
        )
      }

      if (theme === 'rank' || theme === 'basic') {
        this.state.series.forEach((value, index) => {
          let key = index
          let val = value
          let classname = key === 0 ? '' : 'series-item-added'
          let deleteBtn = []
          if (key !== 0) {
            deleteBtn.push(
              <Button key='delete-btn' type="primary" className="btn delete-series"
                title={ deleteSeries }
                onClick={this.handleRemoveSeries.bind(this, key, 'series')}>
                <Icon type='delete'/>
              </Button>
            )
          }
          components.push(
            <FormItem {...formItemLayout}
              label={ intl.formatMessage({ id: 'series', defaultMessage: '值系列' }) }
              className={classname} key={key}
            >
              {
                getFieldDecorator(`series[${key}]`, { initialValue: val })
                (<Select placeholder={ intl.formatMessage({
                  defaultMessage: '请选择系列对应的字段',
                  id: 'please select the corresponding field for the series'
                }) }
                onSelect={this.handleChange.bind(this)}
                notFoundContent={ notFoundContent }>
                  {this.state.fields}
                </Select>)
              }
              { deleteBtn }
            </FormItem>
          )
        })

        components.push(
          <div key="add-series" className="dataSet-btn">
            <Button type="primary" className="btn add-series"
              title={ intl.formatMessage({ id: 'add series', defaultMessage: '添加系列' }) }
              onClick={this.handleAddSeries.bind(this, 'series')}>
              <Icon type='plus'/>
            </Button>
          </div>
        )
      }

      if (theme === 'barLine') {
        this.state.series.forEach((value, index) => {
          let key = index
          let val = value
          let classname = key === 0 ? '' : 'series-item-added'
          let deleteBtn = []
          if (key !== 0) {
            deleteBtn.push(
              <Button key='delete-btn' type="primary" className="btn delete-series"
                title={ intl.formatMessage({ id: 'remove the column series', defaultMessage: '删除柱状系列' }) }
                onClick={this.handleRemoveSeries.bind(this, key, 'series')}>
                <Icon type='delete'/>
              </Button>
            )
          }
          components.push(
            <FormItem {...formItemLayout} className={classname} key={key}
              label={ intl.formatMessage({ id: 'column series', defaultMessage: '柱状系列' }) }>
              {
                getFieldDecorator(`series[${key}]`, { initialValue: val })
                (<Select placeholder={ intl.formatMessage({
                  id: 'please select the corresponding field for the series',
                  defaultMessage: '请选择系列对应的字段'
                }) }
                onSelect={this.handleChange.bind(this)}
                notFoundContent={ notFoundContent }>
                  {this.state.fields}
                </Select>)
              }
              { deleteBtn }
            </FormItem>
          )
        })

        components.push(
          <div key="add-series" className="dataSet-btn">
            <Button type="primary" className="btn add-series"
              title={ intl.formatMessage({ id: 'add the column series', defaultMessage: '添加柱状系列' }) }
              onClick={this.handleAddSeries.bind(this, 'series')}>
              <Icon type='plus'/>
            </Button>
          </div>
        )

        this.state.seriesSecond.forEach((value, index) => {
          let key = index
          let val = value
          let classname = key === 0 ? '' : 'series-item-added'
          let deleteBtn = []
          if (key !== 0) {
            deleteBtn.push(
              <Button key='delete-btn' type="primary" className="btn delete-series"
                title={ intl.formatMessage({ id: 'remove line series', defaultMessage: '删除折线系列' }) }
                onClick={this.handleRemoveSeries.bind(this, key, 'seriesSecond')}>
                <Icon type='delete'/>
              </Button>
            )
          }
          components.push(
            <FormItem {...formItemLayout} className={classname} key={`seriesSecond[${key}]`}
              label={ intl.formatMessage({ id: 'line series', defaultMessage: '折线系列' }) }>
              {
                getFieldDecorator(`seriesSecond[${key}]`, { initialValue: val })
                (<Select placeholder={ intl.formatMessage({
                  id: 'please select the corresponding field for the series',
                  defaultMessage: '请选择系列对应的字段'
                }) }
                onSelect={this.handleChange.bind(this)}
                notFoundContent={ notFoundContent }>
                  {this.state.fields}
                </Select>)
              }
              { deleteBtn }
            </FormItem>
          )
        })

        components.push(
          <div key="add-series-line" className="dataSet-btn">
            <Button type="primary" className="btn add-series"
              title={ intl.formatMessage({ id: 'add line series', defaultMessage: '添加折线系列' }) }
              onClick={this.handleAddSeries.bind(this, 'seriesSecond')}>
              <Icon type='plus'/>
            </Button>
          </div>
        )
      }

    }

    if (type === 'process') {
      components.push(
        <FormItem key="value" {...formItemLayout}
          label={ intl.formatMessage({ id: 'series', defaultMessage: '值系列' }) }
        >
          {
            getFieldDecorator('value', { initialValue: data.value })
            (<Select placeholder={ intl.formatMessage({
              defaultMessage: '请选择值系列对应的字段',
              id: 'please select the field corresponding to the value series'
            }) }
            onSelect={this.handleChange.bind(this)}
            notFoundContent={ notFoundContent }>
              {this.state.fields}
            </Select>)
          }
        </FormItem>
      )
    }

    /**
     * 饼图配置 漏斗图配置 雷达图配置
     */
    if (type === 'pie' || type === 'funnel' || type === 'radar') {
      components.push(
        <FormItem key="name" {...formItemLayout}
          label={ intl.formatMessage({ id: 'category series', defaultMessage: '分类系列' }) }>
          {
            getFieldDecorator('name', { initialValue: data.name })
            (<Select placeholder={ intl.formatMessage({
              defaultMessage: '请选择分类系列对应的字段',
              id: 'please select the field corresponding to the category series'
            }) }
            onSelect={this.handleChange.bind(this)}
            notFoundContent={ notFoundContent }>
              {this.state.fields}
            </Select>)
          }
        </FormItem>
      )

      if (type === 'pie' || type === 'funnel') {
        components.push(
          <FormItem key="value" {...formItemLayout}
            label={ intl.formatMessage({ id: 'series', defaultMessage: '值系列' }) }
          >
            {
              getFieldDecorator('value', { initialValue: data.value })
              (<Select placeholder={ intl.formatMessage({
                defaultMessage: '请选择值系列对应的字段',
                id: 'please select the field corresponding to the value series'
              }) }
              onSelect={this.handleChange.bind(this)}
              notFoundContent={ notFoundContent }>
                {this.state.fields}
              </Select>)
            }
          </FormItem>
        )
      } else {

        this.state.series.forEach((value, index) => {
          let key = index
          let val = value
          let classname = key === 0 ? '' : 'series-item-added'
          let deleteBtn = []
          if (key !== 0) {
            deleteBtn.push(
              <Button key='delete-btn' type="primary" className="btn delete-series"
                title={ deleteSeries }
                onClick={this.handleRemoveSeries.bind(this, key, 'series')}>
                <Icon type='delete'/>
              </Button>
            )
          }
          components.push(
            <FormItem {...formItemLayout}
              label={ intl.formatMessage({ id: 'series', defaultMessage: '值系列' }) }
              className={classname} key={key}
            >
              {
                getFieldDecorator(`series[${key}]`, { initialValue: val })
                (<Select placeholder={ intl.formatMessage({
                  id: 'please select the corresponding field for the series',
                  defaultMessage: '请选择系列对应的字段'
                }) }
                onSelect={this.handleChange.bind(this)}
                notFoundContent={ notFoundContent }>
                  {this.state.fields}
                </Select>)
              }
              { deleteBtn }
            </FormItem>
          )
        })

        components.push(
          <div key="add-series" className="dataSet-btn">
            <Button type="primary" className="btn add-series"
              title={ intl.formatMessage({ id: 'add series', defaultMessage: '添加系列' }) }
              onClick={this.handleAddSeries.bind(this, 'series')}>
              <Icon type='plus'/>
            </Button>
          </div>
        )
      }

    }

    /**
     * 仪表盘、文本配置
     */
    if (type === 'gauge' || klass === 'text') {
      components.push(
        <FormItem key="seriesKey" {...formItemLayout}
          label={ intl.formatMessage({ id: 'series', defaultMessage: '值系列' }) }
        >
          {
            getFieldDecorator('guageSeriesKey', { initialValue: data.seriesKey })
            (<Select placeholder={ intl.formatMessage({
              defaultMessage: '请选择值系列对应的字段',
              id: 'please select the field corresponding to the value series'
            }) }
            onSelect={this.handleChange.bind(this)}
            notFoundContent={ notFoundContent }>
              {this.state.fields}
            </Select>)
          }
        </FormItem>
      )
    }

    /**
     * 滚动计数器
     */
    if (type === 'counter') {
      components.push(
        <FormItem key="counter" {...formItemLayout}
          label={ intl.formatMessage({ id: 'digital series', defaultMessage: '数字系列' }) }>
          {
            getFieldDecorator('seriesKey', { initialValue: data.seriesKey })
            (<Select placeholder={ intl.formatMessage({
              id: 'please select the field corresponding to the series',
              defaultMessage: '请选择数字系列对应的字段'
            }) }
            onSelect={this.handleChange.bind(this)}
            notFoundContent={ notFoundContent }>
              {this.state.fields}
            </Select>)
          }
        </FormItem>
      )
    }

    /**
     * 表格
     */
    if (type === 'table') {
      this.state.series.forEach((value, index) => {
        let key = index
        let val = value
        let classname = key === 0 ? '' : 'series-item-added'
        let deleteBtn = []
        if (key !== 0) {
          deleteBtn.push(
            <Button key='delete-btn' type="primary" className="btn delete-series"
              title={ deleteSeries }
              onClick={this.handleRemoveSeries.bind(this, key, 'series')}>
              <Icon type='delete'/>
            </Button>
          )
        }
        components.push(
          <FormItem {...formItemLayout} className={classname} key={key}
            label={ intl.formatMessage({ id: 'show columns', defaultMessage: '显示列' }) }>
            {
              getFieldDecorator(`series[${key}]`, { initialValue: val })
              (<Select placeholder={ intl.formatMessage({
                defaultMessage: '请选择显示列对应的字段',
                id: 'please select the field corresponding to the display column'
              }) }
              onSelect={this.handleChange.bind(this)}
              notFoundContent={ notFoundContent }>
                {this.state.fields}
              </Select>)
            }
            { deleteBtn }
          </FormItem>
        )
      })

      components.push(
        <div key="add-series" className="dataSet-btn">
          <Button type="primary" className="btn add-series"
            title={ intl.formatMessage({ id: 'add show columns', defaultMessage: '添加显示列' }) }
            onClick={this.handleAddSeries.bind(this, 'series')}>
            <Icon type='plus'/>
          </Button>
        </div>
      )
    }

    /**
     * 应用卡片
     */
    if (type === 'card') {
      components.push(
        <FormItem {...formItemLayout} key="key series"
          label={ intl.formatMessage({ id: 'key series', defaultMessage: 'KEY系列' }) }>
          {
            getFieldDecorator('key', { initialValue: data.key })
            (<Select placeholder={ intl.formatMessage({
              defaultMessage: '请选择KEY系列对应的字段',
              id: 'please select the field corresponding to the key series'
            }) }
            onSelect={this.handleChange.bind(this)}
            notFoundContent={ notFoundContent }>
              {this.state.fields}
            </Select>)
          }
        </FormItem>
      );
      components.push(
        <FormItem {...formItemLayout} key="value series"
          label={ intl.formatMessage({ id: 'series', defaultMessage: '值系列' }) }>
          {
            getFieldDecorator('value', { initialValue: data.value })
            (<Select placeholder={ intl.formatMessage({
              defaultMessage: '请选择值系列对应的字段',
              id: 'please select the field corresponding to the value series'
            }) }
            onSelect={this.handleChange.bind(this)}
            notFoundContent={ notFoundContent }>
              {this.state.fields}
            </Select>)
          }
        </FormItem>
      )
    }

    /**
     * 地图
     */
    if (type === 'geo') {
      components.push(
        <GeoDataSetting theme={theme} widgetId={this.props.widgetId} key="seriesKey" data={data}
          fields={this.state.fields} form={this.props.form} handleChange={this.handleChange.bind(this)}/>
      )
    }

    /**
     * 动态图片
     */
    else if (type === 'dynamicimage') {
      components.push(
        <DynamicImageSetting theme={theme} widgetId={this.props.widgetId} data={data}
          fields={this.state.fields} key="dynamicimage"
          form={this.props.form} handleChange={this.handleChange.bind(this)}/>
      )
    }

    return components
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    let { widgetId, chartConfig } = this.props
    let component = null

    if (widgetId) {
      component = (
        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
          {
            chartConfig.type === 'mold'
              ? <MoldDataSetting theme={chartConfig.theme} widgetId={this.props.widgetId} data={this.state.data}
                fields={this.state.fields} form={this.props.form} handleChange={this.handleChange.bind(this)}/>
              : <div>
                <FormItem {...formItemLayout}
                  label={ intl.formatMessage({ id: 'data source', defaultMessage: '数据源' }) }
                >
                  {
                    getFieldDecorator('source', { initialValue: this.state.initialDataSource })
                    (<Select placeholder={ intl.formatMessage({
                      id: 'please select the data source',
                      defaultMessage: '请选择数据源'
                    }) }
                    notFoundContent={ intl.formatMessage({
                      id: 'no data source available',
                      defaultMessage: '没有可用数据源'
                    }) }
                    onChange={this.handleDataSourceChange.bind(this)}>
                      { this.getDataSourcesComponent() }
                    </Select>)
                  }
                </FormItem>

                <div className="dataSet-btn">
                  <Button type="primary" className="btn"
                    title={ intl.formatMessage({ id: 'new', defaultMessage: '新建' }) }
                    onClick={this.handleShowSourceModal.bind(this)}>
                    { intl.formatMessage({ id: 'new', defaultMessage: '新建' }) }
                  </Button>
                </div>

                <AddandEditSourceModal
                  visible={this.state.isShowAddSourceModal}
                  handleHide={this.handleHideSourceModal.bind(this)}
                  onSuccess={this.handleAddSourceSuccess.bind(this)}
                />

                <FormItem {...formItemLayout}
                  label={ intl.formatMessage({ id: 'data set', defaultMessage: '数据集' }) }
                >
                  {
                    getFieldDecorator('id',
                      { initialValue: this.state.initialDataSet }
                    )
                    (<Select placeholder={ intl.formatMessage({
                      id: 'please select the dataset',
                      defaultMessage: '请选择数据集'
                    }) }
                    notFoundContent={ intl.formatMessage({
                      id: 'no data set available',
                      defaultMessage: '没有可用数据集'
                    }) }
                    onChange={this.handleDataSetChange.bind(this)}>
                      {this.state.dataSets}
                    </Select>)
                  }
                </FormItem>

                {this.state.isStateSource ?
                  <div className="dataSet-btn">
                    <Button type="primary" className="btn" disabled={!getFieldValue('id')}
                      title={ intl.formatMessage({ id: 'view', defaultMessage: '查看数据' })  }
                      onClick={this.handleShowViewDataModal.bind(this)}>
                      { intl.formatMessage({ id: 'view', defaultMessage: '查看数据' })  }
                    </Button>
                  </div>
                  :
                  <div className="dataSet-btn">
                    <Button type="primary" className="btn" disabled={!getFieldValue('id')}
                      title={ intl.formatMessage({ id: 'view', defaultMessage: '查看数据' })  }
                      onClick={this.handleShowViewDataModal.bind(this, getFieldValue('id'))}>
                      { intl.formatMessage({ id: 'view', defaultMessage: '查看数据' })  }
                    </Button>
                    {this.state.dataSourceClass === 'OpenAPI' ?
                      <Button type="primary" className="btn"
                        title={ intl.formatMessage({ id: 'edit', defaultMessage: '编辑' }) }
                        disabled={!getFieldValue('id')}
                        onClick={this.handleShowOpenApiModal.bind(this, getFieldValue('id'))}>
                        { intl.formatMessage({ id: 'edit', defaultMessage: '编辑' }) }
                      </Button> :
                      <Button type="primary" className="btn"
                        title={ intl.formatMessage({ id: 'edit', defaultMessage: '编辑' }) }
                        disabled={!getFieldValue('id')}
                        onClick={this.handleShowAddSetModal.bind(this, 'edit', getFieldValue('id'))}>
                        { intl.formatMessage({ id: 'edit', defaultMessage: '编辑' }) }
                      </Button>
                    }
                    {this.state.dataSourceClass === 'OpenAPI' ? null :
                      <Button type="primary" className="btn"
                        title={ intl.formatMessage({ id: 'new', defaultMessage: '新建' }) }
                        disabled={!getFieldValue('source')}
                        onClick={this.handleShowAddSetModal.bind(this, 'add')}>
                        { intl.formatMessage({ id: 'new', defaultMessage: '新建' }) }
                      </Button>
                    }
                  </div>
                }

                <AddandEditSetModal
                  visible={this.state.isShowAddSetModal}
                  isEdit={this.state.isEdit}
                  sourceId={getFieldValue('source')}
                  id={getFieldValue('id')}
                  dataType={this.state.dataSourceClass}
                  handleHide={this.handleHideAddSetModal.bind(this)}
                  onSuccess={this.handleAddSetSuccess.bind(this)}
                />

                <EditOpenApiModal
                  id={getFieldValue('id')}
                  type={this.state.dataSourceClass}
                  visible={this.state.isShowOpenApiModal}
                  handleHide={this.handleHideOpenApiModal.bind(this)}
                  onSuccess={this.handleAddSetSuccess.bind(this)}
                />

                <ViewDataModal
                  visible={this.state.isShowViewDataModal}
                  id={getFieldValue('id')}
                  dataType={this.state.dataSourceClass}
                  handleHide={this.handleHideViewDataModal.bind(this)}
                />

                { this.getChartSelectComponents(this.props.chartConfig, this.state.data) }
              </div>
          }
        </Form>
      )
    } else {
      component = (<NoopSetting />)
    }

    return (
      <div className="data-set-setting setting-pane" style={{ height: this.props.height }}>
        {component}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { dataSet, dataSource } = state

  return {
    dataSet,
    dataSource
  }
}

DataSetSetting = Form.create()(DataSetSetting)

export default connect(mapStateToProps)(DataSetSetting)
