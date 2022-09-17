/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import Message from '../message.vue'

describe('SSR for Message', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Message></Message>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
