<template>
  <label :class="className">
    <span :class="nh.be('signal')"></span>
    <span v-if="hasLabel || hasSlot" :class="[nh.be('label'), props.labelClass]">
      <slot>{{ props.label }}</slot>
    </span>
    <input
      type="checkbox"
      :class="nh.be('input')"
      :checked="currentChecked"
      :disabled="isDisabled"
      @change="handleChange(!currentChecked)"
    />
  </label>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  inject,
  computed,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue'
import {
  useNameHelper,
  useProps,
  booleanProp,
  sizeProp,
  stateProp,
  createSizeProp,
  createStateProp,
  classProp
} from '@vexip-ui/config'
import { useFieldStore } from '@/components/form'
import { isDefined, isFunction } from '@vexip-ui/utils'
import { GROUP_STATE } from './symbol'

export default defineComponent({
  name: 'Checkbox',
  props: {
    size: sizeProp,
    state: stateProp,
    checked: booleanProp,
    label: String,
    value: [String, Number],
    labelClass: classProp,
    disabled: booleanProp,
    border: booleanProp,
    control: booleanProp,
    partial: booleanProp,
    disableValidate: booleanProp
  },
  emits: ['change', 'update:checked'],
  setup(_props, { slots, emit }) {
    const { state, validateField, getFieldValue, setFieldValue } = useFieldStore<boolean>()

    const props = useProps('checkbox', _props, {
      size: createSizeProp(),
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
      disabled: false,
      border: false,
      control: false,
      partial: false,
      disableValidate: false
    })

    const groupState = inject(GROUP_STATE, null)

    const nh = useNameHelper('checkbox')
    const currentChecked = ref(props.checked)
    const currentPartial = ref(props.partial)

    const controlState = reactive({
      checked: currentChecked,
      partial: currentPartial
    })

    const size = computed(() => groupState?.size || props.size)
    const computedState = computed(() => groupState?.state || props.state)
    const isDisabled = computed(() => groupState?.disabled || props.disabled)
    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('checked')]: currentChecked.value,
          [nh.bm('disabled')]: isDisabled.value,
          [nh.bm(size.value)]: size.value !== 'default',
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
    watch(currentChecked, checked => {
      setFieldValue(checked)
      emit('change', checked)
      emit('update:checked', checked)
    })

    if (groupState) {
      watch(currentValue, (value, prevValue) => {
        if (isFunction(groupState.replaceValue)) {
          groupState.replaceValue(prevValue, value)
        }
      })
      watch(
        () => props.control,
        value => {
          if (value) {
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
        if (!props.control && isFunction(groupState.increaseItem)) {
          groupState.increaseItem(currentValue.value, currentChecked.value)
        }
      })

      onBeforeUnmount(() => {
        if (!props.control && isFunction(groupState.decreaseItem)) {
          groupState.decreaseItem(currentValue.value)
        }
      })
    }

    function setCurrentChecked(checked: boolean) {
      if (props.control && isFunction(groupState?.handleControlChange)) {
        groupState!.handleControlChange()
      } else {
        currentChecked.value = checked
      }
    }

    function handleChange(checked: boolean) {
      setCurrentChecked(checked)

      if (!props.control && groupState) {
        isFunction(groupState.setItemChecked) &&
          groupState.setItemChecked(currentValue.value, checked)
      }

      if (!groupState && !props.disableValidate) {
        validateField()
      }
    }

    return {
      props,
      nh,
      currentChecked,

      isDisabled,
      className,
      hasLabel,
      hasSlot,

      handleChange
    }
  }
})
</script>
