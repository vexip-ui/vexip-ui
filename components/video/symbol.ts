import type { InjectionKey } from 'vue'

export type VideoPresetControl =
  | 'play'
  | 'play-prev'
  | 'play-next'
  | 'refresh'
  | 'timer'
  | 'playback-rate'
  | 'flip'
  | 'volume'
  | 'pip'
  | 'full-window'
  | 'full-browser'
export type VideoShortcutOptions = Partial<Record<VideoPresetControl, string>>
// eslint-disable-next-line @typescript-eslint/ban-types
export type VideoControlName = VideoPresetControl | (string & {})
export type VideoControlConfig = VideoControlName | [VideoControlName, any]

export interface VideoControlLayout {
  left?: VideoControlConfig[],
  center?: VideoControlConfig[],
  right?: VideoControlConfig[]
}

export interface VideoPlaybackRate {
  label?: string,
  value: number
}

export type VideoControlType = 'button' | 'select' | 'panel'

export interface VideoControlOption {
  value: string | number,
  label?: string,
  selectedLabel?: string,
  disabled?: boolean,
  divided?: boolean,
  title?: string
}

export interface VideoSegment {
  time: number,
  title?: string
}

// export interface VideoKernel {
//   play: () => void,
//   pause: () => void,
//   mute: () => void,
//   unmute: () => void,
//   prev: () => void,
//   next: () => void,
//   refresh: () => void | boolean
// }

export interface VideoState {
  placeId?: string,
  iconScale: number,
  addShortcut: (key: string, cb: () => void) => () => void
}

const defaultLayout: Required<VideoControlLayout> = {
  left: ['play-prev', 'play', 'play-next', 'refresh', 'timer'],
  center: [],
  right: ['playback-rate', 'volume', 'flip', 'pip', 'full-window', 'full-browser']
}

for (const key of Object.keys(defaultLayout) as (keyof VideoControlLayout)[]) {
  defaultLayout[key] = Object.freeze(defaultLayout[key]) as any
}

export const videoDefaultControlLayout = Object.freeze(defaultLayout)

export const videoDefaultShortcuts = Object.freeze({
  play: 'Space',
  'play-prev': 'PageUp',
  'play-next': 'PageDown',
  refresh: 'R',
  flip: 'C',
  volume: 'M',
  pip: 'P',
  'full-window': 'G',
  'full-browser': 'F'
})

export const VIDEO_STATE: InjectionKey<VideoState> = Symbol('VIDEO_STATE')
