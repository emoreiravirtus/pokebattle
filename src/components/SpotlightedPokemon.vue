<template>
  <div class="spotlighted-pokemon-container">
        <div class="pokemon-wave" :style="{'background-image': gradientColor }"></div>
        <div class="info-container">
            <div class="average">
                <p class="bold-font white-color special-font" :style="{'background-image': gradientColor }">
                    Power: {{ pokemon.data.base_experience }}
                </p>
            </div>
            <div class="main-image">
                <img :src="pokemon.data.sprites.other['official-artwork'].front_default">
            </div>
                <p class="big-font special-font" :style="{'background-image': gradientColor }">{{ pokemon.data.name }}</p>
            <ul class="normal-font white-color">
                <li @click="changeSelectedTab('general')" 
                    :style="{'background-image': gradientColor}">
                    General
                </li>
                <li @click="changeSelectedTab('sprites')" 
                     :style="{'background-image': gradientColor}">
                    Sprites
                </li>
            </ul>
            <div class="info-tab-container">
                <div class="general-info-container" v-if="selectedTab == 'general'">
                    <div class="types-container">
                        <p class="normal-font white-color" 
                            v-for="(type, index) in pokemon.data.types"
                            :key="index" 
                            :style="{'background-image': getGradientColor(type.type.name)}">
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
                <div class="sprites-container" v-if="selectedTab == 'sprites'">
                    <div v-for="(sprite, index) in pokemon.data.sprites"
                    :key="index">
                        <span v-if="typeof sprite === 'string'">
                            <img :src="sprite">
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <button class="back-button" :style="{'background-image': gradientColor }" @click="turnSpotlightOff">
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
    data() {
        return {
            selectedTab: 'general',
        }
    },
    props: {
        pokemon: {
            type: Object,
            default: () => {
                return {
                    spotlighted: false,
                    data: {
                        sprites: {
                            '1': 'example'
                        }
                    }
                }
            }
        }
    },
    beforeCreate() {
        document.querySelector('html').style.overflow = 'hidden';
    },
    methods: {
        turnSpotlightOff() {
            document.querySelector('html').style.overflow = 'unset';
            this.$store.dispatch('turnSpotlightOff');
        },
        changeSelectedTab(newTab) {
            this.selectedTab = newTab;
        },
        getGradientColor(type) {
            return 'linear-gradient(160deg, ' + colorsEnum[type] +' 0%, #480060 100%)';
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

    .pokemon-wave{
        position: absolute;
        width: 100%;
        height: 331px;
        background: #03a9f4;
        top: 0;
        z-index: -1;
        clip-path: ellipse(100% 55% at 48% 44%);
    }

    .main-image {
        text-align: center;

        img {
            width: 350px;
            filter: drop-shadow(5px -5px 6px );
            animation: 1s linear pump forwards;
        }
    }

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

        .big-font {
            padding: 0 10px;
            text-transform: capitalize;
        }
    }

     ul {
        list-style: none;
        padding: 0 0px 5px 10px;
        margin: 0;
        border-bottom: 1px solid rgb(150, 150, 150);
        
        li {
            display: inline;
            margin: 0 10px 0 0;
            cursor: pointer;
            padding: 5px 20px;
            border-radius: 32px 32px 0 0;
        }
    }

    .info-tab-container {

        .sprites-container {
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

        .general-info-container {
            padding: 0 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .types-container {
                display: flex;
                align-items: center;
                flex-wrap: wrap;

                & > * {
                    padding: 6px;
                    border-radius: 10px;
                    margin: 0 0 0 3px;
                }
            }
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