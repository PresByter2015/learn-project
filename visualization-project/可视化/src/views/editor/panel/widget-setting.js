import 'rc-color-picker/assets/index.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NoopSetting from './NoopSetting';
import { Form, InputNumber } from 'antd';
import { updateWidget } from 'store/window/actions';
import fontSize from 'config/font-size';
import event from '../event';
import SelectOption from 'components/common/select-fontSize';
import SelectBg from 'components/select-bg';
import ColorPickerTrigger from 'components/color-picker/trigger';
import EmojiRegex from 'emoji-regex';
import Input from 'components/form/Controls/Input';
import intl from 'src/intl';
import _ from 'lodash';
import { Grids } from 'config';
import MoldWidgetSetting from './mold-widget-setting';

const FormItem = Form.Item;

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

  // 更新组件的配置参数
  updateSetting(data) {
    let id = this.props.activeWidgetId;
    this.props.form.validateFields((errors) => {
      if (!!errors) {
        return;
      } else {
        this.refs.selectbg.validateFields((errors) => {
          //背景色背景图是否有错
          if (!!errors) {
            return;
          } else {
            let settingData = _.omit(data, 'positionX', 'positionY', 'width', 'height'); //过滤掉x,y,w,h,拆分开setting
            let col = data.positionX + 1; //修改后挂回状态树加回1
            let row = data.positionY + 1; //修改后挂回状态树加回1
            this.props.dispatch(updateWidget(id, {
              setting: settingData,
              col: col,
              row: row,
              sizex: data.width,
              sizey: data.height
            }));
          }
        });
      }
    });
  }

  componentDidMount() {
    event.on('editor.changeActiveWidget', () => {
      this.props.form.resetFields();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeWidgetId !== nextProps.activeWidgetId || this.props.widget !== nextProps.widget) {
      this.props.form.resetFields();
      if (this.refs.selectbg) {
        this.refs.selectbg.resetFields();
      }

      if (this.refs.selectoption) {
        this.refs.selectoption.resetFields();
      }
    }
  }

  handleSubmit() {
    setTimeout(() => {
      let widgetData = this.props.form.getFieldsValue(); //除背景以外的数据
      if (!this.props.form.getFieldValue('borderSize')) {
        widgetData.borderSize = 0;
      }
      //与背景相关的数据
      let bgData = {
        backgroundType: this.refs.selectbg.getFieldValue('bgType'),
        backgroundColor: this.refs.selectbg.getFieldValue('bgColor'),
        backgroundOpacity: this.refs.selectbg.getFieldValue('bgColorOpacity'),
        backgroundImage: this.refs.selectbg.getFieldValue('bg')
      };
      this.updateSetting(Object.assign(widgetData, bgData));
    }, 100);
    return false;
  }

  handlerSelectBgCallback(bgData) {
    setTimeout(() => {
      let data = this.props.form.getFieldsValue();
      if (!this.props.form.getFieldValue('borderSize')) {
        data.borderSize = 0;
      }
      this.updateSetting(Object.assign(data, bgData));
    }, 100);
  }

  handeColorChange(type1, type2, data) {
    this.props.form.setFieldsValue({
      [type1]: data.color,
      [type2]: data.alpha
    });
    this.handleSubmit();
  }

  checkTitle(rule, value, callback) {
    value = value.trim();
    if (value.length > 50) {
      callback([new Error(intl.formatMessage({
        id: 'the widget title is within 50 characters',
        defaultMessage: '部件标题最多为50个字符'
      }))]);
    } else if (EmojiRegex().test(value)) {
      callback([new Error(intl.formatMessage({
        id: 'please enter legal characters',
        defaultMessage: '请输入合法字符'
      }))]);
    } else {
      callback();
    }
  }

  handleSelectFontSize(value) {
    let fontSize = value;
    this.props.form.setFieldsValue({ fontSize });
    this.handleSubmit();
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    let settingPane = [];
    let widget = this.props.widget;
    let window = this.props.window;
    if (widget) {
      let setting = widget.setting;
      let settingBg = {
        bgType: setting.backgroundType,
        bgColor: setting.backgroundColor,
        bgColorOpacity: setting.backgroundOpacity,
        bg: setting.backgroundImage
      };

      let { screenRatio } = window; //画布比例(16:9、4:3等)
      let maxPositionX = Grids[screenRatio].cols - widget.sizex;
      let maxPositionY = Grids[screenRatio].rows - widget.sizey;
      let maxWidth = Grids[screenRatio].cols - widget.col + 1;
      let maxHeight = Grids[screenRatio].rows - widget.row + 1;
      if (widget.chart.type === 'mold') {
        settingPane.push(
          <MoldWidgetSetting key="mold-widget-setting"/>
        );
      } else {
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

            <FormItem {...formItemLayout} label={intl.formatMessage({ id: 'title', defaultMessage: '标题' })}>
              {getFieldDecorator('title', {
                initialValue: setting.title,
                rules: [{ validator: this.checkTitle }]
              })(
                <Input placeholder={intl.formatMessage({ id: 'please enter the title', defaultMessage: '请输入标题' })}
                       name="title" onChange={this.handleSubmit.bind(this)}/>
              )}
            </FormItem>

            <div style={{ display: 'none' }} key="title">
              {getFieldDecorator('textColor', { initialValue: setting.textColor })
              (<Input type="hidden"/>)}

              {getFieldDecorator('textColorOpacity', {
                initialValue: setting.textColorOpacity
              })(<Input type="hidden"/>)}
            </div>

            <FormItem {...formItemLayout} label={intl.formatMessage({ id: 'font', defaultMessage: '标题字体' })}
                      className="widget-setting-title-style">
              {getFieldDecorator('fontSize', {
                initialValue: setting.fontSize
              })
              (<Input type="hidden"/>)
              }

              <SelectOption ref="selectoption"
                            min={fontSize.MIN_FONT_SIZE}
                            max={fontSize.MAX_FONT_SIZE}
                            step={2}
                            initialValue={setting.fontSize}
                            onChange={this.handleSelectFontSize.bind(this)}/>
              <ColorPickerTrigger
                color={getFieldValue('textColor')}
                alpha={getFieldValue('textColorOpacity')}
                onChange={this.handeColorChange.bind(this, 'textColor', 'textColorOpacity')}
              />
            </FormItem>

            <div style={{ display: 'none' }} key="border">
              {getFieldDecorator('borderColor', { initialValue: setting.borderColor })
              (<Input type="hidden"/>)}

              {getFieldDecorator('borderColorOpacity', {
                initialValue: setting.borderColorOpacity
              })(<Input type="hidden"/>)}
            </div>

            <FormItem {...formItemLayout} label={intl.formatMessage({ id: 'border', defaultMessage: '边框' })}
                      className="widget-setting-border-color">
              {getFieldDecorator('borderSize', {
                initialValue: setting.borderSize
              })(
                <InputNumber min={0} max={20} onChange={this.handleSubmit.bind(this)}/>
              )}

              <ColorPickerTrigger
                color={getFieldValue('borderColor')}
                alpha={getFieldValue('borderColorOpacity')}
                onChange={this.handeColorChange.bind(this, 'borderColor', 'borderColorOpacity')}
              />
            </FormItem>


            <SelectBg
              ref="selectbg"
              data={settingBg}
              callback={this.handlerSelectBgCallback.bind(this)}
            />

            <div className="setting-tips">
              {`*${intl.formatMessage({
                defaultMessage: '背景图可使用jpg、jepg、png、gif、bmp格式，文件大小不超过20M',
                id: 'background image can be used jpg, jepg, png, gif, bmp format, the file size does not exceed 20M'
              })}`
              }
            </div>
          </Form>
        );
      }
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
