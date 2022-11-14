/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Viewer } from '..'

describe('SSR for Viewer', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Viewer></Viewer>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
