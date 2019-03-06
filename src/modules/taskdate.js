import { createSelector } from "reselect"
import { all, put, call, takeEvery } from "redux-saga/effects"
import { delay } from "redux-saga"
import * as service from "../services/ws"
import { name as appName } from "../../package.json"
import createRequestTypes from "../utils/createRequestTypes"
import { dataToEntities } from "../utils"

export const namespace = "taskdate"

const prefix = `${appName}/${namespace}`

const InitialState = {
  entities: {},
  loading: false
}

/* Types */
const withNamespace = createRequestTypes(prefix)

export const FETCH_ALL_TASK_DATE = withNamespace("FETCH_ALL_TASK_DATE")
export const SAVE_TASK_DATE = withNamespace("SAVE_TASK_DATE")
export const EDIT_TASK_DATE = withNamespace("EDIT_TASK_DATE")

/* Reducer */
export default function reducer(state = InitialState, { type, payload }) {
  switch (type) {
    case FETCH_ALL_TASK_DATE.REQUEST:
    case SAVE_TASK_DATE.REQUEST:
    case EDIT_TASK_DATE.REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_ALL_TASK_DATE.SUCCESS: {
      const { entities } = state
      const newEntities = dataToEntities("id", payload.response)
      return {
        ...state,
        entities: { ...entities, ...newEntities },
        loading: false
      }
    }
    case SAVE_TASK_DATE.SUCCESS:
    case EDIT_TASK_DATE.SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }
    case FETCH_ALL_TASK_DATE.ERROR:
    case SAVE_TASK_DATE.ERROR:
    case EDIT_TASK_DATE.ERROR: {
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

export const byProjectIdSelector = createSelector(
  stateSelector,
  dataSelector,
  (_, props) => props,
  (state, data, props) => {
    if (props.id) return data.filter(record => record.projId === props.id)
    else return []
  }
)

/* Action Creators */
export function fetchAllTaskDate(projectId, onSuccess) {
  return {
    type: FETCH_ALL_TASK_DATE.REQUEST,
    payload: { projectId, onSuccess }
  }
}
export function saveTaskDate(body, onSuccess) {
  return {
    type: SAVE_TASK_DATE.REQUEST,
    payload: { body, onSuccess }
  }
}
export function editTaskDate(body, onSuccess) {
  return {
    type: EDIT_TASK_DATE.REQUEST,
    payload: { body, onSuccess }
  }
}

/* Sagas */
export const fetchAllTaskDateSaga = function*({ payload }) {
  try {
    const response = yield call(service.fetchAllTaskDate, payload.projectId)
    yield delay(600)
    yield put({
      type: FETCH_ALL_TASK_DATE.SUCCESS,
      payload: { response }
    })
    const onSuccess = payload.onSuccess
    typeof onSuccess === "function" && onSuccess(response)
  } catch (error) {
    yield put({
      type: FETCH_ALL_TASK_DATE.ERROR,
      notification: {
        type: "error",
        message: "Произошла при получении сроков задач"
      }
    })
  }
}
export const saveTaskDateSaga = function*({ payload }) {
  try {
    const response = yield call(service.saveTaskDate, payload.body)
    yield delay(600)
    yield put({
      type: SAVE_TASK_DATE.SUCCESS,
      payload: { response }
    })
    const onSuccess = payload.onSuccess
    typeof onSuccess === "function" && onSuccess(response)
  } catch (error) {
    yield put({
      type: SAVE_TASK_DATE.ERROR,
      notification: {
        type: "error",
        message: "Произошла при сохранении сроков задач"
      }
    })
  }
}
export const editTaskDateSaga = function*({ payload }) {
  try {
    const response = yield call(service.editTaskDate, payload.body)
    yield delay(600)
    yield put({
      type: EDIT_TASK_DATE.SUCCESS,
      payload: { response }
    })
    const onSuccess = payload.onSuccess
    typeof onSuccess === "function" && onSuccess(response)
  } catch (error) {
    yield put({
      type: EDIT_TASK_DATE.ERROR,
      notification: {
        type: "error",
        message: "Произошла при редактировании сроков задач"
      }
    })
  }
}

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_TASK_DATE.REQUEST, fetchAllTaskDateSaga),
    takeEvery(SAVE_TASK_DATE.REQUEST, saveTaskDateSaga),
    takeEvery(EDIT_TASK_DATE.REQUEST, editTaskDateSaga)
  ])
}
