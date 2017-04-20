import React from 'react'
import { Table, Icon } from 'antd';
import CrudTable from 'components/CrudTable'
import CrudTableConfig from '../CrudTableConfig'
import AdvancedSearchForm from 'components/AdvancedSearchForm'
import { DEFAULT_PAGING_SORT } from 'config'
import { queryEmployee } from 'fetch'

export class Question extends React.Component {

  static propTypes = {
    queryQuestion: React.PropTypes.func.isRequired
  }

  state = {
  	category: this.props.params.category
  }

  componentDidMount = () => {
  	console.debug('Question.componentDidMount', this.props, this.state)

  	this.queryQuestion()
  	this.queryEmployee()
  }

  componentWillReceiveProps = (nextProps) => {
		console.debug('Question.componentWillReceiveProps', this.state.category, nextProps.params)

		let category_prev = this.state.category
		let category_after = nextProps.params.category
		if (category_prev && category_prev !== category_after) {
			this.setState({
				category: category_after
			})
  		this.queryQuestion(category_after)
		}
  }

	componentWillUpdate = (nextProps, nextState) => {
		console.debug('Question.componentWillUpdate', nextProps, nextState)
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.debug("Question.componentDidUpdate", this.props, prevProps, prevState)
	}

	queryQuestion = (category = this.state.category, param, paging_sort) => {
		console.debug('queryQuestion', category, paging_sort)
  		this.props.queryQuestion(category, param, paging_sort)
	}

	queryEmployee = () => {
		if (!('employee' in sessionStorage)) {
			queryEmployee().then(data => {
				const employees = []
				data.map(employee => {
					employees.push({ value: employee.incha })
				})
				sessionStorage.employee = JSON.stringify(employees)
			})
		}
	}

	render() {
		let question = this.props.question
		return (
			<div style={{ margin: '0 auto' }} >
				<CrudTable
					data={question}
					config={CrudTableConfig}
					getDataSource={this.queryQuestion}
					advancedSearch={'AdvancedSearchForm'}
					params={this.props.params}
				>
				</CrudTable>
      </div>
		)
	}
}

export default Question
