import React, { Component } from 'react';
import ColorPickerTrigger from 'components/color-picker/trigger';
import { hex2rgb } from 'utils/hex2rgba';
import './color-group-select.styl';

class ColorGroupSelect extends Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    data: React.PropTypes.array,
    colors: React.PropTypes.array,
    group: React.PropTypes.bool
  };

  constructor() {
    super();
    this.state = {
      color: []
    };
  }

  componentWillMount() {
    let color = this.props.colors;
    this.setState({
      color
    });
  }

  handleColorChange(index, data) {
    let colors = this.state.color;
    // colors[index] = data.color
    colors[index] = hex2rgb(data.color, data.alpha);
    this.props.onChange(colors);
  }

  handleAddNewColor() {
    let colors = this.props.colors || [];
    colors.push('#c23531');

    this.props.onChange(colors);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.colors !== nextProps.colors;
  }

  getValue() {
    return this.state.color;
  }

  getColorGroupComponent() {
    let items = [];
    let length = (this.props.data || []).length;

    for (let i = 0; i < length; i++) {
      // 不需要 label
      if (this.props.group) {
        items.push(
          <ColorPickerTrigger key={i} color={this.props.colors[i]} alpha={100}
                              onChange={this.handleColorChange.bind(this, i)}/>
        );
      } else {
        items.push(
          <div className="color-item" key={i}>
            <div className="label">{this.props.data[i].name}</div>
            <ColorPickerTrigger key={i} color={this.props.colors[i]}
                                alpha={100} onChange={this.handleColorChange.bind(this, i)}/>
          </div>
        );
      }
    }

    return items;
  }

  render() {
    let colorGroup = this.getColorGroupComponent();
    let className = this.props.group ?
      'color-group-select color-group-select-no-label' : 'color-group-select';

    return (
      <div className={className}>
        {colorGroup}
        {/*<div className="color-item">
         <Icon type="plus" onClick={this.handleAddNewColor.bind(this)} />
         </div>*/}
      </div>
    );
  }
}

export default ColorGroupSelect;
