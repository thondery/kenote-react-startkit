import React, { Component } from 'react'
import './style.scss'

export default ({ pending }) => (
  <div className={'layout-progress-bar'}>
    <div className={'progress-bar-container'}>
      <div className={'progress-bar-pending'} style={{ width: pending }} />
    </div>
  </div>
)