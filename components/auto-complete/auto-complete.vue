<template>
  <Select
    :id="idFor"
    ref="select"
    v-model:visible="visible"
    :class="nh.b()"
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
    :loading-spin="props.loadingSpin"
    @toggle="handleToggle"
    @select="handleSelect"
    @clear="handleClear"
    @focus="control?.focus()"
    @blur="control?.blur()"
    @outside-close="handleChange"
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
          @input="handleInput"
          @keydown.enter="handleEnter"
          @keydown="handleKeyDown"
        />
      </slot>
    </template>
    <template v-if="hasSuffix" #suffix>
      <slot name="suffix">
        <Icon :icon="props.suffix"></Icon>
      </slot>
    </template>
    <template #default="{ option, index, selected }">
      <slot :option="option" :index="index" :selected="selected"></slot>
    </template>
    <template #group="{ option, index }">
      <slot name="group" :option="option" :index="index"></slot>
    </template>
  </Select>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, watchEffect, onMounted, nextTick } from 'vue'
import { Icon } from '@/components/icon'
import { Select } from '@/components/select'
import { useFieldStore } from '@/components/form'
import { placementWhileList } from '@vexip-ui/hooks'
import {
  useNameHelper,
  useProps,
  useLocale,
  booleanProp,
  booleanStringProp,
  sizeProp,
  stateProp,
  createSizeProp,
  createStateProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { isNull } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/hooks'
import type {
  AutoCompleteKeyConfig,
  AutoCompleteOptionState,
  AutoCompleteRawOption
} from './symbol'

export default defineComponent({
  name: 'AutoComplete',
  components: {
    Icon,
    Select
  },
  props: {
    size: sizeProp,
    state: stateProp,
    transfer: booleanStringProp,
    value: [String, Number],
    options: Array as PropType<AutoCompleteRawOption[]>,
    filter: {
      type: [Boolean, Function] as PropType<
        boolean | ((value: string | number, options: AutoCompleteOptionState) => boolean)
      >,
      default: null
    },
    prefix: Object,
    prefixColor: String,
    suffix: Object,
    suffixColor: String,
    placeholder: String,
    disabled: booleanProp,
    transitionName: String,
    dropDisabled: booleanProp,
    placement: String as PropType<Placement>,
    clearable: booleanProp,
    ignoreCase: booleanProp,
    autofocus: booleanProp,
    spellcheck: booleanProp,
    loading: booleanProp,
    loadingIcon: Object,
    loadingLock: booleanProp,
    loadingSpin: booleanProp,
    keyConfig: Object as PropType<Omit<AutoCompleteKeyConfig, 'label'>>,
    onSelect: eventProp<(value: string | number, data: AutoCompleteRawOption) => void>(),
    onInput: eventProp<(value: string) => void>(),
    onChange: eventProp<(value: string | number, data: AutoCompleteRawOption) => void>(),
    onToggle: eventProp<(visible: boolean) => void>(),
    onEnter: eventProp<(value: string | number) => void>(),
    onClear: eventProp()
  },
  emits: ['update:value'],
  setup(_props, { slots, emit }) {
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
      loadingSpin: false
    })

    const currentValue = ref(props.value)
    const currentIndex = ref(-1)
    const visible = ref(false)

    const select = ref<InstanceType<typeof Select> | null>(null)
    const control = ref<HTMLInputElement | null>(null)

    let changed = false
    // eslint-disable-next-line vue/no-setup-props-destructure
    let lastValue = props.value
    let lastInput = String(lastValue)

    const optionStates = computed(() => select.value?.optionStates || [])
    const normalOptions = computed(() => select.value?.normalOptions || [])
    const filteredOptions = computed(() => select.value?.visibleOptions || [])
    const hasPrefix = computed(() => !!(slots.prefix || props.prefix))
    const hasSuffix = computed(() => !!(slots.suffix || props.suffix))
    const optionParentMap = computed(() => select.value?.optionParentMap || new Map())

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
    watch(visible, value => {
      if (!value) {
        currentIndex.value = -1
        control.value?.blur()
      } else {
        control.value?.focus()
      }
    })
    watchEffect(() => {
      if (props.filter) {
        const value = currentValue.value

        if (isNull(value)) {
          optionStates.value.forEach(state => {
            state.hidden = false
          })
        } else {
          optionStates.value.forEach(state => {
            state.hidden = true
          })

          if (typeof props.filter === 'function') {
            const filter = props.filter

            normalOptions.value.forEach(state => {
              state.hidden = !filter(value, state)
            })
          } else {
            if (props.ignoreCase) {
              const ignoreCaseValue = value?.toString().toLocaleLowerCase()

              normalOptions.value.forEach(state => {
                state.hidden = !state.value
                  ?.toString()
                  .toLocaleLowerCase()
                  .includes(ignoreCaseValue)
              })
            } else {
              normalOptions.value.forEach(state => {
                state.hidden = !state.value?.toString().includes(value?.toString())
              })
            }
          }

          const parentMap = optionParentMap.value

          normalOptions.value.forEach(option => {
            if (!option.hidden && option.parent) {
              let parent = parentMap.get(option.value) || null

              while (parent && parent.hidden) {
                parent.hidden = false
                parent = parent.parent
              }
            }
          })
        }

        computeHitting()
      }
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

    function handleSelect(value: string | number, data: AutoCompleteRawOption) {
      if (isNull(value)) {
        return
      }

      const prevValue = currentValue.value
      currentValue.value = value

      emitEvent(props.onSelect, value, data)

      if (value !== prevValue) {
        changed = true
        handleChange()
      } else {
        visible.value = false
      }
    }

    function handleInput(event: string | Event) {
      const value = typeof event === 'string' ? event : (event.target as HTMLInputElement).value

      visible.value = !props.dropDisabled
      currentValue.value = value
      changed = true
      lastInput = value

      if (currentIndex.value !== -1) {
        currentIndex.value = 0
      }

      emitEvent(props.onInput, value)
    }

    function handleChange() {
      if (!changed || currentValue.value === lastValue) return

      changed = false
      lastValue = currentValue.value
      lastInput = String(lastValue)

      const option = optionStates.value.find(option => option.value === lastValue)

      setFieldValue(currentValue.value)
      emitEvent(props.onChange, currentValue.value, option?.data || null!)
      emit('update:value', currentValue.value)
      validateField()

      visible.value = false

      if (control.value) {
        control.value.value = String(lastValue)
        control.value.blur()
      }
    }

    function handleToggle() {
      testOptionCanDrop()
      emitEvent(props.onToggle, visible.value)

      if (!visible.value) {
        currentIndex.value = -1
      }
    }

    function testOptionCanDrop() {
      if (!filteredOptions.value.length || props.dropDisabled) {
        visible.value = false
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      const key = event.code || event.key

      if (key === 'ArrowDown' || key === 'ArrowUp') {
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

    function handleEnter() {
      if (filteredOptions.value.length) {
        const option = filteredOptions.value[currentIndex.value === -1 ? 0 : currentIndex.value]

        handleSelect(option.value, option.data)
      } else {
        handleChange()
      }

      emitEvent(props.onEnter, currentValue.value)
      control.value?.blur()
      visible.value = false
    }

    function handleClear() {
      if (props.clearable) {
        const prevValue = currentValue.value

        currentValue.value = ''
        visible.value = false

        if (!isNull(prevValue) && prevValue !== currentValue.value) {
          changed = true
        }

        handleChange()
        emitEvent(props.onClear)
        nextTick(clearField)
      }
    }

    return {
      props,
      nh,
      locale: useLocale('input'),
      idFor,
      currentValue,
      currentIndex,
      visible,

      hasPrefix,
      hasSuffix,

      select,
      control,

      handleSelect,
      handleInput,
      handleChange,
      handleToggle,
      handleKeyDown,
      handleEnter,
      handleClear
    }
  }
})
</script>
