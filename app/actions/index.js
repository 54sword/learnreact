import * as types from '../constants/ActionTypes'
/*
export function addTodo(text) {
  return { type: types.ADD_TODO, text }
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id }
}

export function editTodo(id, text) {
  return { type: types.EDIT_TODO, id, text }
}

export function completeTodo(id) {
  return { type: types.COMPLETE_TODO, id }
}

export function completeAll() {
  return { type: types.COMPLETE_ALL }
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED }
}
*/

/*
export const getThing = createAction('GET_THING', async token => {
  const result = await;
  return result;
});

$.ajax({
  url: 'http://localhost:3000/api/v1/user',
  type: 'post',
  data: {
    token: accessToken
  },
  error(err) {
    console.log(err)
  },
  success(result) {
    if (result.success) {
      actions.setToken(accessToken)
      actions.setUser(result.data.user)
      _self.setState()
    }
  }
});
*/



export function setUser(userinfo) {
  return { type: 'SET_USER', userinfo }
}

export function setToken(token) {
  return { type: 'SET_TOKEN', token }
}

export function removeToken() {
  return { type: 'REMOVE_COOKIE' }
}

export function showSigninBox(show) {
  return { type: 'SHOW_SIGNIN_BOX', show }
}

export function addQuestions(questions) {
  return { type: 'ADD_QUESTIONS', questions }
}

export function loadingQuestions(bl) {
  return { type: 'LOADING_QUESTIONS', bl }
}

export function nomoreQuestion(bl) {
  return { type: 'NOMORE_QUESTIONS', bl }
}
