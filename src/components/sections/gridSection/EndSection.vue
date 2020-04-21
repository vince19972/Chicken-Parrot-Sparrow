<template>
  <div
    :class="['ending -full-height -full-width -f-main -flex-column-between']"
    ref="ending"
  >
    <div class="ending__main content">
      <p class="content__text">
        Chicken, after at least being inseminated, selected, grown and
        transported, and slaughtered, becomes meat, our food.
      </p>
      <p class="content__text">
        This is a journey of a living bird being objectified and killed. And I
        feel very sad about it.
      </p>
    </div>
    <div class="ending__btm actions -flex">
      <router-link class="actions__btn" to="/">
        ↪ <span class="actions__btn-text">reading list</span>
      </router-link>
      <router-link class="actions__btn" to="/">
        ↪ <span class="actions__btn-text">explore other birds</span>
      </router-link>
      <button class="actions__btn">
        ↪
        <span class="actions__btn-text" @click="onStageBtnClicked"
          >restart the journey</span
        >
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "EndSection"
})
export default class EndSection extends Vue {
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
  transition: all 0.3s;
}

.content {
  font-size: 3.5vw;
  line-height: 3.5vw;
  width: 70%;
}
.content__text {
  &:not(:last-child) {
    margin-bottom: 40px;
  }
}

.actions__btn {
  @include -f-main;
  @include -flex-center-all;
  font-size: 32px;
  line-height: 32px;
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
