import { createStore } from 'vuex'

const url = 'https://pokeapi.co/api/v2';
let offset = 10;

export default createStore({
  state: {
    pokemons: [],
    spotlightedPokemon: { spotlighted: false, data: '' }
  },
  mutations: {
    addPokemonToList: (state, pokemon) => state.pokemons.push( pokemon ),
    spotlightPokemon: (state, data) => state.spotlightedPokemon = { spotlighted: true, data },
    turnSpotlightOff: state => state.spotlightedPokemon = { spotlighted: false, data: '' }
  },
  getters: {
    allPokemons: state => state.pokemons,
    spotlightedPokemon: state => state.spotlightedPokemon
  },
  actions: {
    populatePokemons( context, isInitial = true ) {

      let searchUrl;

      if ( isInitial ) {
        searchUrl = `${url}/pokemon?limit=10`
      }
      else {
        searchUrl = `${url}/pokemon?limit=10&offset=${offset}`
        offset += 10;
      }

      console.log(searchUrl);

      fetch(searchUrl)
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
    searchSpecificPokemon( context, pokemonName ) {
      fetch(`${url}/pokemon/${pokemonName}`)
        .then( async response => {
          const data = await response.json();
          context.commit('spotlightPokemon', data);
          return response;
        })
        .catch(error => {
          return error;
        })
    },
    spotlightPokemon( context, data ) {
      context.commit('spotlightPokemon', data);
    },
    turnSpotlightOff( context ) {
      context.commit('turnSpotlightOff');
    }
  },
  modules: {
  }
})
