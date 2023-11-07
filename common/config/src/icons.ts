import {
  computed,
  defineAsyncComponent,
  getCurrentScope,
  inject,
  markRaw,
  provide,
  unref
} from 'vue'

import {
  AngleDown,
  AngleLeft,
  AngleRight,
  AngleUp,
  AnglesLeft,
  AnglesRight,
  ArrowRightArrowLeft,
  ArrowRightFromBracket,
  ArrowRotateLeft,
  ArrowRotateRight,
  ArrowsRotate,
  ArrowsUpToLine,
  BackwardStep,
  CalendarR,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUp,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleCheck,
  CircleExclamation,
  CircleInfo,
  CirclePause,
  CirclePlay,
  CircleQuestion,
  CircleQuestionR,
  CircleXmark,
  ClockR,
  CloudArrowUp,
  Compress,
  Ellipsis,
  Exclamation,
  Expand,
  EyeR,
  EyeSlashR,
  Filter,
  Flag,
  ForwardStep,
  GripLinesVertical,
  ImageR,
  Indent,
  Info,
  MagnifyingGlass,
  Minus,
  Moon,
  ObjectGroupR,
  Outdent,
  Pause,
  Play,
  Plus,
  Repeat,
  Retweet,
  Spinner,
  Sun,
  TrashCanR,
  Upload,
  User,
  VolumeHigh,
  VolumeXmark,
  Xmark
} from '@vexip-ui/icons'
import { ensureArray } from '@vexip-ui/utils'

import type { App, ComputedRef } from 'vue'
import type { ClassType, StyleType } from './props'
import type { MaybeRef } from './types'

export const PROVIDED_ICONS = '__vxp-provided-icons'

export type IconValue = Record<string, any> | (() => any)

export interface IconOptions {
  effect?: string,
  scale?: number,
  label?: string,
  title?: string,
  flip?: 'horizontal' | 'vertical' | 'both',
  class?: ClassType,
  style?: StyleType
}

export type IconArrayValue = [IconValue, IconOptions?]
export type IconConfig = IconValue | IconArrayValue

export interface IconsConfig {
  loading: IconConfig,
  arrowUp: IconConfig,
  arrowRight: IconConfig,
  arrowDown: IconConfig,
  arrowLeft: IconConfig,
  clear: IconConfig,
  close: IconConfig,
  cross: IconConfig,
  calendar: IconConfig,
  clock: IconConfig,
  exchange: IconConfig,
  angleUp: IconConfig,
  angleRight: IconConfig,
  angleDown: IconConfig,
  angleLeft: IconConfig,
  anglesRight: IconConfig,
  anglesLeft: IconConfig,
  retweet: IconConfig,
  refresh: IconConfig,
  caretUp: IconConfig,
  caretRight: IconConfig,
  caretDown: IconConfig,
  caretLeft: IconConfig,
  filter: IconConfig,
  ellipsis: IconConfig,
  upload: IconConfig,
  cloud: IconConfig,
  check: IconConfig,
  help: IconConfig,
  alert: IconConfig,
  question: IconConfig,
  info: IconConfig,
  plainInfo: IconConfig,
  success: IconConfig,
  plainSuccess: IconConfig,
  warning: IconConfig,
  plainWarning: IconConfig,
  error: IconConfig,
  plainError: IconConfig,
  delete: IconConfig,
  preview: IconConfig,
  image: IconConfig,
  plus: IconConfig,
  minus: IconConfig,
  cipherText: IconConfig,
  plainText: IconConfig,
  user: IconConfig,
  light: IconConfig,
  dark: IconConfig,
  signOut: IconConfig,
  indent: IconConfig,
  outdent: IconConfig,
  search: IconConfig,
  rotateRight: IconConfig,
  rotateLeft: IconConfig,
  flipX: IconConfig,
  flipY: IconConfig,
  zoomIn: IconConfig,
  zoonOut: IconConfig,
  fullScreen: IconConfig,
  resetScreen: IconConfig,
  dragger: IconConfig,
  volume: IconConfig,
  volumeMute: IconConfig,
  play: IconConfig,
  pause: IconConfig,
  fullWindow: IconConfig,
  pip: IconConfig,
  playState: IconConfig,
  pauseState: IconConfig,
  playPrev: IconConfig,
  playNext: IconConfig
}

