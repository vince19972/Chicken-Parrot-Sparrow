<template>
  <div
    :class="['main -flex-center-all -full-width -full-height', moduleClasses]"
  >
    <div
      class="img-wrapper -top"
      :style="[canvasImgFirst, imgsStyleFirst]"
      ref="firstImg"
    ></div>
    <div class="text">
      <p class="text__content">= ?</p>
    </div>
    <div
      class="img-wrapper -btm"
      :style="[canvasImgLast, imgsStyleLast]"
      ref="lastImg"
    ></div>
  </div>
</template>

<script lang="ts">
import { Watch, Prop, Component, Vue } from "vue-property-decorator";
import {
  ConnectStates,
  NodeTypes,
  PairingStates,
  gifUrls,
  getOffset
} from "./DotsConnection";

enum ModuleStates {
  StartNodeActive,
  AllNodesActive,
  TempNodeActive,
  NotActive,
  isPaired
}

@Component
export default class CanvasBackground extends Vue {
  @Prop() readonly connectState!: ConnectStates;
  @Prop() readonly startNode!: NodeTypes | null;
  @Prop() readonly endNode!: NodeTypes | null;
  @Prop() readonly tempNode!: NodeTypes | null;
  @Prop() readonly isPaired!: PairingStates;

  // data
  firstImgTransformCoord = {
    x: 0,
    y: 0
  };
  lastImgTransformCoord = {
    x: 0,
    y: 0
  };

  // computed
  get canvasImgFirst() {
    if (
      this.moduleStates === ModuleStates.StartNodeActive ||
      this.moduleStates === ModuleStates.isPaired
    ) {
      const url = this.startNode ? gifUrls[this.startNode][0] : "";

      return {
        backgroundImage: `url("${url}")`
      };
    } else if (this.moduleStates === ModuleStates.TempNodeActive) {
      const url = this.tempNode ? gifUrls[this.tempNode][0] : "";

      return {
        backgroundImage: `url("${url}")`
      };
    }

    return "";
  }
  get canvasImgLast() {
    if (this.moduleStates === ModuleStates.StartNodeActive) {
      const url = this.tempNode ? gifUrls[this.tempNode][0] : "";

      return {
        backgroundImage: `url("${url}")`
      };
    } else if (this.moduleStates === ModuleStates.isPaired) {
      const url = this.endNode ? gifUrls[this.endNode][0] : "";

      return {
        backgroundImage: `url("${url}")`
      };
    }

    return "";
  }
  get imgsStyleFirst() {
    return {
      transform: `translate3d(${this.firstImgTransformCoord.x}px, ${this.firstImgTransformCoord.y}px, 0)`
    };
  }
  get imgsStyleLast() {
    return {
      transform: `translate3d(${this.lastImgTransformCoord.x}px, ${this.lastImgTransformCoord.y}px, 0)`
    };
  }
  get moduleClasses() {
    if (this.moduleStates === ModuleStates.TempNodeActive) {
      return "-is-temp-active";
    } else if (this.moduleStates !== ModuleStates.NotActive) {
      const pairedState =
        this.moduleStates === ModuleStates.isPaired ? "-is-paired" : "";
      return ["-is-active", pairedState];
    }

    return "";
  }
  get moduleStates() {
    if (this.connectState === ConnectStates.Connectionless) {
      if (this.tempNode) {
        return ModuleStates.TempNodeActive;
      }
    } else if (this.connectState === ConnectStates.Connecting) {
      if (this.startNode) {
        return ModuleStates.StartNodeActive;
      }
    } else if (this.connectState === ConnectStates.Connected) {
      if (this.startNode && this.endNode) {
        if (this.isPaired === PairingStates.Paired) {
          return ModuleStates.isPaired;
        } else {
          return ModuleStates.NotActive;
        }
      }
    }

    return ModuleStates.NotActive;
  }

  // watcher
  @Watch("moduleStates")
  watchModuleState() {
    if (this.moduleStates === ModuleStates.isPaired) {
      // get required coordinations
      const pairedNodes = document.querySelectorAll(
        ".nodes__node.-is-active .nodes__node-dot"
      );
      const topNodeCoord = getOffset(pairedNodes[0]);
      const btmNodeCoord = getOffset(pairedNodes[1]);

      const firstImgCoord = getOffset(<Element>this.$refs.firstImg);
      const lastImgCoord = getOffset(<Element>this.$refs.lastImg);

      // check destination for each image
      const firstImgDestination =
        this.startNode === NodeTypes.Chicken ||
        this.startNode === NodeTypes.Sparrow ||
        this.startNode === NodeTypes.Parrot
          ? btmNodeCoord
          : topNodeCoord;
      const lastImgDestination =
        firstImgDestination === btmNodeCoord ? topNodeCoord : btmNodeCoord;

      // calculate transformation values
      const firstImgDestCoord = {
        x: (firstImgCoord.x - firstImgDestination.x) * -1,
        y: (firstImgCoord.y - firstImgDestination.y) * -1
      };
      const lastImgDestCoord = {
        x: (lastImgCoord.x - lastImgDestination.x) * -1,
        y: (lastImgCoord.y - lastImgDestination.y) * -1
      };

      // assign values to local data, and process at computed()
      this.firstImgTransformCoord = firstImgDestCoord;
      this.lastImgTransformCoord = lastImgDestCoord;
    } else {
      this.firstImgTransformCoord = {
        x: 0,
        y: 0
      };
      this.lastImgTransformCoord = {
        x: 0,
        y: 0
      };
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";

.img-wrapper {
  overflow: hidden;
  height: 16%;
  width: 8%;
  background-position: center;

  transform-origin: center;
}
.text {
  margin: 0 2vw;
  font-size: 1.8vw;
}

// state
.main {
  & .img-wrapper,
  & .text {
    opacity: 0;
    pointer-events: none;
  }

  &.-is-temp-active .img-wrapper {
    opacity: 1;
  }
  &.-is-active > * {
    opacity: 1;
    transition: transform 0.8s;
    z-index: -1;
  }
  &.-is-active.-is-paired {
    & .text {
      opacity: 0;
    }
  }
}
</style>
