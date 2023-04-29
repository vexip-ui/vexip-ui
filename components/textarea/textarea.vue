<template>
  <div :id="idFor" :class="className" @click="textarea?.focus()">
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
      :maxlength="props.maxLength > 0 ? props.maxLength : undefined"
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
      <transition :name="nh.ns('fade')" appear>
        <div v-if="props.loading" :class="nh.be('loading')">
          <Icon
            v-bind="icons.loading"
            :effect="props.loadingEffect || icons.loading.effect"
            :icon="props.loadingIcon || icons.loading.icon"
          ></Icon>
        </div>
      </transition>
      <div v-if="props.maxLength > 0" :class="nh.be('count')">
        <slot name="count" :value="currentValue">
          {{ `${currentLength}/${props.maxLength}` }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { useFieldStore } from '@/components/form'
import {
  useNameHelper,
  useProps,
  useLocale,
  useIcons,
  createStateProp,
  emitEvent
} from '@vexip-ui/config'
import { throttle, debounce } from '@vexip-ui/utils'
import { textareaProps } from './props'

export default defineComponent({
  name: 'Textarea',
  components: {
    Icon
  },
  props: textareaProps,
  emits: ['update:value'],
  setup(_props, { emit }) {
    const { idFor, state, disabled, loading, validateField, getFieldValue, setFieldValue } =
      useFieldStore<string>(() => textarea.value?.focus())

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
      maxLength: 0,
      loading: () => loading.value,
      loadingIcon: null,
      loadingLock: false,
      loadingEffect: null,
      sync: false
    })

    const nh = useNameHelper('textarea')
    const focused = ref(false)
    const currentValue = ref(props.value)
    const currentLength = ref(props.value ? props.value.length : 0)

    const textarea = ref<HTMLElement>()

    let lastValue = props.value

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.ns('input-vars')]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
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

        !props.sync && setFieldValue(currentValue.value)
        emitEvent(props.onChange, currentValue.value)

        if (!props.sync) {
          emit('update:value', currentValue.value)
          validateField()
        }
      } else {
        props.sync && setFieldValue(currentValue.value)
        emitEvent(props.onInput, currentValue.value)

        if (props.sync) {
          emit('update:value', currentValue.value)
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

    return {
      props,
      nh,
      locale: useLocale('input', toRef(props, 'locale')),
      icons: useIcons(),
      idFor,
      currentValue,
      currentLength,

      className,
      isReadonly,

      textarea,

      handleFocus,
      handleBlur,
      handleInput: props.debounce ? debounce(handleChange) : throttle(handleChange),
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
