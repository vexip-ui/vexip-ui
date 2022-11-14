/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { TimelineItem } from '@/components/timeline-item'
import { renderToString } from 'vue/server-renderer'
import { Timeline } from '..'

describe('SSR for Timeline', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <Timeline>
            <TimelineItem>{'item1'}</TimelineItem>
            <TimelineItem>{'item2'}</TimelineItem>
          </Timeline>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
