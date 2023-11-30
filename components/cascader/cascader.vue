<template>
  <div
    :id="idFor"
    ref="wrapper"
    :class="className"
    @click="toggleVisible()"
  >
    <div
      ref="reference"
      :class="selectorClass"
      tabindex="0"
      @keydown.space.prevent="toggleVisible()"
      @keydown.tab="toggleVisible(false)"
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
          <Overflow
            v-if="props.multiple"
            inherit
            :class="[nh.be('tags')]"
            :items="templateValues"
            :max-count="props.maxTagCount"
            @rest-change="restTagCount = $event"
          >
            <template #default="{ item, index }">
              <Tag
                inherit
                :class="nh.be('tag')"
                :type="props.tagType"
                closable
                :disabled="props.disabled"
                @click.stop="toggleVisible()"
                @close="handleTipClose(item)"
              >
                {{ templateLabels[index] }}
              </Tag>
            </template>
            <template #counter="{ count }">
              <Tag
                v-if="props.noRestTip"
                inherit
                :class="[nh.be('tag'), nh.be('counter')]"
                :type="props.tagType"
                :disabled="props.disabled"
              >
                {{ `+${count}` }}
              </Tag>
              <span v-else>
                <Tooltip
                  inherit
                  :transfer="false"
                  :visible="restTipShow"
                  trigger="custom"
                  placement="top-end"
                  :tip-class="nh.be('rest-tip')"
                  @click.stop="toggleShowRestTip"
                >
                  <template #trigger>
                    <Tag
                      inherit
                      :class="[nh.be('tag'), nh.be('counter')]"
                      :type="props.tagType"
                      :disabled="props.disabled"
                    >
                      {{ `+${count}` }}
                    </Tag>
                  </template>
                  <NativeScroll inherit use-y-bar>
                    <template v-for="(item, index) in templateValues" :key="index">
                      <Tag
                        v-if="index >= templateValues.length - restTagCount"
                        inherit
                        :class="nh.be('tag')"
                        closable
                        :type="props.tagType"
                        :disabled="props.disabled"
                        @close="handleTipClose(item)"
                      >
                        {{ templateLabels[index] }}
                      </Tag>
                    </template>
                  </NativeScroll>
                </Tooltip>
              </span>
            </template>
          </Overflow>
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
          <Icon v-else v-bind="icons.angleDown" :class="nh.be('arrow')"></Icon>
        </slot>
      </div>
      <div
        v-else-if="props.clearable || props.loading"
        :class="[nh.be('icon'), nh.bem('icon', 'placeholder'), nh.be('suffix')]"
      ></div>
      <Transition :name="nh.ns('fade')" appear>
        <div v-if="showClear" :class="[nh.be('icon'), nh.be('clear')]" @click.stop="handleClear">
          <Icon v-bind="icons.clear"></Icon>
        </div>
        <div v-else-if="props.loading" :class="[nh.be('icon'), nh.be('loading')]">
          <Icon
            v-bind="icons.loading"
            :effect="props.loadingEffect || icons.loading.effect"
            :icon="props.loadingIcon || icons.loading.icon"
          ></Icon>
        </div>
      </Transition>
    </div>
    <Popper
      ref="popper"
      :class="[nh.be('popper'), nh.ns('input-vars'), nh.bs('vars')]"
      :visible="currentVisible"
      :to="transferTo"
      :transition="props.transitionName"
      :alive="props.popperAlive ?? !transferTo"
      @click.stop
      @enter="handlePanelsEnter"
    >
      <div
        :class="{
          [nh.be('panels')]: true,
          [nh.bem('panels', 'empty')]: !optionsList[0] || !optionsList[0].length
        }"
      >
        <template v-if="optionsList[0] && optionsList[0].length">
          <CascaderPanel
            v-for="(items, index) in optionsList"
            :key="index"
            :ref="(panel: any) => panel && panelElList.push(panel)"
            :options="items"
            :opened-id="openedIds[index]"
            :values="currentValues"
            :ready="isPopperShow"
            :multiple="props.multiple"
            :is-async="isAsyncLoad"
            :merged="usingMerged"
            :no-cascaded="props.noCascaded"
            @select="handleOptionSelect($event, index)"
            @hover="usingHover && handlePanelOpen($event, index)"
            @check="handleOptionCheck($event)"
            @open="handlePanelKeyOpen($event, index)"
            @back="handlePanelBack"
            @close="currentVisible = false"
          >
            <template #default="payload">
              <slot v-bind="payload"></slot>
            </template>
            <template #label="payload">
              <slot name="label" v-bind="payload"></slot>
            </template>
          </CascaderPanel>
        </template>
        <div v-else :class="nh.be('empty')" :style="{ width: `${selectorWidth}px` }">
          <slot name="empty">
            {{ props.emptyText ?? locale.empty }}
          </slot>
        </div>
      </div>
    </Popper>
  </div>
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { NativeScroll } from '@/components/native-scroll'
import { Overflow } from '@/components/overflow'
import { Popper } from '@/components/popper'
import { Tag } from '@/components/tag'
import { Tooltip } from '@/components/tooltip'
import { useFieldStore } from '@/components/form'

