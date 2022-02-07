<template>
  <div class="spotlighted-pokemon-container" :style="cssVars" v-if="pokemon">
        <div class="pokemon-wave"></div>
        <div class="info-container">
            <div class="main-image">
                <img :src="pokemon.sprites.other['official-artwork'].front_default" @click="cry()">
                <div id="chat-box" v-if="cried"><p class="big-font">{{ pokemon.name }}!</p></div>
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
                <div class="evolutions-container" v-if="selectedTab == 'evolutions'">
                    <div class="time-line">
                        <div id="step" v-for="(pokemon, index) in (evolutions.length - 1)" :key="index"></div>
                    </div>
                    <div>
                        <pokecard
                            v-for="(pokemon, index) in evolutions"
                            :key="index"
                            :pokemon="pokemon"
                            :indexNumber="index"
                        ></pokecard>
                    </div>
                </div>
            </div>
        </div>
        <audio id="PokemonCry">
            <source src="src/assets/pikachu.mp3" type="audio/mp3">
        </audio>
  </div>
</template>

<script>
import { colorsEnum } from '@/utils/colors.js'
import ProgressBar from '@/components/ProgressBar.vue';
import Pokecard from "@/components/Pokecard.vue";

export default {
    name: 'SpotlightedPokemon',
    components: {
        ProgressBar,
        Pokecard
    },
    data() {
        return {
            pokemon: null,
            evolutions: null,
            cried: false,
            selectedTab: 'general',
            tabs: [
                'general',
                'evolutions',
                'sprites'
            ]
        }
    },
    async beforeMount() {
        this.$store.dispatch('startLoading');
        this.pokemon = await this.$store.dispatch('getPokemon', this.$route.params.id);
        this.evolutions = await this.$store.dispatch('getEvolutions', this.$route.params.id)
        setTimeout(() => {
            this.$store.dispatch('stopLoading')
        }, 1000);
    },
    methods: {
        cry() {
            this.cried = true;
            setTimeout(() => {
                this.cried = false;
            }, 2000);
            let player = new Audio(this.pokemonCry);
            player.play();
        },
        changeSelectedTab(newTab) {
            this.selectedTab = newTab;
        },
        getGradientColor(type) {
            return 'linear-gradient(160deg, ' + colorsEnum[type] +' 0%, #480060 100%)';
        },
    },
    computed: {
        pokemonCry() {
            return '../assets/' + this.pokemon.name + '.mp3';
        },
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
    },
    watch: {
    async '$route.params'() {
        this.pokemon = await this.$store.dispatch('getPokemon', this.$route.params.id);
        this.evolutions = await this.$store.dispatch('getEvolutions', this.$route.params.id);
        this.selectedTab = 'general'
    }
    }
}
</script>

<style lang="scss">

.spotlighted-pokemon-container {
    background-color: #fff;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 20px;

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
        position: relative;

        #chat-box {
            position: absolute;
            padding: 20px;
            background: #fff;
            border: 1px solid;
            border-radius: 53px;
            top: 15px;
            left: 20vw;
            animation: 2s linear chat infinite;
        }

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

        .evolutions-container {
            display: flex;
            height: 70vh;

            .time-line {
                padding: 20px;
                margin-top: 43px;
            
                #step {
                    height: 100px;
                    width: 7px;
                    background: var(--type-color);
                    border-radius: 10px;
                    position: relative;
                    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                }

                #step::before {
                    content: "";
                    width: 15px;
                    height: 15px;
                    background: white;
                    top: -9px;
                    left: -8px;
                    border-radius: 20px;
                    border: 4px solid var(--type-color);
                    position: absolute;
                    box-shadow: rgb(100 100 111) 0px 7px 29px 0px;
                }

                #step:last-child::after {
                    content: "";
                    width: 15px;
                    height: 15px;
                    background: white;
                    bottom: -21px;
                    left: -8px;
                    border-radius: 20px;
                    border: 4px solid var(--type-color);
                    position: absolute;
                    box-shadow: rgb(100 100 111) 0px 7px 29px 0px;
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
  25% { transform: rotate(-2deg) translateX(-1px); filter: drop-shadow(5px -5px 6px )  }
  30% { transform: rotate(-4deg); filter: drop-shadow(0 0 10px var(--type-color));  }
  60% { transform: rotate(-9deg) translateY(-20px); filter: drop-shadow(0 0 10px var(--type-color)) brightness(120%);  }
  75% { transform: rotate(-2deg) translateX(1px); filter: drop-shadow(5px -5px 6px )  }
  100% { transform: rotate(2deg); filter: drop-shadow(5px -5px 6px )  }
}
@keyframes chat {
  0% { transform: rotate(-2deg); filter: drop-shadow(5px -5px 6px ); opacity: 0  }
  25% { transform: rotate(2deg) translateX(1px); filter: drop-shadow(5px -5px 6px ); opacity: 1  }
  30% { transform: rotate(9deg) translateY(3px); filter: drop-shadow(0 0 60px); opacity: 1  }
  60% { transform: rotate(4deg); filter: drop-shadow(0 0 10px); opacity: 1  }
  75% { transform: rotate(2deg) translateX(-1px); filter: drop-shadow(5px -5px 6px ); opacity: 1  }
  100% { transform: rotate(-2deg); filter: drop-shadow(5px -5px 6px ); opacity: 0 }
}
</style>