import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from '../reducers'
import config from '../../config/config'

export default function configureStore(preloadedState) {

  const middleware = config.debug ? [ thunk, logger() ] : [ thunk ]

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
