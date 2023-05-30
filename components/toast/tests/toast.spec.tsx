import { describe, expect, it, vi } from 'vitest'
import { getCurrentInstance, nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Check, Exclamation, GithubB, Spinner, Xmark } from '@vexip-ui/icons'
import Toast from '../toast.vue'
import { ToastManager } from '..'

vi.useFakeTimers()

const typeIconMap = {
  success: Check,
  warning: Exclamation,
  error: Xmark,
  loading: Spinner
}

const TEXT = 'Text'

function createToast() {
  const Toast = new ToastManager()

  mount({
    setup() {
      const instance = getCurrentInstance()
      const app = instance?.appContext.app

      app?.use(Toast)

      return () => <div></div>
    }
  })

  return Toast
}

async function toastOpened() {
  await nextTick()
  await nextTick()
  await nextTick()
}

describe('Toast', () => {
  it('render', () => {
    const wrapper = mount(Toast)

    expect(wrapper.classes()).toContain('vxp-toast-vars')
  })

  it('open', async () => {
    const Toast = createToast()

    Toast.open(TEXT)
    await toastOpened()
    expect(document.querySelector('.vxp-toast')).toBeTruthy()
    expect(document.querySelector('.vxp-toast__content')?.textContent).toEqual(TEXT)
  })

  it('will disappear', async () => {
    const Toast = createToast()

    Toast.open(TEXT)
    await toastOpened()
    expect(document.querySelector('.vxp-toast__wrapper')).toBeTruthy()

    vi.runAllTimers()
    await nextTick()
    expect(document.querySelector('.vxp-toast__wrapper')).toBeFalsy()
  })

  const types = ['success', 'warning', 'error', 'loading'] as const

  types.forEach(type => {
    it(`type ${type}`, async () => {
      const Toast = createToast()

      expect(type in Toast).toBe(true)

      Toast[type](TEXT)
      await toastOpened()
      expect(document.querySelector('.vxp-toast__icon')).toBeTruthy()

      const icon = mount(typeIconMap[type])
      expect(document.querySelector('.vxp-toast__icon')!.querySelector('svg')?.innerHTML).toEqual(
        icon.find('svg').element.innerHTML
      )
    })
  })

  it('position', async () => {
    const Toast = createToast()

    Toast.open({
      content: TEXT,
      position: 'top'
    })
    await toastOpened()
    expect(
      document.querySelector('.vxp-toast__wrapper')?.classList.contains('vxp-toast__wrapper--top')
    ).toBe(true)

    vi.runAllTimers()
    await nextTick()
    Toast.open({
      content: TEXT,
      position: 'bottom'
    })
    await toastOpened()
    expect(
      document
        .querySelector('.vxp-toast__wrapper')
        ?.classList.contains('vxp-toast__wrapper--bottom')
    ).toBe(true)
  })

  it('closable', async () => {
    const Toast = createToast()

    Toast.open({
      content: TEXT,
      closable: true
    })
    await toastOpened()

    document.querySelector('.vxp-toast__wrapper')!.dispatchEvent(new Event('click'))
    await nextTick()
    expect(document.querySelector('.vxp-toast__wrapper')).toBeFalsy()
  })

  it('icon', async () => {
    const Toast = createToast()

    Toast.open({
      content: TEXT,
      icon: GithubB
    })
    await toastOpened()
    expect(document.querySelector('.vxp-toast__icon')).toBeTruthy()

    const icon = mount(GithubB)
    expect(document.querySelector('.vxp-toast__icon')!.querySelector('svg')?.innerHTML).toEqual(
      icon.find('svg').element.innerHTML
    )
  })

  it('parse html', async () => {
    const Toast = createToast()

    Toast.open({
      content: '<div class="test"></div>',
      parseHtml: true
    })
    await toastOpened()
    expect(document.querySelector('.test')).toBeTruthy()
  })
})
