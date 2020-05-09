import React, { Component } from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';

class ChartOptionSettingItem extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    className: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array
    ])
  };

  constructor() {
    super();
    this.state = {
      show: true
    };
  }

  handleToggleMenu() {
    this.setState({
      show: !this.state.show
    });
  }

  render() {
    let className = 'item chart-option-setting-item legend-contain';

    if (this.props.className) {
      className = `${className} ${this.props.className}`;
    }

    return (
      <div className={className}>
        <header className="header-contain" onClick={this.handleToggleMenu.bind(this)}>
          <p>{this.props.title}</p>
          <Icon type={this.state.show ? 'down' : 'up'}/>
        </header>
        <section className={classNames('main-contain', { 'main-contain-show': this.state.show })}
                 style={{ display: `${this.state.show ? 'block' : 'none'}` }}>
          {this.props.children}
        </section>
      </div>
    );
  }
}

export default ChartOptionSettingItem;
