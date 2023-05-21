/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Image } from '..'

describe('SSR for Image', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Image></Image>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
