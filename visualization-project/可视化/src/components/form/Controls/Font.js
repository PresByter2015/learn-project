import React, { Component } from 'react';
import Bold from './Bold';
import FontSizeSelect from './FontSizeSelect';
import ColorPickerTrigger from 'components/color-picker/trigger';

class FontControl extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      bold: false,
      size: 12,
      color: '#fff'
    };
  }

  handleChange(type, val) {
    let state = { ...this.state };
    state[type] = val;

    this.setState(state);
    this.props.onChange(state);
  }

  handleColorChange(data) {
    this.handleChange('color', data.rgba);
  }

  componentWillMount() {
    let state = { ...this.state };
    Object.assign(state, this.props.value);
    this.setState(state);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        bold: nextProps.value.bold,
        size: nextProps.value.size,
        color: nextProps.value.color
      });
    }
  }

  render() {
    return (
      <div>
        { /* 文字下拉选择控件 */}
        <FontSizeSelect style={{ width: '58%' }}
                        value={this.state.size}
                        onChange={this.handleChange.bind(this, 'size')}
        />

        { /* Bold */}
        <Bold value={this.state.bold}
              onChange={this.handleChange.bind(this, 'bold')}
        />

        { /* 颜色选择控件 */}
        <ColorPickerTrigger
          color={this.state.color}
          initialValue={this.state.color}
          onChange={this.handleColorChange.bind(this)}
        />
      </div>
    );
  }
}

export default FontControl;
