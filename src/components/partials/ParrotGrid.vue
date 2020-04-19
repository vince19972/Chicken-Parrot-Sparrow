<template>
  <div class="parrot-grid -grid-base" :style="[transformStyle]">
    <div class="-grid-horizontal -full-height">
      <capture></capture>
    </div>
    <div class="-grid-vertical -full-height">
      <growth></growth>
    </div>
    <div class="-grid-vertical -full-height">
      <pricing></pricing>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { WindowSize as WindowSizeState } from "@/store/types/browser";

import Capture from "@/components/comps/parrot/Capture.vue";
import Growth from "@/components/comps/parrot/Growth.vue";
import Pricing from "@/components/comps/parrot/Pricing.vue";

@Component({
  components: {
    Capture,
    Growth,
    Pricing
  }
})
export default class ParrotGrid extends Vue {
  @Prop() readonly transformValue!: number;

  // computed setters
  get windowSize(): WindowSizeState {
    return this.$store.getters["browser/windowSize"];
  }
  get transformStyle() {
    return {
      transform: `translate3d(0, ${this.transformValue * -100}vh, 0)`
    };
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/sections/GridSection.scss";
</style>
