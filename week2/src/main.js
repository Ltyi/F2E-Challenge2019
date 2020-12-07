import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Main CSS Entry
import '@/css/main.css'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
