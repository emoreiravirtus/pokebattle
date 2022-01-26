<template>
  <router-view/>
  <button class="back-button" v-if="currentRouteName !== 'Home'" @click="goBack">
    <img src="@/assets/back-icon.png" alt="Back icon">
  </button>
</template>

<script>
export default {
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
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
  @import "./style.scss";
</style>
