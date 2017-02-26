import HomeView from './components/HomeView'

// Sync route definition
export default {
  // component : HomeView
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      // const HomeView = require('./components/HomeView').default
      cb(null, HomeView)

    }, 'home')
    NProgress.done()
  }
}