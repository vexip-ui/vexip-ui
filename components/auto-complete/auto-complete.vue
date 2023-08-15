<template>
  <Select
    :id="idFor"
    ref="select"
    :visible="currentVisible"
    :class="nh.b()"
    :inherit="props.inherit"
    :list-class="nh.be('list')"
    :value="currentValue"
    :size="props.size"
    :state="props.state"
    :clearable="props.clearable"
    :transition-name="props.transitionName"
    :disabled="props.disabled"
    :transfer="props.transfer"
    :placement="props.placement"
    :prefix-color="props.prefixColor"
    :suffix-color="props.suffixColor"
    :no-suffix="!hasSuffix"
    :placeholder="props.placeholder"
    :options="props.options"
    :key-config="props.keyConfig"
    :loading="props.loading"
    :loading-icon="props.loadingIcon"
    :loading-lock="props.loadingLock"
    :loading-effect="props.loadingEffect"
    :transparent="transparent"
    :filter="props.filter"
    :ignore-case="props.ignoreCase"
    @toggle="handleToggle"
    @select="handleSelect"
    @clear="handleClear"
    @focus="handleFocus"
    @blur="handleBlur"
    @outside-close="handleChange"
    @click="handleClick"
    @click.capture="beforeClick"
  >
    <template v-if="hasPrefix" #prefix>
      <slot name="prefix">
        <Icon :icon="props.prefix"></Icon>
      </slot>
    </template>
    <template #control>
      <slot
        name="control"
        :value="currentValue"
        :on-input="handleInput"
        :on-change="handleChange"
        :on-enter="handleEnter"
        :on-clear="handleClear"
      >
        <input
          ref="control"
          :class="nh.be('input')"
          :autofocus="props.autofocus"
          :spellcheck="props.spellcheck"
          :disabled="props.disabled"
          :placeholder="props.placeholder ?? locale.placeholder"
          :readonly="props.loading && props.loadingLock"
          autocomplete="off"
          tabindex="-1"
          role="combobox"
          aria-autocomplete="list"
          @submit.prevent
          @input="handleInput"
          @keydown="handleKeyDown"
          @focus="props.filter && handleFocus($event)"
          @blur="props.filter && handleBlur($event)"
          @compositionstart="composing = true"
          @compositionend="composing = false"
        />
      </slot>
    </template>
    <template v-if="hasSuffix" #suffix>
      <slot name="suffix">
        <Icon :icon="props.suffix"></Icon>
      </slot>
    </template>
    <template v-if="$slots.default" #default="{ option, index, selected }">
      <slot :option="option" :index="index" :selected="selected"></slot>
    </template>
    <template v-if="$slots.group" #group="{ option, index }">
      <slot name="group" :option="option" :index="index"></slot>
    </template>
  </Select>
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { Select } from '@/components/select'
import { useFieldStore } from '@/components/form'

import { computed, defineComponent, nextTick, onMounted, ref, toRef, watch, watchEffect } from 'vue'

