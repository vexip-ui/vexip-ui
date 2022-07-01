import { describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Renderer } from '..'

describe('Renderer', () => {
  it('render', () => {
    mount(() => <Renderer renderer={() => {}}></Renderer>)
  })
})
