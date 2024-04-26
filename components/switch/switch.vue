<script setup lang="ts">
import { Icon } from '@/components/icon'
import { useFieldStore } from '@/components/form'

import { computed, ref, watch } from 'vue'

import {
  createIconProp,
  createSizeProp,
  createStateProp,
  emitEvent,
  useIcons,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { isPromise } from '@vexip-ui/utils'
import { switchProps } from './props'

defineOptions({ name: 'Switch' })

const {
  idFor,
  labelId,
  state,
  disabled,
  loading,
  size,
  validateField,
  getFieldValue,
  setFieldValue
} = useFieldStore<boolean>(() => input.value?.focus())

const _props = defineProps(switchProps)
const props = useProps('switch', _props, {
  size: createSizeProp(size),
  state: createStateProp(state),
  value: {
    default: () => getFieldValue(),
    static: true
  },
  disabled: () => disabled.value,
  openColor: '',
  closeColor: '',
  loading: () => loading.value,
  loadingIcon: createIconProp(),
  loadingEffect: null,
  openIcon: createIconProp(),
  closeIcon: createIconProp(),
  openText: '',
  closeText: '',
  onBeforeChange: {
    default: null,
    isFunc: true
  },
  rectangle: false,
  name: {
    default: '',
    static: true
  }
})

const emit = defineEmits(['update:value'])

const nh = useNameHelper('switch')
const icons = useIcons()
const currentValue = ref(props.value)

const input = ref<HTMLInputElement>()

const className = computed(() => {
  return [
    nh.b(),
    nh.bs('vars'),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm('open')]: currentValue.value,
      [nh.bm(props.size)]: props.size !== 'default',
      [nh.bm(props.state)]: props.state !== 'default',
      [nh.bm('disabled')]: props.disabled,
      [nh.bm('loading')]: props.loading,
      [nh.bm('rectangle')]: props.rectangle
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

defineExpose({
  idFor,
  labelId,
  currentValue,
  input,
  focus: (options?: FocusOptions) => input.value?.focus(options),
  blur: () => input.value?.blur()
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

    emit('update:value', checked)
    setFieldValue(checked)
    emitEvent(props.onChange, checked)
    validateField()
  }
}
</script>

<template>
  <label
    :id="idFor"
    :class="className"
    role="switch"
    :aria-checked="currentValue"
    :aria-disabled="isDisabled"
    :aria-labelledby="labelId"
    :style="style"
  >
    <input
      ref="input"
      type="checkbox"
      :class="nh.be('input')"
      :checked="currentValue"
      :disabled="isDisabled"
      :name="props.name"
      @submit.prevent
      @change="handleChange()"
      @click.stop
    />
    <span :class="nh.be('placeholder')" aria-hidden>
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
          v-bind="icons.loading"
          :effect="props.loadingEffect || icons.loading.effect"
          :icon="props.loadingIcon || icons.loading.icon"
          label="loading"
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
  </label>
</template>
