<template>
  <div class="chicken-grid" :style="[transformStyle]">
    <div class="grid-v -full-height">
      <Produce v-for="n in 12" :key="n" />
    </div>
    <div class="grid -full-height">
      <div class="grid__container -grid-">
        <Selection />
      </div>
    </div>
    <div class="grid -full-height">
      <div class="grid__container -grid-">
        <Stack />
      </div>
    </div>
    <div class="grid-v -full-height">
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
@import "@/assets/styles/components/ChickenGrid.scss";

.chicken-grid {
  overflow: hidden;

  transition: transform 0.5s ease-in-out;
}

.grid {
  font-size: $size-root;
}
.grid__container {
  height: 100%;

  &.-grid {
    position: relative;
    background: repeating-linear-gradient(
      to bottom,
      red 0 0.1vh,
      transparent 0 $gutter,
      green $gutter calc(#{$gutter} + 0.1vh),
      transparent $gutter calc(#{$size-root} - #{$gutter}),
      green calc(#{$size-root} - #{$gutter})
        calc(#{$size-root} - #{$gutter} + 0.1vh),
      transparent calc(#{$size-root} - #{$gutter}) $size-root
    );
  }
  &.-grid:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0 calc(#{$gutter} + #{$row}),
      purple calc(#{$gutter} + #{$row}) calc(#{$gutter} + #{$row} + 0.1vh),
      transparent calc(#{$gutter} + #{$row}) calc(#{$gutter} * 2 + #{$row}),
      purple calc(#{$gutter} * 2 + #{$row})
        calc(#{$gutter} * 2 + #{$row} + 0.1vh),
      transparent calc(#{$gutter} * 2 + #{$row}) $size-root
    );
  }
}

.grid-v {
  width: $container-width;
  margin: 0 auto;
  font-size: $size-root-v;
  display: flex;
  justify-content: space-between;
}

.-full-height {
  max-height: 100vh;
  height: 100vh;
  overflow: hidden;
}
</style>
