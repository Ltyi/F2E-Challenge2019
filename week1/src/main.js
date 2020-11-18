import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// [ CSS Entry ]
import './style/main.css'

// [ Plugins ]
import dayjs from './plugins/dayjs'
import fontAwesome from './plugins/fontAwesome'

// [ components ]
import BaseBtn from './components/BaseBtn.vue'
import BaseDialog from './components/BaseDialog.vue'

const app = createApp(App)

app.component('BaseBtn', BaseBtn)
app.component('BaseDialog', BaseDialog)

app.use(dayjs)
app.use(fontAwesome)
app.use(store)
app.use(router)

app.mount('#app')
