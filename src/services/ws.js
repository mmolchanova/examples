import request from "../utils/request"

const { NODE_ENV } = process.env

export const URL =
  NODE_ENV !== "production" ? "http://.../ws" : "/ws"

//taskDate
export function saveTaskDate(body) {
  return request(`${URL}/taskdate/saveTaskDate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(body)
  })
}

export function fetchAllTaskDate(projectId) {
  return request(`${URL}/taskdate/getAllTaskDate?projId=${projectId}`)
}

export function editTaskDate(body) {
  return request(`${URL}/taskdate/editTaskDate`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(body)
  })
}

// news
export function createNews(body) {
  return request(`${URL}/news/createNews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(body)
  })
}