export type IconsOptions = Partial<IconsConfig>
export type IconName = keyof IconsConfig

type NormalizedIconsConfig = Record<IconName, IconOptions & { icon: IconValue }>

const iconMap: IconsConfig = {
  loading: [Spinner, { effect: 'pulse-in' }],
  arrowUp: ChevronUp,
  arrowRight: ChevronRight,
  arrowDown: ChevronDown,
  arrowLeft: ChevronLeft,
  clear: CircleXmark,
  close: Xmark,
  cross: Xmark,
  calendar: CalendarR,
  clock: ClockR,
  exchange: ArrowRightArrowLeft,
  angleUp: AngleUp,
  angleRight: AngleRight,
  angleDown: AngleDown,
  angleLeft: AngleLeft,
  anglesRight: AnglesRight,
  anglesLeft: AnglesLeft,
  retweet: Retweet,
  refresh: ArrowsRotate,
  caretUp: CaretUp,
  caretRight: CaretRight,
  caretDown: CaretDown,
  caretLeft: CaretLeft,
  filter: Filter,
  ellipsis: Ellipsis,
  upload: Upload,
  cloud: CloudArrowUp,
  check: Check,
  help: CircleQuestionR,
  alert: Flag,
  question: CircleQuestion,
  info: CircleInfo,
  plainInfo: Info,
  success: CircleCheck,
  plainSuccess: Check,
  warning: CircleExclamation,
  plainWarning: Exclamation,
  error: CircleXmark,
  plainError: Xmark,
  delete: TrashCanR,
  preview: EyeR,
  image: ImageR,
  plus: Plus,
  minus: Minus,
  cipherText: EyeSlashR,
  plainText: EyeR,
  user: User,
  light: Sun,
  dark: Moon,
  signOut: ArrowRightFromBracket,
  indent: Indent,
  outdent: Outdent,
  search: MagnifyingGlass,
  rotateRight: ArrowRotateRight,
  rotateLeft: ArrowRotateLeft,
  flipX: Repeat,
  flipY: [Repeat, { style: 'transform: rotate(90deg)' }],
  zoomIn: Plus,
  zoonOut: Minus,
  fullScreen: Expand,
  resetScreen: Compress,
  dragger: GripLinesVertical,
  volume: VolumeHigh,
  volumeMute: VolumeXmark,
  play: Play,
  pause: Pause,
  fullWindow: ObjectGroupR,
  pip: ArrowsUpToLine,
  playState: CirclePlay,
  pauseState: CirclePause,
  playPrev: BackwardStep,
  playNext: ForwardStep
}

export const iconNames = Object.freeze(Object.keys(iconMap) as IconName[])

export const globalIcons = computed(() => {
  const icons = {} as NormalizedIconsConfig

  for (const name of iconNames) {
    const [icon, options = {}] = ensureArray(iconMap[name]) as IconArrayValue

    icons[name] = { ...options, icon }
  }

  return icons
})

/**
 * Provide a icons config for under components.
 *
 * @param icons icons config
 * @param app the app of Vue, will use app.provide if specify
 */
export function configIcons(icons: MaybeRef<IconsOptions>, app?: App) {
  const upstreamIcons =
    app || !getCurrentScope()
      ? globalIcons
      : inject<ComputedRef<IconsConfig> | null>(PROVIDED_ICONS, null)
  const normalizedIcons = computed(() => {
    const normalizedIcons: Partial<IconsConfig> = {}
    const unrefIcons = unref(icons)

    for (const name of iconNames) {
      const config = unrefIcons[name]

      if (!config) {
        normalizedIcons[name] = upstreamIcons?.value[name] || globalIcons.value[name]
      } else {
        const [icon, options = {}] = ensureArray(config) as IconArrayValue
        const normalizedIcon =
          typeof icon === 'function'
            ? defineAsyncComponent(async () => markRaw(await icon()))
            : markRaw(icon)

        normalizedIcons[name] = { ...options, icon: normalizedIcon }
      }
    }

    return normalizedIcons
  })

  if (app) {
    app.provide(PROVIDED_ICONS, normalizedIcons)
  } else {
    provide(PROVIDED_ICONS, normalizedIcons)
  }
}

export function useIcons() {
  return inject<ComputedRef<NormalizedIconsConfig>>(PROVIDED_ICONS, globalIcons)
}
