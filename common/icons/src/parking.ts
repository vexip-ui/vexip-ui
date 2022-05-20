import { createSvg } from './internal/create-svg'

export const Parking = createSvg('Parking', {
    width: 448,
    height: 512,
    paths: [
      {
        d:
          'M400 32c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48h-352c-26.5 0-48-21.5-48-48v-352c0-26.5 21.5-48 48-48h352zM240 320c52.9 0 96-43.1 96-96s-43.1-96-96-96h-96c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48h48zM240 192c17.6 0 32 14.4 32 32s-14.4 32-32 32h-48v-64h48z'
      }
    ]
  }
)
