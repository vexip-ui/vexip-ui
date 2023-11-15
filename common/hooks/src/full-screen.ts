import { computed, getCurrentScope, onScopeDispose, ref } from 'vue'

import { isClient, noop } from '@vexip-ui/utils'

import type { ComputedRef, Ref } from 'vue'

export interface UseFullScreenResult {
  target: Ref<HTMLElement | null | undefined>,
  supported: boolean,
  full: ComputedRef<boolean>,
  enter: (force?: boolean) => Promise<boolean>,
  exit: (force?: boolean) => Promise<boolean>,
  toggle: (force?: boolean) => Promise<boolean>
}

type PropertiesMap = [
  'requestFullscreen',
  'exitFullscreen',
  'fullscreenElement',
  'fullscreenEnabled',
  'fullscreenchange',
  'fullscreenerror'
]

const functionsMap = [
  [
    'requestFullscreen',
    'exitFullscreen',
    'fullscreenElement',
    'fullscreenEnabled',
    'fullscreenchange',
    'fullscreenerror'
  ],
  // New WebKit
  [
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitFullscreenElement',
    'webkitFullscreenEnabled',
    'webkitfullscreenchange',
    'webkitfullscreenerror'
  ],
  // Old WebKit
  [
    'webkitRequestFullScreen',
    'webkitCancelFullScreen',
    'webkitCurrentFullScreenElement',
    'webkitCancelFullScreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror'
  ],
  [
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozFullScreenElement',
    'mozFullScreenEnabled',
    'mozfullscreenchange',
    'mozfullscreenerror'
  ],
  [
    'msRequestFullscreen',
    'msExitFullscreen',
    'msFullscreenElement',
    'msFullscreenEnabled',
    'MSFullscreenChange',
    'MSFullscreenError'
  ]
] as PropertiesMap[]

let map!: PropertiesMap

if (isClient) {
  for (const m of functionsMap) {
    if (m[1] in document) {
      map = m
      break
    }
  }
}

const supported = !!map
const notSupportedResult = {
  supported,
  full: computed(() => false),
  enter: noop,
  exit: noop,
  toggle: noop
}

const subscriptions = new Set<Ref<boolean>>()

if (isClient && map) {
  const ELEMENT = map[2]
  const EVENT = map[4]

  document.addEventListener(
    EVENT,
    () => {
      const full = !!document[ELEMENT]
      subscriptions.forEach(s => {
        s.value = full
      })
    },
    false
  )
}

export function useFullScreen(
  target: Ref<HTMLElement | null | undefined> = ref(null)
): UseFullScreenResult {
  if (!isClient || !supported) {
    return { ...notSupportedResult, target }
  }

  const [REQUEST, EXIT, ELEMENT] = map
  const full = ref(false)

  async function enter(force = false) {
    await exit()

    if (target.value) {
      if (force || !document[ELEMENT]) {
        await target.value[REQUEST]()
        full.value = true

        return document[ELEMENT] === target.value
      }
    }

    return false
  }

  async function exit(force = false) {
    if (force || (document[ELEMENT] && document[ELEMENT] === target.value)) {
      await document[EXIT]()
      full.value = false

      return document[ELEMENT] !== target.value
    }

    return false
  }

  async function toggle(force = false) {
    return full.value ? await exit(force) : await enter(force)
  }

  subscriptions.add(full)

  if (getCurrentScope()) {
    onScopeDispose(exit)
  }

  return {
    supported,
    target,
    full: computed(() => full.value),
    enter,
    exit,
    toggle
  }
}
