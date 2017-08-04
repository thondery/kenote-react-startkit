// ------------------------------------
// Reducer
// ------------------------------------
import { statusToError, getStatusError, createReducer } from 'http-services'
import * as types from './constant'

const initialState = {
  counts: 0
}

const ACTION_HANDLERS = {
  [types.HOME_COUNTER_PLUS_ONE]: (state, action) => {
    const { payload } = action
    return {
      ...state,
      counts: state.counts + payload
    }
  },
  [types.HOME_COUNTER_MINUS_ONE]: (state, action) => {
    const { payload } = action
    return {
      ...state,
      counts: state.counts - payload
    }
  },
  [types.HOME_RESET_COUNTER]: (state, action) => {
    return {
      ...state,
      counts: initialState.counts
    }
  },
}

export default (state = initialState, action) => createReducer(state, action, ACTION_HANDLERS)