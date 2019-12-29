import { combineReducers } from 'redux'
import certsReducers from './certsReducers'
import keysReducers from './keysReducers'

export const rootReducer = combineReducers({
  certs: certsReducers,
  keys: keysReducers
})

export default rootReducer

export const getCerts = ({ state }) => state
