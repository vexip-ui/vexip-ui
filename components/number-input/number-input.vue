<template>
  <div :class="className">
    <input
      ref="input"
      type="text"
      :class="[`${prefixCls}__control`, inputClass]"
      :value="formattedValue"
      :style="inputStyle"
      :autofocus="autofocus"
      :autocomplete="autocomplete"
      :spellcheck="spellcheck"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      @blur="handleBlur"
      @focus="handleFocus"
      @keyup.enter="handleEnter"
      @keyup="handleKeyUp"
      @keypress="handleKeyPress"
      @keydown="handleKeyDown"
      @input="handleInput"
      @change="handleChange"
    />
    <div :class="`${prefixCls}__plus`" @click="plusNumber" @mousedown.prevent>
      <Icon name="caret-up" :scale="0.8"></Icon>
    </div>
    <div :class="`${prefixCls}__minus`" @click="minusNumber" @mousedown.prevent>
      <Icon name="caret-down" :scale="0.8"></Icon>
    </div>
    <div
      v-if="hasPrefix"
      :class="`${prefixCls}__icon--prefix`"
      :style="{ color: prefixColor }"
      @click="handlePrefixClick"
    >
      <slot name="prefix">
        <Icon :name="prefix"></Icon>
      </slot>
    </div>
    <div
      v-if="hasSuffix"
      :class="`${prefixCls}__icon--suffix`"
      :style="{ color: suffixColor }"
      @click="handleSuffixClick"
    >
      <slot name="suffix">
        <Icon :name="suffix"></Icon>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, inject } from 'vue'
import { Icon } from '@/components/icon'
import { VALIDATE_FIELD } from '@/components/form-item'
import { useConfiguredProps } from '@/common/config/install'
import { noop } from '@/common/utils/common'
import { toFixed, toNumber } from '@/common/utils/number'
import { throttle } from '@/common/utils/performance'
import { createSizeProp, createStateProp } from '@/common/config/props'

import '@/common/icons/caret-up'
import '@/common/icons/caret-down'

import type { PropType } from 'vue'

type ClassType = string | Record<string, boolean>
type InputEventType = 'input' | 'change'

const props = useConfiguredProps('numberInput', {
  size: createSizeProp(),
  state: createStateProp(),
  prefix: {
    type: String,
    default: ''
  },
  prefixColor: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  suffixColor: {
    type: String,
    default: ''
  },
  // 格式化后显示
  formatter: {
    type: Function as PropType<(value: number) => string>,
    default: null
  },
  // 格式化后读取
  accessor: {
    type: Function as PropType<(value: number) => any>,
    default: null
  },
  value: {
    type: Number,
    default: null
  },
  range: {
    type: Array as PropType<number[]>,
    default() {
      return [-Infinity, Infinity]
    },
    validator: (value: [number, number]) => {
      return Array.isArray(value) && typeof value[0] === 'number' && typeof value[1] === 'number'
    }
  },
  placeholder: {
    type: String,
    default: ''
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  spellcheck: {
    type: Boolean,
    default: false
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  precision: {
    type: Number,
    default: 0
  },
  readonly: {
    type: Boolean,
    default: false
  },
  step: {
    type: Number,
    default: 1
  },
  disabled: {
    type: Boolean,
    default: false
  },
  inputClass: {
    type: [String, Object] as PropType<ClassType>,
    default: ''
  },
  debounce: {
    type: Boolean,
    default: false
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'NumberInput',
  components: {
    Icon
  },
  props,
  emits: [
    'on-focus',
    'on-blur',
    'on-input',
    'on-change',
    'on-enter',
    'on-prefix-click',
    'on-suffix-click',
    'on-key-down',
    'on-key-press',
    'on-key-up',
    'update:value'
  ],
  setup(props, { slots, emit }) {
    const validateField = inject(VALIDATE_FIELD, noop)

    const prefix = 'vxp-number-input'
    const focused = ref(false)
    const currentValue = ref(props.value)
    const inputting = ref(false)

    const inputControl = ref<HTMLElement | null>(null)

    // eslint-disable-next-line vue/no-setup-props-destructure
    let lastValue = props.value

    const className = computed(() => {
      return [
        prefix,
        {
          [`${prefix}--focused`]: focused.value,
          [`${prefix}--disabled`]: props.disabled,
          [`${prefix}--${props.size}`]: props.size !== 'default',
          [`${prefix}--${props.state}`]: props.state !== 'default'
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
      if (typeof preciseNumber.value !== 'number') return preciseNumber.value

      return typeof props.formatter === 'function'
        ? props.formatter(preciseNumber.value)
        : preciseNumber.value.toString()
    })
    const plusDisabled = computed(() => {
      return currentValue.value >= props.range[1]
    })
    const minusDisabled = computed(() => {
      return currentValue.value <= props.range[0]
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
      emit('on-focus', event)
    }

    function handleBlur(event: FocusEvent) {
      focused.value = false

      window.setTimeout(() => {
        if (!focused.value) {
          inputting.value = false
          emit('on-blur', event)
          emitChangeEvent('change')
        }
      }, 120)
    }

    function plusNumber() {
      if (plusDisabled.value) {
        return
      }

      !focused.value && focus()
      changeStep('plus')
    }

    function minusNumber() {
      if (minusDisabled.value) {
        return
      }

      !focused.value && focus()
      changeStep('minus')
    }

    function changeStep(type: 'plus' | 'minus') {
      if (props.disabled) {
        return
      }

      let value = currentValue.value ?? 0

      const stringValue = value.toString()

      if (/\.$/.test(stringValue)) {
        value = toNumber(stringValue.slice(0, -1))
      }

      if (type === 'plus') {
        value += props.step
      } else {
        value -= props.step
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
      currentValue.value = value
      emitChangeEvent(type)
    }

    function emitChangeEvent(type: InputEventType) {
      type = type === 'input' ? 'input' : 'change'

      const value =
        typeof props.accessor === 'function'
          ? props.accessor(currentValue.value)
          : currentValue.value

      if (type === 'change') {
        if (lastValue === currentValue.value) return

        lastValue = currentValue.value

        emit('on-change', value, currentValue.value)
        emit('update:value', currentValue.value)

        if (!props.disableValidate) {
          validateField()
        }
      } else {
        emit('on-input', value, currentValue.value)
      }
    }

    function handleEnter(event: KeyboardEvent) {
      emit('on-enter', event)
    }

    function handlePrefixClick(event: MouseEvent) {
      emit('on-prefix-click', event)
    }

    function handleSuffixClick(event: MouseEvent) {
      emit('on-suffix-click', event)
    }

    function handleKeyDown(event: KeyboardEvent) {
      emit('on-key-down', event)
    }

    function handleKeyPress(event: KeyboardEvent) {
      emit('on-key-press', event)
    }

    function handleKeyUp(event: KeyboardEvent) {
      emit('on-key-up', event)
    }

    return {
      prefixCls: prefix,

      className,
      hasPrefix,
      hasSuffix,
      inputStyle,
      formattedValue,
      plusDisabled,
      minusDisabled,

      input: inputControl,

      handleFocus,
      handleBlur,
      plusNumber,
      minusNumber,
      handleInput: throttle(handleChange),
      handleChange,
      handleEnter,
      handlePrefixClick,
      handleSuffixClick,
      handleKeyDown,
      handleKeyPress,
      handleKeyUp
    }
  }
})
</script>
