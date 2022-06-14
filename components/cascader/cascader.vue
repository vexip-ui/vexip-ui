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
          <div v-if="props.multiple" ref="tagWrapper" :class="[`${prefixCls}__tags`]">
            <Tag
              v-for="(item, index) in templateValues"
              :key="index"
              :class="`${prefixCls}__tag`"
              :type="props.tagType"
              closable
              @click.stop="handleClick"
              @close="handleTipClose(item)"
            >
              {{ templateLabels[index] }}
            </Tag>
            <Tag
              v-if="props.noRestTip"
              ref="tagCounter"
              :class="[`${prefixCls}__tag`, `${prefixCls}__counter`]"
              :type="props.tagType"
            >
              {{ `+${restTagCount}` }}
            </Tag>
            <Tooltip
              v-else
              ref="tagCounter"
              :class="`${prefixCls}__tooltip`"
              :visible="restTipShow"
              trigger="custom"
              placement="top-end"
              :tip-class="`${prefixCls}__rest-tip`"
              @click.stop="toggleShowRestTip"
            >
              <Tag :class="[`${prefixCls}__tag`, `${prefixCls}__counter`]" :type="props.tagType">
                {{ `+${restTagCount}` }}
              </Tag>
              <template #tip>
                <NativeScroll use-y-bar>
                  <template v-for="(item, index) in templateValues" :key="index">
                    <Tag
                      v-if="index >= templateValues.length - restTagCount"
                      :class="`${prefixCls}__tag`"
                      closable
                      :type="props.tagType"
                      @close="handleTipClose(item)"
                    >
                      {{ templateLabels[index] }}
                    </Tag>
                  </template>
                </NativeScroll>
              </template>
            </Tooltip>
          </div>
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
              :ready="isPopperShow"
              :multiple="props.multiple"
              :is-async="isAsyncLoad"
              :merged="usingMerged"
              @select="handleOptionSelect($event, index)"
              @hover="usingHover && handlePaneOpen($event, index)"
              @check="handleOptionCheck($event)"
            >
              <template #default="{ option, index: optionIndex, selected, canCheck, hasChild, handleSelect }">
                <slot
                  :option="option"
                  :index="optionIndex"
                  :selected="selected"
                  :can-check="canCheck"
                  :has-child="hasChild"
                  :handle-select="handleSelect"
                ></slot>
              </template>
              <template #label="{ option, index: optionIndex, selected, canCheck, hasChild, handleSelect }">
                <slot
                  name="label"
                  :option="option"
                  :index="optionIndex"
                  :selected="selected"
                  :can-check="canCheck"
                  :has-child="hasChild"
                  :handle-select="handleSelect"
                ></slot>
              </template>
            </CascaderPane>
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
  toRef,
  computed,
  watch,
  watchEffect,
  onMounted,
  inject,
  nextTick
} from 'vue'
import CascaderPane from './cascader-pane.vue'
import { Icon } from '@/components/icon'
import { NativeScroll } from '@/components/native-scroll'
import { Portal } from '@/components/portal'
import { Tag } from '@/components/tag'
import { Tooltip } from '@/components/tooltip'
import { VALIDATE_FIELD, CLEAR_FIELD } from '@/components/form-item'
import {
  useProps,
  useLocale,
  booleanProp,
  booleanStringProp,
  sizeProp,
  stateProp,
  createSizeProp,
  createStateProp
} from '@vexip-ui/config'
import {
  useHover,
  usePopper,
  placementWhileList,
  useClickOutside
} from '@vexip-ui/mixins'
import {
  noop,
  isNull,
  isPromise,
  transformListToMap,
  transformTree,
  flatTree
} from '@vexip-ui/utils'
import { ChevronDown, CircleXmark } from '@vexip-ui/icons'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'
import type { TagType } from '@/components/tag'
import type { CascaderValue, OptionKeyConfig, OptionState } from './symbol'

const ID_KEY = Symbol('ID_KEY')
const PARENT_KEY = Symbol('PARENT_KEY')

const defaultKeyConfig: Required<OptionKeyConfig> = {
  value: 'value',
  label: 'label',
  children: 'children',
  disabled: 'disabled',
  hasChild: 'hasChild'
}

