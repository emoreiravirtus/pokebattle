<template>
  <div class="home-outer-container">
    <div class="user-name-editor big-font">
      <p>Welcome</p>
      <input id="user-name-input" class="bold-font" maxlength="10" v-model="userName" @keyup="updateUserName">
      <img @click="focusOnUserName" src="@/assets/edit-icon.png">
    </div>
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
import menuBattleImage from '@/assets/menu-battle.png';
import menuPvpImage from '@/assets/menu-pvp.jpg';
import GeneralSquareCard from '@/components/GeneralSquareCard.vue';

export default {
  name: 'Home',
  components: {
    GeneralSquareCard
  },
  data() {
    return {
      userName: 'PokeMaster',
      menuItems: [
        {
          name: 'Pokedex',
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
          name: 'Offline Battle',
          image: menuBattleImage,
          route: '/',
          enabled: false
        },
        {
          name: 'PVP',
          image: menuPvpImage,
          route: '/',
          enabled: false
        }
      ]
    }
  },
  mounted() {
    let userName = localStorage.getItem('userName');
    if(userName) this.userName = userName
  },
  methods: {
    updateUserName() {
      localStorage.setItem('userName', this.userName);
    },
    focusOnUserName() {
      document.querySelector('#user-name-input').focus();
    }
  }
}
</script>

<style lang="scss">

.home-outer-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  
  .user-name-editor {
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      margin: 10px 0;
    }

    input {
      cursor: pointer;
      border: none;
      font-size: 28px;
      width: 168px;
      margin-left: 9px;
      text-align: center;
    }

    input:focus {
      outline: none;
    }

    img {
      height: 20px;
      margin-left: 5px;
      cursor: pointer;
    }
  }

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
