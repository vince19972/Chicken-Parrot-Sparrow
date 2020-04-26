<template>
  <div class="lines">
    <svg :class="['svg-line', moduleClasses]" height="100%" width="100%">
      <line :x1="start.x" :y1="start.y" :x2="end.x" :y2="end.y" />
      <line
        v-for="(pair, index) in connectedPairsCountGetter"
        :key="index + pair"
        :x1="getComputedCoord(index).startX"
        :y1="getComputedCoord(index).startY"
        :x2="getComputedCoord(index).endX"
        :y2="getComputedCoord(index).endY"
        class="svg-line__line -connected"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { Watch, Prop, Component, Vue } from "vue-property-decorator";
import { MouseShape } from "@/store/types/browser.ts";
import { NodeTypes, PairingStates, getOffset } from "./DotsConnection";

@Component
export default class DotLine extends Vue {
  @Prop({ default: { x: 0, y: 0 } }) readonly startPoint!: MouseShape;
  @Prop({ default: { x: 0, y: 0 } }) readonly endPoint!: MouseShape;
  @Prop() readonly pairingState!: PairingStates;

  // data
  connectedPairsCount = 0;
  connectedPairsCoord = [];

  // computed
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
  get moduleClasses() {
    if (this.pairingState === PairingStates.Paired) {
      return "-is-paired";
    } else if (this.pairingState === PairingStates.NotPaired) {
      return "-not-paired";
    }

    return "";
  }
  get windowSize() {
    return this.$store.getters["browser/windowSize"];
  }
  get connectedPairs() {
    return this.$store.getters["connectedPairs"];
  }
  get connectedPairsCountGetter() {
    return this.connectedPairsCount;
  }
  getComputedCoord(index: number) {
    if (this.windowSize) {
      return this.connectedPairsCoord[index];
    }
  }

  // getters
  getEndNodeType(startType: NodeTypes) {
    switch (startType) {
      case NodeTypes.Chicken:
        return NodeTypes.Food;
      case NodeTypes.Parrot:
        return NodeTypes.Pet;
      case NodeTypes.Sparrow:
        return NodeTypes.Neighbor;
    }
  }
  getConnectedCoord(startType: NodeTypes) {
    const endNodeType = this.getEndNodeType(startType);

    const dotStart = document.querySelector(
      `.nodes__node[data-node-type='${startType}'] .nodes__node-dot`
    );
    const dotEnd = document.querySelector(
      `.nodes__node[data-node-type='${endNodeType}'] .nodes__node-dot`
    );
    const { x: startX, y: startY } = getOffset(dotStart);
    const { x: endX, y: endY } = getOffset(dotEnd);

    return {
      startType,
      startX,
      startY,
      endX,
      endY,
    };
  }

  // watchers
  @Watch("windowSize")
  watchWindowSize() {
    this.connectedPairsCoord.forEach((pair, index) => {
      const { startX, startY, endX, endY } = this.getConnectedCoord(
        pair.startType
      );
      this.connectedPairsCoord[index] = {
        ...pair,
        startX,
        startY,
        endX,
        endY,
      };
    });
  }

  // cycle
  mounted() {
    for (const property in this.connectedPairs) {
      if (this.connectedPairs[property] === true) {
        this.connectedPairsCount += 1;
        this.connectedPairsCoord.push(this.getConnectedCoord(property));
      }
    }
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
.svg-line__line.-connected {
  stroke: gray;
}
</style>
