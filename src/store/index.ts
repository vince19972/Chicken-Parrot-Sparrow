import Vue from "vue";
import Vuex from "vuex";

import browser from "./modules/browser";

Vue.use(Vuex);

interface ConnectedPairsShape {
  chicken: boolean;
  parrot: boolean;
  sparrow: boolean;
}
enum pairType {
  Chicken = "chicken",
  Parrot = "parrot",
  Sparrow = "sparrow",
}
interface StateShape {
  connectedPairs: ConnectedPairsShape;
  isMenuOpened: boolean;
}

export default new Vuex.Store({
  state: {
    connectedPairs: {
      chicken: false,
      parrot: false,
      sparrow: false,
    },
    isMenuOpened: false,
  },
  getters: {
    connectedPairs: ({ connectedPairs }) => connectedPairs,
    connectedPairsCount: ({ connectedPairs }) => {
      let connectedPairsCount = 0;

      for (const property in connectedPairs) {
        if (connectedPairs[property] === true) {
          connectedPairsCount += 1;
        }
      }

      return connectedPairsCount;
    },
    allPaired: ({ connectedPairs }) => {
      const { chicken, parrot, sparrow } = connectedPairs;
      if (chicken && parrot && sparrow) return true;
      else return false;
    },
    isMenuOpened: ({ isMenuOpened }) => isMenuOpened,
  },
  mutations: {
    addConnectedPair: (state: StateShape, pairType: pairType) => {
      state.connectedPairs[pairType] = true;
    },
    resetConnectedPair: (state: StateShape) => {
      state.connectedPairs.chicken = false;
      state.connectedPairs.parrot = false;
      state.connectedPairs.sparrow = false;
    },
    toggleMenu: (state: StateShape, toState: boolean) => {
      state.isMenuOpened = toState === undefined ? true : toState;
    },
  },
  modules: {
    browser,
  },
});
