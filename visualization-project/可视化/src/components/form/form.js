import React, { PropTypes, Component } from 'react';
import { Form } from 'antd';
import intl from 'src/intl';
import FormControl from './Control';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
};

class FormComponent extends Component {
  static propTypes = {
    form: React.PropTypes.object,
    data: React.PropTypes.object,
    fields: PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    onSubmit: React.PropTypes.func,
    onChange: React.PropTypes.func
  };

  control(name, value, field = {}) {
    if (name) {
      return (
        <FormItem key={name} {...formItemLayout} label={field.label}
                  className={field.className}
        >
          <FormControl name={name} value={value}
                       field={field} form={this.props.form}
                       {...field}
                       onChange={this.props.onChange.bind(this)}/>
        </FormItem>
      );
    } else {
      let param = intl.formatMessage({ id: 'missing name parameter', defaultMessage: '缺少 name 参数' });
      console.warn(`${field.title} ${param}`);
      return null;
    }
  }

  render() {
    const { fields } = this.props;
    let controls = [];

    if (Array.isArray(fields)) {

    } else {
      for (let name in fields) {
        let data = fields[name];
        let value = data.value ? data.value : data;
        // let type = data.type ? data.type : 'input'
        let field = {};

        if (typeof data === 'object') {
          field = data;
        }

        controls.push(this.control(name, value, field));
      }
    }

    return (
      <Form> {controls} </Form>
    );
  }
}

export default Form.create()(FormComponent);
