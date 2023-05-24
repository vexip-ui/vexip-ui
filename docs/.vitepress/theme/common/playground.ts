import { strFromU8, strToU8, zlibSync } from 'fflate'

const playgroundUrl = import.meta.env.DEV
  ? 'http://localhost:6012/'
  : 'https://playground.vexipui.com/'

function utoa(data: string): string {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)

  return btoa(binary)
}

export function usePlayground(code: string) {
  const encoded = utoa(JSON.stringify({ 'App.vue': code }))

  return { link: `${playgroundUrl}#${encoded}` }
}
