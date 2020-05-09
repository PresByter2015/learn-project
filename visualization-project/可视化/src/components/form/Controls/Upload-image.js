import React, { Component } from 'react';
import Upload from 'components/upload-image';

class UploadImage extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.any,
    onChange: React.PropTypes.func
  };

  constructor() {
    super();
  }

  handleChange(src) {
    this.props.onChange(src);
  }

  render() {
    return (
      <div>
        <Upload onUploadSuccess={this.handleChange.bind(this)} uploadBg={this.props.value}/>
      </div>
    );
  }
}

export default UploadImage;
