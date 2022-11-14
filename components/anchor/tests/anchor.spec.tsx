import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { AnchorLink } from '@/components/anchor-link'
import { mount } from '@vue/test-utils'
import { Anchor } from '..'

describe('Anchor', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Anchor>
        <AnchorLink>{'1'}</AnchorLink>
        <AnchorLink>{'2'}</AnchorLink>
      </Anchor>
    ))

    expect(wrapper.find('.vxp-anchor').classes()).toContain('vxp-anchor-vars')
    expect(wrapper.find('.vxp-anchor__list').exists()).toBe(true)
    expect(wrapper.findAll('.vxp-anchor__item').length).toEqual(2)
    expect(wrapper.find('.vxp-anchor__link').exists()).toBe(true)
  })

  it('active', async () => {
    const wrapper = mount(() => (
      <Anchor active={'#2'}>
        <AnchorLink to={'#1'}>{'1'}</AnchorLink>
        <AnchorLink to={'#2'}>{'2'}</AnchorLink>
      </Anchor>
    ))
    const links = wrapper.findAll('.vxp-anchor__item')

    await nextTick()
    expect(links[0].find('.vxp-anchor__link').classes()).not.toContain('vxp-anchor__link--active')
    expect(links[1].find('.vxp-anchor__link').classes()).toContain('vxp-anchor__link--active')
  })

  it('group', () => {
    const wrapper = mount(() => (
      <Anchor active={'#2'}>
        <AnchorLink to={'#1'}>
          {{
            default: () => '1',
            group: () => (
              <>
                <AnchorLink to={'#2'}>{'2'}</AnchorLink>
                <AnchorLink to={'#3'}>{'3'}</AnchorLink>
              </>
            )
          }}
        </AnchorLink>
        <AnchorLink to={'#4'}></AnchorLink>
      </Anchor>
    ))

    expect(wrapper.findAll('.vxp-anchor__item').length).toEqual(4)
    expect(wrapper.find('.vxp-anchor__item').find('.vxp-anchor__list').exists()).toBe(true)
    expect(wrapper.find('.vxp-anchor__item').findAll('.vxp-anchor__item').length).toEqual(2)
    expect(wrapper.findAll('.vxp-anchor__item')[3].find('.vxp-anchor__list').exists()).toBe(false)
  })

  it('with scroll', async () => {
    const createEl = (top = 0, id = '') => {
      const el = document.createElement('div')

      Object.defineProperty(el, 'offsetTop', {
        configurable: true,
        get: () => top,
        set: v => (top = v)
      })

      if (id) el.setAttribute('id', id)

      return el
    }

    const viewer = createEl(0, 'viewer')
    viewer.appendChild(createEl(20, 'a'))
    viewer.appendChild(createEl(40, 'b'))
    document.appendChild(viewer)

    Object.defineProperty(viewer, 'scrollHeight', {
      configurable: true,
      get: () => 60
    })

    const scrollToMock = vi
      .spyOn(viewer, 'scrollTo')
      .mockImplementation((x, y) => (viewer.scrollTop = y))

    const emitScroll = async (top: number) => {
      viewer.scrollTop = top
      viewer.dispatchEvent(new Event('scroll'))
      await nextTick()
    }

    const wrapper = mount(() => (
      <Anchor viewer={'#viewer'} offset={0} scroll-duration={0}>
        <AnchorLink to={'#a'}>{'a'}</AnchorLink>
        <AnchorLink to={'#b'}>{'b'}</AnchorLink>
      </Anchor>
    ))
    const links = wrapper.findAll('.vxp-anchor__item').map(i => i.find('.vxp-anchor__link'))

    await nextTick()
    await emitScroll(10)
    expect(links[0].classes()).not.toContain('vxp-anchor__link--active')
    expect(links[1].classes()).not.toContain('vxp-anchor__link--active')

    await emitScroll(25)
    expect(links[0].classes()).toContain('vxp-anchor__link--active')
    expect(links[1].classes()).not.toContain('vxp-anchor__link--active')

    await emitScroll(45)
    expect(links[0].classes()).not.toContain('vxp-anchor__link--active')
    expect(links[1].classes()).toContain('vxp-anchor__link--active')

    await links[0].trigger('click')
    expect(viewer.scrollTop).toEqual(20)

    await links[1].trigger('click')
    expect(viewer.scrollTop).toEqual(40)

    scrollToMock.mockRestore()
  })
})
