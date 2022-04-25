<template>
  <Select
    ref="select"
    v-model:visible="visible"
    :class="prefixCls"
    :list-class="`${prefixCls}__list`"
    :value="currentValue"
    :size="size"
    :state="state"
    :clearable="clearable"
    :transition-name="transitionName"
    :disabled="disabled"
    :transfer="transfer"
    :placement="placement"
    :prefix-color="prefixColor"
    :suffix-color="suffixColor"
    :no-suffix="!hasSuffix"
    :placeholder="placeholder"
    @on-toggle="handleToggle"
    @on-select="handleSelect"
    @on-clear="handleClear"
  >
    <template v-if="hasPrefix" #prefix>
      <slot name="prefix">
        <Icon :name="prefix"></Icon>
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
          :class="`${prefixCls}__input`"
          :value="inputValue"
          :autofocus="autofocus"
          :spellcheck="spellcheck"
          :disabled="disabled"
          :placeholder="placeholder ?? locale.placeholder"
          autocomplete="off"
          @input="handleInput"
          @keyup.enter="handleEnter"
          @keydown="handleKeyDown"
        />
      </slot>
    </template>
    <template v-if="hasSuffix" #suffix>
      <slot name="suffix">
        <Icon :name="suffix"></Icon>
      </slot>
    </template>
    <slot>
      <Option
        v-for="(item, index) in rawOptions"
        :key="index"
        :label="item.label || item.value?.toString()"
        :value="item.value"
      ></Option>
    </slot>
  </Select>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject, watch, watchEffect } from 'vue'
import { Icon } from '@/components/icon'
import { Option } from '@/components/option'
import { Select } from '@/components/select'
import { VALIDATE_FIELD, CLEAR_FIELD } from '@/components/form-item'
import { placementWhileList } from '@vexip-ui/mixins'
import { useConfiguredProps, useLocaleConfig, createSizeProp, createStateProp } from '@vexip-ui/config'
import { isNull, noop } from '@vexip-ui/utils'

import '@/common/icons/times-circle'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'
import type { OptionState } from '@/components/option'

type RawOption =
  | string
  | {
      value: string | number,
      label?: string
    }

const props = useConfiguredProps('autoComplete', {
  size: createSizeProp(),
  state: createStateProp(),
  transfer: {
    type: [Boolean, String],
    default: false
  },
  value: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array as PropType<RawOption[]>,
    default: () => []
  },
  filter: {
    type: [Boolean, Function] as PropType<
      | boolean
      | ((value: string | number, options: { label: string, value: string | number }) => boolean)
    >,
    default: false
  },
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
  placeholder: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  transitionName: {
    type: String,
    default: 'vxp-drop'
  },
  canDrop: {
    type: Boolean,
    default: true
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom',
    validator: (value: Placement) => {
      return placementWhileList.includes(value)
    }
  },
  disableValidate: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  ignoreCase: {
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
  }
})

