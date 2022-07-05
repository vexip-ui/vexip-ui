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
  /**
   * 作用的目标元素的 Ref
   */
  target?: Ref<HTMLElement | null>,
  /**
   * 配置键名的别名，会与默认别名动态合并
   */
  aliasMap?: Record<string, string>,
  /**
   * 事件的 capture 选项
   *
   * @default false
   */
  capture?: boolean,
  /**
   * 事件的 passive 选项
   *
   * @default true
   */
  passive?: boolean,
  /**
   * 键按下的事件回调函数
   */
  onKeyDown?: (event: KeyboardEvent, modifier: ModifierState) => void,
  /**
   * 键抬起的时间回调函数
   */
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

    for (const key of keys) {
      activeKeys[value ? 'add' : 'delete'](key)
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
          modifier[prop] = ref(activeKeys.has(prop))
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

  useListener(
    target,
    'keydown',
    (event: KeyboardEvent) => {
      updateModifier(event, true)
      onKeyDown(event, modifierProxy)
    },
    { capture, passive }
  )
  useListener(
    target,
    'keyup',
    (event: KeyboardEvent) => {
      updateModifier(event, false)
      onKeyUp(event, modifierProxy)
    },
    { capture, passive }
  )

  return { target, modifier: modifierProxy as ModifierState }
}
