import { combineReducers } from 'redux'
import { syncHistoryWithStore,routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form/immutable'
import { waitTime } from './waitTime'

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  waitTime
})

export default rootReducer
