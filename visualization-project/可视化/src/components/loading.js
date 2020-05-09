import React, { Component } from 'react';

export default class Loading extends Component {
  static propTypes = {
    style: React.PropTypes.object,
    type: React.PropTypes.string
  };

  constructor() {
    super();
  }

  render() {
    let { type } = this.props;
    let style = this.props.style;

    if (type === 'global') {
      style = Object.assign({
        position: 'absolute',
        top: '-40px',
        left: '50%',
        marginLeft: '-15px',
        zIndex: 999
      }, style);
    }

    return (
      <div className="loading" style={style}>
        <div className="spinner">
          <div className="spinner-blade"/>
          <div className="spinner-blade"/>
          <div className="spinner-blade"/>
          <div className="spinner-blade"/>
          <div className="spinner-blade"/>
          <div className="spinner-blade"/>
          <div className="spinner-blade"/>
          <div className="spinner-blade"/>
          <div className="spinner-blade"/>
          <div className="spinner-blade"/>
        </div>
      </div>
    );
  }
}
