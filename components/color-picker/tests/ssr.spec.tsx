/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { ColorPicker } from '..'

describe('SSR for ColorPicker', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <ColorPicker></ColorPicker>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
