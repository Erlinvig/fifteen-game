<template>
  <div>
    <transition-group name="list-complete" tag="div" class="game-field">
      <span
        v-for="(item, index) in getItems"
        v-bind:key="item.value"
        class="list-complete-item"
        :style="{width: `${100/getLineSize}%`, height: `${350 / getLineSize}px`}"
      >
        <button
          v-if="item.value !== 0"
          @click="step(index)"
          class="cell"
        >
          {{ item.value }}
        </button>

        <button
          v-if="item.value === 0"
          class="cell--empty"
        >
          {{ item.value }}
        </button>
      </span>
    </transition-group>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch('game/init');
    },
    data() {
      return {
        items: [],
        nextNum: 10
      }
    },
    methods: {
      step(index) {
        this.$store.dispatch('game/step', {index})
      }
    },
    computed: {
      getItems() {
        return this.$store.getters['game/getItems']
      },
      getLineSize() {
        return this.$store.getters['game/getLineSize']
      }
    }
  }
</script>

<style lang="scss" scoped>
  button {
    outline: none;
    border: none;
  }

  .game-field {
    width: 100%;
  }

  .cell {
    background-color: #55895a;
    width: 95%;
    height: 90%;
    display: flex;
    color: white;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .cell--empty {
    width: 95%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
  }

  .flip-list-move {
    transition: transform 1s;
  }
  .list-complete-item {
    transition: all .5s;
    width: 25%;
    height: 25%;
    display: inline-block;
  }
</style>
