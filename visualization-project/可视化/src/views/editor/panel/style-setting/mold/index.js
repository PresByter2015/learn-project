import React, { Component, PropTypes } from 'react'
import { Form, Checkbox, Select } from 'antd'
import intl from 'src/intl'
import ChartOptionSettingItem from 'components/chart/chart-option-setting-item'
import DynamicSelect from 'src/components/form/Controls/dynamic-select'
import DynamicSlider from 'src/components/form/Controls/dynamic-slider'
import eventEmitter from '../../../event'
import { connect } from 'react-redux'
// import Mold from 'src/models/mold'
import InteractComponent from './interact'

const FormItem = Form.Item
const Option = Select.Option
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}


class HaloComponent extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    isChecked: PropTypes.bool
  }

  constructor() {
    super()
    this.state = {
      isChecked: false
    }
  }

  componentWillMount() {
    const { isChecked } = this.props
    this.setState({ isChecked })
  }

  handleCheckBoxChange(name, e) {
    if (e && e.target) {
      const value = e.target.checked
      this.props.onChange(name, value)
      this.setState({ isChecked: value })
    }
  }

  render() {
    const { isChecked } = this.state
    return (<div>
      <Checkbox onChange={ this.handleCheckBoxChange.bind(this, 'renderShow') }
        checked={ isChecked } defaultChecked={false}>
        { intl.formatMessage({ id: 'halo', defaultMessage: '光晕' }) }
      </Checkbox>
    </div>)
  }

}

class SelectComponent extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.array,
    selectValue: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ])
  }

  constructor() {
    super()
    this.state = {
      options: [],
      selectValue: null
    }
  }

  componentWillMount() {
    const { selectValue, options } = this.props
    this.setState({ selectValue: selectValue.value, options })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        options: nextProps.options,
        selectValue: nextProps.selectValue && nextProps.selectValue.value ?
          nextProps.selectValue.value : nextProps.selectValue
      })
    }
  }

  componentWillUnmount() {
    eventEmitter.removeListener('isCheckStatus')
  }

  getListIndex(targetValue, targetArray) {
    let index = null
    for (let i = 0, len = targetArray.length; i < len; i++) {
      const item = targetArray[i]
      if (item.code === targetValue) {
        index = i
      }
    }
    return index
  }

  itemIsArray(tag) {
    const { options } = this.state
    const index = this.getListIndex(tag, options)
    return options[index] && options[index].items && Array.isArray(options[index].items)
  }

  handleSelectChange(name, value) {
    let copyObj = Object.assign(this.props)
    let { id } = copyObj;
    let { dataSetting } = copyObj.widgets[id];
    this.setState({ selectValue: value })
    const flag = this.itemIsArray(value)
    if ( dataSetting ) {
      let { activeId } = copyObj.widgets[id].dataSetting;
      eventEmitter.emit('isCheckStatus', { activeId, flag });
      this.props.onChange(name, { value, tag: flag })
    } else {
      this.props.onChange(name, { value, tag: flag });
    }
  }

  render() {
    let { options = [], selectValue } = this.state
    const Options = options.map( (item, index) => {
      return (<Option key={index} value={item.code}>{ item.name }</Option>)
    })

    selectValue = typeof selectValue === 'object' ? selectValue.value : selectValue
    return (<div>
      <Select onChange={ this.handleSelectChange.bind(this, 'selectType') } placeholder={'请先进行数据配置'}
        defaultValue={ selectValue } value={selectValue}>
        { Options }
      </Select>
    </div>)

  }

}

class DynamicSelectComponent extends Component {
  static propTypes = {
    value: PropTypes.array,
    label: PropTypes.string,
    data: PropTypes.object, //list的某一项
    onChange: PropTypes.func
  }

  constructor() {
    super()
    this.state = {
      value: '',
      options: []
    }
  }

