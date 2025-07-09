<script setup lang="ts">
import Relic from './RelicIcon.vue'
</script>

<template>
  <div class="grid">
    <div class="row" v-for="letter in 'ABCDEF'" :key="letter">
      <Relic
        v-for="number in [11, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        :relic="letter + number"
        :key="letter + number"
      ></Relic>
    </div>
  </div>
</template>

<style scoped>
.grid {
  /* display: flex; */
  /* flex-direction: column; */
  display: grid;
  /* grid-template-columns: 1fr 1fr; */
}
.row {
  display: flex;
}
.relic {
  outline: 2px solid var(--color-background);
  outline-offset: -2px;
}
</style>
