/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Icon } from '..'

describe('SSR for Icon', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Icon></Icon>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
