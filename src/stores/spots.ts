import { computed, ref, watch } from 'vue'
import { fishingSpotCoordinates } from '@/data'
// import hardCodedSpotRelics from '@/spots.json'

// Relic locations (spots)
// - export read-only refs for local and remote locations
// - export functions to submit/unsubmit a location

// REMOTE

export const lastResetDate = ref(new Date(0))

async function fetchLastResetDate() {
  try {
    const response = await fetch('https://entibo.alwaysdata.net/fishing/last-reset')
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const date = new Date(await response.text())
    if (Number(date) !== Number(lastResetDate.value)) {
      fetchRemoteSpotRelics()
    }
    lastResetDate.value = date
  } catch (error) {
    console.error('Failed to fetch last reset date:', error)
  }
}

// Update every 10 seconds
fetchLastResetDate()
setInterval(fetchLastResetDate, 10 * 1000)

const remoteSpotRelics = ref({} as Record<string, string[]>)

async function fetchRemoteSpotRelics() {
  try {
    const response = await fetch('https://entibo.alwaysdata.net/fishing')
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    remoteSpotRelics.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch spots:', error)
  }
}

// Update every 5 minutes
fetchRemoteSpotRelics()
setInterval(fetchRemoteSpotRelics, 5 * 60 * 1000)

function submitToRemote(payload: { spot: string; relic: string; remove?: boolean }) {
  fetch('https://entibo.alwaysdata.net/fishing', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.text())
    .then((data) => console.log('Success:', data))
    .catch((error) => console.error('Error:', error))
}

// LOCAL
// User submissions are stored locally to allow instant
// feedback and partial functionality without the server

const KEY_SUBMISSIONS = 'fishing-submissions'

const submissions = ref<{ date: Date; spot: string; relic: string }[]>([])

// Read from local storage
{
  const local = localStorage.getItem(KEY_SUBMISSIONS)
  if (local) {
    try {
      submissions.value = JSON.parse(local).map((o: { date: string }) => ({
        ...o,
        date: new Date(o.date),
      }))
    } catch (e) {
      console.error('Parse error in submissions:', e)
    }
  }
}

// Prune submissions older that the reset date
watch(lastResetDate, (date) => {
  submissions.value = submissions.value.filter((submission) => submission.date >= date)
})

// Write to local storage
watch(submissions, (subs) => {
  localStorage.setItem(KEY_SUBMISSIONS, JSON.stringify(subs))
})

export const localSpotRelics = computed(() => {
  const spotRelics = Object.fromEntries(
    Object.keys(fishingSpotCoordinates).map((k) => [k, [] as string[]]),
  )
  for (const { spot, relic } of submissions.value) {
    if (!spotRelics[spot].includes(relic)) {
      spotRelics[spot].push(relic)
    }
  }
  return spotRelics
})

export const allSpotRelics = computed(() => {
  const r: Record<string, string[]> = {}
  Object.keys(fishingSpotCoordinates).forEach((spot) => {
    const relicsFromRemote = remoteSpotRelics.value[spot] ?? []
    const relicsFromLocalStorage = localSpotRelics.value[spot] ?? []
    r[spot] = [...new Set([...relicsFromRemote, ...relicsFromLocalStorage])]
  })
  return r
})

// SUBMIT

// Submit to local + remote
export function submitUserRelicPosition(spot: string, relic: string) {
  submissions.value.push({ date: new Date(), spot, relic })
  submitToRemote({ spot, relic })
}

// Unsubmit from local + remote
export function removeUserRelicPosition(spot: string, relic: string) {
  submissions.value = submissions.value.filter((sub) => !(sub.spot === spot && sub.relic === relic))
  submitToRemote({ spot, relic, remove: true })
}

// MIGRATE from previous local storage scheme
{
  const KEY_VERSION = 'fishing-spots-version'
  const KEY_SPOT_RELICS = 'fishing-spots'
  const local = localStorage.getItem(KEY_SPOT_RELICS)
  if (local) {
    try {
      const storedSpotRelics: Record<string, string[]> = JSON.parse(local)
      for (const [spot, relics] of Object.entries(storedSpotRelics))
        for (const relic of relics) {
          submissions.value.push({ date: new Date('2026-07-17'), spot, relic })
        }
      localStorage.removeItem(KEY_VERSION)
      localStorage.removeItem(KEY_SPOT_RELICS)
    } catch (e) {
      console.error(e)
    }
  }
}
