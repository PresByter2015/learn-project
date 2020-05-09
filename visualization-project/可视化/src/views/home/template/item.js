import { Icon, Button, Input } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { prefix as urlPrefix } from 'config/urls';
import { showAddModal, getNowWindowId, updateWindow } from 'store/dashboard/actions';
import intl from 'src/intl';

class Item extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    onDestroy: React.PropTypes.func,
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    src: React.PropTypes.string,
    icon: React.PropTypes.string,
    flexBasis: React.PropTypes.string,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    canOperate: React.PropTypes.bool,
    innerTemplate: React.PropTypes.bool,
    fontSize: React.PropTypes.number,
    color: React.PropTypes.string,
    length: React.PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      title: props.title
    };
  }

  handleFocus = () => {
    this.templateNameInput.refs.input.focus();
  };

  onPressEnter = () => {
    this.upDateTitle();
  };

  onblur = () => {
    this.upDateTitle();
  };

  upDateTitle() {
    let title = this.templateNameInput.refs.input.value;
    let window = {
      title: title
    };
    this.templateNameInput.refs.input.blur();
    this.props.dispatch(updateWindow(this.props.id, window));
  }

  onChangeTemplateName = (e) => {
    this.setState({ title: e.target.value });
  };

  handleShowAddModal = () => {
    this.props.dispatch(getNowWindowId(this.props.id));
    this.props.dispatch(showAddModal());
  };

  handleDestroy = () => {
    return this.props.onDestroy(this.props.id);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.title !== nextProps.title) {
      this.setState({
        title: nextProps.title
      });
    }
  }

  render() {
    let itemClass = this.props.length > 2 ? 'item-box' : 'item-box item-no-float';
    return (
      <div className={itemClass} style={{
        flexBasis: this.props.flexBasis,
        width: this.props.width
      }}>
        <div className="wrap">
          <div className="snapshot-main">
            <div className="snapshot-wrap" style={{ height: this.props.height }}>
              {this.props.canOperate ?
                <div>
                  {this.props.innerTemplate ? null :
                    <div className="toolkit">
                      <a onClick={this.handleDestroy}
                         title={intl.formatMessage({ id: 'delete', defaultMessage: '删除' })}>
                        <Icon type="delete"/>
                      </a>
                    </div>
                  }
                  <div className="create">
                    <Button type="primary" onClick={this.handleShowAddModal}>
                      {intl.formatMessage({ id: 'create', defaultMessage: '创建' })}
                    </Button>
                  </div>
                  <div className="hoverStatus"/>
                </div>
                : null
              }

              {this.props.icon ? <Snapshot src={this.props.icon}/> : null}
            </div>
            <h1 className="item-title" style={{
              fontSize: this.props.fontSize,
              color: this.props.color
            }}>
              <Input
                value={this.state.title}
                addonAfter={
                  <Icon type='edit' onClick={this.handleFocus}/>
                }
                onChange={this.onChangeTemplateName}
                onPressEnter={this.onPressEnter}
                onBlur={this.onblur}
                maxLength="50"
                ref={(input) => {
                  this.templateNameInput = input;
                }}
              />
            </h1>
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

  render() {
    return (
      <div className="snapshot" style={{ backgroundImage: `url(${urlPrefix}${this.props.src})` }}/>
    );
  }
}

const mapStateToProps = (state) => {
  const { dashboard } = state;
  return {
    dashboard
  };
};

export default connect(mapStateToProps)(Item);
