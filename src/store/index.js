import Vuex from 'vuex'
import db from '../firebase/firebase.js' 
import { doc, query, collection, where, getDocs, getDoc, onSnapshot, updateDoc, setDoc, orderBy, addDoc, limit } from "firebase/firestore";

export default new Vuex.Store({
  state: {
    secretDanceRecords: [],
    pokemons: [],
    pokemonNames: [],
    isLoading: false,
    muted: false,
    currentIndex: 0,
    searchTerm: null,
    secretDanceRecordSubscriber: null,
    maxIndex: 1120
  },
  mutations: {
    addNameToList: (state, name) => state.pokemonNames.push( name ),
    updateNames: (state, names) => state.pokemonNames = names,
    addPokemonToList: (state, pokemon) => state.pokemons.push( pokemon ),
    updatePokemons: (state, pokemons) => state.pokemons = pokemons,
    cleanPokemons: state => state.pokemons = [],
    updateCurrentIndex: (state, newIndex ) => state.currentIndex = newIndex,
    startLoading: state => state.isLoading = true,
    stopLoading: state => state.isLoading = false,
    playAudio: state => state.muted = false,
    stopAudio: state => state.muted = true,
    addToSecretDanceRecords: (state, record) => state.secretDanceRecords.push(record),
    updateSearchTerm: (state, newSearchTerm) => state.searchTerm = newSearchTerm,
    updateSecretDanceRecordSubscriber: (state, subscriber) => state.secretDanceRecordSubscriber = subscriber,
    unsubscribeSecretDanceRecord: state => {
      state.secretDanceRecordSubscriber();
      state.secretDanceRecords = [];
    } 
  },
  getters: {
    allPokemons: state => state.pokemons,
    pokemonNames: state => state.pokemonNames,
    isLoading: state => state.isLoading,
    muted: state => state.muted,
    currentIndex: state => state.currentIndex,
    searchTerm: state => state.searchTerm,
    secretDanceRecords: state => state.secretDanceRecords,
    maxIndex: state => state.maxIndex
  },
  actions: {
    async updatePokemons( context ) {

      context.commit('cleanPokemons');
      let currentIndex = context.getters['currentIndex'];

      const q = query(
        collection(db, "pokemons"),
        where("id", "<", currentIndex + 10),
        where("id", ">", currentIndex)
      );

      const pokemonsSnapshot = await getDocs(q);
      const pokemonsList = pokemonsSnapshot.docs.map(doc => doc.data());
      context.commit('updatePokemons', pokemonsList);
    },
    async syncPokemonsUpdate() {
      
      let startPokeAPIIndex = 10220;
      let lastPokeAPIIndex = 10228;

      let startFirebaseIndex = 1118;

      for(let i = startPokeAPIIndex; i <= lastPokeAPIIndex; i++) {

        const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const p = await r.json();
        p.id = startFirebaseIndex;

        const pokemonRef = doc(db, "pokemons", startFirebaseIndex.toString());
        await updateDoc(pokemonRef, p);

        startFirebaseIndex += 1;
        
      }
    },
    async syncPokemonsName() {

      const pokemonNamesRef = doc(db, 'pokemonNames', 'allNames');
      const pokemonNamesSnapshot = await getDoc(pokemonNamesRef);

      let list = pokemonNamesSnapshot.data();

      for(let i = 1000; i <= list.length; i++) {

        const pokemonNamesRef = doc(db, 'pokemons', i.toString);
        const pokemonNamesSnapshot = await getDoc(pokemonNamesRef);

        let pokemon = pokemonNamesSnapshot.data();
        list[i] = pokemon.name;
        
      }

      const listRef = doc(db, "pokemonNames", 'allNames');
      await updateDoc(listRef, list);
    },
    async syncPokemonsSet() {
      
      let startPokeAPIIndex = 10220;
      let lastPokeAPIIndex = 10228;

      let startFirebaseIndex = 1118;

      for(let i = startPokeAPIIndex; i <= lastPokeAPIIndex; i++) {

        const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const p = await r.json();
        p.id = startFirebaseIndex;

        const pokemonRef = doc(db, "pokemons", startFirebaseIndex.toString());
        await setDoc(pokemonRef, p);

        startFirebaseIndex += 1;
        
      }
    },
    async updatePokemonsByType( context, filters ) {

      context.commit('cleanPokemons');

      let filtersQuery;

      for (let filter in filters) {
        filtersQuery += where("types.type.name", "==", filters[filter])
      }
      
      const q = query(
        collection(db, "pokemons"),
        filtersQuery
      );

      console.log(q);
    },
    async populatePokemonNames( context ) {
      const q = query(
        collection(db, 'pokemonNames')
      );

      const pokemonsSnapshot = await getDocs(q);
      const pokemonsList = pokemonsSnapshot.docs.map(doc => doc.data());

      context.commit('updateNames', pokemonsList[0].allNames);
    },
    async getPokemon(_, id ) {
      const pokemonRef = doc(db, 'pokemons', id.toString());
      const pokemonSnapshot = await getDoc(pokemonRef);

      return pokemonSnapshot.data();
    },
    async getPokemonWithImage(_, id ) {
      const pokemonRef = doc(db, 'pokemons', id.toString());
      const pokemonSnapshot = await getDoc(pokemonRef);

      let pokemon = pokemonSnapshot.data();
      
      while(pokemon.sprites.other['official-artwork'].front_default == null) {
        let newRandomId = Math.floor(Math.random() * (1117 - 1) + 1);

        let newPokemonRef = doc(db, 'pokemons', newRandomId.toString());
        let newPokemonSnapshot = await getDoc(newPokemonRef);

        pokemon = newPokemonSnapshot.data();
      }

      return pokemon;
    },
    async getEvolutions(_, id) {
      let q = query(collection(db, 'evolutions'),
        where('chain', 'array-contains', Number(id)));

      const querySnapshot = await getDocs(q);
      
      let pokemonChain = [];

      await querySnapshot.forEach(async (d) => {

        for (let i in d.data().chain) {
          const pokemonRef = doc(db, 'pokemons', d.data().chain[i].toString());
          const pokemonSnapshot = await getDoc(pokemonRef);

          pokemonChain.push(pokemonSnapshot.data());
        }
      });

      return pokemonChain;
    },
    async subscribeDanceRecords( context ) {
      const q = query(collection(db, 'secretDanceRecords'), orderBy('record', 'desc'), limit(7));

      context.commit('updateSecretDanceRecordSubscriber', onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
              context.commit('addToSecretDanceRecords', change.doc.data());
          }
        });
      }));
    },
    async unsubscribeDanceRecords( context ) {
      context.commit('unsubscribeSecretDanceRecord');
    },
    async saveSecretDanceRecords(_, data) {
      await addDoc(collection(db, "secretDanceRecords"), data);
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
