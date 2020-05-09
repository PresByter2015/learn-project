import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { hideSetModal, updateWall } from 'store/dashboard/actions';
import fontSize from 'config/font-size';
import SelectBg from 'components/select-bg';
import SelectOption from 'components/common/select-fontSize';
import './setting-modal.styl';
import ColorPickerTrigger from 'components/color-picker/trigger';
import intl from 'src/intl';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class SetModal extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    form: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    title: React.PropTypes.string,
    show: React.PropTypes.bool.isRequired,
    bg: React.PropTypes.string,
    dashboard: React.PropTypes.object,
    check: React.PropTypes.number
  };

  handleSetModalOk() {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      } else {
        this.refs.selectbg.validateFields((error) => {
          if (!!error) {
            return;
          } else {
            let wallSetting = {
              title: values.title,
              titleSize: Number(values.titleSize),
              titleColor: values.titleColor,
              titleColorOpacity: values.titleColorOpacity
            };
            let bgSetting = this.refs.selectbg.getFieldsValue();

            let windowSetting = {
              textSize: Number(values.windowTitleSize),
              textColor: values.windowTitleColor,
              textColorOpacity: values.windowTitleColorOpacity
            };

            let data = { wallSetting, bgSetting, windowSetting };
            this.props.dispatch(updateWall(0, data));
            this.props.dispatch(hideSetModal());
            this.props.form.resetFields();
          }
        });
      }
    });
  }

  handleSetModalCancel() {
    this.props.dispatch(hideSetModal());

    //还原默认值 不保留修改
    this.props.form.resetFields();
    this.refs.selectTitleSize.resetFields();
    this.refs.selectTextSize.resetFields();
    this.refs.selectbg.resetFields();
  }

  handleSubmit() {
    this.props.dispatch(hideSetModal());
  }

  handleSelectWallFontSize(value) {
    let titleSize = String(value);
    this.props.form.setFieldsValue({ titleSize });
  }

  handleSelectWindowTitleSize(value) {
    let windowTitleSize = value;
    this.props.form.setFieldsValue({ windowTitleSize });
  }

  handleChooseColor(type, data) {
    let key = `${type}Opacity`;
    this.props.form.setFieldsValue({ [type]: data.color });
    this.props.form.setFieldsValue({ [key]: data.alpha });
  }

  componentWillMount() {
    this.setState({
      check: this.props.check,
      opacity: this.props.dashboard.bgColorOpacity
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.show && this.refs.uploadImage) {
      this.refs.uploadImage.setState({ bg: this.props.bg });
    }
  }

  componentWillUnmount() {
    this.setState({
      bg: ''
    });
    this.props.form.resetFields();
  }

  checkTitle(rule, value, callback) {
    if (value.length > 50) {
      callback([new Error(intl.formatMessage({
        id: 'the window name is within 50 characters',
        defaultMessage: '窗口名最多为50个字符'
      }))]);
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { dashboard } = this.props;
    return (
      <Modal visible={this.props.show}
             title={intl.formatMessage({ id: 'setting', defaultMessage: '设置' })}
             footer={[
               <Button key={'submit'} onClick={this.handleSetModalOk.bind(this)}>
                 {intl.formatMessage({ id: 'ok', defaultMessage: '确定' })}
               </Button>,
               <Button key={'cancel'} onClick={this.handleSetModalCancel.bind(this)}>
                 {intl.formatMessage({ id: 'cancel', defaultMessage: '取消' })}
               </Button>
             ]}
             onCancel={this.handleSetModalCancel.bind(this)}>

        <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <legend>{intl.formatMessage({ id: 'window wall', defaultMessage: '窗口墙' })}</legend>
            <FormItem {...formItemLayout}
                      label={intl.formatMessage({ id: 'title', defaultMessage: '展示墙标题' })}>
              {
                getFieldDecorator('title', {
                  initialValue: dashboard.title,
                  rules: [{ validator: this.checkTitle }]
                })(<Input type="text"/>)
              }
            </FormItem>

            <SelectOption ref='selectTitleSize' min={fontSize.MIN_FONT_SIZE} max={fontSize.MAX_WALL_TITLE_SIZE}
                          step={2} context={intl.formatMessage({ id: 'font size', defaultMessage: '文字大小' })}
                          initialValue={dashboard.titleSize || 24} width={1}
                          onChange={this.handleSelectWallFontSize.bind(this)}/>

            {
              getFieldDecorator('titleSize', { initialValue: dashboard.titleSize || '24' })
              (<Input type="hidden"/>)
            }

            <FormItem {...formItemLayout}
                      label={intl.formatMessage({ id: 'font color', defaultMessage: '文字颜色' })}
                      className="home-text-color">

              <ColorPickerTrigger color={getFieldValue('titleColor')}
                                  alpha={getFieldValue('titleColorOpacity')}
                                  onChange={this.handleChooseColor.bind(this, 'titleColor')}/>

            </FormItem>

            <div key="title" style={{ display: 'none' }}>
              {
                getFieldDecorator('titleColor', {
                  initialValue: dashboard.titleColor
                })(
                  <Input type="hidden" placeholder="none"/>
                )
              }
              {
                getFieldDecorator('titleColorOpacity', {
                  initialValue: dashboard.titleColorOpacity || 100
                })(
                  <Input type="hidden"/>
                )
              }
            </div>
          </fieldset>

          <fieldset>
            <legend>{intl.formatMessage({ id: 'window', defaultMessage: '窗口' })}</legend>
            <SelectOption ref='selectTextSize' min={fontSize.MIN_FONT_SIZE} max={fontSize.MAX_WINDOW_TITLE_SIZE}
                          step={2} context={intl.formatMessage({ id: 'window font size', defaultMessage: '窗口文字大小' })}
                          initialValue={dashboard.textSize || 24} width={1}
                          onChange={this.handleSelectWindowTitleSize.bind(this)}/>

            {
              getFieldDecorator('windowTitleSize', { initialValue: String(dashboard.textSize) || '24' })
              (<Input type="hidden"/>)
            }

            <FormItem {...formItemLayout} className="home-modal-text-color"
                      label={intl.formatMessage({ id: 'window font color', defaultMessage: '窗口文字颜色' })}>

              <ColorPickerTrigger color={getFieldValue('windowTitleColor')}
                                  alpha={getFieldValue('windowTitleColorOpacity')}
                                  onChange={this.handleChooseColor.bind(this, 'windowTitleColor')}/>

            </FormItem>

            <div key="window" style={{ display: 'none' }}>
              {
                getFieldDecorator('windowTitleColor', {
                  initialValue: dashboard.textColor
                })
                (<Input type="hidden" placeholder="none"/>)
              }

              {getFieldDecorator('windowTitleColorOpacity', {
                initialValue: dashboard.textColorOpacity || 100
              })(
                <Input type="hidden"/>
              )}
            </div>
          </fieldset>


          <SelectBg data={dashboard} ref="selectbg" callback={() => {
          }}/>

        </Form>
      </Modal>
    );
  }
}

SetModal = Form.create()(SetModal);

const mapStateToProps = (state) => {
  const { dashboard } = state;
  return {
    dashboard,
    show: dashboard.show,
    title: dashboard.title,
    bg: dashboard.bg
  };
};

export default connect(mapStateToProps)(SetModal);
