import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;
const defaults = [
  { width: 2, style: 'solid' },
  { width: 5, style: 'solid' },
  { width: 10, style: 'solid' }
];

class BorderSelect extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      width: 2,
      style: 'solid'
    };
  }

  handleChange(value, option) {
    let { border } = option.props;
    let state = Object.assign({}, this.state);

    state.width = border.width;
    state.style = border.style;

    this.setState({ ...state });
    this.props.onChange(state.width);
  }

  transProps(value) {
    return {
      width: value,
      style: 'solid'
    };
  }

  componentWillMount() {
    let { value } = this.props;
    this.setState(this.transProps(value));
  }

  getSelectOptions() {
    return defaults.map((item, i) => {
      let selectOption = this.getBorderOption(item);
      let optionStyle = {};

      if (item.width === 0) {
        optionStyle.paddingTop = 6;
        optionStyle.paddingBottom = 6;
      } else {
        optionStyle.paddingTop = 14;
        optionStyle.paddingBottom = 14;
      }

      return (
        <Option key={i} border={item} style={optionStyle}>
          {selectOption}
        </Option>
      );
    });
  }

  getBorderOption(border, type) {
    let text = '';
    let style = {
      width: '100%',
      height: border.width,
      textAlign: 'center'
    };

    style.width = '100%';
    style.borderTopWidth = border.width,
      style.borderTopStyle = border.style,
      style.borderTopColor = border.color;

    if (type === 'select') {
      style.marginTop = ((26 - border.width) / 2);
    }

    return (
      <div style={style}> {text} </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState(this.transProps(nextProps.value));
    }
  }

  render() {
    let selectValue = this.getBorderOption(this.state, 'select');

    return (
      <div className="border-select-control">
        <Select onSelect={this.handleChange.bind(this)}
                style={{ width: '110px' }}
                value={selectValue}>
          {this.getSelectOptions()}
        </Select>
      </div>
    );
  }
}

export default BorderSelect;