import { placementWhileList } from '@vexip-ui/hooks'
import {
  createSizeProp,
  createStateProp,
  emitEvent,
  useLocale,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { debounce, isNull, throttle, toNumber } from '@vexip-ui/utils'
import { autoCompleteProps } from './props'

import type { AutoCompleteRawOption, ChangeEvent, EnterEvent } from './symbol'

export default defineComponent({
  name: 'AutoComplete',
  components: {
    Icon,
    Select
  },
  props: autoCompleteProps,
  emits: ['update:value'],
  setup(_props, { slots, emit }) {
    const select = ref<InstanceType<typeof Select>>()
    const control = ref<HTMLInputElement>()

    const {
      idFor,
      state,
      disabled,
      loading,
      size,
      validateField,
      clearField,
      getFieldValue,
      setFieldValue
    } = useFieldStore<string | number>(() => control.value?.focus())

    const nh = useNameHelper('auto-complete')
    const props = useProps('autoComplete', _props, {
      size: createSizeProp(size),
      state: createStateProp(state),
      locale: null,
      transfer: false,
      value: {
        default: () => getFieldValue(''),
        static: true
      },
      options: {
        default: () => [],
        static: true
      },
      filter: false,
      prefix: null,
      prefixColor: '',
      suffix: null,
      suffixColor: '',
      placeholder: null,
      disabled: () => disabled.value,
      transitionName: () => nh.ns('drop'),
      dropDisabled: false,
      placement: {
        default: 'bottom',
        validator: value => placementWhileList.includes(value)
      },
      clearable: false,
      ignoreCase: false,
      autofocus: false,
      spellcheck: false,
      keyConfig: () => ({}),
      loading: () => loading.value,
      loadingIcon: null,
      loadingLock: false,
      loadingEffect: null,
      transparent: false,
      debounce: false,
      delay: null,
      showEmpty: false
    })

    const currentValue = ref(props.value)
    const currentIndex = ref(-1)
    const currentVisible = ref(false)
    const composing = ref(false)

    let changed = false
    let lastValue = props.value
    let lastInput = String(lastValue)

    const optionStates = computed(() => select.value?.optionStates || [])
    const filteredOptions = computed(() => select.value?.visibleOptions || [])
    const hasPrefix = computed(() => !!(slots.prefix || props.prefix))
    const hasSuffix = computed(() => !!(slots.suffix || props.suffix))

    watch(
      () => props.value,
      value => {
        currentValue.value = value
        lastValue = value
        lastInput = String(value)

        if (control.value) {
          control.value.value = String(value)
        }
      }
    )
    watch(currentIndex, computeHitting)
    watch(currentVisible, value => {
      if (!value) {
        currentIndex.value = -1
      } else {
        control.value?.focus()
      }
    })
    watch(currentValue, value => {
      if (props.filter && select.value) {
        select.value.currentFilter = `${value}`
      }
    })
    watchEffect(() => {
      if (!props.filter || !currentVisible.value || !select.value) return

      select.value.currentFilter = String(currentValue.value)
    })

    onMounted(() => {
      nextTick(() => {
        if (control.value && !isNull(currentValue.value)) {
          control.value.value = String(currentValue.value)
        }
      })
    })

    function computeHitting() {
      const hitting = currentIndex.value
      let index = -1

      optionStates.value.forEach(state => {
        if (!state.hidden) {
          index += 1
          state.hitting = hitting === index

          if (state.hitting) {
            if (control.value) {
              control.value.value = String(state.value)
            }
          }
        } else {
          state.hitting = false
        }
      })

      if (control.value && hitting < 0) {
        control.value.value = lastInput
      }
    }

    function handleFocus(event: FocusEvent) {
      control.value?.focus()
      emitEvent(props.onFocus, event)
    }

    function handleBlur(event: FocusEvent) {
      control.value?.blur()
      emitEvent(props.onBlur, event)
    }

    function handleSelect(value: string | number, data: AutoCompleteRawOption) {
      if (composing.value || isNull(value)) {
        return
      }

      const prevValue = currentValue.value
      currentValue.value = value

      emitEvent(props.onSelect as ChangeEvent, value, data)

      if (value !== prevValue) {
        changed = true
        handleChange()
      } else {
        currentVisible.value = false
      }
    }

    function handleInputInternal(event: string | Event) {
      const value = typeof event === 'string' ? event : (event.target as HTMLInputElement).value

      currentVisible.value = !props.dropDisabled

      currentValue.value = value
      changed = true
      lastInput = value

      if (currentIndex.value !== -1) {
        currentIndex.value = 0
      }

      emitEvent(props.onInput, value)
      nextTick(testOptionCanDrop)
    }

    const delay = toNumber(props.delay)
    const handleInput = props.debounce
      ? debounce(handleInputInternal, delay || 100)
      : throttle(handleInputInternal, delay || 16)

    function handleChange(valid = true) {
      if (!changed || currentValue.value === lastValue) return

      changed = false
      lastValue = currentValue.value
      lastInput = String(lastValue)

      const option = optionStates.value.find(option => option.value === lastValue)

      emit('update:value', currentValue.value)
      setFieldValue(currentValue.value)
      emitEvent(props.onChange as ChangeEvent, currentValue.value, option?.data || null!)
      valid && validateField()

      currentVisible.value = false

      if (control.value) {
        control.value.value = String(lastValue)
        control.value.blur()
      }
    }

    let beforeVisible = false
    let inClickProcess = false

    function beforeClick() {
      beforeVisible = currentVisible.value
      inClickProcess = true
    }

    function handleClick() {
      inClickProcess = false

      if (!select.value) return

      currentVisible.value = true

      if (!beforeVisible) {
        testOptionCanDrop()
        beforeVisible = currentVisible.value
        beforeVisible && emitEvent(props.onToggle, beforeVisible)
      } else {
        currentVisible.value = true
        select.value.currentVisible = currentVisible.value
      }
    }

    function handleToggle(visible: boolean) {
      if (inClickProcess) return

      currentVisible.value = visible

      testOptionCanDrop()
      beforeVisible = currentVisible.value

      if (currentVisible.value !== visible) {
        emitEvent(props.onToggle, currentVisible.value)
      }

      if (!currentVisible.value) {
        currentIndex.value = -1
      }
    }

    function testOptionCanDrop() {
      if (props.dropDisabled || (!props.showEmpty && !filteredOptions.value.length)) {
        currentVisible.value = false

        if (select.value) {
          select.value.currentVisible = currentVisible.value
        }
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (composing.value) {
        event.stopPropagation()
        return
      }

      const key = event.code || event.key

      if (key === 'Enter') {
        handleEnter(event)
      } else if (key === 'ArrowDown' || key === 'ArrowUp') {
        event.preventDefault()
        event.stopPropagation()

        const options = filteredOptions.value
        const length = options.length

        if (!length) return

        const step = key === 'ArrowDown' ? 1 : -1

        let index = (currentIndex.value + step) % length
        let option = options[index]

        for (let i = 0; (option.disabled || option.group) && i < length; ++i) {
          index += step
          index = (index + length) % length
          option = options[index]
        }

        currentIndex.value = index
      } else {
        if (['Space', ' '].includes(key)) {
          event.stopPropagation()
        }

        if (!['Enter', 'ArrowLeft', 'ArrowRight'].includes(key)) {
          // 进行了其他按键则重置
          currentIndex.value = -1
        }
      }
    }

    function handleEnter(event: KeyboardEvent) {
      event.stopPropagation()

      if (composing.value) return

      if (filteredOptions.value.length) {
        const option = filteredOptions.value[currentIndex.value === -1 ? 0 : currentIndex.value]

        handleSelect(option.value, option.data)
      } else {
        handleChange()
      }

      emitEvent(props.onEnter as EnterEvent, currentValue.value)
      control.value?.blur()
      currentVisible.value = false
    }

    function handleClear() {
      if (props.clearable) {
        const prevValue = currentValue.value

        currentValue.value = ''
        currentVisible.value = false

        if (!isNull(prevValue) && prevValue !== currentValue.value) {
          changed = true
        }

        handleChange(false)
        emitEvent(props.onClear)
        nextTick(clearField)
      }
    }

    return {
      props,
      nh,
      locale: useLocale('input', toRef(props, 'locale')),
      idFor,
      currentValue,
      currentIndex,
      currentVisible,
      composing,

      hasPrefix,
      hasSuffix,

      select,
      control,

      handleFocus,
      handleBlur,
      handleSelect,
      handleInput,
      handleChange,
      beforeClick,
      handleClick,
      handleToggle,
      handleKeyDown,
      handleEnter,
      handleClear,

      focus: (options?: FocusOptions) => control.value?.focus(options),
      blur: () => control.value?.blur()
    }
  }
})
</script>
