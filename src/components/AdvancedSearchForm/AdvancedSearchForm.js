import React from 'react'
import { Form, Row, Col, Input, Button, Icon, Select, Radio, Cascader, DatePicker } from 'antd';
import './AdvancedSearchForm.scss'
import { AdvancedSearchForm as config } from 'routes/Question/CrudTableConfig'

const FormItem = Form.Item
const Option = Select.Option

export class AdvancedSearchForm extends React.Component {
  static propTypes = {
    config: React.PropTypes.object,
    handleSearch: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    config: require('routes/Question/CrudTableConfig').AdvancedSearchForm,
  };

  state = {
    expand: false,
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      this.props.handleSearch(values)
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  genSelectOptions = (data) => {
      return data.map((item, i) => {
          return <Option key={item.value}>{item.value}</Option>
      })
  }

  genForm = (formConfig = config) => {
    const { getFieldDecorator } = this.props.form;
    const { formItemLayout, item } = formConfig
    const children = []
    item.map((item, i) => {
      const {
          required,
          message,
          type,
          config,
          options,
          hidden
      } = item
      /*rules option*/
      let option
      if (required) {
          option = {
              rules: [{
                  required,
                  message
              }]
          }
      }
      let component
      switch (type) {
          case 'input':
              component = <Input {...config} />
              break
          case 'select':
              component = (
                  <Select {...config}>
                      {options ? this.genSelectOptions(options) : null}
                  </Select>
              )
              break
          case 'datepicker':
              let { format } = item
              component = <DatePicker {...config} format={format}/>
              break
          case 'cascader':
              component = <Cascader {...config} options={options}/>
              break
          default:
              component = <Input {...config} />
              break
      }
      if (hidden !== true) {
        children.push(
          <Col span={8} key={i}>
            <FormItem {...formItemLayout} key={i} label={item.label}>
              {getFieldDecorator(item.name, option)(
                component
              )}
            </FormItem>
          </Col>
        )
      }
    })
    return children
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    // To generate mock Form.Item
    // const children = [];
    // for (let i = 0; i < 10; i++) {
    //   children.push(
    //     <Col span={8} key={i}>
    //       <FormItem {...formItemLayout} label={`Field ${i}`}>
    //         {getFieldDecorator(`field-${i}`)(
    //           <Input placeholder="placeholder" />
    //         )}
    //       </FormItem>
    //     </Col>
    //   );
    // }
    const children = this.genForm()

    const expand = this.state.expand;
    const shownCount = expand ? children.length : 3;
    return children.length !== 0 ? (
      <div id="components-form-demo-advanced-search">
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={40}>
            {children.slice(0, shownCount)}
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                清空
              </Button>
              <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                Collapse <Icon type={expand ? 'up' : 'down'} />
              </a>
            </Col>
          </Row>
        </Form>
      </div>
    ) : null
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm