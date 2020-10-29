import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// [ Plugins ]
import dayjs from './plugins/dayjs'
import fontAwesome from './plugins/fontAwesome'

// [ CSS Entry ]
import './style/main.css'

const app = createApp(App)

app.use(dayjs)
app.use(fontAwesome)
app.use(store)
app.use(router)

app.mount('#app')
