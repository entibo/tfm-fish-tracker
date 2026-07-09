import { computed, reactive, watch } from 'vue'
import { fishingSpotCoordinates } from '@/data'

const LOCALSTORAGE_KEY = 'fishing-spots'

const valueFromLocalStorage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) ?? 'null')

export const userRelicsInFishingSpot = reactive(
  valueFromLocalStorage ??
    Object.fromEntries(Object.keys(fishingSpotCoordinates).map((k) => [k, []])),
)

watch(userRelicsInFishingSpot, (newVal) => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newVal))
})

export const relicsInFishingSpot = computed(() => ({
  ...userRelicsInFishingSpot,
  // ...knownRelicsInFishingSpot,
}))

export function submitUserRelicPosition(spot: string, relic: string) {
  console.log(spot, relic)
  if (!userRelicsInFishingSpot[spot].includes(relic)) {
    userRelicsInFishingSpot[spot].push(relic)
  }
}
