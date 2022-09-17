/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import Contextmenu from '../contextmenu.vue'

describe('SSR for Contextmenu', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Contextmenu></Contextmenu>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
