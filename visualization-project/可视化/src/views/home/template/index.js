import './index.styl';

import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { hideTemplateModal, destroyModal } from 'store/dashboard/actions';
import Item from './item';

import AddWindowModal from 'components/addwindow/add-window';
import { hex2rgb } from 'utils/hex2rgba';
import { layout } from '../layout';
import win from 'utils/window';
import { FormattedMessage } from 'react-intl';
import intl from 'src/intl';

class TemplateModal extends Component {
  static propTypes = {
    template: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
    user: React.PropTypes.object,
    dashboard: React.PropTypes.object,
    width: React.PropTypes.string,
    isFullScreen: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      destroy: {
        visible: false
      },
      active: {},
      layoutData: {
        sectionw: 0,
        articlew: 0,
        snapshotHeight: 0
      }
    };
  }

  componentDidMount() {
    this.redraw = () => {
      const { templateList } = this.props.dashboard;
      const listLength = Object.keys(templateList).length;
      let { sectionw, articlew, snapshotHeight } = this.handleLayout(listLength);
      this.setState({
        layoutData: {
          sectionw: sectionw,
          articlew: articlew,
          snapshotHeight: snapshotHeight
        }
      });
    };

    win.on('resize', this.redraw);
  }

  componentWillUnmount() {
    win.removeListener('resize', this.redraw);
    this.redraw = null;
  }

  handleLayout(listLength) {
    let itemsLayoutData = layout(listLength + 1);
    return itemsLayoutData;
  }

  handleDestroyItem(id) {
    this.setState({
      active: this.props.dashboard.templateList[id]
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

  hideTemplateModal() {
    this.props.dispatch(hideTemplateModal());
  }

  render() {
    const { dashboard } = this.props;
    const { templateList } = dashboard;

    const listLength = Object.keys(templateList).length;
    let itemsLayoutData = this.handleLayout(listLength);
    let canOperate = this.props.user.canOperate && !this.props.isFullScreen ? true : false;
    let sectionClass = listLength < 6 ? 'fixed-layout' : '';

    let itemArr = Object.keys(templateList).map((id, index) => {
      return (
        <Item key={index} {...templateList[id]}
              flexBasis={`${itemsLayoutData.articlew}px`}
              width={`${itemsLayoutData.articlew}px`}
              height={`${itemsLayoutData.snapshotHeight}px`}
              fontSize={parseInt(dashboard.textSize) || 24}
              color={hex2rgb(dashboard.textColor, dashboard.textColorOpacity)}
              onDestroy={this.handleDestroyItem.bind(this)}
              canOperate={canOperate}
              length={listLength}
        />
      );
    });

    let windowList = [];
    let itemWrapClass = listLength > 5 ? 'item-wrap item-wrap-float' : 'item-wrap';

    if (templateList) {
      windowList.push(
        <section key="normal" className={sectionClass}
                 style={{
                   width: itemsLayoutData.sectionw + 'px',
                   left: itemsLayoutData.sectionlr,
                   right: itemsLayoutData.sectionlr
                 }}>
          <div className={itemWrapClass}>
            <AddWindowModal
              flexBasis={`${itemsLayoutData.articlew}px`}
              width={`${itemsLayoutData.articlew}px`}
              height={`${itemsLayoutData.snapshotHeight}px`}
              length={listLength}
            />
            {itemArr}
          </div>
        </section>
      );
    }

    return (
      <div>
        <Modal title={intl.formatMessage({ id: 'new window', defaultMessage: '新建窗口' })}
               visible={this.props.template} footer={null} className='template'
               onCancel={this.hideTemplateModal.bind(this)}>
          {windowList}
        </Modal>

        <Modal visible={this.state.destroy.visible}
               footer={[
                 <Button key={'destory'} onClick={this.handleOk.bind(this, 'destroy')}>
                   {intl.formatMessage({ id: 'delete', defaultMessage: '确定' })}
                 </Button>,
                 <Button key={'cancel'} onClick={this.handleCancel.bind(this, 'destroy')}>
                   {intl.formatMessage({ id: 'cancel', defaultMessage: '取消' })}
                 </Button>
               ]}
               onCancel={this.handleCancel.bind(this, 'destroy')}>
          <p>
            {<FormattedMessage id="do you confirm the deletion" defaultMessage="您是否确认删除"/>}
          </p>
          <p>“{this.state.active.title}” ？</p>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { dashboard, user } = state;
  return {
    dashboard,
    user,
    template: dashboard.template,
    templateList: dashboard.templateList
  };
};

export default connect(mapStateToProps)(TemplateModal);
