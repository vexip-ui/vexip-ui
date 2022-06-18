<template>
  <label :class="className">
    <span :class="nh.be('signal')"></span>
    <span :class="[nh.be('label'), props.labelClass]">
      <slot>{{ props.label }}</slot>
    </span>
    <input
      type="radio"
      :class="nh.be('input')"
      :checked="currentValue === props.label"
      :disabled="isDisabled"
      @change="handleChange"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, inject } from 'vue'
import { useNameHelper, useProps, booleanProp, sizeProp, stateProp, createSizeProp, createStateProp } from '@vexip-ui/config'
import { VALIDATE_FIELD } from '@/components/form-item'
import { isDefined, noop } from '@vexip-ui/utils'
import { GROUP_STATE } from './symbol'

import type { PropType } from 'vue'

type ClassType = string | Record<string, boolean>

export default defineComponent({
  name: 'Radio',
  props: {
    size: sizeProp,
    state: stateProp,
    value: [String, Number],
    label: [String, Number],
    labelClass: [String, Object] as PropType<ClassType>,
    disabled: booleanProp,
    border: booleanProp,
    disableValidate: booleanProp
  },
  emits: ['change', 'update:value'],
  setup(_props, { emit }) {
    const props = useProps('radio', _props, {
      size: createSizeProp(),
      state: createStateProp(),
      value: {
        default: null,
        static: true
      },
      label: {
        default: null,
        validator: (value: string | number) => isDefined(value),
        static: true
      },
      labelClass: null,
      disabled: false,
      border: false,
      disableValidate: false
    })

    const groupState = inject(GROUP_STATE, null)
    const validateField = inject(VALIDATE_FIELD, noop)

    const nh = useNameHelper('radio')
    const currentValue = ref(props.value)

    const isDisabled = computed(() => {
      return groupState?.disabled || props.disabled
    })
    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('checked')]: currentValue.value === props.label,
          [nh.bm('disabled')]: isDisabled.value,
          [nh.bm(props.size)]: props.size !== 'default',
          [nh.bm('border')]: props.border,
          [nh.bm(props.state)]: props.state !== 'default'
        }
      ]
    })

    watch(
      () => props.value,
      value => {
        currentValue.value = value
      }
    )
    watch(currentValue, value => {
      emit('change', value)
      emit('update:value', value)

      if (groupState && value === props.label) {
        groupState.updateValue(value)
      }

      if (!groupState && !props.disableValidate) {
        validateField()
      }
    })

    if (groupState) {
      watch(
        () => groupState.currentValue,
        value => {
          currentValue.value = value
        },
        { immediate: true }
      )
    }

    function handleChange() {
      currentValue.value = props.label!
    }

    return {
      props,
      nh,
      currentValue,

      className,
      isDisabled,

      handleChange
    }
  }
})
</script>
