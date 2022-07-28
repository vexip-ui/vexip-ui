<template>
  <div
    :id="idFor"
    ref="wrapper"
    :class="className"
    :aria-disabled="props.disabled ? 'true' : undefined"
    @click="handleClick"
  >
    <div
      ref="reference"
      :class="selectorClass"
      tabindex="0"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <div
        v-if="hasPrefix"
        :class="[nh.be('icon'), nh.be('prefix')]"
        :style="{ color: props.prefixColor }"
      >
        <slot name="prefix">
          <Icon :icon="props.prefix"></Icon>
        </slot>
      </div>
      <div :class="nh.be('control')">
        <slot name="control">
          <template v-if="props.multiple">
            <Tag
              v-for="(item, index) in currentValues"
              :key="index"
              :class="nh.be('tag')"
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
            :class="nh.be('placeholder')"
          >
            {{ props.placeholder ?? locale.placeholder }}
          </span>
        </slot>
      </div>
      <transition name="vxp-fade">
        <div
          v-if="!props.disabled && props.clearable && isHover && hasValue"
          :class="nh.be('clear')"
          @click.stop="handleClear"
        >
          <Icon><CircleXmark></CircleXmark></Icon>
        </div>
        <div
          v-else-if="!noSuffix"
          :class="[nh.be('icon'), nh.be('suffix')]"
          :style="{ color: props.suffixColor }"
        >
          <slot name="suffix">
            <Icon
              v-if="props.suffix"
              :icon="props.suffix"
              :class="{
                [nh.be('arrow')]: !props.staticSuffix
              }"
            ></Icon>
            <Icon v-else :class="nh.be('arrow')">
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
          :class="[nh.be('popper'), nh.bs('vars')]"
          @click.stop
        >
          <VirtualList
            ref="virtualList"
            :class="[nh.be('list'), props.listClass]"
            :style="{
              height: listHeight,
              maxHeight: `${props.maxListHeight}px`
            }"
            :items="visibleOptions"
            :item-size="32"
            :use-y-bar="!!listHeight"
            :height="'100%'"
            id-key="value"
            :items-attrs="{
              class: [nh.be('options'), props.optionCheck ? nh.bem('options', 'has-check') : ''],
              role: 'listbox'
            }"
          >
            <template #default="{ item: option, index }">
              <li
                v-if="option.group"
                :class="[nh.ns('option-vars'), nh.be('group')]"
                :title="option.label"
              >
                <slot name="group" :option="option" :index="index">
                  <div
                    :class="[nh.be('label'), nh.bem('label', 'group')]"
                    :style="{ paddingLeft: `${option.depth * 6}px` }"
                  >
                    {{ option.label }}
                  </div>
                </slot>
              </li>
              <Option
                v-else
                :label="option.label"
                :value="option.value"
                :disabled="option.disabled"
                :divided="option.divided"
                :no-title="option.noTitle"
                :hitting="option.hitting"
                :selected="isSelected(option)"
                @select="handleSelect(option)"
              >
                <slot :option="option" :index="index" :selected="isSelected(option)">
                  <span :class="nh.be('label')" :style="{ paddingLeft: `${option.depth * 6}px` }">
                    {{ option.label }}
                  </span>
                  <transition v-if="props.optionCheck" name="vxp-fade" appear>
                    <Icon v-if="isSelected(option)" :class="nh.be('check')">
                      <Check></Check>
                    </Icon>
                  </transition>
                </slot>
              </Option>
            </template>
            <template #empty>
              <div v-if="hasEmptyTip" :class="nh.be('empty')">
                <slot name="empty">
                  {{ props.emptyText ?? locale.empty }}
                </slot>
              </div>
            </template>
          </VirtualList>
        </div>
      </transition>
    </Portal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, watchEffect, toRef, nextTick } from 'vue'
