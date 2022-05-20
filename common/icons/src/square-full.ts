import { createSvg } from './internal/create-svg'

export const SquareFull = createSvg('SquareFull', {
    width: 512,
    height: 512,
    paths: [
      {
        d: 'M512 512h-512v-512h512v512z'
      }
    ]
  }
)
