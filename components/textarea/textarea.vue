<template>
  <div :id="idFor" :class="className">
    <textarea
      ref="textarea"
      :class="nh.be('control')"
      :value="currentValue"
      :rows="props.rows"
      :autofocus="props.autofocus"
      :autocomplete="props.autocomplete ? 'on' : 'off'"
      :spellcheck="props.spellcheck"
      :disabled="props.disabled"
      :readonly="isReadonly"
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
    <div :class="nh.be('extra')">
      <transition name="vxp-fade" appear>
        <div v-if="props.loading" :class="nh.be('loading')">
          <Icon
            :spin="props.loadingSpin"
            :pulse="!props.loadingSpin"
            :icon="props.loadingIcon"
          ></Icon>
        </div>
      </transition>
      <div v-if="props.maxLength" :class="nh.be('count')">
        {{ `${currentLength}/${props.maxLength}` }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useFieldStore } from '@/components/form'
import { Spinner } from '@vexip-ui/icons'
import {
  useNameHelper,
  useProps,
  useLocale,
  booleanProp,
  stateProp,
  createStateProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { throttle } from '@vexip-ui/utils'

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
    loading: booleanProp,
    loadingIcon: Object,
    loadingLock: booleanProp,
    loadingSpin: booleanProp,
    onFocus: eventProp<(event: FocusEvent) => void>(),
    onBlur: eventProp<(event: FocusEvent) => void>(),
    onInput: eventProp<(value: string) => void>(),
    onChange: eventProp<(value: string) => void>(),
    onEnter: eventProp(),
    onKeyDown: eventProp<(event: KeyboardEvent) => void>(),
    onKeyPress: eventProp<(event: KeyboardEvent) => void>(),
    onKeyUp: eventProp<(event: KeyboardEvent) => void>()
  },
  emits: ['update:value'],
  setup(_props, { emit }) {
    const { idFor, state, disabled, validateField, getFieldValue, setFieldValue } =
      useFieldStore<string>(() => textarea.value?.focus())

    const props = useProps('textarea', _props, {
      state: createStateProp(state),
      value: {
        default: () => getFieldValue(''),
        static: true
      },
      placeholder: null,
      rows: 2,
      noResize: false,
      autofocus: false,
      spellcheck: false,
      autocomplete: false,
      readonly: false,
      disabled: () => disabled.value,
      debounce: false,
      maxLength: 0,
      loading: false,
      loadingIcon: Spinner,
      loadingLock: false,
      loadingSpin: false
    })

    const nh = useNameHelper('textarea')
    const focused = ref(false)
    const currentValue = ref(props.value)
    const currentLength = ref(props.value ? props.value.length : 0)

    const textarea = ref<HTMLElement | null>(null)

    // eslint-disable-next-line vue/no-setup-props-destructure
    let lastValue = props.value

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.ns('input-vars')]: true,
        [nh.bs('vars')]: true,
        [nh.bm('focused')]: focused.value,
        [nh.bm('disabled')]: props.disabled,
        [nh.bm('loading')]: props.loading && props.loadingLock,
        [nh.bm('no-resize')]: props.noResize,
        [nh.bm(props.state)]: props.state !== 'default'
      }
    })
    const isReadonly = computed(() => {
      return (props.loading && props.loadingLock) || props.readonly
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
      emitEvent(props.onFocus, event)
    }

    function handleBlur(event: FocusEvent) {
      focused.value = false
      emitEvent(props.onBlur, event)
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

        setFieldValue(currentValue.value)
        emitEvent(props.onChange, currentValue.value)
        emit('update:value', currentValue.value)
        validateField()
      } else {
        emitEvent(props.onInput, currentValue.value)
      }
    }

    function handleEnter() {
      emitEvent(props.onEnter)
    }

    function handleKeyDown(event: KeyboardEvent) {
      emitEvent(props.onKeyDown, event)
    }

    function handleKeyPress(event: KeyboardEvent) {
      emitEvent(props.onKeyPress, event)
    }

    function handleKeyUp(event: KeyboardEvent) {
      emitEvent(props.onKeyUp, event)
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
      idFor,
      currentValue,
      currentLength,

      className,
      isReadonly,

      textarea,

      handleFocus,
      handleBlur,
      handleInput: throttle(handleChange),
      handleChange,
      handleEnter,
      handleKeyDown,
      handleKeyPress,
      handleKeyUp,

      // api
      copyValue
    }
  }
})
</script>
