/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Bubble } from '..'

describe('SSR for Bubble', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Bubble></Bubble>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
