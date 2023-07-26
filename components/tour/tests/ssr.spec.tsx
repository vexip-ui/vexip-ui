/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Tour } from '..'

describe('SSR for Tour', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Tour></Tour>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
