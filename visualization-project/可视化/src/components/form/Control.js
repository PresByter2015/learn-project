import React, { PropTypes, Component } from 'react';
import { Input } from 'antd';
import Controls from './Controls';

class FormControl extends Component {
  static propTypes = {
    form: PropTypes.object,
    name: PropTypes.string,
    value: PropTypes.any,
    label: PropTypes.string,
    type: PropTypes.string,
    props: PropTypes.object,
    field: PropTypes.object,
    suffix: PropTypes.string,
    onChange: PropTypes.func
  };

  handleChange(val) {
    if (typeof val === 'object' && val.target) {
      val = val.target.value;
    }

    this.props.onChange(this.props.name, val);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, value, type } = this.props;

    let ctrlName = type || 'input';
    let Control = null;
    let suffix = '';

    // input => Input
    let controlName = ctrlName.charAt(0).toUpperCase() + ctrlName.slice(1);

    let props = Object.assign({}, this.props, this.props.props, {
      initialValue: value,
      onChange: this.handleChange.bind(this)
    });

    // 删除不需要的属性
    delete props.value;
    delete props.props;

    if (typeof props.suffix !== 'undefined') {
      suffix = props.suffix;
      delete props.suffix;
    }

    // 动态生成控件
    if (controlName in Controls) {
      Control = React.createElement(Controls[controlName], { ...props });
    } else {
      Control = React.createElement(Input, { ...props });
    }

    return (
      <div className="form-control">
        {getFieldDecorator(name, { initialValue: value })(Control)}
        {suffix ? <span>{suffix}</span> : null}
      </div>
    );
  }
}

export default FormControl;
