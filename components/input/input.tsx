import { Icon } from '@/components/icon'
import { useFieldStore } from '@/components/form'

import { Transition, computed, defineComponent, nextTick, ref, renderSlot, toRef, watch } from 'vue'

import { useHover } from '@vexip-ui/hooks'
import {
  createIconProp,
  createSizeProp,
  createStateProp,
  emitEvent,
  useIcons,
  useLocale,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { debounce, isNull, noop, throttle, toNumber } from '@vexip-ui/utils'
import { inputProps } from './props'

import type { ChangeEvent, InputType } from './symbol'

type InputEventType = 'input' | 'change'

const inputTypes = Object.freeze<InputType[]>(['text', 'password', 'date', 'datetime', 'time'])

function toNotNullString(value: any) {
  return isNull(value) ? '' : String(value)
}

export default defineComponent({
  name: 'Input',
  props: inputProps,
  emits: ['update:value'],
  setup(_props, { slots, emit, expose }) {
    const {
      idFor,
      labelId,
      state,
      disabled,
      loading,
      size,
      validateField,
      clearField,
      getFieldValue,
      setFieldValue
    } = useFieldStore<string | number>(() => inputControl.value?.focus())

    const props = useProps('input', _props, {
      size: createSizeProp(size),
      state: createStateProp(state),
      locale: null,
      type: {
        default: 'text',
        validator: value => inputTypes.includes(value)
      },
      prefix: createIconProp(),
      prefixColor: '',
      suffix: createIconProp(),
      suffixColor: '',
      formatter: {
        default: null,
        isFunc: true
      },
      value: {
        default: () => getFieldValue(),
        static: true
      },
      placeholder: null,
      autofocus: false,
      spellcheck: false,
      autocomplete: false,
      readonly: false,
      disabled: () => disabled.value,
      controlClass: null,
      debounce: false,
      delay: null,
      maxLength: 0,
      before: '',
      after: '',
      plainPassword: false,
      clearable: false,
      loading: () => loading.value,
      loadingIcon: createIconProp(),
      loadingLock: false,
      loadingEffect: null,
      transparent: false,
      sync: false,
      controlAttrs: null,
      name: {
        default: '',
        static: true
      }
    })

    const initValue = toNotNullString(props.value)

    const nh = useNameHelper('input')
    const icons = useIcons()
    const focused = ref(false)
    const currentValue = ref(initValue)
    const showPassword = ref(false)
    const currentLength = ref(initValue.length)
    const beforeHover = ref(false)
    const afterHover = ref(false)
    const composing = ref(false)

    const inputControl = ref<HTMLInputElement>()

    const { wrapper: control, isHover } = useHover()
    const locale = useLocale('input', toRef(props, 'locale'))

    let lastValue = props.value

    const hasBefore = computed(() => {
      return !!(slots.before || slots.beforeAction || slots['before-action'] || props.before)
    })
    const hasAfter = computed(() => {
      return !!(slots.after || slots.afterAction || slots['after-action'] || props.after)
    })
    const basisClass = computed(() => {
      return {
        [nh.bs('wrapper')]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm(props.size)]: props.size !== 'default'
      }
    })
    const readonly = computed(() => (props.loading && props.loadingLock) || props.readonly)
    const className = computed(() => {
      return [
        nh.b(),
        nh.bm(props.type),
        !hasBefore.value && !hasAfter.value && basisClass.value,
        {
          [nh.bm('focused')]: focused.value,
          [nh.bm('disabled')]: props.disabled,
          [nh.bm('readonly')]: readonly.value,
          [nh.bm('loading')]: props.loading,
          [nh.bm(props.state)]: props.state !== 'default',
          [nh.bm('before')]: slots.beforeAction || slots['before-action'],
          [nh.bm('after')]: slots.afterAction || slots['after-action'],
          [nh.bm('transparent')]: props.transparent,
          [nh.bm('plain-password')]: props.plainPassword
        }
      ]
    })
    const wrapperClass = computed(() => {
      return {
        ...basisClass.value,
        [nh.bm(`wrapper--${props.size}`)]: props.size !== 'default',
        [nh.bs('wrapper--before-only')]: hasBefore.value && !hasAfter.value,
        [nh.bs('wrapper--after-only')]: !hasBefore.value && hasAfter.value,
        [nh.bm('transparent')]: props.transparent
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
        ? toNotNullString(props.formatter(currentValue.value))
        : currentValue.value
    })
    const passwordIcon = computed(() =>
      showPassword.value ? icons.value.plainText : icons.value.cipherText
    )
    const hasValue = computed(() => {
      return !(isNull(currentValue.value) || currentValue.value === '')
    })
    const showClear = computed(() => {
      return (
        !props.disabled && !readonly.value && props.clearable && hasValue.value && isHover.value
      )
    })

    watch(
      () => props.value,
      value => {
        currentValue.value = toNotNullString(value)
        lastValue = currentValue.value
        limitValueLength()
      }
    )
    watch(
      [formattedValue, inputControl],
      () => {
        if (inputControl.value) {
          inputControl.value.value = formattedValue.value
        }
      },
      { immediate: true, flush: 'post' }
    )

    // Expose api methods.
    // Need to define some same name methods in 'methods' option to support infer types.
    expose({
      focused,
      currentValue,
      showPassword,
      currentLength,
      composing,
      input: inputControl,
      copyValue,
      focus: (options?: FocusOptions) => {
        inputControl.value?.focus(options)
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

        setTimeout(() => {
          if (!focused.value) {
            emitEvent(props.onBlur, event)
            emitChangeEvent('change')
          }
        }, 120)
      }
    }

    function handleChange(event: Event) {
      const type = event.type as InputEventType

      if (composing.value) {
        if (type === 'input') return

        composing.value = false
      }

      currentValue.value = (event.target as HTMLInputElement).value
      limitValueLength()

      const value = currentValue.value

      setValue(value, type)
    }

    function setValue(value: string, type: InputEventType, sync = props.sync) {
      currentValue.value = value
      emitChangeEvent(type, sync)
    }

    function emitChangeEvent(type: InputEventType, sync = props.sync) {
      type = type === 'input' ? 'input' : 'change'

      const value =
        typeof props.value === 'number' ? parseFloat(currentValue.value) : currentValue.value

      if (type === 'change') {
        if (lastValue === value) return

        lastValue = value

        if (!sync) {
          emit('update:value', value)
          setFieldValue(value)
        }

        emitEvent(props.onChange as ChangeEvent, value)

        if (!sync) {
          validateField()
        }
      } else {
        if (sync) {
          emit('update:value', value)
          setFieldValue(value)
        }

        emitEvent(props.onInput as ChangeEvent, value)

        if (sync) {
          validateField()
        }
      }
    }

    function limitValueLength() {
      let value = currentValue.value

      if (isNull(value)) {
        currentLength.value = 0

        return
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
      nextTick(() => {
        inputControl.value?.focus()
      })
    }

    function handleClear(event: MouseEvent) {
      if (props.disabled || readonly.value) return

      event.stopPropagation()
      setValue('', 'change', false)
      emitEvent(props.onClear)
      nextTick(clearField)
      currentLength.value = 0
      inputControl.value?.focus()
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

    function handleCompositionStart(event: CompositionEvent) {
      composing.value = true
      emitEvent(props.onCompositionStart, event)
    }

    function handleCompositionEnd(event: CompositionEvent) {
      if (composing.value) {
        composing.value = false

        if (inputControl.value) {
          inputControl.value.dispatchEvent(new Event('input'))
        }
      }

      emitEvent(props.onCompositionStart, event)
    }

    function copyValue() {
      const input = document.createElement('input')

      input.style.height = '0'
      input.setAttribute('readonly', 'readonly')
      input.value = currentValue.value
      document.body.appendChild(input)
      input.select()

      const isSuccess = document.execCommand('copy')

      document.body.removeChild(input)

      return isSuccess
    }

    function preventDefault(event: Event) {
      event.preventDefault()
    }

    const delay = toNumber(props.delay)
    const handleInput = props.debounce
      ? debounce(handleChange, delay || 100)
      : throttle(handleChange, delay || 16)

    function renderPrefix() {
      return (
        <div
          class={[nh.be('icon'), nh.be('prefix')]}
          style={{ color: props.prefixColor }}
          onClick={handlePrefixClick}
        >
          {renderSlot(slots, 'prefix', undefined, () => [<Icon icon={props.prefix}></Icon>])}
        </div>
      )
    }

    function renderCustomSuffix() {
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
            {renderSlot(slots, 'suffix', undefined, () => [<Icon icon={props.suffix}></Icon>])}
          </div>
        )
      }

      if (props.clearable || props.loading) {
        return (
          <div key={'placeholder'} class={[nh.be('icon'), nh.bem('icon', 'placeholder')]}></div>
        )
      }

      return null
    }

    function renderSuffixAction() {
      if (showClear.value) {
        return (
          <button
            key={'clear'}
            class={[nh.be('icon'), nh.be('clear')]}
            type={'button'}
            tabindex={-1}
            aria-label={locale.value.ariaLabel.clear}
            onClick={handleClear}
          >
            <Icon {...icons.value.clear} label={'clear'}></Icon>
          </button>
        )
      }

      if (props.loading) {
        return (
          <div key={'loading'} class={[nh.be('icon'), nh.be('loading')]}>
            <Icon
              {...icons.value.loading}
              effect={props.loadingEffect || icons.value.loading.effect}
              icon={props.loadingIcon || icons.value.loading.icon}
              label={'loading'}
            ></Icon>
          </div>
        )
      }

      return null
    }

    function renderSuffix() {
      return (
        <div class={nh.be('suffix-wrapper')}>
          {renderCustomSuffix()}
          <Transition name={nh.ns('fade')} appear>
            {renderSuffixAction()}
          </Transition>
        </div>
      )
    }

    function renderCount() {
      return (
        <div class={nh.be('count')}>
          {renderSlot(slots, 'count', { value: currentValue.value }, () => [
            props.maxLength === Infinity
              ? currentLength.value
              : `${currentLength.value}/${props.maxLength}`
          ])}
        </div>
      )
    }

    function renderPlainPassword() {
      if (props.type === 'password' && props.plainPassword) {
        return (
          <div
            key={'password'}
            class={[nh.be('icon'), nh.be('password')]}
            style={{
              color: props.suffixColor
            }}
            onClick={toggleShowPassword}
          >
            {renderSlot(slots, 'password', { plain: showPassword.value }, () => [
              <Icon {...passwordIcon.value}></Icon>
            ])}
          </div>
        )
      }

      return null
    }

    function renderControl() {
      return (
        <div
          id={idFor.value}
          ref={control}
          class={className.value}
          onClick={() => inputControl.value?.focus()}
        >
          {hasPrefix.value && renderPrefix()}
          <input
            {...props.controlAttrs}
            ref={inputControl}
            class={[nh.be('control'), props.controlAttrs?.class, props.controlClass]}
            type={inputType.value}
            autofocus={props.autofocus}
            autocomplete={props.autocomplete ? 'on' : 'off'}
            spellcheck={props.spellcheck}
            disabled={props.disabled}
            readonly={readonly.value || undefined}
            placeholder={props.placeholder ?? locale.value.placeholder}
            maxlength={props.maxLength > 0 ? props.maxLength : undefined}
            name={props.name || props.controlAttrs?.name}
            aria-labelledby={labelId.value}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onInput={handleInput}
            onChange={handleChange}
            onKeypress={handleKeyPress}
            onKeydown={handleKeyDown}
            onKeyup={handleKeyUp}
            onSubmit={preventDefault}
            onCompositionstart={handleCompositionStart}
            onCompositionend={handleCompositionEnd}
          />
          {renderSuffix()}
          {props.maxLength > 0 ? renderCount() : null}
          {renderPlainPassword()}
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
    focus: noop as (options?: FocusOptions) => void,
    blur: noop as () => void
  }
})
