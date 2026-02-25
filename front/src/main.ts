import '@/assets/styles.scss'
import '@/assets/tailwind.css'

import Aura from '@primeuix/themes/aura'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { ConfirmationService, ToastService } from 'primevue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)


app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
})
app.use(ToastService)
app.use(ConfirmationService)

app.mount('#app')
