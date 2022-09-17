/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Wheel } from '..'

describe('SSR for Wheel', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Wheel></Wheel>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
