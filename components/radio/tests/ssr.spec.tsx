/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Radio } from '..'
import { RadioGroup } from '@/components/radio-group'

describe('SSR for Radio', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Radio></Radio>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })

  it('render group', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <RadioGroup>
            <Radio label={'1'}></Radio>
            <Radio label={'2'}></Radio>
          </RadioGroup>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
