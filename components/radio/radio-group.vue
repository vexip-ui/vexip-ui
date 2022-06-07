<template>
  <div :class="className">
    <slot>
      <template v-for="item in props.options" :key="item">
        <Radio :label="item">
          {{ item }}
        </Radio>
      </template>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, inject, provide, toRef } from 'vue'
import { Radio } from '@/components/radio'
import { useProps, booleanProp, sizeProp, stateProp, createSizeProp, createStateProp } from '@vexip-ui/config'
import { VALIDATE_FIELD } from '@/components/form-item'
import { noop, debounceMinor } from '@vexip-ui/utils'
import { GROUP_STATE } from './symbol'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'RadioGroup',
  components: {
    Radio
  },
  props: {
    size: sizeProp,
    state: stateProp,
    value: [String, Number],
    vertical: booleanProp,
    disabled: booleanProp,
    button: booleanProp,
    border: booleanProp,
    options: Array as PropType<(string | number)[]>,
    disableValidate: booleanProp
  },
  emits: ['change', 'update:value'],
  setup(_props, { emit }) {
    const props = useProps('radioGroup', _props, {
      size: createSizeProp(),
      state: createStateProp(),
      value: {
        default: null,
        static: true
      },
      vertical: false,
      disabled: false,
      button: false,
      border: false,
      options: {
        default: () => [],
        static: true
      },
      disableValidate: false
    })

    const validateField = inject(VALIDATE_FIELD, noop)

    const prefix = 'vxp-radio-group'
    const currentValue = ref(props.value)

    const className = computed(() => {
      return [
        prefix,
        'vxp-radio-vars',
        {
          [`${prefix}--vertical`]: props.vertical,
          [`${prefix}--button`]: !props.vertical && props.button,
          [`${prefix}--disabled`]: props.disabled,
          [`${prefix}--${props.size}`]: props.size !== 'default',
          [`${prefix}--border`]: props.border,
          [`${prefix}--${props.state}`]: props.state !== 'default'
        }
      ]
    })

    const state = reactive({
      currentValue,
      disabled: toRef(props, 'disabled'),
      updateValue: debounceMinor(updateValue)
    })

    // 此处直接定义 reactive 会出现类型推断错误，存疑？
    provide(GROUP_STATE, state)

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

    function updateValue(value: string | number) {
      currentValue.value = value
    }

    return {
      props,
      className
    }
  }
})
</script>
