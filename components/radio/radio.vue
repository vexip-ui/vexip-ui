<template>
  <label :class="className">
    <span :class="[nh.be('signal'), isLoading && nh.bem('signal', 'active')]"></span>
    <span :class="[nh.be('label'), props.labelClass]">
      <CollapseTransition
        v-if="isButton"
        appear
        horizontal
        fade-effect
      >
        <div v-if="isLoading" :class="nh.be('loading')">
          <Icon :effect="loadingEffect" :icon="computedLoadingIcon"></Icon>
        </div>
      </CollapseTransition>
      <slot>{{ props.label }}</slot>
    </span>
    <input
      ref="input"
      type="radio"
      :class="nh.be('input')"
      :checked="currentValue === props.label"
      :disabled="isDisabled"
      :tabindex="props.tabIndex"
      @change="handleChange"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, inject, onMounted, onBeforeUnmount } from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import {
  useNameHelper,
  useProps,
  createSizeProp,
  createStateProp,
  emitEvent
} from '@vexip-ui/config'
import { isDefined } from '@vexip-ui/utils'
import { radioProps } from './props'
import { GROUP_STATE } from './symbol'

export default defineComponent({
  name: 'Radio',
  components: {
    CollapseTransition,
    Icon
  },
  props: radioProps,
  emits: ['update:value'],
  setup(_props, { emit }) {
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
      border: false,
      tabIndex: 0,
      loading: false,
      loadingLock: false
    })

    const groupState = inject(GROUP_STATE, null)

    const nh = useNameHelper('radio')
    const currentValue = ref(props.value)

    const input = ref<HTMLElement>()

    const size = computed(() => groupState?.size || props.size)
    const state = computed(() => groupState?.state || props.state)
    const isDisabled = computed(() => groupState?.disabled || props.disabled)
    const isButton = computed(() => groupState?.button)
    const isBorder = computed(() => groupState?.border || props.border)
    const isLoading = computed(() => groupState?.loading || props.loading)
    const LoadingIcon = computed(() => groupState?.loadingIcon || null!)
    const isLoadingLock = computed(() => groupState?.loadingLock || false)
    const loadingEffect = computed(() => groupState?.loadingEffect || '')
    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('checked')]: currentValue.value === props.label,
          [nh.bm('disabled')]: isDisabled.value,
          [nh.bm('loading')]: isLoading.value && isLoadingLock.value,
          [nh.bm(size.value)]: size.value !== 'default',
          [nh.bm('border')]: isBorder.value,
          [nh.bm(state.value)]: state.value !== 'default'
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
      emitEvent(props.onChange, value)
      emit('update:value', value)

      if (groupState && value === props.label) {
        groupState.updateValue(value)
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

      onMounted(() => {
        groupState.registerInput(input)
      })

      onBeforeUnmount(() => {
        groupState.unregisterInput(input)
      })
    }

    function handleChange() {
      if (isDisabled.value || (isLoading.value && isLoadingLock.value)) {
        return
      }

      currentValue.value = props.label!
    }

    return {
      props,
      nh,
      currentValue,

      className,
      isDisabled,
      isButton,
      isLoading,
      computedLoadingIcon: LoadingIcon,
      loadingEffect,

      input,

      handleChange
    }
  }
})
</script>
