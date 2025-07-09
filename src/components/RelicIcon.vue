<script setup lang="ts">
import { relicStore } from '@/stores/relics.ts'

const { relic } = defineProps<{
  relic: string
}>()

const imageUrl = `/img/relic/${relic}.jpg`
</script>

<template>
  <img
    :src="imageUrl"
    width="40"
    height="40"
    :class="{
      checked:
        relicStore.list.includes(relic) ||
        (relic.endsWith('11') &&
          relicStore.list.filter((r) => r.startsWith(relic[0])).length === 10),
    }"
    v-on:click="relicStore.toggle(relic)"
  />
</template>

<style scoped>
img {
  cursor: pointer;
}
.checked {
  opacity: 40%;
}
</style>
