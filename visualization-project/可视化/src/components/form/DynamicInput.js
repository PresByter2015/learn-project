import React, { Component } from 'react';
import { Form, InputNumber } from 'antd';
import { formItemLayout } from './constants';
import intl from 'src/intl';

//import './dynamic.styl'

class DynamicInput extends Component {
  static propTypes = {
    form: React.PropTypes.object,
    name: React.PropTypes.string,
    value: React.PropTypes.array,
    label: React.PropTypes.string,
    option: React.PropTypes.object,
    onChange: React.PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      value: []
    };
  }

  handleInputChange(val) {
    let values = this.state.value;
    let len = values.length;
    if (val > len) {
      let step = intl.formatMessage({ id: 'segmentation', defaultMessage: '分段' });
      values.push({ name: `${step}${len}`, value: 3 });
    } else {
      values.pop();
    }

    this.setState({ value: values });
    this.props.onChange();
  }

  handleChange() {
    this.props.onChange();
  }

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
      this.props.form.resetFields();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { label, option } = this.props;
    let count = this.state.value.length;

    return (
      <div>
        <Form.Item {...formItemLayout} label={label}>
          {
            getFieldDecorator('count', { initialValue: count })
            (<InputNumber min={1} max={3} onChange={this.handleInputChange.bind(this)}/>)
          }
        </Form.Item>

        <Form.Item {...formItemLayout} label={option.label}>
          {
            this.state.value.map((val, i) => {
              return (<div key={i} className="dynamic-input"
                           style={{ width: `${87 / count}%`, display: 'inline-block' }}>
                {
                  getFieldDecorator(`${this.props.name}.${i}`, { initialValue: val.value })
                  (<InputNumber min={1} onChange={this.handleChange.bind(this)}/>)
                }
              </div>);
            })
          }
        </Form.Item>
      </div>
    );
  }
}

export default DynamicInput;
