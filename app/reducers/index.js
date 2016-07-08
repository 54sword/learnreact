import { combineReducers } from 'redux'
// import todos from './todos'
import user from './user'
import question from './question'

const rootReducer = combineReducers({
  user, question
})

export default rootReducer
