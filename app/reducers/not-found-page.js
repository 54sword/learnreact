
let initialState = false

export default function notFoundPage(state = initialState, action) {

  switch (action.type) {
    case 'DISPLAY_NOT_FOUND_PAGE':
      return true

    default:
      return state
  }

}

export function getNotFoundPageStatus(state) {
  return state.notFoundPage
}
