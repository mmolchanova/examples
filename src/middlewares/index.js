import { routerMiddleware as router } from "react-router-redux"
import { createLogger } from "redux-logger"
import createSagaMiddleware from "redux-saga"
import history from "../history"
import notifications from "./notifications"

let middlewares = []

if (process.env.NODE_ENV !== "production") {
  middlewares.push(
    createLogger({
      collapsed: true
    })
  )
}

export const sagaMiddleware = createSagaMiddleware()
export default middlewares.concat([
  sagaMiddleware,
  router(history),
  notifications
])
