import { isClient } from './common'

let flexGapSupported: boolean | null = null

/**
 * 判断当前的环境是否支持 CSS 样式：`gap`、`row-gap` 和 `column-gap`
 *
 * @returns 是否支持
 */
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

let imgLoadingSupported: boolean | null = null

/**
 * 判断当前环境是否支持 `<img>` 标签的 `loading` 属性
 *
 * @returns 是否支持
 */
export function supportImgLoading() {
  if (!isClient) {
    return false
  }

  if (imgLoadingSupported === null) {
    imgLoadingSupported = 'loading' in document.createElement('img')
  }

  return imgLoadingSupported
}
