<template>
  <div :class="className">
    <slot>
      <template v-for="(item, index) in props.options" :key="index">
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
import { useProps, booleanProp, sizeProp, stateProp, createSizeProp, createStateProp } from '@vexip-ui/config'
import { VALIDATE_FIELD } from '@/components/form-item'
import { noop, isDefined, isObject, debounceMinor } from '@vexip-ui/utils'
import { GROUP_STATE } from './symbol'

import type { PropType } from 'vue'
import type { ControlState } from './symbol'

type RawOption =
  | string
  | {
      value: string | number,
      label?: string
    }

export default defineComponent({
  name: 'CheckboxGroup',
  components: {
    Checkbox
  },
  props: {
    size: sizeProp,
    state: stateProp,
    values: {
      type: Array as PropType<(string | number)[]>,
      default: () => []
    },
    vertical: booleanProp,
    disabled: booleanProp,
    border: booleanProp,
    disableValidate: booleanProp,
    options: Array as PropType<RawOption[]>
  },
  emits: ['change', 'update:values'],
  setup(_props, { emit }) {
    const props = useProps('checkboxGroup', _props, {
      size: createSizeProp(),
      state: createStateProp(),
      values: {
        default: () => [],
        static: true
      },
      vertical: false,
      disabled: false,
      border: false,
      disableValidate: false,
      options: {
        default: () => [],
        static: true
      }
    })

    const validateField = inject(VALIDATE_FIELD, noop)

    const prefix = 'vxp-checkbox-group'
    const valueMap = new Map<string, string | number>()
    const controlSet = new Set<ControlState>()
    const currentValues = ref<(string | number)[]>(props.values ?? [])
    const checkedLabels = ref(new Set<string>())

    const className = computed(() => {
      return [
        prefix,
        'vxp-checkbox-vars',
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
      currentValues.value = []

      valueMap.forEach((value, label) => {
        if (checkedLabels.value.has(label)) {
          currentValues.value.push(value)
        }
      })

      handleChange(currentValues.value)
    })

    const updateControl = debounceMinor(() => {
      const valueLength = currentValues.value.length
      const checked = valueLength === valueMap.size
      const partial = valueLength > 0 && !checked

      controlSet.forEach(state => {
        state.checked = checked
        state.partial = partial
      })
    })

    provide(
      GROUP_STATE,
      reactive({
        currentValues,
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

    watch(
      () => props.values,
      value => {
        currentValues.value = Array.from(value)
      },
      { deep: true }
    )
    watch(currentValues, () => {
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

      if (currentValues.value.length === allLabels.length) {
        checkedLabels.value.clear()
      } else {
        // 重新实例化以保持 item 顺序
        checkedLabels.value = new Set(allLabels)
      }

      updateValue()
      updateControl()
    }

    function handleChange(value: (string | number)[]) {
      emit('change', value)
      emit('update:values', value)

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
      props,
      className,

      isObject,
      increaseControl,
      decreaseControl
    }
  }
})
</script>
