import { createSvg } from './internal/create-svg'

export const Brush = createSvg('Brush', {
    width: 384,
    height: 512,
    paths: [
      {
        d:
          'M352 0c17.7 0 32 14.3 32 32v224h-384v-224c0-17.7 14.3-32 32-32h320zM0 320v-32h384v32c0 35.3-28.7 64-64 64h-64v64c0 35.3-28.7 64-64 64s-64-28.7-64-64v-64h-64c-35.3 0-64-28.7-64-64zM192 424c-13.3 0-24 10.7-24 24 0 13.3 10.8 24 24 24s24-10.8 24-24c0-13.3-10.8-24-24-24z'
      }
    ]
  }
)
