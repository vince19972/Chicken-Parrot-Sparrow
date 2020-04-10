<template>
  <svg class="svg-line" height="100%" width="100%">
    <line :x1="start.x" :y1="start.y" :x2="end.x" :y2="end.y" />
  </svg>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { MouseShape } from "@/store/types/browser.ts";

@Component
export default class DotLine extends Vue {
  @Prop({ default: { x: 0, y: 0 } })
  readonly startPoint!: MouseShape;

  @Prop({ default: { x: 0, y: 0 } })
  readonly endPoint!: MouseShape;

  get start() {
    return {
      x: `${this.startPoint.x}px`,
      y: `${this.startPoint.y}px`,
    };
  }
  get end() {
    return {
      x: `${this.endPoint.x}px`,
      y: `${this.endPoint.y}px`,
    };
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";

.connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.svg-line {
  position: absolute;
}
line {
  stroke: black;
  stroke-width: 2px;
}
</style>
