import { all, put, call, takeEvery } from "redux-saga/effects"
import * as service from "../services/ws"
import { name as appName } from "../../package.json"
import createRequestTypes from "../utils/createRequestTypes"

export const namespace = "news"

const prefix = `${appName}/${namespace}`

const initialState = {
  loading: false
}

/* Action types */
const withNamespace = createRequestTypes(prefix)

const CREATE_NEWS_FEED = withNamespace("CREATE_NEWS")

export default function reducer(state = initialState, { type }) {
  switch (type) {
    case CREATE_NEWS_FEED.REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_NEWS_FEED.SUCCESS:
    case CREATE_NEWS_FEED.ERROR:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

/* Action creators */
export function createNewsFeed(body) {
  return {
    type: CREATE_NEWS_FEED.REQUEST,
    payload: { body }
  }
}

/* Sagas */
export function* createNewsFeedSaga({ payload: { body } }) {
  try {
    yield call(service.createNews, body)
    yield put({
      type: CREATE_NEWS_FEED.SUCCESS
    })
  } catch (e) {
    yield put({
      type: CREATE_NEWS_FEED.ERROR,
      notification: {
        type: "error",
        message: "Произошла ошибка записи ленты новостей"
      }
    })
  }
}

export function* saga() {
  yield all([takeEvery(CREATE_NEWS_FEED.REQUEST, createNewsFeedSaga)])
}
