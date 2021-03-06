import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTimes,
  faPlay,
  faListUl,
  faMusic,
  faCircle,
  faPlus,
  faFileExport
} from '@fortawesome/free-solid-svg-icons'
import { faStopCircle, faChartBar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faStopCircle,
  faTimes,
  faPlay,
  faListUl,
  faChartBar,
  faMusic,
  faCircle,
  faPlus,
  faFileExport
)

export default {
  install: (app, options) => {
    app.component('FaIcon', FontAwesomeIcon)
  }
}
