<template>
  <div class="mt1">
    <transition
      name="fade"
    >
      <div
        v-if="isVictory"
        class="notification"
      >
        Победная комбинация
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    computed: {
      isVictory() {
        return this.$store.getters['game/isVictory']
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mt1 {
    margin-top: 1em;
  }
  .notification {
    width: 100%;
    height: 50px;
    background-color: #d2ffd6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border: 1px solid #90c9a0;
  }

  .fade-enter-active {
    animation: fade .5s;
  }
  .fade-leave-active {
    animation: fade .5s reverse;
  }
  @keyframes fade {
    0% {
      max-height: 0;
      transform: scale(0);
      opacity: 0;
    }
    100% {
      max-height: 50px;
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
