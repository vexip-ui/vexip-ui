<template>
  <label
    :id="idFor"
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
        <Icon
          :spin="props.loadingSpin"
          :pulse="!props.loadingSpin"
          :icon="props.loadingIcon"
        ></Icon>
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
      ref="input"
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
  createSizeProp,
  createStateProp,
  emitEvent
} from '@vexip-ui/config'
import { isPromise } from '@vexip-ui/utils'
import { Spinner } from '@vexip-ui/icons'
import { switchProps } from './props'

export default defineComponent({
  name: 'Switch',
  components: {
    Icon
  },
  props: switchProps,
  emits: ['update:value'],
  setup(_props, { emit }) {
    const { idFor, state, disabled, loading, size, validateField, getFieldValue, setFieldValue } =
      useFieldStore<boolean>(() => input.value?.focus())

    const props = useProps('switch', _props, {
      size: createSizeProp(size),
      state: createStateProp(state),
      value: {
        default: () => getFieldValue(false),
        static: true
      },
      disabled: () => disabled.value,
      openColor: '',
      closeColor: '',
      loading: () => loading.value,
      loadingIcon: Spinner,
      loadingSpin: false,
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

    const input = ref<HTMLElement>()

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
      emitEvent(props.onChange, value)
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
      idFor,
      currentValue,

      className,
      style,
      signalStyle,
      isDisabled,

      input,

      handleChange
    }
  }
})
</script>
