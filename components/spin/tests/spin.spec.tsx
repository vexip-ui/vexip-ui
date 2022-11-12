import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { GithubB } from '@vexip-ui/icons'
import { mount } from '@vue/test-utils'
import { Spin } from '..'
import { loading } from '../directive'

vi.useFakeTimers()

describe('Spin', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Spin>
        <div class={'content'}>{'content'}</div>
      </Spin>
    ))

    expect(wrapper.find('.vxp-spin').classes()).toContain('vxp-spin-vars')
    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.find('.vxp-spin').text()).toEqual('content')
  })

  it('active', async () => {
    const wrapper = mount(Spin, {
      props: { active: true }
    })

    expect(wrapper.find('.vxp-spin__loading').exists()).toBe(true)
    expect(wrapper.find('.vxp-spin__mask').exists()).toBe(true)

    await wrapper.setProps({ active: false })
    expect(wrapper.find('.vxp-spin__loading').exists()).toBe(false)
    expect(wrapper.find('.vxp-spin__mask').exists()).toBe(false)
  })

  it('delay', async () => {
    const wrapper = mount(Spin, {
      props: { delay: 10 }
    })

    await wrapper.setProps({ active: true })
    expect(wrapper.find('.vxp-spin__loading').exists()).toBe(false)

    vi.runAllTimers()
    await nextTick()
    expect(wrapper.find('.vxp-spin__loading').exists()).toBe(true)

    await wrapper.setProps({ active: false })
    expect(wrapper.find('.vxp-spin__loading').exists()).toBe(true)

    vi.runAllTimers()
    await nextTick()
    expect(wrapper.find('.vxp-spin__loading').exists()).toBe(false)
  })

  it('inner', () => {
    const wrapper = mount(() => (
      <div class={'wrapper'}>
        <Spin inner active></Spin>
      </div>
    ))

    expect(wrapper.find('.vxp-spin').classes()).toContain('vxp-spin--inner')
    expect(wrapper.find('.vxp-spin__mask').exists()).toBe(true)
  })

  it('tip', () => {
    const wrapper = mount(() => (
      <Spin active tip={'tip'}>
        <div class={'content'}>{'content'}</div>
      </Spin>
    ))

    expect(wrapper.find('.vxp-spin__tip').exists()).toBe(true)
    expect(wrapper.find('.vxp-spin__tip').text()).toEqual('tip')
  })

  it('tip slot', () => {
    const wrapper = mount(() => (
      <Spin active tip={'tip'}>
        {{
          default: () => <div class={'content'}>{'content'}</div>,
          tip: () => <div class={'tip'}></div>
        }}
      </Spin>
    ))

    expect(wrapper.find('.vxp-spin__tip').exists()).toBe(true)
    expect(wrapper.find('.tip').exists()).toBe(true)
    expect(wrapper.find('.vxp-spin__tip').text()).toEqual('')
  })

  it('icon', async () => {
    const wrapper = mount(() => (
      <Spin active icon={GithubB}>
        <div class={'content'}>{'content'}</div>
      </Spin>
    ))

    expect(wrapper.findComponent(GithubB).exists()).toBe(true)
  })

  it('v-loading', async () => {
    const wrapper = mount({
      template: '<div v-loading="loading"></div>',
      directives: {
        loading
      },
      data() {
        return {
          loading: true
        }
      }
    })

    await nextTick()
    expect(wrapper.find('.vxp-spin').classes()).toContain('vxp-spin--inner')
    expect(wrapper.find('.vxp-spin__mask').exists()).toBe(true)
  })
})
