/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Switch } from '..'

describe('SSR for Switch', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Switch></Switch>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
