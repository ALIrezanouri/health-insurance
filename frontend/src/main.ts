import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import router from './router'
import App from './App.vue'
import fa from './locales/fa-IR'
import './styles/tailwind.css'
import './assets/fonts/vazir.css'

const i18n = createI18n({
  legacy: false, // use Composition API
  locale: 'fa-IR',
  fallbackLocale: 'fa-IR',
  messages: {
    'fa-IR': fa,
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')