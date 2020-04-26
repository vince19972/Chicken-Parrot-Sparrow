<template>
  <div id="app">
    <full-menu class="menu"></full-menu>
    <ham-btn class="ham"></ham-btn>
    <div
      class="app__rwd -full-height-view -full-width-view -flex-center-all -f-main-b"
    >
      <h1>sorry, mobile version is still under development.</h1>
    </div>
    <transition name="fade" mode="out-in">
      <router-view :class="['app-container', stateClass]" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HamBtn from "@/components/comps/HamBtn.vue";
import FullMenu from "@/components/partials/FullMenu.vue";

@Component({
  name: "App",
  components: {
    HamBtn,
    FullMenu,
  },
  metaInfo: {
    title: "Chicken, Parrot and Sparrow",
  },
})
export default class App extends Vue {
  // style getters
  get stateClass() {
    return this.$store.getters["isMenuOpened"] ? "-is-frozen" : "";
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_media-queries.scss";

.app-container.-is-frozen {
  position: fixed;
  overflow: hidden;
}

.app__rwd {
  display: none;

  h1 {
    display: block;
    font-size: 2vw;
  }
}

// rwd
@include media("below-desktop") {
  .app-container,
  .menu,
  .ham {
    display: none !important;
  }
  .app__rwd {
    display: flex;
  }
}
</style>
