import { describe, expect, it } from 'vitest'
import { getCurrentInstance, nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Github } from 'lucide-vue-next'
import Notice from '../notice.vue'
import { NoticeManager } from '..'

const TEXT = 'Text'

function createNotice() {
  const Notice = new NoticeManager()

  mount({
    setup() {
      const instance = getCurrentInstance()
      const app = instance?.appContext.app

      app?.use(Notice)

      return () => <div></div>
    },
  })

  return Notice
}

async function noticeOpened() {
  await nextTick()
  await nextTick()
  await nextTick()
}

describe('Notice', () => {
  it('render', () => {
    const wrapper = mount(Notice)

    expect(wrapper.find('.vxp-notice').exists()).toBe(true)
  })

  it('render item', async () => {
    const wrapper = mount(Notice)

    await wrapper.vm.add({
      title: TEXT,
      content: TEXT,
      icon: Github,
    })
    const item = wrapper.find('.vxp-notice__item')

    expect(item.exists()).toBe(true)
    expect(item.find('.vxp-notice__icon').exists()).toBe(true)
    expect(item.findComponent(Github).exists()).toBe(true)
    expect(item.find('.vxp-notice__title').exists()).toBe(true)
    expect(item.find('.vxp-notice__title').text()).toBe(TEXT)
    expect(item.find('.vxp-notice__content').exists()).toBe(true)
    expect(item.find('.vxp-notice__content').text()).toBe(TEXT)
  })

  it('open', async () => {
    const Notice = createNotice()

    Notice.open(TEXT, TEXT)
    await noticeOpened()
    expect(document.querySelector('.vxp-notice__item')).toBeTruthy()
    expect(document.querySelector('.vxp-notice__title')?.textContent).toEqual(TEXT)
    expect(document.querySelector('.vxp-notice__content')?.textContent).toEqual(TEXT)
  })

  it('title only', async () => {
    const Notice = createNotice()

    Notice.open(TEXT)
    await noticeOpened()
    expect(document.querySelector('.vxp-notice__title')?.textContent).toEqual(TEXT)
    expect(document.querySelector('.vxp-notice__content')).toBeFalsy()
  })

  it('content only', async () => {
    const Notice = createNotice()

    Notice.open({ content: TEXT })
    await noticeOpened()
    expect(document.querySelector('.vxp-notice__title')).toBeFalsy()
    expect(document.querySelector('.vxp-notice__content')?.textContent).toEqual(TEXT)
  })

  const types = ['primary', 'info', 'success', 'warning', 'error'] as const

  types.forEach(type => {
    it(`type ${type}`, async () => {
      const Notice = createNotice()

      expect(type in Notice)

      Notice[type](TEXT)
      await noticeOpened()
      expect(document.querySelector('.vxp-notice__item')).toBeTruthy()
      expect(document.querySelector('.vxp-notice__title')?.textContent).toEqual(TEXT)
    })
  })

  it('closable', async () => {
    const Notice = createNotice()

    Notice.open({
      content: TEXT,
      closable: true,
    })
    await noticeOpened()
    expect(document.querySelector('.vxp-notice__close')).toBeTruthy()
  })

  it('icon', async () => {
    const Notice = createNotice()

    Notice.open({
      content: TEXT,
      icon: Github,
    })
    await noticeOpened()
    expect(document.querySelector('.vxp-notice__icon')).toBeTruthy()

    const icon = mount(Github)
    expect(document.querySelector('.vxp-notice__icon')!.querySelector('svg')?.innerHTML).toEqual(
      icon.find('svg').element.innerHTML,
    )
  })

  it('parse html', async () => {
    const Notice = createNotice()

    Notice.open({
      title: '<div class="test1"></div>',
      content: '<div class="test2"></div>',
      parseHtml: true,
    })
    await noticeOpened()
    expect(document.querySelector('.test1')).toBeTruthy()
    expect(document.querySelector('.test2')).toBeTruthy()
  })

  it('transferTo', async () => {
    const Notice = createNotice()
    const el = document.createElement('div')
    Notice.transferTo(el)

    await nextTick()
    expect(el.querySelector('.vxp-notice')).toBeTruthy()
  })
})
