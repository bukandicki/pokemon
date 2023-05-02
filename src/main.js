import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { installAxiosConfig } from '@/lib/api'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

installAxiosConfig(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
