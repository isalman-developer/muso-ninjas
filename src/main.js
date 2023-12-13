import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// global style
import '../src/assets/main.css'
import { projectAuth } from './firebase/config'

let app;
// wait a fraction of second for firebase to return whether the user is authenticated or not (login or not), it is used for auth guard 
projectAuth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App).use(router).mount('#app')
    }
})
