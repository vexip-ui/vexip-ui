<template>
  <div ref="wrapper" :class="className">
    <input
      ref="input"
      type="text"
      :class="[nh.be('control'), inputClass]"
      :value="focused ? preciseNumber : formattedValue"
      :style="inputStyle"
      :autofocus="props.autofocus"
      :autocomplete="props.autocomplete ? 'on' : 'off'"
      :spellcheck="props.spellcheck"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :placeholder="props.placeholder ?? locale.placeholder"
      @blur="handleBlur"
      @focus="handleFocus"
      @keypress="handleKeyPress"
      @input="handleInput"
      @change="handleChange"
    />
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
    <div
      v-if="hasPrefix"
      :class="nh.bem('icon', 'prefix')"
      :style="{ color: props.prefixColor }"
      @click="handlePrefixClick"
    >
      <slot name="prefix">
        <Icon :icon="props.prefix"></Icon>
      </slot>
    </div>
    <transition name="vxp-fade">
      <div
        v-if="!props.disabled && props.clearable && isHover && hasValue"
        :class="nh.be('clear')"
        @click.stop="handleClear"
      >
        <Icon><CircleXmark></CircleXmark></Icon>
      </div>
      <div
        v-else-if="hasSuffix"
        :class="nh.bem('icon', 'suffix')"
        :style="{ color: props.suffixColor }"
        @click="handleSuffixClick"
      >
        <slot name="suffix">
          <Icon :icon="props.suffix"></Icon>
        </slot>
      </div>
    </transition>
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
  classProp
} from '@vexip-ui/config'
import { isNull, toFixed, toNumber, boundRange, throttle, plus, minus } from '@vexip-ui/utils'
import { CaretUp, CaretDown, CircleXmark } from '@vexip-ui/icons'

import type { PropType } from 'vue'

type InputEventType = 'input' | 'change'

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
    value: Number as PropType<number | null>,
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
  setup(_props, { slots, emit }) {
    const { state, validateField, clearField, getFieldValue, setFieldValue } =
      useFieldStore<number>()

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
      disabled: false,
      inputClass: null,
      debounce: false,
      clearable: false
    })

    const nh = useNameHelper('number-input')
    const focused = ref(false)
    const currentValue = ref<number | null>(props.value)
    const inputting = ref(false)

    const inputControl = ref<HTMLElement | null>(null)
    const { wrapper, isHover } = useHover()

    useModifier({
      target: inputControl,
      passive: false,
      onKeyDown: (event, modifier) => {
        emit('key-down', event)

        if (modifier.up || modifier.down) {
          event.preventDefault()

          changeStep(
            modifier.up ? 'plus' : 'minus',
            modifier.ctrl ? 'ctrl' : modifier.shift ? 'shift' : modifier.alt ? 'alt' : undefined
          )
        }
      },
      onKeyUp: (event, modifier) => {
        emit('key-up', event)

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
      return !isNull(currentValue.value) && currentValue.value >= props.max
    })
    const minusDisabled = computed(() => {
      return !isNull(currentValue.value) && currentValue.value <= props.min
    })
    const hasValue = computed(() => {
      return currentValue.value || currentValue.value === 0
    })

    watch(
      () => props.value,
      value => {
        currentValue.value = value
        lastValue = value
      }
    )

    function focus() {
      inputControl.value && inputControl.value.focus()
    }

    function handleFocus(event: FocusEvent) {
      focused.value = true
      inputting.value = true
      emit('focus', event)
    }

    function handleBlur(event: FocusEvent) {
      focused.value = false

      window.setTimeout(() => {
        if (!focused.value) {
          inputting.value = false
          emit('blur', event)
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
      if (props.disabled) {
        return
      }

      let value = currentValue.value ?? 0
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

    function setValue(value: number | null, type: InputEventType) {
      if (type !== 'input') {
        currentValue.value = boundRange(value || 0, props.min, props.max)
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
        emit('change', currentValue.value)
        emit('update:value', currentValue.value)
        validateField()
      } else {
        emit('input', currentValue.value)
      }
    }

    function handleClear() {
      setValue(null, 'change')
      emit('clear')
      clearField()
    }

    function handleEnter() {
      emit('enter')
    }

    function handlePrefixClick(event: MouseEvent) {
      emit('prefix-click', event)
    }

    function handleSuffixClick(event: MouseEvent) {
      emit('suffix-click', event)
    }

    function handleKeyPress(event: KeyboardEvent) {
      emit('key-press', event)
    }

    return {
      props,
      nh,
      locale: useLocale('input'),
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
