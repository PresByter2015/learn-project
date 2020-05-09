import React, { PropTypes, Component } from 'react';
import ColorPickerTrigger from 'components/color-picker/trigger';
import { hex2rgb } from 'utils/hex2rgba';
import '../color-group-select.styl';

class ColorGroupSelect extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.array,
    visibleCount: PropTypes.number
  };

  constructor() {
    super();
    this.state = {
      color: []
    };
  }

  componentWillMount() {
    let value = this.props.value;
    this.setState({ value });
  }

  handleColorChange(index, data) {
    let value = this.state.value;
    value[index] = hex2rgb(data.color, data.alpha);
    this.props.onChange(value);
  }

  handleAddNewColor() {
    let value = this.state.value || [];
    value.push('#c23531');

    this.props.onChange(value);
    this.setState({ value });
  }

  getValue() {
    return this.state.value;
  }

  getColor(i) {
    return this.state.value[i] || this.state.value[this.state.value.length - 1];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  render() {
    let className = 'color-group-select color-group-select-no-label';
    let count = this.props.visibleCount || 2;

    count = this.state.value.length;

    const colors = Array.apply(null, { length: count }).map((_, i) => {
      return (
        <ColorPickerTrigger
          key={i}
          color={this.getColor(i)}
          onChange={this.handleColorChange.bind(this, i)}/>
      );
    });

    return (
      <div className={className}>
        {colors}
        <span className="add-new-color" onClick={this.handleAddNewColor.bind(this)}>+</span>
      </div>
    );
  }
}

export default ColorGroupSelect;
