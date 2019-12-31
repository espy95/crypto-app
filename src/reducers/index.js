import { combineReducers } from 'redux'
import certReducers from './reducers'

export const rootReducer = combineReducers({
  caStore: certReducers
})

export default rootReducer
