<template>
  <div
    ref="wrapper"
    :class="className"
    @click="handleClick"
    @clickoutside="handleClickOutside"
  >
    <div ref="reference" :class="`${prefixCls}__control`" :style="controlStyle">
      <div v-if="hasPrefix" :class="`${prefixCls}__icon--prefix`" :style="{ color: prefixColor }">
        <slot name="prefix">
          <Icon :icon="prefix"></Icon>
        </slot>
      </div>
      <slot name="control">
        <template v-if="multiple && Array.isArray(currentValue)">
          <Tag
            v-for="(item, index) in currentValue"
            :key="index"
            :class="`${prefixCls}__tag`"
            closable
            @click.stop="handleClick"
            @on-close="handleSelect(item, currentLabel[index])"
          >
            {{ currentLabel[index] }}
          </Tag>
        </template>
        <template v-else>
          {{ currentLabel }}
        </template>
        <span
          v-if="(placeholder ?? locale.placeholder) && !hasValue"
          :class="`${prefixCls}__placeholder`"
          :style="placeholderStyle"
        >
          {{ placeholder ?? locale.placeholder }}
        </span>
      </slot>
      <transition name="vxp-fade">
        <div
          v-if="!disabled && clearable && isHover && hasValue"
          :class="`${prefixCls}__clear`"
          @click.stop="handleClear"
        >
          <Icon><CircleXmark></CircleXmark></Icon>
        </div>
        <div
          v-else-if="!noSuffix"
          :class="`${prefixCls}__icon--suffix`"
          :style="{ color: suffixColor }"
        >
          <slot name="suffix">
            <Icon :icon="suffix || ChevronDown"></Icon>
          </slot>
        </div>
      </transition>
    </div>
    <Portal :to="transferTo">
      <transition :name="transitionName" @after-enter="computeListHeight">
        <div
          v-show="currentVisible"
          ref="popper"
          :class="[`${prefixCls}__popper`, `${prefixCls}-vars`]"
          @click.stop
        >
          <div
            :class="[`${prefixCls}__list`, listClass]"
            :style="{
              height: listHeight,
              maxHeight: `${maxListHeight}px`
            }"
          >
            <Scroll
              v-show="effectiveCount"
              ref="scroll"
              use-y-bar
              height="100%"
            >
              <ul
                :class="[
                  `${prefixCls}__options`,
                  optionCheck ? `${prefixCls}__options--has-check` : ''
                ]"
              >
                <slot>
                  <Option
                    v-for="(item, index) in rawOptions"
                    :key="index"
                    :label="item.label || item.value.toString()"
                    :value="item.value"
                  >
                    <template #default="{ selected }">
                      <span :class="`${prefixCls}__label`">
                        {{ item.label || item.value.toString() }}
                      </span>
                      <transition v-if="optionCheck" name="vxp-fade" appear>
                        <Icon v-if="selected" :class="`${prefixCls}__check`">
                          <Check></Check>
                        </Icon>
                      </transition>
                    </template>
                  </Option>
                </slot>
              </ul>
            </Scroll>
            <slot v-if="hasEmptyTip" name="empty">
              <div :class="`${prefixCls}__empty`">
                {{ emptyText ?? locale.empty }}
              </div>
            </slot>
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
import { Option, SELECTOR_STATE } from '@/components/option'
import { Portal } from '@/components/portal'
import { Scroll } from '@/components/scroll'
import { Tag } from '@/components/tag'
import { VALIDATE_FIELD, CLEAR_FIELD } from '@/components/form-item'
import { useHover, usePopper, placementWhileList, useClickOutside } from '@vexip-ui/mixins'
import { useConfiguredProps, useLocaleConfig, createSizeProp, createStateProp } from '@vexip-ui/config'
import { noop, isNull } from '@vexip-ui/utils'
import { ChevronDown, Check, CircleXmark } from '@vexip-ui/icons'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'
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
    default: null
  },
  prefix: {
    type: Object,
    default: null
  },
  prefixColor: {
    type: String,
    default: ''
  },
  suffix: {
    type: Object,
    default: null
  },
  suffixColor: {
    type: String,
    default: ''
  },
  noSuffix: {
    type: Boolean,
    default: false
  },
  value: {
    type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
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
  },
  optionCheck: {
    type: Boolean,
    default: false
  },
  emptyText: {
    type: String,
    default: null
  }
})

