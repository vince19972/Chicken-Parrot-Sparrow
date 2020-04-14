<template>
  <div class="produce">
    <div class="lead">
      <div class="lead-input -bar"></div>
      <p class="lead-text -f-grid-condensed" ref="textLead">CHICKEN</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Produce extends Vue {}
</script>

<style scoped lang="scss">
@import "@/assets/styles/sections/GridSection.scss";

$bar-duration: 1.5s;
$input-bar-length: 100%;
$inner-bar-height: 10vh;

.produce {
  height: 100%;
  writing-mode: vertical-rl;
  border-right: calc(#{$gutter-v} / 2) solid black;
}

.-bar {
  background-color: black;
}
.lead-input.-bar {
  position: relative;
  height: $input-bar-length;
  width: calc(#{$gutter-v} / 1.5);
  margin-bottom: calc(#{$v-gutter-v} / 6);
  border-radius: 0 0 calc(#{$gutter-v}* 0.5) calc(#{$gutter-v}* 0.5);
}
.lead-input.-bar:after {
  content: "";
  position: absolute;
  top: 0;
  left: calc((100% - 15%) / 2);
  width: 15%;
  height: $inner-bar-height;
  background-color: white;
}

.lead {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.lead-text {
  font-size: $f-size-lead;
  line-height: $f-size-lead;
}

@keyframes moveInputBar {
  0%,
  100% {
    transform: translate3d(0, -100%, 0);
  }
  30% {
    transform: translate3d(0, -1%, 0);
  }
  80% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes moveLeadText {
  0%,
  100% {
    letter-spacing: normal;
  }
  30% {
    letter-spacing: -1.9rem;
  }
  80% {
    letter-spacing: -2rem;
  }
}
@keyframes moveInnerBar {
  0%,
  100% {
    opacity: 0;
    top: -100%;
  }
  60% {
    opacity: 1;
    top: -100%;
  }
  79% {
    opacity: 1;
    top: calc(100% - #{$inner-bar-height});
  }
  80% {
    opacity: 1;
    top: 100vh;
  }
  81% {
    opacity: 0;
  }
}

.lead-input,
.lead-text,
.lead-input.-bar:after {
  // animation-timing-function: ease-in-out;
  animation-duration: $bar-duration;
  animation-iteration-count: infinite;
}
.lead-input {
  animation-name: moveInputBar;
}
.lead-text {
  animation-name: moveLeadText;
}
.lead-input.-bar:after {
  animation-name: moveInnerBar;
}
</style>
