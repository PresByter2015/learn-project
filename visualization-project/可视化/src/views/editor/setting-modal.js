import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Select, Button, Checkbox } from 'antd';
import EmojiRegex from 'emoji-regex';
import { updateWindow } from 'store/window/actions';
import { hideSettingModal, changeActiveWidget } from 'store/editor/actions';
import SelectBg from 'components/select-bg';
import event from './event';
import './setting-modal.styl';
import intl from 'src/intl';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class SettingModal extends Component {
  static propTypes = {
    form: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    window: React.PropTypes.object,
    visible: React.PropTypes.bool,
    bg: React.PropTypes.string,
    windows: React.PropTypes.object,
    check: React.PropTypes.number
  };

  constructor() {
    super();
    this.state = {
      check: 0
    };
  }

  handleOk() {
    let title = this.props.form.getFieldValue('title');
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      } else {
        this.refs.selectbg.validateFields((error) => {
          if (!!error) {
            return;
          } else {
            let windows = {};
            windows.id = this.props.window.id;
            windows.title = values.title.trim();
            windows.screenRatio = values.screenRatio;
            windows.keepScreenRatio = values.keepScreenRatio;
            windows.bgType = this.refs.selectbg.getFieldValue('bgType');
            windows.bgColor = this.refs.selectbg.getFieldValue('bgColor');
            windows.bgColorOpacity = this.refs.selectbg.getFieldValue('bgColorOpacity');
            windows.bg = this.refs.selectbg.getFieldValue('bg');
            this.props.dispatch(updateWindow(this.props.window.id, windows))
              .then(() => {
                this.hide();

                this.props.dispatch(changeActiveWidget());//清除选中部件
                event.emit('editor.snapshot', this.props.window.id);//触发截图
              });
            title = windows.title;//重新赋值处理过空格的标题
          }
        });
        this.props.form.setFieldsValue({ title });
      }
    });
  }

  handleCancel() {
    this.props.dispatch(hideSettingModal());

    //还原默认值 不保留修改
    this.props.form.resetFields();
    this.refs.selectbg.resetFields();
  }

  hide() {
    this.props.dispatch(hideSettingModal());
  }

  handleSelectScreenRatio(value) {
    let screenRatio = value;
    this.props.form.setFieldsValue({ screenRatio });
  }

  handleKeepScreenRatio(e) {
    let keepScreenRatio = e.target.checked;
    this.props.form.setFieldsValue({ keepScreenRatio });
  }

  componentWillMount() {
    this.setState({
      check: this.props.check
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.visible && this.refs.uploadImage) {
      this.refs.uploadImage.setState({ bg: this.props.window.bg });
    }
  }

  checkTitle(rule, value, callback) {
    value = value.trim();
    if (!value) {
      callback([new Error(intl.formatMessage({ id: 'the window name is not empty', defaultMessage: '窗口名不能为空' }))]);
    } else if (value.length > 50) {
      callback([new Error(intl.formatMessage({
        id: 'the window name is within 50 characters',
        defaultMessage: '窗口名最多为50个字符'
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const { window } = this.props;
    return (
      <Modal title={intl.formatMessage({ id: 'window setting', defaultMessage: '窗口设置' })}
             visible={this.props.visible}
             footer={[
               <Button key={'submit'} onClick={this.handleOk.bind(this)}>
                 {intl.formatMessage({ id: 'ok', defaultMessage: '确定' })}
               </Button>,
               <Button key={'cancel'} onClick={this.handleCancel.bind(this)}>
                 {intl.formatMessage({ id: 'cancel', defaultMessage: '取消' })}
               </Button>
             ]}
             onCancel={this.handleCancel.bind(this)}>

        <Form horizontal onSubmit={this.handleSubmit}>

          <FormItem {...formItemLayout} label={intl.formatMessage({ id: 'window name', defaultMessage: '窗口名称' })}>
            {
              getFieldDecorator('title', {
                initialValue: window.title, rules: [{ validator: this.checkTitle }]
              })
              (<Input type="text"/>)
            }

          </FormItem>

          <FormItem {...formItemLayout} style={{ marginBottom: 0 }}
                    label={intl.formatMessage({ id: 'aspect ratio', defaultMessage: '窗口宽高比' })}>
            {
              getFieldDecorator('screenRatio', { initialValue: window.screenRatio })(
                <Select onChange={this.handleSelectScreenRatio.bind(this)}>
                  <Option value="25:9">25:9</Option>
                  <Option value="16:9">16:9</Option>
                  <Option value="4:3">4:3</Option>
                </Select>)
            }
          </FormItem>

          <FormItem {...formItemLayout} className="setting-keep-screen-ratio">
            {
              getFieldDecorator('keepScreenRatio', { initialValue: window.keepScreenRatio })(
                <Checkbox onChange={this.handleKeepScreenRatio.bind(this)}
                          defaultChecked={window.keepScreenRatio}>
                  {intl.formatMessage({ id: 'keep the aspect ratio', defaultMessage: '保持宽高比' })}
                </Checkbox>)
            }
          </FormItem>

          <SelectBg ref="selectbg" data={window} callback={() => {
          }}/>

        </Form>
      </Modal>
    );
  }
}

SettingModal = Form.create()(SettingModal);

const mapStateToProps = (state) => {
  let { window } = state.window;
  let { settingModalVisible } = state.editor;
  return {
    visible: settingModalVisible,
    window
  };
};

export default connect(mapStateToProps)(SettingModal);
