<template>
  <div
    :class="['main -flex-center-all -full-width -full-height', moduleClasses]"
  >
    <div class="img-wrapper -top" :style="[imgStyles]"></div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import {
  ConnectStates,
  NodeTypes,
  PairingStates,
  gifUrls,
} from "./DotsConnection";

enum ModuleStates {
  StartNodeActive,
  AllNodesActive,
  TempNodeActive,
  NotActive,
  isPaired,
}

@Component
export default class CanvasBackground extends Vue {
  @Prop() readonly connectState!: ConnectStates;
  @Prop() readonly startNode!: NodeTypes | null;
  @Prop() readonly tempNode!: NodeTypes | null;
  @Prop() readonly isPaired!: PairingStates;

  // computed
  get imgStyles() {
    if (
      this.moduleStates === ModuleStates.StartNodeActive ||
      this.moduleStates === ModuleStates.isPaired
    ) {
      // const url = gifUrls[this.startNode][0];
      let url = "";
      switch (this.startNode) {
        case "chicken":
          url = gifUrls.chicken[0];
          break;
        case "parrot":
          url = gifUrls.parrot[0];
          break;
        case "sparrow":
          url = gifUrls.sparrow[0];
          break;
        default:
          url = gifUrls.chicken[0];
          break;
      }

      return {
        backgroundImage: `url("${url}")`,
      };
    }
    // else if (this.moduleStates === ModuleStates.TempNodeActive) {
    //   const url = gifUrls[this.tempNode][0];

    //   return {
    //     backgroundImage: `url("${url}")`,
    //   };
    // }

    return "";
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
      if (this.startNode) {
        if (this.isPaired === PairingStates.Paired) {
          return ModuleStates.isPaired;
        } else {
          return ModuleStates.NotActive;
        }
      }
    }

    return ModuleStates.NotActive;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";

.img-wrapper {
  overflow: hidden;
  height: 15vw;
  width: 15vw;
  background-position: center;
  background-size: cover;

  transition: all 1s;
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
    & .img-wrapper {
      opacity: 0;
    }
  }
}
</style>
