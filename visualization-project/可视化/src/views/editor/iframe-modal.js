import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Popover } from 'antd';
import intl from 'src/intl';
import { updateIframeModal } from 'store/editor/actions';

class IframeModal extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    visible: React.PropTypes.bool,
    url: React.PropTypes.string
  };

  constructor() {
    super();
  }

  handleClickBackBtn() {
    this.props.dispatch(updateIframeModal({
      visible: false,
      url: ''
    }));
  }

  render() {
    let className = this.props.visible ? 'webpage-iframe show' : 'webpage-iframe';
    return (
      <div className={className}>
        <div className="iframe-tool">
          <Popover content={intl.formatMessage({ id: 'return', defaultMessage: '返回' })} placement="bottom">
            <a className="btn" title={intl.formatMessage({ id: 'return', defaultMessage: '返回' })}
               onClick={this.handleClickBackBtn.bind(this)}>
              <Icon type="back"/>
            </a>
          </Popover>
        </div>
        <iframe src={this.props.url}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { iframeModal } = state.editor;
  return {
    visible: iframeModal.visible,
    url: iframeModal.url
  };
};

export default connect(mapStateToProps)(IframeModal);
