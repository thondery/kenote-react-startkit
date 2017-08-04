import Home from './home'
import Admin from './admin'
import HomeReducer from './home/reducer'

export const Routes = [
  Home,
  Admin
]

export const Reducers = {
  Home : HomeReducer,
}