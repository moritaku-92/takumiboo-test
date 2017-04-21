import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import { hashHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import { apiMiddleware as api } from 'redux-api-middleware'

export default function configureStore(initialState, history) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(routerMiddleware(hashHistory), 
    api)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
