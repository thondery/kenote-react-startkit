import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Sider from '../sider'
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
export default class CoreLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node
  }

  static defaultProps = {
    children: null
  }

  componentDidMount () {
    const { initialPending, initialProgress } = this.props
  }

  componentWillReceiveProps (nextProps) {
    const { initialPending, initialProgress } = nextProps
    if (initialPending) {
      if (initialProgress >= 100) {
        this.props.actions.initialComplete()
      }
      else {
        this.props.actions.initialProgress(50)
      }
    }
  }
  
  render () {
    const { initialPending, initialProgress } = this.props
    let initialMaskStyle = initialProgress === 100 ? {
      animation: 'hideMask 1.8s'
    } : null
    return (
      <div className={'layout-warpper'}>
        <Sider location={this.props.location} />
        <div className={'layout-page-container'}>
          <div>{this.props.children}</div>
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