<script setup lang="ts">
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'

import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import {
  createSizeProp,
  createStateProp,
  emitEvent,
  useIcons,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { isDefined, warnOnce } from '@vexip-ui/utils'
import { radioProps } from './props'
import { GROUP_STATE } from './symbol'

import type { ChangeEvent } from './symbol'

defineOptions({ name: 'Radio' })

const _props = defineProps(radioProps)
const props = useProps('radio', _props, {
  size: createSizeProp(),
  state: createStateProp(),
  value: {
    default: null,
    static: true
  },
  label: {
    default: null,
    validator: isDefined,
    static: true
  },
  labelClass: null,
  disabled: false,
  border: null,
  tabIndex: 0,
  loading: false,
  loadingLock: false,
  name: {
    default: '',
    static: true
  },
  shape: null
})

const emit = defineEmits(['update:value'])

defineSlots<{ default: () => any }>()

const groupState = inject(GROUP_STATE, null)

const nh = useNameHelper('radio')
const icons = useIcons()
const currentValue = ref(props.value)

const input = ref<HTMLInputElement>()

const size = computed(() => groupState?.size || props.size)
const state = computed(() => groupState?.state || props.state)
const isDisabled = computed(() => groupState?.disabled || props.disabled)
const isLoading = computed(() => groupState?.loading || props.loading)
const loadingIcon = computed(() => groupState?.loadingIcon)
const isLoadingLock = computed(() => groupState?.loadingLock || false)
const loadingEffect = computed(() => groupState?.loadingEffect || '')
const shape = computed(() => {
  if (isDefined(props.border)) {
    warnOnce(
      "[vexip-ui:Radio] 'border' prop has been deprecated, please use" +
        "'border' value of 'shape' prop to replace it"
    )
  }

  return groupState?.shape || (props.shape ?? (props.border ? 'border' : 'default'))
})
const className = computed(() => {
  return [
    nh.b(),
    nh.bs('vars'),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm('checked')]: currentValue.value === props.label,
      [nh.bm('disabled')]: isDisabled.value,
      [nh.bm('loading')]: isLoading.value && isLoadingLock.value,
      [nh.bm(size.value)]: size.value !== 'default',
      // [nh.bm('border')]: isBorder.value,
      [nh.bm(state.value)]: state.value !== 'default',
      [nh.bm(shape.value)]: shape.value !== 'default' && shape.value !== 'button-group'
    }
  ]
})
const isButton = computed(() => shape.value === 'button' || shape.value === 'button-group')

watch(
  () => props.value,
  value => {
    currentValue.value = value
  }
)

if (groupState) {
  currentValue.value = groupState.currentValue

  watch(() => groupState.currentValue, emitChange)

  onMounted(() => {
    groupState.registerInput(input)
  })

  onBeforeUnmount(() => {
    groupState.unregisterInput(input)
  })
}

defineExpose({ currentValue, input })

function emitChange(value: string | number | boolean) {
  if (currentValue.value === value) return

  currentValue.value = value

  emit('update:value', value)
  emitEvent(props.onChange as ChangeEvent, value)
}

function handleChange() {
  if (isDisabled.value || (isLoading.value && isLoadingLock.value)) {
    return
  }

  emitChange(props.label)

  if (groupState && currentValue.value === props.label) {
    groupState.updateValue(currentValue.value)
  }
}
</script>

<template>
  <label :class="className">
    <input
      ref="input"
      type="radio"
      :class="nh.be('input')"
      :checked="currentValue === props.label"
      :disabled="isDisabled || (isLoading && isLoadingLock)"
      :tabindex="props.tabIndex"
      :name="props.name"
      @submit.prevent
      @change="handleChange"
      @click.stop
    />
    <span :class="[nh.be('signal'), isLoading && nh.bem('signal', 'active')]"></span>
    <span :class="[nh.be('label'), props.labelClass]">
      <CollapseTransition
        v-if="isButton"
        appear
        horizontal
        fade-effect
      >
        <div v-if="isLoading" :class="nh.be('loading')">
          <Icon
            v-bind="icons.loading"
            :effect="loadingEffect || icons.loading.effect"
            :icon="loadingIcon || icons.loading.icon"
            label="loading"
          ></Icon>
        </div>
      </CollapseTransition>
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>
