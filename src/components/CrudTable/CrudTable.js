import React from 'react'
import { Table } from 'antd'
import { AdvancedSearchForm as adSearchFormConfig, DEFAULT_PAGING_SORT } from 'config'

export class CrudTable extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired,
    getDataSource: React.PropTypes.func.isRequired,
    advancedSearch: React.PropTypes.string,


    children: React.PropTypes.element,
    create: React.PropTypes.func,
    retrieve: React.PropTypes.func,
    update: React.PropTypes.func,
    delete: React.PropTypes.func,

  };

  static defaultProps = {};

  constructor(props) {
    console.log('constructor', props)
    super(props);
  };

  state = {
    dataSource: this.props.data.content,
    total: this.props.data.totalElements,

    current: this.props.data.number,
    pageSize: this.props.data.size,
    sort: this.props.data.sort,

    loading: false,
    visible: false,
  }

  componentDidMount = () => {
    console.debug('CrudTable.componentDidMount', this.props, this.state)

    this.loading(true)
  }

  componentWillReceiveProps = (nextProps) => {
    console.debug('CrudTable.componentWillReceiveProps', nextProps, this.props)
    this.refreshState(nextProps)
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.debug('CrudTable.componentWillUpdate', nextProps, nextState)
  }

  refreshState = (props) => {
    const { data, params } = props
    const loading = params.category === this.props.params.category ? false : true
    this.setState({
      dataSource: data.content,
      total: data.totalElements,
      current: data.number + 1,
      pageSize: data.size,
      sort: data.sort,
      loading: data.content ? loading : true
    })
  }

  loading = (loading = true) => {
    this.setState({
      loading
    })
  }

  handleSearch = (values) => {
    console.log('Table Received values of form: ', values);
    const name = values.name
    const status = values.status
    let code = 0
    if (status) {
      code = status === '未完成' ? 0 : 1
    }
    this.loading()
    this.props.getDataSource('byname', {name, status: code})
  }


  render() {

    const {
      dataSource,
      total,
      current,
      pageSize,
      sort,
      loading,
      visible
    } = this.state
    const { 
      advancedSearch,
      config,
      getDataSource,
      params
    } = this.props
    const config_ = config.CrudTable
    const {
      columns
    } = config_
    const pagination = {
      current,
      total,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        console.log('onShowSizeChange ', 'Current: ', current, '; PageSize: ', pageSize);
        this.setState({
          loading: true
        }, () => {
          getDataSource('test1', {}, {current, pageSize})
        })
        
      },
      onChange: (current) => {
        console.log('onChange', current)
        this.setState({
          loading: true
        }, () => {
          getDataSource('test2', {}, {current, pageSize})
        })
      },
      showQuickJumper: true,
      pageSize,
      showTotal: (total, range) => `共 ${total} 条 （${range[0]}-${range[1]}）`
    }
    const AdvancedSearchForm = advancedSearch ? require(`../${advancedSearch}/index`).default : null

    return (
      <div>
        {AdvancedSearchForm && params.category !== 'unfinished' ? 
          <AdvancedSearchForm
           config={adSearchFormConfig}
           handleSearch={this.handleSearch}
          />
         : null}
        <Table
            rowKey={record => record.id}
            dataSource={dataSource}
            columns={columns}
            pagination={pagination}
            loading={loading}
            expandedRowRender={record => {
                return(
                  <div>
                    <b>描述：</b><p>{record.scheme}</p>
                    <b>开发实施方案：</b><p>{record.description}</p>
                  </div>
                )
            }}
        />
      </div>
    )
  }
}

export default CrudTable