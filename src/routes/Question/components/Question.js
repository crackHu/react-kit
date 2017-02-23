import React from 'react'
import { Table, Icon } from 'antd';
import CrudTable from 'components/CrudTable'
import CrudTableConfig from '../CrudTableConfig'

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

	queryQuestion = (category = this.state.category) => {
    this.props.queryQuestion(category)
	}

	render() {
		let dataSource = this.props.question.content

		return (
			<div style={{ margin: '0 auto' }} >
				<CrudTable
					dataSource={dataSource}
					config={CrudTableConfig}
				/>
      </div>
		)
	}
}

export default Question
