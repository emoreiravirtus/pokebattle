<template>
    <div class="general-square-card normal-font white-color" 
        :class="[enabled ? 'enabled' : 'disabled']"
        :style="{backgroundImage: 'url(' + image + ')', }">
        <div class="general-square-card-text">
            <p>{{ text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GeneralSquareCard',
    props: {
        image: {
            type: String,
            default: () => {
                return '@/assets/menu-battle.jpg'
            }
        },
        text: {
            type: String,
            default: () => {
                return 'Some Text'
            }
        },
        enabled: {
            type: Boolean,
            default: () => {
                return true;
            }
        }
    }
}
</script>

<style lang="scss">
.general-square-card {
    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
    border: 1px solid rgba(100, 100, 111, 0.2);
    border-radius: 10px;
    width: 163px;
    height: 179px;
    background-size: cover;
    position: relative;
    overflow: hidden;
    background-position: center;
    transition: transform .3s;

    &:hover {
        transform: scale(1.2);
    }

    &-text {
        text-transform: uppercase;
        position: absolute;
        bottom: 0;
        background: #2196f3;
        color: rgb(255, 255, 255);
        font-weight: 700;
        text-align: center;
        height: 12px;
        padding: 0px 0;
        width: 100%;
        letter-spacing: 1px;

        & p {
            margin : 0;
        }
    }
}

.enabled {
    filter: none;
}

.disabled {
    filter: grayscale(100%);
    display: flex;
    cursor: not-allowed;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #000 !important;
    font-weight: 700;

    &:hover::before {
       content: 'coming soon'
    }
}
</style>