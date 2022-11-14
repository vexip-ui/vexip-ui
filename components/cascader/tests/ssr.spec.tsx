/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Cascader } from '..'

describe('SSR for Cascader', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Cascader></Cascader>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
