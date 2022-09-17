/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Modal } from '..'

describe('SSR for Modal', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Modal></Modal>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
