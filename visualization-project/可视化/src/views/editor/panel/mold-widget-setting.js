import 'rc-color-picker/assets/index.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NoopSetting from './NoopSetting';
import { Form, InputNumber, Radio } from 'antd';
import { updateWidget } from 'store/window/actions';
import fontSize from 'config/font-size';
import event from '../event';
import SelectOption from 'components/common/select-fontSize';
import ColorPickerTrigger from 'components/color-picker/trigger';
import Input from 'components/form/Controls/Input';
import intl from 'src/intl';
import $ from 'jquery';
import _ from 'lodash';
import { Grids } from 'config';
import colorUtils from 'utils/color';
import { updateChartStyleSetting } from 'store/window/actions';
import eventEmitter from '../event';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class WidgetSetting extends Component {
  static propTypes = {
    form: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    activeWidgetId: React.PropTypes.string,
    widget: React.PropTypes.object,
    window: React.PropTypes.object
  };

  constructor() {
    super();

    this.pathType = [];
    this.pathColor = [];
    this.pathColorOpacity = [];

    this.state = {
      nameWeight: 'normal',
      nameText: 'none',
      position: 'bottom',
      nameTextBg: true,
      nameWeightBg: true
    };
  }

  // 更新组件的配置参数
  updateSetting(data) {
    let id = this.props.activeWidgetId;
    let position = this.state.position;
    let newDataSetting = Object.assign(this.props.widget.dataSetting);
    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      } else {
        let settingData = _.omit(data, 'positionX', 'positionY', 'width', 'height'); //过滤掉x,y,w,h,拆分开setting
        settingData.position = position;
        newDataSetting.activeOption = settingData.name;
        let col = data.positionX + 1; //修改后挂回状态树加回1
        let row = data.positionY + 1; //修改后挂回状态树加回1
        this.props.dispatch(updateWidget(id, {
          setting: settingData,
          col: col,
          row: row,
          sizex: data.width,
          sizey: data.height,
          dataSetting: newDataSetting
        }));
        event.emit('moldBaseSettingChange', id, settingData);
      }
    });
  }

  componentWillMount() {
    // 模具上色
    this.handleMoldColor();
  }

  componentDidMount() {
    event.on('editor.changeActiveWidget', () => {
      this.props.form.resetFields();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeWidgetId !== nextProps.activeWidgetId || this.props.widget !== nextProps.widget) {
      this.props.form.resetFields();
      if (this.refs.selectoption) {
        this.refs.selectoption.resetFields();
      }

      // 模具上色
      this.pathType = [];
      this.pathColor = [];
      this.pathColorOpacity = [];
      this.handleMoldColor(nextProps);
    }
  }

  // 模具上色
  handleMoldColor(props = this.props) {
    const { activeWidgetId } = props;
    const pathElems = $(`#widget-${activeWidgetId} path`);
    const len = pathElems.length;
    let tmpObj = {};
    for (let i = 0; i < len; i++) {
      const className = pathElems[i].className.baseVal;
      if (!!~className.indexOf('huishe-vison')) {
        const txt = className.match(/huishe-vison-(.*)/)[1];
        let color = $(`#widget-${activeWidgetId} .${className}`).css('fill');
        color = color.replace(/(?:\(|\)|rgb|a|RGB|A| )*/g, '').split(',');
        const rgba = color.length > 3 ? `rgba(${color.join(', ')})` : `rgba(${color.join(', ')}, 1)`;
        const colorObj = colorUtils.parseRgba(rgba);
        if (!tmpObj[txt]) {
          tmpObj[txt] = true;
          this.pathType.push(txt);
          this.pathColor.push(colorObj.color);
          this.pathColorOpacity.push(colorObj.alpha);
        }
      }
    }
    if (this.pathType && this.pathType.length) {
      const moldColor = {};
      this.pathType.forEach((path, index) => {
        moldColor[path] = {
          color: this.pathColor[index],
          opacity: this.pathColorOpacity[index]
        };

        this.props.dispatch(updateChartStyleSetting(activeWidgetId, 'moldColor', moldColor));
        eventEmitter.emit('styleSettingChange', activeWidgetId, { name: 'moldColor', value: moldColor });
      });
    }

  }

  handeColorChange(type1, type2, data) {
    this.props.form.setFieldsValue({
      [type1]: data.color,
      [type2]: data.alpha
    });
    this.handleSubmit();
  }

  createMoldColor() {
    const { getFieldValue } = this.props.form;
    return (
      <FormItem {...formItemLayout} label={intl.formatMessage({ id: 'mold color', defaultMessage: '模具颜色' })}
                className="widget-setting-mold-color">
        {
          this.pathType.length ? (
            this.pathType.map((path, index) => (
              <ColorPickerTrigger
                key={index}
                color={getFieldValue(`${path}MoldColor`)}
                alpha={getFieldValue(`${path}MoldColorOpacity`)}
                onChange={this.handeColorChange.bind(this, `${path}MoldColor`, `${path}MoldColorOpacity`)}
              />)
            )
          ) : (
            <div className="color-picker-tips">
              {`*${intl.formatMessage({ defaultMessage: '该模具不支持变色', id: 'not support color' })}`}
            </div>
          )
        }
      </FormItem>
    );
  }

  handleSubmit() {
    const { activeWidgetId } = this.props;
    setTimeout(() => {
      let widgetData = this.props.form.getFieldsValue(); //除背景以外的数据

      // 模具上色的数据处理
      const moldColorData = Object.keys(widgetData).filter(data => {
        return !!~data.indexOf('MoldColor');
      });
      const moldColorItem = {};
      if (moldColorData && moldColorData.length) {
        const reg = /^(.+)(MoldColor|MoldColorOpacity)$/;
        let m = '';

        const tmp = {};
        moldColorData.forEach(item => {
          m = item.match(reg);

          const type = m[1];
          if (!tmp[type]) {
            tmp[type] = true;
            moldColorItem[type] = {};
          }
          if (m[2] === 'MoldColor') {
            moldColorItem[m[1]].color = widgetData[item];
          } else {
            moldColorItem[m[1]].opacity = widgetData[item];
          }
          delete widgetData[item];
        });
        this.props.dispatch(updateChartStyleSetting(activeWidgetId, 'moldColor', moldColorItem));
        eventEmitter.emit('styleSettingChange', activeWidgetId, { name: 'moldColor', value: moldColorItem });
      }

      this.updateSetting(Object.assign(widgetData));
    }, 100);
    return false;
  }

  onChange = (e) => {
    this.setState({
      position: e.target.value
    });
    this.handleSubmit();
  };

  handleColorChange(type1, type2, data) {
    this.props.form.setFieldsValue({
      [type1]: data.color,
      [type2]: data.alpha
    });
    this.handleSubmit();
  }

  handleSelectFontSize(value) {
    let nameSize = value;
    this.props.form.setFieldsValue({ nameSize });
    this.handleSubmit();
  }

  handleUClick() {
    if (this.state.nameText === 'none') {
      let nameText = 'underline';
      this.setState({
        nameText,
        nameTextBg: false
      });
      this.props.form.setFieldsValue({ nameText });
      this.handleSubmit();
    } else {
      let nameText = 'none';
      this.setState({
        nameText,
        nameTextBg: true
      });
      this.props.form.setFieldsValue({ nameText });
      this.handleSubmit();
    }
  }

  handleBClick() {
    if (this.state.nameWeight === 'normal') {
      let nameWeight = 'bold';
      this.setState({
        nameWeight,
        nameWeightBg: false
      });
      this.props.form.setFieldsValue({ nameWeight });
      this.handleSubmit();
    } else {
      let nameWeight = 'normal';
      this.setState({
        nameWeight,
        nameWeightBg: true
      });
      this.props.form.setFieldsValue({ nameWeight });
      this.handleSubmit();
    }
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    let settingPane = [];
    let widget = this.props.widget;
    let window = this.props.window;
    if (widget) {
      let setting = widget.setting;
      let dataSetting = widget.dataSetting;
      let styleSetting = widget.styleSetting;
      let moldColor = styleSetting && styleSetting.moldColor;
      let { screenRatio } = window; //画布比例(16:9、4:3等)
      let maxPositionX = Grids[screenRatio].cols - widget.sizex;
      let maxPositionY = Grids[screenRatio].rows - widget.sizey;
      let maxWidth = Grids[screenRatio].cols - widget.col + 1;
      let maxHeight = Grids[screenRatio].rows - widget.row + 1;
      settingPane.push(
        <Form ref="WidgetSetting" horizontal key="widget-setting">
          <FormItem {...formItemLayout} label={intl.formatMessage({ id: 'position', defaultMessage: '位置' })}>
            <div className="min-input-number">
              <span className="min-input-number-label">X</span>
              {getFieldDecorator('positionX', {
                initialValue: (widget.col - 1)
              })(
                <InputNumber min={0} max={maxPositionX} onChange={this.handleSubmit.bind(this)}/>
              )}
            </div>

            <div className="min-input-number">
              <span className="min-input-number-label">Y</span>
              {getFieldDecorator('positionY', {
                initialValue: (widget.row - 1)
              })(
                <InputNumber min={0} max={maxPositionY} onChange={this.handleSubmit.bind(this)}/>
              )}
            </div>
          </FormItem>

          <FormItem {...formItemLayout} label={intl.formatMessage({ id: 'size', defaultMessage: '尺寸' })}>
            <div className="min-input-number">
              <span className="min-input-number-label">W</span>
              {getFieldDecorator('width', {
                initialValue: widget.sizex
              })(
                <InputNumber min={1} max={maxWidth} onChange={this.handleSubmit.bind(this)}/>
              )}
            </div>

            <div className="min-input-number">
              <span className="min-input-number-label">H</span>
              {getFieldDecorator('height', {
                initialValue: widget.sizey
              })(
                <InputNumber min={1} max={maxHeight} onChange={this.handleSubmit.bind(this)}/>
              )}
            </div>
          </FormItem>

          <FormItem {...formItemLayout} label={intl.formatMessage({ id: 'name', defaultMessage: '名称' })}>
            {getFieldDecorator('name', {
              initialValue: dataSetting && dataSetting.activeOption ? dataSetting.activeOption : ''
            })(
              <Input placeholder={intl.formatMessage({ id: 'please enter the title', defaultMessage: '请输入标题' })}
                     name="title" onChange={this.handleSubmit.bind(this)}/>
            )}
          </FormItem>

          <FormItem {...formItemLayout}
                    label={intl.formatMessage({ id: 'font', defaultMessage: '标题字体' })}
                    className="widget-setting-title-style">
            {getFieldDecorator('nameSize', {
              initialValue: setting.nameSize ? setting.nameSize : 12
            })
            (<Input type="hidden"/>)
            }

            <SelectOption ref="selectoption"
                          min={fontSize.MIN_FONT_SIZE}
                          max={fontSize.MAX_FONT_SIZE}
                          step={2}
                          initialValue={setting.nameSize ? setting.nameSize : 12}
                          onChange={this.handleSelectFontSize.bind(this)}/>
            <br/>
            <div className="test-div" style={{ lineHeight: '32px', overflow: 'hidden' }}>
              <div style={{ float: 'left', marginTop: '2px' }}>
                {getFieldDecorator('nameWeight', {
                  initialValue: setting.nameWeight ? setting.nameWeight : 'normal'
                })
                (<span style={{
                  display: 'inline-block', border: '1px solid #297ebb',
                  width: '28px', marginTop: '3px',
                  padding: '0px 7px', height: '32px', lineHeight: '32px',
                  background: this.state.nameWeightBg ? '#145e99' : '#1681c4'
                }} onClick={this.handleBClick.bind(this)}>
                  <i className='anticon anticon-bold checked-icon'/>
                </span>)
                }
                {getFieldDecorator('nameText', {
                  initialValue: setting.nameText ? setting.nameText : 'none'
                })
                (<span style={{
                  display: 'inline-block', border: '1px solid #297ebb', padding: '0px 7px',
                  width: '28px', marginTop: '3px',
                  height: '32px', lineHeight: '32px',
                  background: this.state.nameTextBg ? '#145e99' : '#1681c4'
                }} onClick={this.handleUClick.bind(this)}>{'U'}</span>)
                }
              </div>
              {getFieldDecorator('textColor', {
                initialValue: setting.textColor ? setting.textColor : '#fff'
              })
              (<Input type="hidden"/>)
              }
              {getFieldDecorator('textColorOpacity', {
                initialValue: '100'
              })
              (<Input type="hidden"/>)
              }
              <div style={{ marginTop: '5px' }}>
                <ColorPickerTrigger
                  color={getFieldValue('textColor')}
                  alpha={getFieldValue('textColorOpacity')}
                  onChange={this.handleColorChange.bind(this, 'textColor', 'textColorOpacity')}
                  style={{ color: '#ff0' }}
                />
              </div>
            </div>
          </FormItem>

          <FormItem {...formItemLayout}
                    label={intl.formatMessage({ id: 'position', defaultMessage: '位置' })}
                    className="widget-setting-title-style">
            <RadioGroup onChange={this.onChange} value={this.state.position} size="large">
              <Radio style={{ marginRight: '3px' }} value={'top'}>上</Radio>
              <Radio style={{ marginRight: '3px' }} value={'bottom'}>下</Radio>
              <Radio style={{ marginRight: '3px' }} value={'left'}>左</Radio>
              <Radio style={{ marginRight: '3px' }} value={'right'}>右</Radio>
            </RadioGroup>
          </FormItem>

          { // 模具上色
            this.pathType.map(path => (
              <div style={{ display: 'none' }} key="mold-color">
                {getFieldDecorator(`${path}MoldColor`, { initialValue: moldColor[path].color })
                (<Input type="hidden"/>)}

                {getFieldDecorator(`${path}MoldColorOpacity`, {
                  initialValue: moldColor[path].opacity
                })(<Input type="hidden"/>)}
              </div>
            ))
          }
          {this.createMoldColor()}
        </Form>
      );
    } else {
      settingPane.push(<NoopSetting key="noop-setting"/>);
    }
    return (
      <div className="widget-setting">
        {settingPane}
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { widgets, window } = state.window;
  let activeWidgetId = state.editor.activeWidgetId;
  let widget = widgets[activeWidgetId];

  return {
    window,
    widget,
    activeWidgetId
  };
}

WidgetSetting = Form.create()(WidgetSetting);

export default connect(mapStateToProps)(WidgetSetting);
