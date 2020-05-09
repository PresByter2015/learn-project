import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';
import { abs } from 'utils/math';
import aspectRatio from 'utils/aspectRatio';

import Grid from './grid';
import * as constants from '../constants';
import $ from 'jquery';

class GridWrap extends Component {
  static propTypes = {
    window: React.PropTypes.object,
    bg: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    _width: React.PropTypes.number,
    _height: React.PropTypes.number,
    zoom: React.PropTypes.number,
    cols: React.PropTypes.number,
    rows: React.PropTypes.number,
    keepAspectRatio: React.PropTypes.bool,
    canOperate: React.PropTypes.bool,
    isFullScreen: React.PropTypes.bool,
    setHeaderStyle: React.PropTypes.func,
    tool: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    let gridSize = this.calcFitGridSize(props);

    this.state = {
      fitGridSize: gridSize,
      gridSize: gridSize
    };
  }

  getWidgetCoordsWithPosition(position) {
    let gridRect = findDOMNode(this.refs.grid).getBoundingClientRect();
    // 获取 position 在 grid 中的位置
    let left = position.left - gridRect.left;
    let top = position.top - gridRect.top;

    let col = Math.floor(left / (gridRect.width / this.props.cols));
    let row = Math.floor(top / (gridRect.height / this.props.rows));

    return { col, row };
  }

  // 获取 grid-box 的样式
  getGridBoxStyle(contentWrapSize, gridSize, marginRow) {
    let style = {};
    let gridBoxStyle = [0, marginRow / 2];

    if (contentWrapSize) {
      if (contentWrapSize.height) {
        // let diffHeight = contentWrapSize.height - gridSize.height - 64 - 40
        // gridBoxStyle[0] = contentWrapSize.height - gridSize.height - constants.GRID_BORDER;
        gridBoxStyle[0] = contentWrapSize.height - gridSize.height;
      }

      if (contentWrapSize.width) {
        // let diffWidth = contentWrapSize.width - gridSize.width - constants.GRID_BORDER;
        let diffWidth = contentWrapSize.width - gridSize.width;
        if (diffWidth > marginRow) {
          gridBoxStyle[1] = diffWidth / 2;
        }
      }

      if (gridBoxStyle[0] < 0) {
        gridBoxStyle[0] = 0;
      }
    }

    if (marginRow <= 0) {
      style.borderWidth = 0;
    }

    if (this.props.isFullScreen) {
      gridBoxStyle[0] = gridBoxStyle[0] / 2; // 全屏下画布垂直居中
      style.margin = `${gridBoxStyle[0]}px ${gridBoxStyle[1]}px`;
    } else {
      style.margin = `0 ${gridBoxStyle[1]}px`;
    }

    console.log('style == ', style);

    return style;
  }

  shouldComponentUpdate(nextProps) {
    return !(nextProps.width <= 0 || nextProps.height <= 0);
  }

  componentWillReceiveProps(nextProps) {
    // cols 和 rows 不改变的时候不需要重绘
    if (nextProps.cols !== this.props.cols
      || nextProps.rows !== this.props.rows
      || nextProps.keepAspectRatio !== this.props.keepAspectRatio) {
      let gridSize = this.calcFitGridSize(nextProps);
      this.setState({
        fitGridSize: gridSize,
        gridSize: gridSize
      });
    }

    if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
      if (nextProps.isFullScreen === true) {
        let gridSize = this.calcFitGridSize(nextProps);
        this.setState({
          gridSize: gridSize
        });
      } else if (nextProps.isFullScreen === false) {
        let fitGridSize = this.calcFitGridSize(nextProps);//重新获取一次最佳尺寸
        let gridSize = this.calcGridSize(fitGridSize, nextProps);
        this.setState({
          fitGridSize: fitGridSize,
          gridSize: gridSize
        });
      }
    }

