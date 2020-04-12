<template>
  <svg :class="['svg-line', moduleClasses]" height="100%" width="100%">
    <line :x1="start.x" :y1="start.y" :x2="end.x" :y2="end.y" />
  </svg>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { MouseShape } from "@/store/types/browser.ts";
import { PairingStates } from "./DotsConnection";

@Component
export default class DotLine extends Vue {
  @Prop({ default: { x: 0, y: 0 } }) readonly startPoint!: MouseShape;
  @Prop({ default: { x: 0, y: 0 } }) readonly endPoint!: MouseShape;
  @Prop() readonly pairingState!: PairingStates;

  get start() {
    return {
      x: `${this.startPoint.x}px`,
      y: `${this.startPoint.y}px`
    };
  }
  get end() {
    return {
      x: `${this.endPoint.x}px`,
      y: `${this.endPoint.y}px`
    };
  }
  get moduleClasses() {
    if (this.pairingState === PairingStates.Paired) {
      return "-is-paired";
    } else if (this.pairingState === PairingStates.NotPaired) {
      return "-not-paired";
    }

    return "";
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";

.svg-line {
  position: absolute;
}
line {
  stroke: black;
  stroke-width: 2px;
}

// states
.svg-line.-not-paired {
  line {
    stroke: gray;
  }
}
</style>
