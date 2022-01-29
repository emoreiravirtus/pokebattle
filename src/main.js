import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { firestorePlugin } from 'vuefire'

createApp(App).use(firestorePlugin).use(store).use(router).mount('#app')
