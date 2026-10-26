import { isClient } from './common'

/**
 * 将指定的文本写入粘贴板
 *
 * @param text 需要写入的文本
 *
 * @returns 是否写入成功
 */
export async function writeClipboard(text: string) {
  if (!isClient) return false

  try {
    await navigator.clipboard.writeText(text)

    return true
  } catch {
    let isSuccess = false

    const textarea = document.createElement('textarea')
    const prevFocused = document.activeElement

    textarea.value = text

    // Prevent keyboard from showing on mobile
    textarea.setAttribute('readonly', '')

    textarea.style.contain = 'strict'
    textarea.style.position = 'absolute'
    textarea.style.height = '0'
    textarea.style.fontSize = '12pt' // Prevent zooming on iOS

    const selection = document.getSelection()
    const originalRange = selection ? selection.rangeCount > 0 && selection.getRangeAt(0) : null

    document.body.appendChild(textarea)
    textarea.select()

    // Explicit selection workaround for iOS
    textarea.selectionStart = 0
    textarea.selectionEnd = text.length

    isSuccess = document.execCommand('copy')
    document.body.removeChild(textarea)

    if (originalRange) {
      selection!.removeAllRanges() // originalRange can't be truthy when selection is falsy
      selection!.addRange(originalRange)
    }

    // Get the focus back on the previously focused element, if any
    if (prevFocused) {
      ;(prevFocused as HTMLElement).focus()
    }

    return isSuccess
  }
}
