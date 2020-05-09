import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'react-redux';
import { fetchDataSetKeysList } from 'store/data-set/actions';
import { delay } from 'utils';
import { FormattedMessage } from 'react-intl';
import intl from 'src/intl';

class ViewData extends Component {
  static propTypes = {
    id: React.PropTypes.string,
    dataType: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    keysList: React.PropTypes.object,
    detail: React.PropTypes.object,
    secPrev: React.PropTypes.func,
    visible: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loading: false,
      open: false,
      checkedList: null,
      keysList: props.keysList
    };
  }

  // 分页请求
  request(params = {}, id) {
    id = id || this.props.id;
    params.page = params.page || 1;

    this.props.dispatch(
      fetchDataSetKeysList(id, params)
    ).then(() => {
      delay(() => {
        this.setState({
          loading: false
        });
      }, 1000);
    });
  }

  // 刷新数据
  handleRefresh() {
    this.setState({
      loading: true
    });
    this.request({
      page: 1,
      kind: 'refresh'
    });
  }

  // 配置table
  parseColumns(columns) {
    if (columns) {
      return columns.map((col) => {
        return {
          key: col,
          title: col.length > 13 ? <span title={col}>{col.substring(0, 13) + '...'}</span> : col,
          dataIndex: col,
          width: columns.length < 7 ? 728 / columns.length : 112
        };
      });
    }

    return [];
  }

  componentDidMount() {
    // 查看数据时获取字段
    this.props.dispatch(fetchDataSetKeysList(this.props.id, {
      page: this.state.page
    }));
  }

  componentWillReceiveProps(nextProps) {
    let {
      id
    } = nextProps;

    // id 不等同的情况下请求数据
    if (id !== this.props.id) {
      this.request({
        page: 1
      }, id);
    }
    if (this.props.visible !== nextProps.visible) {
      this.getPagination(this.state.keysList, nextProps.visible);
    }
  }

  // 配置table表格
  parse(data) {
    let columns = [];
    let dataSource = [];

    // 刚开始数据有时会取不到，所以要判断data存不存在
    if (data && Object.keys(data).length) {

      // 判断每个字段数据条数并填充空数据
      let fillinEmptyValueFields = {
        ...data[0]
      };
      Object.keys(fillinEmptyValueFields).map((index) => {
        fillinEmptyValueFields[index] = '';
      });

      if (this.state.checkedList) {
        columns = this.parseColumns(this.state.checkedList);

        if (columns.length === 0) {
          let a = [];
          for (let len2 = 0; len2 < 10; len2++) {
            a.push(fillinEmptyValueFields);
          }

          dataSource = a;
        } else {
          for (let len1 = data.length % 10; len1 > 0 && len1 < 10; len1++) {
            data.push(fillinEmptyValueFields);
          }

          dataSource = data;
        }
        // for (let len1 = data.length % 10; len1 > 0 && len1 < 10; len1++) {
        //   data.push(fillinEmptyValueFields)
        // }
        // dataSource = data

      } else {
        columns = this.parseColumns(Object.keys(data[0]));

        for (let len1 = data.length % 10; len1 > 0 && len1 < 10; len1++) {
          data.push(fillinEmptyValueFields);
        }

        dataSource = data;
      }
    }

    return {
      columns,
      dataSource
    };
  }

  // 配置分页器
  getPagination(keysList, bool) {
    if (bool) {
      return {
        total: keysList.total,
        onChange: (current) => {
          this.setState({ page: current });
          this.request({
            page: current
          });
        }
      };
    } else {
      return {
        total: keysList.total,
        current: 1
      };
    }
  }

  render() {
    let {
      keysList
    } = this.props;
    let {
      dataSource,
      columns
    } = this.parse(keysList.collection);

    // 转换时间
    let time = new Date(keysList.lastTime);

    let monthTime = time.getMonth() + 1;
    let dateTime = time.getDate();
    let hourTime = time.getHours();
    let minTime = time.getMinutes();
    let secTime = time.getSeconds();
    if (monthTime < 10) {
      monthTime = '0' + monthTime;
    }
    if (dateTime < 10) {
      dateTime = '0' + dateTime;
    }
    if (hourTime < 10) {
      hourTime = '0' + hourTime;
    }
    if (minTime < 10) {
      minTime = '0' + minTime;
    }
    if (secTime < 10) {
      secTime = '0' + secTime;
    }
    let showTime = time.getFullYear() + '/' + monthTime + '/' + dateTime + ' ' +
      hourTime + ':' + minTime + ':' + secTime;

    let pagination = this.getPagination(keysList, this.props.visible);

    return (
      <div>
        {this.state.loading
          ?
          <div className="data-loading">
            <p className="title">
              {<FormattedMessage id="is going to get the data, please ..." defaultMessage="正在玩命获取数据，请稍后……"/>}
            </p>
            <div className="spinner ">
              <div className="spinner-blade"/>
              <div className="spinner-blade"/>
              <div className="spinner-blade"/>
            </div>
          </div>
          :
          <div className="detail">
            {dataSource.length && this.props.dataType !== 'OpenAPI' ?
              <header>
                <span className="title">{keysList.updateTime}</span>
                <p>
                  {intl.formatMessage({ id: 'last refresh time', defaultMessage: '上一次刷新数据时间' })}:{showTime}
                  <Button type="primary" style={{ left: '25px', top: '-2px' }}
                          onClick={this.handleRefresh.bind(this)}>
                    {<FormattedMessage id="refresh" defaultMessage="刷新"/>}
                  </Button>
                </p>
              </header>
              : null
            }

            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={pagination}
              locale={{ emptyText: intl.formatMessage({ id: 'no data', defaultMessage: '暂无数据' }) }}
              scroll={{ x: columns.length * 112 }}
            />

          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let {
    keysList
  } = state.dataSet;

  return {
    keysList
  };
};
export default connect(mapStateToProps)(ViewData);
