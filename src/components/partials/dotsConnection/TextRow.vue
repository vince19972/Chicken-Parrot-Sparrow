<template>
  <div :class="['nodes -flex-between', nodesClasses]">
    <button
      class="nodes__node -f-main"
      v-for="(node, index) in selectedRow"
      :key="node.id"
      :data-index="index"
      @click="onNodeClicked"
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
  },
  data() {
    return {
      creatures: ["chicken", "sparrow", "parrot"],
      roles: ["pet", "neighbor", "food"],
      dotsCoord: [],
    };
  },
  methods: {
    onNodeClicked(event) {
      const dot = event.currentTarget.querySelector(".nodes__node-dot");
      const { x: dotX, y: dotY } = this.offset(dot);

      this.$emit("onNodeClick", event, {
        x: dotX,
        y: dotY,
      });
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
    },
  },
  computed: {
    selectedRow() {
      return this.rowType === "creatures" ? this.creatures : this.roles;
    },
    nodesClasses() {
      return this.rowType === "creatures" ? "-top" : "-btm";
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/_helpers.scss";

$connect-dot-size: 20px;

.nodes__node {
  position: relative;
  font-size: 12vh;
  text-transform: uppercase;
  text-align: center;

  .container & {
    width: 30%;
  }

  @include hover {
    cursor: pointer;
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

  .-top & {
    bottom: -10%;
  }
  .-btm & {
    top: -20%;
  }
}
</style>
