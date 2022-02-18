<template>
  <div class="mini-games-outer-container">
    <div class="mini-games-container">
        <router-link :to="item.route" v-for="(item, index) of menuItems" :key="index">
          <general-square-card :text="item.name" :image="item.image" :enabled="item.enabled"></general-square-card>
        </router-link>
    </div>
  </div>
</template>

<script>
import secretDanceImage from '@/assets/games-who.jpg';
import tikTakToeImage from '@/assets/games-tik-tak-toe.jpg';
import GeneralSquareCard from '@/components/GeneralSquareCard.vue';

export default {
    name: 'MiniGames',
    components: {
        GeneralSquareCard
    },
    data() {
        return {
        menuItems: [
            {
            name: 'Secret Dance',
            image: secretDanceImage,
            route: '/secret-dance',
            enabled: true
            },
            {
            name: 'Tik tak toe',
            image: tikTakToeImage,
            route: '/mini-games',
            enabled: false
            }
        ]
        }
    }
    }
    </script>

    <style lang="scss">

    .mini-games-outer-container {
    display: flex;
    justify-content: center;

    .mini-games-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;

        & > * {
        margin: 10px;
        }
    }
    }

    </style>
