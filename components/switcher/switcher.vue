<template>
  <label :class="className" :style="style">
    <span :class="`${prefix}__signal`" :style="signalStyle">
      <slot v-if="props.loading" name="loading">
        <Icon pulse>
          <Spinner></Spinner>
        </Icon>
      </slot>
      <slot v-else name="icon">
        <Icon v-if="props.icon" :icon="props.icon"></Icon>
      </slot>
    </span>
    <span :class="`${prefix}__label`">
      <template v-if="currentValue">
        <slot name="open">{{ props.openText }}</slot>
      </template>
      <template v-else>
        <slot name="close">{{ props.closeText }}</slot>
      </template>
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
import { useProps, booleanProp, sizeProp, stateProp, createSizeProp, createStateProp } from '@vexip-ui/config'
import { isPromise, noop } from '@vexip-ui/utils'
import { Spinner } from '@vexip-ui/icons'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'Switcher',
  components: {
    Icon,
    Spinner
  },
  props: {
    size: sizeProp,
    state: stateProp,
    value: booleanProp,
    disabled: booleanProp,
    openColor: String,
    closeColor: String,
    loading: booleanProp,
    icon: Object,
    openText: String,
    closeText: String,
    onBeforeChange: Function as PropType<(checked: boolean) => unknown>,
    disableValidate: booleanProp
  },
  emits: ['change', 'update:value'],
  setup(_props, { emit }) {
    const props = useProps('switcher', _props, {
      size: createSizeProp(),
      state: createStateProp(),
      value: {
        default: false,
        static: true
      },
      disabled: false,
      openColor: '',
      closeColor: '',
      loading: false,
      icon: null,
      openText: '',
      closeText: '',
      onBeforeChange: {
        default: null,
        isFunc: true
      },
      disableValidate: false
    })

    const validateField = inject(VALIDATE_FIELD, noop)

    const prefix = 'vxp-switcher'
    const currentValue = ref(props.value)

    const className = computed(() => {
      return [
        prefix,
        `${prefix}-vars`,
        {
          [`${prefix}--open`]: currentValue.value,
          [`${prefix}--${props.size}`]: props.size !== 'default',
          [`${prefix}--${props.state}`]: props.state !== 'default',
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
      emit('change', value)
      emit('update:value', value)

      if (!props.disableValidate) {
        validateField()
      }
    })

    async function handleChange(checked = !currentValue.value) {
      if (checked === currentValue.value) return

      let result: unknown = true

      if (typeof props.onBeforeChange === 'function') {
        result = props.onBeforeChange(checked)

        if (isPromise(result)) {
          result = await result
        }
      }

      if (result !== false) {
        currentValue.value = checked
      }
    }

    return {
      props,
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
