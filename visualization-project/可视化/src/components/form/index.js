import { isPlainObject } from 'utils';
import React, { PropTypes, Component } from 'react';
import { Form } from 'antd';
import FormControl from './Control';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

/**
 * 生成表单组件
 */
class FormComponent extends Component {
  static propTypes = {
    form: PropTypes.object,
    data: PropTypes.object,
    dataSetting: PropTypes.object,
    fields: PropTypes.array,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func
  };

  constructor() {
    super();
  }

  handleChange(name, value) {
    this.props.onChange(name, value);
  }

  /**
   * 解析表单的 rel 字段
   */
  relParser(rel, props, controlProps) {
    if (!rel) {
      return props;
    }

    let [action, nameArr] = rel.split(':');

    if (action === 'toggle') {
      let res = this.actionToggleParser(nameArr);
      let className = res ? ' show' : ' hide';

      props.className += className;
    } else {
      let val = this.getFieldValue(nameArr);

      //关联到是否可用
      if (action === 'disable') {
        let className = val ? ' disabled' : '';
        props.className += className;
      }

      // 动态改变的组件
      if (action === 'dynamicGrowth') {
        controlProps.count = val;
      }
    }

    return props;
  }

  getFieldValue(name) {
    let { data = {} } = this.props;
    return data[name];
  }

  /**
   * 解析rel为 多name组合情况 (action为toggle时)
   * 此时rel格式为 'toggle:name1=value1,name2=value2'
   * value 可不设置, 不设置默认为 true 或 false
   */
  actionToggleParser(nameArr) {
    let params = nameArr.split(',');
    return params.every((params) => {
      let [key, value] = params.split('=');
      let val = this.getFieldValue(key);
      if (value) {
        return val === value;
      } else {
        return val;
      }
    });
  }

  /**
   * 生成表单项
   */
  createFormItem(field, key, layout = true) {
    const { data } = this.props;
    let { type, name, value } = field;
    let controlProps = {};

    if (data && name in data) {
      value = data[name];
    }

    let formItemProps = {
      key: name,
      className: field.className || ''
    };

    // checkbox 不需要 label, 需要特殊处理
    if (type !== 'checkbox') {
      formItemProps.label = field.label;
    }

    // 需要 layout
    if (layout) {
      if (field.label) {
        Object.assign(formItemProps, formItemLayout);
      }
    }

    field.rel && this.relParser(field.rel, formItemProps, controlProps);

    return (
      <FormItem key={key} {...formItemProps}>
        <FormControl {...field}
                     {...controlProps}
                     value={value}
                     form={this.props.form}
                     onChange={this.handleChange.bind(this)}/>
      </FormItem>
    );
  }

  /**
   * 创建组合项
   */
  createComposeFormItem(field, key) {
    let classname = field.className ? `form-item-compose ant-row ${field.className}` : 'form-item-compose ant-row';
    let props = {
      className: classname
    };

    field.rel && this.relParser(field.rel, props);

    return (
      <div key={key} {...props}>
        <div className="ant-col-6 ant-form-item-label">
          <label>{field.label}</label>
        </div>
        <div className="ant-col-14">
          {
            field.fields.map((item, j) => {
              return this.createFormItem(item, key + '-' + j, false);
            })
          }
        </div>
      </div>
    );
  }

  getGroupComponent(field, key) {
    if (field.type === 'compose') {
      return this.createComposeFormItem(field, key);
    } else if (field.computed) { // 支持渲染方法
      return this.createComputedGroup(field, key);
    } else {
      return this.createFormItem(field, key);
    }
  }

  createComputedGroup(field, key) {
    // 如果提供了 computed 方法，则根据 computed 返回的参数来渲染组件
    let { dataSetting } = this.props;
    if (typeof field.computed === 'function') {
      let series;
      if (dataSetting
        && dataSetting.series
        && Array.isArray(dataSetting.series)
        && dataSetting.series.length > 0
      ) {
        series = dataSetting.series;
      }
      let controls = field.computed({ series }, field);

      if (isPlainObject(controls)) {
        return this.createFormItem(controls, key);
      }

      if (Array.isArray(controls)) {
        return controls.map((control, i) => {
          return this.createFormItem(control, key + '-' + i);
        });
      }
    }
    return null;
  }

  render() {
    const { fields } = this.props;
    const Groups = fields.map((field, i) => this.getGroupComponent(field, i));

    return (
      <Form> {Groups} </Form>
    );
  }
}

export default Form.create()(FormComponent);
