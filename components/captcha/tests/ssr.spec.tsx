/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
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
