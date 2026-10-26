/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Slider } from '..'

describe('SSR for Slider', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Slider></Slider>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
