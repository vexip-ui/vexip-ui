/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Divider } from '..'

describe('SSR for Divider', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Divider></Divider>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
