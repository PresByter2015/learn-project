import React, { Component } from 'react';
import { Icon } from 'antd';
import { Range } from 'rc-slider';
import ColorPickerTrigger from 'components/color-picker/trigger';
import './dynamic-slider.css';
import { connect } from 'react-redux';

class DynamicSlider extends Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.array,
    max: React.PropTypes.number,
    editor: React.PropTypes.object,
    widgets: React.PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      defaultValue: [50],
      defaultCount: 0,
      colorArray: [],
      max: 3,
      dynamicCount: 0
    };
  }

  componentWillMount() {
    //第一次先走这里
    const { value = [], max } = this.props;
    const _value = [];
    const _colorArray = [];
    value[0] && Array.isArray(value[0]) && value[0].map((item) => {
      _value.push(item.value);
      _colorArray.push(item.color);
    });
    this.setState({
      colorArray: _colorArray,
      max
    });
  }

  handleValueChange(value) {
    //value = Array.from(new Set(value)) //[0, 0, 50, 50] => [0, 50]
    const { colorArray } = this.state;
    this.setState({
      defaultValue: Array.isArray(value) && value,
      defaultCount: Array.isArray(value) && value.length
    });

    let result = colorArray.map((item, index) => {
      return { value: value[index], color: item };
    });
    this.props.onChange(result);
  }

  handleColorChange(index, value) {
    const { colorArray, defaultValue } = this.state;
    colorArray[index] = value && value.rgba;
    this.setState({
      colorArray
    });
    let result = colorArray.map((item, index) => {
      return { value: defaultValue[index], color: item };
    });
    this.props.onChange(result);
  }

  handleAddColor() {
    const { colorArray, defaultValue } = this.state;
    colorArray.push(colorArray[colorArray.length - 1]);
    defaultValue.push(+((Math.random() * 100).toFixed(0)));
    this.setState({
      colorArray,
      defaultValue,
      defaultCount: defaultValue.length + 1
    });
  }

  getColorList() {
    const { max, colorArray } = this.state;
    const colorList = [];
    for (let i = 0, len = colorArray.length; i < len; i++) {
      colorList.push(
        <div key={i} style={{ display: 'inline-block' }}>
          {/*<p style={{ display: 'inline-block' }}>{ `区间${i}` }</p>*/}
          <ColorPickerTrigger color={colorArray[i]} onChange={this.handleColorChange.bind(this, i)}/>
        </div>
      );
    }

    if (colorArray.length < max) {
      colorList.push(
        <Icon type="plus" key={max} className="increase-select" onClick={this.handleAddColor.bind(this)}/>
      );
    }

    return colorList;
  }

  render() {
    //以后都走这里
    const { defaultCount, defaultValue } = this.state;
    const marks = {
      0: {
        style: {
          color: '#fff'
        },
        label: <strong>0%</strong>
      },
      100: {
        style: {
          color: '#fff'
        },
        label: <strong>100%</strong>
      }
    };
    for (let i = 0; i < defaultValue.length; i++) {
      if (!marks[defaultValue[i]]) {
        let item = defaultValue[i];
        let styleObj = {
          style: {
            color: '#fff'
          },
          label: <strong>{defaultValue[i] + '%'}</strong>
        };
        marks[item] = styleObj;
      }
    }
    const colorList = this.getColorList();
    return (
      <div>
        <Range count={defaultCount > 0 ? (defaultCount - 1) : defaultCount} defaultValue={defaultValue}
               value={defaultValue} onChange={this.handleValueChange.bind(this)} marks={marks}/>
        <div className="color-list">
          {colorList}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { widgets } = state.window;
  const { editor } = state;

  return {
    widgets,
    editor
  };
}

export default connect(mapStateToProps)(DynamicSlider);
