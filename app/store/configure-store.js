import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from '../reducers'

export default function configureStore(preloadedState) {

  const middleware = process.env.NODE_ENV === 'production' ?
    [ thunk ] :
    // [ thunk ]
    [ thunk, logger() ]

  const store = createStore(
    reducer,
    applyMiddleware(...middleware)
    // applyMiddleware(thunk)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
