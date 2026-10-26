/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
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
