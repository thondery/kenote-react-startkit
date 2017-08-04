// ------------------------------------
// Actions
// ------------------------------------
import { createAction } from 'http-services'
import * as types from './constant'

export function initialComplete () {
  return dispatch => {
    setTimeout( () => {
      return dispatch(createAction(types.ROOT_INITIAL_COMPLETE))
    }, 1500)
  }
}

export function initialProgress (pending) {
  return dispatch => {
    setTimeout( () => {
      return dispatch(createAction(types.ROOT_INITIAL_PENDING, pending))
    }, 500)
  }
}