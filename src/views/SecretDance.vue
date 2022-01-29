<template>
  <div class="secret-pokemon-outer-container">
    <div class="hud normal-font primary-background">
      <div>
        <img class="heart" src="@/assets/heart.png" v-for="(index) in hearts" :key="index">
      </div>
       <p class="bold-font white-color">{{ points }} points</p>
    </div>
    <div class="plus-points success-background normal-font" v-if="points > lastPoints">😀 +{{ points - lastPoints }} points!</div>
    <div class="secret-pokemons-container" v-if="gameStarted">
      <div class="main-image">
          <div v-if="hearts == 0">
            <p class="big-font success-background">
              You scored {{ points }} points!
            </p>
          </div>
          <img v-else :class="{'hidden': hidden, 'dance': !muted}" :src="secretPokemon.sprites.other['official-artwork'].front_default">
      </div>
      <div class="options-container">
        <button class="bold-font option-button"  v-for="(option, index) of options" :key="index" @click="giveAnswer(option)">
          {{ option }}
        </button>
      </div>
      <button class="bold-font primary-background max-width" v-if="!hidden" @click="continueGame">Continue</button>
    </div>
    <div class="modal" v-else>
      <p class="bold-font white-color">World Records</p>
      <table :key="componentKey">
        <tr class="bold-font">
          <th>Master Name</th>
          <th>Points</th>
        </tr>
        <tr v-for="(record, index) of sortRecords(records)" :key="index">
          <td class="bold-font">{{ record.userName }}</td>
          <td class="bold-font">{{ record.record }}</td>
        </tr>
      </table>
      <button class="bold-font success-background" @click="startGame">Start Game</button>
    </div>
    <audio v-if="!muted && gameStarted" autoplay loop>
        <source src="@/assets/who-music.mp3" type="audio/mp3">
    </audio>
  </div>
</template>

<script>

export default {
    name: 'SecretDance',
    data() {
      return {
        componentKey: 0,
        secretPokemon: {},
        gameStarted: false,
        hidden: true,
        options: [],
        points: 0,
        lastPoints: 0,
        hearts: 3,
        multiplier: 1,
        record: 0
      }
    },
    async beforeCreate() {
      await this.$store.dispatch('bindSecretDanceRecords');
      this.record = localStorage.getItem('record');
    },
    mounted() {
        let isMuted = localStorage.getItem('muted');
        if (isMuted == 'true') {
            this.$store.dispatch('stopAudio');
        }
        else {
            this.$store.dispatch('playAudio')
        }
        setInterval(() => {
          this.forceRerender();
        }, 3000);
    },
    methods: {
      sortRecords(records) {
        return records.sort((a, b) => {
          console.log(a.record < b.record)
          if(a.record > b.record) {
            return -1;
          }
          if(a.record < b.record){
            return 1;
          } 
          return 0;
        })
      },
      forceRerender() {
        this.componentKey += 1;
      },
      async startGame() {
        this.gameStarted = true;
        this.hearts = 4;
        this.addMorePokemons();
        this.addOptions();
      },
      async addMorePokemons() {
        let random = Math.floor(Math.random() * (1000 -  + 1)) + 0;
        this.secretPokemon = this.$store.getters['allPokemons'].slice(random, random + 1)[0];
      },
      addOptions() {
        let randomNumbers = Array.from({length: 3}, () => Math.floor(Math.random() * 898));
        let currentPokemonName = this.secretPokemon.name;
        randomNumbers.push(this.allPokemonNames.indexOf(currentPokemonName));

        randomNumbers.sort(() => Math.random() - 0.5);

        for(let item in randomNumbers) {
          this.options.push(this.allPokemonNames[randomNumbers[item]]);
        }

        for(let index in this.options) {
            document.querySelectorAll('.option-button')[index].classList.remove('error-background');
            document.querySelectorAll('.option-button')[index].classList.remove('success-background');
        }
      },
      giveAnswer(option) {
        if (!this.hidden) return;

        for(let index in this.options) {
          if(this.options[index] == this.secretPokemon.name) {
            document.querySelectorAll('.option-button')[index].classList.add('success-background');
          }
          else {
            document.querySelectorAll('.option-button')[index].classList.add('error-background');
          }
        }

        if(option == this.secretPokemon.name) {
          this.points += 375 * this.multiplier;

          if(this.multiplier >= 3) {
            this.hearts++;
          }

          this.multiplier++;
        }
        else {
          this.hearts--;
          this.multiplier = 1;
        }

        this.hidden = false;
      },
      continueGame() {
        this.lastPoints = this.points;
        this.options = [];
        this.hidden = true;

        if(this.hearts != 0){
          this.addMorePokemons();
          this.addOptions();
        }
        else {
          this.gameStarted = false;
          this.saveRecord();
        }
      },
      hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
      },
      saveRecord() {
        let random = Math.floor(Math.random() * (10000 -  + 1)) + 0;
        let data = {
          userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : `Pokemon Master${ random }`,
          record: this.points
        }
        this.$store.dispatch('saveSecretDanceRecords', data)
      }
    },
    computed: {
      muted() {
        return this.$store.getters['muted'];
      },
      allPokemonNames() {
        return this.$store.getters['pokemonNames']
      },
      records() {
        return this.$store.getters['secretDanceRecords'];
      }
    }
}
</script>

