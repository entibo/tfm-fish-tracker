<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'

import { allRelics, relicStore } from '@/stores/relics.ts'

// A157 B4 D23410 F9

function relicListToString(relics: string[]) {
  const sorted = [...new Set(relics)]
    .map((r) => r.replace(/10$/, '@'))
    .sort()
    .map((r) => r.replace(/@$/, '10'))
  // return sorted.join(' ')
  const seen = new Set()
  let s = ''
  for (const relic of sorted) {
    const letter = relic[0]
    if (seen.has(letter)) {
      s += relic.slice(1)
    } else {
      seen.add(letter)
      s += (s.length === 0 ? '' : ' ') + relic
    }
  }
  return s
}

function relicListFromString(val: string) {
  return Array.from(
    new Set(
      val
        .toUpperCase()
        .trim()
        .split(/[^\d\w]+/)
        .filter((s) => s.match(/^[A-F][1-9]+0?$/))
        .flatMap((A15610) => {
          const letter = A15610[0]
          const numbers = A15610.slice(1).match(/\d0?/g)!
          return numbers.map((n) => letter + n)
        }),
    ),
  )
}

const isFocused = ref(false)
const rawInput = ref('')
const showMissing = ref(false)

const displayList = computed(() => {
  return showMissing.value //
    ? allRelics.filter((r) => !relicStore.list.includes(r))
    : relicStore.list
})

// Sync rawInput with displayList when not focused
watchEffect(() => {
  if (!isFocused.value) {
    rawInput.value = relicListToString(displayList.value)
  }
})

// Handle input updates
function onInput(val: string) {
  rawInput.value = val

  const parsed = relicListFromString(val)

  if (showMissing.value) {
    relicStore.list = allRelics.filter((r) => !parsed.includes(r))
  } else {
    relicStore.list = parsed
  }
}

function toggleShowMissing() {
  showMissing.value = !showMissing.value
  if (!isFocused.value) {
    rawInput.value = relicListToString(displayList.value)
  }
}
</script>

<template>
  <div class="input-row">
    <span @click="toggleShowMissing" class="icon-checkbox">
      <img :src="showMissing ? '/img/missing.png' : '/img/owned.png'" alt="Missing/Owned" />
    </span>
    <input
      type="text"
      class="text-block"
      :value="rawInput"
      placeholder="A69 B4 D10"
      @input="onInput(($event.target as HTMLInputElement).value)"
      @focus="isFocused = true"
      @blur="
        () => {
          isFocused = false
          rawInput = relicListToString(displayList)
        }
      "
      @keydown.enter="rawInput = relicListToString(displayList)"
      @keydown.escape="rawInput = relicListToString(displayList)"
    />
  </div>
</template>

<style scoped>
.input-row {
  display: flex;
  align-items: center;
}
input {
  width: 100%;
  height: 40px;
  font-size: 18px;
  padding-inline: 0.5em;
}
.icon-checkbox {
  cursor: pointer;
  display: flex;
  align-items: center;
}
input,
.icon-checkbox {
  outline: 2px solid var(--color-background);
  outline-offset: -2px;
}
</style>
