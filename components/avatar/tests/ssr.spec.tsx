/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Avatar } from '..'

describe('SSR for Avatar', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Avatar></Avatar>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
