// import _ from 'lodash'
import React, { Component } from 'react';
import { Table, Modal, Button, Icon, Popover } from 'antd';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { dataSetGet, dataSetGetFieldEdit, deleteDataSet, fetchDataSetKeysList } from 'store/data-set/actions';
import { checkConnect, getDataSources, deleteDataSource } from 'store/data-source/actions';
import AddandEditSourceModal from './add-and-editSourceModal/sourceModal';
import AddandEditSetModal from './add-and-editSetModal/setModal';
import EditOpenApiModal from './add-and-editSetModal/editOpenApi';
import ViewDataModal from './viewDataModal/index';
import intl from 'src/intl';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';

/**
 *  数据集组件，封装了增、删、改、查窗口
 */
class DataSet extends Component {
  static className = 'data-set-page';

  static propTypes = {
    dispatch: React.PropTypes.func,
    location: React.PropTypes.object,
    dataSource: React.PropTypes.array
  };

  constructor() {
    super();

    this.state = {
      dataSet: {},
      active: null,
      // Modal状态
      id: null,
      sourceId: null,
      itemDataSet: {},
      addDataSetModalVisible: false,
      editOpenApiModalVisible: false,
      viewDataModalVisible: false,
      deleteSourceModalVisible: false,
      deleteSetModalVisible: false,
      isEdit: false,
      // 数据源状态
      itemDataSource: {},
      addSourceModalVisible: false,
      currentSourceId: null
    };

    this.columns = [{
      title: '',
      dataIndex: 'openChild',
      width: '4%'
    }, {
      title: intl.formatMessage({ id: 'data source name', defaultMessage: '数据源名称' }),
      dataIndex: 'sourceName',
      width: '22%',
      render: (value, row) => {
        if (value === 'ADD' && !row.address) {
          return {
            children: (
              <Button type="primary" size="large"
                      onClick={this.handleShowModal.bind(this, 'addDataSet', row)}>
                <Icon type="plus"/>{intl.formatMessage({ id: 'add a data set', defaultMessage: '新增数据集' })}
              </Button>
            )
          };
        } else {
          return value;
        }
      }
    }, {
      title: intl.formatMessage({ id: 'data set name', defaultMessage: '数据集名称' }),
      dataIndex: 'setName',
      width: '22%'
    }, {
      title: intl.formatMessage({ id: 'data type', defaultMessage: '数据类型' }),
      width: '10%',
      render: (data) => {
        if (data.sourceName === 'ADD' && data.type !== '') {
          return null;
        }

        return data.type;
      }
    }, {
      title: intl.formatMessage({ id: 'connection status', defaultMessage: '连接状态' }),
      dataIndex: 'stat',
      key: 'stat',
      width: '10%',
      render: (value, row) => {
        let className = 'status-label';
        let text = intl.formatMessage({ id: 'connection', defaultMessage: '连接' });
        if (value && row.sourceName !== 'ADD' && row.type !== 'OpenAPI') {
          className += ' success';
          text = intl.formatMessage({ id: 'connection', defaultMessage: '连接' });
        } else if (row.sourceName === 'ADD' || row.type === 'OpenAPI') {
          text = null;
        } else {
          className += ' error';
          text = intl.formatMessage({ id: 'disconnect', defaultMessage: '断开' });
        }

        return <span className={className}>{text}</span>;
      }
    }, {
      title: intl.formatMessage({ id: 'operation', defaultMessage: '操作' }),
      width: '30%',
      render: (data) => {
        let sourceData = null;
        let setData = null;
        if (data.id) {
          sourceData = data;
        }
        if (data.id && data.sourceId) {
          setData = data;
        }
        return (
          <div className="btn-group-vertical">
            {(data.sourceName === 'ADD' || data.sourceName === 'OpenAPI') ? null :
              <div>
                {(() => {
                  // 数据集操作
                  if (!data.children && data.sourceId !== '9129f99351e64517a4e11562fa86cea3') {
                    return (
                      <div>
                        <Button type="primary" size="large"
                                onClick={this.handleShowModal.bind(this, 'viewData', setData)}>
                          {intl.formatMessage({ id: 'view', defaultMessage: '查看数据' })}
                        </Button>
                        {
                          data.type === 'OpenAPI' ?
                            <Button type="success" size="large"
                                    onClick={this.handleShowModal.bind(this, 'editOpenApi', setData)}>
                              {intl.formatMessage({ id: 'edit', defaultMessage: '编辑' })}
                            </Button> :
                            <Button type="success" size="large"
                                    onClick={this.handleShowModal.bind(this, 'addDataSet', setData)}>
                              {intl.formatMessage({ id: 'edit', defaultMessage: '编辑' })}
                            </Button>
                        }
                        {data.type === 'OpenAPI' ? null :
                          <Button type="danger" size="large"
                                  onClick={this.handleShowModal.bind(this, 'deleteSet', setData)}>
                            {intl.formatMessage({ id: 'delete', defaultMessage: '删除' })}
                          </Button>
                        }
                      </div>
                    );
                  }

                  // 静态数据源
                  if (!data.children && data.sourceId === '9129f99351e64517a4e11562fa86cea3') {
                    return (
                      <Button type="primary" size="large"
                              onClick={this.handleShowModal.bind(this, 'viewData', setData)}>
                        {intl.formatMessage({ id: 'view', defaultMessage: '查看数据' })}
                      </Button>
                    );
                  }

                  // 数据源操作
                  if (data.children && data.id !== '9129f99351e64517a4e11562fa86cea3') {
                    return (
                      <div>
                        <Button type="success" size="large"
                                onClick={this.handleShowModal.bind(this, 'addSource', sourceData)}>
                          {intl.formatMessage({ id: 'edit', defaultMessage: '编辑' })}
                        </Button>
                        <Button type="danger" size="large"
                                onClick={this.handleShowModal.bind(this, 'deleteSource', sourceData)}>
                          {intl.formatMessage({ id: 'delete', defaultMessage: '删除' })}
                        </Button>
                      </div>
                    );
                  }
                })()}
              </div>
            }
          </div>
        );
      }
    }];
  }

