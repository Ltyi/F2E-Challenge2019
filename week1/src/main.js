import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// [ Font awesome ]
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faPlay } from '@fortawesome/free-solid-svg-icons'
import { faStopCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// [ Main CSS Entry ]
import './style/main.css'

library.add(faStopCircle, faTimes, faPlay)

const app = createApp(App)

app.component('fa-icon', FontAwesomeIcon)
app.use(store).use(router).mount('#app')
