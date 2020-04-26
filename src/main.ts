import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import VueMeta from "vue-meta";

import { browserEvent } from "./store/modules/browser";

Vue.config.productionTip = false;

/* Styles */
import "./assets/styles/main.scss";

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(browserEvent(store));
