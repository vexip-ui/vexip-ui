/**
 * @vitest-environment node
 */

import { describe, expect, it } from 'vitest'
import { createSSRApp } from 'vue'

import { renderToString } from 'vue/server-renderer'
import { Blockquote, OL, Text, Title, UL } from '..'

describe('SSR for Typography', () => {
  it('render Text', async () => {
    try {
      await renderToString(createSSRApp(() => <Text></Text>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })

  it('render Title', async () => {
    try {
      await renderToString(createSSRApp(() => <Title></Title>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })

  it('render Blockquote', async () => {
    try {
      await renderToString(createSSRApp(() => <Blockquote></Blockquote>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })

  it('render OL', async () => {
    try {
      await renderToString(createSSRApp(() => <OL></OL>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })

  it('render UL', async () => {
    try {
      await renderToString(createSSRApp(() => <UL></UL>))
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
