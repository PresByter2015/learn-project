import React, { Component } from 'react';
import { Modal } from 'antd';
import intl from 'src/intl';

class WidgetDestroyModal extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Modal title={intl.formatMessage({ id: 'window setting', defaultMessage: '窗口设置' })}>
        lkjsdflkdsjf
      </Modal>
    );
  }
}

export default WidgetDestroyModal;
