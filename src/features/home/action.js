// ------------------------------------
// Actions
// ------------------------------------
import { createAction } from 'http-services'
import * as types from './constant'

export function counterPlusOne () {
  return createAction(types.HOME_COUNTER_PLUS_ONE, 1)
}

export function counterMinusOne () {
  return createAction(types.HOME_COUNTER_MINUS_ONE, 1)
}

export function counterReset () {
  return createAction(types.HOME_RESET_COUNTER)
}