import { combineReducers } from 'redux'
import user from './user'
import question from './question'
import scroll from './scroll'

const rootReducer = combineReducers({
  user, question, scroll
})

export default rootReducer


export function getQuestions(state) {
  return state.question
}
