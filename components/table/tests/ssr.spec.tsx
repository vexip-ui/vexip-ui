/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Table } from '..'

describe('SSR for Table', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <Table></Table>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
