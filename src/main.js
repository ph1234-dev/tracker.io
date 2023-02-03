import { createApp } from 'vue'

// pinia dont persist data so lets use plugin pinia persisted state
import { createPinia } from 'pinia'

// guide to persist pinia
// https://seb-l.github.io/pinia-plugin-persist/#nuxt
// 
// https://github.com/prazdevs/pinia-plugin-persistedstate
// npm i pinia-plugin-persistedstate
// then we can add persist = true
import piniaPersist  from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPersist )


import App from './App.vue'
import router from './router'

import Calendar from '@/components/Calendar.vue'

const app = createApp(App)
app.component('Calendar', Calendar)

app.use(pinia)
app.use(router)

app.mount('#app')

