import React, { Component } from 'react';
import Slider from 'react-slick';
import { findDOMNode } from 'react-dom';
import browser from 'utils/browser';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './coverflow.styl';

class CoverFlow extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    children: React.PropTypes.array,
    length: React.PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      style: {}
    };
  }

  componentDidMount() {
    //IE下布局
    if (browser.msie && browser.versionNumber < 11) {
      setTimeout(() => {
        let coverflowRect = findDOMNode(this.refs.coverflow).getBoundingClientRect();
        let cfHeight = coverflowRect.height;

        this.setState({
          style: {
            marginTop: -cfHeight / 2,
            position: 'absolute',
            top: '50%'
          }
        });
      }, 100);
    }
  }

  render() {
    let slickSettings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      autoplay: true,
      autoplaySpeed: 15000,
      centerMode: true,
      centerPadding: 0
    };
    let coveflowMainClass = 'coverflow-main';

    if (this.props.length < 3) {
      slickSettings['slidesToShow'] = this.props.length;
      if (this.props.length < 2) {
        //只有一个窗口
        slickSettings['arrows'] = false;
        slickSettings['autoplay'] = false;
        coveflowMainClass += ' one-layout';
      } else {
        //两个窗口
        coveflowMainClass += ' two-layout';
      }
    }

    return (
      <div className="coverflow-container">
        <div ref="coverflow" className={coveflowMainClass} style={this.state.style}>
          <Slider {...slickSettings}>
            {this.props.children}
          </Slider>
        </div>
      </div>
    );
  }
}

export default CoverFlow;
