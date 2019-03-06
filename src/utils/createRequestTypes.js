export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const ERROR = 'ERROR'

const createRequestTypes = prefix => base => {
  return [REQUEST, SUCCESS, ERROR].reduce((acc, type) => {
    acc[type] = `${prefix}/${base}_${type}`
    return acc
  }, {})
}

export default createRequestTypes
