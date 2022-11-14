/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { CheckboxGroup } from '@/components/checkbox-group'
import { renderToString } from 'vue/server-renderer'
import { Checkbox } from '..'

describe('SSR for Checkbox', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Checkbox></Checkbox>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })

  it('render group', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <CheckboxGroup>
            <Checkbox></Checkbox>
            <Checkbox></Checkbox>
          </CheckboxGroup>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
