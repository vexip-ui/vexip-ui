import { createSvg } from './internal/create-svg'

export const PaintRoller = createSvg('PaintRoller', {
    width: 512,
    height: 512,
    paths: [
      {
        d:
          'M416 128c0 17.7-14.3 32-32 32h-352c-17.7 0-32-14.3-32-32v-96c0-17.7 14.3-32 32-32h352c17.7 0 32 14.3 32 32v96zM448 64c35.3 0 64 28.7 64 64v64c0 53-43 96-96 96h-160v32c17.7 0 32 14.3 32 32v128c0 17.7-14.3 32-32 32h-64c-17.7 0-32-14.3-32-32v-128c0-17.7 14.3-32 32-32v-32c0-35.3 28.7-64 64-64h160c17.7 0 32-14.3 32-32v-128z'
      }
    ]
  }
)