import { Icon } from '@/components/icon'
import { Option } from '@/components/option'
import { Portal } from '@/components/portal'
import { Tag } from '@/components/tag'
import { VirtualList } from '@/components/virtual-list'
import { useFieldStore } from '@/components/form'
import {
  useHover,
  usePopper,
  placementWhileList,
  useClickOutside,
  useModifier,
  useMounted
} from '@vexip-ui/mixins'
import {
  useNameHelper,
  useProps,
  useLocale,
  booleanProp,
  booleanStringProp,
  sizeProp,
  stateProp,
  createSizeProp,
  createStateProp,
  classProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { isNull } from '@vexip-ui/utils'
import { ChevronDown, Check, CircleXmark } from '@vexip-ui/icons'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'
import type { VirtualListExposed } from '@/components/virtual-list'
import type { SelectKeyConfig, SelectRawOption, SelectOptionState } from './symbol'

type SelectValue = string | number | (string | number)[]

const defaultKeyConfig: Required<SelectKeyConfig> = {
  value: 'value',
  label: 'label',
  disabled: 'disabled',
  divided: 'divided',
  noTitle: 'noTitle',
  group: 'group',
  children: 'children'
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
    options: Array as PropType<SelectRawOption[]>,
    disabled: booleanProp,
    transitionName: String,
    outsideClose: booleanProp,
    placeholder: String,
    prefix: Object,
    prefixColor: String,
    suffix: Object,
    suffixColor: String,
    noSuffix: booleanProp,
    value: [String, Number, Array] as PropType<SelectValue>,
    multiple: booleanProp,
    clearable: booleanProp,
    maxListHeight: Number,
    listClass: classProp,
    placement: String as PropType<Placement>,
    transfer: booleanStringProp,
    optionCheck: booleanProp,
    emptyText: String,
    staticSuffix: booleanProp,
    keyConfig: Object as PropType<SelectKeyConfig>,
    onFocus: eventProp<(event: FocusEvent) => void>(),
    onBlur: eventProp<(event: FocusEvent) => void>(),
    onToggle: eventProp<(visible: boolean) => void>(),
    onSelect: eventProp<(value: string | number, data: SelectRawOption) => void>(),
    onCancel: eventProp<(value: string | number, data: SelectRawOption) => void>(),
    onChange: eventProp<(value: SelectValue, data: SelectRawOption | SelectRawOption[]) => void>(),
    onClickOutside: eventProp(),
    onOutsideClose: eventProp(),
    onClear: eventProp()
  },
  emits: ['update:value', 'update:visible'],
  setup(_props, { emit, slots }) {
    const { idFor, state, disabled, validateField, clearField, getFieldValue, setFieldValue } =
      useFieldStore<SelectValue>(() => reference.value?.focus())

    const nh = useNameHelper('select')
    const props = useProps('select', _props, {
      size: createSizeProp(),
      state: createStateProp(state),
      visible: {
        default: false,
        static: true
      },
      options: {
        default: () => [],
        static: true
      },
      disabled: () => disabled.value,
      transitionName: () => nh.ns('drop'),
      outsideClose: true,
      placeholder: null,
      prefix: null,
      prefixColor: '',
      suffix: null,
      suffixColor: '',
      noSuffix: false,
      value: {
        default: () => getFieldValue(null!),
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
      optionCheck: false,
      emptyText: null,
      staticSuffix: false,
      keyConfig: () => ({})
    })

    const locale = useLocale('select')
    const currentVisible = ref(props.visible)
    const currentLabels = ref<string[]>([])
    const currentValues = ref<(string | number)[]>([])
    const currentIndex = ref(-1)
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')
    const listHeight = ref<string | undefined>(undefined)
    const optionStates = ref<SelectOptionState[]>([])

    const { isMounted } = useMounted()

    const keyConfig = computed(() => ({ ...defaultKeyConfig, ...props.keyConfig }))

    let optionValueMap = new Map<string | number, SelectOptionState>()
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
        noTitle: noTitleKey,
        group: groupKey,
        children: childrenKey
      } = keyConfig.value
      const oldMap = optionValueMap
      const map = new Map<string | number, SelectOptionState>()
      const states: SelectOptionState[] = []
      const loop = props.options
        .map(option => ({ option, depth: 0, parent: null as SelectOptionState | null }))
        .reverse()

      while (loop.length) {
        const { option, depth, parent } = loop.pop()!
        const rawOption = typeof option === 'string' ? { [valueKey]: option } : option
        const group = !!rawOption[groupKey]
        const value = rawOption[valueKey]

        if (!group && isNull(value)) return

        const label = rawOption[labelKey] || String(value)
        const {
          [disabledKey]: disabled = false,
          [dividedKey]: divided = false,
          [noTitleKey]: noTitle = false,
          [childrenKey]: children = null
        } = rawOption
        const oldState = oldMap.get(rawOption.value)
        const optionState = reactive({
          disabled,
          divided,
          noTitle,
          value,
          label,
          group,
          depth,
          parent,
          hidden: oldState?.hidden ?? false,
          hitting: oldState?.hitting ?? false,
          data: option
        }) as SelectOptionState

        states.push(optionState)

        if (!group) {
          map.set(value, optionState)
        }

        if (Array.isArray(children) && children.length) {
          loop.push(
            ...children
              .map(child => {
                return { option: child, depth: depth + 1, parent: optionState }
              })
              .reverse()
          )
        }
      }

      optionValueMap = map
      optionStates.value = states

      initValueAndLabel(emittedValue)
    }

    const wrapper = useClickOutside(handleClickOutside)
    const virtualList = ref<(InstanceType<typeof VirtualList> & VirtualListExposed) | null>(null)

    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      isDrop: true
    })
    const { isHover } = useHover(reference)

    useModifier({
      target: wrapper,
      passive: false,
      onKeyDown: (event, modifier) => {
        if (!currentVisible.value) {
          if (modifier.space) {
            event.preventDefault()
            event.stopPropagation()
            handleClick()
          }

          return
        }

        if (modifier.up || modifier.down) {
          event.preventDefault()
          event.stopPropagation()

          const options = visibleOptions.value
          const length = options.length

          if (!length) return

          const step = modifier.down ? 1 : -1

          let index = (currentIndex.value + step) % length
          let option = options[index]

          for (let i = 0; (option.disabled || option.group) && i < length; ++i) {
            index += step
            index = (index + length) % length
            option = options[index]
          }

          currentIndex.value = index
        } else if (modifier.enter || modifier.space) {
          event.preventDefault()
          event.stopPropagation()

          if (currentIndex.value >= 0) {
            handleSelect(visibleOptions.value[currentIndex.value])
          } else {
            currentVisible.value = false
            modifier.resetAll()
          }
        } else if (modifier.tab || modifier.escape) {
          currentVisible.value = false
          modifier.resetAll()
        }
      }
    })

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.ns('input-vars')]: true,
        [nh.bs('vars')]: true,
        [nh.bm('multiple')]: props.multiple
      }
    })
    const selectorClass = computed(() => {
      const baseCls = nh.be('selector')

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
      return (
        !!(props.emptyText || slots.empty || locale.value.empty) && !visibleOptions.value.length
      )
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
        initHittingIndex()

        if (wrapper.value && popper.value) {
          popper.value.style.minWidth = `${wrapper.value.offsetWidth}px`
        }

        setTimeout(() => {
          if (virtualList.value && !isNull(currentValues.value[0])) {
            virtualList.value.ensureKeyInView(currentValues.value[0])
          }
        }, 32)
      }

      emitEvent(props.onToggle, value)
      emit('update:visible', value)
    })
    watch(
      () => props.value,
      value => {
        emittedValue = value
        initValueAndLabel(value)
      }
    )
    watch(() => visibleOptions.value.length, computeListHeight)
    watch(currentIndex, value => {
      visibleOptions.value.forEach((option, index) => {
        option.hitting = value === index
      })

      if (currentVisible.value && virtualList.value) {
        virtualList.value.ensureIndexInView(value)
      }
    })

    function initValueAndLabel(value: SelectValue | null) {
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

      initHittingIndex()
    }

    function initHittingIndex() {
      const value = currentValues.value[0]

      if (isNull(value)) {
        currentIndex.value = -1
      } else {
        if (!isMounted.value) return

        currentIndex.value = visibleOptions.value.findIndex(option => option.value === value)
      }
    }

    function isSelected(option: SelectOptionState) {
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

          listHeight.value =
            wrapperHeight < props.maxListHeight ? undefined : `${props.maxListHeight}px`
        }
      })
    }

    function handleTagClose(value: string | number) {
      handleSelect(optionValueMap.get(value)!)
    }

    function handleSelect(option: SelectOptionState) {
      if (!option) return

      emitEvent(
        props[props.multiple && isSelected(option) ? 'onCancel' : 'onSelect'],
        option.value,
        option.data
      )
      handleChange(option)

      if (props.multiple) {
        updatePopper()
      } else {
        currentVisible.value = false
      }
    }

    function handleChange(option: SelectOptionState) {
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

        setFieldValue(emittedValue)
        emitEvent(
          props.onChange,
          emittedValue,
          emittedValue.map(value => optionValueMap.get(value)?.data ?? '')
        )
        emit('update:value', emittedValue)
        validateField()
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

          setFieldValue(emittedValue)
          emitEvent(props.onChange, emittedValue, option.data)
          emit('update:value', emittedValue)
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

    function handleClickOutside() {
      emitEvent(props.onClickOutside)

      if (props.outsideClose && currentVisible.value) {
        currentVisible.value = false
        emitEvent(props.onOutsideClose)
      }
    }

    function handleClear() {
      if (props.clearable) {
        currentValues.value.length = 0
        currentLabels.value.length = 0

        emittedValue = props.multiple ? [] : ''

        emitEvent(props.onChange, emittedValue, props.multiple ? [] : '')
        emit('update:value', emittedValue)
        emitEvent(props.onClear)
        clearField(emittedValue!)
        updatePopper()
      }
    }

    function handleFocus(event: FocusEvent) {
      emitEvent(props.onFocus, event)
    }

    function handleBlur(event: FocusEvent) {
      emitEvent(props.onFocus, event)
    }

    return {
      props,
      nh,
      locale,
      idFor,
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
      handleClear,
      handleFocus,
      handleBlur
    }
  }
})
</script>
