// We only need to import the modules necessary for initial render
import AntdLayout from '../layouts/AntdLayout'
import Home from './Home'
// generate dynamic routes
import { MENU_ROUTE as routeConfig } from 'config'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : AntdLayout,
  indexRoute  : Home,
  getChildRoutes: (location, cb) => {
    require.ensure([], (require) => {
      cb(null, genRoutes(store))
    })
  },
  onEnter,
  onChange,
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

const onEnter = (nextState, replace, callback) => {
  NProgress.start()
  callback()
}

const onChange = (prevState, nextState, replace, callback) => {
  NProgress.start()
  callback()
}

const genRoutes = (store, { config } = routeConfig) => {
  return config.map(route => {
    return require(`./${route.path}/index`).default(store)
  })
}

export default createRoutes
