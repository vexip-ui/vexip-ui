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
  AlertCircle,
  ArrowLeftRight,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Eye,
  EyeOff,
  File,
  FileArchive,
  FileCode,
  FileImage,
  FileMusic,
  FileText,
  FileVideo,
  Filter,
  FlipHorizontal,
  FlipVertical,
  GripVertical,
  HelpCircle,
  Image,
  Indent,
  Info,
  Loader2,
  LogOut,
  Maximize,
  MessageCircleQuestion,
  Minimize,
  Minus,
  MinusSquare,
  Moon,
  MoreHorizontal,
  Outdent,
  Plus,
  PlusSquare,
  RefreshCw,
  Repeat2,
  RotateCcw,
  RotateCw,
  Search,
  Siren,
  Sun,
  Trash2,
  Upload,
  UploadCloud,
  UserRound,
  X,
  XCircle,
  ZoomIn,
  ZoomOut
} from 'lucide-vue-next'
import { ensureArray } from '@vexip-ui/utils'

import type { App, ComputedRef, MaybeRef } from 'vue'
import type { ClassType, StyleType } from './props'

export const PROVIDED_ICONS = '__vxp-provided-icons'

export type IconValue = Record<string, any> | (() => any)

export interface IconOptions extends Record<string, any> {
  class?: ClassType,
  style?: StyleType,
  scale?: number | string,
  title?: string,
  label?: string,
  flip?: 'horizontal' | 'vertical' | 'both',
  effect?: string,
  size?: string,
  color?: string,
  rotate?: number | string
}

export type IconArrayValue = [IconValue, IconOptions?]
export type IconConfig = IconValue | IconArrayValue

export interface IconsOptions {
  loading?: IconConfig,
  clear?: IconConfig,
  close?: IconConfig,
  calendar?: IconConfig,
  clock?: IconConfig,
  exchange?: IconConfig,
  angleUp?: IconConfig,
  angleRight?: IconConfig,
  angleDown?: IconConfig,
  angleLeft?: IconConfig,
  anglesRight?: IconConfig,
  anglesLeft?: IconConfig,
  retweet?: IconConfig,
  refresh?: IconConfig,
  filter?: IconConfig,
  ellipsis?: IconConfig,
  upload?: IconConfig,
  uploadCloud?: IconConfig,
  check?: IconConfig,
  help?: IconConfig,
  alert?: IconConfig,
  question?: IconConfig,
  info?: IconConfig,
  success?: IconConfig,
  warning?: IconConfig,
  error?: IconConfig,
  delete?: IconConfig,
  preview?: IconConfig,
  image?: IconConfig,
  plus?: IconConfig,
  minus?: IconConfig,
  plusSquare?: IconConfig,
  minusSquare?: IconConfig,
  cipherText?: IconConfig,
  plainText?: IconConfig,
  user?: IconConfig,
  light?: IconConfig,
  dark?: IconConfig,
  signOut?: IconConfig,
  indent?: IconConfig,
  outdent?: IconConfig,
  search?: IconConfig,
  rotateRight?: IconConfig,
  rotateLeft?: IconConfig,
  flipX?: IconConfig,
  flipY?: IconConfig,
  zoomIn?: IconConfig,
  zoonOut?: IconConfig,
  fullScreen?: IconConfig,
  resetScreen?: IconConfig,
  dragger?: IconConfig,
  file?: IconConfig,
  fileText?: IconConfig,
  fileCode?: IconConfig,
  fileImage?: IconConfig,
  fileAudio?: IconConfig,
  fileVideo?: IconConfig,
  fileZip?: IconConfig
}

export type IconName = keyof IconsOptions

export type IconsConfig = {
  [K in keyof IconsOptions]-?: Record<string, any> | [Record<string, any>, IconOptions?]
}
export type NormalizedIconsConfig = Record<IconName, IconOptions & { icon: Record<string, any> }>

const iconMap: IconsConfig = {
  loading: [Loader2, { effect: 'spin-in' }],
  clear: XCircle,
  close: X,
  calendar: Calendar,
  clock: Clock,
  exchange: ArrowLeftRight,
  angleUp: ChevronUp,
  angleRight: ChevronRight,
  angleDown: ChevronDown,
  angleLeft: ChevronLeft,
  anglesRight: ChevronsRight,
  anglesLeft: ChevronsLeft,
  retweet: Repeat2,
  refresh: RefreshCw,
  filter: Filter,
  ellipsis: MoreHorizontal,
  upload: Upload,
  uploadCloud: UploadCloud,
  check: Check,
  help: HelpCircle,
  alert: Siren,
  question: MessageCircleQuestion,
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
  delete: Trash2,
  preview: Eye,
  image: Image,
  plus: Plus,
  minus: Minus,
  plusSquare: PlusSquare,
  minusSquare: MinusSquare,
  cipherText: EyeOff,
  plainText: Eye,
  user: UserRound,
  light: Sun,
  dark: Moon,
  signOut: LogOut,
  indent: Indent,
  outdent: Outdent,
  search: Search,
  rotateRight: RotateCw,
  rotateLeft: RotateCcw,
  flipX: FlipHorizontal,
  flipY: FlipVertical,
  zoomIn: ZoomIn,
  zoonOut: ZoomOut,
  fullScreen: Maximize,
  resetScreen: Minimize,
  dragger: GripVertical,
  file: File,
  fileText: FileText,
  fileCode: FileCode,
  fileImage: FileImage,
  fileAudio: FileMusic,
  fileVideo: FileVideo,
  fileZip: FileArchive
}

export const iconNames = Object.freeze(Object.keys(iconMap) as IconName[])

export const globalIcons = computed(() => {
  const icons = {} as NormalizedIconsConfig

  for (const name of iconNames) {
    const [icon, options = {}] = ensureArray(iconMap[name]) as [Record<string, any>, IconOptions?]

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
    const normalizedIcons = {} as IconsConfig
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
