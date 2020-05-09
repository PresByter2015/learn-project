import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import intl from 'src/intl'

class ContextMenu extends Component {
  static propTypes = {
    position: React.PropTypes.object,
    options: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    onCopy: React.PropTypes.func,
    onPaste: React.PropTypes.func,
    onCopyAndPaste: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    visible: React.PropTypes.bool,
    container: React.PropTypes.object
  }

  constructor() {
    super()
    this.state = {
      position: {
        left: 0,
        top: 0
      },
      style: {
        width: 110
      }
    }
  }

  // 调整层级
  handleClickItem(type, event) {
    event.preventDefault()
    event.stopPropagation()

    if (type === 'copy') {
      this.props.onCopy()
    } else if (type === 'paste') {
      this.props.onPaste('mouse')
    } else if (type === 'delete') {
      this.props.onDelete()
    } else if (type === 'copyAndPaste') {
      this.props.onCopyAndPaste(null, 'mouse')
    }
    this.props.onSelect(event, type)
  }

  height() {
    return 130
  }

  componentDidMount() {
    this.el = findDOMNode(this)
    // //console.log(this.el.getBoundingClientRect().height)
  }

  width() {
    return this.state.style.width
  }

  getPosition(position) {
    let offset = 2
    let top = 0
    let left = 0

    if (this.props.container) {
      let rect = this.props.container.getBoundingClientRect()

      top = position.top - rect.top + offset
      left = position.left - rect.left + offset

      if (this.width() + left > rect.width) {
        left = position.left - rect.left - this.width() - offset
      }

      if (this.height() + top > rect.height) {
        top = position.top - rect.top - this.height() - offset
      }
    }

    return { top, left }
  }

  render() {
    let display = this.props.visible ? 'block' : 'none'

    let { top, left } = this.getPosition(this.props.position)

    let menus = {
      /*      copy: {
       text: intl.formatMessage({ id: 'copy', defaultMessage: '复制' })
       },
       paste: {
       text: intl.formatMessage({ id: 'paste', defaultMessage: '粘贴' })
       },*/
      copyAndPaste: {
        text: intl.formatMessage({ id: 'copy & paste', defaultMessage: '复制并粘贴' })
      },
      delete: {
        text: intl.formatMessage({ id: 'delete', defaultMessage: '删除' })
      },
      top: {
        text: intl.formatMessage({ id: 'placed on top', defaultMessage: '置于顶层' })
      },
      bottom: {
        text: intl.formatMessage({ id: 'placed on bottom', defaultMessage: '置于底层' })
      }
    }
    let options = this.props.options || []
    let style = Object.assign({},
      this.state.style, { top, left, display }
    )

    return (
      <div className="context-menu" style={style}>
        <ol>
          {
            Object.keys(menus).filter(k => {
              return true || options.includes(k)
            }).map(key => {
              return (
                <li className="item" key={key} onClick={this.handleClickItem.bind(this, key)}>
                  {menus[key].text}
                </li>
              )
            })
          }
        </ol>
      </div>
    )
  }
}

export default ContextMenu
