<template>
  <div id="app">
    <full-menu class="menu"></full-menu>
    <ham-btn class="ham"></ham-btn>
    <div
      class="app__rwd -full-height-view -full-width-view -flex-center-all -f-main-b"
    >
      <h1>sorry, mobile version is still under development.</h1>
    </div>
    <transition name="fade" mode="out-in">
      <router-view :class="['app-container', stateClass]" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HamBtn from "@/components/comps/HamBtn.vue";
import FullMenu from "@/components/partials/FullMenu.vue";
import { Meta } from "@/decorator.js";

@Component({
  name: "App",
  components: {
    HamBtn,
    FullMenu,
  },
  metaInfo() {
    return {
      title: "Chicken, Parrot and Sparrow",
      meta: [
        {
          key: "description",
          name: "description",
          property: "description",
          content:
            "An interactive website features typography animation that inspires audiences to review why and how certain birds in modern urban life aren't living as birds but being objectified as food or products.",
        },
        {
          key: "author",
          name: "author",
          property: "author",
          content: "Vince MingPu Shao",
        },
        {
          key: "og:title",
          name: "og:title",
          property: "og:title",
          content: "Chicken, Parrot and Sparrow",
        },
        {
          name: "og:site_name",
          property: "og:site_name",
          content: "Chicken, Parrot and Sparrow",
        },
        {
          name: "og:type",
          property: "og:type",
          content: "website",
        },
        {
          key: "og:url",
          name: "og:url",
          property: "og:url",
          content: "https://www.chicken-parrot-sparrow.com/",
        },
        {
          key: "og:image",
          name: "og:image",
          property: "og:image",
          content: "./assets/imgs/og.jpg",
        },
        {
          key: "og:description",
          name: "og:description",
          property: "og:description",
          content:
            "An interactive website features typography animation that inspires audiences to review why and how certain birds in modern urban life aren't living as birds but being objectified as food or products.",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          key: "twitter:site",
          name: "twitter:site",
          content: "@vincemingpushao",
        },
        {
          key: "twitter:title",
          name: "twitter:title",
          content: "Chicken, Parrot and Sparrow",
        },
        {
          key: "twitter:description",
          name: "twitter:description",
          content:
            "An interactive website features typography animation that inspires audiences to review why and how certain birds in modern urban life aren't living as birds but being objectified as food or products.",
        },
        {
          key: "twitter:creator",
          name: "twitter:creator",
          content: "@vincemingpushao",
        },
        {
          key: "twitter:image",
          name: "twitter:image",
          content: "./assets/imgs/og.jpg",
        },
      ],
    };
  },
})
export default class App extends Vue {
  // style getters
  get stateClass() {
    return this.$store.getters["isMenuOpened"] ? "-is-frozen" : "";
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_media-queries.scss";

.app-container.-is-frozen {
  position: fixed;
  overflow: hidden;
}

.app__rwd {
  display: none;

  h1 {
    display: block;
    font-size: 2vw;
  }
}

// rwd
@include media("below-desktop") {
  .app-container,
  .menu,
  .ham {
    display: none !important;
  }
  .app__rwd {
    display: flex;
  }
}
</style>
