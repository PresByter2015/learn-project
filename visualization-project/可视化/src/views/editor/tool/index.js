import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Popover } from 'antd';
import { toggleToolSelect } from 'store/editor/actions';
import intl from 'src/intl';
import event from '../event';

class Tool extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    zoom: React.PropTypes.number,
    onZoom: React.PropTypes.func,
    tool: React.PropTypes.object,
    activeWidgetId: React.PropTypes.string
  };

  handleClick(type) {
    if (type === 'copyPaste') {
      if (this.props.activeWidgetId) {
        event.emit('copyPasteWidget', this.props.activeWidgetId, 'keyboard');
      }
    }

    if (type === 'delete') {
      if (this.props.activeWidgetId) {
        event.emit('destroyWidget');
      }
    }

    if (type === 'placeTop') {
      if (this.props.activeWidgetId) {
        event.emit('placeWidget', '', 'top');
      }
    }

    if (type === 'placeBottom') {
      if (this.props.activeWidgetId) {
        event.emit('placeWidget', '', 'bottom');
      }
    }
  }

  toggleSelectBtnStatus(type) {
    this.props.dispatch(toggleToolSelect(type));
  }

  render() {
    let toolbar = [];
    let toolSelectClass = this.props.tool.operate === 'select' ? 'tool-active' : '';
    let toolDragClass = this.props.tool.operate === 'drag' ? 'tool-active' : '';

    toolbar.push(
      <div className="tool-group" key="select">
        <li className={toolSelectClass}>
          <Popover content={intl.formatMessage({ id: 'selection mode', defaultMessage: '选中' })} placement="bottom">
            <a className="btn" title={intl.formatMessage({ id: 'selection mode', defaultMessage: '选中' })}
               onClick={this.toggleSelectBtnStatus.bind(this, 'select')}>
              <Icon type="tool-select"/>
            </a>
          </Popover>
        </li>

        <li className={toolDragClass}>
          <Popover content={intl.formatMessage({ id: 'drag', defaultMessage: '拖拽' })} placement="bottom">
            <a className="btn" title={intl.formatMessage({ id: 'drag', defaultMessage: '拖拽' })}
               onClick={this.toggleSelectBtnStatus.bind(this, 'drag')}>
              <Icon type="tool-drag"/>
            </a>
          </Popover>
        </li>

        <li className={this.props.tool.operate === 'straight' ? 'tool-active' : ''}>
          <Popover content={intl.formatMessage({ id: 'straight line', defaultMessage: '直线' })}
                   placement="bottom">
            <a className="btn" title={intl.formatMessage({ id: 'straight line', defaultMessage: '直线' })}
               onClick={this.toggleSelectBtnStatus.bind(this, 'straight')}>
              <Icon type="tool-connection-line"/>
            </a>
          </Popover>
        </li>

        <li className={this.props.tool.operate === 'broken' ? 'tool-active' : ''}>
          <Popover content={intl.formatMessage({ id: 'broken line', defaultMessage: '折线' })}
                   placement="bottom">
            <a className="btn" title={intl.formatMessage({ id: 'broken line', defaultMessage: '折线' })}
               onClick={this.toggleSelectBtnStatus.bind(this, 'broken')}>
              <Icon type="tool-broken-line"/>
            </a>
          </Popover>
        </li>
      </div>
    );

    toolbar.push(
      <div className="tool-group" key="connection line">
        <li>
          <Popover content={intl.formatMessage({ id: 'copy & paste', defaultMessage: '复制粘贴' })} placement="bottom">
            <a className="btn" title={intl.formatMessage({ id: 'copy & paste', defaultMessage: '复制粘贴' })}
               onClick={this.handleClick.bind(this, 'copyPaste')}>
              <Icon type="tool-copy"/>
            </a>
          </Popover>
        </li>

        <li>
          <Popover content={intl.formatMessage({ id: 'delete', defaultMessage: '删除' })} placement="bottom">
            <a className="btn" title={intl.formatMessage({ id: 'delete', defaultMessage: '删除' })}
               onClick={this.handleClick.bind(this, 'delete')}>
              <Icon type="tool-delete"/>
            </a>
          </Popover>
        </li>
      </div>
    );

    toolbar.push(
      <div className="tool-group" key="zindex">
        <li>
          <Popover content={intl.formatMessage({ id: 'placed on top', defaultMessage: '置顶' })}
                   placement="bottom">
            <a className="btn" title={intl.formatMessage({ id: 'placed on top', defaultMessage: '置顶' })}
               onClick={this.handleClick.bind(this, 'placeTop')}>
              <Icon type="tool-top"/>
            </a>
          </Popover>
        </li>

        <li>
          <Popover content={intl.formatMessage({ id: 'placed on bottom', defaultMessage: '置底' })}
                   placement="bottom">
            <a className="btn" title={intl.formatMessage({ id: 'placed on bottom', defaultMessage: '置底' })}
               onClick={this.handleClick.bind(this, 'placeBottom')}>
              <Icon type="tool-bottom"/>
            </a>
          </Popover>
        </li>
      </div>
    );

    /*toolbar.push(
        <div className="tool-group" key="position">
          <li>
            <Popover content={ intl.formatMessage({ id: 'align top', defaultMessage: '上对齐' }) }
                     placement="bottom">
              <a className="btn" title={ intl.formatMessage({ id: 'align top', defaultMessage: '上对齐' }) }
                 onClick={this.handleClick.bind(this)}>
                <Icon type="tool-align-top"/>
              </a>
            </Popover>
          </li>

          <li>
            <Popover content={ intl.formatMessage({ id: 'align bottom', defaultMessage: '下对齐' }) }
                     placement="bottom">
              <a className="btn" title={ intl.formatMessage({ id: 'align bottom', defaultMessage: '下对齐' }) }
                 onClick={this.handleClick.bind(this)}>
                <Icon type="tool-align-bottom"/>
              </a>
            </Popover>
          </li>

          <li>
            <Popover content={ intl.formatMessage({ id: 'align left', defaultMessage: '左对齐' }) }
                     placement="bottom">
              <a className="btn" title={ intl.formatMessage({ id: 'align left', defaultMessage: '左对齐' }) }
                 onClick={this.handleClick.bind(this)}>
                <Icon type="tool-align-left"/>
              </a>
            </Popover>
          </li>

          <li>
            <Popover content={ intl.formatMessage({ id: 'align right', defaultMessage: '右对齐' }) }
                     placement="bottom">
              <a className="btn" title={ intl.formatMessage({ id: 'align right', defaultMessage: '右对齐' }) }
                 onClick={this.handleClick.bind(this)}>
                <Icon type="tool-align-right"/>
              </a>
            </Popover>
          </li>

          <li>
            <Popover content={ intl.formatMessage({ id: 'align center', defaultMessage: '水平居中' }) }
                     placement="bottom">
              <a className="btn" title={ intl.formatMessage({ id: 'align center', defaultMessage: '水平居中' }) }
                 onClick={this.handleClick.bind(this)}>
                <Icon type="tool-align-horizontal-center"/>
              </a>
            </Popover>
          </li>

          <li>
            <Popover content={ intl.formatMessage({ id: 'align middle', defaultMessage: '垂直居中' }) }
                     placement="bottom">
              <a className="btn" title={ intl.formatMessage({ id: 'align middle', defaultMessage: '垂直居中' }) }
                 onClick={this.handleClick.bind(this)}>
                <Icon type="tool-align-vertical-center"/>
              </a>
            </Popover>
          </li>
        </div>
    )*/

    toolbar.push(
      <div className="tool-group" key="size">
        <li>
          <Popover content={intl.formatMessage({ id: 'fit size', defaultMessage: '合适的大小' })}
                   placement="bottom">
            <a className="btn" title={intl.formatMessage({ id: 'fit size', defaultMessage: '合适的大小' })}
               onClick={this.props.onZoom.bind(this, 1)}>
              <Icon type="tool-best-size"/>
            </a>
          </Popover>
        </li>

        <li>
          <Popover content={intl.formatMessage({ id: 'zoom in', defaultMessage: '放大' })} placement="bottom">
            <a className="btn" title={intl.formatMessage({ id: 'zoom in', defaultMessage: '放大' })}
               onClick={this.props.onZoom.bind(this, this.props.zoom + 1)}>
              <Icon type="tool-zoom-in"/>
            </a>
          </Popover>
        </li>

        <li>
          <Popover content={intl.formatMessage({ id: 'zoom out', defaultMessage: '缩小' })} placement="bottom">
            <a className="btn" title={intl.formatMessage({ id: 'zoom out', defaultMessage: '缩小' })}
               onClick={this.props.onZoom.bind(this, this.props.zoom - 1)}>
              <Icon type="tool-zoom-out"/>
            </a>
          </Popover>
        </li>
      </div>
    );

    return (
      <div className="tool-wrap">
        <nav className="tool-box">
          <ul>{toolbar}</ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { tool, activeWidgetId } = state.editor;

  return {
    tool,
    activeWidgetId
  };
};

export default connect(mapStateToProps)(Tool);
