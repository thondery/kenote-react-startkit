import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Routes } from '../../features'
import './style.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../containers/action'

@connect(
  state => ({
    ...state.Root
  }),
  dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
  })
)
export default class Sider extends PureComponent {
  static propTypes = {
    location: PropTypes.object
  }

  static defaultProps = {
    location: null
  }

  componentDidMount () {
    const { initialPending, initialProgress } = this.props
    initialPending && this.props.actions.initialProgress(35)
  }
  
  render () {
    return (
      <div className={'layout-sider'}>
        {renderRouteConfig(Routes, this.props.location)}
      </div>
    )
  }
}

function renderRouteConfig (routes, location, contextPath = '') {
  return (
    <ul>
    {routes.map( (item, i) => {
      let newContextPath
      if (/^\//.test(item.path)) {
        newContextPath = item.path
      } else {
        newContextPath = `${contextPath}/${item.path}`
      }
      newContextPath = newContextPath.replace(/\/+/g, '/')
      if (!item.isIndex) {
        return (
          <li key={i}>
            {item.path ? (
              <Link to={newContextPath} className={location.pathname === newContextPath ? 'sider-nav-active' : ''}>{item.name}</Link>
            ) : (
              <span>{item.name}</span>
            )}
            {item.childRoutes && item.childRoutes.length > 0 && renderRouteConfig(item.childRoutes, location, item.path)}
          </li>
        )
      }
      
    })}
    </ul>
  )
}