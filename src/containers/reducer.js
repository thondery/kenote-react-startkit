// ------------------------------------
// Reducer
// ------------------------------------
import { statusToError, getStatusError, createReducer } from 'http-services'
import * as types from './constant'

const initialState = {
  initialPending: true,
  initialProgress: 15
}

const ACTION_HANDLERS = {
  [types.ROOT_INITIAL_COMPLETE]: (state, action) => {
    const { payload } = action
    return {
      ...state,
      initialPending: false
    }
  },
  [types.ROOT_INITIAL_PENDING]: (state, action) => {
    const { payload } = action
    return {
      ...state,
      initialProgress: state.initialProgress + payload
    }
  },
}

export default (state = initialState, action) => createReducer(state, action, ACTION_HANDLERS)