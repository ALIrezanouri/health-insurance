import './assets/main.css'
import './assets/fonts/vazir.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

// Persian translations
import faIR from './locales/fa-IR'

const messages = {
  'fa-IR': faIR
}

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: 'fa-IR',
  fallbackLocale: 'fa-IR',
  messages,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')