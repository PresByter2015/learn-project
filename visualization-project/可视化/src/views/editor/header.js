import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { Icon, Popover, Modal, message, Button } from 'antd';
import { showSettingModal, setCoords, changeActiveWidget } from 'store/editor/actions';
import { updateWidgetBuuid } from 'store/window/actions';
import { getTemplateId } from 'store/dashboard/actions';
import FullScreen from 'components/fullscreen';
import RecordManager from 'modules/records-change';
import { DealChange } from 'modules/records-change/dealData';
import { saveTemplate } from 'modules/template';
import event from './event';
import { push } from 'react-router-redux';
import { deepCopy } from 'utils/serialize';
import intl from 'src/intl';

const confirm = Modal.confirm;

class Header extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    canOperate: React.PropTypes.bool,
    onPreview: React.PropTypes.func,
    isPreview: React.PropTypes.bool,
    isFullScreen: React.PropTypes.bool,
    widgets: React.PropTypes.object,
    toolbarStyle: React.PropTypes.object,
    window: React.PropTypes.object
  };

  componentDidMount() {
    let rect = findDOMNode(this).getBoundingClientRect();
    this.props.dispatch(setCoords('header', { height: rect.height }));
  }

  handleClickSettingBtn() {
    this.props.dispatch(showSettingModal());
  }

  templateSaveBtn() {
    const loadingMessage = message.loading(
      intl.formatMessage({ id: 'please wait for the screenshots', defaultMessage: '正在截屏,请稍候' }), 0);

    let _widgets = this.props.widgets;
    // 保存模版时旧的组件数据需要去掉buuid, 拷贝一份数据存入数据库
    let widgets = deepCopy(_widgets);
    for (let i in widgets) {
      if (widgets[i] === null) {
        delete widgets[i];
      }
      for (let j in widgets[i]) {
        if (j === 'dataSetting') {
          delete widgets[i][j];
        }
        if (j === 'buuid') {
          widgets[i][j] = null;
        }
      }
    }

    let data = {};
    let windowInfo = this.props.window;

    data.window = {
      title: windowInfo.title,
      screenRatio: windowInfo.screenRatio,
      keepScreenRatio: windowInfo.keepScreenRatio,
      bgType: windowInfo.bgType,
      bgColor: windowInfo.bgColor,
      bgColorOpacity: windowInfo.bgColorOpacity,
      bg: windowInfo.bg
    };

    this.props.dispatch(changeActiveWidget());//清除选中部件

    // 先获取模版id再去取代windowId
    this.props.dispatch(getTemplateId(data))
      .then(res => {
        let templateId = res.data.id;
        saveTemplate(templateId, widgets).then(res => {
          if (res.errCode === 200) {
            event.emit('editor.snapshot', templateId, () => {
              //截屏成功回调
              setTimeout(loadingMessage, 0);
              message.success(intl.formatMessage({ id: 'saved successfully', defaultMessage: '保存成功' }));
            });
          } else {
            setTimeout(loadingMessage, 0);
            message.success(intl.formatMessage({ id: 'save failed, please try again', defaultMessage: '保存失败,请重试' }));
          }
        });
      });
  }

  handleClickSaveBtn() {
    //保存
    const windowRecord = RecordManager.get('window');//获取窗口实例
    let changeData = windowRecord.getRecords();

    this.props.dispatch(changeActiveWidget());//清除选中部件

    let changed = Object.keys(changeData).length > 0;
    if (changed) {
      const loadingMessage = message.loading(
        intl.formatMessage({ id: 'please wait for the screenshots', defaultMessage: '正在截屏,请稍候' }), 0);

      DealChange(this.props.window.id, this.props.widgets, changeData).then(res => {
        if (res.errCode === 200) {
          //若存在新增部件,则更新状态树上的后端id
          let data = res.data;
          let updateStateData = [];
          for (let key in data) {
            if (data[key].action === 'add') {
              updateStateData.push({
                fuuid: key,
                buuid: data[key].buuid
              });
            }
          }

          this.props.dispatch(updateWidgetBuuid(updateStateData));

          event.emit('editor.snapshot', 0, () => {
            //截屏成功回调
            //提示信息
            setTimeout(loadingMessage, 0);
            message.success(intl.formatMessage({ id: 'saved successfully', defaultMessage: '保存成功' }));
            windowRecord.resetChange();//清除记录修改的数据
          });
        } else {
          setTimeout(loadingMessage, 0);
          message.success(intl.formatMessage({ id: 'save failed, please try again', defaultMessage: '保存失败,请重试' }));
        }
      });
    } else {
      message.success(intl.formatMessage({
        id: 'saved successfully',
        defaultMessage: '保存成功'
      }));
    }
  }

  handlerShowConfirm(callback) {
    confirm({
      title: intl.formatHTMLMessage({
        id: 'your changes will not be saved, confirm to leave?',
        defaultMessage: '您还有数据没有保存，确定要退出吗?'
      }),
      okText: intl.formatMessage({
        id: 'leave',
        defaultMessage: '退出'
      }),
      cancelText: intl.formatMessage({
        id: 'cancel',
        defaultMessage: '取消'
      }),
      onOk() {
        callback();
      }
    });
  }

  handleClickBackBtn() {
    //返回
    const windowRecord = RecordManager.get('window');//获取窗口实例
    let changeData = windowRecord.getRecords();
    let changed = Object.keys(changeData).length > 0;
    if (changed) {
      //弹窗
      this.handlerShowConfirm(() => {
        this.props.dispatch(push('/'));
      });
    } else {
      this.props.dispatch(push('/'));
    }
  }

  render() {
    let toolbar = [];

    if (this.props.canOperate) {
      // 有操作权限的用户在非预览场景下
      toolbar.push(
        <Popover key="save" placement="bottom"
                 content={intl.formatMessage({ id: 'save', defaultMessage: '保存' })}>
          <Button type="primary" size="large" className="ant-link ant-link-primary"
                  onClick={this.handleClickSaveBtn.bind(this)}>
            <Icon type='save'/>
          </Button>
        </Popover>
      );
      toolbar.push(
        <Popover key="save-template" placement="bottom"
                 content={intl.formatMessage({ id: 'save as template', defaultMessage: '保存为模版' })}>
          <Button type="primary" size="large" className="ant-link ant-link-primary"
                  onClick={this.templateSaveBtn.bind(this)}>
            <Icon type='save-template'/>
          </Button>
        </Popover>
      );
      toolbar.push(
        <Popover key="preview" placement="bottom"
                 content={intl.formatMessage({ id: 'preview', defaultMessage: '预览' })}>
          <Button type="primary" size="large" className="ant-link ant-link-primary">
            <FullScreen iconType="eye" onClick={this.props.onPreview}/>
          </Button>
        </Popover>
      );
      toolbar.push(
        <Popover key="setting" placement="bottom"
                 content={intl.formatMessage({ id: 'setting', defaultMessage: '设置' })}>
          <Button type="primary" size="large" className="ant-link ant-link-primary"
                  onClick={this.handleClickSettingBtn.bind(this)}>
            <Icon type="setting"/>
          </Button>
        </Popover>
      );
    } else {
      if (!this.props.isFullScreen) {
        //无操作权限且非全屏非预览
        toolbar.push(
          <Popover key="fullscreen" placement="bottom"
                   content={intl.formatMessage({ id: 'full screen', defaultMessage: '全屏' })}>
            <Button type="primary" size="large" className="ant-link ant-link-primary">
              <FullScreen iconType='arrow-salt'/>
            </Button>
          </Popover>
        );
      } else {
        // 返回
        // toolbar.push(
        //   <Popover key="back" placement="bottom"
        //            content={intl.formatMessage({ id: 'back', defaultMessage: '返回' })}>
        //     <div className="ant-btn-block">
        //       <a className="ant-btn ant-btn-primary ant-back" onClick={this.handleClickBackBtn.bind(this)}>
        //         <Icon type="back"/>
        //       </a>
        //     </div>
        //   </Popover>
        // );

        if (this.props.isPreview) {
          // 预览
          toolbar.push(
            <Popover key="exit-preview" placement="bottom"
                     content={intl.formatMessage({ id: 'exit preview', defaultMessage: '退出预览' })}>
              <Button type="primary" size="large" className="ant-link ant-link-primary">
                <FullScreen iconType='exit-eye' type='exitFull'/>
              </Button>
            </Popover>
          );
        } else {
          // 全屏
          toolbar.push(
            <Popover key="exit-fullscreen" placement="bottom"
                     content={intl.formatMessage({ id: 'exit full screen', defaultMessage: '退出全屏' })}>
              <Button type="primary" size="large" className="ant-link ant-link-primary">
                <FullScreen iconType='shrink' type='exitFull'/>
              </Button>
            </Popover>
          );
        }
      }
    }

    let { toolbarStyle } = this.props;

    return (
      <header className="app-header">
        <h1 className="title">{this.props.title}</h1>
        <div className="toolbar" style={toolbarStyle}>
          <Popover placement="bottom"
                   content={intl.formatMessage({ id: 'back', defaultMessage: '返回' })}>
            <div className="ant-btn-block">
              <a className="ant-btn ant-btn-primary ant-back" onClick={this.handleClickBackBtn.bind(this)}>
                <Icon type="back"/>
              </a>
            </div>
          </Popover>
          {toolbar}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  let { widgets, window } = state.window;

  return {
    widgets,
    window
  };
};

export default connect(mapStateToProps)(Header);
