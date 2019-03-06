import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import { all } from "redux-saga/effects"

import { routerReducer } from "react-router-redux"
import modules from "./modules"
import middlewares, { sagaMiddleware } from "./middlewares"
import { getReducersAndSagas } from "./utils"

const { reducers, sagas } = getReducersAndSagas(modules)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  combineReducers({ routerReducer, ...reducers }),
  composeEnhancers(applyMiddleware(...middlewares))
)

sagaMiddleware.run(function*() {
  yield all(sagas)
})

export default store
