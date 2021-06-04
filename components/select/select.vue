<template>
  <div
    ref="wrapper"
    :class="className"
    @click="handleClick"
    @clickoutside="handleClickOutside"
  >
    <div ref="reference" :class="`${prefixCls}__trigger`">
      <slot name="control">
        <Input
          :readonly="true"
          :input-class="`${prefixCls}__input`"
          :value="currentLabel"
          :placeholder="placeholder"
          :size="size"
          :state="state"
          :disabled="disabled"
          :clearable="clearable"
          @on-focus="handleFocus"
          @on-blur="handleBlur"
          @on-clear="handleClear"
        >
          <template v-if="hasPrefix" #prefix>
            <slot name="prefix">
              <Icon :name="prefix"></Icon>
            </slot>
          </template>
          <template #suffix>
            <Icon name="chevron-down" :class="`${prefixCls}__arrow`"></Icon>
          </template>
        </Input>
      </slot>
    </div>
    <Portal :to="transferTo">
      <transition :name="transitionName" @after-enter="computeListHeight">
        <div
          v-show="currentVisible"
          ref="popper"
          :class="`${prefixCls}__popper`"
          @click.stop
        >
          <div
            :class="[`${prefixCls}__list`, listClass]"
            :style="{
              height: listHeight,
              maxHeight: `${maxListHeight}px`
            }"
          >
            <Scroll ref="scroll" use-y-bar height="100%">
              <ul :class="`${prefixCls}__options`">
                <slot>
                  <Option
                    v-for="(item, index) in rawOptions"
                    :key="index"
                    :label="item.label || item.value.toString()"
                    :value="item.value"
                  ></Option>
                </slot>
              </ul>
            </Scroll>
          </div>
        </div>
      </transition>
    </Portal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  provide,
  inject,
  toRef,
  nextTick
} from 'vue'
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import { Option, SELECTOR_STATE } from '@/components/option'
import { Scroll } from '@/components/scroll'
import { Portal } from '@/components/portal'
import { VALIDATE_FIELD, CLEAR_FIELD } from '@/components/form-item'
import { usePopper, placementWhileList } from '@/common/mixins/popper'
import { useClickOutside } from '@/common/mixins/clickoutside'
import { useConfiguredProps } from '@/common/config/install'
import { noop, isNull } from '@/common/utils/common'
import { createSizeProp, createStateProp } from '@/common/config/props'

import '@/common/icons/chevron-down'
import '@/common/icons/times-circle'

import type { PropType } from 'vue'
import type { Placement } from '@popperjs/core'
import type { OptionState, SelectState } from '@/components/option'

type ClassType = string | Record<string, boolean>
type RawOption =
  | string
  | {
      value: string | number,
      label?: string
    }

