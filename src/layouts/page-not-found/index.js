import React, { PureComponent } from 'react'
import './style.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../containers/action'
import ProgressBar from '../../components/progress-bar'

@connect(
  state => ({
    ...state.Root
  }),
  dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
  })
)
export default class PageNotFound extends PureComponent {

  componentDidMount () {
    const { initialPending, initialProgress } = this.props
    initialPending && this.props.actions.initialProgress(85)
  }

  componentWillReceiveProps (nextProps) {
    const { initialPending, initialProgress } = nextProps
    if (initialPending) {
      if (initialProgress >= 100) {
        this.props.actions.initialComplete()
      }
    }
  }

  render () {
    const { initialPending, initialProgress } = this.props
    let initialMaskStyle = initialProgress === 100 ? {
      animation: 'hideMask 1.8s'
    } : null
    return (
      <div className="layout-page-not-found">
        <div className="page-not-found">
          <h1>404</h1>
          <div>
            <h2>This page could not be found.</h2>
          </div>
        </div>
        {initialPending ? (
          <div className={'layout-initial-mask'} style={initialMaskStyle}>
            <i className={'fa fa-cog fa-spin fa-2x fa-fw'} style={{ color: '#999', marginBottom: 8 }}></i>
            <div className={'progress-span'}>Loading...{`${initialProgress}%`}</div>
            <ProgressBar pending={`${initialProgress}%`} />
          </div>
        ) : null}
      </div>
    )
  }
}