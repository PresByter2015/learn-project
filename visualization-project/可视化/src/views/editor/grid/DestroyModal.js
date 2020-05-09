import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import intl from 'src/intl'

class DestroyModal extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    visible: React.PropTypes.bool,
    ok: React.PropTypes.func,
    cancel: React.PropTypes.func
  }

  render() {
    return (
      <Modal title=""
        visible={this.props.visible}
        onCancel={ this.props.cancel}
        footer={[
          <Button key={'submit'} onClick={this.props.ok}>
            { intl.formatMessage({ id: 'delete', defaultMessage: '确定' }) }
          </Button>,
          <Button key={'cancel'} onClick={this.props.cancel}>
            { intl.formatMessage({ id: 'cancel', defaultMessage: '取消' }) }
          </Button>
        ]}>
        <p>{ intl.formatMessage({ id: 'do you confirm the deletion', defaultMessage: '您是否确认删除' }) }</p>
        <p>“{this.props.title}” { intl.formatMessage({ id: 'widget', defaultMessage: '部件' }) } ?</p>
      </Modal>
    )
  }
}

export default DestroyModal
