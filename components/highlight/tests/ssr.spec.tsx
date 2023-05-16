/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Highlight } from '..'

describe('SSR for Highlight', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Highlight></Highlight>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
