import Vue from "vue";
import Vuex from "vuex";

import browser from "./modules/browser";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    browser
  }
});
