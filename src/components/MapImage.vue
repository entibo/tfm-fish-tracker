<script setup lang="ts">
import { mapImages, type FishingMap } from '@/data.ts'
const { map } = defineProps<{
  map: FishingMap
}>()

const imageUrl = `/img/map/${mapImages[map]}`
</script>

<template>
  <img :src="imageUrl" />
</template>
