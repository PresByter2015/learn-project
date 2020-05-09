import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventEmitter from 'eventemitter3';
import { hideColorPickerModal, updateColorPicker } from 'store/global/actions';
import ColorPicker from './index';
import colorUtils from 'utils/color';

const emitter = new EventEmitter();
let uid = 1;

emitter.getUid = function () {
  return uid++;
};

class ColorPickerModal extends Component {
  static propTypes = {
    top: React.PropTypes.number,
    left: React.PropTypes.number,
    colorPicker: React.PropTypes.object,
    dispatch: React.PropTypes.func
  };

  constructor() {
    super();

    this.state = {
      in: false
    };
  }

  getStyle() {
    let style = {
      position: 'fixed'
    };

    style.top = this.props.colorPicker.top;
    style.left = this.props.colorPicker.left;
    style.zIndex = 9999;

    if (this.props.colorPicker.bottom) {
      style.bottom = this.props.colorPicker.bottom;
    }

    style.display = this.props.colorPicker.visible ? 'block' : 'none';

    return style;
  }

  handleMouseEnter() {
    this.setState({ in: true });
  }

  handleMouseLeave() {
    this.setState({ in: false });
  }

  handleBodyClick = () => {
    if (this.props.colorPicker.visible && !this.state.in) {
      // 调用更新最近使用的色块
      this.refs.colorpicker.updateUsedColor();
      this.props.dispatch(hideColorPickerModal());
    }
  };

  handleColorChange(obj) {
    this.props.dispatch(updateColorPicker(obj));
    let { which } = this.props.colorPicker;
    emitter.emit(`change.${which}`, obj);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.colorPicker.visible) {
      document.body.addEventListener('click', this.handleBodyClick, false);
    } else {
      document.body.removeEventListener('click', this.handleBodyClick);
    }
  }

  render() {
    let style = this.getStyle();
    let { color, alpha } = this.props.colorPicker;

    if (colorUtils.isRGBA(color)) {
      let dstColor = colorUtils.parseRgba(color);
      color = dstColor.color;
      alpha = dstColor.alpha > 100 ? 100 : dstColor.alpha;
    }

    return (
      <div className="color-picker-modal" style={style}
           onMouseEnter={this.handleMouseEnter.bind(this)}
           onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <ColorPicker ref='colorpicker'
                     onChange={this.handleColorChange.bind(this)}
                     color={color} alpha={alpha}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { colorPicker } = state.global;
  return { colorPicker };
};

ColorPickerModal = connect(mapStateToProps)(ColorPickerModal);

export { emitter };
export default ColorPickerModal;
