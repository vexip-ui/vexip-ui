import { computed, getCurrentScope, isRef, onScopeDispose, ref, watch } from 'vue'

import { isClient, noop } from '@vexip-ui/utils'
import { unrefElement } from './shared/utils'

import type { ComputedRef, MaybeRef, Ref } from 'vue'
import type { MaybeInstance } from './shared/types'

export interface UseFullScreenResult {
  target: Ref<MaybeInstance>,
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

const states = new Set<Ref<boolean>>()
const subscriptions = new WeakMap<Element, Ref<boolean>>()

if (isClient && map) {
  // const ELEMENT = map[2]
  const EVENT = map[4]

  document.addEventListener(
    EVENT,
    event => {
      states.forEach(state => {
        state.value = false
      })

      if (event.target) {
        const full = subscriptions.get(event.target as Element)

        if (full) {
          full.value = true
        }
      }
    },
    false
  )
}

export function useFullScreen(target: MaybeRef<MaybeInstance> = ref(null)): UseFullScreenResult {
  const targetRef = computed({
    get: () => unrefElement(target),
    set: el => {
      if (isRef(target)) {
        target.value = el
      }
    }
  })

  if (!isClient || !supported) {
    return { ...notSupportedResult, target: targetRef }
  }

  const [REQUEST, EXIT, ELEMENT] = map
  const full = ref(false)

  watch(
    () => unrefElement(target),
    (el, old) => {
      old && subscriptions.delete(old)
      el && subscriptions.set(el, full)
    },
    { immediate: true, flush: 'post' }
  )

  states.add(full)

  if (getCurrentScope()) {
    onScopeDispose(exit)
  }

  async function enter(force = false) {
    await exit()

    const el = unrefElement(target)

    if (el) {
      if (force || !document[ELEMENT]) {
        await el[REQUEST]()
        full.value = true

        return document[ELEMENT] === el
      }
    }

    return false
  }

  async function exit(force = false) {
    const el = unrefElement(target)

    if (force || (document[ELEMENT] && document[ELEMENT] === el)) {
      await document[EXIT]()
      full.value = false

      return document[ELEMENT] !== el
    }

    return false
  }

  async function toggle(force = false) {
    return full.value ? await exit(force) : await enter(force)
  }

  return {
    supported,
    target: targetRef,
    full: computed(() => full.value),
    enter,
    exit,
    toggle
  }
}