  componentWillMount() {
    let { value, data = {} } = this.props
    if (!value[0]) {
      value = [{ value: data && data.items && data.items[0].value, color: '#0f0' }]
    }
    this.setState({
      value,
      options: (data && data.items) || []
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        value: nextProps.value || (nextProps.data && nextProps.data.code),
        options: nextProps.data && nextProps.data.items,
      })
    }
  }

  generateSelectMenu() {
    const { options } = this.state
    let _list = []
    if (options && Array.isArray(options)) {
      return _list = options.map( (item) => {
        return { label: item.name, value: item.value, color: '#0f0' }
      })
    }
    return { list: _list, maxLength: _list.length }
  }

  handleDynamicSelectChange(name, value) {
    this.props.onChange(name, value)
  }

  render() {
    const { value } = this.state
    const { label = '' } = this.props

    const _Options = this.generateSelectMenu()

    return (
      <DynamicSelect label={label} value={value || _Options.list[0]}
        options={_Options} maxLength={_Options.length}
        onChange={this.handleDynamicSelectChange.bind(this, 'index_rule_select')} />
    )
  }

}


class DynamicSliderComponent extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    data: PropTypes.object,
    value: PropTypes.array,
    max: PropTypes.number
  }

  constructor() {
    super()
    this.state = {
      data: {},
      value: [],
      max: 0
    }
  }

  componentWillMount() {
    let { value, max = 5, data = {} } = this.props
    if (!value[0]) {
      value = [[{ value: 0, color: '#0f0' }, { value: 100, color: '#f00' }]]
    }
    this.setState({
      data,
      value,
      max
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        data: nextProps.data || {},
        value: nextProps.value || [],
        max: nextProps.max || 5
      })
    }
  }

  generateSlideMenu() {
    const { data } = this.state
    if (data && data.hasOwnProperty('min') && data.hasOwnProperty('max')) {
      return {
        value: [{ value: data.min || 0, color: '#0f0' }, { value: data.max || 100, color: '#f00' }],
        max: 5
      }
    } else {
      return {
        value: [{ value: 0, color: '#0f0' }, { value: 100, color: '#f00' }],
        max: 5
      }
    }
  }

  handleDynamicSliderChange(name, value) {
    this.props.onChange(name, value)
  }

  render() {
    let { value, max } = this.state
    value = value ? value : this.generateSlideMenu()

    return (
      <DynamicSlider range={false} value={value} max={max}
        onChange={this.handleDynamicSliderChange.bind(this, 'index_rule_slider')} />
    )
  }

}

class MoldStyleSetting extends Component {
  static propTypes = {
    form: PropTypes.object,
    onChange: PropTypes.func,
    data: PropTypes.object,
    editor : PropTypes.object,
    widgets : PropTypes.object
  }

  constructor() {
    super()
    this.state = {
      data: {},
      list: [],
      isChecked: false,
      selectValue: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data = {} } = nextProps;
    this.setState({
      data,
      isChecked: data.renderShow,
      selectValue: data.selectType,
    })
  }

  componentWillMount() {
    //数据请求接口,数据库为空,所以暂时注释掉
    // Mold.getSelectItem('58fdf3c4f603a80a08600660').then( (res) => {
    //   console.log(res)
    //   if (res && res.data) {
    //     this.setState({ list: res.data })
    //   }
    // })
    //假数据
    const FAlSEDATA = [
      {
        'code': 'net.ping.response',
        'name': 'PING响应时间',
        'items': null,
        'unit': 'ms',
        'precision': 0,
        'min': 0,
        'max': 0
      },
      {
        'code': 'system.cpu.usage',
        'name': 'CPU使用率',
        'items': null,
        'unit': '%',
        'precision': 1,
        'min': 0,
        'max': 100
      },
      {
        'code': 'system.mem.usage',
        'name': 'RAM使用率',
        'items': null,
        'unit': '%',
        'precision': 1,
        'min': 0,
        'max': 100
      },
      {
        'code': 'object.available',
        'name': '可用状态',
        'items': [
          {
            'index': -1,
            'name': '未知',
            'value': 'unknown'
          },
          {
            'index': 0,
            'name': '不可用',
            'value': 'off'
          },
          {
            'index': 1,
            'name': '可用',
            'value': 'on'
          }
        ],
        'unit': '',
        'precision': 0,
        'min': 0,
        'max': null
      }
    ]
    const { data = {} } = this.props
    this.setState({
      data,
      isChecked: data.renderShow,
      selectValue: data.selectType,
      list: FAlSEDATA
    })
  }

