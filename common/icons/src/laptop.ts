import { createSvg } from './internal/create-svg'

export const Laptop = createSvg('Laptop', {
    width: 640,
    height: 512,
    paths: [
      {
        d:
          'M624 416c8.8 0 16 7.2 16 16v16c0 35.2-28.8 64-64 64h-512c-35.2 0-64-28.8-64-64v-16c0-8.8 7.2-16 16-16h239.2c-0.3 14.5 14.1 32 32.8 32h60.8c18 0 32-12.2 32.7-32h242.5zM576 48v336h-512v-336c0-26.4 21.6-48 48-48h416c26.4 0 48 21.6 48 48zM512 320v-256h-384v256h384z'
      }
    ]
  }
)
