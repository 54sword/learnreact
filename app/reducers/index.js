import { combineReducers } from 'redux'
import user from './user'
import questions from './questions'
import scroll from './scroll'
import sign from './sign'
import nodes from './nodes'
import peoples from './peoples'
import answers from './answers'
import loading from './loading'

const rootReducer = combineReducers({
  user, questions, scroll, sign,
  nodes, peoples, answers, loading
})

export default rootReducer
