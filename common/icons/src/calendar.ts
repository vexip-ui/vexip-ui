import { createSvg } from './internal/create-svg'

export const Calendar = createSvg('Calendar', {
    width: 448,
    height: 512,
    paths: [
      {
        d:
          'M12 192h424c6.6 0 12 5.4 12 12v260c0 26.5-21.5 48-48 48h-352c-26.5 0-48-21.5-48-48v-260c0-6.6 5.4-12 12-12zM448 148c0 6.6-5.4 12-12 12h-424c-6.6 0-12-5.4-12-12v-36c0-26.5 21.5-48 48-48h48v-52c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128v-52c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48v36z'
      }
    ]
  }
)