  handleShowModal(name, data) {
    let state = {
      [`${name}ModalVisible`]: true
    };

    // 新建数据集
    if (name === 'addDataSet' && !data.url) {
      this.setState({
        isEdit: false,
        dataType: data.type,
        // 数据源id
        sourceId: data.id
      });
    }

    // 编辑数据集
    if (name === 'addDataSet' && data.url) {
      this.props.dispatch(dataSetGet(data.id));
      this.setState({
        isEdit: true,
        dataType: data.type,
        //数据集id
        id: data.id
      });
    }

    if (name === 'editOpenApi' && data) {
      this.props.dispatch(dataSetGetFieldEdit({}, data.id));
      this.setState({
        //openApiId
        id: data.id,
        dataType: data.type
      });
    }

    // 数据集查看数据
    if (name === 'viewData' && data) {
      this.props.dispatch(fetchDataSetKeysList(data.id, {
        page: 1
      }));
      this.setState({
        id: data.id,
        active: data.type
      });
    }

    // 设置状态判断点击新建数据源还是编辑数据源
    if (name === 'addSource' && data.children) {
      this.setState({
        isEdit: true,
        currentSourceId: data.id
      });
    }

    if (name === 'addSource' && !data.children) {
      this.setState({
        isEdit: false
      });
    }

    // 删除数据源
    if (name === 'deleteSource') {
      this.setState({
        itemDataSource: data
      });
    }

    // 删除数据集
    if (name === 'deleteSet') {
      this.setState({
        itemDataSet: data
      });
    }

    this.setState(state);
  }

  handleHideModal(name) {
    this.setState({
      [`${name}ModalVisible`]: false
    });

    this.props.dispatch(push('/data-set'));
  }

  componentWillMount() {
    // 获取数据源+数据集
    this.props.dispatch(getDataSources());

    // 获取连接状态
    this.props.dispatch(checkConnect());

    document.body.setAttribute('data-page', 'data-set');
  }

  // 设置一个定时器，检查数据集连接状态
  componentDidMount() {
    this.timer = setInterval(() => {
      this.props.dispatch(checkConnect()).then(
      );
    }, 30000);

  }

  componentWillUnmount() {
    clearInterval(this.timer);

    document.body.removeAttribute('data-page');
  }

  // 删除数据源
  deleteSource(sourceId) {
    this.props.dispatch(
      deleteDataSource(sourceId)
    ).then(() => {
      this.props.dispatch(getDataSources());
      this.handleHideModal('deleteSource');
    });
  }

  // 删除数据集
  deleteSet(setId) {
    this.props.dispatch(
      deleteDataSet(setId)
    ).then(() => {
      this.props.dispatch(getDataSources());
      this.handleHideModal('deleteSet');
    });
  }

