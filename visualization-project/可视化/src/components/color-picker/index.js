import React, { Component } from 'react';
import { Radio } from 'antd';
import { Panel as ColorPickerPanel } from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import './index.styl';
import { hex2rgb } from 'utils/hex2rgba';
import colorUtils from 'utils/color';
import _ from 'lodash';
import intl from 'src/intl';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class ColorPicker extends Component {
  static propTypes = {
    width: React.PropTypes.number,
    color: React.PropTypes.string,
    alpha: React.PropTypes.number,
    onChange: React.PropTypes.func
  };

  constructor() {
    super();
    this.state = {
      colorList: [{
        color: '#03a9f4',
        alpha: 100
      }, {
        color: '#90ed7d',
        alpha: 100
      }, {
        color: '#e2db1b',
        alpha: 100
      }, {
        color: '#f79727',
        alpha: 100
      }, {
        color: '#347bad',
        alpha: 100
      }]
    };
  }

  handleSelectColor(e) {
    this.dispatchColorChange({
      color: e.target.value.color,
      alpha: e.target.value.alpha
    });
  }

  handleResetColor() {
    this.dispatchColorChange({
      alpha: 0,
      color: this.props.color
    });
  }

  handleColorChange(obj) {
    // 颜色值变了，但是透明度是 0，需要把透明度改成 100
    if (this.props.color !== obj.color && obj.alpha === 0) {
      obj.alpha = 100;
    }

    this.dispatchColorChange(obj);
  }

  dispatchColorChange(data) {
    // 提供 rgba 颜色
    data.rgba = colorUtils.hex2rgb(data.color, data.alpha);
    this.props.onChange(data);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color === nextProps.color && this.props.alpha === nextProps.alpha) {
      return this.state.colorList !== nextState.colorList;
    } else {
      return true;
    }
  }

  updateUsedColor() {
    let colorList = _.clone(this.state.colorList, true);
    //更新最近使用
    if (colorList[4].color !== this.props.color || colorList[4].alpha !== this.props.alpha) {
      if (this.props.alpha !== 0) {
        colorList.shift();
        colorList.push({
          color: this.props.color,
          alpha: this.props.alpha
        });
        this.setState({ colorList });
      }
    }
  }

  render() {
    let { color, alpha } = this.props;
    let list = [];
    for (let i = 0; i < this.state.colorList.length; i++) {
      let backgroundColor = hex2rgb(this.state.colorList[i].color, this.state.colorList[i].alpha);
      list.push(
        <RadioButton key={i} value={this.state.colorList[i]} style={{ backgroundColor: backgroundColor }}/>
      );
    }

    return (
      <div className="color-picker">
        <ColorPickerPanel
          color={color}
          alpha={alpha}
          onChange={this.handleColorChange.bind(this)}
        />
        <div className="panel-toolbar">
          <p className="more-color">{intl.formatMessage({ id: 'recently used', defaultMessage: '最近使用' })}</p>
          <p className="reset-color">{intl.formatMessage({ id: 'null value', defaultMessage: '空值' })}</p>
        </div>
        <RadioGroup onChange={this.handleSelectColor.bind(this)}>
          {list}
          <div ref="resetColor" className="opacity-0" onClick={this.handleResetColor.bind(this)}/>
        </RadioGroup>
      </div>
    );
  }
}

export default ColorPicker;
