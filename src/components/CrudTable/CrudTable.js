import React from 'react'
import {Table} from 'antd'

export class CrudTable extends React.Component {

    static propTypes = {
        dataSource: React.PropTypes.array.isRequired,
        config: React.PropTypes.object.isRequired,
        searchOptions: React.PropTypes.node,
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
        
        return (
            <Table dataSource={dataSource} columns={columns} />
        )
    }
}

export default CrudTable