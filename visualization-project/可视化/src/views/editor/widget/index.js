import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'modules/chart';
import WidgetGroup from './widget-group';

import navs from './navs';

class WidgetNav extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      themes: {},
      type: ''
    };
  }

  componentWillMount() {
    this.setState({
      themes: Chart.parseCategory(navs)
    });
  }

  handleWidgetMouseEnter(typeValue) {
    this.setState({
      type: typeValue
    });
  }

  render() {
    let { themes } = this.state;
    let nav = [];
    if (themes) {
      nav = Object.keys(themes).map(key => {
        let theme = themes[key];
        return (<WidgetGroup key={key}
                             title={theme.title}
                             chartType={key}
                             mouseEnter={this.handleWidgetMouseEnter.bind(this)}
                             isActive={this.state.type === key}
                             themes={theme.themes}/>);
      });
    }

    return (
      <div className="widget-nav">
        {nav}
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps)(WidgetNav);
