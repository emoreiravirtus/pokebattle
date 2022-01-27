<template>
    <div class="audio-button" @click="toggleMuted()">
        <div class="sound-off" v-if="muted"></div>
        <img src="@/assets/sound-on.png">
    </div>
    <audio v-if="(currentRouteName == 'Home' || currentRouteName == 'MiniGames') && !muted" autoplay loop>
        <source src="@/assets/home-music.mp3" type="audio/mp3">
    </audio>
    <audio v-if="currentRouteName == 'SecretDance' && !muted" autoplay loop>
        <source src="@/assets/who-music.mp3" type="audio/mp3">
    </audio>
    <audio v-if="(currentRouteName == 'Wiki' || currentRouteName == 'SpotlightedPokemon') && !muted" autoplay loop>
        <source src="@/assets/wiki-music.mp3" type="audio/mp3">
    </audio>
</template>

<script>
export default {
    name: 'SoundPlayer',
    methods: {
        toggleMuted() {
            this.$store.dispatch('toggleMuted');
        }
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        },
        muted() {
            return this.$store.getters['muted'];
        }
    }
}
</script>

<style lang="scss">
.audio-button {
    position: fixed;
    bottom: 15px;
    right: 10px;
    cursor: pointer;
    z-index: 5;

    img {
        height: 30px;
        filter: invert(68%) sepia(8%) saturate(271%) hue-rotate(184deg) brightness(88%) contrast(80%);
    }

    .sound-off{
        width: 4px;
        height: 39px;
        background: #92959c;
        position: absolute;
        transform: rotate(312deg);
        right: 13px;
        bottom: -2px;
    }
}
</style>