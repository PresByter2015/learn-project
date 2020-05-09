import { Icon } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { prefix as urlPrefix } from 'config/urls';
import intl from 'src/intl';

class Item extends Component {
  static propTypes = {
    onDestroy: React.PropTypes.func,
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    src: React.PropTypes.string,
    icon: React.PropTypes.string,
    flexBasis: React.PropTypes.string,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    canOperate: React.PropTypes.bool,
    fontSize: React.PropTypes.number,
    color: React.PropTypes.string,
    length: React.PropTypes.number
  };

  handleDestroy = () => {
    return this.props.onDestroy(this.props.id);
  };

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  render() {
    let deleteText = intl.formatMessage({ id: 'delete', defaultMessage: 'Delete' });
    let itemClass = this.props.length > 3 ? 'item-box' : 'item-box item-no-float';

    return (
      <div className={itemClass} style={{
        flexBasis: this.props.flexBasis,
        width: this.props.width
      }}>
        <div className="wrap">
          {this.props.canOperate ?
            <div className="toolkit">
              <a onClick={this.handleDestroy} title={deleteText}>
                <Icon type="delete"/>
              </a>
            </div>
            : null
          }
          <div className="snapshot-main">
            <Link to={`editor/${this.props.id}`}>
              <div className="snapshot-wrap" style={{ height: this.props.height }}>
                {this.props.icon ? <Snapshot src={this.props.icon}/> : null}
              </div>
              <h1 className="item-title" style={{
                fontSize: this.props.fontSize,
                color: this.props.color
              }}>
                {this.props.title}
              </h1>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

class Snapshot extends Component {
  static propTypes = {
    src: React.PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      loaded: true
    };
  }

  handleImgError() {
    this.setState({
      loaded: false
    });
  }

  render() {
    return (
      <div className="snapshot" style={{ backgroundImage: `url(${urlPrefix}${this.props.src})` }}/>
    );
  }
}

export default Item;
