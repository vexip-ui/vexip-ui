/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { FullScreen } from '..'

describe('SSR for FullScreen', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <FullScreen />))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
