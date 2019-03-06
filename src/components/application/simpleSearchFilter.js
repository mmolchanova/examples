import moment from "moment"

export default function simpleSearchFilter(data, filterValue) {
  const filteredData = [...data].filter(item => {
    const str = `Заявление ${item.appNum} от ${String(
      moment(item.appDate).format("DD.MM.YYYY")
    )} ${item.stateName}`
    if (
      filterValue &&
      !str.toLowerCase().includes(String(filterValue).toLowerCase())
    )
      return false

    return true
  })

  return filteredData.sort((a, b) => {
    return a.appNum - b.appNum
  })
}
