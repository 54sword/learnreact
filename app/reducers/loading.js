let initialState = {
  display: false
}

export default function loading(state = initialState, action) {

  switch (action.type) {

    case 'SET_LOADING_DISPLAY':
      const { display } = action
      return Object.assign({}, state, {
        display: display
      })
    default:
      return state
  }

}

export function getLoadingStatus(state) {
  return state.loading.display
}
