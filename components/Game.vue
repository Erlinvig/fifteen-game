<template>
  <div>
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

    <div class="panel">
      <div class="panel__amount"> Шаги: {{amount}}</div>
      <div class="panel__size">
        <button @click="decrease" class="panel__size__decrease"> - </button>
        <div class="panel__size__value">{{getLineSize}}</div>
        <button @click="increase" class="panel__size__increase"> + </button>
      </div>
      <button
        class="panel__shuffle"
        @click="shuffle"
      >
        Перемешать
      </button>
    </div>

    <transition-group name="list-complete" tag="div" class="game-field">
      <span
        v-for="(item, index) in getItems"
        v-bind:key="item.value"
        class="list-complete-item"
        :style="{width: widthCell, height: heightCell}"
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
      this.amountStep = 0;
      this.items = [];

      for (let i = 1; i < this.lineSize * this.lineSize; i++) {
        this.items.push( {value: i} )
      }
      this.items.push( {value: 0} );
    },
    data() {
      return {
        items: [],
        lineSize: 4,
        amountStep: 0,
        isVictory: true,
      }
    },
    methods: {
      step(index) {
        let isUpLine = index < this.lineSize;
        let isDownLine = index > this.items.length - this.lineSize - 1;
        let isRightLine = index % this.lineSize === 0;
        let isLeftLine = index % this.lineSize === this.lineSize - 1;

        let x1 = !isRightLine
          ? this.items[index - 1].value === 0 ? -1 : 0
          : 0;

        let x2 = !isLeftLine
          ? this.items[index + 1].value === 0 ? 1 : 0
          : 0;

        let y1 = !isUpLine
          ? this.items[index - this.lineSize].value === 0 ? -this.lineSize : 0
          : 0;

        let y2 = !isDownLine
          ? this.items[index + this.lineSize].value === 0 ? this.lineSize : 0
          : 0;

        let dxy = x1 + x2 + y1 + y2;

        let temp = this.items[index].value;
        this.items[index].value = 0;
        this.items[index + dxy].value = temp;

        this.checkOnVictory()
      },

      checkOnVictory() {
        for (let i = 0; i < this.items.length-1; i++) {
          if (this.items[i].value === i+1) {
            this.isVictory = true;
          } else {
            this.isVictory = false;
            break;
          }
        }
      },

      shuffle() {
        this.amountStep = 0;

        let j, temp;
        for(let i = this.items.length - 1; i > 0; i--) {
          j = Math.floor(Math.random()*(i + 1));
          temp = this.items[j].value;
          this.items[j].value = this.items[i].value;
          this.items[i].value = temp;
        }
        this.checkOnVictory()
      },
      reinit() {
        this.items = [];
        for (let i = 1; i < this.lineSize * this.lineSize; i++) {
          this.items.push( {value: i} )
        }
        this.items.push({value: 0});
      },
      decrease() {
        if (this.lineSize > 2) {
          this.lineSize--;
        }
        this.reinit()
      },
      increase() {
        if (this.lineSize < 7) {
          this.lineSize++;
        }
        this.reinit()
      }
    },
    computed: {
      widthCell() {
        let widthGameField = 100;
        return `${widthGameField / this.lineSize}%`
      },
      heightCell() {
        let heightGameField = 350;
        return `${heightGameField / this.lineSize}px`
      },
      getItems() {
        return this.items
      },
      getLineSize() {
        return this.lineSize
      },
      amount() {
        return this.amountStep
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
