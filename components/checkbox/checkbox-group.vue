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
import { defineComponent, ref, provide, reactive, toRef, computed, watch } from 'vue'
import { Checkbox } from '@/components/checkbox'
import {
  useNameHelper,
  useProps,
  booleanProp,
  sizeProp,
  stateProp,
  createSizeProp,
  createStateProp
} from '@vexip-ui/config'
import { useFieldStore } from '@/components/form'
import { isDefined, isObject, debounceMinor } from '@vexip-ui/utils'
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
    value: Array as PropType<(string | number)[]>,
    vertical: booleanProp,
    disabled: booleanProp,
    border: booleanProp,
    options: Array as PropType<RawOption[]>
  },
  emits: ['change', 'update:values'],
  setup(_props, { emit }) {
    const { state, validateField, getFieldValue, setFieldValue } =
      useFieldStore<(string | number)[]>()

    const props = useProps('checkboxGroup', _props, {
      size: createSizeProp(),
      state: createStateProp(state),
      value: {
        default: () => getFieldValue([]),
        static: true
      },
      vertical: false,
      disabled: false,
      border: false,
      options: {
        default: () => [],
        static: true
      }
    })

    const nh = useNameHelper('checkbox-group')
    const valueMap = new Map<string | number, boolean>()
    const controlSet = new Set<ControlState>()
    const currentValues = ref<(string | number)[]>(props.value || [])

    const className = computed(() => {
      return [
        nh.b(),
        nh.ns('checkbox-vars'),
        {
          [nh.bm('vertical')]: props.vertical,
          [nh.bm('disabled')]: props.disabled,
          [nh.bm(props.size)]: props.size !== 'default',
          [nh.bm('border')]: props.border,
          [nh.bm(props.state)]: props.state !== 'default'
        }
      ]
    })

    const updateValue = debounceMinor(() => {
      currentValues.value = []

      valueMap.forEach((checked, value) => {
        if (checked) {
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
        size: toRef(props, 'size'),
        state: toRef(props, 'state'),
        disabled: toRef(props, 'disabled'),
        increaseItem,
        decreaseItem,
        increaseControl,
        decreaseControl,
        handleControlChange,
        setItemChecked,
        replaceValue
      })
    )

    watch(
      () => props.value,
      value => {
        currentValues.value = Array.from(value)
      },
      { deep: true }
    )
    watch(currentValues, () => {
      updateControl()
    })

    function increaseItem(value: string | number, checked = false) {
      valueMap.set(value, checked)
    }

    function decreaseItem(value: string | number) {
      valueMap.delete(value)
    }

    function increaseControl(state: ControlState) {
      controlSet.add(state)
      updateControl()
    }

    function decreaseControl(state: ControlState) {
      controlSet.delete(state)
    }

    function setItemChecked(value: string | number, checked: boolean) {
      if (!isDefined(value) || !valueMap.has(value)) return

      valueMap.set(value, checked)
      updateValue()
      updateControl()
    }

    function handleControlChange() {
      // 在 group 层进行更新, 未选满则全选, 反之全不选
      const allValues = Array.from(valueMap.keys())
      const checked = currentValues.value.length === allValues.length

      allValues.forEach(value => {
        valueMap.set(value, checked)
      })

      updateValue()
      updateControl()
    }

    function handleChange(value: (string | number)[]) {
      setFieldValue(value)
      emit('change', value)
      emit('update:values', value)
      validateField()
    }

    function replaceValue(prevValue: string | number, newValue: string | number) {
      if (
        isDefined(prevValue) &&
        isDefined(newValue) &&
        prevValue !== newValue &&
        valueMap.has(prevValue)
      ) {
        valueMap.set(newValue, valueMap.get(prevValue)!)
        valueMap.delete(prevValue)
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
