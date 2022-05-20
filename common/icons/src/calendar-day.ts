import { createSvg } from './internal/create-svg'

export const CalendarDay = createSvg('CalendarDay', {
    width: 448,
    height: 512,
    paths: [
      {
        d:
          'M0 464v-272h448v272c0 26.5-21.5 48-48 48h-352c-26.5 0-48-21.5-48-48zM64 272v96c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16v-96c0-8.8-7.2-16-16-16h-96c-8.8 0-16 7.2-16 16zM400 64c26.5 0 48 21.5 48 48v48h-448v-48c0-26.5 21.5-48 48-48h48v-48c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h128v-48c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48z'
      }
    ]
  }
)
