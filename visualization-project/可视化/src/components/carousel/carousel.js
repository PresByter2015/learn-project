import React, { Component } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carousel.styl';

class Carousel extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    children: React.PropTypes.array,
    width: React.PropTypes.number,
    length: React.PropTypes.number
  };

  render() {
    let slickSettings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      centerMode: true,
      arrows: true
    };

    if (this.props.length < 2) {
      slickSettings['arrows'] = false;
      slickSettings['autoplay'] = false;
    }

    let carouselWidth = (this.props.width + 100) + 'px';

    return (
      <div className="carousel-container" style={{ width: carouselWidth }}>
        <Slider {...slickSettings}>
          {this.props.children}
        </Slider>
      </div>
    );
  }
}

export default Carousel;
