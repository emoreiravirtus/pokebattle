import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Wiki from '../views/Wiki.vue'
import SecretDance from '../views/SecretDance.vue'
import SpotlightedPokemon from '../views/SpotlightedPokemon'
import MiniGames from '../views/MiniGames'

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
    path: '/secret-dance',
    name: 'SecretDance',
    component: SecretDance
  },
  {
    path: '/spotlighted-pokemon/:id',
    name: 'SpotlightedPokemon',
    component: SpotlightedPokemon
  },
  {
    path: '/mini-games',
    name: 'MiniGames',
    component: MiniGames
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
