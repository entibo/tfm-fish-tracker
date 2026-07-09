export function relicListFromString(val: string) {
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
