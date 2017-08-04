import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { Reducers } from '../features'
import rootReducer from '../containers/reducer'

export default combineReducers({
  router     : routerReducer,
  Root       : rootReducer,
  ...Reducers
})