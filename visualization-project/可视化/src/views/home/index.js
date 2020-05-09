import './index.styl';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button } from 'antd';
import Dom from 'utils/dom';
import win from 'utils/window';
// import ColorUtils from 'utils/color'
import { hex2rgb } from 'utils/hex2rgba';
import browser from 'utils/browser';
import Header from './header';
import Item from './item';
import ItemNoop from './item-noop';
import SettingModal from './setting-modal';
import AddWindowModal from 'components/addwindow/add-window';
import { fetchDashboard, destroyModal, toggleLayoutType } from 'store/dashboard/actions';
import { togglePreview, toggleFullScreen } from 'store/global/actions';
import { layout } from './layout';
import Carousel from 'components/carousel/carousel';
import CoverFlow from 'components/coverflow/coverflow';
import ColorPickerModal from 'components/color-picker/modal';
import { prefix as urlPrefix } from 'config/urls';
import { FormattedMessage } from 'react-intl';
import Intl from 'src/intl';


const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

class Dashboard extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    form: React.PropTypes.object,
    dashboard: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    title: React.PropTypes.string,
    layoutType: React.PropTypes.string,
    isPreview: React.PropTypes.bool,
    isFullScreen: React.PropTypes.bool
  };

  constructor(args) {
    super(args);
    this.state = {
      edit: {
        visible: false
      },
      destroy: {
        visible: false
      },
      active: {},
      height: {},
      layoutData: {
        sectionw: 0,
        articlew: 0,
        snapshotHeight: 0
      }
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchDashboard());

    this.redraw = () => {
      const { list } = this.props.dashboard;
      const listLength = Object.keys(list).length;
      let { sectionw, articlew, snapshotHeight } = this.handleLayout(listLength);
      this.setState({
        layoutData: {
          sectionw: sectionw,
          articlew: articlew,
          snapshotHeight: snapshotHeight
        }
      });
    };
    // 动态方法，防止路由切换无法移除 window resize
    win.on('resize', this.redraw);
  }

  handleDestroyItem(id) {
    this.setState({
      active: this.props.dashboard.list[id]
    });
    this.handleShowSetModal('destroy');
  }

  handleShowSetModal(type) {
    this.setState({
      [type]: {
        visible: true
      }
    });
  }

  handleOk(type) {
    let id = this.state.active.id;
    if (type === 'destroy') {
      this.props.dispatch(destroyModal(id));
    }

    this.setState({
      [type]: {
        visible: false
      }
    });
  }

  handleCancel(type) {
    this.setState({
      [type]: {
        visible: false
      }
    });
  }

  handlePreview() {
    if (!browser.msie || (browser.msie && browser.versionNumber > 10)) {
      this.props.dispatch(togglePreview(true));
      this.props.dispatch(toggleFullScreen(true));
    }
  }

  handleToggleCoverflow(bool) {
    if (bool) {
      this.props.dispatch(toggleLayoutType('coverflow'));
    } else {
      this.props.dispatch(toggleLayoutType('carousel'));
    }
  }

  handleLayout(listLength) {
    let itemsLayoutData = layout(listLength);
    return itemsLayoutData;
  }

  handleCarousel(arr, itemsLayoutData) {
    let itemCarousel = [];
    let index = 0;
    for (let i = 0; i < arr.length; i++) {
      (itemCarousel[index] = itemCarousel[index] || []).push(arr[i]);
      if (i % 6 === 5) {
        index += 1;
      }
    }
    itemCarousel = itemCarousel.map((item, index) => {
      //若不足6个,补全隐藏的item
      if (item.length !== 6 && index !== 0) {
        let itemLen = item.length;
        for (let i = 0; i < (6 - itemLen); i++) {
          item.push(<ItemNoop key={i} flexBasis={`${itemsLayoutData.articlew}px`}
                              width={`${itemsLayoutData.articlew}px`}
                              height={`${itemsLayoutData.snapshotHeight}px`}/>);
        }
      }
      return (<div key={index} className="carousel-group fixed-layout">
        <div className="item-wrap">{item}</div>
      </div>);
    });
    return itemCarousel;
  }

  handleCoverflow(arr) {
    let itemCoverflow = arr.concat();
    itemCoverflow = itemCoverflow.map((item, index) => {
      return <div key={index} className="coverflow-group">{item}</div>;
    });
    return itemCoverflow;
  }

  componentWillUnmount() {
    Dom.body.removeClass('has-cover');
    if (document.body.style.overflow) {
      document.body.style.removeProperty('overflow');
    }
    document.body.style.removeProperty('background');

    win.removeListener('resize', this.redraw);//移除监听resize1
    this.redraw = null;
  }

  renderBackground() {
    const { dashboard } = this.props;
    const { bgType } = dashboard;

    if (bgType === 1 && dashboard.bgColorOpacity) {
      let color = hex2rgb(dashboard.bgColor, dashboard.bgColorOpacity);
      Dom.body
        .addClass('has-cover')
        .css({
          'background-image': '',
          'background': color
        });
    } else if (bgType === 2 && dashboard.bg) {
      // 背景图
      Dom.body
        .addClass('has-cover')
        .css({
          'background-color': '',
          'background-size': 'cover',
          'background-position': 'center',
          'background-image': `url(${urlPrefix}${dashboard.bg})`
        });
    } else {
      Dom.body
        .removeClass('has-cover')
        .css('background-image', '')
        .css('background', '');
    }
  }

  render() {
    const { dashboard } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { list } = dashboard;//列表
    const listLength = Object.keys(list).length;//列表长度
    let itemsLayoutData = this.handleLayout(listLength);//布局样式数据
    let canOperate = this.props.user.canOperate && !this.props.isFullScreen ? true : false;//是否可操作
    let { layoutType } = this.props;//全屏布局展示方式

    // 背景图设置
    this.renderBackground();

    //窗口墙列表布局样式控制
    let sectionClass = listLength < 7 ? 'fixed-layout' : '';

    //窗口墙列表
    let itemArr = Object.keys(list).map((id, index) => {
      return (<Item key={index} {...list[id]}
                    flexBasis={`${itemsLayoutData.articlew}px`}
                    width={`${itemsLayoutData.articlew}px`}
                    height={`${itemsLayoutData.snapshotHeight}px`}
                    fontSize={parseInt(dashboard.textSize) || 24}
                    color={hex2rgb(dashboard.textColor, dashboard.textColorOpacity)}
                    onDestroy={this.handleDestroyItem.bind(this)}
                    canOperate={canOperate}
                    length={listLength}/>);
    });
    let itemCarousel = this.handleCarousel(itemArr, itemsLayoutData);
    let itemCoverflow = this.handleCoverflow(itemArr);

    //窗口墙展示
    let windowList = [];
    let itemWrapClass = listLength > 6 ? 'item-wrap item-wrap-float' : 'item-wrap';
    if (list) {
      if (this.props.isFullScreen) {
        if (layoutType === 'coverflow') {
          windowList.push(
            <CoverFlow key="coverflow" length={listLength}>
              {itemCoverflow}
            </CoverFlow>
          );
        } else if (layoutType === 'carousel') {
          windowList.push(
            <Carousel key="carousel" width={itemsLayoutData.sectionw}
                      length={itemCarousel.length}>
              {itemCarousel}
            </Carousel>
          );
        }
      } else {
        windowList.push(
          <section key="normal" className={sectionClass}
                   style={{
                     width: itemsLayoutData.sectionw + 'px',
                     left: itemsLayoutData.sectionlr,
                     right: itemsLayoutData.sectionlr
                   }}>
            <div className={itemWrapClass}>
              {itemArr}
              {canOperate && listLength === 0 ?
                <AddWindowModal
                  flexBasis={`${itemsLayoutData.articlew}px`}
                  width={`${itemsLayoutData.articlew}px`}
                  height={`${itemsLayoutData.snapshotHeight}px`}/>
                : null
              }
            </div>
          </section>
        );
      }
    }

    return (
      <div className="dashboard-page">
        <Header {...this.props.dashboard}
                canOperate={canOperate}
                listLength={listLength}
                fontSize={dashboard.titleSize}
                title={dashboard.title}
                color={hex2rgb(dashboard.titleColor, dashboard.titleColorOpacity)}
                isFullScreen={this.props.isFullScreen}
                isPreview={this.props.isPreview}
                onPreviewChange={this.handlePreview.bind(this)}
                onCoverflowChange={this.handleToggleCoverflow.bind(this)}
        />

        {windowList}

        <Modal title={<FormattedMessage id="modify the window" defaultMessage="修改窗口"/>}
               visible={this.state.edit.visible}
               onOk={this.handleOk.bind(this, 'edit')}
               onCancel={this.handleCancel.bind(this, 'edit')}
               okText={<FormattedMessage id="save" defaultMessage="保存"/>}>
          <Form horizontal onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label={Intl.formatMessage({ id: 'window name', defaultMessage: '窗口名称' })}>
              {getFieldDecorator('title', { initialValue: this.state.active.title })(<Input type="text"/>)}
            </FormItem>
          </Form>
        </Modal>

        <Modal visible={this.state.destroy.visible}
               footer={[
                 <Button type="primary" key={'destory'} onClick={this.handleOk.bind(this, 'destroy')}>
                   {Intl.formatMessage({ id: 'delete', defaultMessage: '确定' })}
                 </Button>,
                 <Button type="primary" key={'cancel'} onClick={this.handleCancel.bind(this, 'destroy')}>
                   {Intl.formatMessage({ id: 'cancel', defaultMessage: '取消' })}
                 </Button>
               ]}
               onCancel={this.handleCancel.bind(this, 'destroy')}>
          <p>
            {
              Intl.formatMessage({ id: 'do you confirm the deletion', defaultMessage: '您是否确认删除' })
            }
          </p>
          <p>“{this.state.active.title}” ？</p>
        </Modal>
        <SettingModal check={dashboard.bgType}/>
        <ColorPickerModal/>
      </div>
    );
  }
}

Dashboard = Form.create()(Dashboard);

const mapStateToProps = (state) => {
  const { dashboard, user } = state;
  return {
    dashboard,
    user,
    isPreview: state.global.isPreview,
    isFullScreen: state.global.isFullScreen,
    layoutType: dashboard.layoutType
  };
};

export default connect(mapStateToProps)(Dashboard);
