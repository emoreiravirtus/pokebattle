<template>
  <div class="search-box-container">
    <div class="input">
      <span class="search-icon">
        <img src="@/assets/search-icon.png" alt="Search Icon" />
      </span>
      <input
        class="search-box-input normal-font"
        @keydown.enter="searchPokemon"
        @input="suggestPokemonName"
        type="text"
        placeholder="E.g. Pikachu"
        v-model="searchTerm"
      />
      <button class="search-box-button normal-font" @click="searchPokemon">
        Go
      </button>
    </div>

    <ul class="autocomplete-results" v-if="suggestionsOpen">
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
      notFound: false,
      allPokemonNames: pokemon.all(),
      suggestions: [],
      suggestionsOpen: false,
    };
  },
  methods: {
    async searchPokemon() {
      await this.$store.dispatch("searchSpecificPokemon", this.searchTerm).then(
        () => {
          this.searchTerm = null;
        },
        (error) => {
          console.log(error);
          this.notFount = true;
        }
      );
    },
    filterResults() {
      console.log(this.allPokemonNames);
      this.suggestions = this.allPokemonNames.filter((item) => {
        return item.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    },
    suggestPokemonName() {
      this.filterResults();
      this.suggestionsOpen = true;
    },
    setSearchTerm(suggestion) {
      this.searchTerm = suggestion.toLowerCase();
      this.searchPokemon();
      this.suggestionsOpen = false;
    },
  },
};
</script>

<style lang="scss">
.search-box-container {
  display: flex;
  justify-content: center;
  position: relative;

  .input {
    z-index: 2;

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
    width: 360px;

    li:nth-child(odd) {
      cursor: pointer;
      background-color: #fafafa;
      color: #333;
      list-style: none;
      padding: 10px 0;
    }

    li:hover > * {
        background-image: linear-gradient(160deg, rgb(110, 68, 255) 0%, rgb(72, 0, 96) 100%);
    }
  }
}
</style>