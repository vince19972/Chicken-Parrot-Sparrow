<template>
  <div class="chicken">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Produce from "@/components/comps/Chicken/Produce.vue";
import Selection from "@/components/comps/Chicken/Selection.vue";
import Stack from "@/components/comps/Chicken/Stack.vue";

@Component({
  components: {
    Produce,
    Selection,
    Stack
  }
})
export default class ChickenGrid extends Vue {}
</script>

<style scoped lang="scss">
@import "@/assets/styles/components/GridSection.scss";
@import "@/assets/styles/components/ChickenGrid.scss";

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
