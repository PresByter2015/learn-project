import React, { Component } from 'react';
import SelectOption from 'components/common/select-fontSize';
import intl from 'src/intl';

class FontSizeSelect extends Component {
  static propTypes = {
    initialValue: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string
    ]),
    onChange: React.PropTypes.func,
    title: React.PropTypes.string
  };

  constructor() {
    super();
  }

  handleChange(num) {
    this.props.onChange(num);
  }

  render() {
    return (
      <div className="font-size-select">
        <SelectOption width={1} min={12} max={60}
                      initialValue={+this.props.initialValue || 12}
                      step={2}
                      context={this.props.title || intl.formatMessage({ id: 'font size', defaultMessage: '字体大小' })}
                      onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

export default FontSizeSelect;
