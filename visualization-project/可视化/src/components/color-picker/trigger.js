import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showColorPickerModal } from 'store/global/actions';
import { emitter } from './modal';
import { hex2rgb } from 'utils/hex2rgba';
import colorUtils from 'utils/color';

class ColorPickerTrigger extends Component {
  static propTypes = {
    color: React.PropTypes.string,
    alpha: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    initialValue: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    onChange: React.PropTypes.func,
    colorPicker: React.PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      color: null,
      alpha: null
    };
    this.uid = emitter.getUid();
  }

  // 点击 trigger 的时候
  handleClick(e) {
    e.preventDefault();

    let position = {};
    let bodyRect = document.body.getBoundingClientRect();
    let rect = e.target.getBoundingClientRect();

    position.left = rect.left + rect.width;

    if (bodyRect.right - rect.right < 218) {
      position.left = rect.left - 218;
    }

    if (bodyRect.height - rect.top < 300) {
      position.top = 'auto';
      position.bottom = 5;
    } else {
      position.top = rect.top;
    }

    let color = this.state.color || this.props.color;
    let alpha = this.state.alpha || this.props.alpha;

    // rgba 颜色转成 color, alpha
    if (colorUtils.isRGBA(color)) {
      let result = colorUtils.parse(color, 'rgba');
      color = result.color;
      alpha = result.alpha;
    }

    this.props.dispatch(showColorPickerModal({
      ...position,
      color,
      alpha
    }, this.uid));
  }

  componentWillMount() {
    this.onColorChange = (data) => {
      this.setState({
        color: data.color,
        alpha: data.alpha
      });

      // if (data.color === this.state.color && data.alpha === this.state.alpha) {
      //   return;
      // } else {
      this.props.onChange(data);
      // }
    };
    emitter.on(`change.${this.uid}`, this.onColorChange);
  }

  shouldComponentUpdate(nextProps) {
    return typeof nextProps.color !== 'undefined';
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.color !== nextProps.color) {
      this.setState({
        color: null,
        alpha: null
      });
    }
  }

  componentWillUnmount() {
    emitter.removeListener(`change.${this.uid}`, this.onColorChange);
  }

  render() {
    let style = {};
    let color = this.state.color || this.props.initialValue || this.props.color;
    let alpha = this.state.alpha;
    if (typeof this.state.alpha !== 'number') {
      alpha = (this.props.alpha > 100 ? 100 : this.props.alpha);
    }
    let showOpacity = alpha === 0 || !color ? true : false;

    if (colorUtils.isRGBA(color)) {
      style.backgroundColor = color;
      //判断rgba中a是否为0
      let result = colorUtils.parse(color, 'rgba');
      showOpacity = result.alpha === 0 || !result.color ? true : false;
    } else {
      style.backgroundColor = hex2rgb(color, alpha);
    }

    if (showOpacity) {
      style.backgroundColor = '';
    }

    return (
      <div className={showOpacity ? 'color-picker-trigger opacity-0' : 'color-picker-trigger'}
           style={style}
           onClick={this.handleClick.bind(this)}
      />
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(ColorPickerTrigger);