    let diffZoom = 0;
    if (nextProps.zoom !== this.props.zoom) {
      let gridSize = this.calcGridSize(this.state.fitGridSize, nextProps);
      diffZoom = nextProps.zoom - this.props.zoom;
      this.setState({
        gridSize: gridSize
      }, () => {
        this.redrawGridScroll(this.state.fitGridSize, nextProps, diffZoom);
      });
    }
  }

  redrawGridScroll(gridSize, props, diffZoom) {
    //放大画布从中心开始放大
    let $gridWrap = $('.grid-wrap');
    if ($gridWrap[0].scrollWidth > $gridWrap[0].clientWidth) {
      let diffCol = abs(gridSize.width - props._width) / 5;
      let scrollLeft = $gridWrap.scrollLeft() + diffCol / 2 * diffZoom;

      $gridWrap.scrollLeft(scrollLeft);
    }

    if ($gridWrap[0].scrollHeight > $gridWrap[0].clientHeight) {
      let diffRow = abs(gridSize.height - props._height) / 5;
      let scrollTop = $gridWrap.scrollTop() + diffRow / 2 * diffZoom;

      $gridWrap.scrollTop(scrollTop);
    }
  }

  calcFitGridSize(props) {
    // let minWrapMarginRow = constants.GRID_MARGIN_ROW;
    // let minWrapMarginCol = constants.GRID_MARGIN_COL;
    // let gridBorder = constants.GRID_BORDER;

    let minWrapMarginRow = 0;
    let minWrapMarginCol = 0;
    let gridBorder = 0;

    if (!props.canOperate) {
      minWrapMarginRow = 0;
      minWrapMarginCol = 0;
      gridBorder = 0;
    }

    /**
     * minWrapMarginRow 左右margin和
     * minWrapMarginCol 上下margin和
     * 命名不准确
     */
    let gridSize = aspectRatio(
      props.width - minWrapMarginRow - gridBorder,
      props.height - minWrapMarginCol - gridBorder,
      props.aspectRatio,
      props.keepAspectRatio
    );

    return gridSize;
  }

  calcGridSize(gridSize, props) {
    let newGridSize = _.clone(gridSize);

    let diffCol = (props.zoom - 1) * (abs(gridSize.width - props._width) / 5);
    let diffRow = (props.zoom - 1) * (abs(gridSize.height - props._height) / 5);
    newGridSize.width += diffCol;
    newGridSize.height += diffRow;
    return newGridSize;
  }

  componentDidMount() {
    //注册拖拽画布事件
    let $gridWrap = $('.grid-wrap');
    let startX = 0;
    let startY = 0;

    $gridWrap.mousedown((e) => {
      if (this.props.tool && this.props.tool.operate === 'drag') {
        startX = e.pageX;
        startY = e.pageY;

        $gridWrap.on('mousemove', this.parseMouseMove);

        $gridWrap.mouseup(() => {
          //移除mousemove事件
          $gridWrap.off('mousemove', this.parseMouseMove);
        });

        $gridWrap.mouseout(() => {
          //移除mousemove事件
          $gridWrap.off('mousemove', this.parseMouseMove);
        });
      }
    });

    this.parseMouseMove = (e) => {
      let diffLeft = e.pageX - startX;
      let diffTop = e.pageY - startY;

      let scrollTop = $gridWrap.scrollTop() - diffTop;
      let scrollLeft = $gridWrap.scrollLeft() - diffLeft;

      $gridWrap.css('visibility', 'hidden');
      $gridWrap.scrollTop(scrollTop).scrollLeft(scrollLeft);
      $gridWrap.css('visibility', 'visible');

      //用完后更新起始位置
      startX = e.pageX;
      startY = e.pageY;
    };
  }

  render() {
    let minWrapMarginRow = constants.GRID_MARGIN_ROW;
    let minWrapMarginCol = constants.GRID_MARGIN_COL;

    if (!this.props.canOperate) {
      minWrapMarginRow = 0;
      minWrapMarginCol = 0;
    }

    let gridBoxStyle = this.getGridBoxStyle({
      width: this.props.width,
      height: this.props.height
    }, this.state.gridSize, minWrapMarginRow, minWrapMarginCol);

    let gridWrapStyle = {
      width: this.props.width,
      height: this.props.height
    };

    return (
      <div className="grid-wrap" style={gridWrapStyle}>
        <div className="grid-box" style={gridBoxStyle}>
          <div className="grid-for-snapshot">
            <Grid ref="grid"
                  windowId={this.props.window.id}
                  cols={this.props.cols} rows={this.props.rows}
                  width={this.state.gridSize.width} height={this.state.gridSize.height}
                  _width={this.props._width} _height={this.props._height}
                  canOperate={this.props.canOperate}
                  tool={this.props.tool}
                  bgType={this.props.window.bgType}
                  bg={this.props.bg}/>
          </div>
        </div>
      </div>
    );
  }
}

export default GridWrap;
