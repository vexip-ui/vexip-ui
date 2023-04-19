import { ref } from 'vue'

export interface AnchorMeta {
  id: string,
  name: string
}

export function ussTocAnchor(initLevel: 2 | 3 = 2, wrapper = ref<HTMLElement>()) {
  const anchors = ref<AnchorMeta[]>([])

  function refreshAnchor(level = initLevel) {
    anchors.value = []

    if (!wrapper.value) return

    Array.from(
      wrapper.value.querySelectorAll(
        `.demo, :not(.demo__description) > h${level}.anchor > .anchor__title[id]`
      )
    ).forEach(el => {
      let id: string
      let name: string

      if (el.classList.contains('demo')) {
        id = el.querySelector('.demo__description .anchor')?.textContent?.trim() ?? ''
        id = id.replace(/#$/, '')
        name = id
        id = id.toLocaleLowerCase().replace(/\s+/g, '-')

        el.setAttribute('id', id)
      } else {
        id = el.getAttribute('id') ?? ''
        name = el.textContent ?? ''

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

      anchors.value.push({ id, name })
    })
  }

  return { wrapper, anchors, refreshAnchor }
}
