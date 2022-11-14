<template>
  <div
    :id="idFor"
    ref="wrapper"
    :class="className"
    :aria-disabled="props.disabled ? 'true' : undefined"
    @click="toggleVisible"
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
              @click.stop="toggleVisible"
              @close="handleTagClose(item)"
            >
              {{ currentLabels[index] }}
            </Tag>
            <div
              v-if="props.filter"
              :class="nh.be('anchor')"
              :style="{
                width: `${anchorWidth}px`
              }"
            >
              <input
                ref="input"
                :class="[nh.be('input'), nh.bem('input', 'multiple')]"
                :disabled="props.disabled"
                autocomplete="off"
                tabindex="-1"
                role="combobox"
                aria-autocomplete="list"
                @input="handleFilterInput"
                @keydown="handleBackspace"
              />
              <span ref="device" :class="nh.be('device')" aria-hidden="true">
                {{ currentFilter }}
              </span>
            </div>
          </template>
          <template v-else>
            <template v-if="props.filter">
              <input
                ref="input"
                :class="nh.be('input')"
                :disabled="props.disabled"
                :placeholder="currentLabels[0] || (props.placeholder ?? locale.placeholder)"
                autocomplete="off"
                tabindex="-1"
                role="combobox"
                aria-autocomplete="list"
                @input="handleFilterInput"
              />
            </template>
            <template v-else>
              {{ currentLabels[0] }}
            </template>
          </template>
          <span
            v-if="
              (props.multiple || !props.filter) &&
                (!currentVisible || !currentFilter) &&
                (props.placeholder ?? locale.placeholder) &&
                !hasValue
            "
            :class="nh.be('placeholder')"
          >
            {{ props.placeholder ?? locale.placeholder }}
          </span>
        </slot>
      </div>
      <div
        v-if="!props.noSuffix"
        :class="[nh.be('icon'), nh.be('suffix')]"
        :style="{
          color: props.suffixColor,
          opacity: showClear || props.loading ? '0%' : ''
        }"
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
      <div
        v-else-if="props.clearable || props.loading"
        :class="[nh.be('icon'), nh.bem('icon', 'placeholder'), nh.be('suffix')]"
      ></div>
      <transition :name="nh.ns('fade')" appear>
        <div v-if="showClear" :class="[nh.be('icon'), nh.be('clear')]" @click.stop="handleClear">
          <Icon><CircleXmark></CircleXmark></Icon>
        </div>
        <div v-else-if="props.loading" :class="[nh.be('icon'), nh.be('loading')]">
          <Icon :effect="props.loadingEffect" :icon="props.loadingIcon"></Icon>
        </div>
      </transition>
    </div>
    <Portal :to="transferTo">
      <transition :name="props.transitionName" @after-leave="currentFilter = ''">
        <div
          v-if="currentVisible"
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
            :items="totalOptions"
            :item-size="32"
            use-y-bar
            :height="'100%'"
            id-key="value"
            :items-attrs="{
              class: [nh.be('options'), props.optionCheck ? nh.bem('options', 'has-check') : ''],
              role: 'listbox',
              ariaLabel: 'options'
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
                no-hover
                @select="handleSelect(option)"
                @mousemove="updateHitting(index, false)"
              >
                <slot :option="option" :index="index" :selected="isSelected(option)">
                  <span :class="nh.be('label')" :style="{ paddingLeft: `${option.depth * 6}px` }">
                    {{ option.label }}
                  </span>
                  <transition v-if="props.optionCheck" :name="nh.ns('fade')" appear>
                    <Icon v-if="isSelected(option)" :class="nh.be('check')">
                      <Check></Check>
                    </Icon>
                  </transition>
                </slot>
              </Option>
            </template>
            <template #empty>
              <div :class="nh.be('empty')">
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
import { defineComponent, ref, reactive, computed, watch, watchEffect, toRef } from 'vue'
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
} from '@vexip-ui/hooks'
import {
  useNameHelper,
  useProps,
  useLocale,
  createSizeProp,
  createStateProp,
  emitEvent
} from '@vexip-ui/config'
import { isNull, removeArrayItem, getRangeWidth } from '@vexip-ui/utils'
import { ChevronDown, Check, CircleXmark, Spinner } from '@vexip-ui/icons'
import { selectProps } from './props'

