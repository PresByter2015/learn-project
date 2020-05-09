import React, { Component } from 'react';
import { Form, Select, Input } from 'antd';
import ColorPickerTrigger from '../color-picker/trigger';
import intl from 'src/intl';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class FontOption extends Component {
  static propTypes = {
    form: React.PropTypes.object,
    initialValue: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    context: React.PropTypes.string,
    onChange: React.PropTypes.func,
    color: React.PropTypes.string,
    alpha: React.PropTypes.number
  };

  constructor() {
    super();
  }

  handleSelect(value) {
    let fontSize = value;
    this.props.form.setFieldsValue({ fontSize });
    this.props.onChange(parseInt(value));
  }

  handeColorChange(obj) {
    let color = obj.rgba;
    let alpha = obj.alpha;
    this.props.form.setFieldsValue({ color });
    this.props.form.setFieldsValue({ alpha });
    this.props.onChange(obj);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialValue) {
      this.props.form.resetFields();
    }
  }

  render() {
    let { min = 12, max = 60, step = 2 } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let options = [];
    for (let i = min; i <= max; i += step) {
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
        <div key="color" style={{ display: 'none' }}>
          {
            getFieldDecorator('color', { initialValue: this.props.color })
            (<Input type="hidden"/>)
          }
          {
            getFieldDecorator('alpha', { initialValue: this.props.alpha })
            (<Input type="hidden"/>)
          }
        </div>

        <FormItem {...formItemLayout}
                  label={this.props.context || intl.formatMessage({ id: 'label number', defaultMessage: '标签字号' })}>
          {getFieldDecorator('fontSize', { initialValue: String(this.props.initialValue) || '24' })(
            <Select style={{ width: '81%', float: 'left' }}
                    onChange={this.handleSelect.bind(this)}>
              {options}
            </Select>
          )}

          <ColorPickerTrigger color={getFieldValue('color')} alpha={getFieldValue('alpha')}
                              onChange={this.handeColorChange.bind(this)}/>
        </FormItem>
      </div>
    );
  }
}


FontOption = Form.create()(FontOption);

export default FontOption;
