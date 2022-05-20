import { createSvg } from './internal/create-svg'

export const Box = createSvg('Box', {
    width: 512,
    height: 512,
    paths: [
      {
        d:
          'M509.5 184.6c0.8 2.4 0.8 4.9 1.2 7.4h-238.7v-192h141.4c20.7 0 39 13.2 45.5 32.8zM240 0v192h-238.7c0.4-2.5 0.4-5 1.2-7.4l50.6-151.8c6.5-19.6 24.8-32.8 45.5-32.8h141.4zM0 224h512v240c0 26.5-21.5 48-48 48h-416c-26.5 0-48-21.5-48-48v-240z'
      }
    ]
  }
)
