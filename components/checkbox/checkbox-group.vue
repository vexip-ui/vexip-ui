<template>
  <div :class="className">
    <slot>
      <template v-for="(item, index) in options" :key="index">
        <Checkbox v-if="isObject(item)" :value="item.value">
          {{ item.label || item.value }}
        </Checkbox>
        <Checkbox v-else :value="item">
          {{ item }}
        </Checkbox>
      </template>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, provide, reactive, toRef, computed, watch } from 'vue'
import { Checkbox } from '@/components/checkbox'
import { useConfiguredProps } from '@/common/config/install'
import { createSizeProp, createStateProp } from '@/common/config/props'
import { VALIDATE_FIELD } from '@/components/form-item'
import { noop, isDefined, isObject } from '@/common/utils/common'
import { debounceMinor } from '@/common/utils/performance'
import { GROUP_STATE } from './symbol'

import type { PropType } from 'vue'
import type { ControlState, GroupState } from './symbol'

type RawOption =
  | string
  | {
      value: string | number,
      label?: string
    }

const props = useConfiguredProps('checkboxGroup', {
  size: createSizeProp(),
  state: createStateProp(),
  value: {
    type: Array as PropType<(string | number)[]>,
    default() {
      return []
    }
  },
  vertical: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  disableValidate: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array as PropType<RawOption[]>,
    default() {
      return []
    }
  }
})

export default defineComponent({
  name: 'CheckboxGroup',
  components: {
    Checkbox
  },
  props,
  emits: ['on-change', 'update:value'],
  setup(props, { emit }) {
    const validateField = inject(VALIDATE_FIELD, noop)

    const prefix = 'vxp-checkbox-group'
    const valueMap = new Map<string, string | number>()
    const controlSet = new Set<ControlState>()
    const currentValue = ref<(string | number)[]>(props.value ?? [])
    const checkedLabels = ref(new Set<string>())

    const className = computed(() => {
      return [
        prefix,
        {
          [`${prefix}--vertical`]: props.vertical,
          [`${prefix}--disabled`]: props.disabled,
          [`${prefix}--${props.size}`]: props.size !== 'default',
          [`${prefix}--border`]: props.border,
          [`${prefix}--${props.state}`]: props.state !== 'default'
        }
      ]
    })

    const updateValue = debounceMinor(() => {
      currentValue.value = []

      valueMap.forEach((value, label) => {
        if (checkedLabels.value.has(label)) {
          currentValue.value.push(value)
        }
      })

      handleChange(currentValue.value)
    })

    const updateControl = debounceMinor(() => {
      const valueLength = currentValue.value.length
      const checked = valueLength === valueMap.size
      const partial = valueLength > 0 && !checked

      controlSet.forEach(state => {
        state.checked = checked
        state.partial = partial
      })
    })

    provide<GroupState>(
      GROUP_STATE,
      reactive({
        currentValue,
        disabled: toRef(props, 'disabled'),
        increaseItem,
        decreaseItem,
        increaseControl,
        decreaseControl,
        handleControlChange,
        setLabelChecked,
        replaceLabel,
        replaceValue
      })
    )

    watch(currentValue, () => {
      updateControl()
    })

    function increaseItem(label: string, value: string | number, checked = false) {
      valueMap.set(label, value)

      if (checked) {
        checkedLabels.value.add(label)
      }
    }

    function decreaseItem(label: string) {
      valueMap.delete(label)
    }

    function increaseControl(state: ControlState) {
      controlSet.add(state)
      updateControl()
    }

    function decreaseControl(state: ControlState) {
      controlSet.delete(state)
    }

    function setLabelChecked(label: string, checked: boolean) {
      if (!isDefined(label) || !valueMap.has(label)) return

      if (checked) {
        checkedLabels.value.add(label)
      } else {
        checkedLabels.value.delete(label)
      }

      updateValue()
      updateControl()
    }

    function handleControlChange() {
      // 在 group 层进行更新, 未选满则全选, 反之全不选
      const allLabels = Array.from(valueMap.keys())

      if (currentValue.value.length === allLabels.length) {
        checkedLabels.value.clear()
      } else {
        // 重新实例化以保持 item 顺序
        checkedLabels.value = new Set(allLabels)
      }

      updateValue()
      updateControl()
    }

    function handleChange(value: (string | number)[]) {
      emit('on-change', value)
      emit('update:value', value)

      if (!props.disableValidate) {
        validateField()
      }
    }

    function replaceLabel(oldLabel: string, newLabel: string) {
      if (valueMap.has(oldLabel)) {
        const value = valueMap.get(oldLabel)!

        valueMap.delete(oldLabel)
        isDefined(newLabel) && valueMap.set(newLabel, value)
      }

      if (checkedLabels.value.has(oldLabel)) {
        checkedLabels.value.delete(oldLabel)
        isDefined(newLabel) && checkedLabels.value.add(newLabel)
      }
    }

    function replaceValue(label: string, value: string | number) {
      if (isDefined(label) && valueMap.has(label)) {
        valueMap.set(label, value)
      }
    }

    return {
      className,

      isObject,
      increaseControl,
      decreaseControl
    }
  }
})
</script>
