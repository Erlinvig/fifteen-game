<template>
  <div class="container">
    <game></game>
  </div>
</template>

<script>
  import Game from '~/components/Game.vue'

  export default {
    components: {
      Game
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 auto;
  }
</style>
