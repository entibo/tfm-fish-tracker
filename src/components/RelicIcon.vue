<script setup lang="ts">
import { relicStore } from '@/stores/relics.ts'

const { relic } = defineProps<{
  relic: string
}>()

const imageUrl = `/img/relic/${relic}.jpg`
</script>

<template>
  <div
    class="relic"
    :class="{
      checked:
        relicStore.list.includes(relic) ||
        (relic.endsWith('11') &&
          relicStore.list.filter((r) => r.startsWith(relic[0])).length === 10),
    }"
    v-on:click="relicStore.toggle(relic)"
  >
    <img :src="imageUrl" width="40" height="40" />
    <div class="relic-name">{{ relic }}</div>
  </div>
</template>

<style scoped>
.relic {
  display: flex;
  position: relative;
  user-select: none;
}

.relic-name {
  position: absolute;
  line-height: 1em;
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-shadow:
    -1px -1px 1px black,
    1px 1px 1px black,
    0px 0px 5px black;
  bottom: 2px;
  right: 3px;
  pointer-events: none;
}
.checked .relic-name {
  bottom: 50%;
  right: 50%;
  translate: 50% 50%;
  font-size: 16px;
}

img {
  cursor: pointer;
}
.checked > img {
  opacity: 20%;
}
</style>
