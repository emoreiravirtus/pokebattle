<template>
  <div class="wiki-container" v-if="pokemons">
    <search-box class="search-position"></search-box>
    <div class="pokemons-container">
      <pokecard
        v-for="(pokemon, index) in pokemons"
        :key="index"
        :pokemon="pokemon"
        :indexNumber="index"
      ></pokecard>
    </div>
    <div class="button-wrapper" @click="loadMorePokemons">
      <button class="load-more-button bold-font">
        <p class="special-font">Load More</p>
      </button>
    </div>
  </div>
</template>

<script>
import Pokecard from "@/components/Pokecard.vue";
import SearchBox from "@/components/SearchBox.vue";

export default {
  name: "Wiki",
  components: {
    Pokecard,
    SearchBox,
  },
  data() {
    return {
      pokemons: []
    }
  },
  mounted() {
    this.$store.dispatch("populatePokemons")
      .then(() => {
        this.pokemons = this.$store.getters["allPokemons"];
    });
  },
  beforeUnmount() {
    this.$store.dispatch("cleanPokemons");
  },
  methods: {
    loadMorePokemons() {
      this.$store.dispatch("populatePokemons", false);
    },
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

  .pokemons-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 500px;
  }

  .button-wrapper {
    background: linear-gradient(160deg, #6e44ff 0%, #480060 100%);
    position: relative;
    padding: 3px;
    border-radius: 25px;
    max-width: 151px;

    .load-more-button {
      background: #fff;
      padding: 0 30px;
      border: none;
      border-radius: 21px;
      box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
      cursor: pointer;

      & * {
        background-image: linear-gradient(
          160deg,
          rgb(110, 68, 255) 0%,
          rgb(72, 0, 96) 100%
        );
      }
    }
  }
}
</style>