  handleHaloChange(name, value) {
    this.setState({ isChecked: value })
    this.props.onChange(name, value)
  }

  handleSelectChange(name, value) {
    this.setState({ selectValue: value })
    this.props.onChange(name, value)
  }

  handlePublicChange(name, value) {
    this.props.onChange(name, value)
  }

  itemsIsArray(tag, array, index) {
    return Boolean(array && array[index] && array[index].code === tag && array[index].items
      && Array.isArray(array[index].items))
  }

  getListIndex(targetValue, targetArray) {
    let index = 0
    for (let i = 0, len = targetArray.length; i < len; i++) {
      const item = targetArray[i]
      if (item.code === targetValue) {
        index = i
      }
    }
    return index
  }

  render() {
    const { list = [], selectValue = {}, isChecked = false, data = {} } = this.state
    let index = 0
    let dynamicData = null
    let isSelect = false
    if (selectValue && selectValue.value) {
      index = this.getListIndex(selectValue.value, list)
      isSelect = this.itemsIsArray(selectValue.value, list, index)
    } else {
      isSelect = Boolean(list && list[index] && list[index].items && Array.isArray(list[index].items))
    }
    dynamicData = isSelect ? (data && data['index_rule'] || list[index]) : list[index]

    const showElement = Boolean(selectValue.value && list.length) ?
      (
        isSelect ?
          <FormItem {...formItemLayout} key={'select'}>
            <DynamicSelectComponent label={intl.formatMessage({ id: 'status', defaultMessage: 'status' })}
              value={dynamicData} data={list[index]}
              onChange={this.handlePublicChange.bind(this)} />
          </FormItem>
          :
          <FormItem className={'sliderOut'} {...formItemLayout} key={'slide'}>
            <DynamicSliderComponent value={dynamicData} data={list[index]}
              onChange={this.handlePublicChange.bind(this)} />
          </FormItem>
      )
      :
      (<p>{ intl.formatMessage({ id: 'please select indicator', defaultMessage: '请选择指标' }) }</p>)


    return (
      <Form horizontal style={{ width: '100%' }}>
        <ChartOptionSettingItem title={ intl.formatMessage({ id: 'render', defaultMessage: '渲染' }) }>
          <FormItem {...formItemLayout} key={'halo'}>
            <HaloComponent isChecked={isChecked} onChange={ this.handleHaloChange.bind(this) } />
          </FormItem>

          <FormItem {...formItemLayout} key={'index'}
            label={ intl.formatMessage({ id: 'index', defaultMessage: '指标' })}>
            <SelectComponent { ...this.props } options={list} selectValue={selectValue}
              onChange={ this.handleSelectChange.bind(this) } />
          </FormItem>

          { showElement }
        </ChartOptionSettingItem>

        <ChartOptionSettingItem title={ intl.formatMessage({ id: 'interact', defaultMessage: '交互' }) }>
          <InteractComponent
            data={ this.props.data }
            onChange={ this.handlePublicChange.bind(this) }/>
        </ChartOptionSettingItem>

      </Form>
    )
  }
}


function mapStateToProps(state) {
  const { widgets  } = state.window;
  const { editor } = state;

  return {
    widgets,
    editor
  }
}
MoldStyleSetting = Form.create()(MoldStyleSetting);
export default connect(mapStateToProps)(MoldStyleSetting);
