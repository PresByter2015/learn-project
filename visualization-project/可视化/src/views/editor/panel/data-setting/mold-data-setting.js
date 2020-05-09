import './index.styl'

import { updateWidget } from 'store/window/actions'
import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Select } from 'antd'
import _ from 'lodash'
import getJSON from '../getClasses'
const FormItem = Form.Item
import event from '../../event'
import url from 'src/config/urls'
import intl from 'src/intl'

let simulatedData;

const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

let MoldDataSetting = React.createClass({
  propTypes: {
    form: React.PropTypes.object,
    data: React.PropTypes.object,
    theme: React.PropTypes.string,
    handleChange: React.PropTypes.func,
    widgets: React.PropTypes.object,
    activeWidgetId: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    widgetId: React.PropTypes.string,
  },

  getInitialState() {

    return {
      moldType: null,
      activeTypeData: null,
      outsideDisplay: true,
      inputV: '',
      iconTypes: {},
      categoryData: [],
      activeOption: null
    }
  },

  handleChange(value) {
    this.setState({
      moldType: value
    });
  },

  optionChange(value) {
    let activeId = this.state.activeOptionIds.find((item) => {
      return item.name === value
    }).id;
    let id = this.props.activeWidgetId
    this.setState({
      activeOption: value
    });
    let saveData = {
      activeOption: value,
      inputV: this.state.inputV,
      activeId: activeId
    }
    this.props.dispatch(updateWidget(this.props.widgetId, { dataSetting: saveData }))
    event.emit('moldBaseNameChange', id, saveData)
  },

  setInputValue(code) {
    getJSON(url.get('moldConfig') + code).then(data=> {
      this.setState({
        activeTypeData: data.data.map(item=> {
          return item.name
        }),
        activeOptionIds: data.data
      });
    });
    for (let i in this.state.iconTypes) {
      this.state.iconTypes[i] = 'down'
    }
    this.setState({
      outsideDisplay: true,
      iconTypes: this.state.iconTypes,
      inputV: this.state.categoryData.find((item)=> {
        return item.code === code
      }).name,
      activeOption: ''
    });
  },

  componentWillMount() {
    let id = this.props.activeWidgetId;
    let { dataSetting } = this.props.widgets[id]
    if (dataSetting) {
      event.emit('moldBaseNameChange', id, dataSetting)
    }
    getJSON(url.get('moldType')).then(data => {
      if (!data.data) {
        console.error('The request failed ');
        return
      }
      //返回的数据
      simulatedData = data
      //存放所有classes的数组
      let categoryData = [];
      //临时过渡数组
      let transitionData = simulatedData.data && simulatedData.data.map(item=> {
        return item.classes
      });
      for (let i = 0; i < transitionData.length; i++) {
        for (let j = 0; j < transitionData[i].length; j++) {
          categoryData.push(transitionData[i][j])
        }
      }
      //处理Icon状态的数组
      let iconTypes = {};
      for (let i = 0; i < simulatedData.data.length; i++) {
        iconTypes[simulatedData.data[i].code] = 'down';
      }
      this.setState({
        iconTypes,
        categoryData,
        simulatedData
      });
      if (this.props.activeWidgetId === this.props.activeWidgetId) {
        const id = this.props.activeWidgetId;
        let tmp = this.props.widgets[id].dataSetting;
        if (id) {
          const { tag } = this.props.widgets[id].chart
          if (!this.state.categoryData.length) {
            return
          }
          let tagObj = this.state.categoryData.find((item)=> {
            return item.code === tag
          })
          tagObj = tagObj || {}
          this.setState({
            inputV: tagObj['name'],
            activeOption: tmp && tmp.activeOption ? tmp.activeOption : ''
          })
          getJSON(url.get('moldConfig') + tagObj['code']).then(data=> {
            this.setState({
              activeTypeData: data.data.map(item=> {
                return item.name
              }),
              activeOptionIds: data.data
            });
          });
        }
      }
    });
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.activeWidgetId !== nextProps.activeWidgetId) {
      const id = nextProps.widgetId;
      let tmp = this.props.widgets[id].dataSetting;
      if (id) {
        const { tag } = nextProps.widgets[id].chart
        if (!this.state.categoryData.length) {
          return
        }
        let tagObj = this.state.categoryData.find((item)=> {
          return item.code === tag
        })
        tagObj = tagObj || {}
        this.setState({
          inputV: tagObj['name'],
          activeOption: tmp && tmp.activeOption ? tmp.activeOption : ''
        })
        getJSON(url.get('moldConfig') + tagObj['code']).then(data=> {
          this.setState({
            activeTypeData: data.data.map(item=> {
              return item.name
            }),
            activeOptionIds: data.data
          });
        });
      }
    }
  },


  handleClick(code) {
    let newIconTypes = _.clone(this.state.iconTypes);
    newIconTypes[code] = newIconTypes[code] === 'down' ? 'up' : 'down';
    this.setState({
      iconTypes: newIconTypes
    })
  },

  handleBlur() {
    for (let i in this.state.iconTypes) {
      this.state.iconTypes[i] = 'down'
    }
    this.setState({
      outsideDisplay: true,
      iconTypes: this.state.iconTypes
    })
  },

  handleOutClick() {
    if (!this.state.simulatedData) {
      return
    }
    let transitionData = this.state.simulatedData.data;
    let displayList;
    for (let i = 0; i < transitionData.length; i++) {
      for (let j = 0; j < transitionData[i].classes.length; j++) {
        if (this.state.inputV === transitionData[i].classes[j].name) {
          displayList = transitionData[i].code
        }
      }
    }
    for (let i in this.state.iconTypes) {
      this.state.iconTypes[i] = 'down'
    }
    this.state.iconTypes[displayList] = 'up';
    this.setState({
      outsideDisplay: !this.state.outsideDisplay,
      iconTypes: this.state.iconTypes,
      activeOption: ''
    })
  },

  //添加MenuItem
  addLevelOne(data) {
    if (data && data.data) {
      return data.data.map((item, key = 'id')=> {
        return (
          <li key={key} value={item.code} onClick={this.handleClick.bind(this, item.code)}
            style={{ cursor: 'pointer' }}
          >
            <div
              onClick={this.handleClick.bind(this, item.code)}
              style={{ marginLeft: '8px' }}>{item.name}
              <Icon type={this.state.iconTypes[item.code]} style={{ marginLeft: '62px' }}/>
            </div>
            <ul style={{
              display: this.state.iconTypes[item.code] === 'down' ? 'none' : 'block',
              background: '#1d6aa7'
            }}>
              {item.classes.map((item, key = 'id')=> {
                return (<li key={key} value={item.code}
                  style={{ background: this.state.inputV === item.name ? '#1681c4' : '#1d6aa7' }}>
                  <span onClick={this.setInputValue.bind(this, item.code)}
                    style={{
                      display: 'inline-block',
                      height: '22px',
                      marginLeft: '12px',
                      lineHeight: '22px'
                    }}>{item.name}</span>
                </li>)
              })}
            </ul>
          </li>
        )
      })
    } else {
      return null;
    }
  },

  addConfigOption() {
    let data = this.state.activeTypeData;
    if (data) {
      let arr = data.map((item, key = 'id') => {
        return <Option key={key} value={item}>{item}</Option>
      })
      return arr
    }
  },

  handleChange() {
    setTimeout(() => {
      this.props.handleChange()
    })
  },

  render() {
    return (
      <div key='mold'>
        <FormItem key='type' {...formItemLayout}
          label={ intl.formatMessage({ id: 'mold type', defaultMessage: '类型' }) }>
          <div ref='test' tabIndex='0' onBlur={this.handleBlur}>
            <div className="ant-select-lg" style={{
              color: '#fff',
              border: '1px solid #2b3466',
              padding: '0px 7px',
              cursor: 'pointer',
              'border-radius': '18px',
              'outline': 'none'
            }}
            onClick={this.handleOutClick}>
              {this.state.inputV ?
                this.state.inputV : intl.formatMessage({ id: 'network equipment', defaultMessage: '网络设备' })}</div>
            <Icon type={this.state.outsideDisplay === true ? 'down' : 'up'}
              onClick={this.handleOutClick}
              style={{ position: 'absolute', right: '10px', top: '10px' }}/>
            <ul style={{
              border: '1px solid #3d84bc', display: this.state.outsideDisplay === true ? 'none' : 'block',
              width: '100%', backgroundColor: '#1d6aa7', maxHeight: '250px', overflowY: 'scroll',
              borderRadius: '5px', position: 'absolute', zIndex: '10'
            }}>
              { this.addLevelOne(simulatedData) }
            </ul>
          </div>
        </FormItem>

        <FormItem key='item' {...formItemLayout}
          label={ intl.formatMessage({ id: 'configuration item', defaultMessage: '配置项' }) }>
          <Select
            showSearch
            placeholder={ intl.formatMessage({ id: 'please select', defaultMessage: '请选择' })}
            optionFilterProp="children"
            value={ this.state.activeOption ? this.state.activeOption : ''}
            onChange={this.optionChange}
            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            { this.addConfigOption()}
          </Select>
        </FormItem>
      </div>
    )
  }
})

function mapStateToProps(state) {
  const { widgets } = state.window
  const { activeWidgetId } = state.editor

  return {
    widgets,
    activeWidgetId,
  }
}

export default connect(mapStateToProps)(MoldDataSetting)
