<script setup lang="ts">
import { mapImages, type FishingMap } from '@/data.ts'
const { map } = defineProps<{
  map: FishingMap
}>()
</script>

<template>
  <picture>
    <source :srcset="`/img/map/${mapImages[map]}.webp`" type="image/webp" />
    <img :src="`/img/map/${mapImages[map]}.jpg`" />
  </picture>
</template>

<style scoped>
picture {
  display: block;
  font-size: 0;
  line-height: 0;
}
</style>
