/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { Breadcrumb } from '..'
import { BreadcrumbItem } from '@/components/breadcrumb-item'

describe('SSR for Breadcrumb', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <Breadcrumb>
            <BreadcrumbItem>item1</BreadcrumbItem>
            <BreadcrumbItem>item2</BreadcrumbItem>
          </Breadcrumb>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
