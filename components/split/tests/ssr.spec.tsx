/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Split } from '..'

describe('SSR for Split', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Split></Split>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
