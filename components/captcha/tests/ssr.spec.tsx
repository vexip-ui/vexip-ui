/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Captcha } from '..'

describe('SSR for Captcha', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Captcha></Captcha>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