export default defineComponent({
  name: 'Cascader',
  components: {
    CascaderPane,
    Icon,
    NativeScroll,
    Portal,
    Tag,
    Tooltip,
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
    maxTagCount: Number,
    briefLabel: booleanProp,
    noRestTip: booleanProp,
    onAsyncLoad: Function as PropType<(data: Record<string, any>) => any[] | Promise<any[]>>,
    mergeTags: booleanProp,
    tagType: String as PropType<TagType>
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
      maxTagCount: 0,
      briefLabel: false,
      noRestTip: false,
      onAsyncLoad: {
        default: null,
        isFunc: true
      },
      mergeTags: false,
      tagType: null
    })

    const validateField = inject(VALIDATE_FIELD, noop)
    const clearField = inject(CLEAR_FIELD, noop)

    const prefix = 'vxp-cascader'
    const currentVisible = ref(props.visible)
    const currentValues = ref<string[]>([])
    const currentLabels = ref<string[]>([])
    const mergedValues = ref<string[]>([])
    const mergedLabels = ref<string[]>([])
    const isPopperShow = ref(false)
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')

    const emittedValue = ref<CascaderValue | null>(null)
    const optionTree = ref<OptionState[]>(null!)
    const isAsyncLoad = computed(() => typeof props.onAsyncLoad === 'function')

    let optionValueMap: Map<string, OptionState> = null!
    let optionIdMap: Record<number, OptionState> = (null!)

    const updateTrigger = ref(0)

    watchEffect(() => {
      /* eslint-disable no-unused-expressions */
      props.keyConfig.value
      props.keyConfig.label
      props.keyConfig.children
      props.keyConfig.disabled
      props.keyConfig.hasChild
      props.separator
      isAsyncLoad.value
      /* eslint-disable no-unused-expressions */

      updateTrigger.value++
    })

    watch(updateTrigger, initOptionStates, { immediate: true })

    function initOptionStates() {
      const childrenKey = props.keyConfig.children ?? defaultKeyConfig.children
      const rawOptions = flatTree(props.options as Array<Record<string | symbol, any>>, {
        keyField: ID_KEY,
        parentField: PARENT_KEY,
        childField: childrenKey
      })

      const options = createOptionStates(rawOptions)
      const separator = props.separator
      const isAsync = isAsyncLoad.value

      optionIdMap = transformListToMap(options, 'id')
      optionValueMap = new Map<string, OptionState>()

      for (let i = 0, len = options.length; i < len; ++i) {
        const option = options[i]

        initOptionFull(option, separator)
        optionValueMap.set(option.fullValue, option)

        if (isAsync) {
          option.childrenLoaded = queryChildrenLoaded(option)
        }
      }

      optionTree.value = transformTree(options)
    }

    const openedIds = ref<number[]>([])
    const optionsList = computed(() => {
      return [
        optionTree.value,
        ...openedIds.value.map(id => {
          const option = optionIdMap[id]

          return option.children
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
    const tagWrapper = ref<HTMLElement | null>(null)
    const tagCounter = ref<InstanceType<typeof Tag> | null>(null)
    const restTagCount = ref(0)
    const restTipShow = ref(false)

    const className = computed(() => {
      return {
        [prefix]: true,
        'vxp-input-vars': true,
        [`${prefix}-vars`]: true,
        [`${prefix}--multiple`]: props.multiple,
        [`${prefix}--responsive`]: props.multiple && props.maxTagCount <= 0
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
    const hasPrefix = computed(() => {
      return !!(slots.prefix || props.prefix)
    })
    const usingMerged = computed(() => props.mergeTags && !props.noCascaded)
    const templateValues = computed(() => usingMerged.value ? mergedValues.value : currentValues.value)
    const templateLabels = computed(() => usingMerged.value ? mergedLabels.value : currentLabels.value)
    const hasValue = computed(() => !!templateValues.value[0])
    const usingHover = computed(() => props.hoverTrigger && !isAsyncLoad.value)

    watch(
      () => props.visible,
      value => {
        currentVisible.value = value
      }
    )
    watch(currentVisible, value => {
      if (value) {
        restTipShow.value = false
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
    watch(
      () => props.maxTagCount,
      computeTagsOverflow
    )
    watch(
      () => props.noRestTip,
      () => {
        nextTick(computeTagsOverflow)
      }
    )
    watch(
      () => props.briefLabel,
      brief => {
        currentLabels.value = currentValues.value
          .map(value => optionValueMap.get(value)?.[brief ? 'label' : 'fullLabel'] as string)
          .filter(Boolean)

        nextTick(computeTagsOverflow)
      }
    )
    watch(
      isAsyncLoad,
      value => {
        if (value) {
          Object.values(optionIdMap).forEach(option => {
            option.childrenLoaded = queryChildrenLoaded(option)
          })
        }
      }
    )
    watch(usingMerged, value => {
      if (value) {
        mergedValues.value.length = 0
        mergedLabels.value.length = 0

        updateMergedProps()
      }

      if (isAsyncLoad.value) {
        const originalOptions: OptionState[] = []

        Object.values(optionIdMap).forEach(option => {
          if (option.checked) {
            originalOptions.push(option)
          }

          if (option.hasChild && !option.children.length && !option.loaded) {
            option.checked = false
          }
        })

        for (let i = 0, len = originalOptions.length; i < len; ++i) {
          const option = originalOptions[i]

          updateCheckedUpward(option)
          updateCheckedDown(option)
        }
      }

      emitMultipleChange()
    })

    onMounted(() => {
      nextTick(hideTagCounter)
    })

    function createOptionStates(rawOptions: Record<string | symbol, any>[]) {
      const {
        value: valueKey,
        label: labelKey,
        disabled: disabledKey,
        hasChild: hasChildKey
      } = { ...defaultKeyConfig, ...props.keyConfig }

      return rawOptions.map(rawOption => {
        const {
          [ID_KEY]: id,
          [PARENT_KEY]: parent,
          [valueKey]: value,
          [labelKey]: label,
          [disabledKey]: disabled,
          [hasChildKey]: hasChild
        } = rawOption

        return reactive<OptionState>({
          id,
          parent,
          value,
          disabled,
          hasChild,
          label: label || String(value),
          fullValue: '',
          fullLabel: '',
          children: [],
          checked: false,
          partial: false,
          loading: false,
          loaded: false,
          error: false,
          childrenLoaded: false,
          data: rawOption
        })
      })
    }

    function initOptionFull(option: OptionState, separator: string) {
      let value = option.value as string
      let label = option.label
      let parent = option.parent

      while (optionIdMap[parent]) {
        value = `${optionIdMap[parent].value}${separator}${value}`
        label = `${optionIdMap[parent].label}${separator}${label}`
        parent = optionIdMap[parent].parent
      }

      option.fullValue = value
      option.fullLabel = label
    }

    function queryChildrenLoaded(option: OptionState) {
      if (option.hasChild && !option.children?.length) {
        return option.loaded
      }

      const loop: OptionState[] = [...option.children]

      while (loop.length) {
        const child = loop.shift()!

        if (child.childrenLoaded) continue

        if (child.hasChild && !child.children?.length) {
          child.childrenLoaded = child.loaded

          if (!child.loaded) return false
        }

        loop.push(...child.children)
      }

      return true
    }

    function updateMergedProps() {
      const baseValues = isAsyncLoad.value
        ? currentValues.value.concat(mergedValues.value)
        : currentValues.value
      const values = new Set(baseValues)
      const loop = [...baseValues]

      while (loop.length) {
        const value = loop.shift()!

        const option = optionValueMap.get(value)

        if (option) {
          const parent = optionIdMap[option.parent]

          if (parent?.checked) {
            values.delete(value)
            values.add(parent.fullValue)
            loop.push(parent.fullValue)
          }
        }
      }

      const briefLabel = props.briefLabel

      mergedValues.value = Array.from(values).filter(value => optionValueMap.has(value))
      mergedLabels.value = mergedValues.value
        .map(value => {
          const option = optionValueMap.get(value)!

          return briefLabel ? option.label : option.fullLabel
        })
        .filter(Boolean)
    }

    function isFlatArray<T extends string | number>(value: T[] | T[][]): value is T[] {
      return !!value.length && !Array.isArray(value[0])
    }

    function isComplexArray<T extends string | number>(value: T[] | T[][]): value is T[][] {
      return !!value.length && Array.isArray(value[0])
    }

    function initValueAndLabel(value: CascaderValue) {
      if (!value?.length) {
        currentValues.value = []
        currentLabels.value = []
        return
      }

      const briefLabel = props.briefLabel

      if (props.multiple) {
        const normalizedValue = isFlatArray(value) ? [value] : value
        const valueSet = new Set<string>(normalizedValue.map(v => v.join(props.separator)))
        const selectedValues: string[] = []
        const selectedLabels: string[] = []
        const selectedOptions: OptionState[] = []

        valueSet.forEach(value => {
          const option = optionValueMap.get(value)

          if (option) {
            option.checked = true
            option.partial = false

            selectedValues.push(value)
            selectedLabels.push(briefLabel ? option.label : option.fullLabel)
            selectedOptions.push(option)
          }
        })

        if (!props.noCascaded) {
          const originalOptions = selectedOptions.concat(
            Object.values(optionIdMap).filter(option => option.disabled && option.checked)
          )

          for (let i = 0, len = originalOptions.length; i < len; ++i) {
            const option = originalOptions[i]

            updateCheckedUpward(option)
            updateCheckedDown(option)
          }
        }

        currentValues.value = selectedValues
        currentLabels.value = selectedLabels
      } else {
        const normalizedValue = isComplexArray(value) ? value[0] : value
        const stringValue = normalizedValue.join(props.separator)
        const option = optionValueMap.get(stringValue)

        if (option) {
          currentValues.value = [stringValue]
          currentLabels.value = [briefLabel ? option.label : option.fullLabel]
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

        openedIds.value = ids.reverse().slice(0, -1)
      }
    }

    async function handlePaneOpen(option: OptionState, depth: number) {
      if (!option.hasChild && !option.children?.length) return

      if (isAsyncLoad.value && !option.children?.length && !option.loaded) {
        option.loading = true

        let result: ReturnType<typeof props.onAsyncLoad>

        try {
          result = props.onAsyncLoad(option.data)
          result = isPromise(result) ? await result : result
        } catch (e) {
          option.error = true
          option.loading = false
          return
        }

        const rawOptions = result as any[]

        if (!Array.isArray(rawOptions) || !rawOptions.length) {
          option.hasChild = false
        } else {
          const options = createOptionStates(rawOptions)
          const parentId = option.id
          const separator = props.separator

          option.children.push(...options)

          let idCount = Math.max(...Object.keys(optionIdMap).map(Number)) + 1

          options.forEach(option => {
            option.id = idCount++
            option.parent = parentId
            optionIdMap[option.id] = option

            initOptionFull(option, separator)
            optionValueMap.set(option.fullValue, option)
          })
        }

        option.loaded = true
        option.loading = false

        const upstream = queryUpstreamOptions(option)
        upstream.forEach(option => {
          option.childrenLoaded = queryChildrenLoaded(option)
        })
      }

      if (depth < openedIds.value.length) {
        openedIds.value = openedIds.value.slice(0, depth)
      }

      openedIds.value.push(option.id)
    }

    function handleOptionSelect(option: OptionState, depth: number) {
      if (!option) return

      if (option.hasChild || option.children?.length) {
        handlePaneOpen(option, depth)
      } else {
        handleSingleSelect(option.fullValue)
      }
    }

    function queryUpstreamOptions(option: OptionState) {
      const options = [option]
      let parentId = option.parent

      while (parentId && optionIdMap[parentId]) {
        options.push(optionIdMap[parentId])
        parentId = optionIdMap[parentId].parent
      }

      return options
    }

    function updateCheckedUpward(originalOption: OptionState) {
      let option = originalOption

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

    function updateCheckedDown(originalOption: OptionState) {
      const checked = originalOption.checked
      const partial = originalOption.partial

      const loop = [...originalOption.children]

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

    function handleOptionCheck(option: OptionState) {
      if (!option) return

      const options = Object.values(optionIdMap)
      const checked = !option.checked

      option.checked = checked
      option.partial = false

      if (!props.noCascaded) {
        const originalOptions = [option].concat(
          options.filter(option => option.disabled && option.checked)
        )

        for (let i = 0, len = originalOptions.length; i < len; ++i) {
          const option = originalOptions[i]

          updateCheckedUpward(option)
          updateCheckedDown(option)
        }
      }

      emit(checked ? 'select' : 'cancel', option.fullValue, option.data)
      emitMultipleChange()
    }

    function emitMultipleChange() {
      const options = Object.values(optionIdMap)
      const selectedOptions = props.noCascaded
        ? options.filter(option => option.checked)
        : options.filter(
          option => option.checked && !(option.hasChild || option.children?.length)
        )

      const selectedValues: string[] = []
      const selectedLabels: string[] = []

      const values: (string | number)[][] = []
      const dataList: Array<Record<string, any>> = []
      const briefLabel = props.briefLabel

      selectedOptions.forEach(option => {
        selectedValues.push(option.fullValue)
        selectedLabels.push(briefLabel ? option.label : option.fullLabel)

        const { value, data } = queryArrayMeta(option.fullValue)

        values.push(value)
        dataList.push(data)
      })

      currentValues.value = selectedValues
      currentLabels.value = selectedLabels

      if (usingMerged.value) {
        if (isAsyncLoad.value) {
          mergedValues.value = options.filter(option => option.checked).map(option => option.fullValue)
        }

        updateMergedProps()
      }

      if (usingMerged.value && isAsyncLoad.value) {
        values.length = 0
        dataList.length = 0

        mergedValues.value.forEach(fullValue => {
          const option = optionValueMap.get(fullValue)

          if (option) {
            const { value, data } = queryArrayMeta(option.fullValue)

            values.push(value)
            dataList.push(data)
          }
        })
      }

      emitChangeEvent(values, dataList)
      !props.disableValidate && validateField()
      nextTick(computeTagsOverflow)
    }

    function computeTagsOverflow() {
      if (!tagWrapper.value || !tagCounter.value?.$el) return

      const conter = tagCounter.value?.$el as HTMLElement
      const children = tagWrapper.value.children
      const maxTagCount = props.maxTagCount

      if (maxTagCount > 0) {
        const childCount = children.length

        for (let i = 0, len = childCount - 1; i < len; ++i) {
          const child = children[i] as HTMLElement

          child.style.display = i < maxTagCount ? '' : 'none'
        }

        if (maxTagCount > childCount - 1) {
          conter.style.display = 'none'
          restTagCount.value = 0
        } else {
          conter.style.display = ''
          restTagCount.value = childCount - 1 - maxTagCount
        }

        return
      }

      conter.style.display = ''

      const wrapperWidth = tagWrapper.value.offsetWidth
      const childWidths: number[] = []

      let totalWidth = 0
      let hidden = false

      for (let i = 0, len = children.length - 1; i < len; ++i) {
        if (i < 0) continue

        const child = children[i] as HTMLElement

        if (hidden) {
          child.style.display = 'none'
          continue
        } else {
          child.style.display = ''
        }

        totalWidth += child.offsetWidth
        childWidths[i] = child.offsetWidth

        if (totalWidth > wrapperWidth) {
          for (let j = i; j >= 0; --j) {
            restTagCount.value = len - j
            totalWidth -= childWidths[j]

            if (totalWidth + conter.offsetWidth <= wrapperWidth || !j) {
              hidden = true
              i = j - 1
              break
            }
          }
        }
      }

      if (!hidden) {
        conter.style.display = 'none'
      }

      nextTick(updatePopper)
    }

    function hideTagCounter() {
      if (tagCounter.value?.$el) {
        tagCounter.value.$el.style.display = 'none'
      }
    }

    function handleSingleSelect(fullValue: string) {
      const option = optionValueMap.get(fullValue)

      if (!option) return

      emit('select', fullValue, option.data)

      if (fullValue) {
        currentValues.value[0] = fullValue
        currentLabels.value[0] = props.briefLabel ? option.label : option.fullLabel
      } else {
        currentValues.value.length = 0
        currentLabels.value.length = 0
      }

      const { value, data } = queryArrayMeta(fullValue)

      emitChangeEvent(value, data)
      currentVisible.value = false
    }

    function emitChangeEvent(value: CascaderValue, data: Record<string, any> | Array<Record<string, any>>) {
      emittedValue.value = value

      nextTick(() => {
        outsideChanged = false

        emit('change', value, data)
        emit('update:value', value)

        !props.disableValidate && validateField()
      })
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

    function handleClick() {
      if (props.disabled) return

      currentVisible.value = !currentVisible.value
    }

    function handleClickOutside() {
      restTipShow.value = false

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
        mergedValues.value.length = 0
        mergedLabels.value.length = 0
        openedIds.value.length = 0
        emittedValue.value = []
        restTipShow.value = false

        Object.values(optionIdMap).forEach(option => {
          option.checked = false
          option.partial = false
        })

        emit('change', emittedValue.value, [])
        emit('update:value', emittedValue.value)
        emit('clear')
        clearField()
        hideTagCounter()
      }
    }

    function toggleShowRestTip() {
      if (!currentVisible.value) {
        restTipShow.value = !restTipShow.value
      } else {
        restTipShow.value = false
      }
    }

    function handleTipClose(fullValue: string) {
      if (props.multiple) {
        handleOptionCheck(optionValueMap.get(fullValue)!)
      } else {
        handleSingleSelect(fullValue)
      }

      nextTick(computeTagsOverflow)
    }

    return {
      props,
      prefixCls: prefix,
      locale,
      currentVisible,
      isPopperShow,
      currentValues,
      currentLabels,
      optionTree,
      transferTo,
      isHover,
      openedIds,
      restTagCount,
      restTipShow,

      optionsList,
      className,
      selectorClass,
      hasValue,
      hasPrefix,
      isAsyncLoad,
      usingMerged,
      templateValues,
      templateLabels,
      usingHover,

      wrapper,
      reference,
      popper,
      tagWrapper,
      tagCounter,

      handlePaneOpen,
      handleOptionSelect,
      handleOptionCheck,
      handleClick,
      handleClickOutside,
      handleClear,
      toggleShowRestTip,
      handleTipClose
    }
  }
})
</script>
