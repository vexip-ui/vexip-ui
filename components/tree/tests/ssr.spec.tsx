/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
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
