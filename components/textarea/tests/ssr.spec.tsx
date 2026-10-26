/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Textarea } from '..'

describe('SSR for Textarea', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Textarea></Textarea>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
