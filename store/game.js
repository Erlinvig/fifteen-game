export const state = () => ({
  items: [],
  lineSize: 4,
  amountStep: 0,
  isVictory: true
});

export const mutations = {
  init(state){
    state.amountStep = 0;
    state.isVictory = true;

    state.items = [];

    for (let i = 1; i < state.lineSize * state.lineSize; i++) {
      state.items.push( {value: i} )
    }
    state.items.push( {value: 0} );
  },
  step(state, payload) {
    let lineSize = Math.sqrt(state.items.length);
    let index = payload.index;

    let isStart = index === 0;
    let isEnd = index === state.items.length - 1;
    let isUpLine = index < lineSize;
    let isDownLine = index > state.items.length - lineSize - 1;

    let isRightLine = index % lineSize === 0;
    let isLeftLine = index % lineSize === lineSize-1;

    if (!isEnd && !isLeftLine) {
      if (state.items[index + 1].value === 0) {
        state.items[index + 1].value = state.items[index].value;
        state.items[index].value = 0;

        state.amountStep++;
      }
    }

    if (!isStart && !isRightLine) {
      if (state.items[index - 1].value === 0) {
        state.items[index - 1].value = state.items[index].value;
        state.items[index].value = 0;

        state.amountStep++;
      }
    }

    if (!isUpLine) {
      if (state.items[index - lineSize].value === 0) {
        state.items[index - lineSize].value = state.items[index].value;
        state.items[index].value = 0;

        state.amountStep++;
      }
    }

    if (!isDownLine) {
      if (state.items[index + lineSize].value === 0) {
        state.items[index + lineSize].value = state.items[index].value;
        state.items[index].value = 0;

        state.amountStep++;
      }
    }
  },
  shuffle(state) {
    state.amountStep = 0;

    let j, temp;
    for(let i = state.items.length - 1; i > 0; i--) {
      j = Math.floor(Math.random()*(i + 1));
      temp = state.items[j].value;
      state.items[j].value = state.items[i].value;
      state.items[i].value = temp;
    }
  },
  checkOnVictory(state) {
    for (let i = 0; i < state.items.length-1; i++) {
      if (state.items[i].value === i+1) {
        state.isVictory = true;
      } else {
        state.isVictory = false;
        break;
      }
    }
  },
  decreaseLineSize(state) {
    if (state.lineSize > 2) {
      state.lineSize--;
    }
  },
  increaseLineSize(state) {
    if (state.lineSize < 7) {
      state.lineSize++;
    }
  },
};

export const actions = {
  init({commit}) {
    commit('init')
  },
  step({commit}, payload) {
    commit('step', payload);
    commit('checkOnVictory');
  },
  shuffle({commit}) {
    commit('shuffle');
    commit('checkOnVictory');
  },
  checkOnVictory({commit}) {
    commit('checkOnVictory');
  },
  decreaseLineSize({commit}) {
    commit('decreaseLineSize');
    commit('init');
  },
  increaseLineSize({commit}) {
    commit('increaseLineSize');
    commit('init');
  },
};

export const getters = {
  isVictory: state => state.isVictory,
  getItems: state => state.items,
  getAmountStep: state => state.amountStep,
  getLineSize: state => state.lineSize
};
