/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Scroll } from '..'

describe('SSR for Scroll', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Scroll></Scroll>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
