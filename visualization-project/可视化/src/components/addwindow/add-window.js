import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from 'react-redux';
import { showAddModal } from 'store/dashboard/actions';
import AddModal from 'components/modal/add-modal';
import intl from 'src/intl';

class Addwindow extends Component {
  static propTypes = {
    form: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    flexBasis: React.PropTypes.string,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    length: React.PropTypes.number,
    dashboard: React.PropTypes.object
  };

  handleShowModal() {
    this.props.dispatch(showAddModal());
  }

  render() {
    let val = this.props.length < 3 ? '0' : null;

    return (
      <div className="item-box add" style={{
        flexBasis: this.props.flexBasis,
        width: this.props.width,
        height: this.props.height,
        marginTop: val
      }}
      >
        <div className="wrap" onClick={this.handleShowModal.bind(this)}>
          <Icon className="plus" type="plus"/>
          <p>{intl.formatMessage({ id: 'please create a new window first', defaultMessage: '请先新建一个窗口' })}</p>
        </div>
        <AddModal/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { dashboard } = state;
  return {
    dashboard
  };
};

export default connect(mapStateToProps)(Addwindow);
