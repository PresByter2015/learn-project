import React, { Component } from 'react';
import { Select } from 'antd';
import ColorPickerTrigger from 'components/color-picker/trigger';
import intl from 'src/intl';

const Option = Select.Option;

const defaults = [
  { width: 0, style: 'solid', text: intl.formatMessage({ id: 'no lines', defaultMessage: '无线条' }) },
  { width: 1, style: 'solid' },
  { width: 2, style: 'solid' },
  { width: 3, style: 'solid' },
  { width: 1, style: 'dotted' },
  { width: 2, style: 'dotted' },
  { width: 3, style: 'dotted' }
];

class BorderSelect extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.any,
    initialValue: React.PropTypes.any,
    onChange: React.PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      color: '',
      width: 0,
      style: 'solid'
    };
  }

  handleChange(value, option) {
    let { border } = option.props;
    let state = Object.assign({}, this.state);

    state.width = border.width;
    state.style = border.style;

    this.setState({ ...state });
    this.props.onChange(state);
  }

  onColorChange(data) {
    let color = data.color;

    let state = Object.assign({}, this.state);
    state.color = color;

    this.setState({ color });
    this.props.onChange(state);
  }

  componentWillMount() {
    let { value } = this.props;
    this.setState({ ...value });
  }

  getSelectOptions() {
    return defaults.map((item, i) => {
      item.color = this.state.color;

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

    if (border.width === 0) {
      text = intl.formatMessage({ id: 'no border', defaultMessage: '无边框' });
      if (type === 'select') {
        style.height = '100%';
      } else {
        style.height = 16;
      }
    } else {
      style.width = '100%';
      style.borderTopWidth = border.width,
        style.borderTopStyle = border.style,
        style.borderTopColor = border.color;

      if (type === 'select') {
        style.marginTop = ((26 - border.width) / 2);
      }
    }

    return (
      <div style={style}> {text} </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.initialValue !== nextProps.initialValue) {
      if (nextProps.initialValue) {
        this.setState({
          color: nextProps.initialValue.color,
          width: nextProps.initialValue.width,
          style: nextProps.initialValue.style
        });
      } else {
        this.setState({
          color: '',
          width: 0,
          style: 'solid'
        });
      }
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

        <ColorPickerTrigger
          color={this.state.color}
          initialValue={this.state.color}
          onChange={this.onColorChange.bind(this)}
        />
      </div>
    );
  }
}

export default BorderSelect;
