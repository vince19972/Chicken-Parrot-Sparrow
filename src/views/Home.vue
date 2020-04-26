<template>
  <div class="home -full-height-view -flex-column">
    <div class="home__side">
      <div class="home__logo -full-height">
        <dynamic-logo
          class="-full-width"
          :toExpand="isHeroHovered"
        ></dynamic-logo>
      </div>
    </div>
    <div class="home__main">
      <router-link
        class="content -full-height -full-width"
        to="birds-and-roles"
      >
        <div
          class="content__hero -full-height"
          @mouseenter="onHeroMouseEntered"
          @mouseleave="onHeroMouseLeft"
        >
          <p class="content__hero-text -f-main-b">
            Birds in the cities, <br />
            and their roles in our societies.
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DynamicLogo from "../components/comps/DynamicLogo.vue";

@Component({
  name: "Home",
  components: {
    DynamicLogo,
  },
})
export default class Home extends Vue {
  // state
  isHeroHovered = false;

  // user events
  onHeroMouseEntered() {
    this.isHeroHovered = true;
  }
  onHeroMouseLeft() {
    this.isHeroHovered = false;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";

.home {
  padding: 5vh 5vw;
  &__side {
    height: 50%;
  }
  &__main {
    flex-grow: 1;
  }
}

.home__logo {
  @include -flex;
  align-items: flex-end;
  font-size: 6vw;
}

.content {
  display: block;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    z-index: 0;
    bottom: -5vh;
    right: -5vw;
    width: 100vw;
    height: 50vh;
    background-color: transparent;
  }
}

.content__hero {
  @include -flex;
  align-items: flex-end;
  font-size: 2vw;
  line-height: 2.25vw;
}
.content__hero {
  position: relative;
  z-index: 1;

  &:after {
    content: "enter the experience →";
    position: absolute;
    bottom: 1vh;
    right: 0;
    font-size: 2.5vw;
  }
}
.content__hero-text {
  margin-left: 1vw;
}

// user events
.content {
  & > * {
    transition: all 0.3s;
  }
  &:after {
    transition: all 0.3s;
  }

  @include hover {
    &:after {
      background-color: black;
      transition: all 1s;
    }
    & .content__hero-text {
      color: white;
      transition: all 0.3s;
    }
    & .content__hero:after {
      color: white;
      animation: pulseText 2s ease-in-out infinite;
      transform: translate3d(10%, 0, 0);
      transition: all 0.3s;
    }
  }
}

// animations
@keyframes pulseText {
  0% {
    opacity: 0.8;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0.8;
  }
}
</style>
