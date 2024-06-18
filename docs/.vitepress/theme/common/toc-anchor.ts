import { ref } from 'vue'

import { ensureArray } from '@vexip-ui/utils'

export interface AnchorMeta {
  id: string,
  to: string,
  label: string,
  level: number,
  children: AnchorMeta[]
}

export function ussTocAnchor(initLevel: 2 | 3 | (2 | 3)[] = 2, wrapper = ref<HTMLElement>()) {
  const anchors = ref<AnchorMeta[]>([])

  function refreshAnchor(level = initLevel) {
    anchors.value = []

    if (!wrapper.value) return

    const map = new Map<string, AnchorMeta>()
    const root = { level: 1, children: anchors.value } as AnchorMeta

    let prev = root

    Array.from(
      wrapper.value.querySelectorAll<HTMLElement>(
        [
          '.demo',
          ...ensureArray(level).map(
            l => `:not(.demo__description) > h${l}.anchor > .anchor__title[id]`
          )
        ].join()
      )
    ).forEach(el => {
      let id: string
      let label: string
      let level: number

      if (el.classList.contains('demo')) {
        id = el.querySelector('.demo__description .anchor')?.textContent?.trim() ?? ''
        id = id.replace(/#$/, '')
        label = id
        id = id.toLocaleLowerCase().replace(/\s+/g, '-')
        level = 3

        el.setAttribute('id', id)
      } else {
        if (!el.dataset.level) return

        id = el.getAttribute('id') ?? ''
        label = el.textContent ?? ''
        level = parseFloat(el.dataset.level)

        const next = el.nextElementSibling as Element & { __anchor__: boolean }

        if (next && next.classList.contains('anchor__link') && !next.__anchor__) {
          next.addEventListener('click', ev => {
            ev.preventDefault()

            const href = next.getAttribute('href')
            const link = document.querySelector(`.vxp-anchor__link[href='${href}']`) as HTMLElement

            link && link.click()
          })

          next.__anchor__ = true
        }
      }

      const anchor: AnchorMeta = { id, to: `#${id}`, label, level, children: [] }

      if (level > prev.level) {
        prev.children.push(anchor)
        map.set(id, prev)
      } else if (level === prev.level) {
        const parent = map.get(prev.id)

        if (parent) {
          parent.children.push(anchor)
          map.set(id, parent)
        }
      } else {
        let parent = map.get(prev.id)

        while (parent && level <= parent.level) {
          parent = map.get(parent.id)
        }

        parent?.children.push(anchor)
      }

      prev = anchor
    })
  }

  return { wrapper, anchors, refreshAnchor }
}
