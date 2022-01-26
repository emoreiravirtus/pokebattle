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
          <img v-else :class="{'hidden': hidden}" :src="pokemonList[currentIndex].sprites.other['official-artwork'].front_default">
      </div>
      <div class="options-container">
        <button class="bold-font option-button"  v-for="(option, index) of options" :key="index" @click="giveAnswer(option)">
          {{ option }}
        </button>
      </div>
      <button class="bold-font primary-background max-width" v-if="!hidden" @click="continueGame">Continue</button>
    </div>
    <div class="modal" v-else>
      <p class="bold-font white-color">Current Record: {{ record }}</p>
      <button class="bold-font" @click="startGame">Start Game</button>
    </div>
    <audio autoplay loop>
      <source src="@/assets/who-music.mp3" type="audio/mp3">
    </audio>
  </div>
</template>

<script>
import colorsEnum from '@/utils/colors.js'
import pokemon from "pokemon";
      
export default {
    name: 'SecretPokemon',
    data() {
      return {
        pokemonList: [],
        gameStarted: false,
        currentIndex: 0,
        hidden: true,
        options: [],
        allPokemonNames: pokemon.all(),
        points: 0,
        lastPoints: 0,
        hearts: 5,
        multiplier: 1,
        record: 0
      }
    },
    async beforeCreate() {
      this.pokemonList = await this.$store.dispatch('getNRandomPokemons', 2);
      this.record = localStorage.getItem('record');
    },
    methods: {
      async startGame() {
        this.gameStarted = true;
        this.currentIndex = 0;
        this.hearts = 5;
        this.addMorePokemons();
        this.addOptions();
      },
      async addMorePokemons() {
        let newPokemons = await this.$store.dispatch('getNRandomPokemons', 1);
        this.pokemonList.push(newPokemons[0]);
      },
      addOptions() {
        let randomNumbers = Array.from({length: 3}, () => Math.floor(Math.random() * 898));
        let currentPokemonName = this.pokemonList[this.currentIndex].name;

        currentPokemonName = currentPokemonName.charAt(0).toUpperCase() + currentPokemonName.slice(1);

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
        this.hidden = false;

        for(let index in this.options) {
          if(this.options[index].toLowerCase() == this.pokemonList[this.currentIndex].name) {
            document.querySelectorAll('.option-button')[index].classList.add('success-background');
          }
          else {
            document.querySelectorAll('.option-button')[index].classList.add('error-background');
          }
        }

        if(option.toLowerCase() == this.pokemonList[this.currentIndex].name) {
          this.points += 300 * this.multiplier;

          if(this.multiplier >= 2) {
            this.hearts++;
          }

          this.multiplier++;
        }
        else {
          this.hearts--;
          this.multiplier = 1;
        }
      },
      continueGame() {
        this.lastPoints = this.points;
        this.options = [];
        this.hidden = true;

        if(this.hearts != 0){
          this.addMorePokemons();
          this.currentIndex++;
          this.addOptions();
        }
        else {
          this.gameStarted = false;
          if(this.record < this.points) {
            localStorage.setItem('record', this.points);
            this.record = this.points;
          }
        }
      },
      hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
      }
    },
    computed: {
      cssVars() {
          let pokemonType = this.pokemonList[this.currentIndex].types[0].type.name;
          return {
              '--type-color': colorsEnum[pokemonType]
          }
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
          animation: 1s linear pump forwards;
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
    justify-content: center;
    background-color: #2196f3;
    background-image: url("../assets/texture.png");
  }
}

@keyframes disapear {
  0% { opacity: 1 }
  50% { transform: translateY(-40px) }
  99% { opacity: 1; transform: translateY(-40px) }
  100% { opacity: 0; transform: translateY(-40px) }
}
</style>