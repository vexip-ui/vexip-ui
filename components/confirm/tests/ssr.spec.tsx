/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import Confirm from '../confirm.vue'

describe('SSR for Confirm', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Confirm></Confirm>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
