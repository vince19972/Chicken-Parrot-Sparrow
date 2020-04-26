<template>
  <div
    :class="['ending -full-width -f-main -flex-column-between']"
    ref="ending"
  >
    <div class="ending__main content">
      <p
        v-for="(paragraph, pIndex) in endParagraphs"
        :key="pIndex + contentType"
        class="content__text"
      >
        {{ paragraph }}
      </p>
    </div>
    <div class="ending__btm">
      <div class="ending__btm-cta cta">
        <p class="cta__text">keep exploring</p>
      </div>
      <div class="ending__btm-actions actions -flex">
        <router-link class="actions__btn" to="/reading-list">
          ↪ <span class="actions__btn-text">reading list</span>
        </router-link>
        <router-link class="actions__btn" to="/birds-and-roles">
          ↪ <span class="actions__btn-text">explore other birds</span>
        </router-link>
        <button v-if="contentType !== 'sparrow'" class="actions__btn">
          ↪
          <span class="actions__btn-text" @click="onStageBtnClicked"
            >restart the journey</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import birdTexts from "@/assets/content/birdTexts.json";

@Component({
  name: "EndSection",
})
export default class EndSection extends Vue {
  @Prop() readonly contentType!: "chicken" | "sparrow" | "parrot";

  // computed
  get endParagraphs() {
    switch (this.contentType) {
      case "chicken":
        return birdTexts.chicken.end.paragraphs;
      case "parrot":
        return birdTexts.parrot.end.paragraphs;
      case "sparrow":
        return birdTexts.sparrow.end.paragraphs;
      default:
        return birdTexts.chicken.end.paragraphs;
    }
  }

  // user events
  onStageBtnClicked() {
    this.$emit("onResetStage");
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";
@import "@/assets/styles/_layouts.scss";
@import "@/assets/styles/sections/GridSection.scss";

$offset-btm: 40px;

.ending {
  position: relative;
  padding: 64px $offset-v $offset-btm $offset-v;
  color: white;
  min-height: 100vh;
  transition: all 0.3s;
}

.content {
  font-size: 2vw;
  line-height: 2.8vw;
  width: 65%;
  padding-top: 5vh;
}
.content__text {
  &:not(:last-child) {
    margin-bottom: 4vw;
  }
}

.ending__btm {
  padding-top: 5vh;
}
.ending__btm-cta {
  margin-bottom: 2vh;
}

@keyframes glide {
  from {
    transform: translate3d(0, -100%, 0) scaleY(1);
  }
  to {
    transform: translate3d(0, 100%, 0) scaleY(5);
  }
}

.cta {
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    z-index: 1;
    top: 0;
    left: 10px;
    width: 1px;
    height: 100%;
    background-color: white;
    transform-origin: left top;
    animation: glide 2s ease-in-out infinite;
  }
  &:after {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    left: 10px;
    width: 1px;
    height: 100%;
    background-color: white;
    opacity: 0.6;
  }
}

.cta__text {
  writing-mode: vertical-rl;
  font-size: 16px;
  opacity: 0;
  padding: 1vh 0 20vh 0;
  margin: 0 0 0 16px;
}

.actions__btn {
  @include -f-main;
  @include -flex-center-all;
  font-size: 1.5vw;
  line-height: 1.5vw;
  color: white;
  display: block;
  text-decoration: none;

  &:not(:last-child) {
    margin-right: 56px;
  }
}

// user events
.actions__btn {
  transition: all 0.3s;
  @include hover {
    transform: translate3d(8px, 0, 0);
    transition: all 0.3s;
  }
}
</style>
