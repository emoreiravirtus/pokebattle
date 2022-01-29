<template>
  <div class="search-box-container">
    <div class="input">
      <span class="search-icon">
        <img src="@/assets/search-icon.png" alt="Search Icon" />
      </span>
      <input
        class="search-box-input normal-font"
        type="text"
        placeholder="E.g. Pikachu"
        v-model="searchTerm"
      />
      <p class="reset-input bold-font" v-if="searchTerm" @click="reset">X</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "SearchBox",
  data() {
    return {
      searchTerm: null
    };
  },
  mounted() {
    this.searchTerm = this.$store.getters['searchTerm'];
  },
  methods: {
    setSearchTerm(suggestion) {
      this.searchTerm = suggestion;
      this.suggestions = null;
    },
    reset() {
      this.searchTerm = null;
      this.$store.dispatch('updateSearchTerm', null);
    }
  },
  computed: {
    allPokemonNames() {
      return this.$store.getters['pokemonNames'];
    }
  },
  watch: {
    searchTerm() {
      this.$store.dispatch('updateSearchTerm', this.searchTerm);
    }
  }
};
</script>

<style lang="scss">
.search-box-container {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
  
  .reset-input {
    color: #aaaaaa;
    cursor: pointer;
    top: -6px;
    right: 6px;
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
        width: 25px;
        height: 25px;
        transform: scale(-1, 1);
      }
    }
  }
}
</style>