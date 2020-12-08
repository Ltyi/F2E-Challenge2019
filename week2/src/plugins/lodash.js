import _ from 'lodash'

export default {
  install(app) {
    app.provide('_', _)
  }
}
