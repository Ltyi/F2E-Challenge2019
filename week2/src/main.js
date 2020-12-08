import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Main CSS Entry
import '@/css/main.css'

// Plugins
import lodash from '@/plugins/lodash'

const app = createApp(App)

app.use(lodash)
app.use(store)
app.use(router)

app.mount('#app')
