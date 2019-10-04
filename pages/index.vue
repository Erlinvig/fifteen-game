<template>
  <div class="container">
    <victory-notification></victory-notification>
    <panel></panel>
    <game></game>
  </div>
</template>

<script>
  import VictoryNotification from '~/components/VictoryNotification.vue'
  import Panel from '~/components/panel.vue'
  import Game from '~/components/Game.vue'

  export default {
    components: {
      VictoryNotification,
      Panel,
      Game
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 auto;
  }
</style>
