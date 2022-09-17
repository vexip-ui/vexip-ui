/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { ResizeObserver } from '..'

describe('SSR for ResizeObserver', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <ResizeObserver></ResizeObserver>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
