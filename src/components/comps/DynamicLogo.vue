<template>
  <div :class="['dynamic-logo', logoClasses]">
    <div :class="['main -flex-between']">
      <div class="main__text -chicken" ref="chicken">CHICKEN</div>
      <div class="main__text -parrot" ref="parrot">PARROT</div>
      <div class="main__text -sparrow" ref="sparrow">SPARROW</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";

@Component({
  name: "DynamicLogo",
})
export default class DynamicLogo extends Vue {
  @Prop() readonly toExpand!: boolean;

  // state
  // isExpanded = false;

  // styles
  get logoClasses() {
    return [this.toExpand ? "-is-expanded" : ""];
  }

  // cycle
  mounted() {
    setTimeout(() => {
      // this.isExpanded = true;
    }, 1000);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";

.dynamic-logo {
  position: relative;
}

.main {
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0.28em;
    left: 0;
    width: 100%;
    height: 0.03em;
    background-color: black;

    // for animate
    transform-origin: center;
    transform: scaleX(0);
    transition: transform 0s;
  }
}

.main__text {
  @include -f-main-b;
  font-size: 1em;
  position: relative;
  z-index: 1;

  &:last-child {
    background-color: white;
    padding-left: 0.5em;
  }
  &:first-child {
    padding-right: 0.5em;
  }
}

// animations
$offset-y: 1.4em;
$first-translate: translate3d(0, calc(#{$offset-y} * -2), 0);
$second-translate: translate3d(0, calc(#{$offset-y} * -1), 0);

@keyframes moveFirstText {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: $first-translate;
  }
}
@keyframes moveSecondText {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: $second-translate;
  }
}

.main__text {
  animation-timing-function: ease-in-out;
  animation-duration: 1s;
}

// states
.dynamic-logo.-is-expanded {
  & .main:after {
    transform: scaleX(1);
    transition: transform 1s;
  }

  & .main__text:first-child {
    transform: $first-translate;
    animation-name: moveFirstText;
  }
  & .main__text:nth-child(2) {
    transform: $second-translate;
    animation-name: moveSecondText;
  }
}
</style>
