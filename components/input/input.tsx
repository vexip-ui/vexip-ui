import { defineComponent, ref, computed, watch, inject, Transition } from 'vue'
import { Icon } from '@/components/icon'
import { VALIDATE_FIELD, CLEAR_FIELD } from '@/components/form-item'
import { useHover } from '@vexip-ui/mixins'
import { useProps, useLocale, createSizeProp, createStateProp, booleanProp, sizeProp, stateProp } from '@vexip-ui/config'
import { isNull, noop, throttle } from '@vexip-ui/utils'
import { EyeSlashR, EyeR, CircleXmark } from '@vexip-ui/icons'

import type { PropType } from 'vue'

export type InputType = 'text' | 'password' | 'date' | 'datetime' | 'time'

type ClassType = string | Record<string, boolean>
type InputEventType = 'input' | 'change'

const inputTypes = Object.freeze(['text', 'password', 'date', 'datetime', 'time'] as const)

export default defineComponent({
  name: 'Input',
  components: {
    Icon
  },
  props: {
    size: sizeProp,
    state: stateProp,
    type: String as PropType<InputType>,
    prefix: Object,
    prefixColor: String,
    suffix: Object,
    suffixColor: String,
    formatter: Function as PropType<(value: string) => string>,
    accessor: Function as PropType<(value: string) => any>,
    value: String,
    placeholder: String,
    autofocus: booleanProp,
    spellcheck: booleanProp,
    autocomplete: booleanProp,
    readonly: booleanProp,
    disabled: booleanProp,
    inputClass: [String, Object] as PropType<ClassType>,
    debounce: booleanProp,
    maxLength: Number,
    before: String,
    after: String,
    // 是否显示切换 passwrod 为明文的按钮
    password: booleanProp,
    disableValidate: booleanProp,
    clearable: booleanProp
  },
  emits: [
    'focus',
    'blur',
    'input',
    'change',
    'enter',
    'clear',
    'prefix-click',
    'suffix-click',
    'key-down',
    'key-press',
    'key-up',
    'update:value'
  ],
  setup(_props, { slots, emit, expose }) {
    const props = useProps('input', _props, {
      size: createSizeProp(),
      state: createStateProp(),
      type: {
        default: 'text' as InputType,
        validator: (value: InputType) => inputTypes.includes(value)
      },
      prefix: null,
      prefixColor: '',
      suffix: null,
      suffixColor: '',
      formatter: null,
      accessor: null,
      value: '',
      placeholder: null,
      autofocus: false,
      spellcheck: false,
      autocomplete: false,
      readonly: false,
      disabled: false,
      inputClass: '',
      debounce: false,
      maxLength: 0,
      before: '',
      after: '',
      password: false,
      disableValidate: false,
      clearable: false
    })

    const validateField = inject(VALIDATE_FIELD, noop)
    const clearField = inject(CLEAR_FIELD, noop)

    const prefix = 'vxp-input'
    const focused = ref(false)
    const currentValue = ref(props.value)
    const showPassword = ref(false)
    const currentLength = ref(props.value ? props.value.length : 0)
    const inputControl = ref<HTMLElement | null>(null)

    const { wrapper, isHover } = useHover()
    const locale = useLocale('input')

    // eslint-disable-next-line vue/no-setup-props-destructure
    let lastValue = props.value

    const hasBefore = computed(() => {
      return !!(slots.before || props.before)
    })
    const hasAfter = computed(() => {
      return !!(slots.after || props.after)
    })
    const className = computed(() => {
      return [
        prefix,
        `${prefix}-vars`,
        `${prefix}--${props.type}`,
        {
          [`${prefix}-wrapper`]: !hasBefore.value && !hasAfter.value,
          [`${prefix}--focused`]: focused.value,
          [`${prefix}--disabled`]: props.disabled,
          [`${prefix}--${props.size}`]: props.size !== 'default',
          [`${prefix}--${props.state}`]: props.state !== 'default'
        }
      ]
    })
    const wrapperClass = computed(() => {
      return {
        [`${prefix}-wrapper`]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}-wrapper--${props.size}`]: props.size !== 'default',
        [`${prefix}-wrapper--before-only`]: hasBefore.value && !hasAfter.value,
        [`${prefix}-wrapper--after-only`]: !hasBefore.value && hasAfter.value
      }
    })
    const hasPrefix = computed(() => {
      return !!(slots.prefix || props.prefix)
    })
    const hasSuffix = computed(() => {
      return !!(slots.suffix || props.suffix)
    })
    const inputStyle = computed(() => {
      return {
        paddingLeft: hasPrefix.value ? '2em' : '',
        paddingRight: hasSuffix.value || props.type === 'password' ? '2em' : ''
      }
    })
    const inputType = computed(() => {
      const type = props.type

      if (type === 'password') {
        return showPassword.value ? 'text' : 'password'
      }

      if (type === 'datetime') {
        return 'datetime-local'
      }

      return type
    })
    const formattedValue = computed(() => {
      return typeof props.formatter === 'function'
        ? props.formatter(currentValue.value)
        : currentValue.value
    })
    const passwordIcon = computed(() => {
      return showPassword.value ? EyeSlashR : EyeR
    })
    const countStyle = computed(() => {
      let fix = 0

      if (hasSuffix.value) {
        fix += 2
      }

      if (fix) {
        return { right: `calc(${fix}em + 7px)` }
      }

      return {}
    })
    const hasValue = computed(() => {
      return !(isNull(currentValue.value) || currentValue.value === '')
    })

    watch(
      () => props.value,
      value => {
        currentValue.value = value
        lastValue = value
      }
    )

    // expose api methods
    // need to define some same name methods in 'methods' option to support infer types
    // cannot use expose option in component define
    expose({
      focus: () => {
        inputControl.value?.focus()
      },
      blur: () => {
        inputControl.value?.blur()
      }
    })

    function handleFocus(event: FocusEvent) {
      if (!focused.value) {
        focused.value = true
        emit('focus', event)
      }
    }

    function handleBlur(event: FocusEvent) {
      if (focused.value) {
        focused.value = false

        window.setTimeout(() => {
          if (!focused.value) {
            emit('blur', event)
            emitChangeEvent('change')
          }
        }, 120)
      }
    }

    function handleChange(event: Event) {
      const type = event.type as InputEventType

      currentValue.value = (event.target as HTMLInputElement).value
      limitValueLength()

      const value = currentValue.value

      setValue(value, type)
    }

    function setValue(value: string, type: InputEventType) {
      currentValue.value = value
      emitChangeEvent(type)
    }

    function emitChangeEvent(type: InputEventType) {
      type = type === 'input' ? 'input' : 'change'

      let value = currentValue.value

      if (typeof props.accessor === 'function') {
        value = props.accessor(value)
      }

      if (type === 'change') {
        if (lastValue === currentValue.value) return

        lastValue = currentValue.value

        emit('change', value, currentValue.value)
        emit('update:value', currentValue.value)

        if (!props.disableValidate) {
          validateField()
        }
      } else {
        emit('input', value, currentValue.value)
      }
    }

    function limitValueLength() {
      let value = currentValue.value

      if (isNull(value)) {
        currentLength.value = 0

        return
      }

      if (typeof value !== 'string') {
        value = String(value)
      }

      const maxLength = props.maxLength

      if (maxLength && value.length > maxLength) {
        value = value.slice(0, maxLength)
      }

      currentLength.value = value.length
      currentValue.value = value
    }

    function toggleShowPassword() {
      if (props.disabled) {
        return
      }

      showPassword.value = !showPassword.value
      inputControl.value?.focus()
    }

    function handleClear(event: MouseEvent) {
      event.stopPropagation()
      setValue('', 'change')
      emit('clear')
      clearField()
    }

    function handleEnter(event: KeyboardEvent) {
      emit('enter', event)
    }

    function handlePrefixClick(event: MouseEvent) {
      emit('prefix-click', event)
    }

    function handleSuffixClick(event: MouseEvent) {
      emit('suffix-click', event)
    }

    function handleKeyDown(event: KeyboardEvent) {
      emit('key-down', event)
    }

    function handleKeyPress(event: KeyboardEvent) {
      emit('key-press', event)
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        handleEnter(event)
      }

      emit('key-up', event)
    }

    function createAffixElement(type: 'prefix' | 'suffix') {
      const isPrefix = type === 'prefix'
      const affixSlot = isPrefix ? slots.prefix : slots.suffix

      return (
        <div
          key={type}
          class={`${prefix}__icon--${type}`}
          style={isPrefix ? { color: props.prefixColor } : { color: props.suffixColor }}
          onClick={isPrefix ? handlePrefixClick : handleSuffixClick}
        >
          {affixSlot ? affixSlot() : <Icon icon={isPrefix ? props.prefix : props.suffix}></Icon>}
        </div>
      )
    }

    function createSuffixElement() {
      if (!props.disabled && props.clearable && hasValue.value && isHover.value) {
        return (
          <div key={'clear'} class={`${prefix}__clear`} onClick={handleClear}>
            <Icon icon={CircleXmark}></Icon>
          </div>
        )
      }

      if (hasSuffix.value) return createAffixElement('suffix')

      if (props.type === 'password' && props.password) {
        return (
          <div key={'password'} class={`${prefix}__icon--password`} onClick={toggleShowPassword}>
            <Icon icon={passwordIcon.value}></Icon>
          </div>
        )
      }

      return null
    }

    const handleInput = throttle(handleChange)

    function createInputElement() {
      return (
        <div ref={wrapper} class={className.value}>
          <input
            ref={inputControl}
            class={[`${prefix}__control`, props.inputClass]}
            type={inputType.value}
            value={formattedValue.value}
            style={inputStyle.value}
            autofocus={props.autofocus}
            autocomplete={props.autocomplete ? 'on' : 'off'}
            spellcheck={props.spellcheck}
            disabled={props.disabled}
            readonly={props.readonly}
            placeholder={props.placeholder ?? locale.value.placeholder}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onInput={handleInput}
            onChange={handleChange}
            onKeypress={handleKeyPress}
            onKeydown={handleKeyDown}
            onKeyup={handleKeyUp}
          />
          {hasPrefix.value && createAffixElement('prefix')}
          <Transition name={'vxp-fade'}>{createSuffixElement()}</Transition>
          {props.maxLength
            ? (
            <div class={`${prefix}__count`} style={countStyle.value}>
              {`${currentLength.value}/${props.maxLength}`}
            </div>
              )
            : null}
        </div>
      )
    }

    return () => {
      if (hasBefore.value || hasAfter.value) {
        return (
          <div class={wrapperClass.value}>
            {hasBefore.value && (
              <div class={`${prefix}__before`}>{slots.before ? slots.before() : props.before}</div>
            )}
            {createInputElement()}
            {hasAfter.value && (
              <div class={`${prefix}__after`}>{slots.after ? slots.after() : props.after}</div>
            )}
          </div>
        )
      }

      return createInputElement()
    }
  },
  methods: {
    focus() {
      // define type only
    },
    blur() {
      // define type only
    }
  }
})
