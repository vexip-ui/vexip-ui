<template>
  <div
    ref="wrapper"
    :class="className"
    @click="handleClick"
    @clickoutside="handleClickOutside"
  >
    <div ref="reference" :class="selectorClass">
      <div v-if="hasPrefix" :class="`${prefixCls}__icon--prefix`" :style="{ color: props.prefixColor }">
        <slot name="prefix">
          <Icon :icon="props.prefix"></Icon>
        </slot>
      </div>
      <div :class="`${prefixCls}__control`">
        <slot name="control">
          <template v-if="props.multiple">
            <Tag
              v-for="(item, index) in currentValues"
              :key="index"
              :class="`${prefixCls}__tag`"
              closable
              @click.stop="handleClick"
              @close="handleTagClose(item)"
            >
              {{ currentLabels[index] }}
            </Tag>
          </template>
          <template v-else>
            {{ currentLabels[0] }}
          </template>
          <span
            v-if="(props.placeholder ?? locale.placeholder) && !hasValue"
            :class="`${prefixCls}__placeholder`"
          >
            {{ props.placeholder ?? locale.placeholder }}
          </span>
        </slot>
      </div>
      <transition name="vxp-fade">
        <div
          v-if="!props.disabled && props.clearable && isHover && hasValue"
          :class="`${prefixCls}__clear`"
          @click.stop="handleClear"
        >
          <Icon><CircleXmark></CircleXmark></Icon>
        </div>
        <div
          v-else-if="!noSuffix"
          :class="`${prefixCls}__icon--suffix`"
          :style="{ color: props.suffixColor }"
        >
          <slot name="suffix">
            <Icon
              v-if="props.suffix"
              :icon="props.suffix"
              :class="{
                [`${prefixCls}__arrow`]: !props.staticSuffix
              }"
            ></Icon>
            <Icon v-else :class="`${prefixCls}__arrow`">
              <ChevronDown></ChevronDown>
            </Icon>
          </slot>
        </div>
      </transition>
    </div>
    <Portal :to="transferTo">
      <transition :name="props.transitionName" @after-enter="computeListHeight">
        <div
          v-show="currentVisible"
          ref="popper"
          :class="[`${prefixCls}__popper`, `${prefixCls}-vars`]"
          @click.stop
        >
          <VirtualList
            ref="virtualList"
            :class="[`${prefixCls}__list`, props.listClass]"
            :style="{
              height: listHeight,
              maxHeight: `${props.maxListHeight}px`
            }"
            :items="visibleOptions"
            :item-size="32"
            :use-y-bar="!!listHeight"
            height="100%"
            id-key="value"
            :items-attrs="{
              class: [
                `${prefixCls}__options`,
                props.optionCheck ? `${prefixCls}__options--has-check` : ''
              ]
            }"
          >
            <template #default="{ item, index }">
              <slot
                :option="item"
                :index="index"
                :selected="isSelected(item)"
                :handle-select="handleSelect"
              >
                <Option
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                  :divided="item.divided"
                  :no-title="item.noTitle"
                  :hitting="item.hitting"
                  :selected="isSelected(item)"
                  @select="handleSelect(item)"
                >
                  <span :class="`${prefixCls}__label`">
                    {{ item.label }}
                  </span>
                  <transition v-if="props.optionCheck" name="vxp-fade" appear>
                    <Icon v-if="isSelected(item)" :class="`${prefixCls}__check`">
                      <Check></Check>
                    </Icon>
                  </transition>
                </Option>
              </slot>
            </template>
            <template #empty>
              <slot v-if="hasEmptyTip" name="empty">
                <div :class="`${prefixCls}__empty`">
                  {{ props.emptyText ?? locale.empty }}
                </div>
              </slot>
            </template>
          </VirtualList>
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
  watchEffect,
  inject,
  toRef,
  nextTick
} from 'vue'
import { Icon } from '@/components/icon'
import { Option } from '@/components/option'
import { Portal } from '@/components/portal'
import { Tag } from '@/components/tag'
import { VirtualList } from '@/components/virtual-list'
import { VALIDATE_FIELD, CLEAR_FIELD } from '@/components/form-item'
import { useHover, usePopper, placementWhileList, useClickOutside } from '@vexip-ui/mixins'
import { useProps, useLocale, booleanProp, booleanStringProp, sizeProp, stateProp, createSizeProp, createStateProp } from '@vexip-ui/config'
import { noop, isNull } from '@vexip-ui/utils'
import { ChevronDown, Check, CircleXmark } from '@vexip-ui/icons'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'
import type { OptionKeyConfig, RawOption, OptionState } from '@/components/option'
import type { VirtualListExposed } from '@/components/virtual-list'
import type { ClassType } from './symbol'

