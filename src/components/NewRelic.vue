<script setup lang="ts">
import { ref } from 'vue'
import{relicListFromString} from "@/util"



import { submitUserRelicPosition } from '@/stores/spots.ts'


const { spot } = defineProps<{
  spot: string
}>()

const inputValue = ref('')

function handleBlur(){
  inputValue.value = ""
}
function resetAndHide(event){  // Escape key: reset and blur
inputValue.value = ""
event.target.blur()
}
function handleSubmit(event) {
  const value = inputValue.value

  resetAndHide(event)

  const relics = relicListFromString(value)
  for(const relic of relics){
    submitUserRelicPosition(spot, relic)
  }
}
</script>

<template>
  <div class="new-relic">
    <label>
      <svg class="plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="45" fill="white" stroke-width="2"/>
        <line x1="50" y1="20" x2="50" y2="80" stroke="black" stroke-width="6" stroke-linecap="round"/>
        <line x1="20" y1="50" x2="80" y2="50" stroke="black" stroke-width="6" stroke-linecap="round"/>
      </svg>
      <input type="text"
        ref="inputEl"    v-model="inputValue"
        @blur="handleBlur"
        @keyup.enter="handleSubmit"
        @keyup.escape="resetAndHide"
      ></input>
    </label>
  </div>
</template>

<style scoped>
.new-relic {
  height: 40px;
  position: absolute;
  left: 50%;
  top: 19px;
  translate: -50% 0;
  pointer-events: none;
}
svg {
  width: 50%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 50%;
  transform-origin: 50% 50%;
  translate: -50% 0;
  scale: 0.3;
  cursor: pointer;
  :focus-within > & {
    display: none;
  }
  pointer-events: all;
  cursor: text;
}
.new-relic input[type="text"] {
  translate: 0 8px;
  appearance: none;
  border: none;
  outline: none;
  width: 80px;
  height: 26px;
  text-align: center;
  &::placeholder {
    color: var(--color-placeholder);
  }
  background-color: rgba(255,255,255, 90%);
  opacity: 0;
  pointer-events: none;
  &:focus {
    opacity: 1;
    pointer-events: all;
  }
  text-transform: uppercase;
  font-size: 16px;
}
</style>
