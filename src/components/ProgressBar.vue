<template>
  <div class="progress-bar">
      <div class="progress" :style="{'width': ( ( 50 * progress) / 100) + 'px'}">
      </div>
  </div>
</template>

<script>
export default {
    name: 'ProgressBar',
    props: {
        progress: {
            type: Number,
            default: () => {
                return 20;
            }
        }
    }
}
</script>

<style lang="scss">
.progress-bar {
    width: 50px;
    background-color: #fff;
    height: 5px;
    border-radius: 5px;
    overflow: hidden;

    .progress {
        background-color: #21D4FD;
        background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%);
        height: 100%;
    }
}
</style>