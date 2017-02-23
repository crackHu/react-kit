import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router'
import './AntdLayout.scss'

const { Header, Sider, Content, Footer } = Layout

export class AntdLayout extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired
  }
  state = {
    collapsed: false
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline'
    })
  }

  render () {
    return (
      <Layout id='components-layout-demo-custom-trigger'>
        <Sider
          trigger={'blink blink'}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >

          <div className='logo' />
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1'>
              <Link to='/question/company'>
                <Icon type='user' />
                <span className='nav-text'>公司问题列表</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='2'>
              <Link to='/question/employee'>
                <Icon type='video-camera' />
                <span className='nav-text'>员工问题列表</span>
              </Link>
            </Menu.Item>
            <Menu.Item key='3'>
              <Link to='/question/unfinished'>
                <Icon type='upload' />
                <span className='nav-text'>未完成的问题列表</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            DingMedic ©2017 rmMgr
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default AntdLayout
