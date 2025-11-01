import { computed, isRef, reactive, ref, unref } from 'vue'

import { noop } from '@vexip-ui/utils'
import { useListener } from './listener'

import type { MaybeRef, Ref } from 'vue'

export type ModifierState = Readonly<
  Omit<Record<string, boolean>, 'activeKeys'> & {
    activeKeys: Set<string>,
    resetAll: () => void,
  }
>

export interface UseModifierOptions {
  /**
   * 作用的目标元素的 Ref
   */
  target?: Ref<HTMLElement | null | undefined>,
  /**
   * 是否禁用整个 hook 的事件处理
   */
  disabled?: MaybeRef<boolean>,
  /**
   * 配置键名的别名，会与默认别名动态合并
   */
  aliasMap?: Record<string, string>,
  /**
   * 是否在目标元素失去焦点时重置修饰符
   *
   * @default true
   */
  autoReset?: boolean,
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
   * 是否严格匹配目标元素
   */
  strictTarget?: boolean,
  /**
   * 键按下的事件回调函数
   */
  onKeyDown?: (event: KeyboardEvent, modifier: ModifierState) => void,
  /**
   * 键抬起的时间回调函数
   */
  onKeyUp?: (event: KeyboardEvent, modifier: ModifierState) => void,
}

const defaultAliasMap: Record<string, string> = {
  ctrl: 'control',
  command: 'meta',
  cmd: 'meta',
  option: 'alt',
  up: 'arrowup',
  down: 'arrowdown',
  left: 'arrowleft',
  right: 'arrowright',
}

const separatorRE = /[+_-]/
const splitRE = /[+_-]/g

const internalProps = ['activeKeys', 'resetAll']

export function useModifier(options: UseModifierOptions = {}) {
  const {
    autoReset = true,
    capture = false,
    passive = true,
    strictTarget = false,
    onKeyDown = noop,
    onKeyUp = noop,
  } = options

  const target = options.target || ref(null)
  const disabled = isRef(options.disabled) ? options.disabled : ref(options.disabled || false)
  const aliasMap = { ...defaultAliasMap, ...(options.aliasMap || {}) }
  const activeKeys = reactive(new Set<string>())
  const metaDeps = new Set<string>()
  const modifier: Record<string, any> = reactive({ activeKeys, resetAll })

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
    } else if (
      value &&
      typeof event.getModifierState === 'function' &&
      event.getModifierState('Meta')
    ) {
      for (const key of [...activeKeys, ...keys]) {
        metaDeps.add(key)
      }
    }
  }

  function resetAll() {
    Object.keys(modifier).forEach(key => {
      modifier[key] = false
    })

    modifier.activeKeys = activeKeys
    modifier.resetAll = resetAll
  }

  const modifierProxy = new Proxy(modifier, {
    get(target, prop, receiver) {
      if (typeof prop !== 'string' || internalProps.includes(prop)) {
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
  })

  useListener(
    target,
    'keydown',
    (event: KeyboardEvent) => {
      if (strictTarget && event.target !== unref(target)) {
        return
      }

      updateModifier(event, true)
      onKeyDown(event, modifierProxy)
    },
    { capture, passive, disabled },
  )
  useListener(
    target,
    'keyup',
    (event: KeyboardEvent) => {
      if (strictTarget && event.target !== unref(target)) {
        return
      }

      updateModifier(event, false)
      onKeyUp(event, modifierProxy)
    },
    { capture, passive, disabled },
  )

  if (autoReset) {
    useListener(target, 'blur', resetAll, { capture, passive, disabled })
  }

  return { target, modifier: modifierProxy as ModifierState }
}
