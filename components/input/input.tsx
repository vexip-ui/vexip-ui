import { defineComponent, ref, computed, watch, Transition, nextTick } from 'vue'
import { Icon } from '@/components/icon'
import { useFieldStore } from '@/components/form'
import { useHover } from '@vexip-ui/mixins'
import {
  useNameHelper,
  useProps,
  useLocale,
  createSizeProp,
  createStateProp,
  booleanProp,
  sizeProp,
  stateProp,
  classProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { isNull, throttle } from '@vexip-ui/utils'
import { EyeSlashR, EyeR, CircleXmark } from '@vexip-ui/icons'

import type { PropType } from 'vue'

export type InputType = 'text' | 'password' | 'date' | 'datetime' | 'time'
type InputEventType = 'input' | 'change'

const inputTypes = Object.freeze<InputType>(['text', 'password', 'date', 'datetime', 'time'])

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
    value: String,
    placeholder: String,
    autofocus: booleanProp,
    spellcheck: booleanProp,
    autocomplete: booleanProp,
    readonly: booleanProp,
    disabled: booleanProp,
    inputClass: classProp,
    debounce: booleanProp,
    maxLength: Number,
    before: String,
    after: String,
    // 是否显示切换 passwrod 为明文的按钮
    password: booleanProp,
    clearable: booleanProp,
    onFocus: eventProp<(event: FocusEvent) => void>(),
    onBlur: eventProp<(event: FocusEvent) => void>(),
    onInput: eventProp<(value: string) => void>(),
    onChange: eventProp<(value: string) => void>(),
    onEnter: eventProp(),
    onClear: eventProp(),
    onPrefixClick: eventProp<(event: MouseEvent) => void>(),
    onSuffixClick: eventProp<(event: MouseEvent) => void>(),
    onKeyDown: eventProp<(event: KeyboardEvent) => void>(),
    onKeyPress: eventProp<(event: KeyboardEvent) => void>(),
    onKeyUp: eventProp<(event: KeyboardEvent) => void>()
  },
  emits: ['update:value'],
  setup(_props, { slots, emit, expose }) {
    const { state, validateField, clearField, getFieldValue, setFieldValue } =
      useFieldStore<string>()

    const props = useProps('input', _props, {
      size: createSizeProp(),
      state: createStateProp(state),
      type: {
        default: 'text' as InputType,
        validator: (value: InputType) => inputTypes.includes(value)
      },
      prefix: null,
      prefixColor: '',
      suffix: null,
      suffixColor: '',
      formatter: {
        default: null,
        isFunc: true
      },
      value: {
        default: () => getFieldValue(''),
        static: true
      },
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
      clearable: false
    })

    const nh = useNameHelper('input')
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
        nh.b(),
        nh.bs('vars'),
        nh.bm(props.type),
        {
          [nh.bs('wrapper')]: !hasBefore.value && !hasAfter.value,
          [nh.bm('focused')]: focused.value,
          [nh.bm('disabled')]: props.disabled,
          [nh.bm(props.size)]: props.size !== 'default',
          [nh.bm(props.state)]: props.state !== 'default',
          [nh.bm('has-prefix')]: hasPrefix.value,
          [nh.bm('has-suffix')]: hasSuffix.value || props.type === 'password'
        }
      ]
    })
    const wrapperClass = computed(() => {
      return {
        [nh.bs('wrapper')]: true,
        [nh.bs('vars')]: true,
        [nh.bm(`wrapper--${props.size}`)]: props.size !== 'default',
        [nh.bs('wrapper--before-only')]: hasBefore.value && !hasAfter.value,
        [nh.bs('wrapper--after-only')]: !hasBefore.value && hasAfter.value
      }
    })
    const hasPrefix = computed(() => {
      return !!(slots.prefix || props.prefix)
    })
    const hasSuffix = computed(() => {
      return !!(slots.suffix || props.suffix)
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

    // Expose api methods.
    // Need to define some same name methods in 'methods' option to support infer types.
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
        emitEvent(props.onFocus, event)
      }
    }

    function handleBlur(event: FocusEvent) {
      if (focused.value) {
        focused.value = false

        window.setTimeout(() => {
          if (!focused.value) {
            emitEvent(props.onBlur, event)
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

      if (type === 'change') {
        if (lastValue === currentValue.value) return

        lastValue = currentValue.value

        setFieldValue(currentValue.value)
        emitEvent(props.onChange, currentValue.value)
        emit('update:value', currentValue.value)
        validateField()
      } else {
        emitEvent(props.onInput, currentValue.value)
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
      emitEvent(props.onClear)
      nextTick(clearField)
    }

    function handleEnter() {
      emitEvent(props.onEnter)
    }

    function handlePrefixClick(event: MouseEvent) {
      emitEvent(props.onPrefixClick, event)
    }

    function handleSuffixClick(event: MouseEvent) {
      emitEvent(props.onSuffixClick, event)
    }

    function handleKeyDown(event: KeyboardEvent) {
      emitEvent(props.onKeyDown, event)
    }

    function handleKeyPress(event: KeyboardEvent) {
      emitEvent(props.onKeyPress, event)
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        handleEnter()
      }

      emitEvent(props.onKeyUp, event)
    }

    function createAffixElement(type: 'prefix' | 'suffix') {
      const isPrefix = type === 'prefix'
      const affixSlot = isPrefix ? slots.prefix : slots.suffix

      return (
        <div
          key={type}
          class={nh.bem('icon', type)}
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
          <div key={'clear'} class={nh.be('clear')} onClick={handleClear}>
            <Icon icon={CircleXmark}></Icon>
          </div>
        )
      }

      if (hasSuffix.value) return createAffixElement('suffix')

      if (props.type === 'password' && props.password) {
        return (
          <div key={'password'} class={nh.bem('icon', 'password')} onClick={toggleShowPassword}>
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
            class={[nh.be('control'), props.inputClass]}
            type={inputType.value}
            value={formattedValue.value}
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
            <div class={nh.be('count')} style={countStyle.value}>
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
              <div class={nh.be('before')}>{slots.before ? slots.before() : props.before}</div>
            )}
            {createInputElement()}
            {hasAfter.value && (
              <div class={nh.be('after')}>{slots.after ? slots.after() : props.after}</div>
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
