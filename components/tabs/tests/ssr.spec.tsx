/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Tabs } from '..'
import { TabPanel } from '@/components/tab-panel'

describe('SSR for Tabs', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <Tabs>
            <TabPanel>{'content'}</TabPanel>
          </Tabs>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
