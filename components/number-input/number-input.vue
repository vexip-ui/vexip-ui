<template>
  <div :id="idFor" ref="wrapper" :class="className">
    <div
      v-if="hasPrefix"
      :class="[nh.be('icon'), nh.be('prefix')]"
      :style="{ color: props.prefixColor }"
      @click="handlePrefixClick"
    >
      <slot name="prefix">
        <Icon :icon="props.prefix"></Icon>
      </slot>
    </div>
    <input
      ref="input"
      type="text"
      :class="[nh.be('control'), inputClass]"
      :value="inputValue"
      :autofocus="props.autofocus"
      :autocomplete="props.autocomplete ? 'on' : 'off'"
      :spellcheck="props.spellcheck"
      :disabled="props.disabled"
      :readonly="isReadonly"
      :placeholder="props.placeholder ?? locale.placeholder"
      role="spinbutton"
      :aria-valuenow="preciseNumber"
      :aria-valuemin="props.min !== -Infinity ? props.min : undefined"
      :aria-valuemax="props.max !== Infinity ? props.max : undefined"
      @blur="handleBlur"
      @focus="handleFocus"
      @keypress="handleKeyPress"
      @input="handleInput"
      @change="handleChange"
    />
    <div
      v-if="hasSuffix"
      :class="[nh.be('icon'), nh.be('suffix')]"
      :style="{
        color: props.suffixColor,
        opacity: showClear || props.loading ? '0%' : ''
      }"
      @click="handleSuffixClick"
    >
      <slot name="suffix">
        <Icon :icon="props.suffix"></Icon>
      </slot>
    </div>
    <div
      v-else-if="props.clearable || props.loading"
      :class="[nh.be('icon'), nh.bem('icon', 'placeholder'), nh.be('suffix')]"
    ></div>
    <transition :name="nh.ns('fade')" appear>
      <div v-if="showClear" :class="[nh.be('icon'), nh.be('clear')]" @click.stop="handleClear">
        <Icon><CircleXmark></CircleXmark></Icon>
      </div>
      <div v-else-if="props.loading" :class="[nh.be('icon'), nh.be('loading')]">
        <Icon
          :spin="props.loadingSpin"
          :pulse="!props.loadingSpin"
          :icon="props.loadingIcon"
        ></Icon>
      </div>
    </transition>
    <div :class="nh.be('plus')" @click="plusNumber" @mousedown.prevent>
      <Icon :scale="0.8">
        <CaretUp></CaretUp>
      </Icon>
    </div>
    <div :class="nh.be('minus')" @click="minusNumber" @mousedown.prevent>
      <Icon :scale="0.8">
        <CaretDown></CaretDown>
      </Icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { useFieldStore } from '@/components/form'
