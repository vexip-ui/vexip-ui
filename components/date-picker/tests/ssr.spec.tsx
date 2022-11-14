/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { TimePicker } from '@/components/time-picker'
import { renderToString } from 'vue/server-renderer'
import { DatePicker } from '..'

describe('SSR for DatePicker', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <DatePicker></DatePicker>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})

describe('SSR for TimePicker', () => {
  it('render', async () => {
    try {
      await renderToString(createSSRApp(() => <TimePicker></TimePicker>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
