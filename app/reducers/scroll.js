
let initialState = {}

export default function scroll(state = initialState, action) {

  switch (action.type) {

    case 'SAVE_SCROLL_POSITION':
      state[action.name] = $(document).scrollTop()
      return state

    case 'SET_SCROLL_POSITION':
      $(document).scrollTop(state[action.name] ? state[action.name] : 0)
      return state

    default:
      return state
  }

}
