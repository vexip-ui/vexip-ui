import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { Highlight } from '..'

describe('Highlight', () => {
  it('render', () => {
    const wrapper = mount(Highlight, {
      props: {
        content: 'aaaabbaaaaacaaaadddaa',
        keyWords: ['c', 'bb', 'ddd'],
      },
    })

    expect(wrapper.classes()).toContain('vxp-highlight-vars')

    const keyWords = wrapper.findAll('.vxp-highlight__key-word')

    expect(keyWords.length).toEqual(3)
    expect(keyWords[0].text()).toEqual('bb')
    expect(keyWords[1].text()).toEqual('c')
    expect(keyWords[2].text()).toEqual('ddd')
  })

  it('ignore case', () => {
    const wrapper = mount(Highlight, {
      props: {
        content: 'aaaabBaaaaaCaaaaDddaa',
        keyWords: ['c', 'bb', 'ddd'],
        ignoreCase: true,
      },
    })

    expect(wrapper.classes()).toContain('vxp-highlight-vars')

    const keyWords = wrapper.findAll('.vxp-highlight__key-word')

    expect(keyWords.length).toEqual(3)
    expect(keyWords[0].text()).toEqual('bB')
    expect(keyWords[1].text()).toEqual('C')
    expect(keyWords[2].text()).toEqual('Ddd')
  })
})
