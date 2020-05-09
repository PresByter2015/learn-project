import React, { Component } from 'react';
import { Select } from 'antd';
import intl from 'src/intl';

const Option = Select.Option;
const defaultOption = [{ text: intl.formatMessage({ id: 'circle', defaultMessage: '圆形' }), value: 'circle' },
  { text: intl.formatMessage({ id: 'rect', defaultMessage: '矩形' }), value: 'rect' },
  { text: intl.formatMessage({ id: 'roundRect', defaultMessage: '圆角矩形' }), value: 'roundRect' },
  { text: intl.formatMessage({ id: 'diamond', defaultMessage: '棱形' }), value: 'diamond' },
  { text: intl.formatMessage({ id: 'pin', defaultMessage: '气泡' }), value: 'pin' },
  { text: intl.formatMessage({ id: 'triangle', defaultMessage: '三角形' }), value: 'triangle' }];

class SelectSymbol extends Component {
  static propTypes = {
    initialValue: React.PropTypes.string,
    option: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired
  };

  constructor() {
    super();
  }

  handleChange(value) {
    this.props.onChange(value);
  }

  render() {
    let { option = defaultOption, initialValue = 'circle' } = this.props;
    let list = [];
    list = option.map((ele, index) => {
      return (<Option value={ele.value} key={index}> {ele.text} </Option>);
    });

    return (
      <Select defaultValue={initialValue} onChange={this.handleChange.bind(this)}>
        {list}
      </Select>
    );
  }

}

export default SelectSymbol;
