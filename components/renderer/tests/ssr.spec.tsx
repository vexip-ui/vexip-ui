/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Renderer } from '..'

describe('SSR for Renderer', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Renderer></Renderer>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
