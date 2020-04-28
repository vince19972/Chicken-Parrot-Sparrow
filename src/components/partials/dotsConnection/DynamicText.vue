<template>
  <div :class="['text -full-width -text-align-center', moduleClasses]">
    <p v-if="moduleState === 'default'">
      try to connect the
      <span
        class="text__wrapper -point-up"
        data-point-direction="up"
        @mouseenter="onMouseEntered"
        @mouseleave="onMouseLeft"
        >bird</span
      >
      with its
      <span
        class="text__wrapper -point-down"
        data-point-direction="down"
        @mouseenter="onMouseEntered"
        @mouseleave="onMouseLeft"
        >role</span
      >
      in modern society
    </p>
    <p v-else-if="moduleState === 'hidden'"></p>
    <p v-else-if="moduleState === 'notPaired'" class="transition-text">
      <span class="answer-icon">⨯</span>
      {{ unPairedText }}
    </p>
    <p
      v-else-if="moduleState === 'paired'"
      v-html="pairedText"
      class="transition-text"
    ></p>
    <div v-else class="transition-text">
      <p class="text__end">
        All pairs are connected.
      </p>
      <p class="text__end">
        Thank you for reviewing each bird's roles defined by the modern
        societies.
      </p>
      <p class="text__end">
        Read more about the
        <router-link to="/reading-list"> stories of the birds </router-link>,
        <router-link to="/about">the project</router-link>, or try
        <button @click="onRestartBtnClicked">
          connecting all the dots again</button
        >.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Watch, Prop, Component, Vue } from "vue-property-decorator";
import { ConnectStates, PairingStates, NodeTypes } from "./DotsConnection";
import { pairedTextSets, unpairedTextSets } from "./DynamicText";

enum ModuleStates {
  Default = "default",
  Hidden = "hidden",
  NotPaired = "notPaired",
  Paired = "paired",
  AllPaired = "allPaired",
}

@Component
export default class CanvasBackground extends Vue {
  @Prop() readonly connectState!: ConnectStates;
  @Prop() readonly pairingState!: PairingStates;
  @Prop() readonly startNode!: NodeTypes | any;
  @Prop() readonly endNode!: NodeTypes | any;

  // data
  pairedTexts = {
    chicken: pairedTextSets.chicken.first,
    parrot: pairedTextSets.parrot.first,
    sparrow: pairedTextSets.sparrow.first,
  };
  unPairedTexts = {
    chicken: "",
    parrot: "",
    sparrow: "",
  };
  isAllPaired = false;

  // getter
  get pairedText() {
    switch (this.startNode) {
      case NodeTypes.Chicken:
        return this.pairedTexts.chicken;
      case NodeTypes.Parrot:
        return this.pairedTexts.parrot;
      case NodeTypes.Sparrow:
        return this.pairedTexts.sparrow;
      default:
        return "";
    }
  }
  get unPairedText() {
    switch (this.startNode) {
      case NodeTypes.Chicken:
        return this.unPairedTexts.chicken;
      case NodeTypes.Parrot:
        return this.unPairedTexts.parrot;
      case NodeTypes.Sparrow:
        return this.unPairedTexts.sparrow;
      default:
        return "";
    }
  }
  get moduleState() {
    let state: ModuleStates = ModuleStates.Default;

    if (!this.isAllPaired) {
      switch (this.connectState) {
        case ConnectStates.Connecting:
          state = ModuleStates.Hidden;
          break;
        case ConnectStates.Connected:
          state =
            this.pairingState === PairingStates.NotPaired
              ? ModuleStates.NotPaired
              : ModuleStates.Paired;
          break;
        default:
          state = ModuleStates.Default;
          break;
      }
    } else {
      state = ModuleStates.AllPaired;
    }

    return state;
  }

  // computed
  get moduleClasses() {
    if (this.moduleState === ModuleStates.Paired) {
      return "-is-paired";
    } else {
      return "";
    }
  }

  // user events
  onMouseEntered(event: any) {
    this.$emit("onMouseEnter", event.currentTarget.dataset.pointDirection);
  }
  onMouseLeft() {
    this.$emit("onMouseLeave", null);
  }
  onRestartBtnClicked() {
    this.$store.commit("resetConnectedPair");
    this.isAllPaired = this.$store.getters["allPaired"];
  }

