<template>
  <div id="app">
    <OpeningSection />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { browserEvent } from "./store/modules/browser";

import OpeningSection from "./components/sections/OpeningSection.vue";
import GridSection from "./components/sections/GridSection.vue";

@Component({
  components: {
    OpeningSection,
    GridSection,
  },
})
export default class App extends Vue {
  created() {
    const { resizeEvent, scrollEvent, mouseEvent } = browserEvent(this.$store);
    window.addEventListener("resize", () => resizeEvent(null));
    window.addEventListener("scroll", () => scrollEvent(null));
    window.addEventListener("mousemove", (e) =>
      mouseEvent({ x: e.clientX, y: e.clientY })
    );
  }

  destroyed() {
    const { resizeEvent, scrollEvent, mouseEvent } = browserEvent(this.$store);
    window.removeEventListener("resize", () => resizeEvent(null));
    window.removeEventListener("scroll", () => scrollEvent(null));
    window.removeEventListener("mousemove", (e) =>
      mouseEvent({ x: e.clientX, y: e.clientY })
    );
  }
}
</script>

<style lang="scss"></style>
