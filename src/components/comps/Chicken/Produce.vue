<template>
  <div class="produce">
    <div class="produce__lead">
      <div class="produce__lead-input -bar"></div>
      <p class="produce__lead-text -f-condensed">CHICKEN</p>
    </div>
    <div class="produce__sub">
      <div class="produce__sub-container">
        <div class="produce__sub-output -bar"></div>
        <p class="produce__sub-text">CHIKKEN</p>
      </div>
      <div class="produce__sub-container -btm">
        <div class="produce__sub-output -bar"></div>
        <p class="produce__sub-text">CHICKEN</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export default class Produce extends Vue {}
</script>

<style scoped lang="scss">
@import "@/assets/styles/components/ChickenGrid.scss";

.produce {
  display: flex;

  & .-bar {
    background-color: black;
    width: 0;
  }
  &__lead-input.-bar {
    height: calc(#{$gutter} / 2);
    margin-right: calc(#{$v-gutter} / 6);
  }
  &__sub-output.-bar {
    height: calc(#{$gutter} / 4);
    margin-left: calc(#{$v-gutter} / 10);
    margin-right: calc(#{$v-gutter} / 8);
  }

  &__lead {
    display: flex;
    align-items: center;

    &-text {
      font-size: $f-size-lead;
      line-height: $f-size-lead;
    }
  }

  &__sub {
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(#{$row} * 2 + #{$gutter});

    &-container {
      display: flex;
      align-items: center;
    }
    &-container.-btm {
      margin-top: calc(#{$gutter} * -0.8);
    }

    &-text {
      font-size: calc(#{$f-size-sub-val} * 1em);
      line-height: calc(
        (#{$g-horizontal-row-height} + #{$g-horizontal-gutter-height} * 2) * #{$size-root}
      );
    }
  }
}

$bar-duration: 1s;
$input-bar-length: calc(#{$v-gutter} * 2);
$output-duration: 1s;
$output-bar-length: $v-gutter;

@keyframes moveInputBar {
  0% {
    width: 0;
  }
  25%,
  100% {
    width: $input-bar-length;
  }
}
@keyframes moveOutputBar {
  0%,
  25% {
    width: 0;
  }
  50%,
  100% {
    width: $output-bar-length;
  }
}

.produce {
  &__lead-input {
    animation-name: moveInputBar;
    animation-timing-function: ease-in-out;
    animation-duration: $bar-duration;
    animation-iteration-count: infinite;
  }
  &__sub-output {
    animation-name: moveOutputBar;
    animation-timing-function: ease-in-out;
    animation-duration: $bar-duration;
    animation-iteration-count: infinite;
  }
}
</style>
