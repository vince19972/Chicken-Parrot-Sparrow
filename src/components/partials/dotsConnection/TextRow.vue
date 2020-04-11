<template>
  <div :class="['nodes -flex-between', nodesClasses]">
    <button
      class="nodes__node -f-main"
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
  name: "Textow",
  props: {
    rowType: { type: String, default: "creatures" },
    connectState: { type: String, required: true },
    startNode: { required: true }
  },
  data() {
    return {
      creatures: ["chicken", "sparrow", "parrot"],
      roles: ["pet", "neighbor", "food"],
      isMouseOver: false
    };
  },
  methods: {
    onNodeClicked(event) {
      const dot = event.currentTarget.querySelector(".nodes__node-dot");
      const { x: dotX, y: dotY } = this.offset(dot);

      this.$emit("onNodeClick", event.currentTarget.dataset.nodeType, {
        x: dotX,
        y: dotY
      });
    },
    onMouseEntered() {
      this.isMouseOver = true;
    },
    onMouseLeft() {
      this.isMouseOver = false;
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
      const isCurrentRow =
        this[this.rowType].filter(type => type === this.startNode).length > 0;

      return [
        this.rowType === "creatures" ? "-btm" : "-top",
        this.connectState === "Connectionless" ? "-is-glowing" : "",
        this.isMouseOver || (this.connectState === "Connecting" && isCurrentRow)
          ? "-is-active"
          : ""
      ];
    }
  },
  watch: {
    connectState() {
      this.$refs.node.forEach(node => {
        if (
          node.dataset.nodeType === this.startNode &&
          this.connectState === "Connecting"
        ) {
          node.classList.add("-is-active");
        } else {
          node.classList.remove("-is-active");
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_helpers.scss";

$connect-dot-size: 16px;

.nodes {
  transition: all 0.3s;
}

.nodes__node {
  position: relative;
  font-size: 12vh;
  text-transform: uppercase;
  text-align: center;
  transition: all 0.3s;

  .container & {
    width: 30%;
  }
}
.nodes__node-text {
  display: inline;
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
}
</style>
