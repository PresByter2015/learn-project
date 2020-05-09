import React, { Component } from 'react';
import { Form, Select } from 'antd';
import { FormattedMessage } from 'react-intl';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class PieSetting extends Component {
  static propTypes = {
    form: React.PropTypes.object,
    data: React.PropTypes.object,
    optionData: React.PropTypes.object,
    onChange: React.PropTypes.func
  };

  handleChange() {
    setTimeout(() => {
      let formData = this.props.form.getFieldsValue();
      this.props.onChange(formData);
    });
  }

  handleSubmit() {
  }

  getDataSetOptionsComponent() {
    let { list } = this.props.optionData;
    let component = [];

    if (list && list.length) {
      component = Object.keys(list).map(id => {
        let item = list[id];
        return <Option key={item.id} value={item.id}>{item.name}</Option>;
      });
    }

    return component;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let { data } = this.props;
    data = data || {};

    let dataSetOptionsComponent = this.getDataSetOptionsComponent();

    return (
      <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
        <FormItem {...formItemLayout}
                  label={<FormattedMessage id="data set" defaultMessage="数据集"/>}>
          {
            getFieldDecorator('id', { initialValue: data.id })
            (<Select onChange={this.handleChange.bind(this)}
                     placeholder={<FormattedMessage id="please select the dataset"
                                                    defaultMessage="请选择数据集"/>}>
              {dataSetOptionsComponent}
            </Select>)
          }
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(PieSetting);
