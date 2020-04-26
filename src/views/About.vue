<template>
  <div class="about -safe-container-full -full-height-view">
    <div class="page-title">
      <h1 class="page-title__text">About.</h1>
    </div>
    <div class="about__main content">
      <p class="content__text">
        This website is built in 2020 by me, Vince MingPu Shao, as the graduate
        thesis project at Interaction Telecommunications Program (ITP), New York
        University (NYU). Learn more about the building process and stories
        behind the project <a href="vinceshao.com">at my website</a>.
      </p>
      <p class="content__text">
        I love birds, especially sparrows. My biggest joy as walking on the
        streets in New York, Taipei, Toronto or any other cities I've visisted
        has always been listening and watching sparrows eating, flying, jumping,
        singing, and playing.
      </p>
      <p class="content__text">
        My family also has a bird member, a cute cockatiel parrot. We bought him
        without the awareness of the miserable stories behind pet industry.
        After learning the heartbreaking facts, we only love our bird family
        member more, and will never be part of the pet trading market again.
      </p>
      <p class="content__text">
        The motivation for me to build a thesis project discussing the
        relationships between chicken, parrot, and sparrow and people in the
        cities has been simple - it's just my personal wish for a more friendly
        environment for the birds.
      </p>
      <p class="content__text">
        Thank you for visiting this website and read all the words. I hope this
        experience will make us review and rethink our relationships with the
        birds, and I hope one day all the birds could just be flapping their
        wings as they're born to do.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Meta } from "@/decorator.js";

@Component({
  name: "About",
})
export default class About extends Vue {
  @Meta
  metaInfo() {
    return {
      titleTemplate: "About | %s",
    };
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";

.page-title {
  @include -f-main-b;
  font-size: 64px;
  margin: 48px 0 200px 0;
  text-decoration: underline;
}

.about__main {
  width: 70%;
  padding-bottom: 25vh;
}

.content__text {
  font-size: 3vw;
  line-height: 3.5vw;

  &:not(:last-child) {
    margin-bottom: 4vw;
  }
}
</style>
