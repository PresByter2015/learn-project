import React from 'react';
import { Input } from 'antd';
import ColorPickerTrigger from 'components/color-picker/trigger';

export default React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
    type: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    label: React.PropTypes.string,
    colorKey: React.PropTypes.string,
    opacityKey: React.PropTypes.string,
    value: React.PropTypes.object,
    rgba: React.PropTypes.bool
  },

  getInitialState() {
    let color, opacity;
    if (this.props.value && !this.props.rgba) {
      color = this.props.value.color || '#000';
      opacity = this.props.value.opacity || 1;
    } else if (this.props.rgba) {
      color = this.props.value || '#000';
      opacity = 1;
    }
    return {
      color,
      opacity
    };
  },

  handleChange(val) {
    const colorKey = this.props.colorKey || 'color';
    const opacityKey = this.props.opacityKey || 'opacity';
    let obj = {};
    obj[colorKey] = val.color;
    obj[opacityKey] = val.opacity;

    this.props.onChange(obj);
  },

  handleChangeKey(key, value) {
    let obj = {};
    obj[key] = value;

    this.setState(obj);
    this.handleChange({
      color: obj.color || this.state.color,
      opacity: obj.opacity || this.state.opacity
    });
  },

  handleColorChange(value) {
    let color = value.color;
    let opacity = value.alpha / 100;
    let obj = {
      color,
      opacity
    };

    this.setState(obj);
    if (this.props.rgba) {
      this.props.onChange(value.rgba);
    } else {
      this.handleChange(obj);
    }
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value && !this.props.rgba) {
      let color, opacity;

      color = nextProps.value.color || '#000';
      opacity = nextProps.value.opacity || 1;

      this.setState({
        color,
        opacity
      });
    } else if (this.props.value !== nextProps.value && this.props.rgba) {
      this.setState({
        color: nextProps.value
      });
    }
  },

  render() {
    return (
      <div>
        <Input type={this.props.type || 'hidden'} className="self-style color"
               placeholder={this.props.placeholder || 'none'}
               value={this.state.color}
               onChange={this.handleChangeKey.bind(this, 'color')}/>
        <Input type={this.props.type || 'hidden'} className="opacity"
               placeholder={this.props.placeholder || 'none'}
               value={this.state.opacity}
               onChange={this.handleChangeKey.bind(this, 'opacity')}/>
        <ColorPickerTrigger
          color={this.state.color}
          alpha={this.state.opacity * 100}
          onChange={this.handleColorChange.bind(this)}
        />
      </div>
    );
  }
});
