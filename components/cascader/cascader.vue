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
          <slot name="control">
            <template v-if="props.multiple">
              <Tag
                v-for="(item, index) in currentValues"
                :key="index"
                :class="`${prefixCls}__tag`"
                closable
                @click.stop="handleClick"
                @close="handleSelect(item)"
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
      <transition :name="props.transitionName" @after-enter="isPopperShow = true">
        <div
          v-show="currentVisible"
          ref="popper"
          :class="[`${prefixCls}__popper`, `${prefixCls}-vars`]"
          @click.stop
        >
          <div :class="`${prefixCls}__panes`">
            <CascaderPane
              v-for="(items, index) in optionsList"
              :key="index"
              :options="items"
              :opened-id="openedIds[index]"
              :values="currentValues"
              :checkbox="props.multiple"
              :ready="isPopperShow"
              @select="handleOptionSelect($event, index)"
              @hover="props.hoverTrigger && handleOptionSelect($event, index)"
              @check="handleOptionCheck($event)"
            ></CascaderPane>
          </div>
        </div>
      </transition>
    </Portal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRef, computed, watch, watchEffect, inject } from 'vue'
import CascaderPane from './cascader-pane.vue'
import { Icon } from '@/components/icon'
import { Tag } from '@/components/tag'
import { Portal } from '@/components/portal'
import { VALIDATE_FIELD, CLEAR_FIELD } from '@/components/form-item'
import { useProps, useLocale, booleanProp, booleanStringProp, sizeProp, stateProp, createSizeProp, createStateProp } from '@vexip-ui/config'
import { useHover, usePopper, placementWhileList, useClickOutside } from '@vexip-ui/mixins'
import { noop, isNull, transformListToMap, transformTree, flatTree, removeArrayItem } from '@vexip-ui/utils'
import { ChevronDown, CircleXmark } from '@vexip-ui/icons'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'
import type { CascaderValue, OptionKeyConfig, OptionState } from './symbol'

const ID_KEY = Symbol('ID_KEY')
const PARENT_KEY = Symbol('PARENT_KEY')

const defaultKeyConfig: Required<OptionKeyConfig> = {
  value: 'value',
  label: 'label',
  children: 'children',
  disabled: 'disabled',
  branch: 'branch'
}

