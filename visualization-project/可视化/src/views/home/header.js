import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Popover, Icon, Button } from 'antd';
import { showSetModal, showTemplateModal, fetchTemplate } from 'store/dashboard/actions';
import AddModal from 'components/modal/add-modal';
import Fullscreen from 'components/fullscreen';
import PreviewAddModal from 'components/modal/preview-add-modal';
import TemplateModal from './template';
import intl from 'src/intl';

class Header extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    canOperate: React.PropTypes.bool,
    listLength: React.PropTypes.number,
    isFullScreen: React.PropTypes.bool,
    isPreview: React.PropTypes.bool,
    layoutType: React.PropTypes.string,
    onPreviewChange: React.PropTypes.func,
    onCoverflowChange: React.PropTypes.func,
    wallSetting: React.PropTypes.object,
    fontSize: React.PropTypes.number,
    color: React.PropTypes.string
  };

  constructor() {
    super();
  }

  handleAddModel() {
    this.props.dispatch(fetchTemplate({ template: 'templ' }));
    this.props.dispatch(showTemplateModal());
  }

  handleShowSetModal() {
    this.props.dispatch(showSetModal());
  }

  handlePreviewChange(bool) {
    this.props.onPreviewChange(bool);
  }

  // handleShowAddModal() {
  //   this.props.dispatch(showAddModal())
  // }

  // handlePreviewAddModal() {
  //   this.props.dispatch(showPreviewAddModal())
  // }

  handleTogglePreview(bool) {
    this.props.onCoverflowChange(bool);
  }

  handlePreviewCarousel() {
    this.handleTogglePreview(false);
  }

  handlePreviewCoverflow() {
    this.handleTogglePreview(true);
  }

  render() {
    let toolbar = [];
    // let listLength = this.props.listLength;

    if (this.props.canOperate) {
      toolbar.push(
        <Popover key="new" placement="bottom"
                 content={intl.formatMessage({ id: 'new', defaultMessage: '新建' })}>
          <Button type="primary" size="large" className="ant-link ant-link-primary"
                  onClick={this.handleAddModel.bind(this)}>
            {intl.formatMessage({ id: 'new', defaultMessage: '新建' })}
          </Button>
        </Popover>
      );
      // TODO - 有问题, 暂时注释
      toolbar.push(
        <Popover key="preview" placement="bottom"
                 content={intl.formatMessage({ id: 'preview', defaultMessage: '预览' })}>
          {/*<a className="btn">*/}
          {/*  <Fullscreen iconType="eye" onPreview={this.handlePreviewChange.bind(this)}*/}
          {/*    // onAddModal={ listLength === 0 ? this.handlePreview.bind(this) : null }*/}
          {/*  />*/}
          {/*</a>*/}
          <Button type="primary" size="large" className="ant-link ant-link-primary">
            <Fullscreen iconType="string" onPreview={this.handlePreviewChange.bind(this)}
              // onAddModal={listLength === 0 ? this.handlePreview.bind(this) : null}
            />
          </Button>
        </Popover>
      );
      toolbar.push(
        <Popover key="data-set" placement="bottom"
                 content={intl.formatMessage({ id: 'data set', defaultMessage: '数据集' })}>
          <Link className="ant-btn ant-btn-primary ant-btn-lg ant-link ant-link-primary" to="/data-set">
            {intl.formatMessage({ id: 'data set', defaultMessage: '数据集' })}
          </Link>
        </Popover>
      );
      toolbar.push(
        <Popover key="setting" placement="bottom"
                 content={intl.formatMessage({ id: 'setting', defaultMessage: '设置' })}>
          <Button type="primary" size="large" className="ant-link ant-link-primary"
                  onClick={this.handleShowSetModal.bind(this)}>
            {intl.formatMessage({ id: 'setting', defaultMessage: '设置' })}
          </Button>
        </Popover>
      );
    } else {
      if (!this.props.isFullScreen) {
        // 无操作权限且非全屏非预览
        toolbar.push(
          <Popover key="full-screen" placement="bottom"
                   content={intl.formatMessage({ id: 'full screen', defaultMessage: '全屏' })}>
            <Button type="primary" size="large" className="ant-link ant-link-primary">
              <Fullscreen iconType='string'/>
            </Button>
          </Popover>
        );
      } else {
        let fullScreen = new Fullscreen();
        if (this.props.isPreview) {
          // 返回 - 退出预览
          toolbar.push(
            <Popover key="exit-preview" placement="bottom"
                     content={intl.formatMessage({ id: 'exit preview', defaultMessage: '退出预览' })}>
              <div className="ant-btn-block">
                <a className="ant-btn ant-btn-primary ant-back" onClick={fullScreen.handleExitScreen}>
                  <Icon type="back"/>
                </a>
              </div>
            </Popover>
          );
        } else {
          // 返回 - 退出全屏
          toolbar.push(
            <Popover key="exit-full-screen" placement="bottom"
                     content={intl.formatMessage({ id: 'exit full screen', defaultMessage: '退出全屏' })}>
              <div className="ant-btn-block">
                <a className="ant-btn ant-btn-primary ant-back" onClick={fullScreen.handleExitScreen}>
                  <Icon type="back"/>
                </a>
              </div>
            </Popover>
          );
        }

        if (this.props.layoutType === 'coverflow') {
          toolbar.push(
            <Popover key="list-mode" placement="bottom"
                     content={intl.formatMessage({ id: 'list mode', defaultMessage: '列表' })}>
              <Button type="primary" size="large" className="ant-link ant-link-primary"
                      onClick={this.handlePreviewCarousel.bind(this)}>
                {intl.formatMessage({ id: 'list mode', defaultMessage: '列表' })}
              </Button>
            </Popover>
          );
          toolbar.push(
            <Popover key="coverflow-mode" placement="bottom"
                     content={intl.formatMessage({ id: 'coverflow mode', defaultMessage: '滚动' })}>
              <Button type="primary" size="large" className="ant-link ant-link-primary active"
                      onClick={this.handlePreviewCoverflow.bind(this)}>
                {intl.formatMessage({ id: 'coverflow mode', defaultMessage: '滚动' })}
              </Button>
            </Popover>
          );
        } else {
          toolbar.push(
            <Popover key="list-mode" placement="bottom"
                     content={intl.formatMessage({ id: 'list mode', defaultMessage: '列表' })}>
              <Button type="primary" size="large" className="ant-link ant-link-primary active"
                      onClick={this.handlePreviewCarousel.bind(this)}>
                {intl.formatMessage({ id: 'list mode', defaultMessage: '列表' })}
              </Button>
            </Popover>
          );
          toolbar.push(
            <Popover key="coverflow-mode" placement="bottom"
                     content={intl.formatMessage({ id: 'coverflow mode', defaultMessage: '滚动' })}>
              <Button type="primary" size="large" className="ant-link ant-link-primary"
                      onClick={this.handlePreviewCoverflow.bind(this)}>
                {intl.formatMessage({ id: 'coverflow mode', defaultMessage: '滚动' })}
              </Button>
            </Popover>
          );
        }
      }
    }

    return (
      <header className="app-header">
        <h1 className="title" style={{ fontSize: this.props.fontSize, color: this.props.color }}>
          {this.props.title}
        </h1>
        <div className="toolbar">
          {toolbar}
        </div>
        <AddModal/>
        <PreviewAddModal/>
        <TemplateModal/>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  const { dashboard } = state;
  return {
    layoutType: dashboard.layoutType
  };
};
export default connect(mapStateToProps)(Header);
