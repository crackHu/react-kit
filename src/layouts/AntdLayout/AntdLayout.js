import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router'
import { MENU_ROUTE as menuConfig } from 'config'
import './AntdLayout.scss'

const SubMenu = Menu.SubMenu;
const { Header, Sider, Content, Footer } = Layout

export class AntdLayout extends React.Component {

  static propTypes = {
    children: React.PropTypes.element.isRequired
  }
  state = {
    menu: undefined,
    menuKeys: undefined,
    openKey: undefined,
    selectedKey: undefined,
    collapsed: false,
    mode: 'inline'
  }

  componentDidMount = () => {
    this.setState({
      menu: this.genMenu()
    })
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

  handleClick = (e) => {
    let selectedKey = e.key, openKey
    const { menuKeys } = this.state
    Object.keys(menuKeys).forEach(key => {
      if (menuKeys[key].indexOf(selectedKey) > -1) {
        openKey = key
      }
    })
    this.setState({
      openKey: openKey ? openKey : null,
      selectedKey
    })
  }

  handleTitleClick = (e) => {
    const openKey = e.key
    this.setState({
      openKey: openKey === this.state.openKey ? null : openKey,
    })
  }

  genMenu = (menu_config = menuConfig) => {
    const {
      defaultOpenKey,
      defaultSelectedKey,
      config
    } = menu_config
    const {pathname} = this.props.location
    let menuKeys = {}, openKey, selectedKey = undefined
    const menu = config.map((menu, index) => {
      menuKeys[menu.key] = []
      if (menu.hasOwnProperty('children')) {
        return (
          <SubMenu
            key={menu.key}
            onTitleClick={this.handleTitleClick}
            title={
              <span>
                <Icon type={menu.iconType} />
                <span className={menu.className}>{menu.content}</span>
              </span>
            }
          >
            {
              menu.children.map((child, index) => {
                menuKeys[menu.key].push(child.key)
                selectedKey = selectedKey ? selectedKey : child.link === pathname ? child.key : null
                openKey = openKey ? openKey : selectedKey ? menu.key : null
                return this.genChildMenu(child)
              })
            }
          </SubMenu>
        )
      } else {
        menuKeys[menu.key].push(menu.key)
        selectedKey = selectedKey ? selectedKey : menu.link === pathname ? menu.key : null
        openKey = openKey ? openKey : selectedKey ? menu.key : null
        return this.genChildMenu(menu)
      }
    })

    this.setState({
      menuKeys,
      openKey : openKey ? openKey : defaultOpenKey,
      selectedKey
    })
    return menu
  }

  genChildMenu = (menu) => {
    return (
      <Menu.Item key={menu.key}>
        <Link to={menu.link}>
          <Icon type={menu.iconType} />
          <span className={menu.className}>{menu.content}</span>
        </Link>
      </Menu.Item>
    )
  }

  render () {
    return (
      <Layout id='components-layout-demo-custom-trigger'>
        <Sider
          collapsible
          trigger={'blink blink'}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >

          <div className='logo' />
          {/*<Menu theme='dark' mode={this.state.mode} defaultOpenKeys={['sub1']} defaultSelectedKeys={['1']}>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span className="nav-text">User</span></span>}
            >
              <Menu.Item key="1">Tom</Menu.Item>
              <Menu.Item key="2">Bill</Menu.Item>
              <Menu.Item key="3">Alex</Menu.Item>
            </SubMenu>
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
          </Menu>*/}
          <Menu theme='dark'
           onClick={this.handleClick}
           mode={this.state.mode}
           openKeys={[this.state.openKey]}
           selectedKeys={[this.state.selectedKey]}
           // defaultOpenKeys={defaultOpenKeys}
           // defaultSelectedKeys={defaultSelectedKeys}
          >
            {this.state.menu}
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
            DingMedic ©2017 redmine
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default AntdLayout
