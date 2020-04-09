<template>
  <div class="dots-connection -safe-zone">
    <div class="container -flex-column">
      <div class="container__top">
        <div class="nodes -top -flex-between">
          <div class="nodes__node">
            <h2 class="nodes__node-text">chicken</h2>
          </div>
          <div class="nodes__node">
            <h2 class="nodes__node-text">sparrow</h2>
          </div>
          <div class="nodes__node">
            <h2 class="nodes__node-text">parrot</h2>
          </div>
        </div>
      </div>
      <div class="container__center">
        <div class="prompt -full-height -flex-center-between">
          <p class="prompt__text -full-width -text-align-center">
            connect the <span class="text-wrapper -creature">creature</span> and
            its <span class="text-wrapper -role">role</span> in our city
          </p>
        </div>
      </div>
      <div class="container__btm">
        <div class="nodes -btm -flex-between">
          <div class="nodes__node">
            <h2 class="nodes__node-text">pet</h2>
          </div>
          <div class="nodes__node">
            <h2 class="nodes__node-text">neighbor</h2>
          </div>
          <div class="nodes__node">
            <h2 class="nodes__node-text">food</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BirdSketch from "@/components/comps/Opening/BirdSketch.vue";

@Component({
  components: {
    BirdSketch,
  },
})
export default class DotsConnection extends Vue {}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";

$h-gutter: 2vh;
$container-height: calc(100vh - #{$h-gutter} * 2);
$container-row-height: calc((#{$container-height} - (#{$h-gutter} * 5)) / 6);
$container-height-top: calc(#{$container-row-height} * 4);

.dots-connection {
  height: 100vh;
}

.container {
  position: relative;
  z-index: 1;
  margin: auto;
  padding: $h-gutter 0;
  height: 100%;
}
.container__center {
  flex-grow: 1;
}

.prompt {
  font-size: 1.8vw;
}
.prompt__text .text-wrapper {
  position: relative;

  &:before {
    position: absolute;
    left: 45%;
    font-size: 0.8em;
    transition: all 0.3s;
  }
  &.-creature:before {
    top: -43%;
    content: "↑";
  }
  &.-role:before {
    bottom: -45%;
    content: "↓";
  }

  // hover
  @include hover {
    cursor: pointer;

    &:before {
      transition: all 0.3s;
    }
    &.-creature:before {
      transform: translate3d(0, -4px, 0);
    }
    &.-role:before {
      transform: translate3d(0, 4px, 0);
    }
  }
}

.connects {
  height: 100%;
  display: flex;

  &__left,
  &__right {
    flex-grow: 1;
  }
  &__center {
    width: 80%;
  }
}

$connect-dot-size: 20px;

.nodes__node {
  font-size: 12vh;
  text-transform: uppercase;

  &:nth-child(2) {
    text-align: center;
  }
  &:last-child {
    text-align: right;
  }

  .container & {
    width: 30%;
  }
}
.nodes__node-text {
  position: relative;
  display: inline;

  &:after {
    content: "";
    position: absolute;
    left: calc(50% - #{$connect-dot-size} / 2);
    width: $connect-dot-size;
    height: $connect-dot-size;
    border-radius: 100%;
    background-color: black;

    .-top & {
      bottom: -10%;
    }
    .-btm & {
      top: -20%;
    }
  }
}
</style>
