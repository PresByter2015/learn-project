import React, { Component } from 'react';
import { Modal, Form, Button } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import EmojiRegex from 'emoji-regex';
import Input from 'components/form/Controls/Input';
import {
  hideAddModal,
  addWindow,
  hideTemplateModal,
  deleteNowWindowId,
  getTemplateToWindowId
} from 'store/dashboard/actions';
import intl from 'src/intl';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class AddModal extends Component {
  static propTypes = {
    form: React.PropTypes.object,
    show: React.PropTypes.bool.isRequired,
    nowId: React.PropTypes.string,
    dispatch: React.PropTypes.func
  };

  handleHideModal() {
    this.props.form.resetFields();
    this.props.dispatch(hideAddModal());
    this.props.dispatch(deleteNowWindowId());
  }

  handleSubmit(nowId, title) {
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      } else {
        values.title = values.title.trim();
        if (nowId) {
          this.props.dispatch(getTemplateToWindowId(nowId, title, (id) => {
            this.props.dispatch(push('/editor/' + id));
          }));
        } else {
          this.props.dispatch(addWindow(values, (id) => {
            this.props.dispatch(push('/editor/' + id));
          }));
        }
        this.handleHideModal();
        this.props.dispatch(hideTemplateModal());
      }
    });
  }

  handlerCheckTitle(rule, value, callback) {
    if (value) {
      value = value.trim();
    }
    if (!value) {
      callback([new Error(intl.formatMessage({ id: 'the window name is not empty', defaultMessage: '窗口名不为空' }))]);
    } else if (value.length > 50) {
      callback([new Error(intl.formatMessage({
        id: 'the window name is within 50 characters',
        defaultMessage: '窗口名最多为50个字符'
      }))]);
    } else if (EmojiRegex().test(value)) {
      callback([new Error(intl.formatMessage({ id: 'please enter legal characters', defaultMessage: '请输入合法字符' }))]);
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let title = getFieldValue('title');
    return (
      <Modal visible={this.props.show}
             title={intl.formatMessage({ id: 'new window', defaultMessage: '新建窗口' })}
             footer={[
               <Button type="primary" key={'submit'} onClick={this.handleSubmit.bind(this, this.props.nowId, title)}>
                 {intl.formatMessage({ id: 'create', defaultMessage: '创建' })}
               </Button>,
               <Button type="primary" key={'cancel'} onClick={this.handleHideModal.bind(this)}>
                 {intl.formatMessage({ id: 'cancel', defaultMessage: '取消' })}
               </Button>
             ]}
             onCancel={this.handleHideModal.bind(this)}>
        <Form horizontal className="add-modal">
          <FormItem {...formItemLayout}
                    label={intl.formatMessage({ id: 'window name', defaultMessage: '窗口名称' })}>
            {
              getFieldDecorator('title', {
                rules: [{ validator: this.handlerCheckTitle }]
              })
              (
                <Input type="text"
                       placeholder={intl.formatMessage({
                         id: 'please enter a name (no more than 50 characters)',
                         defaultMessage: '请输入名称(字数不超过50个字符)'
                       })}/>
              )
            }
          </FormItem>
          {
            getFieldDecorator('screenRatio', { initialValue: '16:9' })
            (<Input type="hidden"/>)
          }
          {
            getFieldDecorator('keepScreenRatio', { initialValue: true })
            (<Input type="hidden"/>)
          }
        </Form>
      </Modal>
    );
  }
}

AddModal = Form.create()(AddModal);

const mapStateToProps = (state) => {
  const { dashboard } = state;
  return {
    dashboard,
    show: dashboard.add,
    nowId: dashboard.nowId
  };
};

export default connect(mapStateToProps)(AddModal);