export default defineComponent({
  name: 'AutoComplete',
  components: {
    Icon,
    Option,
    Select
  },
  props,
  emits: [
    'on-select',
    'on-input',
    'on-change',
    'on-toggle',
    'on-enter',
    'on-clear',
    'update:value'
  ],
  setup(props, { slots, emit }) {
    const validateField = inject(VALIDATE_FIELD, noop)
    const clearField = inject(CLEAR_FIELD, noop)

    const prefix = 'vxp-auto-complete'
    const currentValue = ref(props.value)
    const currentIndex = ref(-1)
    const visible = ref(false)

    const select = ref<InstanceType<typeof Select> | null>(null)
    const control = ref<HTMLInputElement | null>(null)

    let changed = false
    // eslint-disable-next-line vue/no-setup-props-destructure
    let lastValue = props.value

    const rawOptions = computed(() => {
      return props.options.map(option => {
        if (typeof option === 'string') {
          option = { value: option }
        }

        if (!option.label) {
          option.label = option.value?.toString()
        }

        return option
      })
    })
    const optionsStates = computed<OptionState[]>(() => {
      return select.value?.optionStates ? Array.from(select.value.optionStates) : []
    })
    const filteredOptions = computed(() => {
      return optionsStates.value.filter(({ hidden }) => !hidden)
    })
    const inputValue = computed(() => {
      const hittingOption = filteredOptions.value[currentIndex.value]

      if (hittingOption) {
        return hittingOption.label || hittingOption.value?.toString()
      } else if (select.value) {
        if (select.value.currentVisible) {
          return currentValue.value?.toString()
        }

        const currentOption = filteredOptions.value.find(
          ({ value }) => value === currentValue.value
        )

        return currentOption ? currentOption.label : currentValue.value?.toString()
      }

      return currentValue.value?.toString()
    })
    const hasPrefix = computed(() => {
      return !!(slots.prefix || props.prefix)
    })
    const hasSuffix = computed(() => {
      return !!(slots.suffix || props.suffix)
    })

    watch(
      () => props.value,
      value => {
        currentValue.value = value
        lastValue = value
      }
    )
    watch(currentIndex, computeHittding)
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
          optionsStates.value.forEach(state => {
            state.hidden = false
          })
        } else {
          if (typeof props.filter === 'function') {
            const filter = props.filter

            optionsStates.value.forEach(state => {
              state.hidden = !filter(value, { label: state.label, value: state.value })
            })
          } else {
            if (props.ignoreCase) {
              optionsStates.value.forEach(state => {
                state.hidden = !state.value
                  ?.toString()
                  .toLocaleLowerCase()
                  .includes(value?.toString().toLocaleLowerCase())
              })
            } else {
              optionsStates.value.forEach(state => {
                state.hidden = !state.value?.toString().includes(value?.toString())
              })
            }
          }
        }

        computeHittding()
      }
    })

    function computeHittding() {
      let index = -1

      optionsStates.value.forEach(state => {
        if (!state.hidden) {
          index += 1
          state.hitting = currentIndex.value === index
        } else {
          state.hitting = false
        }
      })
    }

    function handleSelect(value: string | number) {
      if (isNull(value)) {
        return
      }

      const prevValue = currentValue.value

      currentValue.value = value
      emit('on-select', value)

      if (value !== prevValue) {
        changed = true
        handleChange()
      } else {
        visible.value = false
      }
    }

    function handleInput(event: string | Event) {
      const value = typeof event === 'string' ? event : (event.target as HTMLInputElement).value

      visible.value = props.canDrop
      currentValue.value = value
      changed = true

      if (currentIndex.value !== -1) {
        currentIndex.value = 0
      }

      emit('on-input', value)
    }

    function handleChange() {
      if (!changed || currentValue.value === lastValue) return

      changed = false
      lastValue = currentValue.value

      emit('on-change', currentValue.value)
      emit('update:value', currentValue.value)

      if (!props.disableValidate) {
        validateField()
      }

      visible.value = false
      control.value?.blur()
    }

    function handleToggle() {
      testOptionCanDrop()

      emit('on-toggle', visible.value)

      if (!visible.value) {
        currentIndex.value = -1
      }
    }

    function testOptionCanDrop() {
      if ((!slots.default && !filteredOptions.value.length) || !props.canDrop) {
        visible.value = false
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key

      if (key === 'ArrowDown' || key === 'ArrowUp') {
        event.preventDefault()

        currentIndex.value += key === 'ArrowDown' ? 1 : key === 'ArrowUp' ? -1 : 0
        currentIndex.value = Math.min(
          Math.max(-1, currentIndex.value),
          filteredOptions.value.length - 1
        )
      } else if (!['Enter', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        // 进行了其他按键则重置
        currentIndex.value = -1
      }
    }

    function handleEnter() {
      if (filteredOptions.value.length) {
        handleSelect(
          filteredOptions.value[currentIndex.value === -1 ? 0 : currentIndex.value].value
        )
      } else {
        handleChange()
      }

      emit('on-enter', currentValue.value)
      control.value?.blur()
      visible.value = false
    }

    function handleClear() {
      if (props.clearable) {
        currentValue.value = ''
        visible.value = false

        handleChange()
        emit('on-clear')
        clearField()
      }
    }

    return {
      prefixCls: prefix,
      locale: useLocaleConfig('input'),
      currentValue,
      currentIndex,
      visible,

      rawOptions,
      inputValue,
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