  // helpers
  changePairedText(updateChoice: "first" | "second" | "third") {
    switch (this.startNode) {
      case NodeTypes.Chicken:
        this.pairedTexts.chicken = pairedTextSets.chicken[updateChoice];
        break;
      case NodeTypes.Parrot:
        this.pairedTexts.parrot = pairedTextSets.parrot[updateChoice];
        break;
      case NodeTypes.Sparrow:
        this.pairedTexts.sparrow = pairedTextSets.sparrow[updateChoice];
        break;
    }
  }
  changeUnPairedText() {
    const { chickenText, parrotText, sparrowText } = unpairedTextSets;

    switch (this.startNode) {
      case NodeTypes.Chicken:
        this.unPairedTexts.chicken =
          this.endNode === NodeTypes.Pet
            ? chickenText.pet
            : chickenText.neighbor;
        break;
      case NodeTypes.Parrot:
        this.unPairedTexts.parrot =
          this.endNode === NodeTypes.Food
            ? parrotText.food
            : parrotText.neighbor;
        break;
      case NodeTypes.Sparrow:
        this.unPairedTexts.sparrow =
          this.endNode === NodeTypes.Food ? sparrowText.food : sparrowText.pet;
        break;
      default:
        return "";
    }
  }

  // watcher
  @Watch("moduleState")
  watchPairingState() {
    if (this.moduleState === ModuleStates.Paired) {
      const delayTime = 4500;
      const isShortPair =
        this.startNode === NodeTypes.Sparrow ||
        this.startNode === NodeTypes.Neighbor ||
        this.isAllPaired;
      const finalDelayTime = isShortPair ? delayTime * 2 : delayTime * 3;
      /*
       ** text content transformation
       */
      // reset to initial text content
      this.changePairedText("first");
      // and update
      setTimeout(() => {
        this.changePairedText("second");
      }, delayTime);
      // sparrow pair doesn't have third paragraph
      if (!isShortPair) {
        setTimeout(() => {
          this.changePairedText("third");
        }, delayTime * 2);
      }

      /*
       ** routing
       */
      setTimeout(() => {
        switch (this.startNode) {
          case NodeTypes.Chicken:
          case NodeTypes.Food:
            this.$router.push({ path: NodeTypes.Chicken });
            break;
          case NodeTypes.Parrot:
          case NodeTypes.Pet:
            this.$router.push({ path: NodeTypes.Parrot });
            break;
          case NodeTypes.Sparrow:
          case NodeTypes.Neighbor:
            this.$router.push({ path: NodeTypes.Sparrow });
            break;
        }
      }, finalDelayTime);
    } else if (this.moduleState === ModuleStates.NotPaired) {
      this.changeUnPairedText();

      setTimeout(() => {
        this.unPairedTexts[this.startNode] = "let's try another connection";
      }, 4000);
    }
  }

  // life cycle
  mounted() {
    this.isAllPaired = this.$store.getters["allPaired"];
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";

.text {
  font-size: 1.8vw;
  transition: all 0.3s;
}
.text__wrapper {
  position: relative;

  &:before {
    position: absolute;
    left: 45%;
    font-size: 0.8em;
    transition: all 0.3s;
  }
  &.-point-up:before {
    top: -43%;
    content: "↑";
  }
  &.-point-down:before {
    bottom: -45%;
    content: "↓";
  }

  // hover
  @include hover {
    cursor: default;

    &:before {
      transition: all 0.3s;
    }
    &.-point-up:before {
      transform: translate3d(0, -8px, 0);
    }
    &.-point-down:before {
      transform: translate3d(0, 8px, 0);
    }
  }
}

.text .answer-icon {
  display: block;
  font-size: 2.5vw;
}

.transition-text,
.transition-text ::v-deep .span-text {
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes highlight {
    0%,
    50% {
      width: 0;
      color: black;
    }
    100% {
      width: 100%;
      color: white;
    }
  }

  animation: fade 2s;
  transition: opacity 2s;

  & .keyword {
    display: inline-block;
    position: relative;

    & span {
      position: relative;
      z-index: 1;
      color: white;
      padding: 6px 8px 2px 8px;
      animation: highlight 2s;
    }
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 115%;
      background-color: black;
      z-index: 0;

      animation: highlight 2s;
    }
  }
}

.transition-text .text__end {
  background-color: white;
  font-size: 1.5vw;
  line-height: 2.5vw;

  &:first-child {
    padding-top: 24px;
  }
  &:last-child {
    padding-bottom: 24px;
  }
  & button {
    text-decoration: underline;
  }
}

// states
.text.-is-hidden {
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
}
.text.-is-paired {
  & p {
    padding: 24px;
    background-color: white;
  }
}
</style>
