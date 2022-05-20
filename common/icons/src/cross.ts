import { createSvg } from './internal/create-svg'

export const Cross = createSvg('Cross', {
    width: 384,
    height: 512,
    paths: [
      {
        d:
          'M352 128c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32h-96v224c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32v-224h-96c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32h96v-96c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v96h96z'
      }
    ]
  }
)
