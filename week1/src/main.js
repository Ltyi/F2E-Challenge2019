import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// [ Main CSS Entry ]
import './style/main.css'

createApp(App).use(store).use(router).mount('#app')
