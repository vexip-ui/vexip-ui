/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Input } from '..'

describe('SSR for Input', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Input></Input>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
