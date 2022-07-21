<template>
  <div
    ref="wrapper"
    :class="className"
    tabindex="-1"
    @blur="handleBlur"
  >
    <ResizeObserver throttle :on-resize="computeBodyHeight">
      <div ref="header" :class="nh.be('header')">
        <slot name="header" v-bind="getSlotPayload()">
          <Checkbox
            control
            :class="nh.be('checkbox')"
            :state="deepState ? state : undefined"
            :checked="allSelected"
            :partial="partial"
            :disabled="disabled"
            @click.prevent="toggleSelectAll"
          ></Checkbox>
          <div
            :class="[nh.be('reverse'), disabled && nh.bem('reverse', 'disabled')]"
            :title="locale.reverse"
            @click="handleReverse"
          >
            <Icon :scale="1.2">
              <Retweet></Retweet>
            </Icon>
          </div>
          <div :class="nh.be('counter')">
            {{ `${currentSelected.size}/${visibleOptions.length}` }}
          </div>
          <span v-if="title || $slots.title" :class="nh.be('title')">
            <slot name="title" v-bind="getSlotPayload()">
              {{ title }}
            </slot>
          </span>
        </slot>
      </div>
    </ResizeObserver>
    <ResizeObserver v-if="typeof filter === 'function'" throttle :on-resize="computeBodyHeight">
      <div ref="search" :class="nh.be('filter')">
        <Input
          ref="input"
          v-model:value="currentFilter"
          clearable
          :disabled="disabled"
          :suffix="MagnifyingGlass"
          :placeholder="searching ? null : locale.search"
          @keydown.stop
          @input="currentFilter = $event"
          @focus="searching = true"
          @blur="searching = false"
        ></Input>
      </div>
    </ResizeObserver>
    <ul
      v-if="paged || $slots.body"
      ref="body"
      :class="nh.be('body')"
      :style="{ height: bodyHeight }"
    >
      <slot name="body" v-bind="getSlotPayload()">
        <template v-if="pagedOptions.length">
          <Renderer
            v-for="(option, index) in pagedOptions"
            :key="index"
            :renderer="renderOption"
            :data="{ option, index }"
          >
          </Renderer>
        </template>
        <div v-else :class="nh.be('empty')">
          {{ emptyText || locale.empty }}
        </div>
      </slot>
    </ul>
    <VirtualList
      v-else
      ref="list"
      :class="nh.be('body')"
      :items="visibleOptions"
      :item-size="optionHeight"
      item-fixed
      use-y-bar
      id-key="value"
      :height="bodyHeight"
    >
      <template #default="{ item: option, index }">
        <Renderer :renderer="renderOption" :data="{ option, index }"></Renderer>
      </template>
      <template #empty>
        <div :class="nh.be('empty')">
          {{ emptyText || locale.empty }}
        </div>
      </template>
    </VirtualList>
    <ResizeObserver v-if="paged || $slots.footer" throttle :on-resize="computeBodyHeight">
      <div ref="footer" :class="nh.be('footer')">
        <slot name="footer" v-bind="getSlotPayload()">
          <div :class="nh.be('pagination')">
            <Icon
              :class="[nh.be('page-plus'), currentPage <= 1 && nh.bem('page-plus', 'disabled')]"
              @click="handlePageChange(currentPage - 1)"
            >
              <ChevronLeft></ChevronLeft>
            </Icon>
            <NumberInput
              :value="currentPage"
              :class="nh.be('page-input')"
              size="small"
              :min="1"
              :max="totalPages"
              @change="handlePageChange"
            ></NumberInput>
            <span style="margin: 0 4px;">/</span>
            <span>
              {{ totalPages }}
            </span>
            <Icon
              :class="[
                nh.be('page-minus'),
                currentPage >= totalPages && nh.bem('page-minus', 'disabled')
              ]"
              @click="handlePageChange(currentPage + 1)"
            >
              <ChevronRight></ChevronRight>
            </Icon>
          </div>
        </slot>
      </div>
    </ResizeObserver>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref, computed, watch, watchEffect, onMounted } from 'vue'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import { NumberInput } from '@/components/number-input'
