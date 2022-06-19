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
import { VALIDATE_FIELD } from '@/components/form-item'
import { noop, isDefined, isFunction } from '@vexip-ui/utils'
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
    const props = useProps('checkbox', _props, {
      size: createSizeProp(),
      state: createStateProp(),
      checked: false,
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
    const validateField = inject(VALIDATE_FIELD, noop)

    const nh = useNameHelper('checkbox')
    const currentChecked = ref(props.checked)
    const currentPartial = ref(props.partial)

    const controlState = reactive({
      checked: currentChecked,
      partial: currentPartial
    })

    const isDisabled = computed(() => {
      return groupState?.disabled || props.disabled
    })
    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('checked')]: currentChecked.value,
          [nh.bm('disabled')]: isDisabled.value,
          [nh.bm(props.size)]: props.size !== 'default',
          [nh.bm('border')]: props.border,
          [nh.bm('partial')]: props.control && currentPartial.value,
          [nh.bm(props.state)]: props.state !== 'default'
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
      emit('change', checked)
      emit('update:checked', checked)
    })

    if (groupState) {
      watch(
        () => props.label,
        (value, prevValue) => {
          if (!props.control && isFunction(groupState.replaceLabel)) {
            groupState.replaceLabel(prevValue, value)
          }
        }
      )
      watch(currentValue, value => {
        if (isFunction(groupState.replaceValue)) {
          groupState.replaceValue(props.label, value)
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
          groupState.increaseItem(props.label, currentValue.value, currentChecked.value)
        }
      })

      onBeforeUnmount(() => {
        if (!props.control && isFunction(groupState.decreaseItem)) {
          groupState.decreaseItem(props.label)
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
        isFunction(groupState.setLabelChecked) && groupState.setLabelChecked(props.label, checked)
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
