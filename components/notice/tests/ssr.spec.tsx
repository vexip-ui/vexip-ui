/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import Notice from '../notice.vue'

describe('SSR for Notice', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Notice></Notice>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
