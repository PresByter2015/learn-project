import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { hidePreviewAddModal, showAddModal } from 'store/dashboard/actions';
import intl from 'src/intl';
import './preview-add-modal.styl';

class PreviewAddModal extends Component {
  static propTypes = {
    previewAdd: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func
  };

  handleHideModal() {
    this.props.dispatch(hidePreviewAddModal());
  }

  handleAddModal() {
    this.props.dispatch(hidePreviewAddModal());
    this.props.dispatch(showAddModal());
  }

  render() {
    let OkText = intl.formatMessage({ id: 'please create a new window first', defaultMessage: '请先新建窗口' });
    return (
      <Modal visible={this.props.previewAdd}
             className="preview-add-modal"
             onCancel={this.handleHideModal.bind(this)}
             onOk={this.handleAddModal.bind(this)}
             okText={OkText}>
        <p>{intl.formatMessage({ id: 'there is no window to show', defaultMessage: '展示墙没有可展示的窗口' })}</p>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { dashboard } = state;
  return {
    dashboard,
    previewAdd: dashboard.previewAdd
  };
};

export default connect(mapStateToProps)(PreviewAddModal);
