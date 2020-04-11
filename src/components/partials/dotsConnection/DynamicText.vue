<template>
  <p class="prompt__text -full-width -text-align-center">
    connect the
    <span class="text-wrapper -point-down">creature</span> and its
    <span class="text-wrapper -point-up">role</span> in our city
  </p>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";
import { ConnectStates } from "./DotsConnection";

@Component
export default class CanvasBackground extends Vue {
  @Prop() readonly connectState!: ConnectStates;
  @Prop() readonly isPaired!: boolean;
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/_fonts.scss";
@import "@/assets/styles/_helpers.scss";
</style>
