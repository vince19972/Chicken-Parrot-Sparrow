<template>
  <div class="selection">
    <div class="text-group">
      <div class="text-row" v-for="r in textCount.row" :key="r + 'row'">
        <p class="text" v-for="c in textCount.col" :key="c + 'col'">
          {{ textType(c) }}
        </p>
      </div>
    </div>
    <p class="text -hidden" ref="textHidden">CHICKEN</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WindowSize as WindowSizeState } from "@/store/types/browser";

@Component
export default class Selection extends Vue {
  get windowSize(): WindowSizeState {
    return this.$store.getters["browser/windowSize"];
  }
  get textCount() {
    return {
      row: Math.ceil(this.windowSize.height / this.textValue.height),
      col: Math.ceil(this.windowSize.width / this.textValue.width) * 2
    };
  }
  textType(index: number) {
    return index % 2 ? "CHICKEN" : "CHIcKEN";
  }

  textValue = {
    width: this.windowSize.width,
    height: this.windowSize.height
  };

  mounted() {
    const text = this.$refs.textHidden as HTMLElement;
    this.textValue.width = text.offsetWidth;
    this.textValue.height = text.offsetHeight;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/components/ChickenGrid.scss";

.selection {
  font-size: $f-size-lead;
  display: flex;
}

.text-row {
  display: flex;

  &:nth-child(1n) {
    transform: translate3d(-5vw, 0, 0);
  }
  &:nth-child(2n) {
    transform: translate3d(-10vw, 0, 0);
  }
  &:nth-child(3n) {
    transform: translate3d(-20vw, 0, 0);
  }
  &:nth-child(5n) {
    transform: translate3d(-30vw, 0, 0);
  }
}

.text {
  &.-hidden {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
}
</style>
