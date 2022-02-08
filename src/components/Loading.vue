<template>
  <div class="loading-container" v-if="isLoading">
      <div class="image-container">
          <img src="@/assets/pokeball.png">
      </div>
  </div>
</template>

<script>
export default {
    name: 'Loading',
    computed: {
        isLoading() {
            return this.$store.getters['isLoading'];
        }
    }
}
</script>

<style lang="scss">
.loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("../assets/maze-white.png"), linear-gradient(160deg, red 0%, rgb(72, 0, 96) 100%);
    z-index: 10;
    
    .image-container {
        img {
            height: 40px;
            animation: 1s rotating infinite;
        }
    }
}


</style>