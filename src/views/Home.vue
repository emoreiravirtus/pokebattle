<template>
  <div class="home-container">
    <div class="pokemons-container">
      <pokecard v-for="(pokemon, index) in pokemons" :key="index" :pokemon="pokemon"></pokecard>
    </div>
  </div>
</template>

<script>
import Pokecard from '@/components/Pokecard.vue'

export default {
  name: 'Home',
  components: {
    Pokecard
  },
  beforeCreate() {
    this.$store.dispatch('populatePokemons');
  },
  computed: {
    pokemons() {
      return this.$store.getters['allPokemons'];
    }
  }
}
</script>
