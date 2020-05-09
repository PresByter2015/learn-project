import React, { Component } from 'react';
import Keyboard from 'modules/keyboard';

class K extends Component {
  static propTypes = {
    widgetId: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    moveWidget: React.PropTypes.func,
    copyWidget: React.PropTypes.func,
    pasteWidget: React.PropTypes.func,
    destroyWidget: React.PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      widgetId: null
    };
  }

  isValidNode() {
    let nodeName = document.activeElement.tagName.toLowerCase();
    return !['input', 'textarea'].includes(nodeName);
  }

  isValid() {
    return this.isValidNode() && this.props.widgetId;
  }

  // 需要过滤掉的节点
  isIgnoreTargetElement(elem) {
    const className = elem.className;
    if (className && className.includes('ant-select-selection')) {
      return true;
    }
  }

  componentWillMount() {
    // ctrl+c 复制
    Keyboard.on('copy', () => {
      if (this.isValid()) {
        this.setState({
          widgetId: this.props.widgetId
        });

        this.props.copyWidget(this.props.widgetId);
      }
    });

    // ctrl+v 粘贴
    Keyboard.on('paste', (e) => {
      this.props.pasteWidget('keyboard', this.isValid() ? e : '');
    });

    // 方向键
    Keyboard.on('arrow', (event, dir) => {
      if (this.isIgnoreTargetElement(event.target)) {
        return;
      }
      if (this.isValid()) {
        this.props.moveWidget(dir);
      }
    });

    // 删除
    Keyboard.on('delete', (event) => {
      if (this.isValidNode() && this.props.widgetId) {
        this.props.destroyWidget(this.props.widgetId);
        event.preventDefault();
      }
    });
  }

  componentWillUnmount() {
    Keyboard.removeAllListeners();
  }

  render() {
    return null;
  }
}

export default K;
