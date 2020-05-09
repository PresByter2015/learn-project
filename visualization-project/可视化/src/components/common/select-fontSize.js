import React, { Component } from 'react';
import { Form, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class SelectOption extends Component {
  static propTypes = {
    form: React.PropTypes.object,
    initialValue: React.PropTypes.number,
    width: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    context: React.PropTypes.string,
    onChange: React.PropTypes.func
  };

  constructor() {
    super();
  }

  handleSelect(value) {
    let fontSize = value;
    this.props.form.setFieldsValue({ fontSize });
    this.props.onChange(parseInt(value));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialValue !== this.props.initialValue) {
      this.props.form.resetFields();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let options = [];
    for (let i = this.props.min; i <= this.props.max; i += this.props.step) {
      let item = 48;
      if (i < 48) {
        item = i;
      }
      options.push(<Option value={`${i}`} style={{ fontSize: item }} key={i}>
        {i}
      </Option>);
    }

    return (
      <div className="ant-row ant-form-item select-font-size">
        <FormItem {...formItemLayout} label={this.props.context}>
          {getFieldDecorator('fontSize', { initialValue: String(this.props.initialValue) || '24' })(
            <Select onChange={this.handleSelect.bind(this)}>
              {options}
            </Select>)}
        </FormItem>
      </div>
    );
  }
}

SelectOption = Form.create()(SelectOption);

export default SelectOption;
