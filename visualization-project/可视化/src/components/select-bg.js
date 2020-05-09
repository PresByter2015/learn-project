import React, { Component } from 'react';
import { Form, Radio, Input } from 'antd';
import UploadImage from '../components/upload-image';
import ColorPickerTrigger from 'components/color-picker/trigger';
//import { ColorValid } from 'utils/color'
import intl from 'src/intl';
import './select-bg.styl';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class SelectBg extends Component {
  static propTypes = {
    data: React.PropTypes.object,
    form: React.PropTypes.object,
    callback: React.PropTypes.func,
    selectColor: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      bgType: 1
    };
  }

  handleChange() {
    setTimeout(() => {
      let data = this.props.form.getFieldsValue();
      if (this.props.callback) {
        let callbackData = {
          backgroundType: data.bgType,
          backgroundColor: data.bgColor,
          backgroundOpacity: data.bgColorOpacity,
          backgroundImage: data.bg
        };

        // alpha 为 0 的时候，清空背景色
        if (data.bgColorOpacity === 0) {
          callbackData.backgroundColor = '';
        }

        this.props.callback(callbackData);
      }
    }, 100);
  }

  handleUploadSuccess(src) {
    this.props.form.setFieldsValue({
      bg: src
    });

    this.handleChange();
  }

  handleChooseBg(e) {
    this.setState({
      bgType: e.target.value
    });

    this.handleChange();
  }

  componentWillMount() {
    this.setState({
      bgType: this.props.data.bgType
    });
  }

  handeColorChange(data) {
    let { color, alpha } = data;
    this.props.form.setFieldsValue({
      bgColor: alpha === 0 ? '' : color,
      bgColorOpacity: alpha
    });

    this.handleChange();
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <div className="main" style={{ position: 'relative' }}>
        {getFieldDecorator('bgType',
          { initialValue: this.props.data.bgType }
        )(
          <RadioGroup onChange={this.handleChooseBg.bind(this)}>
            <Radio key='a' value={1} className="bg-color">
              <FormItem {...formItemLayout}
                        label={intl.formatMessage({ id: 'background color', defaultMessage: '背景色' })}>
                <ColorPickerTrigger
                  color={this.props.data.bgColor}
                  alpha={getFieldValue('bgColorOpacity')}
                  onChange={this.handeColorChange.bind(this)}
                />
              </FormItem>
              <div key="bg" style={{ display: 'none' }}>
                {
                  getFieldDecorator('bgColor', { initialValue: this.props.data.bgColor })
                  (<Input type="hidden"/>)
                }

                {
                  getFieldDecorator('bgColorOpacity', {
                    initialValue: this.props.data.bgColorOpacity
                  })
                  (<Input type="hidden"/>)
                }
              </div>
            </Radio>

            {
              getFieldValue('bgType') === 2 ?
                <div className="bgcolor-mask">
                  <div className="mask-main">
                    <div className="mask-input"/>
                  </div>
                </div>
                :
                null
            }

            <Radio key='b' value={2} className="bg-image">
              <FormItem {...formItemLayout}
                        label={intl.formatMessage({ id: 'background image', defaultMessage: '背景图' })}>
                {
                  getFieldDecorator('bg',
                    { initialValue: this.props.data.bg })
                  (<Input type="hidden"/>)
                }
                <UploadImage ref="uploadImage"
                             active={getFieldValue('bgType') === 2}
                             onUploadSuccess={this.handleUploadSuccess.bind(this)}
                             uploadBg={getFieldValue('bg')}/>
              </FormItem>
            </Radio>

            {getFieldValue('bgType') === 1 ?
              <div className="bgimage-mask">
                <div className="mask-main">
                  <div className="mask-input"/>
                  {getFieldValue('bg') ?
                    < div className="mask-image"/>
                    : null
                  }
                </div>
              </div>
              :
              null
            }
          </RadioGroup>)}
      </div>
    );
  }
}

SelectBg = Form.create()(SelectBg);
export default SelectBg;
