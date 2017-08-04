import Home from './home'

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'default', name: 'Default page', component: Home, isIndex: true }
  ]
}