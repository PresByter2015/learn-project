import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

class RouteContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const { routes, store, history } = this.props;

    return (
      <Provider store={store}>
        <Router history={history} children={routes}/>
      </Provider>
    );
  }
}

export default RouteContainer;
