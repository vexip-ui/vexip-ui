import { createSvg } from './internal/create-svg'

export const Circle = createSvg('Circle', {
    width: 512,
    height: 512,
    paths: [
      {
        d:
          'M256 8c137 0 248 111 248 248s-111 248-248 248-248-111-248-248 111-248 248-248z'
      }
    ]
  }
)