import type { VirtualListExposed } from '@/components/virtual-list'
import type { SelectKeyConfig, SelectValue, SelectOptionState } from './symbol'

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
  props: selectProps,
  emits: ['update:value', 'update:visible', 'update:label'],
  setup(_props, { emit, slots }) {
    const {
      idFor,
      state,
      disabled,
      loading,
      size,
      validateField,
      clearField,
      getFieldValue,
      setFieldValue
    } = useFieldStore<SelectValue>(() => reference.value?.focus())

    const nh = useNameHelper('select')
    const props = useProps('select', _props, {
      size: createSizeProp(size),
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
        default: () => getFieldValue(null)!,
        static: true
      },
      multiple: false,
      clearable: false,
      maxListHeight: 300,
      listClass: null,
      placement: {
        default: 'bottom',
        validator: value => placementWhileList.includes(value)
      },
      transfer: false,
      optionCheck: false,
      emptyText: null,
      staticSuffix: false,
      loading: () => loading.value,
      loadingIcon: Spinner,
      loadingLock: false,
      loadingEffect: 'pulse-in',
      keyConfig: () => ({}),
      filter: false,
      ignoreCase: false,
      creatable: false,
      transparent: false
    })

    const locale = useLocale('select')
    const currentVisible = ref(props.visible)
    const currentLabels = ref<string[]>([])
    const currentValues = ref<(string | number)[]>([])
    const currentIndex = ref(-1)
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')
    const listHeight = ref<string>()
    const baseOptions = ref<SelectOptionState[]>([])
    const currentFilter = ref('')
    const anchorWidth = ref(0)
    const userOptions = ref<SelectOptionState[]>([])

    const { isMounted } = useMounted()

    const dynamicOption = reactive<SelectOptionState>({
      disabled: false,
      divided: false,
      noTitle: false,
      value: '',
      label: '',
      group: false,
      depth: 0,
      parent: null,
      hidden: false,
      hitting: true,
      data: ''
    })

    const optionValues = reactive(new Set<string | number>())
    const optionStates = computed(() => userOptions.value.concat(baseOptions.value))
    const visibleOptions = computed(() => optionStates.value.filter(state => !state.hidden))

    const keyConfig = computed(() => ({ ...defaultKeyConfig, ...props.keyConfig }))

    let optionValueMap = new Map<string | number, SelectOptionState>()
    let emittedValue: typeof props.value | null = props.value

    const updateTrigger = ref(0)

    watchEffect(() => {
      /* eslint-disable @typescript-eslint/no-unused-expressions */
      props.keyConfig.value
      props.keyConfig.label
      props.keyConfig.disabled
      props.keyConfig.divided
      props.keyConfig.noTitle
      props.options
      /* eslint-enable */

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

      optionValues.clear()

      for (const option of userOptions.value) {
        map.set(option.value, option)
        optionValues.add(option.value)
      }

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
          optionValues.add(String(value))
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
      baseOptions.value = states

      initValueAndLabel(emittedValue)
    }

    const wrapper = useClickOutside(handleClickOutside)
    const input = ref<HTMLInputElement>()
    const device = ref<HTMLElement>()
    const virtualList = ref<InstanceType<typeof VirtualList> & VirtualListExposed>()

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
            toggleVisible()
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

          let index = (Math.max(-1, currentIndex.value + step) + length) % length
          let option = options[index]

          for (let i = 0; (option.disabled || option.group) && i < length; ++i) {
            index += step
            index = (index + length) % length
            option = options[index]
          }

          updateHitting(index)
          modifier.resetAll()
        } else if (modifier.enter || modifier.space) {
          event.preventDefault()
          event.stopPropagation()

          if (currentIndex.value >= 0) {
            handleSelect(totalOptions.value[currentIndex.value])
          } else if (showDynamic.value) {
            handleSelect(dynamicOption)
          } else {
            currentVisible.value = false
          }

          modifier.resetAll()
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
        [nh.bm('multiple')]: props.multiple,
        [nh.bm('filter')]: props.filter
      }
    })
    const selectorClass = computed(() => {
      const baseCls = nh.be('selector')

      return {
        [baseCls]: true,
        [`${baseCls}--focused`]: !props.disabled && currentVisible.value,
        [`${baseCls}--disabled`]: props.disabled,
        [`${baseCls}--loading`]: props.loading && props.loadingLock,
        [`${baseCls}--${props.size}`]: props.size !== 'default',
        [`${baseCls}--${props.state}`]: props.state !== 'default',
        [`${baseCls}--has-prefix`]: hasPrefix.value,
        [`${baseCls}--has-suffix`]: !props.noSuffix,
        [`${baseCls}--transparent`]: props.transparent
      }
    })
    const hasValue = computed(() => !isNull(currentValues.value[0]))
    const hasPrefix = computed(() => !!(slots.prefix || props.prefix))
    const showDynamic = computed(() => {
      return !!(
        props.filter &&
        props.creatable &&
        dynamicOption.value &&
        !optionValues.has(dynamicOption.value)
      )
    })
    const totalOptions = computed(() => {
      return showDynamic.value ? [dynamicOption].concat(visibleOptions.value) : visibleOptions.value
    })
    const normalOptions = computed(() => optionStates.value.filter(option => !option.group))
    const optionParentMap = computed(() => {
      const options = normalOptions.value
      const map = new Map<string | number, SelectOptionState>()

      for (let i = 0, len = options.length; i < len; ++i) {
        const option = options[i]

        if (option.parent) {
          map.set(option.value, option.parent)
        }
      }

      return map
    })
    const showClear = computed(() => {
      return !props.disabled && props.clearable && isHover.value && hasValue.value
    })

    watch(
      () => props.visible,
      value => {
        currentVisible.value = value
      }
    )
    watch(currentVisible, value => {
      if (value) {
        initHittingIndex()

        requestAnimationFrame(() => {
          updatePopper()

          if (wrapper.value && popper.value) {
            popper.value.style.minWidth = `${wrapper.value.offsetWidth}px`
          }
        })

        setTimeout(() => {
          if (virtualList.value && !isNull(currentValues.value[0])) {
            virtualList.value.ensureKeyInView(currentValues.value[0])
          }
        }, 32)
      }

      syncInputValue()
      emitEvent(props.onToggle, value)
      emit('update:visible', value)
    })
    watch(
      () => props.value,
      value => {
        if (emittedValue !== value) {
          emittedValue = value
          initValueAndLabel(value)
        }
      }
    )
    watch(
      () => props.disabled,
      value => {
        if (value) {
          currentVisible.value = false
        }
      }
    )
    watch(
      () => props.loading,
      value => {
        if (value && props.loadingLock) {
          currentVisible.value = false
        }
      }
    )
    watch(
      () => props.loadingLock,
      value => {
        if (props.loading && value) {
          currentVisible.value = false
        }
      }
    )
    watch(currentFilter, value => {
      dynamicOption.value = value
      dynamicOption.label = value
      dynamicOption.data = value

      filterOptions(value)
    })

    function initValueAndLabel(value: SelectValue | null) {
      if (isNull(value)) {
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
      filterOptions(currentFilter.value)
    }

    function initHittingIndex() {
      const value = currentValues.value[0]

      if (isNull(value)) {
        updateHitting(-1)
      } else {
        if (!isMounted.value) return

        updateHitting(visibleOptions.value.findIndex(option => option.value === value))
      }
    }

    function updateHitting(hitting: number, ensureInView = true) {
      currentIndex.value = hitting
      let index = -1

      visibleOptions.value.forEach(option => {
        if (!option.hidden) {
          index += 1
          option.hitting = hitting === index
        } else {
          option.hitting = false
        }
      })

      if (ensureInView && currentVisible.value && virtualList.value) {
        virtualList.value.ensureIndexInView(hitting)
      }
    }

    function isSelected(option: SelectOptionState) {
      if (props.multiple) {
        return currentValues.value.includes(option.value)
      }

      return currentValues.value[0] === option.value
    }

    function filterOptions(value: string | number) {
      const filter = props.filter

      if (!filter) return

      if (!value) {
        optionStates.value.forEach(state => {
          state.hidden = false
        })
      } else {
        optionStates.value.forEach(state => {
          state.hidden = true
        })

        if (typeof filter === 'function') {
          normalOptions.value.forEach(state => {
            state.hidden = !filter(value, state)
          })
        } else {
          if (props.ignoreCase) {
            const ignoreCaseValue = value.toString().toLocaleLowerCase()

            normalOptions.value.forEach(state => {
              state.hidden = !state.value?.toString().toLocaleLowerCase().includes(ignoreCaseValue)
            })
          } else {
            normalOptions.value.forEach(state => {
              state.hidden = !state.value?.toString().includes(value?.toString())
            })
          }
        }

        const parentMap = optionParentMap.value

        normalOptions.value.forEach(option => {
          if (!option.hidden && option.parent) {
            let parent = parentMap.get(option.value) || null

            while (parent && parent.hidden) {
              parent.hidden = false
              parent = parent.parent
            }
          }
        })
      }

      updateHitting(currentIndex.value)
    }

    function handleTagClose(value: string | number) {
      handleSelect(optionValueMap.get(value)!)
    }

    function handleSelect(option: SelectOptionState) {
      if (!option) return

      const selected = isSelected(option)
      const value = option.value

      if (selected) {
        removeArrayItem(userOptions.value, item => item.value === value)
        optionValueMap.delete(value)
      } else {
        if (!props.multiple) {
          userOptions.value.length = 0
        }

        if (dynamicOption.value && value === dynamicOption.value) {
          const newOption = { ...dynamicOption }

          userOptions.value.push(newOption)
          optionValueMap.set(value, newOption)
        }
      }

      emitEvent(props[props.multiple && selected ? 'onCancel' : 'onSelect'], value, option.data)
      handleChange(option)

      if (props.multiple) {
        currentFilter.value = ''

        syncInputValue()
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
        emit('update:label', currentLabels.value)
        validateField()
      } else {
        const prevValue = currentValues.value[0]

        currentValues.value.length = 0
        currentLabels.value.length = 0
        currentValues.value.push(option.value)
        currentLabels.value.push(option.label)

        if (prevValue !== option.value) {
          emittedValue = option.value

          setFieldValue(emittedValue)
          emitEvent(props.onChange, emittedValue, option.data)
          emit('update:value', emittedValue)
          emit('update:label', currentLabels.value[0])
          validateField()
        }
      }
    }

    function toggleVisible() {
      if (props.disabled || (props.loading && props.loadingLock)) return

      currentVisible.value = !currentVisible.value
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
        for (const option of userOptions.value) {
          optionValueMap.delete(option.value)
        }

        userOptions.value.length = 0
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

    function syncInputValue() {
      if (!input.value) return

      const visible = currentVisible.value

      if (props.multiple) {
        input.value.value = ''
      } else {
        input.value.value = visible ? '' : currentLabels.value[0] || ''
      }

      visible ? input.value.focus() : input.value.blur()
    }

    function handleFilterInput() {
      if (!input.value) return

      currentFilter.value = input.value.value

      if (showDynamic.value || currentIndex.value !== -1) {
        currentIndex.value = 0
      } else {
        currentIndex.value = visibleOptions.value.findIndex(
          option => String(option.value) === currentFilter.value
        )
      }

      requestAnimationFrame(() => {
        if (props.multiple && device.value) {
          anchorWidth.value = getRangeWidth(device.value)
        }

        updatePopper()
      })
    }

    function handleBackspace(event: KeyboardEvent) {
      if (!input.value) return

      if (event.key === 'Backspace' && !input.value.value && !isNull(currentValues.value.at(-1))) {
        event.stopPropagation()
        handleTagClose(currentValues.value.at(-1)!)
      }
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
      currentFilter,
      anchorWidth,

      className,
      selectorClass,
      hasValue,
      hasPrefix,
      visibleOptions,
      totalOptions,
      showClear,
      normalOptions,
      optionParentMap,

      wrapper,
      reference,
      popper,
      input,
      device,
      virtualList,

      isSelected,
      filterOptions,
      updateHitting,
      handleTagClose,
      handleSelect,
      toggleVisible,
      handleClear,
      handleFocus,
      handleBlur,
      handleFilterInput,
      handleBackspace
    }
  }
})
</script>
