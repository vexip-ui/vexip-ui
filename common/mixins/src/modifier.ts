import { ref, unref, reactive, computed } from 'vue'
import { noop } from '@vexip-ui/utils'
import { useListener } from './listener'

import type { Ref } from 'vue'

export type ModifierState = Readonly<
  Omit<Record<string, boolean>, 'activeKeys'> & {
    activeKeys: Set<string>
  }
>

export interface UseModifierOptions {
  target?: Ref<HTMLElement | null>,
  aliasMap?: Record<string, string>,
  capture?: boolean,
  passive?: boolean,
  onKeyDown?: (event: KeyboardEvent, modifier: ModifierState) => void,
  onKeyUp?: (event: KeyboardEvent, modifier: ModifierState) => void
}

const defaultAliasMap: Record<string, string> = {
  ctrl: 'control',
  command: 'meta',
  cmd: 'meta',
  option: 'alt',
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright'
}

const separatorRE = /[+_-]/
const splitRE = /[+_-]/g

export function useModifier(options: UseModifierOptions = {}) {
  const { capture = false, passive = true, onKeyDown = noop, onKeyUp = noop } = options

  const target = options.target || ref(null)
  const aliasMap = { ...defaultAliasMap, ...(options.aliasMap || {}) }
  const activeKeys = reactive(new Set<string>())
  const metaDeps = new Set<string>()
  const modifier: Record<string, any> = reactive({ activeKeys })

  function setModifier(key: string, value: boolean) {
    if (key in modifier) {
      modifier[key] = value
    }
  }

  function updateModifier(event: KeyboardEvent, value: boolean) {
    const key = event.key?.toLocaleLowerCase()
    const code = event.code?.toLocaleLowerCase()
    const keys = [code, key].filter(Boolean)

    if (code) {
      activeKeys[value ? 'add' : 'delete'](code)
    }

    for (const key of keys) {
      setModifier(key, value)
    }

    if (!value && key === 'meta') {
      for (const key of metaDeps) {
        activeKeys.delete(key)
        setModifier(key, false)
      }

      metaDeps.clear()
    } else if (value && typeof event.getModifierState === 'function' && event.getModifierState('Meta')) {
      for (const key of [...activeKeys, ...keys]) {
        metaDeps.add(key)
      }
    }
  }

  useListener(
    target,
    'keydown',
    (event: KeyboardEvent) => {
      updateModifier(event, true)
      onKeyDown(event, modifier)
    },
    { capture, passive }
  )
  useListener(
    target,
    'keyup',
    (event: KeyboardEvent) => {
      updateModifier(event, false)
      onKeyUp(event, modifier)
    },
    { capture, passive }
  )

  const modifierProxy = new Proxy(modifier, {
    get(target, prop, receiver) {
      if (typeof prop !== 'string') {
        return Reflect.get(target, prop, receiver)
      }

      prop = prop.toLocaleLowerCase()

      if (prop in aliasMap) {
        prop = aliasMap[prop]
      }

      if (!(prop in modifier)) {
        if (separatorRE.test(prop)) {
          const keys = prop.split(splitRE).map(key => key.trim())

          modifier[prop] = computed(() => keys.every(key => unref(modifierProxy[key])))
        } else {
          modifier[prop] = ref(false)
        }
      }

      return unref(Reflect.get(target, prop, receiver))
    },
    set() {
      return true
    },
    deleteProperty() {
      return true
    }
  })

  return { target, modifier: modifierProxy as ModifierState }
}
