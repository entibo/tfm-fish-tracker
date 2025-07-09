import { reactive, watch } from 'vue'

const LOCALSTORAGE_KEY = 'fishing-relics'

export const allRelics = [...'ABCDEF'].flatMap((letter) =>
  Array(10)
    .fill(null)
    .map((_, i) => letter + (i + 1)),
)

export const relicStore = reactive({
  list: [] as string[],

  toggle(relic: string) {
    // Toggle an entire letter series on/off
    if (relic.endsWith('11')) {
      const prefix = relic[0]
      const series = this.list.filter((relic) => relic.startsWith(prefix))
      if (series.length === 10) {
        this.list = this.list.filter((relic) => !relic.startsWith(prefix))
      } else {
        for (let i = 1; i <= 10; i++) {
          const relic = prefix + i
          if (!series.includes(relic)) {
            this.list.push(relic)
          }
        }
      }
      return
    }

    if (this.list.includes(relic)) {
      this.list = this.list.filter((r) => r !== relic)
    } else {
      this.list.push(relic)
    }
  },
})

// Restore from URL or from localStorage
function restore() {
  const fromURL = [...new URLSearchParams(location.search).keys()]
  if (fromURL.length) {
    return fromURL
  }

  const fromLocalStorage = localStorage.getItem(LOCALSTORAGE_KEY)?.split(' ')
  if (fromLocalStorage?.length) {
    return fromLocalStorage
  }
}
const restoredRelics = restore()
if (restoredRelics) {
  relicStore.list = restoredRelics
}

// Save to URL and localStorage when changed
watch(relicStore, ({ list }) => {
  localStorage.setItem(LOCALSTORAGE_KEY, list.join(' '))

  const url = new URL(location.href)
  url.search = list.length ? '?' + list.join('&') : ''
  window.history.replaceState({}, '', url)
})
