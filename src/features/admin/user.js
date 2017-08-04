import React, { Component } from 'react'
import { CoreLayout } from '../../layouts'

export default ({ location }) => (
  <CoreLayout location={location}>
    <h1>AdminUser</h1>
    <span>::pathname:: => '{location.pathname}'</span>
  </CoreLayout>
)