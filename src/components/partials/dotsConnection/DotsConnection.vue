<template>
  <div class="dots-connection -safe-zone" @click="onCanvasClicked">
    <div class="container -flex-column">
      <div class="container__top">
        <text-row @onNodeClick="onNodeClicked"></text-row>
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
        <text-row rowType="roles" @onNodeClick="onNodeClicked"></text-row>
      </div>
    </div>
    <div class="connections">
      <dot-line
        :startPoint="lineCoord.start"
        :endPoint="lineCoord.end"
      ></dot-line>
    </div>
  </div>
</template>

<script lang="ts">
import { Watch, Component, Vue } from "vue-property-decorator";
import { MouseShape } from "@/store/types/browser";

import TextRow from "./TextRow.vue";
import DotLine from "./DotLine.vue";

@Component({
  components: {
    TextRow,
    DotLine,
  },
})
export default class DotsConnection extends Vue {
  get mouseCoord() {
    return this.$store.getters["browser/mouseCoord"];
  }
  get lineCoord() {
    return {
      start: this.startCoord,
      end: this.endCoord,
    };
  }

  // data
  isConnecting = false;
  startCoord: MouseShape = { x: 0, y: 0 };
  endCoord: MouseShape = { x: 0, y: 0 };

  // methods
  onNodeClicked(event: Event, coord: { x: number; y: number }) {
    if (!this.isConnecting) {
      this.startCoord = { x: coord.x, y: coord.y };
      this.endCoord = { x: coord.x, y: coord.y };
      this.isConnecting = true;
    } else {
      this.endCoord = { x: coord.x, y: coord.y };
      this.isConnecting = false;
    }
  }
  onCanvasClicked(event: Event) {
    if (event.target) {
      const targetClassNames = event.target.classList;
      const isNode =
        targetClassNames.contains("nodes__node-text") ||
        targetClassNames.contains("nodes__node-dot");

      if (!isNode) this.isConnecting = false;
    }
  }
  resetCoord() {
    this.startCoord = { x: 0, y: 0 };
    this.endCoord = { x: 0, y: 0 };
  }

  // watcher
  @Watch("mouseCoord")
  getEndCoord() {
    this.endCoord = this.isConnecting ? this.mouseCoord : this.endCoord;
  }
}
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

// connections
.connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.svg-line {
  position: absolute;
}
line {
  stroke: black;
  stroke-width: 2px;
}
</style>
