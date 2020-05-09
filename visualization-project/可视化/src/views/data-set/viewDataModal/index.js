import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import ViewData from './viewData';
import intl from 'src/intl';

class ViewDataModal extends Component {
  static className = 'data-set-page';

  static propTypes = {
    dispatch: React.PropTypes.func,
    location: React.PropTypes.object,
    dataSource: React.PropTypes.array,

    id: React.PropTypes.string,
    dataType: React.PropTypes.string,
    visible: React.PropTypes.bool,
    handleHide: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleHideModal() {
    this.props.handleHide();
  }

  render() {
    return (
      <Modal title={intl.formatMessage({ id: 'view', defaultMessage: '查看数据' })} className="get"
             wrapClassName="data-set-detail-modal"
             visible={this.props.visible}
             onCancel={this.handleHideModal.bind(this)}
             footer={
               <Button key={'cancel'} onClick={this.handleHideModal.bind(this)}>
                 {intl.formatMessage({ id: 'close', defaultMessage: '关闭弹窗' })}
               </Button>
             }>
        <ViewData id={this.props.id} dataType={this.props.dataType} visible={this.props.visible}/>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  let { dataSource } = state.dataSource;

  return {
    dataSource
  };
};

export default connect(mapStateToProps)(ViewDataModal);
