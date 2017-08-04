import Admin from './admin'
import Group from './group'
import User from './user'

export default {
  path: '/admin',
  name: 'Admin',
  childRoutes: [
    { path: 'default', name: 'Default page', component: Admin, isIndex: true },
    { path: 'group', name: 'Group', component: Group },
    { path: 'user', name: 'User', component: User }
  ]
}