<template>
    <div class="card" :style="{
    'background-image': 'linear-gradient(160deg, ' + gradientColor +' 0%, #480060 100%)'
    }">
        <div class="image-container">
            <img :src="pokemon.sprites.front_default" alt="">
        </div>
        <div class="info-container">
            <p class="bold-font">{{ pokemon.name }}</p>
            <div class="main-info-container">
                <p class="normal-font">{{ pokemon.types[0].type.name }}</p>
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
    computed: {
        gradientColor() {
            let pokemonType = this.pokemon.types[0].type.name;
            return colorsEnum[pokemonType];
        }
    }
}
</script>

<style>
</style>