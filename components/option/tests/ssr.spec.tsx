/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Option } from '..'

describe('SSR for Option', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Option></Option>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
