<template>
  <div
    ref="wrapper"
    :class="className"
    @click="handleClick"
    @clickoutside="handleClickOutside"
  >
    <div ref="reference" :class="`${prefixCls}__control`" :style="controlStyle">
      <div v-if="hasPrefix" :class="`${prefixCls}__icon--prefix`" :style="{ color: props.prefixColor }">
        <slot name="prefix">
          <Icon :icon="props.prefix"></Icon>
        </slot>
      </div>
      <slot name="control">
        <template v-if="props.multiple && Array.isArray(currentValue)">
          <Tag
            v-for="(item, index) in currentValue"
            :key="index"
            :class="`${prefixCls}__tag`"
            closable
            @click.stop="handleClick"
            @close="handleSelect(item, currentLabel[index])"
          >
            {{ currentLabel[index] }}
          </Tag>
        </template>
        <template v-else>
          {{ currentLabel }}
        </template>
        <span
          v-if="(props.placeholder ?? locale.placeholder) && !hasValue"
          :class="`${prefixCls}__placeholder`"
          :style="placeholderStyle"
        >
          {{ props.placeholder ?? locale.placeholder }}
        </span>
      </slot>
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
          <div
            :class="[`${prefixCls}__list`, props.listClass]"
            :style="{
              height: listHeight,
              maxHeight: `${props.maxListHeight}px`
            }"
          >
            <VirtualList
              ref="virtualList"
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
                  :selected="item.value === currentValue"
                  :handle-select="handleSelect"
                >
                  <Option
                    :label="item.label || item.value.toString()"
                    :value="item.value"
                    :disabled="item.disabled"
                    :divided="item.divided"
                    :no-title="item.noTitle"
                    :hitting="item.hitting"
                    :select="item.value === currentValue"
                    @select="handleSelect"
                  >
                    <span :class="`${prefixCls}__label`">
                      {{ item.label || item.value }}
                    </span>
                    <transition v-if="props.optionCheck" name="vxp-fade" appear>
                      <Icon v-if="item.value === currentValue" :class="`${prefixCls}__check`">
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
        </div>
      </transition>
    </Portal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
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
import type { RawOption, OptionState } from '@/components/option'
import type { VirtualListExposed } from '@/components/virtual-list'
import type { ClassType } from './symbol'

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
    valueKey: String,
    labelKey: String
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
      valueKey: 'value',
      labelKey: 'label'
    })

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
    const optionMap = ref(new Map<string | number, OptionState>())

    watchEffect(() => {
      const { valueKey, labelKey } = props
      const oldMap = optionMap.value
      const map = new Map<string | number, OptionState>()

      props.options.forEach(option => {
        if (typeof option === 'string') {
          option = { [valueKey]: option }
        }

        const value = option[valueKey]

        if (isNull(value)) return

        const label = option[labelKey] || String(value)
        const oldState = oldMap.get(option.value)
        const rawOption = option as OptionState

        if (oldState) {
          map.set(value, { ...rawOption, value, label, hidden: oldState.hidden, hitting: oldState.hitting })
        } else {
          map.set(value, { ...rawOption, value, label, hidden: false, hitting: false })
        }
      })

      optionMap.value = map
    })

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
    const optionStates = computed(() => {
      return Array.from(optionMap.value.values())
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
    watch(
      () => props.value,
      value => {
        currentValue.value = props.multiple && !Array.isArray(value) ? [value] : value
        syncCurrentLabel()
      },
      { immediate: true }
    )
    watch(() => visibleOptions.value.length, computeListHeight)
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

    function syncCurrentLabel() {
      if (props.multiple && Array.isArray(currentValue.value)) {
        if (!currentValue.value.length) {
          currentLabel.value = []
          return
        }

        const selectedValues = new Set(currentValue.value)
        const options = optionStates.value
        const selectedLabels: string[] = []

        for (let i = 0, len = options.length; i < len; ++i) {
          const { value, label } = options[i]

          if (selectedValues.has(value)) {
            selectedValues.delete(value)
            selectedLabels.push(label ?? value)

            if (!selectedValues.size) break
          }
        }

        currentLabel.value = selectedLabels
      } else {
        if (isNull(currentValue.value) || currentValue.value === '') {
          currentLabel.value = ''
          return
        }

        const option = optionStates.value.find(option => option.value === currentValue.value)

        if (option) {
          currentLabel.value = option.label ?? option.value
        } else {
          currentLabel.value = ''
        }
      }
    }

    function isSelected(value: string | number) {
      if (Array.isArray(currentValue.value)) {
        return currentValue.value.includes(value)
      }

      return currentValue.value === value
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

    function handleSelect(value: string | number, label: string) {
      emit(props.multiple && isSelected(value) ? 'cancel' : 'select', value, label)
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

        emit('change', currentValue.value, currentLabel.value)
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
          emit('change', value, label)
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
      emit('click-outside')

      if (props.outsideClose && currentVisible.value) {
        currentVisible.value = false

        emit('outside-close')
      }
    }

    function handleClear() {
      if (props.clearable) {
        if (props.multiple) {
          currentValue.value = []
          currentLabel.value = []

          emit('change', currentValue.value, currentLabel.value)
          emit('update:value', currentValue.value)

          updatePopper()
        } else {
          handleChange('', '')
        }

        emit('clear')
        clearField()
      }
    }

    return {
      props,
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
      controlStyle,
      placeholderStyle,
      visibleOptions,
      hasEmptyTip,

      wrapper,
      reference,
      popper,
      virtualList,

      computeListHeight,
      handleSelect,
      handleClick,
      handleClickOutside,
      handleClear
    }
  }
})
</script>
