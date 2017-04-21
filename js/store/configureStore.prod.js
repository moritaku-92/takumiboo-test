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
    api
    )
  )
  return store
}
