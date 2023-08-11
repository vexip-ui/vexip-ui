<template>
  <label :class="className" :aria-disabled="isDisabled" @click="handleClick">
    <input
      ref="input"
      type="checkbox"
      :class="nh.be('input')"
      :checked="currentChecked"
      :disabled="isDisabled"
      :tabindex="props.tabIndex"
      @submit.prevent
      @change="handleChange(!currentChecked)"
      @click.stop
    />
    <span :class="[nh.be('signal'), isLoading && nh.bem('signal', 'active')]"></span>
    <span v-if="hasLabel || hasSlot" :class="[nh.be('label'), props.labelClass]">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import { useFieldStore } from '@/components/form'

import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch
} from 'vue'

import {
  createSizeProp,
  createStateProp,
  emitEvent,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { isDefined, isFunction } from '@vexip-ui/utils'
import { checkboxProps } from './props'
import { GROUP_STATE } from './symbol'

export default defineComponent({
  name: 'Checkbox',
  props: checkboxProps,
  emits: ['update:checked'],
  setup(_props, { slots, emit }) {
    const { idFor, state, disabled, loading, size, validateField, getFieldValue, setFieldValue } =
      useFieldStore<boolean>(() => input.value?.focus())

    const props = useProps('checkbox', _props, {
      size: createSizeProp(size),
      state: createStateProp(state),
      checked: {
        default: () => getFieldValue(false),
        static: true
      },
      label: null,
      value: {
        default: null,
        static: true
      },
      labelClass: null,
      disabled: () => disabled.value,
      border: false,
      control: false,
      partial: false,
      tabIndex: 0,
      loading: () => loading.value,
      loadingLock: false
    })

    const groupState = inject(GROUP_STATE, null)

    const nh = useNameHelper('checkbox')
    const currentChecked = ref(props.checked)
    const currentPartial = ref(props.partial)

    const input = ref<HTMLInputElement>()

    const controlState = reactive({
      checked: currentChecked,
      partial: currentPartial
    })

    const computedSize = computed(() => groupState?.size || props.size)
    const computedState = computed(() => groupState?.state || props.state)
    const isDisabled = computed(() => groupState?.disabled || props.disabled)
    const isLoading = computed(() => groupState?.loading || props.loading)
    const isLoadingLock = computed(() => groupState?.loadingLock || props.loadingLock)
    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('inherit')]: props.inherit,
          [nh.bm('checked')]: currentChecked.value,
          [nh.bm('disabled')]: isDisabled.value,
          [nh.bm('loading')]: isLoading.value && isLoadingLock.value,
          [nh.bm(computedSize.value)]: computedSize.value !== 'default',
          [nh.bm('border')]: props.border,
          [nh.bm('partial')]: props.control && currentPartial.value,
          [nh.bm(computedState.value)]: computedState.value !== 'default'
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

    if (groupState) {
      let increased = false

      watch(currentValue, (value, prevValue) => {
        if (isFunction(groupState.replaceValue)) {
          groupState.replaceValue(prevValue, value)
        }
      })
      watch(
        () => props.control,
        value => {
          if (value) {
            if (increased) {
              groupState.decreaseItem(currentValue.value, input)
              increased = false
            }

            groupState.increaseControl(controlState)
          } else {
            groupState.decreaseControl(controlState)
          }
        },
        { immediate: true }
      )
      watch(
        () => groupState.currentValues,
        value => {
          if (!props.control) {
            setCurrentChecked(value.includes(currentValue.value))
          }
        },
        { immediate: true }
      )

      onMounted(() => {
        if (!props.control) {
          groupState.increaseItem(currentValue.value, currentChecked.value, input)
          increased = true
        }
      })

      onBeforeUnmount(() => {
        if (!props.control) {
          groupState.decreaseItem(currentValue.value, input)
        } else {
          groupState.decreaseControl(controlState)
        }
      })
    }

    function emitCheckEvent() {
      const checked = currentChecked.value

      emit('update:checked', checked)
      setFieldValue(checked)
      emitEvent(props.onChange, checked)
    }

    function setCurrentChecked(checked: boolean) {
      if (props.control && isFunction(groupState?.handleControlChange)) {
        groupState!.handleControlChange()
      } else if (currentChecked.value !== checked) {
        currentChecked.value = checked
        emitCheckEvent()
      }
    }

    function handleChange(checked: boolean) {
      if (isDisabled.value || (isLoading.value && isLoadingLock.value)) {
        return
      }

      setCurrentChecked(checked)

      if (!props.control && groupState) {
        isFunction(groupState.setItemChecked) &&
          groupState.setItemChecked(currentValue.value, checked)
      }

      if (!groupState) {
        validateField()
      }
    }

    function handleClick(event: MouseEvent) {
      emitEvent(props.onClick, event)
    }

    return {
      props,
      nh,
      idFor,
      currentChecked,

      isDisabled,
      className,
      hasLabel,
      hasSlot,
      isLoading,

      input,

      handleChange,
      handleClick,

      focus: (options?: FocusOptions) => input.value?.focus(options),
      blur: () => input.value?.blur()
    }
  }
})
</script>
