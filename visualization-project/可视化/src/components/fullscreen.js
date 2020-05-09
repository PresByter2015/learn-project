import React, { Component } from 'react';
import { Icon } from 'antd';
import screen from 'utils/screen';
import intl from 'src/intl';

class FullScreen extends Component {
  static propTypes = {
    onPreview: React.PropTypes.func,
    onAddModal: React.PropTypes.func,
    onClick: React.PropTypes.func,
    iconType: React.PropTypes.string,
    type: React.PropTypes.string
  };

  handleClick() {
    if (this.props.onAddModal) {
      this.props.onAddModal(); // 没有列表,提示先新建
    } else {
      screen.requestFull();
      this.props.onClick && this.props.onClick();
      if (this.props.onPreview) {
        this.props.onPreview(true);
      }
    }
  }

  handleExitScreen() {
    screen.exitFull();
  }

  render() {
    let iconType = this.props.iconType || 'arrow-sal';

    return (
      <div onClick={this.props.type === 'exitFull' ? this.handleExitScreen.bind(this) : this.handleClick.bind(this)}>
        {
          this.props.iconType !== 'string' ?
            <Icon type={iconType}/> : intl.formatMessage({ id: 'preview', defaultMessage: '预览' })
        }
      </div>
    );
  }
}

export default FullScreen;
