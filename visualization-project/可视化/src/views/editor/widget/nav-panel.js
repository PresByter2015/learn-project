import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'modules/chart';
import { addWidget, fetchMold } from 'store/window/actions';
import GridStack from '../gridstack';
import intl from 'src/intl';
import $ from 'jquery';
import { prefix as urlPrefix } from 'config/urls';
import { imagePath } from 'utils/image-path';

class ChartNavPanel extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    windowId: React.PropTypes.string,
    navPanel: React.PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      show: false,
      molds: {} //模具数据
    };
  }

  
  // 添加组件
  addWidget(cate, type, theme, moldData = {}, e) {
    console.log('点击触发了内容组件');
    console.log(cate);
    console.log(type);
    console.log(theme);
    console.log(moldData);
    console.log(e);

    e.persist(); // 消除大量警告 https://github.com/acdlite/recompose/issues/122
    let chartData = Chart.get(type, theme);
    let chartSize = Chart.getSize(type);

    if (chartData) {
      if (typeof chartData.zIndex === 'undefined') {
        chartData.zIndex = window.topIndex + 1;
      }

      GridStack().then(gridStack => {
        let coords = gridStack.getCoordsWithSize({
          x: chartSize.sizex,
          y: chartSize.sizey
        });

        this.props.dispatch(addWidget(this.props.windowId,
          Object.assign({}, { chart: Object.assign({}, chartData, moldData) }, chartSize, coords)
        )).then(data => {
          let { id } = data;
          console.log('before');
          gridStack.addWidget(chartData.sizex, chartData.sizey, `#widget-${id}`, coords);
          console.log('after');
          
        });
      });
      console.log('=-=-=-=-=');
    }
  }

  getStyle() {
    let style = {};
    style.top = this.props.navPanel.top - 4;
    style.position = this.props.navPanel.position;

    if (this.props.navPanel.bottom) {
      style.bottom = this.props.navPanel.bottom;
    }

    style.display = this.state.show ? 'block' : 'none';
    return style;
  }

  handleMouseEnter() {
    this.setState({ show: true });
  }

  handleMouseLeave() {
    this.setState({ show: false });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navPanel.visible) {
      this.setState({
        show: true
      });
    } else {
      this.setState({
        show: false
      });
    }
  }

  componentWillMount() {
    //获取模具列表

    fetchMold().then(res => {
      console.log(res);
      if (res && res.data) {
        let parseMolds = {};

        res.data.map((mold) => {
          if (!parseMolds[mold.class]) {
            parseMolds[mold.class] = [];
          }

          mold.path = imagePath(urlPrefix, mold.path);

          if (mold.isInner) {
            //内置模具
            this.parseMoldSvg(mold.path).then((svgString) => {
              mold.svg = svgString;
            });
          }

          parseMolds[mold.class].push(mold);
        });
        console.log(parseMolds);
        this.setState({
          molds: parseMolds
        });
      }
    });
  }

  parseMoldSvg(url) {
    //解析svg格式图片得到其文本内容
    return new Promise((resolve) => {
      $.get(url, (res) => {
        let svgString = res.substring(res.indexOf('<svg'));
        resolve(svgString);
      }, 'text');
    });
  }

  parseMoldList(data, theme) {
    //解析模具列表
    return Object.keys(data).map((type, i) => {
      let classGroup = data[type];

      return (
        <div key={i} className="widget-group">
          <h1>{intl.formatMessage({ id: type, defaultMessage: type })}</h1>
          <div className="widget-padding">
            {
              classGroup.map((mold, j) => {

                if (mold.isInner && mold.svg) {
                  //内置模具 图片格式为svg
                  return (
                    <div key={j} className="widget-list draggable" draggable
                         data-cate={this.props.navPanel.chartType}
                         data-type={theme.type}
                         data-theme={theme.theme}
                         data-isInner={mold.isInner}
                         data-moldContent={mold.svg}
                         data-moldName={intl.formatMessage({ id: mold.name, defaultMessage: mold.name })}
                         data-moldTag={mold.tag}
                         onClick={
                           this.addWidget.bind(this, this.props.navPanel.chartType, theme.type, theme.theme, {
                             isInner: mold.isInner,
                             content: mold.svg,
                             name: intl.formatMessage({ id: mold.name, defaultMessage: mold.name }),
                             tag: mold.tag
                           })
                         }>
                      <div className="widget-image" dangerouslySetInnerHTML={{ __html: mold.svg }}/>
                      <p title={intl.formatMessage({ id: mold.name, defaultMessage: mold.name })}>
                        {intl.formatMessage({ id: mold.name, defaultMessage: mold.name })}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div key={j} className="widget-list draggable" draggable
                         data-cate={this.props.navPanel.chartType}
                         data-type={theme.type}
                         data-theme={theme.theme}
                         data-isInner={mold.isInner}
                         data-moldContent={mold.path}
                         data-moldName={intl.formatMessage({ id: mold.name, defaultMessage: mold.name })}
                         data-moldTag={mold.tag}
                         onClick={
                           this.addWidget.bind(this, this.props.navPanel.chartType, theme.type, theme.theme, {
                             isInner: mold.isInner,
                             content: mold.path,
                             name: intl.formatMessage({ id: mold.name, defaultMessage: mold.name }),
                             tag: mold.tag
                           })
                         }>
                      <div className="widget-image">
                        <span style={{ background: `url(${mold.path})` }}/>
                      </div>
                      <p title={intl.formatMessage({ id: mold.name, defaultMessage: mold.name })}>
                        {intl.formatMessage({ id: mold.name, defaultMessage: mold.name })}
                      </p>
                    </div>
                  );
                }

              })
            }
          </div>
        </div>
      );
    });
  }

  render() {
    let style = this.getStyle();
    let themes = this.props.navPanel.themes;
    let themesLength = themes.length;

    let widgetBoxClass = 'nav-panel';
    if (themesLength < 7) {
      widgetBoxClass += ' widget-row-1';
      if (themesLength !== 6) {
        widgetBoxClass += ` widget-col-${themesLength}`;
      }
    } else if (themesLength < 13) {
      widgetBoxClass += ' widget-row-2';
    }

    //若为模具则直接按照6列*3行布局
    themes && themes.map((item) => {
      if (item.type === 'mold') {
        widgetBoxClass = 'nav-panel nav-molds';
      }
    });

    return (
      <div className={widgetBoxClass}
           style={style}
           onMouseEnter={this.handleMouseEnter.bind(this)}
           onMouseLeave={this.handleMouseLeave.bind(this)}>
        {themes && themes.map((item, index) => {
          // console.log(item);
          if (item.type === 'mold') {
            return this.parseMoldList(this.state.molds, item);
          } else {
            return (
              // 这块内容就是
              <div key={index} className="widget-list draggable" draggable
                   data-cate={this.props.navPanel.chartType}
                   data-type={item.type}
                   data-theme={item.theme}
                   onClick={this.addWidget.bind(this, this.props.navPanel.chartType, item.type, item.theme, {})}>
                <div className="widget-image">
                  <span className={item.imgClassName}/>
                </div>
                <p title={item.title}>{item.title}</p>
              </div>
            );
          }
        })}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  let { window } = state.window;
  
  let { navPanel } = state.editor;
  // console.log(window);
  // console.log(navPanel);
  return {
    windowId: window.id,
    navPanel
  };
};

export default connect(mapStateToProps)(ChartNavPanel);
