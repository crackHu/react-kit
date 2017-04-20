import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './Login.scss'
import { login } from 'fetch'
import { setCookie } from 'utils'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	state = { loading: false }

  handleSubmit = (e) => {
  	this.loading()
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.login(values)
      }
      this.loading(false)
    });
  }

  loading = (loading = true) => {
    this.setState({
      loading
    }, () => console.log('asdfasd', loading, this.state))
    debugger
  }

  login = (params) => {
  	Object.assign(params, {userType: 'UN', loginType: 'name'})
  	login(params)
  	.then(ret => {
  		this.loading(false)
  		// setCookie('token', ret.token)
  		sessionStorage.token = ret.token
  		this.context.router.push('/')
  	})
  	.catch(e => {
  		this.loading(false)
  		console.error('login error', e)
  	})
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log('route', this.context.router)
    return (
    	<div id="components-form-demo-normal-login">
	      <Form onSubmit={this.handleSubmit} className="login-form">
	        <FormItem>
	          {getFieldDecorator('loginName', {
	            rules: [{ required: true, message: 'Please input your username!' }],
	          })(
	            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('password', {
	            rules: [{ required: true, message: 'Please input your Password!' }],
	          })(
	            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
	          )}
	        </FormItem>
	        <FormItem>
	          <Button loading={this.state.loading} type="primary" htmlType="submit" className="login-form-button">
	            Log in
	          </Button>
	        </FormItem>
	      </Form>
    	</div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm