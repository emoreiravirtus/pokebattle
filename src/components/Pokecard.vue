<template>
    <div class="pokecard" :style="[cssVars]" @click="spotlightPokemon">
        <div class="image-container">
            <img v-if="pokemon.sprites.front_default" :src="pokemon.sprites.front_default">
            <img id="question-image" v-else src="@/assets/question-icon.png">
        </div>
        <div class="info-container">
            <p class="bold-font white-color">{{ pokemon.name }}</p>
            <div class="main-info-container">
                <div class="types-container">
                    <p class="normal-font white-color"
                        v-for="(type, index) in pokemon.types"
                        :key="index">
                            {{ type.type.name }}
                    </p>
                </div>
                <div class="skills-container">
                    <div class="stat" v-for="(stat, index) in pokemon.stats.slice(0, 3)" :key="index">
                        <p class="small-font white-color">{{ stat.stat.name }}</p>
                        <progress-bar :progress="stat.base_stat"></progress-bar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { colorsEnum } from '@/utils/colors.js'
import ProgressBar from '@/components/ProgressBar.vue'

export default {
    name: 'PokemonCard',
    components: {
        ProgressBar
    },
    props: {
        pokemon: {
            type: Object,
            default: () => {
                return { name: 'Pikachu' };
            }
        },
        indexNumber: {
            type: Number,
            default: () => {
                return 0;
            }
        }
    },
    methods: {
        spotlightPokemon() {
            document.querySelectorAll('.pokecard img')[this.indexNumber].style = 'animation: 2s ease-in breath infinite';
            setTimeout(() => {
                this.$router.push({name: 'SpotlightedPokemon', params: { id: this.pokemon.id} })
                document.querySelectorAll('.pokecard img')[this.indexNumber].style = 'animation: unset';
            }, 1000);
        }
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
.pokecard {
    border-radius: 10px;
    margin: 10px 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    transition: transform .4s;
    z-index: 0;

    background-image: url("https://www.transparenttextures.com/patterns/maze-white.png"), linear-gradient(160deg, var(--type-color) 0%, rgb(72, 0, 96) 100%);

    &:hover {
        transform: scale(1.1);
    }

    


    .image-container {
        background-color: #fff;
        text-align: center;
        border-radius: 8px 0 0 8px;
        
        img {
            transition: all .8s;
        }

        #question-image {
            width: 22px;
            height: 31px;
            margin: 33px;
        }
    }

    .info-container {
        display: flex;
        flex-direction: column;
        width: 100%;

        & > p {
            padding: 10px 0 0 10px;
            margin: 0;
        }

        .main-info-container {
            padding: 0 10px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .types-container {
                display: flex;
                flex-direction: column;
                justify-content: center;

                p {
                    margin: 0;
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
}

@keyframes breath {
    0%{
        transform: skew(0deg) scale(1);
    }

    10% {
        transform: translateY(-30px) scale(1.4);
        -webkit-filter: drop-shadow(18px -1px 0px var(--type-color));
        filter: drop-shadow(18px -1px 0px var(--type-color));
    }

    15% {
        transform: translateY(0px) scale(1.4);
        -webkit-filter: drop-shadow(18px -1px 0px var(--type-color));
        filter: drop-shadow(18px -1px 0px var(--type-color));
    }

    25% {
        transform: skew(10deg) translateY(0px) translateX(0px) scale(1.4);
        -webkit-filter: drop-shadow(40px -1px 0px var(--type-color));
        filter: drop-shadow(40px -1px 0px var(--type-color));
    }

    40% {
        transform: skew(0deg) translateY(0px) scale(1.4);
        -webkit-filter: drop-shadow(8px -1px 0px #fff);
        filter: drop-shadow(8px -1px 0px #fff);
    }

    50% {
        transform: skew(4deg) translateY(0px) scale(1.4);
        -webkit-filter: drop-shadow(8px -1px 0px var(--type-color));
        filter: drop-shadow(8px -1px 0px var(--type-color));
    }

    75% {
        transform: translateY(-20px) scale(1.4);
    }

    100% {
        transform: skew(0deg) scale(1);
    }
}
</style>