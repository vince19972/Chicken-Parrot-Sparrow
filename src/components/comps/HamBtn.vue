<template>
  <button
    :class="['ham', hamRouteClass, hamClasses]"
    @click="btnClicked"
  ></button>
</template>

<script lang="ts">
import { Watch, Component, Vue } from "vue-property-decorator";

@Component({
  name: "HamBtn",
})
export default class HamBtn extends Vue {
  // state data
  currentRoute = "home";
  isActive = false;

  // style getters
  get toState() {
    return !this.$store.getters["isMenuOpened"] ? true : false;
  }
  get hamRouteClass() {
    return `-is-${this.currentRoute}`;
  }
  get hamClasses() {
    return this.toState ? "" : "-is-active";
  }

  // user events
  btnClicked() {
    this.$store.commit("toggleMenu", this.toState);
    this.isActive = this.toState;
  }

  // cycle
  @Watch("$route")
  watchRoute(to, from) {
    this.currentRoute = to.name.toLowerCase();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_layouts.scss";
@import "@/assets/styles/_helpers.scss";

.ham {
  position: fixed;
  z-index: 51;
  top: calc(#{$offset-h} * 2);
  right: calc(#{$offset-v});
  height: 12px;
  width: 40px;
  padding: 16px 8px;

  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: black;
  }
  &:before {
    top: 8px;
  }
  &:after {
    bottom: 8px;
  }
}

// user events
.ham {
  transition: transform 0.3s;

  @include hover {
    transform: scaleX(1.5);
    transition: transform 0.3s;
  }
}

// states
.ham {
  &.-is-home {
    top: calc(#{$offset-h});
  }
  &.-is-birdsandroles {
    opacity: 0;
    pointer-events: none;
  }
  &.-is-chicken,
  &.-is-parrot,
  &.-is-sparrow {
    height: 8px;
    width: 24px;
    top: calc(#{$offset-h} / 1.4);
    right: calc(#{$offset-v} / 1.5);

    &:before,
    &:after {
      height: 1px;
      background-color: white;
    }
    &:before {
      top: 10px;
    }
    &:after {
      bottom: 10px;
    }
  }
}
.ham.-is-active {
  @include hover {
    transform: scaleX(1);
  }

  &:before,
  &:after {
    transform-origin: center;
    transition: transform 0.3s;
    background-color: white;
  }
  &:before {
    transform: rotate(-45deg) translate3d(-10px, 8px, 0px);
  }
  &:after {
    transform-origin: center;
    transform: rotate(45deg);
  }

  &.-is-chicken,
  &.-is-parrot,
  &.-is-sparrow {
    &:before {
      transform: rotate(-45deg) translate3d(-8px, 8px, 0px);
    }
  }
}
</style>
