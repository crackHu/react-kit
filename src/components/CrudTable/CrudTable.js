import React from 'react'
import {Table} from 'antd'

export class CrudTable extends React.Component {

    static propTypes = {
        dataSource: React.PropTypes.array.isRequired,
        config: React.PropTypes.object.isRequired,
        children: React.PropTypes.element,

        create: React.PropTypes.func,
        retrieve: React.PropTypes.func,
        update: React.PropTypes.func,
        delete: React.PropTypes.func,

    }

    state = {}


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
        const {dataSource} = this.props
        const config = this.props.config.CrudTable
        const {columns} = config
        const pagination = {
            total: dataSource.length,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `共 ${total} 条 （${range[0]}-${range[1]}）`
        };

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