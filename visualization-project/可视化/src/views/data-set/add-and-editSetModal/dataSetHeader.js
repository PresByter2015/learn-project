import intl from 'src/intl'
import React, {
  Component
} from 'react'
import {
  Progress
} from 'antd'


class DataSetHeader extends Component {
  static propTypes = {
    headerState: React.PropTypes.object,
    isEdit: React.PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state =  {
      // isEdit: false
    }

  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  //   this.setState({
  //     isEdit: nextProps.isEdit
  //   })
  // }


  render() {
    return (
      <div className="clearfix">
        <header>
          <Progress percent={this.props.headerState.firPercent} showInfo={false} />
          <div className={'circle1 ' + this.props.headerState.circle1}>1</div>
          <Progress percent={this.props.headerState.secPercent} showInfo={false}/>
          <div className={'circle2 ' + this.props.headerState.circle2}>2</div>
          <Progress percent={this.props.headerState.thiPercent} showInfo={false}/>
          <div className={'circle3 ' + this.props.headerState.circle3}>3</div>
          <Progress percent={0} showInfo={false}/>
        </header>
        <ul className="tip">
          <li style={{ color: this.props.headerState.color1 }}>
            {this.props.isEdit === true ?
              intl.formatMessage({ id: 'edit data set', defaultMessage: '编辑数据集' })
              : 
              intl.formatMessage({ id: 'create data set', defaultMessage: '新建数据集' })
            }
          </li>
          <li style={{ color: this.props.headerState.color2 }}>
            { intl.formatMessage({ id: 'setting', defaultMessage: '设置' }) }
          </li>
          <li style={{ color: this.props.headerState.color3 }}>
            {this.props.isEdit === true ?
              intl.formatMessage({ id: 'view', defaultMessage: '查看数据' })
              : 
              intl.formatMessage({ id: 'retrieve data', defaultMessage: '获取数据' })
            }
          </li>
        </ul>
      </div>
    )
  }

}

export default DataSetHeader
