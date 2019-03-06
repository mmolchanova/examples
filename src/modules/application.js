import { createSelector } from "reselect"
import { all, put, call, takeEvery } from "redux-saga/effects"
import { delay } from "redux-saga"
import * as service from "../services/lk"
import { name as appName } from "../../package.json"
import { dataToEntities } from "../utils"
import createRequestTypes from "../utils/createRequestTypes"
import history from "../history"

export const namespace = "application"

const prefix = `${appName}/${namespace}`

/* Types */
const withNamespace = createRequestTypes(prefix)

export const FETCH_APPLICATION_CARD = withNamespace("FETCH_APPLICATION_CARD")
export const FETCH_ALL_APPLICATIONS = withNamespace("FETCH_ALL_APPLICATIONS")
export const FETCH_APPLICATIONS_BY_USER_ID = withNamespace(
  "FETCH_APPLICATIONS_BY_USER_ID"
)
export const FETCH_APPLICATIONS_BY_CONT_ID = withNamespace(
  "FETCH_APPLICATIONS_BY_CONT_ID"
)
export const CREATE_APPLICATION = withNamespace("CREATE_APPLICATION")
export const EDIT_APPLICATION_STATUS = withNamespace("EDIT_APPLICATION_STATUS")
export const FETCH_NEWS_FEED = withNamespace("FETCH_NEWS_FEED")

const InitialState = {
  entities: {},
  entitiesCards: {},
  statusData: {},
  newsFeed: {},
  loading: false
}

/* Reducer */
export default function reducer(state = InitialState, { type, payload }) {
  switch (type) {
    case FETCH_APPLICATION_CARD.REQUEST:
    case FETCH_ALL_APPLICATIONS.REQUEST:
    case FETCH_APPLICATIONS_BY_USER_ID.REQUEST:
    case FETCH_APPLICATIONS_BY_CONT_ID.REQUEST:
    case CREATE_APPLICATION.REQUEST:
    case EDIT_APPLICATION_STATUS.REQUEST:
    case FETCH_NEWS_FEED.REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_APPLICATION_CARD.SUCCESS: {
      const { entities } = state

      return {
        ...state,
        entities: {
          ...entities,
          [payload.appId]: { ...entities[payload.appId], ...payload }
        },
        loading: false
      }
    }
    case FETCH_ALL_APPLICATIONS.SUCCESS:
    case FETCH_APPLICATIONS_BY_USER_ID.SUCCESS:
    case FETCH_APPLICATIONS_BY_CONT_ID.SUCCESS: {
      return {
        ...state,
        entities: dataToEntities("appId", payload.response),
        loading: false
      }
    }
    case CREATE_APPLICATION.SUCCESS:
    case EDIT_APPLICATION_STATUS.SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }
    case FETCH_NEWS_FEED.SUCCESS: {
      return {
        ...state,
        newsFeed: dataToEntities("id", payload.response)
      }
    }
    case FETCH_APPLICATION_CARD.ERROR:
    case FETCH_ALL_APPLICATIONS.ERROR:
    case FETCH_APPLICATIONS_BY_USER_ID.ERROR:
    case FETCH_APPLICATIONS_BY_CONT_ID.ERROR:
    case CREATE_APPLICATION.ERROR:
    case EDIT_APPLICATION_STATUS.ERROR:
    case FETCH_NEWS_FEED.ERROR: {
      return {
        ...state,
        loading: false
      }
    }
    default:
      return state
  }
}

/* Memoized selectors */
const stateSelector = state => state[namespace]
export const entitiesSelector = createSelector(
  stateSelector,
  state => state.entities
)

export const dataSelector = createSelector(
  stateSelector,
  state => Object.values(state.entities)
)

export const statusSelector = createSelector(
  stateSelector,
  state => state.statusData
)
export const byApplicationIdSelector = createSelector(
  stateSelector,
  entitiesSelector,
  (_, props) => props,
  (state, cards, props) => {
    if (props.applicationId && cards[props.applicationId])
      return cards[props.applicationId]
    else return []
  }
)
export const byUserSelector = createSelector(
  stateSelector,
  dataSelector,
  (_, props) => props,
  (state, data, props) => {
    if (props.uId) return data.filter(record => record.userId === props.uId)
    else return []
  }
)
export const byContIdSelector = createSelector(
  stateSelector,
  dataSelector,
  (_, props) => props,
  (state, data, props) => {
    if (props.contId)
      return data.filter(record => record.contId === props.contId)
    else return []
  }
)
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)

export const newsFeedDataSelector = createSelector(
  stateSelector,
  state => Object.values(state.newsFeed)
)

/* Action Creators */
export function fetchAllApplications(onSuccess) {
  return {
    type: FETCH_ALL_APPLICATIONS.REQUEST,
    payload: { onSuccess }
  }
}
export function fetchApplicationCard(applicationId, onSuccess) {
  return {
    type: FETCH_APPLICATION_CARD.REQUEST,
    payload: { applicationId, onSuccess }
  }
}
export function fetchApplicationsByUserId(userId, onSuccess) {
  return {
    type: FETCH_APPLICATIONS_BY_USER_ID.REQUEST,
    payload: { userId, onSuccess }
  }
}
export function fetchApplicationsByContId(contId, onSuccess) {
  return {
    type: FETCH_APPLICATIONS_BY_CONT_ID.REQUEST,
    payload: { contId, onSuccess }
  }
}
export function createApplication(body, onSuccess) {
  return {
    type: CREATE_APPLICATION.REQUEST,
    payload: { body, onSuccess }
  }
}
export function editApplicationStatus(body, onSuccess) {
  return {
    type: EDIT_APPLICATION_STATUS.REQUEST,
    payload: { body, onSuccess }
  }
}

