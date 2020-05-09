import React, { Component, PropTypes } from 'react';
import { Select, Icon } from 'antd';
import ColorPickerTrigger from 'components/color-picker/trigger';
import './dynamic-select.styl';
import intl from 'src/intl';

const Option = Select.Option;
const defaultOptions = [
  {
    label: intl.formatMessage({ id: 'online', defaultMessage: '在线' }),
    value: 'online'
  },
  {
    label: intl.formatMessage({ id: 'offline', defaultMessage: '离线' }),
    value: 'offline'
  }
];

class DynamicSelect extends Component {
  static propTypes = {
    value: PropTypes.array,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    options: PropTypes.array,
    onChange: PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      valueArray: ['online'],
      currentLength: 1,
      colorArray: ['rgba(255, 255, 0, 1)']
    };
  }

  componentWillMount() {
    let { value = [], options } = this.props;

    if (value[0] && !value[0].hasOwnProperty('color')) {
      value[0] = options[0];
    }

    let currentLength = value.length;
    let valueArray = [];
    let colorArray = [];
    for (let i = 0; i < currentLength; i++) {
      valueArray.push(value[i] && value[i].value);
      colorArray.push(value[i] && value[i].color);
    }
    this.setState({ valueArray, colorArray, currentLength });
  }

  handleValueChange(index, value) {
    let { valueArray } = this.state;
    valueArray[index] = value;
    this.setState({ valueArray }, () => {
      let { valueArray, colorArray } = this.state;
      let returnData = valueArray.map((item, index) => {
        return { value: item, color: colorArray[index] };
      });
      this.props.onChange(returnData);
    });
  }

  handleColorChange(index, value) {
    let { colorArray } = this.state;
    colorArray[index] = value.rgba;
    this.setState({ colorArray }, () => {
      let { valueArray, colorArray } = this.state;
      let returnData = valueArray.map((item, index) => {
        return { value: item, color: colorArray[index] };
      });
      this.props.onChange(returnData);
    });
  }

  handleAddSelect() {
    let { valueArray, currentLength, colorArray } = this.state;
    let { value } = this.props;

    valueArray.push(value[0] && value[0].value);
    colorArray.push(value[0] && value[0].color);
    currentLength += 1;

    this.setState({ valueArray, currentLength, colorArray }, () => {
      let { valueArray, colorArray } = this.state;
      let returnData = valueArray.map((item, index) => {
        return { value: item, color: colorArray[index] };
      });
      this.props.onChange(returnData);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  getOptions() {
    const { options = defaultOptions } = this.props;

    let Options = [];
    options && options.map((item, index) => {
      Options.push(<Option key={index} value={item.value}>{item.label}</Option>);
    });
    return Options;
  }

  render() {
    let { maxLength } = this.props;
    let { valueArray, currentLength, colorArray } = this.state;
    let optionsComponent = this.getOptions();
    let list = valueArray && valueArray.map((item, index) => {

      return (
        <div key={index} className="form-item-compose ant-row dynamic-select">
          <div className="ant-col-6 ant-form-item-label">
            <label>
              {this.props.label || '状态'}
            </label>
          </div>
          <div className="ant-col-14" style={{ marginTop: '5px' }}>
            <Select className="status-select" defaultValue={item}
                    onChange={this.handleValueChange.bind(this, index)}>
              {optionsComponent}
            </Select>
            <ColorPickerTrigger color={colorArray[index]} onChange={this.handleColorChange.bind(this, index)}/>
          </div>
        </div>
      );
    });

    return (
      <div className="dynamic-container">
        {list}
        {currentLength >= maxLength ?
          null :
          <Icon type="plus" className="increase-select" onClick={this.handleAddSelect.bind(this)}/>
        }
      </div>
    );
  }

}

export default DynamicSelect;