import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUpdate,
  reactive,
  ref,
  toRef,
  watch,
  watchEffect
} from 'vue'

import CascaderPanel from './cascader-panel.vue'
import {
  createSizeProp,
  createStateProp,
  emitEvent,
  useIcons,
  useLocale,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { placementWhileList, useClickOutside, useHover, usePopper } from '@vexip-ui/hooks'
import { flatTree, isNull, isPromise, transformTree } from '@vexip-ui/utils'
import { cascaderProps } from './props'

import type { PopperExposed } from '@/components/popper'
import type { CascaderKeyConfig, CascaderOptionState, CascaderValue, Data } from './symbol'

type ChangeListener = (value: CascaderValue, data: Data[] | Data[][]) => void

const ID_KEY = Symbol('ID_KEY')
const PARENT_KEY = Symbol('PARENT_KEY')

const defaultKeyConfig: Required<CascaderKeyConfig> = {
  value: 'value',
  label: 'label',
  children: 'children',
  disabled: 'disabled',
  hasChild: 'hasChild'
}

export default defineComponent({
  name: 'Cascader',
  components: {
    CascaderPanel,
    Icon,
    NativeScroll,
    Overflow,
    Popper,
    Tag,
    Tooltip
  },
  props: cascaderProps,
  emits: ['update:value', 'update:visible'],
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
    } = useFieldStore<CascaderValue>(() => reference.value?.focus())

    const nh = useNameHelper('cascader')
    const props = useProps('cascader', _props, {
      size: createSizeProp(size),
      state: createStateProp(state),
      locale: null,
      value: {
        default: () => getFieldValue([]),
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
      disabled: () => disabled.value,
      clearable: false,
      placement: {
        default: 'bottom-start',
        validator: value => placementWhileList.includes(value)
      },
      transfer: false,
      staticSuffix: false,
      noSuffix: false,
      transitionName: () => nh.ns('drop'),
      outsideClose: true,
      keyConfig: () => ({}),
      separator: {
        default: '/',
        validator: value => value.length === 1
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
      tagType: null,
      emptyText: null,
      loading: () => loading.value,
      loadingIcon: null,
      loadingLock: false,
      loadingEffect: null,
      transparent: false,
      popperAlive: null
    })

    const icons = useIcons()
    const locale = useLocale('select', toRef(props, 'locale'))

    const currentVisible = ref(props.visible)
    const currentValues = ref<string[]>([])
    const currentLabels = ref<string[]>([])
    const mergedValues = ref<string[]>([])
    const mergedLabels = ref<string[]>([])
    const isPopperShow = ref(false)
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')

    const emittedValue = ref<CascaderValue | null>(null)
    const optionTree = ref<CascaderOptionState[]>(null!)
    const isAsyncLoad = computed(() => typeof props.onAsyncLoad === 'function')

    let optionList: CascaderOptionState[] = null!
    let optionIdMap: Map<number, CascaderOptionState> = null!
    let optionValueMap: Map<string, CascaderOptionState> = null!
    let outsideClosed = false
    let prevClosedId = -1
    let flattedOptions: Record<any, any>[]

    const updateTrigger = ref(0)

    watchEffect(() => {
      /* eslint-disable @typescript-eslint/no-unused-expressions */
      props.keyConfig.value
      props.keyConfig.label
      props.keyConfig.disabled
      props.keyConfig.hasChild
      props.separator
      isAsyncLoad.value
      /* eslint-enable */

      flattedOptions = flatTree(props.options as Record<any, any>[], {
        keyField: ID_KEY,
        parentField: PARENT_KEY,
        childField: props.keyConfig.children ?? defaultKeyConfig.children,
        forceInject: true
      })

      updateTrigger.value++
    })

    watch(updateTrigger, initOptionStates, { immediate: true })

    function initOptionStates() {
      const separator = props.separator
      const isAsync = isAsyncLoad.value

      optionList = createOptionStates(flattedOptions)
      optionIdMap = new Map()
      optionValueMap = new Map()

      for (let i = 0, len = optionList.length; i < len; ++i) {
        const option = optionList[i]

        initOptionFull(option, separator)
        optionIdMap.set(option.id, option)
        optionValueMap.set(option.fullValue, option)

        if (isAsync) {
          option.childrenLoaded = queryChildrenLoaded(option)
        }
      }

      optionTree.value = transformTree(optionList)
      initValueAndLabel(emittedValue.value)
    }

    const openedIds = ref<number[]>([])
    const optionsList = computed(() => {
      return [
        optionTree.value,
        ...openedIds.value.map(id => optionIdMap.get(id)?.children).filter(Boolean)
      ]
    })

    const wrapper = useClickOutside(handleClickOutside)
    const popper = ref<PopperExposed>()
    const { reference, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      popper: computed(() => popper.value?.wrapper),
      isDrop: true
    })
    const { isHover } = useHover(reference)

    const panelElList = ref<InstanceType<typeof CascaderPanel>[]>([])
    const restTagCount = ref(0)
    const restTipShow = ref(false)
    const selectorWidth = ref(0)

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.ns('input-vars')]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm('multiple')]: props.multiple,
        [nh.bm('responsive')]: props.multiple && props.maxTagCount <= 0
      }
    })
    const readonly = computed(() => props.loading && props.loadingLock)
    const selectorClass = computed(() => {
      const baseCls = nh.be('selector')

      return {
        [baseCls]: true,
        [`${baseCls}--focused`]: !props.disabled && currentVisible.value,
        [`${baseCls}--disabled`]: props.disabled,
        [`${baseCls}--readonly`]: readonly.value,
        [`${baseCls}--loading`]: props.loading,
        [`${baseCls}--${props.size}`]: props.size !== 'default',
        [`${baseCls}--${props.state}`]: props.state !== 'default',
        [`${baseCls}--has-prefix`]: hasPrefix.value,
        [`${baseCls}--has-suffix`]: !props.noSuffix,
        [`${baseCls}--transparent`]: props.transparent
      }
    })
    const hasPrefix = computed(() => {
      return !!(slots.prefix || props.prefix)
    })
    const usingMerged = computed(() => props.mergeTags && !props.noCascaded)
    const templateValues = computed(() =>
      usingMerged.value ? mergedValues.value : currentValues.value
    )
    const templateLabels = computed(() =>
      usingMerged.value ? mergedLabels.value : currentLabels.value
    )
    const hasValue = computed(() => !!templateValues.value[0])
    const usingHover = computed(() => props.hoverTrigger && !isAsyncLoad.value)
    const showClear = computed(() => {
      return (
        !props.disabled && !readonly.value && props.clearable && isHover.value && hasValue.value
      )
    })

    watch(
      () => props.visible,
      value => {
        currentVisible.value = value
      }
    )
    watch(currentVisible, async value => {
      if (value) {
        restTipShow.value = false
        selectorWidth.value = wrapper.value?.offsetWidth || 0
        await updatePopper()
        nextTick(() => {
          panelElList.value.at(-1)?.$el?.focus()
        })
      } else {
        isPopperShow.value = false

        if (reference.value && !outsideClosed) {
          reference.value.focus()
        }
      }

      outsideClosed = false
    })

    let outsideChanged = false

    watch(emittedValue, () => {
      outsideChanged = true
    })
    watch(
      () => props.value,
      value => {
        if (value !== emittedValue.value || outsideChanged) {
          emittedValue.value = value
          initValueAndLabel(value)
          nextTick(() => {
            outsideChanged = false
          })
        }
      },
      { immediate: true }
    )
    watch(
      () => props.briefLabel,
      brief => {
        currentLabels.value = currentValues.value
          .map(value => optionValueMap.get(value)?.[brief ? 'label' : 'fullLabel'] as string)
          .filter(Boolean)

        // nextTick(computeTagsOverflow)
      }
    )
    watch(isAsyncLoad, value => {
      if (value) {
        for (const option of optionIdMap.values()) {
          option.childrenLoaded = queryChildrenLoaded(option)
        }
      }
    })
    watch(usingMerged, value => {
      if (value) {
        mergedValues.value.length = 0
        mergedLabels.value.length = 0

        updateMergedProps()
      }

      if (isAsyncLoad.value) {
        const originalOptions: CascaderOptionState[] = []

        for (const option of optionIdMap.values()) {
          if (option.checked) {
            originalOptions.push(option)
          }

          if (option.hasChild && !option.children.length && !option.loaded) {
            option.checked = false
          }
        }

        for (let i = 0, len = originalOptions.length; i < len; ++i) {
          const option = originalOptions[i]

          updateCheckedUpward(option)
          updateCheckedDown(option)
        }
      }

      emitMultipleChange()
    })
    watch(
      () => optionsList.value.length,
      () => {
        updatePopper()
        nextTick(() => {
          const panel = panelElList.value.at(-1)

          if (panel?.$el) {
            panel.$el.focus()
          }

          prevClosedId = -1
        })
      }
    )
    watch(
      () => props.disabled,
      value => {
        if (value) {
          setVisible(false)
        }
      }
    )
    watch(readonly, value => {
      if (value) {
        setVisible(false)
      }
    })

    onBeforeUpdate(() => {
      panelElList.value.length = 0
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

        return reactive<CascaderOptionState>({
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

    function initOptionFull(option: CascaderOptionState, separator: string) {
      let value = option.value as string
      let label = option.label
      let parent = optionIdMap.get(option.parent)

      while (parent) {
        value = `${parent.value}${separator}${value}`
        label = `${parent.label}${separator}${label}`
        parent = optionIdMap.get(parent.parent)
      }

      option.fullValue = value
      option.fullLabel = label
    }

    function queryChildrenLoaded(option: CascaderOptionState) {
      if (option.hasChild && !option.children?.length) {
        return option.loaded
      }

      const loop: CascaderOptionState[] = [...option.children]

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
          const parent = optionIdMap.get(option.parent)

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

    function initValueAndLabel(value: CascaderValue | null) {
      for (const option of optionList) {
        option.checked = false
        option.partial = false
      }

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
        const selectedOptions: CascaderOptionState[] = []

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
            Array.from(optionIdMap.values()).filter(option => option.disabled && option.checked)
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

          if (props.noCascaded) {
            option.checked = true
            option.partial = false
          }
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

        let parent = optionIdMap.get(option.parent)

        while (parent) {
          ids.push(parent.id)
          parent = optionIdMap.get(parent.parent)
        }

        openedIds.value = ids.reverse().slice(0, -1)
      }
    }

    function setVisible(visible: boolean) {
      if (currentVisible.value === visible) return

      currentVisible.value = visible

      emit('update:visible', visible)
      emitEvent(props.onToggle, visible)
    }

    async function handlePanelOpen(option: CascaderOptionState, depth: number) {
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

          let idCount = Math.max(...Array.from(optionIdMap.keys()).map(Number)) + 1

          options.forEach(option => {
            option.id = idCount++
            option.parent = parentId

            initOptionFull(option, separator)

            optionIdMap.set(option.id, option)
            optionValueMap.set(option.fullValue, option)
          })

          optionList.push(...options)
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
      requestAnimationFrame(() => {
        panelElList.value.at(-1)?.$el?.focus()
      })
    }

    function handleOptionSelect(option: CascaderOptionState, depth: number) {
      if (!option) return

      if (option.hasChild || option.children?.length) {
        handlePanelOpen(option, depth)
      } else {
        handleSingleSelect(option.fullValue)
      }
    }

    function queryUpstreamOptions(option: CascaderOptionState) {
      const options = [option]
      let parent = optionIdMap.get(option.parent)

      while (parent) {
        options.push(parent)
        parent = optionIdMap.get(parent.parent)
      }

      return options
    }

    function updateCheckedUpward(originalOption: CascaderOptionState) {
      let option = originalOption

      while (!isNull(option.parent)) {
        const parent = optionIdMap.get(option.parent)

        if (!parent) break

        if (option.checked === parent.checked && option.partial === parent.partial) {
          break
        }

        if (option.checked) {
          parent.checked = parent.children.every(item => item.disabled || item.checked)
          parent.partial = !parent.checked
        } else {
          parent.checked = false
          parent.partial = parent.children.some(item => item.checked || item.partial)
        }

        option = parent
      }
    }

    function updateCheckedDown(originalOption: CascaderOptionState) {
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

    function handleOptionCheck(option: CascaderOptionState) {
      if (!option) return

      const options = Array.from(optionIdMap.values())
      const checked = !option.checked

      if (!props.multiple) {
        for (let i = 0, len = options.length; i < len; ++i) {
          options[i].checked = false
        }

        option.checked = checked
        option.partial = false

        return handleSingleSelect(option.fullValue)
      }

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

      emitEvent(props[checked ? 'onSelect' : 'onCancel'], option.fullValue, option.data)
      emitMultipleChange()
    }

    function emitMultipleChange() {
      const options = Array.from(optionIdMap.values())
      const selectedOptions = props.noCascaded
        ? options.filter(option => option.checked)
        : options.filter(option => option.checked && !(option.hasChild || option.children?.length))

      const selectedValues: string[] = []
      const selectedLabels: string[] = []

      const values: (string | number)[][] = []
      const dataList: Data[][] = []
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
          mergedValues.value = options
            .filter(option => option.checked)
            .map(option => option.fullValue)
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
      nextTick(updatePopper)
    }

    function handleSingleSelect(fullValue: string) {
      const option = optionValueMap.get(fullValue)

      if (!option) return

      emitEvent(props.onSelect, fullValue, option.data)

      if (fullValue) {
        currentValues.value[0] = fullValue
        currentLabels.value[0] = props.briefLabel ? option.label : option.fullLabel
      } else {
        currentValues.value.length = 0
        currentLabels.value.length = 0
      }

      const { value, data } = queryArrayMeta(fullValue)

      emitChangeEvent(value, data)
      setVisible(false)
    }

    function emitChangeEvent(value: CascaderValue, data: Data[] | Data[][]) {
      emittedValue.value = value

      nextTick(() => {
        outsideChanged = false

        emit('update:value', value)
        setFieldValue(value)
        emitEvent(props.onChange as ChangeListener, value, data)
        validateField()
      })
    }

    function queryArrayMeta(fullValue: string) {
      let option = optionValueMap.get(fullValue)!

      if (!option) return { value: [], data: [] }

      const value = [option.value]
      const data = [option.data]

      while (option.parent) {
        const parent = optionIdMap.get(option.parent)

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

    function toggleVisible(visible = !currentVisible.value) {
      if (props.disabled || readonly.value) return

      setVisible(visible)
    }

    function handleClickOutside() {
      restTipShow.value = false
      emitEvent(props.onClickOutside)

      if (props.outsideClose && currentVisible.value) {
        setVisible(false)
        outsideClosed = true
        emitEvent(props.onOutsideClose)
      }
    }

    function handleClear() {
      if (props.disabled || readonly.value) return

      if (props.clearable) {
        const prev = emittedValue.value

        currentValues.value.length = 0
        currentLabels.value.length = 0
        mergedValues.value.length = 0
        mergedLabels.value.length = 0
        openedIds.value.length = 0
        emittedValue.value = prev?.length === 0 ? prev : []
        restTipShow.value = false

        for (const option of optionIdMap.values()) {
          option.checked = false
          option.partial = false
        }

        if (prev?.length !== 0) {
          emit('update:value', emittedValue.value)
          emitEvent(props.onChange as ChangeListener, emittedValue.value, [])
        }

        emitEvent(props.onClear)
        clearField(emittedValue.value)
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
      if (props.disabled || readonly.value) return

      if (props.multiple) {
        handleOptionCheck(optionValueMap.get(fullValue)!)
      } else {
        handleSingleSelect(fullValue)
      }
    }

    function handlePanelKeyOpen(option: CascaderOptionState, depth: number) {
      handlePanelOpen(option, depth)

      requestAnimationFrame(() => {
        const panel = panelElList.value.at(-1)

        if (panel && panel.currentHitting < 0) {
          panel.currentHitting = panel.options.findIndex(option => option.id === prevClosedId)

          if (panel.currentHitting < 0) {
            panel.currentHitting = 0
          }
        }
      })
    }

    function handlePanelBack() {
      prevClosedId = openedIds.value.pop()!
    }

    function handlePanelsEnter() {
      requestAnimationFrame(() => {
        isPopperShow.value = true
      })
    }

    return {
      props,
      nh,
      icons,
      locale,
      idFor,
      currentVisible,
      isPopperShow,
      currentValues,
      currentLabels,
      transferTo,
      isHover,
      openedIds,
      restTagCount,
      restTipShow,
      selectorWidth,

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
      showClear,

      wrapper,
      reference,
      popper,
      panelElList,

      handlePanelOpen,
      handleOptionSelect,
      handleOptionCheck,
      toggleVisible,
      handleClear,
      toggleShowRestTip,
      handleTipClose,
      handlePanelKeyOpen,
      handlePanelBack,
      handlePanelsEnter,

      focus: (options?: FocusOptions) => reference.value?.focus(options),
      blur: () => reference.value?.blur()
    }
  }
})
</script>