const defaultKeyConfig: Required<OptionKeyConfig> = {
  value: 'value',
  label: 'label',
  disabled: 'disabled',
  divided: 'divided',
  noTitle: 'noTitle'
}

export default defineComponent({
  name: 'Select',
  components: {
    Icon,
    Option,
    Portal,
    Tag,
    VirtualList,
    Check,
    CircleXmark,
    ChevronDown
  },
  props: {
    size: sizeProp,
    state: stateProp,
    visible: booleanProp,
    options: Array as PropType<RawOption[]>,
    disabled: booleanProp,
    transitionName: String,
    outsideClose: booleanProp,
    placeholder: String,
    prefix: Object,
    prefixColor: String,
    suffix: Object,
    suffixColor: String,
    noSuffix: booleanProp,
    value: [String, Number, Array] as PropType<string | number | (string | number)[]>,
    multiple: booleanProp,
    clearable: booleanProp,
    maxListHeight: Number,
    listClass: [String, Object] as PropType<ClassType>,
    placement: String as PropType<Placement>,
    transfer: booleanStringProp,
    disableValidate: booleanProp,
    optionCheck: booleanProp,
    emptyText: String,
    staticSuffix: booleanProp,
    keyConfig: Object as PropType<OptionKeyConfig>
  },
  emits: [
    'toggle',
    'select',
    'cancel',
    'change',
    'click-outside',
    'outside-close',
    'clear',
    'update:value',
    'update:visible'
  ],
  setup(_props, { emit, slots }) {
    const props = useProps('select', _props, {
      size: createSizeProp(),
      state: createStateProp(),
      visible: {
        default: false,
        static: true
      },
      options: {
        default: () => [],
        static: true
      },
      disabled: false,
      transitionName: 'vxp-drop',
      outsideClose: true,
      placeholder: null,
      prefix: null,
      prefixColor: '',
      suffix: null,
      suffixColor: '',
      noSuffix: false,
      value: {
        default: null,
        static: true
      },
      multiple: false,
      clearable: false,
      maxListHeight: 300,
      listClass: null,
      placement: {
        default: 'bottom' as Placement,
        validator: (value: Placement) => placementWhileList.includes(value)
      },
      transfer: false,
      disableValidate: false,
      optionCheck: false,
      emptyText: null,
      staticSuffix: false,
      keyConfig: () => ({})
    })

    const validateField = inject(VALIDATE_FIELD, noop)
    const clearField = inject(CLEAR_FIELD, noop)

    const prefix = 'vxp-select'
    const currentVisible = ref(props.visible)
    const currentLabels = ref<string[]>([])
    const currentValues = ref<(string | number)[]>([])
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')
    const listHeight = ref<string | undefined>(undefined)
    const optionStates = ref<OptionState[]>([])

    const keyConfig = computed(() => ({ ...defaultKeyConfig, ...props.keyConfig }))

    let optionValueMap = new Map<string | number, OptionState>()
    let emittedValue: typeof props.value | null = props.value

    const updateTrigger = ref(0)

    watchEffect(() => {
      /* eslint-disable no-unused-expressions */
      props.keyConfig.value
      props.keyConfig.label
      props.keyConfig.disabled
      props.keyConfig.divided
      props.keyConfig.noTitle
      props.options
      /* eslint-disable no-unused-expressions */

      updateTrigger.value++
    })

    watch(updateTrigger, initOptionState, { immediate: true })

    function initOptionState() {
      const {
        value: valueKey,
        label: labelKey,
        disabled: disabledKey,
        divided: dividedKey,
        noTitle: noTitleKey
      } = keyConfig.value
      const oldMap = optionValueMap
      const map = new Map<string | number, OptionState>()

      props.options.forEach(option => {
        const rawOption = typeof option === 'string' ? { [valueKey]: option } : option
        const value = rawOption[valueKey]

        if (isNull(value)) return

        const label = rawOption[labelKey] || String(value)
        const {
          [disabledKey]: disabled = false,
          [dividedKey]: divided = false,
          [noTitleKey]: noTitle = false
        } = rawOption
        const oldState = oldMap.get(rawOption.value)
        const optionState = reactive({
          disabled,
          divided,
          noTitle,
          value,
          label,
          hidden: oldState?.hidden ?? false,
          hitting: oldState?.hitting ?? false,
          data: option
        })

        map.set(value, optionState)
      })

      optionValueMap = map
      optionStates.value = Array.from(map.values())

      initValueAndLabel(emittedValue)
    }

    const virtualList = ref<InstanceType<typeof VirtualList> & VirtualListExposed | null>(null)
    const wrapper = useClickOutside()

    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      isDrop: true
    })
    const { isHover } = useHover(reference)
    const locale = useLocale('select')

    const className = computed(() => {
      return {
        [prefix]: true,
        'vxp-input-vars': true,
        [`${prefix}-vars`]: true,
        [`${prefix}--multiple`]: props.multiple
      }
    })
    const selectorClass = computed(() => {
      const baseCls = `${prefix}__selector`

      return {
        [baseCls]: true,
        [`${baseCls}--focused`]: !props.disabled && currentVisible.value,
        [`${baseCls}--disabled`]: props.disabled,
        [`${baseCls}--${props.size}`]: props.size !== 'default',
        [`${baseCls}--${props.state}`]: props.state !== 'default',
        [`${baseCls}--has-prefix`]: hasPrefix.value,
        [`${baseCls}--has-suffix`]: !props.noSuffix
      }
    })
    const hasValue = computed(() => !isNull(currentValues.value[0]))
    const hasPrefix = computed(() => {
      return !!(slots.prefix || props.prefix)
    })
    const visibleOptions = computed(() => {
      return optionStates.value.filter(state => !state.hidden)
    })
    const hasEmptyTip = computed(() => {
      return !!(props.emptyText || slots.empty || locale.value.empty) && !visibleOptions.value.length
    })

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

      emit('toggle', value)
      emit('update:visible', value)
    })
    watch(() => props.value, value => {
      emittedValue = value
      initValueAndLabel(value)
    })
    watch(() => visibleOptions.value.length, computeListHeight)

    function initValueAndLabel(value: string | number | (string | number)[] | null) {
      if (!value) {
        currentValues.value = []
        currentLabels.value = []
        return
      }

      const normalizedValue = !Array.isArray(value) ? [value] : value

      const valueSet = new Set(normalizedValue)
      const selectedValues: (string | number)[] = []
      const selectedLabels: string[] = []

      valueSet.forEach(value => {
        const option = optionValueMap.get(value)

        if (option) {
          selectedValues.push(option.value)
          selectedLabels.push(option.label)
        }
      })

      currentValues.value = selectedValues
      currentLabels.value = selectedLabels
    }

    function isSelected(option: OptionState) {
      if (props.multiple) {
        return currentValues.value.includes(option.value)
      }

      return currentValues.value[0] === option.value
    }

    function computeListHeight() {
      virtualList.value?.refresh()
      nextTick(() => {
        const scrollWrapper = virtualList.value?.list

        if (scrollWrapper) {
          const wrapperHeight = scrollWrapper.getBoundingClientRect().height

          listHeight.value = wrapperHeight < props.maxListHeight ? undefined : `${wrapperHeight}px`
        }
      })
    }

    function handleTagClose(value: string | number) {
      handleSelect(optionValueMap.get(value)!)
    }

    function handleSelect(option: OptionState) {
      if (!option) return

      emit(props.multiple && isSelected(option) ? 'cancel' : 'select', option.value, option.data)
      handleChange(option)

      if (props.multiple) {
        updatePopper()
      } else {
        currentVisible.value = false
      }
    }

    function handleChange(option: OptionState) {
      if (props.multiple) {
        if (isSelected(option)) {
          const index = currentValues.value.findIndex(v => v === option.value)

          if (~index) {
            currentValues.value.splice(index, 1)
            currentLabels.value.splice(index, 1)
          }
        } else {
          currentValues.value.push(option.value)
          currentLabels.value.push(option.label)
        }

        emittedValue = Array.from(currentValues.value)

        emit('change', emittedValue, Array.from(currentLabels.value))
        emit('update:value', emittedValue)

        if (!props.disableValidate) {
          validateField()
        }
      } else {
        currentLabels.value.length = 0

        if (!isNull(option.value) && option.value !== '') {
          currentLabels.value.push(option.label)
        }

        const prevValue = currentValues.value[0]

        currentValues.value.length = 0
        currentValues.value.push(option.value)

        if (prevValue !== option.value) {
          emittedValue = option.value

          emit('change', emittedValue, option.data)
          emit('update:value', emittedValue)

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
      emit('click-outside')

      if (props.outsideClose && currentVisible.value) {
        currentVisible.value = false

        emit('outside-close')
      }
    }

    function handleClear() {
      if (props.clearable) {
        currentValues.value.length = 0
        currentLabels.value.length = 0

        emittedValue = props.multiple ? [] : null

        emit('change', emittedValue, emittedValue)
        emit('update:value', emittedValue)
        emit('clear')
        clearField()
        updatePopper()
      }
    }

    return {
      props,
      prefixCls: prefix,
      locale,
      currentVisible,
      currentValues,
      currentLabels,
      transferTo,
      listHeight,
      optionStates,
      isHover,

      className,
      selectorClass,
      hasValue,
      hasPrefix,
      visibleOptions,
      hasEmptyTip,

      wrapper,
      reference,
      popper,
      virtualList,

      isSelected,
      computeListHeight,
      handleTagClose,
      handleSelect,
      handleClick,
      handleClickOutside,
      handleClear
    }
  }
})
</script>