  rowClassName(row) {
    if (row.sourceName === 'ADD') {
      return 'addButton' + ' sourceChild';
    } else if (row.children) {
      return 'source';
    } else {
      return 'sourceChild';
    }
  }

  render() {
    let dataSource = this.props.dataSource;

    return (
      <div>
        <header className="app-header">
          <h1 className="title">
            {intl.formatMessage({ id: 'data management', defaultMessage: '数据管理' })}
          </h1>
          <div className="toolbar">
            <Popover placement="bottom" content={<FormattedMessage id="back" defaultMessage="返回"/>}>
              <div className="ant-btn-block">
                <Link to="/" className="ant-btn ant-btn-primary ant-back">
                  <Icon type="back"/>
                </Link>
              </div>
            </Popover>
            <Button type="primary" size="large" className="ant-link ant-link-primary"
                    onClick={this.handleShowModal.bind(this, 'addSource')}>
              <Icon type="plus"/>{intl.formatMessage({ id: 'create data source', defaultMessage: '新建数据源' })}
            </Button>
          </div>
        </header>

        <section ref="container">
          <Table
            columns={this.columns}
            dataSource={dataSource}
            pagination={false}
            locale={{ emptyText: intl.formatMessage({ id: 'no data', defaultMeseeage: '暂无数据' }) }}
            rowClassName={this.rowClassName.bind(this)}
            className="main"
          />
        </section>

        <AddandEditSourceModal
          isEdit={this.state.isEdit}
          id={'' + this.state.currentSourceId}
          visible={this.state.addSourceModalVisible}
          handleHide={this.handleHideModal.bind(this, 'addSource')}
        />

        <AddandEditSetModal
          isEdit={this.state.isEdit}
          sourceId={this.state.sourceId}
          id={this.state.id}
          dataType={this.state.dataType}
          visible={this.state.addDataSetModalVisible}
          handleHide={this.handleHideModal.bind(this, 'addDataSet')}
        />

        <EditOpenApiModal
          isDataSetPage
          id={this.state.id}
          type={this.state.dataType}
          visible={this.state.editOpenApiModalVisible}
          handleHide={this.handleHideModal.bind(this, 'editOpenApi')}
        />

        <ViewDataModal
          id={this.state.id}
          dataType={this.state.active}
          visible={this.state.viewDataModalVisible}
          handleHide={this.handleHideModal.bind(this, 'viewData')}
        />

        <Modal wrapClassName="modal-s" className="delete"
               visible={this.state.deleteSourceModalVisible}
               onCancel={this.handleHideModal.bind(this, 'deleteSource')}
               footer={this.deleteSourceModalFooter('deleteSource')}
        >
          <p>
            <FormattedHTMLMessage
              id="abbr.msg.delete data source"
              defaultMessage="您确认删除数据源? <br>删除数据源后，关联该数据源的数据集将消失"
              values={{
                name: this.state.itemDataSource.sourceName
              }}/>
          </p>
        </Modal>
        <Modal wrapClassName="modal-s" className="delete"
               visible={this.state.deleteSetModalVisible}
               onCancel={this.handleHideModal.bind(this, 'deleteSet')}
               footer={this.deleteSetModalFooter('deleteSet')}
        >
          <p>
            <FormattedHTMLMessage
              id='abbr.msg.delete data set'
              defaultMessage='您确认删除数据集'
              values={{
                name: this.state.itemDataSet.setName
              }}
            />
          </p>
        </Modal>
      </div>
    );
  }

  deleteSourceModalFooter(name) {
    return [
      <Button key={'submit'} onClick={this.deleteSource.bind(this, this.state.itemDataSource.id)}>
        {intl.formatMessage({ id: 'delete', defaultMessage: '确定' })}
      </Button>,
      <Button key={'cancel'} onClick={this.handleHideModal.bind(this, name)}>
        {intl.formatMessage({ id: 'cancel', defaultMessage: '取消' })}
      </Button>
    ];
  }

  deleteSetModalFooter(name) {
    return [
      <Button key={'submit'} onClick={this.deleteSet.bind(this, this.state.itemDataSet.id)}>
        {intl.formatMessage({ id: 'delete', defaultMessage: '确定' })}
      </Button>,
      <Button key={'cancel'} onClick={this.handleHideModal.bind(this, name)}>
        {intl.formatMessage({ id: 'cancel', defaultMessage: '取消' })}
      </Button>
    ];
  }
}

const mapStateToProps = (state) => {
  let { dataSource } = state.dataSource;
  return {
    dataSource
  };
};

export default connect(mapStateToProps)(DataSet);
