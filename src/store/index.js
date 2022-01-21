import { createStore } from 'vuex'

const url = 'https://pokeapi.co/api/v2';

export default createStore({
  state: {
    pokemons: []
  },
  mutations: {
    addPokemon: (state, pokemon) => state.pokemons.push( pokemon )
  },
  getters: {
    allPokemons: state => state.pokemons
  },
  actions: {
    populatePokemons( context ) {
      fetch(`${url}/pokemon?limit=50`)
        .then( async response => {
          const data = await response.json();

          for (let i in data.results) {
            fetch(`${url}/pokemon/${data.results[i].name}`)
              .then( async response => {
                const pokemon = await response.json();
                context.commit('addPokemon', pokemon);
              })
          }
        })
    }
  },
  modules: {
  }
})
