<template>
  <div class="main -flex-center-all -full-width -full-height">
    <div class="img-wrapper -top" :style="[canvasImgFirst]"></div>
    <div class="img-wrapper -btm" :style="[canvasImgLast]"></div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { ConnectStates, NodeTypes } from "./DotsConnection";

const urls = {
  chicken: ["https://media.giphy.com/media/MtU53HV4RWccE/giphy.gif"],
  food: ["https://media.giphy.com/media/jqwk5Jxh8UcbMZbxK7/giphy.gif"],
  sparrow: ["https://media.giphy.com/media/RksrTsDMQJ29O/giphy.gif"],
  neighbor: ["https://media.giphy.com/media/PsLIN8YlKy4rS/giphy.gif"],
  parrot: ["https://media.giphy.com/media/Ddm5ER7Z45sIM/giphy.gif"],
  pet: ["https://media.giphy.com/media/fYleqGp1DQvWoYC3AZ/giphy.gif"]
};

@Component
export default class CanvasBackground extends Vue {
  @Prop() readonly connectState!: ConnectStates;
  @Prop() readonly startNode!: NodeTypes | null;
  @Prop() readonly endNode!: NodeTypes | null;
  @Prop() readonly tempNode!: NodeTypes | null;
  @Prop() readonly isPaired!: boolean;

  // computed
  get canvasImgFirst() {
    if (this.connectState !== ConnectStates.Connectionless && this.startNode) {
      const url = urls[this.startNode][0];

      return {
        backgroundImage: `url("${url}")`
      };
    } else if (
      this.connectState === ConnectStates.Connectionless &&
      this.tempNode
    ) {
      const url = urls[this.tempNode][0];

      return {
        backgroundImage: `url("${url}")`
      };
    }

    return "";
  }
  get canvasImgLast() {
    if (this.connectState === ConnectStates.Connected && this.endNode) {
      const url = urls[this.endNode][0];

      return {
        backgroundImage: `url("${url}")`
      };
    }

    return "";
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";

.img-wrapper {
  overflow: hidden;
  height: 20%;
  width: 10%;
  background-position: center;
}
.img-wrapper__img {
  width: 100%;
}
</style>
