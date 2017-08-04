import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './action'
import { CoreLayout } from '../../layouts'
import './style.scss'

@connect(
  state => ({
    ...state.Home
  }),
  dispatch => ({
    actions: bindActionCreators({...actions}, dispatch)
  })
)
export default class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    const { location, counts } = this.props
    return (
      <CoreLayout location={this.props.location}>
        <h1>This is a React Application!</h1>
        <span>::pathname:: => '{location.pathname}'</span>
        <h2>Demos</h2>
        <p>To see how Redux works in the project, here is the demo of a simple counter:</p>
        <div>
          <button onClick={this.props.actions.counterMinusOne.bind(this)} disabled={counts === 0}>-</button>
          <label>{counts.toLocaleString('en-US')}</label>
          <button onClick={this.props.actions.counterPlusOne.bind(this)}>+</button>
          <button onClick={this.props.actions.counterReset.bind(this)} disabled={counts === 0}>Reset</button>
        </div>
        <h2>Usages:</h2>
        <ul>
          <li>React 15.6</li>
          <li>Rudex 3.7</li>
          <li>React-Router 4.1</li>
          <li>Webpack 3.3</li>
        </ul>
      </CoreLayout>
    )
  }
}