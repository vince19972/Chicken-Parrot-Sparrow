<template>
  <div class="selection">
    <div class="text-group" v-for="x in 10" :key="x">
      <p class="text" v-for="n in 20" :key="n">CHICKEN</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Selection extends Vue {}
</script>

<style scoped lang="scss">
@import "@/assets/styles/components/ChickenGrid.scss";

.selection {
  font-size: $f-size-sub;
  display: flex;
}

.text {
  // font-size: $f-size-sub;
}
</style>
