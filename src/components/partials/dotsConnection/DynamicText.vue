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
    <p v-else>{{ pairedText }}</p>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { ConnectStates, PairingStates, NodeTypes } from "./DotsConnection";

enum ModuleStates {
  Default = "default",
  Hidden = "hidden",
  NotPaired = "notPaired",
  Paired = "paired"
}

@Component
export default class CanvasBackground extends Vue {
  @Prop() readonly connectState!: ConnectStates;
  @Prop() readonly pairingState!: PairingStates;
  @Prop() readonly startNode!: NodeTypes | null;
  @Prop() readonly endNode!: NodeTypes | null;

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
        return "chicken";
      case NodeTypes.Parrot:
        return "parrot";
      case NodeTypes.Sparrow:
        return "sparrow";
      default:
        return "chicken";
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

  // methods
  onMouseEntered(event: Event) {
    this.$emit("onMouseEnter", event.currentTarget.dataset.pointDirection);
  }
  onMouseLeft() {
    this.$emit("onMouseLeave", null);
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

// states
.text.-is-hidden {
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
}
.text.-is-paired {
  & p {
    padding: 16px;
    background-color: white;
  }
}
</style>
