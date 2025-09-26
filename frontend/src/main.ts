import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

// Import our CSS
import './styles/tailwind.css'

// Import locales
import faIR from './locales/fa-IR'

const i18n = createI18n({
  locale: 'fa-IR',
  fallbackLocale: 'fa-IR',
  messages: {
    'fa-IR': faIR
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')