import React from 'react'
import { Table, Icon } from 'antd';
import CrudTable from 'components/CrudTable'
import CrudTableConfig from '../CrudTableConfig'
import AdvancedSearchForm from 'components/AdvancedSearchForm'
import { DEFAULT_PAGING_SORT } from 'config'

export class Question extends React.Component {

  static propTypes = {
    queryQuestion: React.PropTypes.func.isRequired
  }

  state = {
  	category: this.props.params.category
  }

  componentDidMount = () => {
  	console.log('Question.componentDidMount', this.props, this.state)

  	this.queryQuestion()
  }

  componentWillReceiveProps = (nextProps) => {
		console.log('Question.componentWillReceiveProps', this.state.category, nextProps.params)

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
		console.log('Question.componentWillUpdate', nextProps, nextState)
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log("Question.componentDidUpdate", this.props, prevProps, prevState)
	}

	queryQuestion = (category = this.state.category, paging_sort = DEFAULT_PAGING_SORT) => {
    	this.props.queryQuestion(category, paging_sort)
	}

	render() {
		let data = this.props.question
		return (
			<div style={{ margin: '0 auto' }} >
				<CrudTable
					data={data}
					config={CrudTableConfig}
				>
					<AdvancedSearchForm />
				</CrudTable>
      </div>
		)
	}
}

export default Question
