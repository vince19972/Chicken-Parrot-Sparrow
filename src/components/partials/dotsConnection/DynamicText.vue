<template>
  <p :class="['text -full-width -text-align-center', mainClasses]">
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
    in our city
  </p>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { ConnectStates } from "./DotsConnection";

@Component
export default class CanvasBackground extends Vue {
  @Prop() readonly connectState!: ConnectStates;
  @Prop() readonly isPaired!: boolean;

  // computed
  get mainClasses() {
    return this.connectState === ConnectStates.Connecting ? "-is-hidden" : "";
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
</style>
