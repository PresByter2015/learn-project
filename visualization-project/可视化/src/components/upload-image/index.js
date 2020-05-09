import React, { Component } from 'react';
import { Upload, Icon, message, Button } from 'antd';
import './index.styl';
import urls from 'config/urls';
import { prefix as urlPrefix } from 'config/urls';
import intl from 'src/intl';
import { imagePath } from 'utils/image-path';

const maxSize = 20 * 1024 * 1024;

class UploadImage extends Component {
  static propTypes = {
    uploadBg: React.PropTypes.string,
    onUploadSuccess: React.PropTypes.func.isRequired,
    active: React.PropTypes.bool
  };

  constructor() {
    super();
    this.state = {
      bg: '',
      active: false
    };

    this.uploadProps = {
      name: 'image',
      action: urls.get('upload'),
      beforeUpload(file) {
        if (file.size > maxSize) {  //is bigger than 20M ? only support IE10+ && chrome ...
          message.error(`${intl.formatMessage({
            id: 'image size can not exceed 20M',
            defaultMessage: '图片大小不能超过20M'
          })}`);
          return false;
        }
        let type = '';
        if (file.type) {
          type = file.type;
        } else {
          type = file.name; // IE
        }
        type = type.toLowerCase();
        const reg = '.+(.jpeg|.jpg|.bmp|.png|.gif)$';
        let isIllegal = Boolean(type.match(reg)); // is illegal?
        if (!isIllegal) {
          message.error(`${intl.formatMessage({
            id: 'please choose jpg, jpeg, png, bmp, gif type of picture!',
            defaultMessage: '请选择jpg,jpeg,png,bmp,gif类型的图片!'
          })}`);
        }
        return isIllegal;
      },
      showUploadList: false,
      onChange: (info) => {
        let imgSrc = '';
        let _message = '';
        if (info.file.status === 'done') {
          // 针对 IE 兼容处理
          // https://www.sencha.com/forum/archive/index.php/t-17248.html
          if (info.file.response && typeof info.file.response === 'string') {
            let data = info.file.response.replace(/(<([^>]+)>)/ig, '');
            try {
              data = JSON.parse(data);
              imgSrc = data.data;
              _message = data.message;
            } catch (e) {
            }
          } else {
            imgSrc = info.file.response.data;
          }

          if (imgSrc) {
            this.props.onUploadSuccess && this.props.onUploadSuccess(imgSrc);
            this.setState({ bg: imgSrc });
            message.success(`${intl.formatMessage({ id: 'image upload successful', defaultMessage: '图片上传成功' })}`);
          } else {
            message.error(_message);
          }
        } else if (info.file.status === 'error') {
          message.error(`${intl.formatMessage({ id: 'image upload failed', defaultMessage: '图片上传失败' })}`);
        }
      }
    };
  }

  handleDeleteBgImage(e) {
    e.stopPropagation(); // 阻止冒泡
    e.preventDefault();  //阻止默认事件
    this.setState({
      bg: ''
    });
    setTimeout(() => {
      this.props.onUploadSuccess && this.props.onUploadSuccess('');
    });
  }

  componentWillMount() {
    this.setState({
      bg: this.props.uploadBg
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.uploadBg !== nextProps.uploadBg) {
      setTimeout(() => {
        this.setState({
          bg: this.props.uploadBg
        });
      });
    }
  }

  getImageSrc() {
    return this.state.bg;
  }

  render() {
    let style = {};
    style.backgroundImage = 'url(' + imagePath(urlPrefix, this.state.bg) + ')';

    return (
      <div className="upload-image">
        <Upload {...this.uploadProps}>
          <Button className="ant-btn-primary">
            {intl.formatMessage({ id: 'click upload', defaultMessage: '点击上传' })}
          </Button>
        </Upload>
        {this.state.bg ?
          <div className="showUplaodImage">
            <div className="inner-div" style={style}/>
            <Icon type="cross" onClick={this.handleDeleteBgImage.bind(this)}/>
          </div>
          : null
        }
      </div>
    );
  }
}

export default UploadImage;
