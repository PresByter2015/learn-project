import React, { Component } from 'react'
import { Icon } from 'antd'
import { FormattedMessage } from 'react-intl'

/**
 * 设置提示
 */
class NoopSetting extends Component {

  render() {
    return (
      <div className="widget-setting-null" key="widget-setting-null">
        <Icon type="exclamation-circle"/>
        <FormattedMessage id="please add or select widget first" defaultMessage="请先添加或选中部件" />
      </div>
    )
  }
}

export default NoopSetting
