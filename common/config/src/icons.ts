import {
  computed,
  unref,
  provide,
  inject,
  markRaw,
  defineAsyncComponent,
  getCurrentScope
} from 'vue'
import {
  Spinner,
  ChevronUp,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  CircleXmark,
  Xmark,
  CalendarR,
  ClockR,
  ArrowRightArrowLeft,
  AngleUp,
  AngleRight,
  AngleDown,
  AngleLeft,
  AnglesRight,
  AnglesLeft,
  Retweet,
  ArrowsRotate,
  CaretUp,
  CaretRight,
  CaretDown,
  CaretLeft,
  Filter,
  Ellipsis,
  Upload,
  CloudArrowUp,
  Check,
  CircleQuestionR,
  Flag,
  CircleQuestion,
  CircleInfo,
  CircleCheck,
  CircleExclamation,
  TrashCanR,
  EyeR,
  ImageR,
  Plus,
  Minus,
  Info,
  Exclamation,
  EyeSlashR,
  User,
  Sun,
  Moon,
  ArrowRightFromBracket,
  Indent,
  Outdent,
  MagnifyingGlass,
  ArrowRotateLeft,
  ArrowRotateRight,
  Repeat,
  Expand,
  Compress
} from '@vexip-ui/icons'
import { ensureArray } from '@vexip-ui/utils'

import type { App, ComputedRef, Ref } from 'vue'
import type { ClassType, StyleType } from './props'

export const PROVIDED_ICONS = '__vxp-provided-icons'

type MaybeRef<T> = T | Ref<T>
type IconValue = Record<string, any> | (() => any)

interface IconOptions {
  effect?: string,
  scale?: number,
  label?: string,
  title?: string,
  flip?: 'horizontal' | 'vertical' | 'both',
  class?: ClassType,
  style?: StyleType
}

type IconArrayValue = [IconValue, IconOptions?]
type IconConfig = IconValue | IconArrayValue

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
  resetScreen: IconConfig
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
  resetScreen: Compress
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

export function configIcons(icons: MaybeRef<IconsOptions>, app?: App) {
  const upstreamIcons =
    app || !getCurrentScope() ? globalIcons : inject<ComputedRef<IconsConfig>>(PROVIDED_ICONS)
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
