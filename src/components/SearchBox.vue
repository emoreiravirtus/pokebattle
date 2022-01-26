<template>
  <div class="search-box-container">
    <div class="input">
      <span class="search-icon">
        <img src="@/assets/search-icon.png" alt="Search Icon" />
      </span>
      <input
        class="search-box-input normal-font"
        :class="{'error': notFound}"
        type="text"
        placeholder="E.g. Pikachu"
        v-model="searchTerm"
      />
      <p class="reset-input bold-font" v-if="searchTerm" @click="reset">X</p>
      <button class="search-box-button normal-font" @click="checkPokemonName()">
        Go
      </button>
    </div>

    <ul class="autocomplete-results" v-if="suggestions">
      <li
        class="autocomplete-result normal-font"
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="setSearchTerm(suggestion)"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<script>
import pokemon from "pokemon";

export default {
  name: "SearchBox",
  data() {
    return {
      searchTerm: null,
      allPokemonNames: pokemon.all(),
      suggestions: null,
      notFound: false
    };
  },
  methods: {
    async searchPokemon(autocomplete = false) {
      let pokemonName = autocomplete ? pokemonName = this.suggestions[0] : this.searchTerm;

      await this.$store.dispatch("searchSpecificPokemon", pokemonName.toLowerCase())
      this.searchTerm = null;
      this.suggestions = null;
      this.notFound = false;
    },
    filterResults() {
      let result = this.allPokemonNames.filter((item) => {
        return item.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
      result ? this.suggestions = result : this.suggestions = null;
    },
    suggestPokemonName() {
      this.filterResults();
    },
    setSearchTerm(suggestion) {
      this.searchTerm = suggestion.toLowerCase();
      this.searchPokemon();
    },
    reset() {
      this.searchTerm = null;
      this.suggestions = null;
      this.notFound = false;
    },
    checkPokemonName() {
      this.filterResults();

      this.suggestions.length > 0 ? this.searchPokemon(true) : this.notFound = true;
    }
  },
  watch: {
    searchTerm() {
      if ( this.searchTerm ) {
        this.suggestPokemonName();
      }
    }
  }
};
</script>

<style lang="scss">
.error {
  border: 2px solid red !important; 
}

.search-box-container {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
  
  .reset-input {
    color: #aaaaaa;
    cursor: pointer;
    top: -6px;
    right: 60px;
    position: absolute;
    border: none;
    width: 15px;
    height: 15px;
    border-radius: 10px;
  }

  .input {

    .search-box-input {
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      border: none;
      height: 40px;
      border-radius: 10px;
      font-weight: 400;
      width: 240px;
      color: #aaaaaa;
      padding: 0 60px;
      font-size: 16px;

      @media (max-width: 480px), (min-width: 481px) and (max-width: 767px) {
        width: 140px;
      }

      &::placeholder {
        color: #aaa;
      }

      &:focus-visible,
      &:focus {
        border: 1px solid #aaa;
      }
    }

    .search-icon {
      top: calc(21px - 15px);
      left: 10px;
      position: absolute;
      border: none;
      color: #fff;
      border-radius: 10px;
      overflow: hidden;

      & img {
        width: 30px;
        height: 30px;
        transform: scale(-1, 1);
      }
    }

    .search-box-button {
      cursor: pointer;
      top: calc(21px - 15px);
      right: 10px;
      position: absolute;
      background-color: #2196f3;
      border: none;
      width: 30px;
      height: 30px;
      color: #fff;
      border-radius: 10px;
    }
  }

  ul {
    background: #fff;
    margin: -10px;
    padding: 29px 0 0 0;
    width: 100%;

    li {
      padding: 0 46px;
    }

    li:nth-child(odd) {
      cursor: pointer;
      background-color: #fafafa;
      color: rgb(63, 57, 57);
      list-style: none;
    }

    li:hover > * {
        background-image: linear-gradient(160deg, rgb(110, 68, 255) 0%, rgb(72, 0, 96) 100%);
    }
  }
}
</style>