import App from '../containers/app'
import { PageNotFound } from '../layouts'
import { Routes } from '../features'

const routes = [{
  path: '/',
  component: App,
  childRoutes: [
    ...Routes,
    { path: '*', name: 'Page not found', component: PageNotFound },
  ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
}]

// Handle isIndex property of route config:
//  Dupicate it and put it as the first route rule.
function handleIndexRoute (route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return
  }

  const indexRoute = route.childRoutes.find(child => child.isIndex)
  if (indexRoute) {
    const first = { ...indexRoute }
    first.path = route.path
    first.exact = true
    first.autoIndexRoute = true // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first)
  }
  route.childRoutes.forEach(handleIndexRoute)
}

routes.forEach(handleIndexRoute)
export default routes