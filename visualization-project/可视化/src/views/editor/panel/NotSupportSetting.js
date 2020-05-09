import React, { Component } from 'react'
import { Icon } from 'antd'
import { FormattedMessage } from 'react-intl'

/**
 * 设置提示
 */
class NotSupportSetting extends Component {

  render() {
    return (
      <div className="widget-setting-null" key="widget-setting-null">
        <Icon type="exclamation-circle"/>
        <FormattedMessage id="not support data setting" defaultMessage="您选中的部件暂不支持数据配置" />
      </div>
    )
  }
}

export default NotSupportSetting
