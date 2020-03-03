<template>
  <div class="produce">
    <div class="lead">
      <div class="lead-input -bar"></div>
      <p class="lead-text -f-condensed" ref="textLead">CHICKEN</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Produce extends Vue {}
</script>

<style scoped lang="scss">
@import "@/assets/styles/components/ChickenGrid.scss";

$bar-duration: 1s;
$input-bar-length: 100%;

.produce {
  height: 100%;
  writing-mode: vertical-rl;
  border-right: calc(#{$gutter-v} / 2) solid black;
}

.-bar {
  background-color: black;
}
.lead-input.-bar {
  height: $input-bar-length;
  width: calc(#{$gutter-v});
  margin-bottom: calc(#{$v-gutter-v} / 6);
  border-radius: 0 0 calc(#{$gutter-v}* 0.5) calc(#{$gutter-v}* 0.5);
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
  50% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes moveLeadText {
  0%,
  100% {
    letter-spacing: normal;
  }
  50% {
    letter-spacing: -0.2rem;
  }
}

.lead-input {
  animation-name: moveInputBar;
  animation-timing-function: ease-in-out;
  animation-duration: $bar-duration;
  animation-iteration-count: infinite;
}
.lead-text {
  animation-name: moveLeadText;
  animation-timing-function: ease-in-out;
  animation-duration: $bar-duration;
  animation-iteration-count: infinite;
}
</style>
