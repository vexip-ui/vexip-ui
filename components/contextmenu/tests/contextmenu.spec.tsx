import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Contextmenu from '../contextmenu.vue'

describe('Contextmenu', () => {
  it('render', () => {
    mount(Contextmenu)
  })
})