const props = useConfiguredProps('select', {
  size: createSizeProp(),
  state: createStateProp(),
  visible: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array as PropType<RawOption[]>,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  transitionName: {
    type: String,
    default: 'vxp-drop'
  },
  outsideClose: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  prefix: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number],
    default: null
  },
  multiple: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  maxListHeight: {
    type: Number,
    default: 300
  },
  listClass: {
    type: [String, Object] as PropType<ClassType>,
    default: null
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom',
    validator: (value: Placement) => {
      return placementWhileList.includes(value)
    }
  },
  transfer: {
    type: [Boolean, String],
    default: false
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Select',
  components: {
    Icon,
    Input,
    Option,
    Portal,
    Scroll
  },
  props,
  emits: [
    'on-toggle',
    'on-select',
    'on-change',
    'on-focus',
    'on-blur',
    'on-click-outside',
    'on-outside-close',
    'on-clear',
    'update:value',
    'update:visible'
  ],
  setup(props, { emit, slots }) {
    const validateField = inject(VALIDATE_FIELD, noop)
    const clearField = inject(CLEAR_FIELD, noop)

    const prefix = 'vxp-select'
    const currentVisible = ref(props.visible)
    // const focused = ref(false)
    const currentLabel = ref('')
    const currentValue = ref(props.value)
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')
    const listHeight = ref<string | undefined>(undefined)
    const optionStates = ref(new Set<OptionState>())

    const scroll = ref<InstanceType<typeof Scroll> | null>(null)
    const wrapper = useClickOutside()

    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      isDrop: true
    })

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--visible`]: !props.disabled && currentVisible.value,
        [`${prefix}--disabled`]: props.disabled,
        [`${prefix}--${props.size}`]: props.size !== 'default',
        [`${prefix}--${props.state}`]: props.state !== 'default'
      }
    })
    const hasValue = computed(() => {
      return !(isNull(currentValue.value) || currentValue.value === '')
    })
    const hasPrefix = computed(() => {
      return !!(slots.prefix || props.prefix)
    })
    const rawOptions = computed(() => {
      return props.options.map(option => {
        if (typeof option === 'string') {
          option = { value: option }
        }

        if (!option.label) {
          option.label = option.value.toString()
        }

        return option
      })
    })

    provide<SelectState>(
      SELECTOR_STATE,
      reactive({ currentValue, addOption, removeOption, handleSelect, setCurrentLabel })
    )

    watch(
      () => props.visible,
      value => {
        currentVisible.value = value
      }
    )
    watch(currentVisible, value => {
      if (value) {
        updatePopper()

        if (wrapper.value && popper.value) {
          popper.value.style.minWidth = `${wrapper.value.offsetWidth}px`
        }
      }

      emit('on-toggle', value)
      emit('update:visible', value)
    })
    watch(
      () => props.value,
      value => {
        currentValue.value = value
      }
    )
    watch(
      () => Array.from(optionStates.value).filter(state => !state.hidden).length,
      computeListHeight
    )

    function addOption(option: OptionState) {
      optionStates.value.add(option)
    }

    function removeOption(option: OptionState) {
      optionStates.value.delete(option)
    }

    function computeListHeight() {
      nextTick(() => {
        const scrollWrapper = scroll.value?.content

        if (scrollWrapper) {
          const wrapperHeight = scrollWrapper.getBoundingClientRect().height

          listHeight.value = wrapperHeight < props.maxListHeight ? undefined : `${wrapperHeight}px`
          scroll.value?.refresh()
        }
      })
    }

    function setCurrentLabel(label: string) {
      currentLabel.value = label
    }

    function handleSelect(value: string | number, label: string) {
      emit('on-select', value, label)
      handleChange(value, label)

      currentVisible.value = false
    }

    function handleChange(value: string | number, label: string) {
      if (isNull(value) || value === '') {
        currentLabel.value = ''
      } else {
        currentLabel.value = label
      }

      const prevValue = currentValue.value

      currentValue.value = value

      if (prevValue !== value) {
        emit('on-change', value, label)
        emit('update:value', value)

        if (!props.disableValidate) {
          validateField()
        }
      }
    }

    function handleClick() {
      if (props.disabled) return

      currentVisible.value = !currentVisible.value

      if (currentVisible.value && popper.value && wrapper.value) {
        popper.value.style.minWidth = `${wrapper.value.offsetWidth}`
      }
    }

    function handleFocus(event: FocusEvent) {
      // focused.value = true
      emit('on-focus', event)
    }

    function handleBlur(event: FocusEvent) {
      // focused.value = false
      emit('on-blur', event)
    }

    function handleClickOutside() {
      emit('on-click-outside')

      if (props.outsideClose && currentVisible.value) {
        currentVisible.value = false

        emit('on-outside-close')
      }
    }

    function handleClear() {
      if (props.clearable) {
        handleChange('', '')
        emit('on-clear')
        clearField()
      }
    }

    return {
      prefixCls: prefix,
      currentVisible,
      currentLabel,
      transferTo,
      listHeight,
      optionStates,

      className,
      hasValue,
      hasPrefix,
      rawOptions,

      wrapper,
      reference,
      popper,
      scroll,

      computeListHeight,
      handleClick,
      handleFocus,
      handleBlur,
      handleClickOutside,
      handleClear
    }
  }
})
</script>