export default defineComponent({
  name: 'Select',
  components: {
    Icon,
    Option,
    Portal,
    Scroll,
    Tag,
    Check,
    CircleXmark
  },
  props,
  emits: [
    'on-toggle',
    'on-select',
    'on-cancel',
    'on-change',
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
    const currentLabel = ref<string | string[]>(props.multiple ? [] : '')
    const currentValue = ref<typeof props.value>(props.multiple ? [] : '')
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
    const { isHover } = useHover(reference)
    const locale = useLocaleConfig('select')

    const className = computed(() => {
      return {
        [prefix]: true,
        'vxp-input-vars': true,
        [`${prefix}-vars`]: true,
        [`${prefix}--focused`]: !props.disabled && currentVisible.value,
        [`${prefix}--focused`]: !props.disabled && currentVisible.value,
        [`${prefix}--multiple`]: props.multiple,
        [`${prefix}--disabled`]: props.disabled,
        [`${prefix}--${props.size}`]: props.size !== 'default',
        [`${prefix}--${props.state}`]: props.state !== 'default'
      }
    })
    const hasValue = computed(() => {
      return Array.isArray(currentValue.value)
        ? currentValue.value.length > 0
        : currentValue.value || currentValue.value === 0
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
    const controlStyle = computed(() => {
      return {
        paddingRight: props.noSuffix ? '' : '2em',
        paddingLeft: hasPrefix.value ? '2em' : ''
      }
    })
    const placeholderStyle = computed(() => {
      return {
        right: props.noSuffix ? '' : '2em',
        left: hasPrefix.value ? '2em' : ''
      }
    })
    const effectiveCount = computed(() => {
      return Array.from(optionStates.value).filter(state => !state.hidden).length
    })
    const hasEmptyTip = computed(() => {
      return !!(props.emptyText || slots.empty || locale.empty) && !effectiveCount.value
    })

    provide<SelectState>(
      SELECTOR_STATE,
      reactive({ isSelected, addOption, removeOption, handleSelect, setCurrentLabel })
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
        currentValue.value = props.multiple && !Array.isArray(value) ? [value] : value
      },
      { immediate: true }
    )
    watch(effectiveCount, computeListHeight)
    watch(
      () => props.multiple,
      value => {
        if (value) {
          if (!Array.isArray(currentValue.value)) {
            currentValue.value = [currentValue.value]
          }

          if (!Array.isArray(currentLabel.value)) {
            currentLabel.value = [currentLabel.value]
          }
        } else {
          if (Array.isArray(currentValue.value)) {
            currentValue.value = currentValue.value[0] ?? ''
          }

          if (Array.isArray(currentLabel.value)) {
            currentLabel.value = currentLabel.value[0] ?? ''
          }
        }
      }
    )

    function isSelected(value: string | number) {
      if (Array.isArray(currentValue.value)) {
        return currentValue.value.includes(value)
      }

      return currentValue.value === value
    }

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

    function setCurrentLabel(label: string, value: string | number) {
      if (props.multiple) {
        if (Array.isArray(currentValue.value) && Array.isArray(currentLabel.value)) {
          const index = currentValue.value.findIndex(v => v === value)

          if (~index) {
            currentLabel.value[index] = label
          }
        }
      } else {
        currentLabel.value = label
      }
    }

    function handleSelect(value: string | number, label: string) {
      emit(props.multiple && isSelected(value) ? 'on-cancel' : 'on-select', value, label)
      handleChange(value, label)

      if (!props.multiple) {
        currentVisible.value = false
      } else {
        updatePopper()
      }
    }

    function handleChange(value: string | number, label: string) {
      if (
        props.multiple &&
        Array.isArray(currentValue.value) &&
        Array.isArray(currentLabel.value)
      ) {
        if (isSelected(value)) {
          const index = currentValue.value.findIndex(v => v === value)

          if (~index) {
            currentValue.value.splice(index, 1)
            currentLabel.value.splice(index, 1)
          }
        } else {
          currentValue.value.push(value)
          currentLabel.value.push(label)
        }

        emit('on-change', currentValue.value, currentLabel.value)
        emit('update:value', currentValue.value)

        if (!props.disableValidate) {
          validateField()
        }
      } else {
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
    }

    function handleClick() {
      if (props.disabled) return

      currentVisible.value = !currentVisible.value

      if (currentVisible.value && popper.value && wrapper.value) {
        popper.value.style.minWidth = `${wrapper.value.offsetWidth}`
      }
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
        if (props.multiple) {
          currentValue.value = []
          currentLabel.value = []

          emit('on-change', currentValue.value, currentLabel.value)
          emit('update:value', currentValue.value)

          updatePopper()
        } else {
          handleChange('', '')
        }

        emit('on-clear')
        clearField()
      }
    }

    return {
      ChevronDown,

      prefixCls: prefix,
      locale,
      currentVisible,
      currentValue,
      currentLabel,
      transferTo,
      listHeight,
      optionStates,
      isHover,

      className,
      hasValue,
      hasPrefix,
      rawOptions,
      controlStyle,
      placeholderStyle,
      effectiveCount,
      hasEmptyTip,

      wrapper,
      reference,
      popper,
      scroll,

      computeListHeight,
      handleSelect,
      handleClick,
      handleClickOutside,
      handleClear
    }
  }
})
</script>
