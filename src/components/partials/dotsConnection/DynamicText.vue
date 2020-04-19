<template>
  <div :class="['text -full-width -text-align-center', moduleClasses]">
    <p v-if="moduleState === 'default'">
      connect the
      <span
        class="text__wrapper -point-down"
        data-point-direction="down"
        @mouseenter="onMouseEntered"
        @mouseleave="onMouseLeft"
        >creature</span
      >
      and its
      <span
        class="text__wrapper -point-up"
        data-point-direction="up"
        @mouseenter="onMouseEntered"
        @mouseleave="onMouseLeft"
        >role</span
      >
      in New York City
    </p>
    <p v-else-if="moduleState === 'hidden'"></p>
    <p v-else-if="moduleState === 'notPaired'">
      🙅🏻 <br />
      {{ unPairedText }}
    </p>
    <p v-else v-html="pairedText" class="transition-text"></p>
  </div>
</template>

<script lang="ts">
import { Watch, Prop, Component, Vue } from "vue-property-decorator";
import { ConnectStates, PairingStates, NodeTypes } from "./DotsConnection";

enum ModuleStates {
  Default = "default",
  Hidden = "hidden",
  NotPaired = "notPaired",
  Paired = "paired"
}

const wrapperClass = {
  pre: "<span class='span-text'>",
  suf: "</span>"
};
const pairedTextSets = {
  chicken: {
    first: `${wrapperClass.pre} yes. chicken is treated as food, not bird. ${wrapperClass.suf}`,
    second: `${wrapperClass.pre} but how is <span class='keyword'><span>chicken</span></span> transformed from a living bird to <span class='keyword'><span>food</span></span>? ${wrapperClass.suf}`
  },
  parrot: {
    first: `${wrapperClass.pre} yes, parrot is sold as product with price tag. ${wrapperClass.suf}`,
    second: `${wrapperClass.pre} but how do we change <span class='keyword'><span>parrot</span></span> from a bird flying in sky to <span class='keyword'><span>pet</span></span>? ${wrapperClass.suf}`
  },
  sparrow: {
    first: `${wrapperClass.pre} yes, sparrow is viewed as our neighbor. ${wrapperClass.suf}`,
    second: `${wrapperClass.pre} but how does <span class='keyword'><span>sparrow</span></span> becomes <span class='keyword'><span>neighbor</span></span>? ${wrapperClass.suf}`
  }
};

@Component
export default class CanvasBackground extends Vue {
  @Prop() readonly connectState!: ConnectStates;
  @Prop() readonly pairingState!: PairingStates;
  @Prop() readonly startNode!: NodeTypes | null;
  @Prop() readonly endNode!: NodeTypes | null;

  // data
  pairedTexts = {
    chicken: pairedTextSets.chicken.first,
    parrot: pairedTextSets.parrot.first,
    sparrow: pairedTextSets.sparrow.first
  };

  // computed
  get unPairedText() {
    const chickenText = {
      pet: "unfortunately for chicken, most people don't keep them as pet.",
      neighbor: "nope. i've never seen a chicken perching on the sidewalks."
    };
    const parrotText = {
      food:
        "luckily for parrot, we don't eat them. please don't tell me you do.",
      neighbor:
        "yes, in some places like Canberra. but normally we don't see them as neighbor."
    };
    const sparrowText = {
      food: "well, people used to eat them, but not anymore in most places.",
      pet: "nope. pet stores don't sell them as pet."
    };

    switch (this.startNode) {
      case NodeTypes.Chicken:
        return this.endNode === NodeTypes.Pet
          ? chickenText.pet
          : chickenText.neighbor;
      case NodeTypes.Parrot:
        return this.endNode === NodeTypes.Food
          ? parrotText.food
          : parrotText.neighbor;
      case NodeTypes.Sparrow:
        return this.endNode === NodeTypes.Food
          ? sparrowText.food
          : sparrowText.pet;
      default:
        return "";
    }
  }
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
  get moduleClasses() {
    if (this.moduleState === ModuleStates.Paired) {
      return "-is-paired";
    } else {
      return "";
    }
  }
  get moduleState() {
    let state: ModuleStates = ModuleStates.Default;

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

    return state;
  }

  // user events
  onMouseEntered(event: Event) {
    this.$emit("onMouseEnter", event.currentTarget.dataset.pointDirection);
  }
  onMouseLeft() {
    this.$emit("onMouseLeave", null);
  }

  // helpers
  changePairedText(updateChoice: "first" | "second") {
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

  // watcher
  @Watch("moduleState")
  watchPairingState() {
    if (this.moduleState === ModuleStates.Paired) {
      /*
       ** text content transformation
       */
      // reset to initial text content
      this.changePairedText("first");

      // and update
      setTimeout(() => {
        this.changePairedText("second");
      }, 2000);

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
        }
      }, 6000);
    }
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