<style lang="scss">
.secret-pokemon-outer-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .hud {
    padding: 2px 33px;
    position: absolute;
    border-radius: 10px;
    top: 0px;
    right: 15px;
    z-index: 3;

    p {
      margin: 0;
    }

    div {
      text-align: center;

      .heart {
        width: 20px;
      }
    }
    
  }

  table {
    background: #fff;
    width: 70vw;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;

    th {
      text-align: left;
      padding: 10px;
    }
    td {
      padding: 10px;
    }
  }

  .plus-points {
    padding: 5px;
    border-radius: 10px;
    position: absolute;
    top: 126px;
    right: 15px;
    animation: 2s disapear linear forwards;
    z-index: 3;
  }

  button {
    border: none;
    padding: 6px;
    border-radius: 5px;
    cursor: pointer;
    transition: transform .4s;
    text-transform: capitalize;
    
    &:hover {
      transform: scale(1.2)
    }
  }

  .secret-pokemons-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    .main-image {
      text-align: center;

      div {
        p{
          padding: 15px;
          border-radius: 10px;
        }
      }

      img {
          width: 350px;
          filter: drop-shadow(5px -5px 6px);
      }

      .hidden {
        filter: brightness(0%) drop-shadow(5px -5px 6px);
      }
    }
    .options-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;

      .option-button {
        margin: 10px calc(25vw - 81px);

        @media (max-width: 480px), (min-width: 481px) and (max-width: 767px) {
          margin: 20px calc(30vw - 81px);
        }
      }
    }

    .max-width {
      max-width: 120px;
    }
  }
  

  & .modal {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 4;
    width: 100vw;
    height: 100vh;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #2196f3;
    background-image: url("../assets/diagmonds.png");
  }
}

.preparing {
  animation: 3.2s dance;
}

.dance {
  animation: 1.62s dance infinite;
  animation-delay: 3.2s;
}

@keyframes disapear {
  0% { opacity: 1 }
  50% { transform: translateY(-40px) }
  99% { opacity: 1; transform: translateY(-40px) }
  100% { opacity: 0; transform: translateY(-40px) }
}

@keyframes dance {
  0% { transform: rotate(10deg) }
  25% { transform: rotate(-10deg) translateX(-30px) skew(6deg, 6deg) }
  50% { transform: rotate(10deg) }
  75% { transform: rotate(-10deg) translateX(9px) }
  100% { transform: rotate(10deg) }
}
</style>