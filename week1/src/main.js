import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// [ CSS Entry ]
import './style/main.css'

// [ Plugins ]
import dayjs from './plugins/dayjs'
import fontAwesome from './plugins/fontAwesome'

// [ Base Components ]
import BaseRow from './components/BaseRow'
import BaseCol from './components/BaseCol'

const app = createApp(App)

app.component('BaseRow', BaseRow)
app.component('BaseCol', BaseCol)

app.use(dayjs)
app.use(fontAwesome)
app.use(store)
app.use(router)

app.mount('#app')
