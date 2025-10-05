import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './styles/tailwind.css'
import './styles/brand.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
