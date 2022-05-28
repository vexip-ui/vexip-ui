import { ref } from 'vue'

export function ussTocAnchor(wrapper = ref<HTMLElement | null>(null)) {
  const anchors = ref<string[]>([])

  function refreshAnchor() {
    anchors.value = []

    if (!wrapper.value) return

    Array.from(wrapper.value.querySelectorAll('.demo, h2.anchor > .anchor__title[id]')).forEach(
      el => {
        let id: string

        if (el.classList.contains('demo')) {
          id = el.querySelector('.demo__description .anchor')?.textContent?.trim() ?? ''
          el.setAttribute('id', id)
        } else {
          id = el.getAttribute('id') ?? ''

          const next = el.nextElementSibling as Element & { __anchor__: boolean }

          if (next && next.classList.contains('anchor__link') && !next.__anchor__) {
            next.addEventListener('click', ev => {
              ev.preventDefault()

              const href = next.getAttribute('href')
              const link = document.querySelector(`.vxp-anchor__link[href='${href}']`)

              if (link) {
                (link as HTMLElement).click()
              }
            })

            next.__anchor__ = true
          }
        }

        anchors.value.push(id)
      }
    )
  }

  return { wrapper, anchors, refreshAnchor }
}
