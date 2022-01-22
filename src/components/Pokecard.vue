<template>
    <div class="card" :style="{ 'background-image': gradientColor }" @click="spotlightPokemon">
        <div class="image-container">
            <img :src="pokemon.sprites.front_default" :alt="pokemon.name + 'image'">
        </div>
        <div class="info-container">
            <p class="bold-font">{{ pokemon.name }}</p>
            <div class="main-info-container">
                <div class="types-container">
                    <p class="normal-font" 
                        v-for="(type, index) in pokemon.types"
                        :key="index">
                            {{ type.type.name }}
                    </p>
                </div>
                <div class="skills-container">
                    <div class="stat" v-for="(stat, index) in pokemon.stats.slice(0, 3)" :key="index">
                        <p class="small-font">{{ stat.stat.name }}</p>
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
        }
    },
    methods: {
        spotlightPokemon() {
            document.querySelector('.card').focus;
            setTimeout(() => {
                this.$store.dispatch('spotlightPokemon', this.pokemon);
            }, 1000);
        }
    },
    computed: {
        gradientColor() {
            let pokemonType = this.pokemon.types[0].type.name;
            return 'linear-gradient(160deg, ' + colorsEnum[pokemonType] +' 0%, #480060 100%)';
        }
    }
}
</script>

<style lang="scss">
.card {
    border-radius: 10px;
    margin: 10px 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    transition: transform .4s;

    &:hover {
        transform: scale(1.1);
    }

    &:hover img {
        transform: skew(-12deg) scale(1.5);
    }


    .image-container {
        background-color: #fff;
        text-align: center;
        border-radius: 8px 0 0 8px;

        img {
            transition: all .8s;
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
</style>