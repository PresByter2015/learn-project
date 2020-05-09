import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { ChangeNavPanel } from 'store/editor/actions';
import classNames from 'classnames';

/**
 * WidgetGroup Component
 */
class WidgetGroup extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    title: React.PropTypes.string.isRequired,
    chartType: React.PropTypes.string.isRequired,
    themes: React.PropTypes.array,
    mouseEnter: React.PropTypes.func,
    isActive: React.PropTypes.bool,
    navPanel: React.PropTypes.object
  };

  handleShowNavPanel(e) {
    if (this.props.mouseEnter) {
      this.props.mouseEnter(this.props.chartType);
    }

    let position = {};
    let bodyRect = document.body.getBoundingClientRect();
    let rect;
    if (e.target.className.indexOf('widget-type') < 0) {
      let parentNode = e.target.parentNode;
      if (parentNode.className.indexOf('widget-type') >= 0) {
        rect = parentNode.getBoundingClientRect();
      }
    } else {
      rect = e.target.getBoundingClientRect();
    }

    //nav-panel高度
    let navPanelHeight = 316;
    if (this.props.themes.length < 4) {
      navPanelHeight = 168;
    }
    if (bodyRect.height - rect.top < navPanelHeight) {
      position.top = 'auto';
      position.bottom = 1;
      position.position = 'fixed';
    } else {
      position.top = rect.top - 55 - 80 - 44; //租户公共头部55px 页面header80px 工具栏44px
      position.position = 'absolute';
    }

    this.props.dispatch(ChangeNavPanel({
      ...position,
      themes: this.props.themes,
      chartType: this.props.chartType,
      visible: true
    }));
  }

  render() {
    let widgetClass = classNames('widget-type', {
      'widget-hover': this.props.isActive && this.props.navPanel.visible
    });

    return (
      <div className={widgetClass}
           onMouseEnter={this.handleShowNavPanel.bind(this)}>
        <Icon type={`chart-${this.props.chartType}`}/>
        <p>{this.props.title}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { navPanel } = state.editor;
  return {
    navPanel
  };
};

export default connect(mapStateToProps)(WidgetGroup);
