<template>
  <label :class="className">
    <span :class="`${prefix}__signal`"></span>
    <span v-if="hasLabel || hasSlot" :class="[`${prefix}__label`, labelClass]">
      <slot>{{ label }}</slot>
    </span>
    <input
      type="checkbox"
      :class="`${prefix}__input`"
      :checked="currentChecked"
      :disabled="isDisabled"
      @change="handleChange(!currentChecked)"
    />
  </label>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  inject,
  computed,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { CheckboxGroup } from '@/components/checkbox-group'
import { useConfiguredProps } from '@/common/config/install'
import { createSizeProp, createStateProp } from '@/common/config/props'
import { VALIDATE_FIELD } from '@/components/form-item'
import { noop, isDefined, isFunction } from '@/common/utils/common'
import { GROUP_STATE } from './symbol'

import type { PropType } from 'vue'
import type { GroupState } from './symbol'

type ClassType = string | Record<string, boolean>

const props = useConfiguredProps('checkbox', {
  size: createSizeProp(),
  state: createStateProp(),
  checked: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: null
  },
  value: {
    type: [String, Number],
    default: null
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
  control: {
    type: Boolean,
    default: false
  },
  partial: {
    type: Boolean,
    default: false
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Checkbox',
  props,
  emits: ['on-change', 'update:checked'],
  setup(props, { slots, emit }) {
    const groupState = inject<GroupState | null>(GROUP_STATE, null)
    const validateField = inject(VALIDATE_FIELD, noop)

    const prefix = 'vxp-checkbox'
    const currentChecked = ref(props.checked)
    const currentPartial = ref(props.partial)

    const controlState = reactive({
      checked: currentChecked,
      partial: currentPartial
    })

    const bindGroup = useBindGroupApi(controlState)

    const isDisabled = computed(() => {
      return groupState?.disabled || props.disabled
    })
    const className = computed(() => {
      return [
        prefix,
        {
          [`${prefix}--checked`]: currentChecked.value,
          [`${prefix}--disabled`]: isDisabled.value,
          [`${prefix}--${props.size}`]: props.size !== 'default',
          [`${prefix}--border`]: props.border,
          [`${prefix}--partial`]: props.control && currentPartial.value,
          [`${prefix}--${props.state}`]: props.state !== 'default'
        }
      ]
    })
    const hasLabel = computed(() => {
      return isDefined(props.label) && props.label !== ''
    })
    const hasSlot = computed(() => {
      return !!slots.default
    })
    const currentValue = computed(() => {
      return props.value ?? props.label
    })

    watch(
      () => props.checked,
      value => {
        setCurrentChecked(value)
      }
    )
    watch(
      () => props.partial,
      value => {
        currentPartial.value = value
      }
    )
    watch(currentChecked, checked => {
      emit('on-change', checked)
      emit('update:checked', checked)
    })

    if (groupState) {
      watch(
        () => props.label,
        (value, prevValue) => {
          if (!props.control && isFunction(groupState.replaceLabel)) {
            groupState.replaceLabel(prevValue, value)
          }
        }
      )
      watch(currentValue, value => {
        if (isFunction(groupState.replaceValue)) {
          groupState.replaceValue(props.label, value)
        }
      })
      watch(
        () => props.control,
        value => {
          if (value) {
            groupState.increaseControl(controlState)
          } else {
            groupState.decreaseControl(controlState)
          }
        },
        { immediate: true }
      )
      watch(
        () => groupState.currentValue,
        value => {
          if (!props.control) {
            setCurrentChecked(value.includes(currentValue.value))
          }
        },
        { immediate: true }
      )

      onMounted(() => {
        if (!props.control && isFunction(groupState.increaseItem)) {
          groupState.increaseItem(props.label, currentValue.value, currentChecked.value)
        }
      })

      onBeforeUnmount(() => {
        if (!props.control && isFunction(groupState.decreaseItem)) {
          groupState.decreaseItem(props.label)
        }
      })
    }

    function setCurrentChecked(checked: boolean) {
      if (props.control && isFunction(groupState?.handleControlChange)) {
        groupState!.handleControlChange()
      } else {
        currentChecked.value = checked
      }
    }

    function handleChange(checked: boolean) {
      setCurrentChecked(checked)

      if (!props.control && groupState) {
        isFunction(groupState.setLabelChecked) && groupState.setLabelChecked(props.label, checked)
      }

      if (!groupState && !props.disableValidate) {
        validateField()
      }
    }

    return {
      prefix,
      currentChecked,

      isDisabled,
      className,
      hasLabel,
      hasSlot,

      handleChange,

      bindGroup
    }
  }
})

function useBindGroupApi(controlState: { checked: boolean, partial: boolean }) {
  let boundGroupInstance: typeof CheckboxGroup | null

  onBeforeUnmount(() => {
    if (boundGroupInstance) {
      boundGroupInstance.decreaseControl(controlState)
    }
  })

  function bindGroup(groupInstance: typeof CheckboxGroup) {
    if (boundGroupInstance) {
      boundGroupInstance.decreaseControl(controlState)
    }

    groupInstance.increaseControl(controlState)
    boundGroupInstance = groupInstance
  }

  return bindGroup
}
</script>
