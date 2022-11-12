/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { CollapsePanel } from '@/components/collapse-panel'
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
