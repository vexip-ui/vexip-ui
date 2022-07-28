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
import { EyeSlashR, EyeR, CircleXmark, Spinner } from '@vexip-ui/icons'

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
    plainPassword: booleanProp,
    clearable: booleanProp,
    loading: booleanProp,
    loadingIcon: Object,
    loadingLock: booleanProp,
    loadingSpin: booleanProp,
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
    const { idFor, state, disabled, validateField, clearField, getFieldValue, setFieldValue } =
      useFieldStore<string>(() => inputControl.value?.focus())

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
      disabled: () => disabled.value,
      inputClass: '',
      debounce: false,
      maxLength: 0,
      before: '',
      after: '',
      plainPassword: false,
      clearable: false,
      loading: false,
      loadingIcon: Spinner,
      loadingLock: false,
      loadingSpin: false
    })

    const nh = useNameHelper('input')
    const focused = ref(false)
    const currentValue = ref(props.value)
    const showPassword = ref(false)
    const currentLength = ref(props.value ? props.value.length : 0)
    const inputControl = ref<HTMLElement | null>(null)
    const beforeHover = ref(false)
    const afterHover = ref(false)

    const { wrapper: control, isHover } = useHover()
    const locale = useLocale('input')

    // eslint-disable-next-line vue/no-setup-props-destructure
    let lastValue = props.value

    const hasBefore = computed(() => {
      return !!(slots.before || slots.beforeAction || slots['before-action'] || props.before)
    })
    const hasAfter = computed(() => {
      return !!(slots.after || slots.afterAction || slots['after-action'] || props.after)
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
          // [nh.bm('has-prefix')]: hasPrefix.value,
          // [nh.bm('has-suffix')]: hasSuffix.value || props.type === 'password',
          [nh.bm('before')]: slots.beforeAction || slots['before-action'],
          [nh.bm('after')]: slots.afterAction || slots['after-action'],
          [nh.bm('loading')]: props.loading
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
    const hasPrefix = computed(() => !!(slots.prefix || props.prefix))
    const hasSuffix = computed(() => !!(slots.suffix || props.suffix))
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
    const passwordIcon = computed(() => (showPassword.value ? EyeR : EyeSlashR))
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
    const readonly = computed(() => (props.loading && props.loadingLock) || props.readonly)
    const showClear = computed(() => {
      return !props.disabled && props.clearable && hasValue.value && isHover.value
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

    function renderPrefix() {
      return (
        <div
          class={[nh.be('icon'), nh.be('prefix')]}
          style={{ color: props.prefixColor }}
          onClick={handlePrefixClick}
        >
          {slots.prefix ? slots.prefix() : <Icon icon={props.prefix}></Icon>}
        </div>
      )
    }

    function renderSuffix() {
      if (hasSuffix.value) {
        return (
          <div
            key={'suffix'}
            class={[nh.be('icon'), nh.be('suffix')]}
            style={{
              color: props.suffixColor,
              opacity: showClear.value || props.loading ? '0%' : ''
            }}
            onClick={handleSuffixClick}
          >
            {slots.suffix ? slots.suffix() : <Icon icon={props.suffix}></Icon>}
          </div>
        )
      }

      if (props.type === 'password' && props.plainPassword) {
        return (
          <div
            key={'password'}
            class={[nh.be('icon'), nh.be('password')]}
            style={{
              color: props.suffixColor,
              opacity: showClear.value || props.loading ? '0%' : ''
            }}
            onClick={toggleShowPassword}
          >
            <Icon icon={passwordIcon.value}></Icon>
          </div>
        )
      }

      if (props.clearable || props.loading) {
        return <div key={'placeholder'} class={[nh.be('icon'), nh.be('placeholder')]}></div>
      }

      return null
    }

    function renderSuffixAction() {
      if (showClear.value) {
        return (
          <div key={'clear'} class={[nh.be('icon'), nh.be('clear')]} onClick={handleClear}>
            <Icon icon={CircleXmark}></Icon>
          </div>
        )
      }

      if (props.loading) {
        return (
          <div key={'loading'} class={[nh.be('icon'), nh.be('loading')]}>
            <Icon
              spin={props.loadingSpin}
              pulse={!props.loadingSpin}
              icon={props.loadingIcon}
            ></Icon>
          </div>
        )
      }

      return null
    }

    const handleInput = throttle(handleChange)

    function renderControl() {
      return (
        <div id={idFor.value} ref={control} class={className.value}>
          {hasPrefix.value && renderPrefix()}
          <input
            ref={inputControl}
            class={[nh.be('control'), props.inputClass]}
            type={inputType.value}
            value={formattedValue.value}
            autofocus={props.autofocus}
            autocomplete={props.autocomplete ? 'on' : 'off'}
            spellcheck={props.spellcheck}
            disabled={props.disabled}
            readonly={readonly.value}
            placeholder={props.placeholder ?? locale.value.placeholder}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onInput={handleInput}
            onChange={handleChange}
            onKeypress={handleKeyPress}
            onKeydown={handleKeyDown}
            onKeyup={handleKeyUp}
          />
          {renderSuffix()}
          <Transition name={nh.ns('fade')} appear>
            {renderSuffixAction()}
          </Transition>
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

    function renderAside(type: 'before' | 'after') {
      const buttonSlot = slots[`${type}Action`] || slots[`${type}-action`]

      if (buttonSlot) {
        return (
          <div
            class={[nh.be(type), nh.bem(type, 'action')]}
            onMouseenter={() => ((type === 'before' ? beforeHover : afterHover).value = true)}
            onMouseleave={() => ((type === 'before' ? beforeHover : afterHover).value = false)}
          >
            {buttonSlot()}
          </div>
        )
      }

      return <div class={nh.be(type)}>{slots[type] ? slots[type]!() : props[type]}</div>
    }

    return () => {
      if (hasBefore.value || hasAfter.value) {
        return (
          <div class={wrapperClass.value}>
            {hasBefore.value && renderAside('before')}
            {renderControl()}
            {hasAfter.value && renderAside('after')}
          </div>
        )
      }

      return renderControl()
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