export default defineComponent({
  name: 'Cascader',
  components: {
    CascaderPane,
    Icon,
    Portal,
    Tag,
    ChevronDown,
    CircleXmark
  },
  props: {
    size: sizeProp,
    state: stateProp,
    value: Array as PropType<CascaderValue>,
    visible: booleanProp,
    options: Array as PropType<Array<Record<string, any>>>,
    placeholder: String,
    prefix: Object,
    prefixColor: String,
    suffix: Object,
    suffixColor: String,
    noCascaded: booleanProp,
    multiple: booleanProp,
    disabled: booleanProp,
    disableValidate: booleanProp,
    clearable: booleanProp,
    placement: String as PropType<Placement>,
    transfer: booleanStringProp,
    staticSuffix: booleanProp,
    noSuffix: booleanProp,
    transitionName: String,
    outsideClose: booleanProp,
    keyConfig: Object as PropType<OptionKeyConfig>,
    separator: String,
    hoverTrigger: booleanProp,
    absolute: booleanProp,
    maxTagCount: Number
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
    const props = useProps('cascader', _props, {
      size: createSizeProp(),
      state: createStateProp(),
      value: {
        default: null,
        static: true
      },
      visible: {
        default: false,
        static: true
      },
      options: {
        default: () => [],
        static: true
      },
      placeholder: null,
      prefix: null,
      prefixColor: '',
      suffix: null,
      suffixColor: '',
      noCascaded: false,
      multiple: false,
      disabled: false,
      disableValidate: false,
      clearable: false,
      placement: {
        default: 'bottom-start' as Placement,
        validator: (value: Placement) => placementWhileList.includes(value)
      },
      transfer: false,
      staticSuffix: false,
      noSuffix: false,
      transitionName: 'vxp-drop',
      outsideClose: true,
      keyConfig: () => ({}),
      separator: {
        default: '/',
        validator: (value: string) => value.length === 1
      },
      hoverTrigger: false,
      absolute: false,
      maxTagCount: 0
    })

    const validateField = inject(VALIDATE_FIELD, noop)
    const clearField = inject(CLEAR_FIELD, noop)

    const prefix = 'vxp-cascader'
    const currentVisible = ref(props.visible)
    const currentLabels = ref<string[]>([])
    const currentValues = ref<string[]>([])
    const isPopperShow = ref(false)
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')

    const emittedValue = ref<CascaderValue | null>(null)
    const optionTree = ref<OptionState[]>(null!)

    let optionValueMap: Map<string, OptionState> = null!
    let optionIdMap: Record<number, OptionState> = (null!)

    watchEffect(() => {
      const {
        value: valueKey,
        label: labelKey,
        children: childrenKey,
        disabled: disabledKey,
        branch: branchKey
      } = { ...defaultKeyConfig, ...props.keyConfig }
      const rawOptions = flatTree(props.options as Array<Record<string | symbol, any>>, {
        keyField: ID_KEY,
        parentField: PARENT_KEY,
        childField: childrenKey
      })

      const options = rawOptions.map(rawOption => {
        const {
          [ID_KEY]: id,
          [PARENT_KEY]: parent,
          [valueKey]: value,
          [labelKey]: label,
          [disabledKey]: disabled,
          [branchKey]: branch
        } = rawOption

        return reactive<OptionState>({
          id,
          parent,
          value,
          disabled,
          branch,
          label: label || String(value),
          fullValue: '',
          fullLabel: '',
          children: [],
          checked: false,
          partial: false,
          data: rawOption
        })
      })

      const idMap = transformListToMap(options, 'id')
      const separator = props.separator
      const valueMap = new Map<string, OptionState>()

      for (let i = 0, len = options.length; i < len; ++i) {
        const option = options[i]

        let value = option.value as string
        let label = option.label
        let parent = option.parent

        while (idMap[parent]) {
          value = `${idMap[parent].value}${separator}${value}`
          label = `${idMap[parent].label}${separator}${label}`
          parent = idMap[parent].parent
        }

        option.fullValue = value
        option.fullLabel = label
        valueMap.set(value, option)
      }

      optionValueMap = valueMap
      optionIdMap = idMap
      optionTree.value = transformTree(options)

      console.log(optionTree)
    })

    const openedIds = ref<number[]>([])
    const optionsList = computed(() => {
      return [
        optionTree.value,
        ...openedIds.value.map(id => {
          const option = optionIdMap[id]

          return option.children?.length ? option.children : null!
        }).filter(Boolean)
      ]
    })

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
    const hasValue = computed(() => !!currentValues.value[0])
    const hasPrefix = computed(() => {
      return !!(slots.prefix || props.prefix)
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
      } else {
        isPopperShow.value = false
      }

      emit('toggle', value)
      emit('update:visible', value)
    })

    let outsideChanged = false

    watch(emittedValue, () => {
      outsideChanged = true
    })
    watch(
      () => props.value,
      value => {
        if (value !== emittedValue.value || outsideChanged) {
          initValueAndLabel(value)
        }
      },
      { immediate: true }
    )

    function isFlatArray<T extends string | number>(value: T[] | T[][]): value is T[] {
      return !!value.length && !Array.isArray(value[0])
    }

    function isComplexArray<T extends string | number>(value: T[] | T[][]): value is T[][] {
      return !!value.length && Array.isArray(value[0])
    }

    function initValueAndLabel(value: CascaderValue) {
      if (!value.length) {
        currentValues.value = []
        currentLabels.value = []
        return
      }

      if (props.multiple) {
        const normalizedValue = isFlatArray(value) ? [value] : value
        const valueSet = new Set<string>(normalizedValue.map(v => v.join(props.separator)))
        const selectedValues: string[] = []
        const selectedLabels: string[] = []

        valueSet.forEach(value => {
          const option = optionValueMap.get(value)

          if (option) {
            selectedValues.push(value)
            selectedLabels.push(option.fullLabel)
          }
        })

        currentValues.value = selectedValues
        currentLabels.value = selectedLabels
      } else {
        const normalizedValue = isComplexArray(value) ? value[0] : value
        const stringValue = normalizedValue.join(props.separator)
        const option = optionValueMap.get(stringValue)

        if (option) {
          currentValues.value = [stringValue]
          currentLabels.value = [option.fullLabel]
        } else {
          currentValues.value = []
          currentLabels.value = []
        }
      }

      if (openedIds.value.length) return

      const firstValue = currentValues.value[0]

      if (firstValue) {
        const option = optionValueMap.get(firstValue)!
        const ids = [option.id]

        let parentId = option.parent

        while (parentId && optionIdMap[parentId]) {
          const parent = optionIdMap[parentId]

          ids.push(parent.id)
          parentId = parent.parent
        }

        openedIds.value = ids.reverse()
      }
    }

    function handleOptionSelect(id: number, depth: number) {
      const option = optionIdMap[id]

      if (!option) return

      if (option.branch || option.children?.length) {
        if (depth < openedIds.value.length) {
          openedIds.value = openedIds.value.slice(0, depth)
        }

        openedIds.value.push(id)
      } else {
        handleSelect(option.fullValue)
      }
    }

    function updateCheckedUpward(originOption: OptionState) {
      let option = originOption

      while (!isNull(option.parent)) {
        const parentId = option.parent

        if (!optionIdMap[parentId]) break

        const parent = optionIdMap[parentId]

        if (option.checked === parent.checked && option.partial === parent.partial) {
          break
        }

        if (option.checked) {
          parent.checked = parent.children.every(item => item.disabled || item.checked)
          parent.partial = !parent.checked
        } else {
          parent.checked = false
          parent.partial = parent.children.some(
            item => item.checked || item.partial
          )
        }

        option = parent
      }
    }

    function updateCheckedDown(originOption: OptionState) {
      const checked = originOption.checked
      const partial = originOption.partial

      const loop = [...originOption.children]

      let option

      while (loop.length) {
        option = loop.shift()!

        if (option.disabled) continue

        option.checked = checked
        option.partial = partial

        if (option.children?.length) {
          loop.push(...option.children)
        }
      }
    }

    function handleOptionCheck(id: number) {
      const option = optionIdMap[id]

      if (!option) return

      const checked = !option.checked
      option.checked = checked
      option.partial = false

      const options = [option].concat(
        Object.values(optionIdMap).filter(option => option.disabled && option.checked)
      )

      for (let i = 0, len = options.length; i < len; ++i) {
        const option = options[i]

        updateCheckedUpward(option)
        updateCheckedDown(option)
      }
    }

    function handleSelect(fullValue: string) {
      const option = optionValueMap.get(fullValue)

      if (!option) return

      emit(
        props.multiple && currentValues.value.includes(fullValue) ? 'cancel' : 'select',
        fullValue,
        option.fullLabel
      )
      handleChange(fullValue)

      if (!props.multiple) {
        currentVisible.value = false
      } else {
        updatePopper()
      }
    }

    function queryArrayMeta(fullValue: string) {
      let option = optionValueMap.get(fullValue)!

      if (!option) return { value: [], data: [] }

      const value = [option.value]
      const data = [option.data]

      while (option.parent) {
        const parent = optionIdMap[option.parent]

        if (!parent) break

        value.push(parent.value)
        data.push(parent.data)
        option = parent
      }

      return {
        value: value.reverse(),
        data: data.reverse()
      }
    }

    function handleChange(fullValue: string) {
      const option = optionValueMap.get(fullValue)

      if (!option) return

      outsideChanged = false

      if (props.multiple) {
        if (fullValue && currentValues.value.includes(fullValue)) {
          removeArrayItem(currentValues.value, fullValue)
          removeArrayItem(currentLabels.value, option.fullLabel)
        } else {
          currentValues.value.push(fullValue)
          currentLabels.value.push(option.fullLabel)
        }
      } else {
        if (fullValue) {
          currentValues.value[0] = fullValue
          currentLabels.value[0] = option.fullLabel
        } else {
          currentValues.value.length = 0
          currentLabels.value.length = 0
        }
      }

      if (props.multiple) {
        const values: (string | number)[][] = []
        const dataList: Array<Record<string, any>> = []

        currentValues.value.forEach(fullValue => {
          const { value, data } = queryArrayMeta(fullValue)

          values.push(value)
          dataList.push(data)
        })

        emittedValue.value = values

        emit('change', values, dataList)
        emit('update:value', values)
      } else {
        const { value, data } = queryArrayMeta(fullValue)

        emittedValue.value = value

        emit('change', value, data)
        emit('update:value', value)
      }

      if (!props.disableValidate) {
        validateField()
      }
    }

    function handleClick() {
      if (props.disabled) return

      currentVisible.value = !currentVisible.value
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
        openedIds.value.length = 0
        emittedValue.value = []

        emit('change', emittedValue.value, [])
        emit('update:value', emittedValue.value)
        emit('clear')
        clearField()
      }
    }

    return {
      props,
      prefixCls: prefix,
      locale,
      currentVisible,
      isPopperShow,
      currentLabels,
      currentValues,
      optionTree,
      transferTo,
      isHover,
      openedIds,

      optionsList,
      className,
      selectorClass,
      hasValue,
      hasPrefix,

      wrapper,
      reference,
      popper,

      handleOptionSelect,
      handleOptionCheck,
      handleSelect,
      handleClick,
      handleClickOutside,
      handleClear
    }
  }
})
</script>
