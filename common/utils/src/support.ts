import { isClient } from './common'

let flexGapSupported: boolean | null = null

export function supportFlexGap() {
  if (!isClient) {
    return true
  }

  if (flexGapSupported === null) {
    const flex = document.createElement('div')

    flex.style.display = 'flex'
    flex.style.flexDirection = 'column'
    flex.style.rowGap = '1px'

    flex.appendChild(document.createElement('div'))
    flex.appendChild(document.createElement('div'))
    document.body.appendChild(flex)

    flexGapSupported = flex.scrollHeight === 1

    document.body.removeChild(flex)
  }

  return flexGapSupported
}

export function supportImgLoading() {
  return !isClient || 'loading' in HTMLImageElement.prototype
}
