<template>
  <label :class="className" :style="style">
    <span :class="`${prefix}__signal`" :style="signalStyle">
      <slot v-if="loading" name="loading">
        <Icon name="spinner" pulse></Icon>
      </slot>
    </span>
    <span v-if="currentValue" :class="`${prefix}__label`">
      <slot name="open">{{ openText }}</slot>
    </span>
    <span v-else :class="`${prefix}__label`">
      <slot name="close">{{ closeText }}</slot>
    </span>
    <input
      type="checkbox"
      :class="`${prefix}__input`"
      :checked="currentValue"
      :disabled="isDisabled"
      @change="handleChange()"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, inject } from 'vue'
import { Icon } from '@/components/icon'
import { VALIDATE_FIELD } from '@/components/form-item'
import { useConfiguredProps, createSizeProp } from '@vexip-ui/config'
import { isPromise, noop } from '@vexip-ui/utils'

import '@/common/icons/spinner'

import type { PropType } from 'vue'

const props = useConfiguredProps('switcher', {
  size: createSizeProp(),
  value: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  openColor: {
    type: String,
    default: ''
  },
  closeColor: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  openText: {
    type: String,
    default: ''
  },
  closeText: {
    type: String,
    default: ''
  },
  beforeChange: {
    type: Function as PropType<(checked: boolean) => unknown>,
    default: null
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Switcher',
  components: {
    Icon
  },
  props,
  emits: ['on-change', 'update:value'],
  setup(props, { emit }) {
    const validateField = inject(VALIDATE_FIELD, noop)

    const prefix = 'vxp-switcher'
    const currentValue = ref(props.value)

    const className = computed(() => {
      return [
        prefix,
        {
          [`${prefix}--open`]: currentValue.value,
          [`${prefix}--${props.size}`]: props.size !== 'default',
          [`${prefix}--disabled`]: props.disabled,
          [`${prefix}--loading`]: props.loading
        }
      ]
    })
    const style = computed(() => {
      return {
        backgroundColor: currentValue.value ? props.openColor : props.closeColor
      }
    })
    const signalStyle = computed(() => {
      return {
        color: currentValue.value ? props.openColor : props.closeColor
      }
    })
    const isDisabled = computed(() => {
      return props.disabled || props.loading
    })

    watch(
      () => props.value,
      value => {
        currentValue.value = value
      }
    )
    watch(currentValue, value => {
      emit('on-change', value)
      emit('update:value', value)

      if (!props.disableValidate) {
        validateField()
      }
    })

    async function handleChange(checked = !currentValue.value) {
      if (checked === currentValue.value) return

      let result: unknown = true

      if (typeof props.beforeChange === 'function') {
        result = props.beforeChange(checked)

        if (isPromise(result)) {
          result = await result
        }
      }

      if (result !== false) {
        currentValue.value = checked
      }
    }

    return {
      prefix,
      currentValue,

      className,
      style,
      signalStyle,
      isDisabled,

      handleChange
    }
  }
})
</script>
