<script setup lang="ts">
import { Icon } from '@/components/icon'

import { computed, reactive, ref } from 'vue'

import {
  createIconProp,
  createSizeProp,
  createStateProp,
  emitEvent,
  useIcons,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { extendReactive } from '@vexip-ui/hooks'

import { numberInputProps } from './props'
import { useInternalNumberInput } from './hooks'

defineOptions({ name: 'NumberInput' })

const _props = defineProps(numberInputProps)
const props = useProps('numberInput', _props, {
  size: createSizeProp(undefined),
  state: createStateProp(undefined),
  locale: null,
  prefix: createIconProp(),
  prefixColor: '',
  suffix: createIconProp(),
  suffixColor: '',
  // 格式化后显示
  formatter: {
    default: null,
    isFunc: true
  },
  value: {
    default: null,
    static: true
  },
  min: -Infinity,
  max: Infinity,
  placeholder: null,
  autofocus: false,
  spellcheck: false,
  autocomplete: false,
  precision: -1,
  readonly: false,
  step: 1,
  ctrlStep: 100,
  shiftStep: 10,
  altStep: 0.1,
  disabled: null,
  controlClass: null,
  debounce: false,
  delay: null,
  clearable: false,
  loading: null,
  loadingIcon: createIconProp(),
  loadingLock: false,
  loadingEffect: null,
  sync: false,
  syncStep: false,
  controlType: 'right',
  emptyType: 'NaN',
  controlAttrs: null,
  name: {
    default: '',
    static: true
  }
})

const emit = defineEmits(['update:value'])

const slots = defineSlots<{
  prefix: () => any,
  suffix: () => any
}>()

const nh = useNameHelper('number-input')
const icons = useIcons()

const wrapper = ref<HTMLDivElement>()
const control = ref<HTMLInputElement>()

const {
  size,
  state,
  disabled,
  loading,
  idFor,
  focused,
  inputting,
  plusHolding,
  minusHolding,
  isHover,
  outOfRange,
  isReadonly,
  plusDisabled,
  minusDisabled,
  preciseNumber,
  formattedValue,
  showClear,
  focus,
  blur,

  wrapperProps,
  controlProps,
  clearButtonProps,
  plusButtonProps,
  minusButtonProps
} = useInternalNumberInput(
  extendReactive(
    props,
    reactive({
      useField: true,
      idPrefix: computed(() => nh.b()),
      onUpdateValue: (value: number) => {
        emit('update:value', value)
      }
    })
  ),
  { wrapper, control }
)

const className = computed(() => {
  const [display, fade] = (props.controlType || 'right').split('-')

  return [
    nh.b(),
    nh.bs('vars'),
    nh.ns('input-vars'),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm('focused')]: inputting.value,
      [nh.bm('disabled')]: disabled.value,
      [nh.bm('readonly')]: isReadonly.value,
      [nh.bm('loading')]: loading.value,
      [nh.bm(size.value)]: size.value !== 'default',
      [nh.bm(state.value)]: state.value !== 'default',
      [nh.bm(`control-${display}`)]: display !== 'right',
      [nh.bm('control-fade')]: fade,
      [nh.bm('out-of-range')]: outOfRange.value
    }
  ]
})
const hasPrefix = computed(() => {
  return !!(slots.prefix || props.prefix)
})
const hasSuffix = computed(() => {
  return !!(slots.suffix || props.suffix)
})

defineExpose({
  idFor,
  focused,
  isHover,
  outOfRange,
  preciseNumber,
  formattedValue,
  isReadonly,
  wrapper,
  input: control,
  focus,
  blur
})

function handlePrefixClick(event: MouseEvent) {
  emitEvent(props.onPrefixClick, event)
}

function handleSuffixClick(event: MouseEvent) {
  emitEvent(props.onSuffixClick, event)
}
</script>

<template>
  <div ref="wrapper" v-bind="wrapperProps" :class="className">
    <div
      v-if="hasPrefix"
      :class="[nh.be('icon'), nh.be('prefix')]"
      :style="{ color: props.prefixColor }"
      @click="handlePrefixClick"
    >
      <slot name="prefix">
        <Icon :icon="props.prefix"></Icon>
      </slot>
    </div>
    <input
      ref="control"
      v-bind="{ ...controlProps, ...props.controlAttrs }"
      :class="[nh.be('control'), props.controlAttrs?.class, props.controlClass]"
    />
    <div
      v-if="hasSuffix"
      :class="[nh.be('icon'), nh.be('suffix')]"
      :style="{
        color: props.suffixColor,
        opacity: showClear || loading ? '0%' : ''
      }"
      @click="handleSuffixClick"
    >
      <slot name="suffix">
        <Icon :icon="props.suffix"></Icon>
      </slot>
    </div>
    <div
      v-else-if="props.clearable || loading"
      :class="[nh.be('icon'), nh.bem('icon', 'placeholder'), nh.be('suffix')]"
    ></div>
    <Transition :name="nh.ns('fade')" appear>
      <button v-if="showClear" v-bind="clearButtonProps" :class="[nh.be('icon'), nh.be('clear')]">
        <Icon v-bind="icons.clear" label="clear"></Icon>
      </button>
      <div v-else-if="loading" :class="[nh.be('icon'), nh.be('loading')]">
        <Icon
          v-bind="icons.loading"
          :effect="props.loadingEffect || icons.loading.effect"
          :icon="props.loadingIcon || icons.loading.icon"
          label="loading"
        ></Icon>
      </div>
    </Transition>
    <template v-if="props.controlType !== 'none'">
      <button
        v-bind="plusButtonProps"
        :class="{
          [nh.be('plus')]: true,
          [nh.bem('plus', 'disabled')]: plusDisabled,
          [nh.bem('plus', 'holding')]: plusHolding
        }"
      >
        <Icon v-bind="icons.angleUp" :scale="+(icons.angleUp.scale || 1) * 0.8"></Icon>
      </button>
      <button
        v-bind="minusButtonProps"
        :class="{
          [nh.be('minus')]: true,
          [nh.bem('minus', 'disabled')]: minusDisabled,
          [nh.bem('minus', 'holding')]: minusHolding
        }"
      >
        <Icon v-bind="icons.angleDown" :scale="+(icons.angleDown.scale || 1) * 0.8"></Icon>
      </button>
    </template>
  </div>
</template>
