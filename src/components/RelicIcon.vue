<script setup lang="ts">
import { relicStore } from '@/stores/relics.ts'
import relicValueMap from '@/relics-value.json'

const { relic } = defineProps<{
  relic: string
  coins: boolean
}>()

const imageUrl = `/img/relic/${relic}.jpg`
const numCoins = relicValueMap[relic]
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
    <div class="coins" v-if="coins">
      <div v-for="n in numCoins" :key="n" class="coin">
        <img src="/img/smol-coin.png" width="15" height="17" />
      </div>
    </div>
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
  top: 2px;
  left: 3px;
  pointer-events: none;
}
.checked .relic-name {
  /* bottom: 50%; */
  /* right: 50%; */
  /* translate: 50% 50%; */
  /* font-size: 16px; */
  opacity: 60%;
}

.coins {
  position: absolute;
  display: flex;
  justify-content: end;
  left: 0;
  bottom: -2px;
  height: 16px;
  right: 1px;
}
.coin {
  width: 11px;
}
img {
  cursor: pointer;
}
.checked > img {
  opacity: 20%;
}
</style>
