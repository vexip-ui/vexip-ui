/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Calendar } from '..'

describe('SSR for Calendar', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Calendar></Calendar>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
