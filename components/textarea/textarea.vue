<template>
  <div :class="className">
    <textarea
      ref="textarea"
      :class="`${prefix}__control`"
      :value="currentValue"
      :rows="rows"
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
    ></textarea>
    <div v-if="maxLength" :class="`${prefix}__count`">
      {{ `${currentLength}/${maxLength}` }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, inject } from 'vue'
import { VALIDATE_FIELD } from '@/components/form-item'
import { useConfiguredProps } from '@/common/config/install'
import { noop } from '@/common/utils/common'
import { throttle } from '@/common/utils/performance'
import { createStateProp } from '@/common/config/props'

const props = useConfiguredProps('textarea', {
  state: createStateProp(),
  value: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 2
  },
  noResize: {
    type: Boolean,
    default: false
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
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  debounce: {
    type: Boolean,
    default: false
  },
  maxLength: {
    type: Number,
    default: 0
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Textarea',
  props,
  emits: [
    'on-focus',
    'on-blur',
    'on-input',
    'on-change',
    'on-enter',
    'on-key-down',
    'on-key-press',
    'on-key-up',
    'update:value'
  ],
  setup(props, { emit }) {
    const validateField = inject(VALIDATE_FIELD, noop)

    const prefix = 'vxp-textarea'
    const focused = ref(false)
    const currentValue = ref(props.value)
    const currentLength = ref(props.value ? props.value.length : 0)

    // eslint-disable-next-line vue/no-setup-props-destructure
    let lastValue = props.value

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--focused`]: focused.value,
        [`${prefix}--disabled`]: props.disabled,
        [`${prefix}--no-resize`]: props.noResize,
        [`${prefix}--${props.state}`]: props.state !== 'default'
      }
    })

    watch(
      () => props.value,
      value => {
        currentValue.value = value
        lastValue = value
      }
    )

    function handleFocus(event: FocusEvent) {
      focused.value = true
      emit('on-focus', event)
    }

    function handleBlur(event: FocusEvent) {
      focused.value = false
      emit('on-blur', event)
    }

    function handleChange(event: Event) {
      const type = event.type as 'change' | 'input'
      const value = (event.target as HTMLTextAreaElement).value

      if (props.maxLength && value.length > props.maxLength) {
        currentValue.value = value.slice(0, props.maxLength)
      } else {
        currentValue.value = value
      }

      currentLength.value = currentValue.value.length
      ;(event.target as HTMLTextAreaElement).value = currentValue.value

      if (type === 'change') {
        if (lastValue === currentValue.value) return

        lastValue = currentValue.value

        emit('on-change', currentValue.value)
        emit('update:value', currentValue.value)

        if (!props.disableValidate) {
          validateField()
        }
      } else {
        emit('on-input', currentValue.value)
      }
    }

    function handleEnter(event: KeyboardEvent) {
      emit('on-enter', event)
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

    function copyValue() {
      const textarea = document.createElement('textarea')

      textarea.style.height = '0'
      textarea.setAttribute('readonly', 'readonly')

      textarea.value = currentValue.value

      document.body.appendChild(textarea)

      textarea.select()

      const isSuccess = document.execCommand('copy')

      document.body.removeChild(textarea)

      return isSuccess
    }

    return {
      currentValue,
      currentLength,

      className,

      handleFocus,
      handleBlur,
      handleInput: throttle(handleChange),
      handleChange,
      handleEnter,
      handleKeyDown,
      handleKeyPress,
      handleKeyUp,
      copyValue
    }
  }
})
</script>
