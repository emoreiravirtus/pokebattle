<template>
    <div class="load-pokecard">
        <div class="card--skeleton image-container">
            <img>
        </div>
        <div class="info-container">
            <p class="card--skeleton bold-font white-color">Blastoise</p>
            <div class="main-info-container">
                <div class="types-container">
                    <p class="normal-font">
                        water
                    </p>
                </div>
                <div class="skills-container">
                    <div class="stat">
                        <p class="normal-font">Strength</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'LoadPokeCard',
}
</script>

<style lang="scss">
.load-pokecard {
    border-radius: 10px;
    margin: 10px 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    transition: transform .4s;
    z-index: 0;

    background-image: url("../assets/diagmonds.png"), linear-gradient(160deg, var(--type-color) 0%, rgb(72, 0, 96) 100%);

    &:hover {
        transform: scale(1.1);
    }

    


    .image-container {
        background-color: #eee;
        text-align: center;
        border-radius: 8px 0 0 8px;
        width: 160px;
        height: 96px;

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
                    color: #eee;
                    background: #eee;
                    margin: 0;
                }
            }

            .skills-container {
            padding: 10px;
            background: #eee;

                .stat {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                   
                    & > * {
                        color: #eee;
                        margin: 0 22px;
                        }
                }
            }
        }
    }

    .card--skeleton::before {
        content: "";
        position: absolute;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.9),
            transparent
        );
        width: 50%;
        height: 100%;
        top: 0;
        left: 0;
        animation: loading 0.6s infinite;
    }

    @keyframes loading {
        0% {
            transform: skewX(-10deg) translateX(-100%);
        }
        100% {
            transform: skewX(-10deg) translateX(200%);
        }
    }
}
</style>