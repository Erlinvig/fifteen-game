<template>
  <div class="panel">
    <div class="panel__amount"> Шаги: {{amount}}</div>
    <div class="panel__size">
      <button @click="decrease" class="panel__size__decrease"> - </button>
      <div class="panel__size__value">{{lineSize}}</div>
      <button @click="increase" class="panel__size__increase"> + </button>
    </div>
    <button
      class="panel__shuffle"
      @click="shuffle"
    >
      Перемешать
    </button>
  </div>
</template>

<script>
  export default {
    methods: {
      shuffle() {
        this.$store.dispatch('game/shuffle')
      },
      decrease() {
        this.$store.dispatch('game/decreaseLineSize')
      },
      increase() {
        this.$store.dispatch('game/increaseLineSize')
      }
    },
    computed: {
      amount() {
        return this.$store.getters['game/getAmountStep']
      },
      lineSize() {
        return this.$store.getters['game/getLineSize']
      }
    }
  }
</script>

<style lang="scss" scoped>
  .panel {
    flex-wrap: wrap;
    display: flex;
    margin: 1em 0;
    padding: 1em;
    border: 1px solid #c3c3c3;
    background-color: #f1f1f1;
    justify-content: space-between;

    &__amount {
      font-size: 22px;
      background-color: #d7d7d7;
      border: 1px solid #c3c3c3;
      padding: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__size {
      display: flex;
      background-color: #d7d7d7;
      border: 1px solid #c3c3c3;
      align-items: center;
      padding: 1em;
      justify-content: center;

      &__decrease, &__increase {
        font-size: 20px;
        display: flex;
        background-color: #fff;
        padding: .5em;
        outline: none;
        border: none;
        cursor: pointer;
        transition: .35s;
        &:hover {
          background-color: #cfffc9;
        }
      }
      &__increase {
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
      }
      &__decrease {
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }
      &__value {
        font-size: 24px;
        display: flex;
        background-color: #d7ffd9;
        border: 1px solid #3b8070;
        padding: .5em;
      }
    }

    &__shuffle {
      font-size: 18px;
      min-width: 10em;
      outline: none;
      background-color: #d7d7d7;
      border: 1px solid #c3c3c3;
      border-radius: .5em;
      padding: 1em;
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }
  }

  @media (max-width: 767px) {
    .panel {
      &__shuffle {
        margin-top: 1em;
        width: 100%;
      }

      &__amount, &__size {
        width: 47.5%;
      }
    }
  }
</style>
