<template>
  <div :class="['nodes -flex-between', nodesClasses]">
    <button
      class="nodes__node -f-main -flex-center-all"
      v-for="node in selectedRow"
      :key="node.id"
      :data-node-type="node"
      @click="onNodeClicked"
      @mouseenter="onMouseEntered"
      @mouseleave="onMouseLeft"
      ref="node"
    >
      <h2 class="nodes__node-text">{{ node }}</h2>
      <div class="nodes__node-dot"></div>
    </button>
  </div>
</template>

<script>
export default {
  name: "TextRow",
  props: {
    rowType: { type: String, default: "creatures" },
    connectState: { type: String, required: true },
    pairingState: { type: String, required: true },
    startNode: { required: true },
    endNode: { required: true },
    isHighlighted: { type: Boolean, default: false },
    isDehighlighted: { type: Boolean, default: false }
  },
  data() {
    return {
      creatures: ["chicken", "sparrow", "parrot"],
      roles: ["pet", "neighbor", "food"],
      isMouseOver: false,
      isRowClicked: false
    };
  },
  methods: {
    onNodeClicked(event) {
      const dot = event.currentTarget.querySelector(".nodes__node-dot");
      const { x: dotX, y: dotY } = this.offset(dot);

      this.isRowClicked = true;

      this.$emit("onNodeClick", event.currentTarget.dataset.nodeType, {
        x: dotX,
        y: dotY
      });
    },
    onMouseEntered() {
      this.isMouseOver = true;
      this.$emit("onMouseOver", event.currentTarget.dataset.nodeType);
    },
    onMouseLeft() {
      this.isMouseOver = false;
      this.$emit("onMouseOver", null);
    },
    offset(el) {
      const rect = el.getBoundingClientRect();
      const { x, y, width, height } = rect;
      const fmtRectX = x + width / 2;
      const fmtRectY = y + height / 2;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      return { x: fmtRectX + scrollLeft, y: fmtRectY + scrollTop };
    }
  },
  computed: {
    selectedRow() {
      return this.rowType === "creatures" ? this.creatures : this.roles;
    },
    nodesClasses() {
      const isCurrentRow = this.isCurrentRow;
      let pairingClass = "";

      if (this.pairingState === "paired") {
        pairingClass = "-is-paired";
      } else if (this.pairingState === "notPaired") {
        pairingClass = "-not-paired";
      }

      return [
        this.rowType === "creatures" ? "-btm" : "-top",
        this.connectState === "Connectionless" ? "-is-glowing" : "",
        this.isMouseOver || (this.connectState === "Connecting" && isCurrentRow)
          ? "-is-active"
          : "",
        this.isHighlighted ? "-is-highlighted" : "",
        this.isDehighlighted ? "-is-dehighlighted" : "",
        pairingClass
      ];
    },
    isCurrentRow() {
      return (
        this[this.rowType].filter(type => type === this.startNode).length > 0
      );
    }
  },
  watch: {
    connectState() {
      if (this.connectState === "Connecting") {
        this.$refs.node.forEach(node => {
          if (node.dataset.nodeType === this.startNode) {
            node.classList.remove("-is-disabled");
            node.classList.add("-is-active");
          } else {
            if (this.isCurrentRow) node.classList.add("-is-disabled");
            node.classList.remove("-is-active");
          }
        });
      } else if (this.connectState === "Connected") {
        this.$refs.node.forEach(node => {
          if (node.dataset.nodeType === this.endNode) {
            node.classList.remove("-is-disabled");
            node.classList.add("-is-active");
          } else {
            if (!this.isCurrentRow) node.classList.add("-is-disabled");
          }
        });
      } else {
        this.$refs.node.forEach(node => {
          node.classList.remove("-is-active");
          node.classList.remove("-is-disabled");
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_helpers.scss";

$connect-dot-size: 16px;

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(black, 0.2);
    transform: scale(1);
  }
  70% {
    box-shadow: 0 0 0 16px rgba(black, 0);
    transform: scale(1.2);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(black, 0);
    transform: scale(1);
  }
}
@keyframes beat {
  0%,
  100% {
    transform: scale(1);
  }
  20% {
    transform: scale(1.01);
  }
}
@keyframes pulseText {
  0% {
    color: gray;
  }
  70% {
    color: black;
  }
  100% {
    color: gray;
  }
}

.nodes {
  transition: all 0.3s;
}

.nodes__node {
  position: relative;
  font-size: 12vh;
  text-align: center;
  transition: all 0.3s;

  .container & {
    width: 30%;
  }
}
.nodes__node-text {
  position: relative;
  text-transform: uppercase;

  &:after {
    content: "click to connect";
    position: absolute;
    left: 0;
    font-size: 16px;
    width: 100%;
    text-align: center;
    text-transform: initial;

    .-btm & {
      top: -45%;
    }
    .-top & {
      bottom: -45%;
    }
    opacity: 0;
    pointer-events: none;
    animation: pulseText 2s infinite;
  }
}

.nodes__node-dot {
  position: absolute;
  left: calc(50% - #{$connect-dot-size} / 2);
  width: $connect-dot-size;
  height: $connect-dot-size;
  border-radius: 100%;
  background-color: black;
  transition: all 0.3s;

  .-top & {
    bottom: -10%;
  }
  .-btm & {
    top: -20%;
  }
}

// states
.nodes.-is-glowing:not(.-is-active) {
  & .nodes__node-dot {
    transition: all 0.3s;
    animation: pulse 2s infinite;
  }
}
.nodes.-is-active {
  & .nodes__node {
    transition: all 0.3s;
    opacity: 0.5;
  }
}
.nodes {
  &.-is-highlighted {
    animation: beat 0.5s;
    animation-timing-function: ease-in-out;
  }
  &.-is-dehighlighted {
    opacity: 0.3;
  }
}

.nodes__node {
  @include hover {
    opacity: 1 !important;
    & .nodes__node-dot {
      animation: pulse 2s infinite;
    }
  }

  &.-is-active {
    opacity: 1 !important;
  }
  &.-is-disabled {
    pointer-events: none;
  }
}
.nodes__node.-is-active {
  pointer-events: none;
}
.nodes__node:not(.-is-active) {
  @include hover {
    & .nodes__node-text:after {
      transition: all 0.3s;
      opacity: 1;
    }
  }
}

.nodes.-is-paired {
  & .nodes__node.-is-disabled {
    opacity: 0.2;
    pointer-events: none;
  }
}
.nodes.-not-paired {
  & .nodes__node.-is-active {
    color: gray;

    & .nodes__node-dot {
      background-color: gray;
    }
  }
  & .nodes__node.-is-disabled {
    opacity: 0.2;
    pointer-events: none;
  }
}
</style>
