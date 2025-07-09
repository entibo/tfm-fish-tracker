import { writeFile } from 'fs/promises'
import { Buffer } from 'buffer'
import path from 'path'

async function getRelics(prefix, start) {
  for (let i = 1; i <= 11; i++) {
    const id = start + i
    const url = `http://transformice.com/images/x_transformice/x_inventaire/${id}.jpg`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const fileName = prefix + i + '.jpg'
    const filePath = path.join('public', 'img', 'relic', fileName)
    await writeFile(filePath, buffer)
  }
}

await Promise.all([
  //
  getRelics('A', 1000),
  getRelics('B', 1200),
  getRelics('C', 1300),
  getRelics('D', 1900),
  getRelics('E', 1100),
  getRelics('F', 1400),
])

console.log('Done!')
