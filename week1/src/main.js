import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// [ Font awesome ]
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlay, faListUl, faMusic } from '@fortawesome/free-solid-svg-icons'
import { faStopCircle, faChartBar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// [ Plugins ]
import dayjs from './plugins/dayjs'

// [ CSS Entry ]
import './style/main.css'

library.add(faStopCircle, faTimes, faPlay, faListUl, faChartBar, faMusic)

const app = createApp(App)

app.component('FaIcon', FontAwesomeIcon)

app.use(dayjs)
app.use(store)
app.use(router)

app.mount('#app')
