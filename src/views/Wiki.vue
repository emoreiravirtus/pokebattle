<template>
  <div class="wiki-container" v-if="pokemons">
    <search-box class="search-position"></search-box>
    <filter-wiki @changeFilters="changeFilters"></filter-wiki>
    <div class="pokemons-container">
      <p class="bold-font" v-if="searchTerm || typesFiltered.length">
        {{ filteredPokemons.length }} Pokémon found
      </p>
      <pokecard
        v-for="(pokemon, index) in filteredPokemons"
        :key="index"
        :pokemon="pokemon"
        :indexNumber="index"
      ></pokecard>
    </div>
    <div class="arrow-left" @click="previousPage" v-if="previousFilteredPokemons">
      <div class="left"></div>
    </div>
    <div class="arrow-right" @click="nextPage" v-if="nextFilteredPokemons">
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import Pokecard from "@/components/Pokecard.vue";
import SearchBox from "@/components/SearchBox.vue";
import FilterWiki from "@/components/FilterWiki.vue";

export default {
  name: "Wiki",
  components: {
    Pokecard,
    SearchBox,
    FilterWiki
  },
  data() {
    return {
      typesFiltered: []
    }
  },
  methods: {
    previousPage() {
      if (this.currentIndex == 0) {
        this.$store.dispatch('updateCurrentIndex', this.pokemons.length - 10);
      }
      else {
        this.$store.dispatch('updateCurrentIndex', this.currentIndex - 10);
      }
    },
    nextPage() {
      if (this.currentIndex == this.pokemons.length - 10) {
        this.$store.dispatch('updateCurrentIndex', 0);
      }
      else {
        this.$store.dispatch('updateCurrentIndex', this.currentIndex + 10);
      }
    },
    changeFilters(types) {
      let tempList = [];
      for(let type of types) {
        if(type[Object.keys(type)[0]]) tempList.push(Object.keys(type)[0])
      }
      this.typesFiltered = tempList;
    }
  },
  computed: {
    pokemons() {
      return this.$store.getters["allPokemons"];
    },
    previousFilteredPokemons() {
      if (this.searchTerm || this.typesFiltered.length > 0) return 0;
      return (this.pokemons.slice(this.currentIndex - 10, this.currentIndex)).length;
    },
    filteredPokemons() {
      let tempPokemons = this.pokemons;

      if(!this.searchTerm && this.typesFiltered.length == 0) {
        return tempPokemons.slice(this.currentIndex, this.currentIndex + 10);
      }

      if(this.typesFiltered.length > 0) {
        tempPokemons = tempPokemons.filter(item => this.typesFiltered.includes(item.types[0].type.name))
      }

      if (this.searchTerm){
        tempPokemons = tempPokemons.filter(item => item.name.indexOf(this.searchTerm) >= 0)
      }

      return tempPokemons
    },
    nextFilteredPokemons() {
      if (this.searchTerm || this.typesFiltered.length > 0) return 0;
      return (this.pokemons.slice(this.currentIndex + 10, this.currentIndex + 20)).length;
    },
    currentIndex() {
      return this.$store.getters['currentIndex']
    },
    searchTerm() {
      return this.$store.getters['searchTerm'];
    }
  },
};
</script>

<style lang="scss">
.search-position {
  position: fixed;
  top: 10px;
  right: calc(50vw - 189px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wiki-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;

  .pokemons-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 500px;
    position: relative;
    align-items: center;
  }

  .arrow-left {
    position: fixed;
    height: 60px;
    width: 60px;
    top: calc(50vh - 60px);
    transform: rotate(45deg);
    left: 5px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgb(0 0 0 / 79%) 0px 7px 17px 0px;
    animation: none !important;

    .left {
      height: 10px;
      width: 10px;
      border-left: 7px solid #2196f3;
      border-bottom: 7px solid #2196f3;
    }
  }

  .arrow-right {
    position: fixed;
    height: 60px;
    width: 60px;
    top: calc(50vh - 60px);
    transform: rotate(-45deg);
    right: 5px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgb(0 0 0 / 79%) 0px 7px 17px 0px;
    animation: none !important;

    .right {
      height: 10px;
      width: 10px;
      border-right: 7px solid #2196f3;
      border-bottom: 7px solid #2196f3;
    }
  }

  .gray {
    border-left-color: #92959c !important;
    border-right-color: #92959c !important;
    border-bottom-color: #92959c !important;
  }
}
</style>
