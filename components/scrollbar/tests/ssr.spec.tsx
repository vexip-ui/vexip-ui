/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Scrollbar } from '..'

describe('SSR for Scrollbar', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Scrollbar></Scrollbar>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
