import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export default {
  install: (app, options) => {
    app.provide('dayjs', dayjs)
  }
}
