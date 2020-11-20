import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import zhTW from 'dayjs/locale/zh-tw'

dayjs.extend(duration)
dayjs.locale({ ...zhTW, weekStart: 1 })

export default {
  install: (app, options) => {
    app.provide('dayjs', dayjs)
  }
}
