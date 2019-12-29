import { combineReducers } from 'redux'
import certReducers from './certReducers'

export const rootReducer = combineReducers({
  cert: certReducers
})

export default rootReducer
