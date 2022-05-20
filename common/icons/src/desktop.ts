import { createSvg } from './internal/create-svg'

export const Desktop = createSvg('Desktop', {
    width: 576,
    height: 512,
    paths: [
      {
        d:
          'M528 0c26.5 0 48 21.5 48 48v320c0 26.5-21.5 48-48 48h-192l16 48h72c13.3 0 24 10.7 24 24s-10.7 24-24 24h-272c-13.3 0-24-10.7-24-24s10.7-24 24-24h72l16-48h-192c-26.5 0-48-21.5-48-48v-320c0-26.5 21.5-48 48-48h480zM512 352v-288h-448v288h448z'
      }
    ]
  }
)
