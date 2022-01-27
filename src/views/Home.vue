<template>
  <div class="home-outer-container">
    <div class="home-container">
        <router-link :to="item.route" v-for="(item, index) of menuItems" :key="index">
          <general-square-card :text="item.name" :image="item.image" :enabled="item.enabled"></general-square-card>
        </router-link>
    </div>
  </div>
</template>

<script>
import menuMiniGamesImage from '@/assets/menu-games.jpg';
import menuWikiImage from '@/assets/menu-wiki.png';
import menuBattleImage from '@/assets/menu-battle.jpg';
import GeneralSquareCard from '@/components/GeneralSquareCard.vue';

export default {
  name: 'Home',
  components: {
    GeneralSquareCard
  },
  data() {
    return {
      menuItems: [
        {
          name: 'Wiki',
          image: menuWikiImage,
          route: '/wiki',
          enabled: true
        },
        {
          name: 'Mini Games',
          image: menuMiniGamesImage,
          route: '/mini-games',
          enabled: true
        },
        {
          name: 'Battle',
          image: menuBattleImage,
          route: '/',
          enabled: false
        }
      ]
    }
  }
}
</script>

<style lang="scss">

.home-outer-container {
  display: flex;
  justify-content: center;

  .home-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    & > * {
      margin: 10px;
    }
  }
}

</style>
