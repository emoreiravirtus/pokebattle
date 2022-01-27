<template>
  <div class="title-container" v-if="currentRouteName == 'Home' || currentRouteName == 'MiniGames'">
    <img src="@/assets/pokeball.png">
    <p class="centralize-text">Poke<span style="color: #ff5c73">PI<span style="transform: rotate(5deg)">π</span></span></p>
  </div>
  <router-view/>
  <button class="back-button" v-if="currentRouteName !== 'Home'" @click="goBack">
    <img src="@/assets/back-icon.png" alt="Back icon">
  </button>
  <sound-player></sound-player>
  <loading></loading>
</template>

<script>
import SoundPlayer from '@/components/SoundPlayer.vue';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    SoundPlayer,
    Loading
  },
  data() {
    return {
      allViewsContainersClass : [
        '.spotlighted-pokemon-container',
        '.wiki-container',
        '.home-outer-container',
        '.secret-pokemon-outer-container'
      ]
    }
  },
  methods: {
    goBack() {
      this.makeSlideAnimation('left-disappear');
      setTimeout(async () => {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
        await this.sleep(7);
        this.makeSlideAnimation('right-appear');
      }, 500);
    },
    makeSlideAnimation(direction) {
      this.allViewsContainersClass.forEach(container => {
        if(document.querySelector(container)) {
          let children = document.querySelector(container).childNodes;
          children.forEach(el => {
            el.style = `animation: .5s ease-in slide-${direction} forwards`;
          });
        }
      })
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Paytone+One&display=swap');
@import "./style.scss";

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Paytone One', sans-serif;
  font-size: 43px;

  img {
    height: 40px;
  }
} 
</style>
