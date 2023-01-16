import { describe, it, expect, vitest } from 'vitest'
import { mount } from '@vue/test-utils'
import { CountTo } from '..'

describe('CountTo', () => {
  it('render', () => {
    const wrapper = mount(CountTo)

    expect(wrapper.classes()).toStrictEqual(['vxp-count-to', 'vxp-count-to-vars'])
  })

  it('start', async () => {
    const wrapper = mount(() => <CountTo start={0} end={100}></CountTo>)
    const { start, toggle } = wrapper.getComponent(CountTo).vm

    const el = wrapper.find('.vxp-count-to')

    expect(el.text()).eq('0')
    await start()
    expect(wrapper.find('.vxp-count-to')).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="vxp-count-to vxp-count-to-vars"
        >
          0
        </div>,
      }
    `)
  })
})
