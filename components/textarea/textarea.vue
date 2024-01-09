<script setup lang="ts">
import { Icon } from '@/components/icon'
import { useFieldStore } from '@/components/form'

import { computed, ref, toRef, watch } from 'vue'

import {
  createIconProp,
  createStateProp,
  emitEvent,
  useIcons,
  useLocale,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { debounce, throttle, toNumber } from '@vexip-ui/utils'
import { textareaProps } from './props'

defineOptions({ name: 'Textarea' })

const { idFor, state, disabled, loading, validateField, getFieldValue, setFieldValue } =
  useFieldStore<string>(() => textarea.value?.focus())

const _props = defineProps(textareaProps)
const props = useProps('textarea', _props, {
  state: createStateProp(state),
  locale: null,
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
  delay: null,
  maxLength: 0,
  loading: () => loading.value,
  loadingIcon: createIconProp(),
  loadingLock: false,
  loadingEffect: null,
  sync: false,
  controlClass: null,
  controlAttrs: null,
  name: {
    default: '',
    static: true
  }
})

const emit = defineEmits(['update:value'])

const nh = useNameHelper('textarea')
const locale = useLocale('input', toRef(props, 'locale'))
const icons = useIcons()

const focused = ref(false)
const currentValue = ref(props.value)
const currentLength = ref(props.value ? props.value.length : 0)
const composing = ref(false)

const textarea = ref<HTMLTextAreaElement>()

let lastValue = props.value

const isReadonly = computed(() => {
  return (props.loading && props.loadingLock) || props.readonly
})
const className = computed(() => {
  return {
    [nh.b()]: true,
    [nh.ns('input-vars')]: true,
    [nh.bs('vars')]: true,
    [nh.bm('inherit')]: props.inherit,
    [nh.bm('focused')]: focused.value,
    [nh.bm('disabled')]: props.disabled,
    [nh.bm('readonly')]: isReadonly.value,
    [nh.bm('loading')]: props.loading,
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

defineExpose({
  idFor,
  currentValue,
  currentLength,
  composing,
  isReadonly,
  textarea,
  copyValue,
  focus: (options?: FocusOptions) => textarea.value?.focus(options),
  blur: () => textarea.value?.blur()
})

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

  if (composing.value) {
    if (type === 'input') return

    composing.value = false
  }

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

    if (!props.sync) {
      emit('update:value', currentValue.value)
      setFieldValue(currentValue.value)
    }

    emitEvent(props.onChange, currentValue.value)

    if (!props.sync) {
      validateField()
    }
  } else {
    if (props.sync) {
      emit('update:value', currentValue.value)
      setFieldValue(currentValue.value)
    }

    emitEvent(props.onInput, currentValue.value)

    if (props.sync) {
      validateField()
    }
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

const delay = toNumber(props.delay)
const handleInput = props.debounce
  ? debounce(handleChange, delay || 100)
  : throttle(handleChange, delay || 16)

function handleCompositionStart(event: CompositionEvent) {
  composing.value = true
  emitEvent(props.onCompositionStart, event)
}

function handleCompositionEnd(event: CompositionEvent) {
  if (composing.value) {
    composing.value = false

    if (textarea.value) {
      textarea.value.dispatchEvent(new Event('input'))
    }
  }

  emitEvent(props.onCompositionStart, event)
}
</script>

<template>
  <div :id="idFor" :class="className" @click="textarea?.focus()">
    <textarea
      v-bind="props.controlAttrs"
      ref="textarea"
      :class="[nh.be('control'), props.controlAttrs?.class, props.controlClass]"
      :value="currentValue"
      :rows="props.rows"
      :autofocus="props.autofocus"
      :autocomplete="props.autocomplete ? 'on' : 'off'"
      :spellcheck="props.spellcheck"
      :disabled="props.disabled"
      :readonly="isReadonly"
      :placeholder="props.placeholder ?? locale.placeholder"
      :maxlength="props.maxLength > 0 ? props.maxLength : undefined"
      :name="props.name || props.controlAttrs?.name"
      @blur="handleBlur"
      @focus="handleFocus"
      @keyup.enter="handleEnter"
      @keyup="handleKeyUp"
      @keypress="handleKeyPress"
      @keydown="handleKeyDown"
      @input="handleInput"
      @change="handleChange"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
    ></textarea>
    <div :class="nh.be('extra')">
      <Transition :name="nh.ns('fade')" appear>
        <div v-if="props.loading" :class="nh.be('loading')">
          <Icon
            v-bind="icons.loading"
            :effect="props.loadingEffect || icons.loading.effect"
            :icon="props.loadingIcon || icons.loading.icon"
            label="loading"
          ></Icon>
        </div>
      </Transition>
      <div v-if="props.maxLength > 0" :class="nh.be('count')">
        <slot name="count" :value="currentValue">
          {{ `${currentLength}/${props.maxLength}` }}
        </slot>
      </div>
    </div>
  </div>
</template>
