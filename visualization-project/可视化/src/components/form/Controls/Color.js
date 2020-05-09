import React, { Component } from 'react';
import ColorPickerTrigger from 'components/color-picker/trigger';

class Color extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    val: React.PropTypes.any,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      color: '#fff'
    };
  }

  componentWillMount() {
    this.setState({
      color: this.props.value
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        color: nextProps.value
      });
    }
  }

  handleChange(data) {
    this.props.onChange(data.rgba || data.color);
  }

  render() {
    return (<ColorPickerTrigger
      color={this.state.color} onChange={this.handleChange.bind(this)}
    />);
  }
}


export default Color;
