/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Space } from '..'

describe('SSR for Space', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Space></Space>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
