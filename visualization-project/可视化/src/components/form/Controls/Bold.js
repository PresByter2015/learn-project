import React, { Component } from 'react';
import { Icon } from 'antd';

class Bold extends Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.bool
  };

  constructor() {
    super();
    this.state = {
      checked: false
    };
  }

  componentWillMount() {
    this.setState({
      checked: this.props.value
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        checked: nextProps.value
      });
    }
  }

  handleChange(e) {
    let checked = e.target.checked;
    this.setState({ checked });
    this.props.onChange(checked);
  }

  render() {
    let iconClass = this.state.checked ? 'checked-icon' : '';

    return (
      <label className="bold-box">
        <input className="input-bold"
               type="checkbox" checked={this.state.checked}
               onChange={this.handleChange.bind(this)}/>
        <Icon className={iconClass} type="bold"/>
      </label>
    );
  }
}

export default Bold;
