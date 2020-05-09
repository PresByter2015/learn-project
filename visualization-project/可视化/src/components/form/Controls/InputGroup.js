import React, { PropTypes, Component } from 'react';
import InputNumber from './InputNumber';

export default class extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    count: PropTypes.number,
    value: PropTypes.array
  };

  getValue(index) {
    return this.props.value && this.props.value[index] || 1;
  }

  handleChange(index, val) {
    let { value } = this.props;
    value[index] = val;
    this.props.onChange(value);
  }

  render() {
    let style = {
      display: 'inline-block',
      width: `${80 / this.props.count}%`
    };

    return (
      <div className="input-group">
        {
          Array.apply(null, { length: this.props.count }).map((item, i) => {
            let value = this.getValue(i);

            return (
              <div className="dynamic-input" style={style} key={i}>
                <InputNumber ref={`control_${i}`}
                             value={value}
                             onChange={this.handleChange.bind(this, i)}/>
              </div>
            );
          })
        }
      </div>
    );
  }
}