import { Renderer } from '@/components/renderer'
import { ResizeObserver } from '@/components/resize-observer'
import { VirtualList } from '@/components/virtual-list'
import { MagnifyingGlass, Retweet, ChevronRight, ChevronLeft } from '@vexip-ui/icons'
import { useNameHelper, useLocale, stateProp } from '@vexip-ui/config'
import { useModifier } from '@vexip-ui/mixins'
import { boundRange } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { VirtualListExposed } from '@/components/virtual-list'
import type { TransferOptionState } from './symbol'

export default defineComponent({
  name: 'TransferPanel',
  components: {
    Checkbox,
    Icon,
    Input,
    NumberInput,
    Renderer,
    ResizeObserver,
    VirtualList,
    Retweet,
    ChevronRight,
    ChevronLeft
  },
  props: {
    type: {
      type: String as PropType<'source' | 'target'>,
      default: null
    },
    state: {
      type: stateProp,
      default: 'default'
    },
    selected: {
      type: Set as PropType<Set<string | number>>,
      default: () => new Set()
    },
    paged: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Function as PropType<(value: string, options: TransferOptionState) => boolean>,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    options: {
      type: Array as PropType<TransferOptionState[]>,
      default: () => []
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    optionHeight: {
      type: Number,
      default: 32
    },
    deepState: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:selected', 'select', 'enter', 'switch'],
  setup(props, { slots, emit }) {
    const nh = useNameHelper('transfer')
    const locale = useLocale('transfer')

    const bodyHeight = ref('100%')
    const bodyRealHeight = ref(0)
    const currentSelected = ref(new Set(props.selected))
    const pageSize = ref(10)
    const currentPage = ref(1)
    const currentMark = ref<string | number | null>(null)
    const currentHitting = ref(-1)
    const currentFilter = ref('')
    const searching = ref(false)

    const header = ref<HTMLElement | null>(null)
    const body = ref<HTMLElement | null>()
    const footer = ref<HTMLElement | null>(null)
    const search = ref<HTMLElement | null>(null)
    const input = ref<InstanceType<typeof Input> | null>(null)
    const list = ref<VirtualListExposed | null>(null)

    let lastSelected: string | number | null = null
    let keyUsed = false

    const { target: wrapper, modifier } = useModifier({
      passive: false,
      onKeyDown: (event, modifier) => {
        if (modifier.up || modifier.down) {
          if (!keyUsed && currentHitting.value < 0) {
            keyUsed = true

            if (lastSelected) {
              currentHitting.value = props.options.findIndex(
                option => option.value === lastSelected
              )
            } else if (list.value) {
              currentHitting.value = Math.round(list.value.scrollOffset / props.optionHeight)
            }

            currentHitting.value = currentHitting.value === -1 ? 0 : currentHitting.value
          } else {
            currentHitting.value = boundRange(
              findEnabledIndex(currentHitting.value + (modifier.up ? -1 : 1), modifier.up ? -1 : 1),
              0,
              currentOptions.value.length - 1
            )
          }

          if (!props.paged) {
            ensureOptionInView(currentHitting.value, modifier.up ? 'top' : 'bottom')
          }

          event.preventDefault()
        } else if (props.paged && modifier.ctrl && (modifier.left || modifier.right)) {
          handlePageChange(currentPage.value + (modifier.left ? -1 : 1))
          currentHitting.value = 0
          event.preventDefault()
        } else if (
          (props.type === 'source' && modifier.right) ||
          (props.type === 'target' && modifier.left)
        ) {
          keyUsed = false
          currentHitting.value = -1
          lastSelected = null
          emit('switch')
          event.preventDefault()
        } else if (modifier.space) {
          const option = currentOptions.value[currentHitting.value]

          if (option) {
            currentSelected.value[currentSelected.value.has(option.value) ? 'delete' : 'add'](
              option.value
            )
            emitSelectedChange()
          }

          event.preventDefault()
        } else if (modifier.enter) {
          event.preventDefault()
          emit('enter')
          event.preventDefault()
        } else if (typeof props.filter === 'function' && input.value && modifier['ctrl+f']) {
          event.preventDefault()
          event.stopPropagation()
          input.value.focus()
          event.preventDefault()
        }
      }
    })

    const className = computed(() => {
      return {
        [nh.be('panel')]: true,
        [nh.bem('panel', props.state)]: props.state !== 'default',
        [nh.bem('panel', 'disabled')]: props.disabled
      }
    })
    const visibleOptions = computed(() => {
      const filter = props.filter
      const filterValue = currentFilter.value

      if (filter && filterValue) {
        return props.options.filter(option => filter(filterValue, option))
      }

      return props.options
    })
    const optionSize = computed(() => visibleOptions.value.length)
    const pagedOptions = computed(() => {
      return visibleOptions.value.slice(
        (currentPage.value - 1) * pageSize.value,
        currentPage.value * pageSize.value
      )
    })
    const currentOptions = computed(() => (props.paged ? pagedOptions.value : visibleOptions.value))
    const totalPages = computed(() => Math.ceil(optionSize.value / (pageSize.value || 1)))

    watch(
      () => props.selected,
      value => {
        currentSelected.value = value
      }
    )
    watch(bodyHeight, computePageSize)
    watch(
      () => props.paged,
      value => {
        requestAnimationFrame(() => {
          computeBodyHeight()
          !value &&
            requestAnimationFrame(() => {
              list.value?.refresh()
            })
        })
      }
    )
    watch(optionSize, () => {
      keyUsed = false
      currentHitting.value = -1
      lastSelected = null
    })

    const partial = ref(false)
    const allSelected = ref(false)

    watchEffect(() => {
      const options = visibleOptions.value
      const selected = currentSelected.value

      let hasSelected = false
      let hasUnselected = false

      for (let i = 0, len = optionSize.value; i < len; ++i) {
        const option = options[i]

        if (!option.disabled) {
          if (selected.has(option.value)) {
            hasSelected = true
          } else {
            hasUnselected = true
          }
        }

        if (hasSelected && hasUnselected) {
          break
        }
      }

      allSelected.value = hasSelected && !hasUnselected
      partial.value = !allSelected.value && selected.size > 0
    })

    onMounted(computePageSize)

    function computePageSize() {
      requestAnimationFrame(() => {
        const bodyEl = body.value || list.value?.wrapper

        if (bodyEl) {
          const style = getComputedStyle(bodyEl)
          const paddingTop = parseInt(style.paddingTop)
          const paddingBottom = parseInt(style.paddingBottom)
          const innerHeight = bodyEl.offsetHeight - paddingTop - paddingBottom

          bodyRealHeight.value = innerHeight
          pageSize.value = Math.floor(innerHeight / (props.optionHeight || 1))
        }
      })
    }

    function computeBodyHeight() {
      const headerHeight = header.value ? header.value.offsetHeight : 0
      const searchHeight = search.value ? search.value.offsetHeight : 0
      const footerHeight = footer.value ? footer.value.offsetHeight : 0

      bodyHeight.value = `calc(100% - ${headerHeight + searchHeight + footerHeight}px)`
    }

    function toggleSelect(option: TransferOptionState) {
      if (props.disabled || option.disabled) return

      if (currentMark.value && modifier.shift) {
        handleRangeSelect(currentMark.value, option.value)
        return
      }

      if (currentSelected.value.has(option.value)) {
        currentSelected.value.delete(option.value)
      } else {
        currentSelected.value.add(option.value)
      }

      keyUsed = false
      currentHitting.value = -1
      lastSelected = option.value
      currentMark.value = option.value
      emitSelectedChange()
    }

    function handleRangeSelect(start: string | number, end: string | number) {
      const options = visibleOptions.value

      let startIndex = -1
      let endIndex = -1

      for (let i = 0, len = options.length; i < len; ++i) {
        const option = options[i]

        if (option.value === start) {
          startIndex = i
        } else if (option.value === end) {
          endIndex = i
        }

        if (startIndex > 0 && endIndex > 0) break
      }

      const method = currentSelected.value.has(options[startIndex]?.value) ? 'add' : 'delete'

      if (startIndex > endIndex) {
        [startIndex, endIndex] = [endIndex, startIndex]
      }

      for (let i = startIndex; i <= endIndex; ++i) {
        const option = options[i]

        if (!option.disabled) {
          currentSelected.value[method](option.value)
        }
      }

      emitSelectedChange()
    }

    function toggleSelectAll() {
      if (props.disabled) return

      if (allSelected.value) {
        for (const option of visibleOptions.value) {
          !option.disabled && currentSelected.value.delete(option.value)
        }
      } else {
        for (const option of visibleOptions.value) {
          !option.disabled && currentSelected.value.add(option.value)
        }
      }

      currentMark.value = null
      emitSelectedChange()
    }

    function handleReverse() {
      if (props.disabled) return

      if (partial.value) {
        const prevSelected = new Set(currentSelected.value)

        for (const option of visibleOptions.value) {
          if (!option.disabled) {
            if (prevSelected.has(option.value)) {
              currentSelected.value.delete(option.value)
            } else {
              currentSelected.value.add(option.value)
            }
          }
        }

        currentMark.value = null
        emitSelectedChange()
      } else {
        toggleSelectAll()
      }
    }

    function handleBlur() {
      currentMark.value = null
      modifier.resetAll()
    }

    function emitSelectedChange() {
      emit('select')
      emit('update:selected', currentSelected.value)
    }

    function handlePageChange(page: number) {
      currentPage.value = boundRange(page, 1, totalPages.value)
    }

    function queryEnabledIndex(index: number, step: number) {
      const options = currentOptions.value
      step = step / Math.abs(step)

      while (options[index]?.disabled) {
        index += step

        if (index < 0 || index >= options.length) break
      }

      return index
    }

    function findEnabledIndex(index: number, sign: 1 | -1 = 1) {
      if (currentOptions.value[index]?.disabled) {
        index = queryEnabledIndex(index, sign)

        if (sign > 0 ? index >= currentOptions.value.length : index < 0) {
          index = queryEnabledIndex(index, -sign)

          // 全禁用
          if (sign > 0 ? index < 0 : index >= currentOptions.value.length) index = -1
        }
      }

      return index
    }

    function ensureOptionInView(index: number, direction: 'top' | 'bottom') {
      const option = props.options[index]

      if (props.paged || !option || !list.value) return

      if (direction === 'bottom') {
        const target = (index + 1) * props.optionHeight

        if (list.value.scrollOffset + bodyRealHeight.value < target) {
          list.value.scrollTo((index - pageSize.value + 1) * props.optionHeight)
        }
      } else {
        const target = index * props.optionHeight

        if (list.value.scrollOffset > target) {
          list.value.scrollTo(target)
        }
      }
    }

    function getSlotPayload() {
      return {
        type: props.type,
        currentPage: currentPage.value,
        pageSize: pageSize.value,
        totalPages: totalPages.value,
        allSelected: allSelected.value,
        partial: partial.value,
        selected: Array.from(currentSelected.value),
        options: visibleOptions.value,
        toggleSelectAll,
        handleReverse
      }
    }

    function renderOption({ option, index }: { option: TransferOptionState, index: number }) {
      const handleCheck = (event: MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        toggleSelect(option)
      }

      return (
        <li
          class={{
            [nh.be('option')]: true,
            [nh.bem('option', 'disabled')]: props.disabled || option.disabled,
            [nh.bem('option', 'hitting')]: currentHitting.value === index
          }}
          onClick={() => toggleSelect(option)}
        >
          {slots.option
            ? slots.option({ type: props.type, option, index })
            : [
                <Checkbox
                  class={nh.be('checkbox')}
                  state={props.deepState ? props.state : undefined}
                  checked={currentSelected.value.has(option.value)}
                  disabled={props.disabled || option.disabled}
                  onClick={handleCheck}
                ></Checkbox>,
                <span class={nh.be('label')}>
                  {slots.label ? slots.label({ option, index }) : option.label}
                </span>
              ]}
        </li>
      )
    }

    return {
      MagnifyingGlass,

      nh,
      locale,
      bodyHeight,
      currentSelected,
      pageSize,
      currentPage,
      currentMark,
      currentFilter,
      searching,

      className,
      visibleOptions,
      partial,
      allSelected,
      pagedOptions,
      totalPages,

      wrapper,
      header,
      body,
      footer,
      search,
      input,
      list,

      computeBodyHeight,
      toggleSelect,
      toggleSelectAll,
      handleReverse,
      handlePageChange,
      handleBlur,
      getSlotPayload,
      renderOption
    }
  }
})
</script>
