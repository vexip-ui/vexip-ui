/**
 * @vitest-environment node
 */

import { CollapsePanel } from '@/components/collapse-panel'

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Collapse } from '..'

describe('SSR for Collapse', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <Collapse>
            <CollapsePanel></CollapsePanel>
          </Collapse>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
