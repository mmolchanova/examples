import { message } from "antd"

message.config({
  top: 9,
  duration: 7,
  maxCount: 3
})

export default () => next => action => {
  const { notification } = action

  if (notification) {
    const { type } = notification
    if (type === "error") message['warning'](notification.message)
    else message[type](notification.message)
  }

  return next(action)
}
