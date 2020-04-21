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
  Sparrow = "sparrow"
}
interface StateShape {
  connectedPairs: ConnectedPairsShape;
}

export default new Vuex.Store({
  state: {
    connectedPairs: {
      chicken: false,
      parrot: false,
      sparrow: false
    }
  },
  getters: {
    connectedPairs: ({ connectedPairs }) => connectedPairs
  },
  mutations: {
    addConnectedPair: (state: StateShape, pairType: pairType) => {
      state.connectedPairs[pairType] = true;
    },
    resetConnectedPair: (state: StateShape) => {
      state.connectedPairs.chicken = false;
      state.connectedPairs.parrot = false;
      state.connectedPairs.sparrow = false;
    }
  },
  modules: {
    browser
  }
});
