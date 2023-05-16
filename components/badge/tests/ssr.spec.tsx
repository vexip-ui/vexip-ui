/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Badge } from '..'

describe('SSR for Badge', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Badge></Badge>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
