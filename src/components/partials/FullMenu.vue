<template>
  <menu :class="['menu', menuStateClass]">
    <ul class="menu__list -full-height -flex-column">
      <li class="menu__list-item" @click="onLinkClicked">
        <router-link to="/">→ Home</router-link>
      </li>
      <li class="menu__list-item" @click="onLinkClicked">
        <router-link to="/about">→ About</router-link>
      </li>
      <li class="menu__list-item" @click="onLinkClicked">
        <router-link to="/reading-list">→ Reading List</router-link>
      </li>
      <li class="menu__list-item" @click="onLinkClicked">
        <router-link to="/birds-and-roles">→ Birds and Roles</router-link>
      </li>
    </ul>
  </menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "FullMenu",
})
export default class FullMenu extends Vue {
  // user events
  onLinkClicked() {
    this.$store.commit("toggleMenu", false);
  }

  // style getters
  get menuStateClass() {
    return this.$store.getters["isMenuOpened"] ? "-is-active" : "";
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_layouts.scss";
@import "@/assets/styles/_helpers.scss";

.menu {
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
}

.menu__list {
  padding: 3vh 2.5vw 5vh 2.5vw;
  justify-content: flex-end;
}

.menu__list-item {
  font-size: 6.5vw;

  & > a {
    color: white;
    text-decoration: none;
  }

  &:not(:last-child) {
    margin-bottom: 2.5vh;
  }
}

// states
.menu {
  transform: translate3d(100vw, 0, 0);
  will-change: transform;
  transition: all 0.5s cubic-bezier(0.05, 0.63, 0.7, 0.99);

  &.-is-active {
    transform: translate3d(0, 0, 0);
    will-change: transform;
    transition: all 0.5s cubic-bezier(0.05, 0.63, 0.7, 0.99);
  }
}

.menu__list-item {
  transition: all 0.3s;
  @include hover {
    transition: all 0.3s;
    transform: translate3d(5%, 0, 0);
  }
}
</style>
