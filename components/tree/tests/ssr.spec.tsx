/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Tree } from '..'

describe('SSR for Tree', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Tree></Tree>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
