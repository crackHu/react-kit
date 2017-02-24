import React from 'react'
import { Table } from 'antd'
import { DEFAULT_PAGING_SORT } from 'config'

export class CrudTable extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    config: React.PropTypes.object.isRequired,
    children: React.PropTypes.element,

    create: React.PropTypes.func,
    retrieve: React.PropTypes.func,
    update: React.PropTypes.func,
    delete: React.PropTypes.func,

  };

  static defaultProps = {
    data: {},
    sort: 'id,asc',
  };

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
    console.log('CrudTable.componentDidMount', this.props, this.state)
  }

  componentWillReceiveProps = (nextProps) => {
    console.log('CrudTable.componentWillReceiveProps', nextProps)
  }

  componentWillUpdate = (nextProps, nextState) => {
    console.log('Question.componentWillUpdate', nextProps, nextState)
  }

  render() {
    const {
      dataSource
    } = this.props
    const config = this.props.config.CrudTable
    const {
      columns
    } = config
    const pagination = null
    // {
    //   current: this.state.pageNo,
    //   total: this.state.total,
    //   showSizeChanger: true,
    //   onShowSizeChange: (pageNo, pageSize) => {
    //     this.setState({
    //       pageNo,
    //       pageSize
    //     }, () => {
    //       this.getDataSource(pageNo, pageSize)
    //     })
    //     console.log('PageNo: ', pageNo, '; PageSize: ', pageSize);
    //     this.genSerialNumber(true, pageNo, pageSize)
    //   },
    //   onChange: (pageNo) => {
    //     console.log('onChange', this.state)
    //     const pageSize = this.state.pageSize
    //     this.setState({
    //       pageNo,
    //     }, () => {
    //       this.getDataSource(pageNo, pageSize)
    //       console.log('PageNo: ', pageNo, this.state);
    //     })
    //     this.genSerialNumber(true, pageNo, pageSize)
    //   },
    //   showQuickJumper: true,
    //   pageSize: this.state.pageSize,
    //   showTotal: (total, range) => `共 ${total} 条 （${range[0]}-${range[1]}）`
    // }

    return (
      <div>
            {this.props.children}
            <Table
                rowKey={record => record.id}
                dataSource={dataSource}
                columns={columns}
                pagination={pagination}
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