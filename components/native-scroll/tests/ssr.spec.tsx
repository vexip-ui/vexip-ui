/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { NativeScroll } from '..'

describe('SSR for NativeScroll', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <NativeScroll></NativeScroll>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
