import React, { PropTypes, Component } from 'react';
import { Row, Col } from 'antd';
import ColorPickerModal from 'components/color-picker/modal';

export default class extends Component {
  static propTypes = {
    left: PropTypes.object,
    right: PropTypes.object
  };

  render() {
    return (
      <div>
        <Row>
          <Col span={16}>
            <div style={{ position: 'fixed', top: 65, width: '60%' }}>
              {this.props.left}
            </div>
          </Col>
          <Col offset={2} span={6}>
            {this.props.right}
          </Col>
        </Row>
        <ColorPickerModal/>
      </div>
    );
  }
}
