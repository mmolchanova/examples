import React from 'react'
import { notification } from 'antd'

const codeMessage = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  406: 'Not Acceptable',
  410: 'Gone',
  422: 'Unprocessable Entity (WebDAV)',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  }

  const errortext = codeMessage[response.status] || response.statusText

  if (process.env.NODE_ENV !== 'production') {
    notification.error({
      message: `Request error ${response.status}`,
      description: (
        <div>
          {errortext}
          <br />
          <small>
            <a href={response.url} target="_blank">
              {response.url}
            </a>
          </small>
        </div>
      )
    })
  }

  const error = new Error(errortext)
  error.name = response.status
  error.response = response

  return Promise.reject(response)
}

function isBlob(newOptions) {
  return (
    newOptions &&
    newOptions.headers &&
    newOptions.headers.Accept &&
    newOptions.headers.Accept === 'application/octet-stream'
  )
}

const returnData = newOptions => response => {
  if (newOptions.method === 'DELETE' || response.status === 204) {
    return response.text()
  }

  if (isBlob(newOptions)) {
    return response.blob()
  }

  return response.json()
}

export default function request(url, options) {
  const defaultOptions = {}
  let newOptions = { ...defaultOptions, ...options }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(returnData(newOptions))
}