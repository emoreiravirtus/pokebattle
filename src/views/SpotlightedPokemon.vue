<template>
  <div class="spotlighted-pokemon-container" :style="cssVars" v-if="pokemon">
        <div class="pokemon-wave"></div>
        <div class="info-container">
            <div class="main-image">
                <img :src="pokemon.sprites.other['official-artwork'].front_default">
            </div>
                <p class="big-font special-font centralize-text" :style="{'background-image': gradientColor }">{{ pokemon.name }}</p>
            <ul class="normal-font white-color centralize-text">
                <li v-for="(tab, index) of tabs" :key="index" @click="changeSelectedTab(tab)" 
                    :class="{'active': tab == selectedTab, 'darker': tab != selectedTab}">
                    {{ tab }}
                </li>
            </ul>
            <div class="info-tab-container">
                <div class="general-info-container" v-if="selectedTab == 'general'">
                    <div class="types-container">
                        <p class="normal-font white-color" 
                            v-for="(type, index) in pokemon.types"
                            :key="index" 
                            :style="{'background-image': getGradientColor(type.type.name)}">
                                {{ type.type.name }}
                        </p>
                    </div>
                    <div class="skills-container">
                        <div class="stat" v-for="(stat, index) in pokemon.stats" :key="index">
                            <p class="normal-font special-font" :style="{'background-image': gradientColor }">{{ stat.stat.name }}</p>
                            <progress-bar :progress="stat.base_stat"></progress-bar>
                        </div>
                    </div>
                </div>
                <div class="sprites-container" v-if="selectedTab == 'sprites'">
                    <div v-for="(sprite, index) in pokemon.sprites"
                    :key="index">
                        <span v-if="typeof sprite === 'string'">
                            <img :src="sprite">
                        </span>
                    </div>
                </div>
            </div>
        </div>
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
            pokemon: null,
            selectedTab: 'general',
            tabs: [
                'general',
                'sprites',
                'evolution'
            ]
        }
    },
    async beforeCreate() {
        this.pokemon = await this.$store.dispatch('getPokemon', this.$route.params.id);
    },
    mounted() {
        this.$store.dispatch('stopLoading');
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
        },
    },
    computed: {
        gradientColor() {
            let pokemonType = this.pokemon.types[0].type.name;
            return 'linear-gradient(160deg, ' + colorsEnum[pokemonType] +' 0%, #480060 100%)';
        },
        cssVars() {
            let pokemonType = this.pokemon.types[0].type.name;
            return {
                '--type-color': colorsEnum[pokemonType]
            }
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

    .pokemon-wave{
        position: absolute;
        width: 100%;
        height: 331px;
        background-color: var(--type-color);
        background-image: url("../assets/diagmonds.png"), linear-gradient(160deg, var(--type-color) 0%, rgb(72, 0, 96) 100%);
        top: 0;
        z-index: -1;
        clip-path: ellipse(100% 55% at 48% 44%);
    }

    .main-image {
        text-align: center;

        img {
            width: 400px;
            animation: 6s linear iddle infinite;
        }
    }

    .info-container {
        display: flex;
        flex-direction: column;
        align-content: center;

        .big-font {
            margin: 10px 0;
            text-transform: capitalize;
        }
    }

     ul {
        list-style: none;
        padding: 0 0px 5px 10px;
        margin: 0;
        
        .active {
            z-index: 3;
        }

        li {
            transition: all .4s;
            display: inline;
            cursor: pointer;
            padding: 5px 12px;
            border-radius: 18px 18px 0 0;
            position: relative;
            background-color: var(--type-color);
            margin: 0 16px;
            z-index: 2;

            &:before,
            &:after {
            content: " ";
                position: absolute;
                top: 0;
                width: 23px;
                height: 100%;
                background-color: inherit;
                transform: translate3d(1px);
                z-index: -1;
            }

            &:before {
                border-radius: 12px 0 0 0;
                transform: skew(-24deg);
                left: -13px;
            }

            &:after {
                border-radius: 0 12px 0 0;
                transform: skew(24deg);
                right: -13px;
                border-right: 1px solid inherit;
                z-index: 1;
            }
        }
    }

    .info-tab-container {
        display: flex;
        justify-content: center;
        border-radius: 50px 50px 0 0;
        border-top: 4px solid #dbdbdb;
        height: 170px;
        background: white;

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

@keyframes iddle {
  0% { transform: rotate(2deg); filter: drop-shadow(5px -5px 6px ) }
  25% { transform: rotate(-2deg) translateX(-1px) skew(2deg, 3deg); filter: drop-shadow(5px -5px 6px )  }
  50% { transform: rotate(2deg); filter: drop-shadow(-57px -54px 100px var(--type-color))  }
  75% { transform: rotate(-2deg) translateX(1px); filter: drop-shadow(5px -5px 6px )  }
  100% { transform: rotate(2deg); filter: drop-shadow(5px -5px 6px )  }
}
</style>