import { useHover, useModifier } from '@vexip-ui/mixins'
import {
  useNameHelper,
  useProps,
  useLocale,
  booleanProp,
  sizeProp,
  stateProp,
  createSizeProp,
  createStateProp,
  classProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { isNull, toFixed, toNumber, boundRange, throttle, plus, minus } from '@vexip-ui/utils'
import { CaretUp, CaretDown, CircleXmark, Spinner } from '@vexip-ui/icons'

import type { PropType } from 'vue'

type InputEventType = 'input' | 'change'

const isNullOrNaN = (value: unknown) => isNull(value) || Number.isNaN(value)

export default defineComponent({
  name: 'NumberInput',
  components: {
    Icon,
    CaretUp,
    CaretDown,
    CircleXmark
  },
  props: {
    size: sizeProp,
    state: stateProp,
    prefix: Object,
    prefixColor: String,
    suffix: Object,
    suffixColor: String,
    // 格式化后显示
    formatter: Function as PropType<(value: number) => string>,
    value: Number,
    min: Number,
    max: Number,
    placeholder: String,
    autofocus: booleanProp,
    spellcheck: booleanProp,
    autocomplete: booleanProp,
    precision: Number,
    readonly: booleanProp,
    step: Number,
    ctrlStep: Number,
    shiftStep: Number,
    altStep: Number,
    disabled: booleanProp,
    inputClass: classProp,
    debounce: booleanProp,
    clearable: booleanProp,
    loading: booleanProp,
    loadingIcon: Object,
    loadingLock: booleanProp,
    loadingSpin: booleanProp,
    onFocus: eventProp<(event: FocusEvent) => void>(),
    onBlur: eventProp<(event: FocusEvent) => void>(),
    onInput: eventProp<(value: number) => void>(),
    onChange: eventProp<(value: number) => void>(),
    onEnter: eventProp(),
    onClear: eventProp(),
    onPrefixClick: eventProp<(event: MouseEvent) => void>(),
    onSuffixClick: eventProp<(event: MouseEvent) => void>(),
    onKeyDown: eventProp<(event: KeyboardEvent) => void>(),
    onKeyPress: eventProp<(event: KeyboardEvent) => void>(),
    onKeyUp: eventProp<(event: KeyboardEvent) => void>()
  },
  emits: ['update:value'],
  setup(_props, { slots, emit }) {
    const {
      idFor,
      state,
      disabled,
      loading,
      validateField,
      clearField,
      getFieldValue,
      setFieldValue
    } = useFieldStore<number>(focus)

    const props = useProps('numberInput', _props, {
      size: createSizeProp(),
      state: createStateProp(state),
      prefix: null,
      prefixColor: '',
      suffix: null,
      suffixColor: '',
      // 格式化后显示
      formatter: {
        default: null,
        isFunc: true
      },
      value: {
        default: () => getFieldValue(null!),
        static: true
      },
      min: -Infinity,
      max: Infinity,
      placeholder: null,
      autofocus: false,
      spellcheck: false,
      autocomplete: false,
      precision: 0,
      readonly: false,
      step: 1,
      ctrlStep: 100,
      shiftStep: 10,
      altStep: 0.1,
      disabled: () => disabled.value,
      inputClass: null,
      debounce: false,
      clearable: false,
      loading: () => loading.value,
      loadingIcon: Spinner,
      loadingLock: false,
      loadingSpin: false
    })

    const nh = useNameHelper('number-input')
    const focused = ref(false)
    const currentValue = ref(props.value)
    const inputting = ref(false)

    const inputControl = ref<HTMLInputElement | null>(null)
    const { wrapper, isHover } = useHover()

    useModifier({
      target: inputControl,
      passive: false,
      onKeyDown: (event, modifier) => {
        emitEvent(props.onKeyDown, event)

        if (modifier.up || modifier.down) {
          event.preventDefault()

          changeStep(
            modifier.up ? 'plus' : 'minus',
            event.ctrlKey ? 'ctrl' : event.shiftKey ? 'shift' : event.altKey ? 'alt' : undefined
          )
        }
      },
      onKeyUp: (event, modifier) => {
        emitEvent(props.onKeyUp, event)

        if (modifier.enter) {
          handleEnter()
        }
      }
    })

    // eslint-disable-next-line vue/no-setup-props-destructure
    let lastValue: number | null = props.value

    const className = computed(() => {
      return [
        nh.b(),
        nh.ns('input-vars'),
        {
          [nh.bm('focused')]: focused.value,
          [nh.bm('disabled')]: props.disabled,
          [nh.bm('loading')]: props.loading && props.loadingLock,
          [nh.bm(props.size)]: props.size !== 'default',
          [nh.bm(props.state)]: props.state !== 'default'
        }
      ]
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
        paddingRight: hasSuffix.value ? '2em' : ''
      }
    })
    const preciseNumber = computed(() => {
      return !inputting.value && typeof currentValue.value === 'number' && props.precision > 0
        ? toFixed(currentValue.value, props.precision)
        : currentValue.value
    })
    const formattedValue = computed(() => {
      if (typeof preciseNumber.value !== 'number') return preciseNumber.value ?? ''

      return typeof props.formatter === 'function'
        ? props.formatter(preciseNumber.value)
        : preciseNumber.value.toString()
    })
    const plusDisabled = computed(() => {
      return !isNullOrNaN(currentValue.value) && currentValue.value >= props.max
    })
    const minusDisabled = computed(() => {
      return !isNullOrNaN(currentValue.value) && currentValue.value <= props.min
    })
    const hasValue = computed(() => {
      return currentValue.value || currentValue.value === 0
    })
    const showClear = computed(() => {
      return !props.disabled && props.clearable && isHover.value && hasValue.value
    })
    const inputValue = computed(() => {
      if (Number.isNaN(currentValue.value)) {
        return ''
      }

      return focused.value ? preciseNumber.value : formattedValue.value
    })
    const isReadonly = computed(() => (props.loading && props.loadingLock) || props.readonly)

    watch(
      () => props.value,
      value => {
        currentValue.value = isNull(value) ? NaN : value
        lastValue = currentValue.value
      }
    )

    function focus() {
      inputControl.value && inputControl.value.focus()
    }

    function handleFocus(event: FocusEvent) {
      focused.value = true
      inputting.value = true
      emitEvent(props.onFocus, event)
    }

    function handleBlur(event: FocusEvent) {
      focused.value = false

      window.setTimeout(() => {
        if (!focused.value) {
          inputting.value = false
          emitEvent(props.onBlur, event)
          emitChangeEvent('change')
        }
      }, 120)
    }

    function plusNumber(event: MouseEvent) {
      if (plusDisabled.value) {
        return
      }

      !focused.value && focus()
      changeStep(
        'plus',
        event.ctrlKey ? 'ctrl' : event.shiftKey ? 'shift' : event.altKey ? 'alt' : undefined
      )
    }

    function minusNumber(event: MouseEvent) {
      if (minusDisabled.value) {
        return
      }

      !focused.value && focus()
      changeStep(
        'minus',
        event.ctrlKey ? 'ctrl' : event.shiftKey ? 'shift' : event.altKey ? 'alt' : undefined
      )
    }

    function changeStep(type: 'plus' | 'minus', modifier?: 'ctrl' | 'shift' | 'alt') {
      if (props.disabled || (props.loading && props.loadingLock)) {
        return
      }

      let value = currentValue.value || 0
      let step!: number

      switch (modifier) {
        case 'ctrl':
          step = props.ctrlStep
          break
        case 'shift':
          step = props.shiftStep
          break
        case 'alt':
          step = props.altStep
          break
        default:
          step = props.step
      }

      const stringValue = value.toString().trim()

      if (stringValue.endsWith('.')) {
        value = toNumber(stringValue.slice(0, -1))
      }

      if (type === 'plus') {
        value = plus(value, step)
      } else {
        value = minus(value, step)
      }

      setValue(value, 'input')
    }

    function handleChange(event: Event) {
      const type = event.type as InputEventType
      const stringValue = (event.target as HTMLInputElement).value

      let value = stringValue

      if (!/^-?[0-9]*\.?[0-9]*$/.test(stringValue)) {
        const floatValue = parseFloat(stringValue)

        if (Number.isNaN(floatValue)) {
          value = ''
        } else {
          value = floatValue.toString()
        }

        (event.target as HTMLInputElement).value = value
      }

      inputting.value = type === 'input'

      setValue(toNumber(value), type)
    }

    function setValue(value: number, type: InputEventType) {
      if (type !== 'input') {
        currentValue.value = boundRange(value, props.min, props.max)
      } else {
        currentValue.value = value
      }

      emitChangeEvent(type)
    }

    function emitChangeEvent(type: InputEventType) {
      type = type === 'input' ? 'input' : 'change'

      if (type === 'change') {
        if (lastValue === currentValue.value) return

        lastValue = currentValue.value

        setFieldValue(currentValue.value!)
        emitEvent(props.onChange, currentValue.value)
        emit('update:value', currentValue.value)
        validateField()
      } else {
        emitEvent(props.onInput, currentValue.value!)
      }
    }

    function handleClear() {
      setValue(NaN, 'change')
      emitEvent(props.onClear)
      clearField()
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

    function handleKeyPress(event: KeyboardEvent) {
      emitEvent(props.onKeyPress, event)
    }

    return {
      props,
      nh,
      locale: useLocale('input'),
      idFor,
      focused,
      isHover,

      className,
      hasPrefix,
      hasSuffix,
      inputStyle,
      preciseNumber,
      formattedValue,
      plusDisabled,
      minusDisabled,
      hasValue,
      showClear,
      inputValue,
      isReadonly,

      wrapper,
      input: inputControl,

      handleFocus,
      handleBlur,
      plusNumber,
      minusNumber,
      handleInput: throttle(handleChange),
      handleChange,
      handleClear,
      handleEnter,
      handlePrefixClick,
      handleSuffixClick,
      handleKeyPress
    }
  }
})
</script>
