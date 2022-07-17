<template>
  <label
    :class="className"
    role="switch"
    :aria-checked="currentValue"
    :style="style"
  >
    <span :class="nh.be('placeholder')">
      <span :class="nh.be('open-text')">
        <slot name="open">{{ props.openText }}</slot>
      </span>
      <span :class="nh.be('close-text')">
        <slot name="close">{{ props.closeText }}</slot>
      </span>
    </span>
    <span :class="nh.be('signal')" :style="signalStyle">
      <slot v-if="props.loading" name="loading">
        <Icon pulse>
          <Spinner></Spinner>
        </Icon>
      </slot>
      <slot v-else name="icon" :value="currentValue">
        <Icon v-if="currentValue && props.openIcon" :icon="props.openIcon"></Icon>
        <Icon v-else-if="!currentValue && props.closeIcon" :icon="props.closeIcon"></Icon>
      </slot>
    </span>
    <span :class="nh.be('label')">
      <span v-if="currentValue" :class="nh.be('open-text')">
        <slot name="open">{{ props.openText }}</slot>
      </span>
      <span v-else :class="nh.be('close-text')">
        <slot name="close">{{ props.closeText }}</slot>
      </span>
    </span>
    <input
      type="checkbox"
      :class="nh.be('input')"
      :checked="currentValue"
      :disabled="isDisabled"
      @change="handleChange()"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { useFieldStore } from '@/components/form'
import {
  useNameHelper,
  useProps,
  booleanProp,
  sizeProp,
  stateProp,
  createSizeProp,
  createStateProp
} from '@vexip-ui/config'
import { isPromise } from '@vexip-ui/utils'
import { Spinner } from '@vexip-ui/icons'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'Switch',
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
    openIcon: Object,
    closeIcon: Object,
    openText: String,
    closeText: String,
    onBeforeChange: Function as PropType<(checked: boolean) => unknown>
  },
  emits: ['change', 'update:value'],
  setup(_props, { emit }) {
    const { state, validateField, getFieldValue, setFieldValue } = useFieldStore<boolean>()

    const props = useProps('switch', _props, {
      size: createSizeProp(),
      state: createStateProp(state),
      value: {
        default: () => getFieldValue(false),
        static: true
      },
      disabled: false,
      openColor: '',
      closeColor: '',
      loading: false,
      icon: null,
      openIcon: null,
      closeIcon: null,
      openText: '',
      closeText: '',
      onBeforeChange: {
        default: null,
        isFunc: true
      }
    })

    const nh = useNameHelper('switch')
    const currentValue = ref(props.value)

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('open')]: currentValue.value,
          [nh.bm(props.size)]: props.size !== 'default',
          [nh.bm(props.state)]: props.state !== 'default',
          [nh.bm('disabled')]: props.disabled,
          [nh.bm('loading')]: props.loading
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
      setFieldValue(value)
      emit('change', value)
      emit('update:value', value)
      validateField()
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
      nh,
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
