<template>
  <div
    :class="['main -flex-center-all -full-width -full-height', moduleClasses]"
  >
    <div class="img-wrapper -top" :style="[canvasImgFirst]"></div>
    <div class="text">
      <p class="text__content">= ?</p>
    </div>
    <div class="img-wrapper -btm" :style="[canvasImgLast]"></div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { ConnectStates, NodeTypes, PairingStates } from "./DotsConnection";

const urls = {
  chicken: ["https://media.giphy.com/media/MtU53HV4RWccE/giphy.gif"],
  food: ["https://media.giphy.com/media/jqwk5Jxh8UcbMZbxK7/giphy.gif"],
  sparrow: ["https://media.giphy.com/media/RksrTsDMQJ29O/giphy.gif"],
  neighbor: ["https://media.giphy.com/media/PsLIN8YlKy4rS/giphy.gif"],
  parrot: ["https://media.giphy.com/media/Ddm5ER7Z45sIM/giphy.gif"],
  pet: ["https://media.giphy.com/media/fYleqGp1DQvWoYC3AZ/giphy.gif"]
};

enum ModuleStates {
  StartNodeActive,
  AllNodesActive,
  TempNodeActive,
  NotActive
}

@Component
export default class CanvasBackground extends Vue {
  @Prop() readonly connectState!: ConnectStates;
  @Prop() readonly startNode!: NodeTypes | null;
  @Prop() readonly endNode!: NodeTypes | null;
  @Prop() readonly tempNode!: NodeTypes | null;
  @Prop() readonly isPaired!: PairingStates;

  // computed
  get canvasImgFirst() {
    if (
      this.moduleStates === ModuleStates.StartNodeActive ||
      this.moduleStates === ModuleStates.AllNodesActive
    ) {
      const url = urls[this.startNode][0];

      return {
        backgroundImage: `url("${url}")`
      };
    } else if (this.moduleStates === ModuleStates.TempNodeActive) {
      const url = urls[this.tempNode][0];

      return {
        backgroundImage: `url("${url}")`
      };
    }

    return "";
  }
  get canvasImgLast() {
    if (this.moduleStates === ModuleStates.StartNodeActive) {
      const url = this.tempNode ? urls[this.tempNode][0] : "";

      return {
        backgroundImage: `url("${url}")`
      };
    } else if (this.moduleStates === ModuleStates.AllNodesActive) {
      const url = urls[this.endNode][0];

      return {
        backgroundImage: `url("${url}")`
      };
    }

    return "";
  }
  // get textContent() {
  //   let text = "";
  //   switch (this.isPaired) {
  //     case PairingStates.Paired:
  //       text = "is";
  //       break;
  //     case PairingStates.NotPaired:
  //       text = "is not";
  //       break;
  //     case PairingStates.Pending:
  //       text = "is ?";
  //       break;
  //   }

  //   return text;
  // }
  get moduleClasses() {
    if (this.moduleStates === ModuleStates.TempNodeActive) {
      return "-is-temp-active";
    } else if (this.moduleStates !== ModuleStates.NotActive) {
      return "-is-active";
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
          return ModuleStates.AllNodesActive;
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
  height: 16%;
  width: 8%;
  background-position: center;
}
.img-wrapper__img {
  width: 100%;
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
  }
}
</style>
