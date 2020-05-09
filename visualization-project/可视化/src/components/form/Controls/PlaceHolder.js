import $ from 'jquery';
import 'jquery-placeholder';
import React, { Component } from 'react';

export const Enhance = (ComposedComponent) =>
  class extends Component {
    componentDidMount() {
      setTimeout(() => {
        $('input, textarea').placeholder({ customClass: 'placeholder-input' });
      }, 200);
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  };

export default Enhance;
