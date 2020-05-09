import React, { PropTypes, Component } from 'react';
import Form from 'components/form';

import ChartOptionSettingItem from 'components/chart/chart-option-setting-item';

export default class extends Component {
  static propTypes = {
    id: PropTypes.string,
    data: PropTypes.object,
    config: PropTypes.array,
    dataSetting: PropTypes.object,
    onChange: PropTypes.func
  };

  componentDidMount() {
    this.resetForm();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      setTimeout(() => this.resetForm());
    }
  }

  // 重置表单项，填入新的数据
  resetForm() {
    for (let key in this.refs) {
      let ref = this.refs[key];
      ref.setFieldsValue(this.props.data);
    }
  }

  render() {
    return (
      <div>
        {
          this.props.config.map((config, index) => {
            return (
              <ChartOptionSettingItem key={index} title={config.title}>
                <Form ref={`form_${index}`}
                      {...config}
                      id={this.props.id}
                      data={this.props.data}
                      dataSetting={this.props.dataSetting}
                      onChange={this.props.onChange}/>
              </ChartOptionSettingItem>
            );
          })
        }
      </div>
    );
  }
}
