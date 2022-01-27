import { createStore } from 'vuex'

const url = 'https://pokeapi.co/api/v2';
let offset = 10;

export default createStore({
  state: {
    pokemons: [],
    isLoading: false,
    muted: false
  },
  mutations: {
    addPokemonToList: (state, pokemon) => state.pokemons.push( pokemon ),
    cleanPokemons: state => state.pokemons = [],
    startLoading: state => state.isLoading = true,
    stopLoading: state => state.isLoading = false,
    toggleMuted: state => state.muted = !state.muted
  },
  getters: {
    allPokemons: state => state.pokemons,
    isLoading: state => state.isLoading,
    muted: state => state.muted
  },
  actions: {
    async populatePokemons( context, isInitial = true ) {

      let searchUrl;

      if ( isInitial ) {
        searchUrl = `${url}/pokemon?limit=10`
      }
      else {
        searchUrl = `${url}/pokemon?limit=10&offset=${offset}`
        offset += 10;
      }

      return await fetch(searchUrl)
        .then( async response => {
          const data = await response.json();

          for (let i in data.results) {
            fetch(`${url}/pokemon/${data.results[i].name}`)
              .then( async response => {
                const pokemon = await response.json();
                context.commit('addPokemonToList', pokemon);
              })
          }
        })
    },
    async getNRandomPokemons(context, n) {
      let randomList = Array.from({length: n}, () => Math.floor(Math.random() * 898));
      let nRandomPokemonsData = []

      for (let item of randomList) {
        await fetch(`${url}/pokemon/${item}`)
          .then( async response => {
            const pokemon = await response.json();
            nRandomPokemonsData.push(pokemon);
          })
      }

      return nRandomPokemonsData
    },
    cleanPokemons( context ) {
      context.commit('cleanPokemons');
    },
    async getPokemon(_, id ) {
      let pokemon;
      await fetch(`${url}/pokemon/${id}`)
        .then( async response => {
          pokemon = await response.json();
        })
        .catch(error => {
          return error;
        })
      return pokemon;
    },
    startLoading( context ) {
      context.commit('startLoading');
    },
    stopLoading( context ) {
      context.commit('stopLoading');
    },
    toggleMuted( context ) {
      context.commit('toggleMuted');
    }
  },
  modules: {
  }
})
