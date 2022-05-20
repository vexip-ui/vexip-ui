import { createSvg } from './internal/create-svg'

export const Bookmark = createSvg('Bookmark', {
    width: 384,
    height: 512,
    paths: [
      {
        d:
          'M0 512v-464c0-26.5 21.5-48 48-48h288c26.5 0 48 21.5 48 48v464l-192-112z'
      }
    ]
  }
)
