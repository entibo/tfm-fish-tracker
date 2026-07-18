<script setup lang="ts">
import { ref } from 'vue'
import { relicListFromString } from '@/util'

import { submitUserRelicPosition } from '@/stores/spots.ts'

const { spot } = defineProps<{
  spot: string
}>()

const inputValue = ref('')

function handleBlur() {
  inputValue.value = ''
}
function resetAndHide(event) {
  // Escape key: reset and blur
  inputValue.value = ''
  event.target?.blur()
}
function handleSubmit(event) {
  const value = inputValue.value

  resetAndHide(event)

  const relics = relicListFromString(value)
  for (const relic of relics) {
    submitUserRelicPosition(spot, relic)
  }
}
</script>

<template>
  <div class="new-relic">
    <label>
      <!-- <img class="plus" src="/img/plus.png" height="16" /> -->
      <div class="plus relic-name">+</div>
      <input
        type="text"
        ref="inputEl"
        v-model="inputValue"
        @blur="handleBlur"
        @keyup.enter="handleSubmit"
        @keyup.escape="resetAndHide"
      />
    </label>
  </div>
</template>

<style scoped>
.new-relic {
  height: 40px;
  position: absolute;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 100;
  translate: 50% 50%;
}
.plus {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  cursor: pointer;
  pointer-events: all;
  :focus-within > & {
    display: none;
  }

  line-height: 1em;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-shadow:
    -1px -1px 1px black,
    1px 1px 1px black,
    0px 0px 3px black;
  .solo & {
    outline: none;
    border-radius: 100px;
    outline: 1px solid #ffffffba;
    background: radial-gradient(#19250d33, transparent);
    width: 50px;
    height: 50px;
    display: flex;
    place-items: center;
    justify-content: center;
  }
}
.new-relic input[type='text'] {
  appearance: none;
  border: none;
  outline: none;

  translate: 0 8px;
  width: 40px;
  height: 26px;

  border: 1px solid var(--color-background);
  background-color: rgba(255, 255, 255, 90%);
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;

  opacity: 0;
  pointer-events: none;
  &:focus {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
