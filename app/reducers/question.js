let initialState = {
  loading: false,
  perPage: 5,
  date: new Date(),
  questions: [],
  nomore: false
}

export default function question(state = initialState, action) {

  switch (action.type) {

    case 'ADD_QUESTIONS':

      action.questions.forEach(function(v){
        state.questions.push(v)
      })

      state.date = state.questions[state.questions.length - 1].last_comment_at
      return state

    case 'LOADING_QUESTIONS':
      state.loading = action.bl;
      return state

    case 'NOMORE_QUESTIONS':
      state.nomore = action.bl;
      return state

    default:
      return state
  }

}