export function fetchNews(userId) {
  return {
    type: FETCH_NEWS_FEED.REQUEST,
    payload: { userId }
  }
}

/* Sagas */
export const fetchAllApplicationsSaga = function*({ payload }) {
  try {
    const response = yield call(service.fetchAllApplications)
    yield delay(600)
    yield put({
      type: FETCH_ALL_APPLICATIONS.SUCCESS,
      payload: { response }
    })
    const onSuccess = payload.onSuccess
    typeof onSuccess === "function" && onSuccess(response)
  } catch (error) {
    yield put({
      type: FETCH_ALL_APPLICATIONS.ERROR,
      notification: {
        type: "error",
        message: "Произошла ошибка при загрузке списка заявлений"
      }
    })
  }
}

export const fetchApplicationCardSaga = function*({ payload }) {
  try {
    const response = yield call(
      service.fetchApplicationCard,
      payload.applicationId
    )
    yield delay(600)
    yield put({
      type: FETCH_APPLICATION_CARD.SUCCESS,
      payload: { ...response, appId: payload.applicationId }
    })

    const onSuccess = payload.onSuccess
    typeof onSuccess === "function" && onSuccess(response)
  } catch (error) {
    yield put({
      type: FETCH_APPLICATION_CARD.ERROR,
      notification: {
        type: "error",
        message: "Произошла ошибка при загрузке заявления"
      }
    })
  }

}
export const fetchApplicationsByUserIdSaga = function*({ payload }) {
  try {
    const response = yield call(
      service.fetchApplicationsByUserId,
      payload.userId
    )

    yield delay(600)
    yield put({
      type: FETCH_APPLICATIONS_BY_USER_ID.SUCCESS,
      payload: { response }
    })

    const onSuccess = payload.onSuccess
    typeof onSuccess === "function" && onSuccess(response)
  } catch (error) {
    yield put({
      type: FETCH_APPLICATIONS_BY_USER_ID.ERROR,
      notification: {
        type: "error",
        message:
          "Произошла ошибка при загрузке списка заявлений по пользователю"
      }
    })
  }
}

export const fetchApplicationsByContIdSaga = function*({ payload }) {
  try {
    const arr = yield call(service.fetchApplicationsByContId, payload.contId)
    const response = arr.map(item => {
      return {
        ...item,
        contId: payload.contId
      }
    })
    yield delay(600)
    yield put({
      type: FETCH_APPLICATIONS_BY_CONT_ID.SUCCESS,
      payload: { response }
    })
    const onSuccess = payload.onSuccess
    typeof onSuccess === "function" && onSuccess(response)
  } catch (error) {
    yield put({
      type: FETCH_APPLICATIONS_BY_CONT_ID.ERROR,
      notification: {
        type: "error",
        message: "Произошла ошибка при загрузке списка заявлений по проекту"
      }
    })
  }
}

export const createApplicationSaga = function*({ payload }) {
  try {
    const response = yield call(service.createApplication, payload.body)
    yield delay(600)
    yield put({
      type: CREATE_APPLICATION.SUCCESS,
      payload: { response }
    })
    const onSuccess = payload.onSuccess
    typeof onSuccess === "function" && onSuccess(response)
    history.push("/lk/application/")
  } catch (error) {
    yield put({
      type: CREATE_APPLICATION.ERROR,
      notification: {
        type: "error",
        message: "Произошла ошибка создания заявления"
      }
    })
  }
}

export const editApplicationStatusSaga = function*({ payload }) {
  try {
    const response = yield call(service.editApplicationStatus, payload.body)
    yield delay(600)
    yield put({
      type: EDIT_APPLICATION_STATUS.SUCCESS,
      payload: { response }
    })
    const onSuccess = payload.onSuccess
    typeof onSuccess === "function" && onSuccess(response)
  } catch (error) {
    yield put({
      type: EDIT_APPLICATION_STATUS.ERROR,
      notification: {
        type: "error",
        message: "Произошла ошибка при изменении статуса заявления"
      }
    })
  }
}

export const fetchNewsSaga = function*({ payload }) {
  try {
    const response = yield call(service.fetchNewsFeed, payload.userId)
    yield put({
      type: FETCH_NEWS_FEED.SUCCESS,
      payload: { response }
    })
  } catch (error) {
    yield put({
      type: FETCH_NEWS_FEED.ERROR,
      notification: {
        type: "error",
        message: "Произошла ошибка при получении новостной ленты"
      }
    })
  }
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_APPLICATIONS.REQUEST, fetchAllApplicationsSaga),
    takeEvery(FETCH_APPLICATION_CARD.REQUEST, fetchApplicationCardSaga),
    takeEvery(
      FETCH_APPLICATIONS_BY_CONT_ID.REQUEST,
      fetchApplicationsByContIdSaga
    ),
    takeEvery(
      FETCH_APPLICATIONS_BY_USER_ID.REQUEST,
      fetchApplicationsByUserIdSaga
    ),
    takeEvery(CREATE_APPLICATION.REQUEST, createApplicationSaga),
    takeEvery(EDIT_APPLICATION_STATUS.REQUEST, editApplicationStatusSaga),
    takeEvery(FETCH_NEWS_FEED.REQUEST, fetchNewsSaga)
  ])
}
