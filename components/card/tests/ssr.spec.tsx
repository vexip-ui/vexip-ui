/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Card } from '..'

describe('SSR for Card', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Card></Card>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
