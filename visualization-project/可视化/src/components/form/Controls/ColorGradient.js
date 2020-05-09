import React, { PropTypes, Component } from 'react';
import { Icon } from 'antd';
import ColorPickerTrigger from 'components/color-picker/trigger';
import { hex2rgb } from 'utils/hex2rgba';
import './ColorGradient.styl';

class ColorGradient extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.array
  };

  constructor() {
    super();
  }

  componentWillMount() {
    let value = this.props.value;
    this.setState({ value });
  }

  handleColorChange(i, j, data) {
    let value = this.state.value;
    value[i][j] = hex2rgb(data.color, data.alpha);
    this.props.onChange(value);
  }

  handleToggleColor(i) {
    let value = this.state.value || [];
    let firstColor = value[i][0];
    let lastColor = value[i][1];

    value[i] = [lastColor, firstColor];

    this.props.onChange(value);
    this.setState({ value });
  }

  handleAddNewColorGradient() {
    let value = this.state.value || [];
    value.push(['rgba(194, 53, 49, 1)', 'rgba(194, 53, 49, 0.15)']);

    this.props.onChange(value);
    this.setState({ value });
  }

  getColor(i, j) {
    return this.state.value[i][j];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  render() {
    let count = this.state.value.length;

    const colorGroup = Array.apply(null, { length: count }).map((_, i) => {
      return (
        <div className="color-gradient-group" key={i}>
          <ColorPickerTrigger
            color={this.getColor(i, 0)}
            onChange={this.handleColorChange.bind(this, i, 0)}/>

          <a className="toggle-gradient-color" onClick={this.handleToggleColor.bind(this, i)}>
            <Icon type="toggle-color"/>
          </a>

          <ColorPickerTrigger
            color={this.getColor(i, 1)}
            onChange={this.handleColorChange.bind(this, i, 1)}/>

          {i === count - 1 ?
            <span className="add-new-color-gradient"
                  onClick={this.handleAddNewColorGradient.bind(this)}>+</span>
            : null
          }
        </div>
      );
    });

    return (
      <div>
        {colorGroup}
      </div>
    );
  }
}

export default ColorGradient;
