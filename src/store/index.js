import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers/index'

const initialState = {
  city: 'Buenos Aires,ar'
}

// para ver graficamente la app
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducers, initialState,
  composeEnhancers(applyMiddleware(thunk))
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
