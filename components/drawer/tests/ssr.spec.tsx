/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Drawer } from '..'

describe('SSR for Drawer', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Drawer></Drawer>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
