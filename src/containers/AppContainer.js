import React, { Component, PropTypes } from 'react'
import { useRouterHistory, browserHistory, Router } from 'react-router'
import createHashHistory from 'history/lib/createHashHistory'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Provider } from 'react-redux'

// Global css
// cdn import 'nprogress/nprogress.css'

const appHistory = __DEV__ ? useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
}) : useRouterHistory(createHashHistory)({
  queryKey: false
})

class AppContainer extends Component {
  static propTypes = {
    // routes : PropTypes.object.isRequired,
    routes : PropTypes.array.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={appHistory} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
