<template>
  <div :class="className">
    <textarea
      ref="textarea"
      :class="nh.be('control')"
      :value="currentValue"
      :rows="props.rows"
      :autofocus="props.autofocus"
      :autocomplete="props.autocomplete ? 'on' : 'off'"
      :spellcheck="props.spellcheck"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :placeholder="props.placeholder ?? locale.placeholder"
      @blur="handleBlur"
      @focus="handleFocus"
      @keyup.enter="handleEnter"
      @keyup="handleKeyUp"
      @keypress="handleKeyPress"
      @keydown="handleKeyDown"
      @input="handleInput"
      @change="handleChange"
    ></textarea>
    <div v-if="props.maxLength" :class="nh.be('count')">
      {{ `${currentLength}/${props.maxLength}` }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, inject } from 'vue'
import { VALIDATE_FIELD } from '@/components/form-item'
import { useNameHelper, useProps, useLocale, booleanProp, stateProp, createStateProp } from '@vexip-ui/config'
import { noop, throttle } from '@vexip-ui/utils'

export default defineComponent({
  name: 'Textarea',
  props: {
    state: stateProp,
    value: String,
    placeholder: String,
    rows: Number,
    noResize: booleanProp,
    autofocus: booleanProp,
    spellcheck: booleanProp,
    autocomplete: booleanProp,
    readonly: booleanProp,
    disabled: booleanProp,
    debounce: booleanProp,
    maxLength: Number,
    disableValidate: booleanProp
  },
  emits: [
    'focus',
    'blur',
    'input',
    'change',
    'enter',
    'key-down',
    'key-press',
    'key-up',
    'update:value'
  ],
  setup(_props, { emit }) {
    const props = useProps('textarea', _props, {
      state: createStateProp(),
      value: {
        default: '',
        static: true
      },
      placeholder: null,
      rows: 2,
      noResize: false,
      autofocus: false,
      spellcheck: false,
      autocomplete: false,
      readonly: false,
      disabled: false,
      debounce: false,
      maxLength: 0,
      disableValidate: false
    })

    const validateField = inject(VALIDATE_FIELD, noop)

    const nh = useNameHelper('textarea')
    const focused = ref(false)
    const currentValue = ref(props.value)
    const currentLength = ref(props.value ? props.value.length : 0)

    // eslint-disable-next-line vue/no-setup-props-destructure
    let lastValue = props.value

    const className = computed(() => {
      return {
        [nh.b()]: true,
        'vxp-input-vars': true,
        [nh.bs('vars')]: true,
        [nh.bm('focused')]: focused.value,
        [nh.bm('disabled')]: props.disabled,
        [nh.bm('no-resize')]: props.noResize,
        [nh.bm(props.state)]: props.state !== 'default'
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
      emit('focus', event)
    }

    function handleBlur(event: FocusEvent) {
      focused.value = false
      emit('blur', event)
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

        emit('change', currentValue.value)
        emit('update:value', currentValue.value)

        if (!props.disableValidate) {
          validateField()
        }
      } else {
        emit('input', currentValue.value)
      }
    }

    function handleEnter(event: KeyboardEvent) {
      emit('enter', event)
    }

    function handleKeyDown(event: KeyboardEvent) {
      emit('key-down', event)
    }

    function handleKeyPress(event: KeyboardEvent) {
      emit('key-press', event)
    }

    function handleKeyUp(event: KeyboardEvent) {
      emit('key-up', event)
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
      props,
      nh,
      locale: useLocale('input'),
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
