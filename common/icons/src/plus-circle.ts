import { createSvg } from './internal/create-svg'

export const PlusCircle = createSvg('PlusCircle', {
    width: 512,
    height: 512,
    paths: [
      {
        d:
          'M256 8c137 0 248 111 248 248s-111 248-248 248-248-111-248-248 111-248 248-248zM400 284v-56c0-6.6-5.4-12-12-12h-92v-92c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12v92h-92c-6.6 0-12 5.4-12 12v56c0 6.6 5.4 12 12 12h92v92c0 6.6 5.4 12 12 12h56c6.6 0 12-5.4 12-12v-92h92c6.6 0 12-5.4 12-12z'
      }
    ]
  }
)
