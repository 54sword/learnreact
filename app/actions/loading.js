

export function setLoadingDisplay(display, callback) {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_LOADING_DISPLAY', display })
  }
}
