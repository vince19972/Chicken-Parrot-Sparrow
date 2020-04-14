<template>
  <div class="chicken-grid -grid-base" :style="[transformStyle]">
    <div class="-grid-vertical">
      <Produce v-for="n in 12" :key="n" />
    </div>
    <div class="-grid-horizontal">
      <div class="-full-height">
        <Selection />
      </div>
    </div>
    <div class="-grid-horizontal">
      <div class="-full-height">
        <Stack />
      </div>
    </div>
    <div class="-grid-vertical">
      <Slaughter />
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import Produce from "@/components/comps/chicken/Produce.vue";
import Selection from "@/components/comps/chicken/Selection.vue";
import Stack from "@/components/comps/chicken/Stack.vue";
import Slaughter from "@/components/comps/chicken/Slaughter.vue";

import { WindowSize as WindowSizeState } from "@/store/types/browser";

@Component({
  components: {
    Produce,
    Selection,
    Stack,
    Slaughter
  }
})
export default class ChickenGrid extends Vue {
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
