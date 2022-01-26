import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Wiki from '../views/Wiki.vue'
import SecretPokemon from '../views/SecretPokemon.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/wiki',
    name: 'Wiki',
    component: Wiki
  },
  {
    path: '/secret-pokemon',
    name: 'SecretPokemon',
    component: SecretPokemon
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
