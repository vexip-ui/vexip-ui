<template>
  <label :class="className">
    <span :class="`${prefix}__signal`"></span>
    <span :class="[`${prefix}__label`, labelClass]">
      <slot>{{ label }}</slot>
    </span>
    <input
      type="radio"
      :class="`${prefix}__input`"
      :checked="currentValue === label"
      :disabled="isDisabled"
      @change="handleChange"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, inject } from 'vue'
import { useConfiguredProps, createSizeProp, createStateProp } from '@vexip-ui/config'
import { VALIDATE_FIELD } from '@/components/form-item'
import { noop } from '@vexip-ui/utils'
import { GROUP_STATE } from './symbol'

import type { PropType } from 'vue'

type ClassType = string | Record<string, boolean>

const props = useConfiguredProps('radio', {
  size: createSizeProp(),
  state: createStateProp(),
  value: {
    type: [String, Number],
    default: null
  },
  label: {
    type: [String, Number],
    required: true
  },
  labelClass: {
    type: [String, Object] as PropType<ClassType>,
    default: null
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
  }
})

export default defineComponent({
  name: 'Radio',
  props,
  emits: ['change', 'update:value'],
  setup(props, { emit }) {
    const groupState = inject(GROUP_STATE, null)
    const validateField = inject(VALIDATE_FIELD, noop)

    const prefix = 'vxp-radio'
    const currentValue = ref(props.value)

    const isDisabled = computed(() => {
      return groupState?.disabled || props.disabled
    })
    const className = computed(() => {
      return [
        prefix,
        `${prefix}-vars`,
        {
          [`${prefix}--checked`]: currentValue.value === props.label,
          [`${prefix}--disabled`]: isDisabled.value,
          [`${prefix}--${props.size}`]: props.size !== 'default',
          [`${prefix}--border`]: props.border,
          [`${prefix}--${props.state}`]: props.state !== 'default'
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
      prefix,
      currentValue,

      className,
      isDisabled,

      handleChange
    }
  }
})
</script>
