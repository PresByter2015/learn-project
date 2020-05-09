import React, { Component } from 'react';
import { Radio } from 'antd';
import intl from 'src/intl';
import './RadioGroup.styl';

const position = [
  { value: 'top', name: intl.formatMessage({ id: 'top', defaultMessage: '上' }) },
  { value: 'right', name: intl.formatMessage({ id: 'right', defaultMessage: '右' }) },
  { value: 'bottom', name: intl.formatMessage({ id: 'bottom', defaultMessage: '下' }) },
  { value: 'left', name: intl.formatMessage({ id: 'left', defaultMessage: '左' }) }
];

const textAlign = [
  { value: 'left', name: intl.formatMessage({ id: 'left', defaultMessage: '左' }) },
  { value: 'center', name: intl.formatMessage({ id: 'center', defaultMessage: '中' }) },
  { value: 'right', name: intl.formatMessage({ id: 'right', defaultMessage: '右' }) }
];

const verticalAlign = [
  { value: 'top', name: intl.formatMessage({ id: 'top', defaultMessage: '上' }) },
  { value: 'middle', name: intl.formatMessage({ id: 'center', defaultMessage: '中' }) },
  { value: 'bottom', name: intl.formatMessage({ id: 'bottom', defaultMessage: '下' }) }
];

const lineMode = [
  { value: 'straight', name: intl.formatMessage({ id: 'ordinary line', defaultMessage: '普通线' }) },
  { value: 'curve', name: intl.formatMessage({ id: 'smooth line', defaultMessage: '平滑线' }) },
  { value: 'ladder', name: intl.formatMessage({ id: 'ladder line', defaultMessage: '阶梯线' }) }
];

const colorType = [
  { value: 'single', name: intl.formatMessage({ id: 'monochrome', defaultMessage: '单色' }) },
  { value: 'gradient', name: intl.formatMessage({ id: 'gradient', defaultMessage: '渐变' }) }
];

const colorGradientDirection = [
  { value: 'vertical', name: intl.formatMessage({ id: 'vertical', defaultMessage: '垂直' }) },
  { value: 'horizontal', name: intl.formatMessage({ id: 'horizontal', defaultMessage: '水平' }) }
];

const DEFAULT_OPTIONS = {
  position, textAlign, verticalAlign, lineMode, colorType, colorGradientDirection
};

class RadioGroup extends Component {
  static propTypes = {
    type: React.PropTypes.string,
    options: React.PropTypes.array,
    initialValue: React.PropTypes.string,
    onChange: React.PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      value: null
    };
  }

  componentWillMount() {
    this.setState({
      value: this.props.initialValue
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleChange(e) {
    let value = e.target.value;

    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    let { type, options } = this.props;
    const RadioGroup = Radio.Group;

    if (type in DEFAULT_OPTIONS) {
      options = DEFAULT_OPTIONS[type || 'textAlign'];
    }

    return (
      <RadioGroup onChange={this.handleChange.bind(this)} value={this.state.value}>
        {
          options.map((option, index) => {
            return (
              <Radio key={index} value={option.value}>
                {option.name}
              </Radio>
            );
          })
        }

        {/* 用于系列中填充样式选项控制不可用状态 */}
        <span className="disabled-mask"/>
      </RadioGroup>
    );
  }
}

export default RadioGroup;
