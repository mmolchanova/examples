import React from "react"
import moment from "moment"
import { Map, fromJS } from "immutable"

export function dataToEntities(primaryKey, values) {
  if (!Array.isArray(values) || !values.length) return {}
  return values.reduce((acc, current) => {
    if (current && current[primaryKey]) {
      acc[current[primaryKey]] = current
    }
    return acc
  }, {})
}

export function formatDate(timestamp, format = "DD.MM.YYYY") {
  return moment(timestamp).format(format)
}

export function getFormatUserInfo(firstName, lastName, patronymic) {
  return `${lastName ? lastName : ""} ${firstName ? firstName[0] : " "}. ${
    patronymic ? patronymic[0] : " "
  }.`
}

export function getReducersAndSagas(modules) {
  return Object.keys(modules).reduce(
    (acc, name) => {
      const reducer = modules[name].default
      const saga = modules[name].saga
      if (reducer && typeof reducer === "function") {
        acc.reducers[name] = reducer
      }
      if (saga && typeof saga === "function") {
        acc.sagas[name] = saga()
      }
      return acc
    },
    { reducers: {}, sagas: {} }
  )
}



export function isEqual(value, other) {
  // Get the value type
  var type = Object.prototype.toString.call(value)

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false

  // If items are not an object or array, return false
  if (["[object Array]", "[object Object]"].indexOf(type) < 0) return false

  // Compare the length of the length of the two items
  var valueLen =
    type === "[object Array]" ? value.length : Object.keys(value).length
  var otherLen =
    type === "[object Array]" ? other.length : Object.keys(other).length
  if (valueLen !== otherLen) return false

  // Compare two items
  var compare = function(item1, item2) {
    // Get the object type
    var itemType = Object.prototype.toString.call(item1)

    // If an object or array, compare recursively
    if (["[object Array]", "[object Object]"].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false
    } else {
      // Otherwise, do a simple comparison
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false

      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === "[object Function]") {
        if (item1.toString() !== item2.toString()) return false
      } else {
        if (item1 !== item2) return false
      }
    }
  }

  // Compare properties
  if (type === "[object Array]") {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false
      }
    }
  }

  // If nothing failed, return true
  return true
}

export function hexToRgbA(hex, opacity = 1) {
  var c
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("")
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = "0x" + c.join("")
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      opacity +
      ")"
    )
  }
  throw new Error("Bad Hex")
}

export function validateEmptyFileSelect(_rule, filesArr, callback) {
  const isArray = typeof filesArr === "object" || Array.isArray(filesArr)
  if (isArray && filesArr.some(file => file.size <= 0)) {
    const message =
      filesArr.length > 1 ? "Присутствуют пустые файлы" : "Выбранный файл пуст"
    callback(message)
  }
  callback()
}

