import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../firebase/firebase'

const url = 'https://pokeapi.co/api/v2';

export default new Vuex.Store({
  state: {
    secretDanceRecords: [],
    pokemons: [],
    pokemonNames: [],
    isLoading: false,
    muted: false,
    currentIndex: 0,
    searchTerm: null
  },
  mutations: {
    addNameToList: (state, name) => state.pokemonNames.push( name ),
    addPokemonToList: (state, pokemon) => state.pokemons.push( pokemon ),
    updateCurrentIndex: (state, newIndex ) => state.currentIndex = newIndex,
    startLoading: state => state.isLoading = true,
    stopLoading: state => state.isLoading = false,
    playAudio: state => state.muted = false,
    stopAudio: state => state.muted = true,
    updateSearchTerm: (state, newSearchTerm) => state.searchTerm = newSearchTerm,
    ...vuexfireMutations,
  },
  getters: {
    allPokemons: state => state.pokemons,
    pokemonNames: state => state.pokemonNames,
    isLoading: state => state.isLoading,
    muted: state => state.muted,
    currentIndex: state => state.currentIndex,
    searchTerm: state => state.searchTerm,
    secretDanceRecords: state => state.secretDanceRecords
  },
  actions: {
    bindSecretDanceRecords: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('secretDanceRecords', db.collection('secretDanceRecords'));
    }),
    saveSecretDanceRecords: firestoreAction((_, data) => {
      return db.collection('secretDanceRecords').add(data);
    }),
    async populatePokemons( context ) {

      return await fetch(`${url}/pokemon?limit=1000`)
        .then( async response => {
          const data = await response.json();

          for (let i in data.results) {
            fetch(`${url}/pokemon/${data.results[i].name}`)
              .then( async response => {
                const pokemon = await response.json();
                context.commit('addNameToList', pokemon.name);
                context.commit('addPokemonToList', pokemon);
              })
          }
        })
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
    },
    playAudio( context, dontChangeLocalStorage = false ) {
      if(!dontChangeLocalStorage) {
        localStorage.setItem('muted', 'false');
      }
      context.commit('playAudio');
    },
    stopAudio( context, dontChangeLocalStorage = false ) {
      if(!dontChangeLocalStorage) {
        localStorage.setItem('muted', 'true');
      }
      context.commit('stopAudio');
    },
    updateCurrentIndex( context, newIndex ) {
      context.commit('updateCurrentIndex', newIndex);
    },
    updateSearchTerm( context, newSearchTerm ) {
      context.commit('updateSearchTerm', newSearchTerm);
    }
  },
  modules: {
  }
})
