import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// global style
import '../src/assets/main.css'

createApp(App).use(router).mount('#app')
