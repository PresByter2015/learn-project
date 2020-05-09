import React, { Component } from 'react';

class ItemNoop extends Component {
  static propTypes = {
    flexBasis: React.PropTypes.string,
    width: React.PropTypes.string,
    height: React.PropTypes.string
  };

  render() {
    return (
      <div className="item-box" style={{
        flexBasis: this.props.flexBasis,
        width: this.props.width, visibility: 'hidden'
      }}>
        <div className="wrap">
          <div className="snapshot-main">
            <a>
              <div className="snapshot-wrap" style={{ height: this.props.height }}/>
              <h1 className="item-title">ItemNoop</h1>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemNoop;
