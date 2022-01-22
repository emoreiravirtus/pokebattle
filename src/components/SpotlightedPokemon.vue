<template>
  <div class="spotlighted-pokemon-container">
        <div class="info-container">
            <div class="average" :style="{'background-image': gradientColor }">
                <p class="bold-font">
                    Overal power: {{ pokemon.data.base_experience }}
                </p>
            </div>
            <div class="main-image">
                <img :src="pokemon.data.sprites.other['official-artwork'].front_default">
            </div>
            <div class="image-container">
                <div v-for="(sprite, index) in pokemon.data.sprites"
                :key="index">
                    <span v-if="typeof sprite === 'string'">
                        <img :src="sprite">
                    </span>
                </div>
            </div>
            <div class="main-info-container">
                <div>
                    <p class="bold-font special-font" :style="{'background-image': gradientColor }">{{ pokemon.data.name }}</p>
                    <p class="normal-font special-font" 
                        v-for="(type, index) in pokemon.data.types"
                        :key="index" 
                        :style="{'background-image': gradientColor }">
                            {{ type.type.name }}
                    </p>
                </div>
                <div class="skills-container">
                    <div class="stat" v-for="(stat, index) in pokemon.data.stats" :key="index">
                        <p class="normal-font special-font" :style="{'background-image': gradientColor }">{{ stat.stat.name }}</p>
                        <progress-bar :progress="stat.base_stat"></progress-bar>
                    </div>
                </div>
            </div>
        </div>

        <button :style="{'background-image': gradientColor }" @click="turnSpotlightOff">
            <img src="@/assets/back-icon.png" alt="Back icon">
        </button>
  </div>
</template>

<script>
import { colorsEnum } from '@/utils/colors.js'
import ProgressBar from '@/components/ProgressBar.vue';

export default {
    name: 'SpotlightedPokemon',
    components: {
        ProgressBar
    },
    props: {
        pokemon: {
            type: Object,
            default: () => {
                return {
                    spotlighted: false,
                    data: {
                        sprites: {
                            '1': null,
                            '2': 'example'
                        }
                    }
                }
            }
        }
    },
    methods: {
        turnSpotlightOff() {
            this.$store.dispatch('turnSpotlightOff');
        }
    },
    computed: {
        gradientColor() {
            let pokemonType = this.pokemon.data.types[0].type.name;
            return 'linear-gradient(160deg, ' + colorsEnum[pokemonType] +' 0%, #480060 100%)';
        }
    }
}
</script>

<style lang="scss">
.spotlighted-pokemon-container {
    position: fixed;
    background-color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .average {
        position: absolute;
        top: 15px;
        right: 15px;
        background: #fff;
        padding: 0 30px;
        border-radius: 21px;
        box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
    }

    .info-container {
        display: flex;
        flex-direction: column;
        align-content: center;
    }

    .main-image {
        text-align: center;

        img {
            width: 400px;
        }
    }

    .image-container {
        padding: 0 10px;
        display: flex;
        flex-direction: row;
        overflow: auto;
        justify-content: space-between;
        animation: 1s linear pump forwards;
    }

    & p, & .progress-bar-container {
        opacity: 0;
        animation: 0.4s linear appear forwards;
    }

    .main-info-container {
        padding: 0 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .skills-container {
        padding: 10px;

        .stat {
            display: flex;
            justify-content: space-between;
            align-items: center;

            & > * {
                margin: 0 22px;
            }
        }
    }

    button {
        color: #fff;
        border: none;
        border-radius: 100%;
        width: 50px;
        text-align: center;
        box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
        position: absolute;
        top: 15px;
        height: 50px;
        left: 15px;
        cursor: pointer;

        img {
            width: 20px;
            height: 20px;
        }
    }
}

@keyframes appear {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes pump {
    0% {
        opacity: 0;
        transform: scale(1.2);
    }

    50% {
        opacity: .5;
        transform: scale(1.1);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>