import request from "../utils/request"

const { NODE_ENV } = process.env

const URL =
  NODE_ENV !== "production"
    ? "http://.../lk/v1"
    : "/lk/v1"

//appliction
export function fetchAllApplications() {
  return request(`${URL}/application/getAllApplication`)
}

export function fetchApplicationCard(applicationId) {
  return request(`${URL}/application/getApplicationCard?appId=${applicationId}`)
}

export function fetchApplicationsByUserId(userId) {
  return request(`${URL}/application/getApplication?userId=${userId}`)
}

export function fetchApplicationsByContId(contId) {
  return request(`${URL}/application/getAppFromContract?contractId=${contId}`)
}

export function createApplication(body) {
  return request(`${URL}/application/createApplication`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(body)
  })
}

export function editApplicationStatus(body) {
  return request(`${URL}/application/editStatusApp`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(body)
  })
}

export function fetchNewsFeed(userId) {
  return request(`${URL}/application/newsFeed?userId=${userId}`)
}

// newsFeed
export function createNewsFeed(body) {
  return request(`${URL}/newsFeed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(body)
  })
}
