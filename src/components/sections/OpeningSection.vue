<template>
  <div class="section">
    <DotsConnection />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import DotsConnection from "@/components/partials/dotsConnection/DotsConnection.vue";

@Component({
  components: {
    DotsConnection,
  },
})
export default class OpeningSection extends Vue {}
</script>

<style scoped lang="scss">
.section {
  // width: 100vw;
  // height: 100vh;
  // overflow: hidden;
}
</style>
