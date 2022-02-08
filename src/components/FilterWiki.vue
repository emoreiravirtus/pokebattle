<template>
    <div class="filters-container" :class="{'opened': filters.isOpen}">
        <p class="normal-font" @click="filters.isOpen = !filters.isOpen">
            Filters <img src="@/assets/filter-icon.jpg">
            <span v-if="filtersCount" class="primary-background">{{ filtersCount }}</span>
        </p>
        <div class="filters-options" v-show="filters.isOpen">
            <div class="buttons-filters normal-font">
            <div class="submit-filters primary-background" @click="changeFilters(true)">
                Submit
            </div>
            <div class="cancel-filters error-background" @click="changeFilters(false)" >
                Cancel
            </div>
            </div>
            <div class="types-container">
            <p class="normal-font">Type:</p>
            <div class="types-items">
                <div v-for="(type, index) of filters.options.types" :key="index"
                @click="toggleType(index, type[Object.keys(type)[0]])"
                :class="{'active': type[Object.keys(type)[0]]}">
                <div class="circle"
                    :style="{'background-image': 'url(' + textureImage + '), linear-gradient(160deg, ' + colorsByType[Object.keys(type)[0]] + ' 0%, rgb(72, 0, 96) 100%)'}">
                </div>
                <p class="normal-font">{{ Object.keys(type)[0] }}</p>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { colorsEnum } from '@/utils/colors.js';
import textureImage from '@/assets/maze-white.png'

export default {
    name: 'FilterWiki',
    data() {
        return {
            filtersCount: 0,
            filters: {
                isOpen: false,
                options: {
                    types: [
                        {grass: false},
                        {fire: false},
                        {water: false},
                        {bug: false},
                        {dragon: false},
                        {steel: false},
                        {dark: false},
                        {flying: false},
                        {normal: false},
                        {ghost: false},
                        {rock: false},
                        {ground: false},
                        {fighting: false},
                        {electric: false},
                        {poison: false},
                        {psychic: false},
                        {fairy: false},
                        {ice: false}
                    ],
                }
            }
        }
    },
    methods: {
        toggleType( index, value ) {
            value ? this.filtersCount -= 1 : this.filtersCount += 1;
            if (this.filtersCount < 0) this.filtersCount = 0; 
            this.filters.options.types[index] = { [Object.keys(this.filters.options.types[index])[0]]: !value };
        },
        changeFilters(isActive) {
          this.filters.isOpen = false;
          if (!isActive) {
            this.filtersCount = 0;
            this.filters.options.types = [
              {grass: false},
              {fire: false},
              {water: false},
              {bug: false},
              {dragon: false},
              {steel: false},
              {dark: false},
              {flying: false},
              {normal: false},
              {ghost: false},
              {rock: false},
              {ground: false},
              {fighting: false},
              {electric: false},
              {poison: false},
              {psychic: false},
              {fairy: false},
              {ice: false}
            ]
          }
          this.$emit('changeFilters', this.filters.options.types)
        }
    },
    computed: {
      colorsByType(){
        return colorsEnum;
      },
      textureImage(){
        return textureImage;
      }
    }
}
</script>

<style lang="scss">
.opened {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      background: #fafafa;
    }

    .filters-container {
      padding: 10px;
      display: flex;
      flex-direction: column;

      p {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        img {
          height: 40px;
        }

        span {
          padding: 5px;
          border-radius: 50%;
          width: 10px;
          height: 10px;
          line-height: 12.5px;
        }
      }
    }

    .filters-options {

      .buttons-filters {
        display: flex;
        justify-content: center;
        
        * {
          padding: 10px;
          border-radius: 18px;
          cursor: pointer;
          box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
        }

        .submit-filters {
          margin-right: 5px;
          border: 2px solid #2196f3;
        }

        .cancel-filters {
          margin-left: 5px;
          border: 2px solid #e91e63;
        }
      }

      .types-container {

        .types-items {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 10px;

          div {
            display: flex;
            align-items: center;
            border: 4px solid #aaaaaa;
            border-radius: 30px;
            width: 106px;
            justify-content: space-around;
            text-transform: capitalize;
            cursor: pointer;
            box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;

            .circle {
              width: 30px;
              height: 30px;
              background-size: contain;
              border-radius: 50%;
              filter: brightness(1.3);
            }
          }
        }

        .active {
          border-color: #2196f3 !important;
        }
    }
}
</style>