/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest'
import { createSSRApp } from 'vue'
import { CarouselItem } from '@/components/carousel-item'
import { renderToString } from 'vue/server-renderer'
import { Carousel } from '..'

describe('SSR for Carousel', () => {
  it('render', async () => {
    try {
      await renderToString(
        createSSRApp(() => (
          <Carousel>
            <CarouselItem>{'1'}</CarouselItem>
            <CarouselItem>{'2'}</CarouselItem>
            <CarouselItem>{'3'}</CarouselItem>
            <CarouselItem>{'4'}</CarouselItem>
          </Carousel>
        ))
      )
    } catch (error) {
      expect(error).toBeFalsy()
    }
  })
})
