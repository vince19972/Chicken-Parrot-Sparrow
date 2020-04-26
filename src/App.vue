<template>
  <div id="app">
    <full-menu></full-menu>
    <ham-btn></ham-btn>
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
})
export default class App extends Vue {
  // style getters
  get stateClass() {
    return this.$store.getters["isMenuOpened"] ? "-is-frozen" : "";
  }
}
</script>

<style scoped lang="scss">
.app-container.-is-frozen {
  position: fixed;
  overflow: hidden;
}
</style>
