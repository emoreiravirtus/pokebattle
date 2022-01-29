<template>
    <div class="audio-button" @click="toggleMuted()">
        <div class="sound-off" v-if="muted"></div>
        <img src="@/assets/sound-on.png">
    </div>
    <audio 
        v-if="(['Wiki', 'Home', 'SpotlightedPokemon', 'MiniGames'].includes(currentRouteName)) 
            && !muted" autoplay loop>
        <source src="@/assets/home-music.mp3" type="audio/mp3">
    </audio>
</template>

<script>
export default {
    name: 'SoundPlayer',
    methods: {
        toggleMuted() {
            this.muted ? this.$store.dispatch('playAudio') : this.$store.dispatch('stopAudio');
        }
    },
    mounted() {
        let isMuted = localStorage.getItem('muted');
        if (isMuted == 'true') {
            this.$store.dispatch('stopAudio');
        }
        else {
            this.$store.dispatch('playAudio')
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
    padding: 10px;
    box-shadow: rgb(0 0 0 / 79%) 0px 7px 17px 0px;
    background: #fff;
    border-radius: 50%;


    img {
        height: 30px;
        filter: invert(68%) sepia(8%) saturate(271%) hue-rotate(184deg) brightness(88%) contrast(80%);
    }

    .sound-off{
        width: 4px;
        height: 39px;
        background: #92959c;
        position: absolute;
        transform: rotate(131deg);
        right: 22px;
        bottom: 7px;
        border-radius: 30px;
    }
}
</style>