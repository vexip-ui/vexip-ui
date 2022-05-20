import { createSvg } from './internal/create-svg'

export const SimCard = createSvg('SimCard', {
    width: 384,
    height: 512,
    paths: [
      {
        d:
          'M0 64c0-35.3 28.7-64 64-64h192l128 128v320c0 35.3-28.7 64-64 64h-256c-35.3 0-64-28.7-64-64v-384zM224 256v-64h-64v64h64zM320 256v-32c0-17.7-14.3-32-32-32h-32v64h64zM256 384v64h32c17.7 0 32-14.3 32-32v-32h-64zM160 384v64h64v-64h-64zM64 384v32c0 17.7 14.3 32 32 32h32v-64h-64zM64 288v64h256v-64h-256zM64 224v32h64v-64h-32c-17.7 0-32 14.3-32 32z'
      }
    ]
  }
)
