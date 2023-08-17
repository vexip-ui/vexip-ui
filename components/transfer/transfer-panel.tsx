import { Checkbox } from '@/components/checkbox'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import { NumberInput } from '@/components/number-input'
import { ResizeObserver } from '@/components/resize-observer'
import { VirtualList } from '@/components/virtual-list'

import {
  computed,
  defineComponent,
  reactive,
  ref,
  renderSlot,
  toRef,
  watch,
  watchEffect
} from 'vue'

import { stateProp, useIcons, useNameHelper } from '@vexip-ui/config'
import { useModifier, useRtl } from '@vexip-ui/hooks'
import { boundRange } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { VirtualListExposed } from '@/components/virtual-list'
import type { LocaleConfig } from '@vexip-ui/config'
import type { TransferOptionState } from './symbol'

export default defineComponent({
  name: 'TransferPanel',
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
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingIcon: {
      type: Object,
      default: null
    },
    loadingLock: {
      type: Boolean,
      default: false
    },
    loadingEffect: {
      type: String,
      default: null
    },
    locale: {
      type: Object as PropType<LocaleConfig['transfer']>,
      default: () => ({})
    }
  },
  emits: ['update:selected', 'select', 'enter', 'switch'],
  setup(props, { slots, emit }) {
    const nh = useNameHelper('transfer')
    const icons = useIcons()

    const { isRtl } = useRtl()

    const currentSelected = ref(new Set(props.selected))
    const pageSize = ref(10)
    const currentPage = ref(1)
    const currentMark = ref<string | number | null>(null)
    const currentHitting = ref(-1)
    const currentFilter = ref('')
    const searching = ref(false)

    const header = ref<HTMLElement>()
    const body = ref<HTMLElement>()
    const footer = ref<HTMLElement>()
    const search = ref<HTMLElement>()
    const input = ref<InstanceType<typeof Input>>()
    const list = ref<VirtualListExposed>()

    let bodyRealHeight = 0
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
        } else if (props.paged && (modifier.left || modifier.right) && event.ctrlKey) {
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

    function computePageSize() {
      requestAnimationFrame(() => {
        const bodyEl = body.value || list.value?.wrapper

        if (bodyEl) {
          const style = getComputedStyle(bodyEl)
          const paddingTop = parseInt(style.paddingTop)
          const paddingBottom = parseInt(style.paddingBottom)
          const innerHeight = bodyEl.offsetHeight - paddingTop - paddingBottom

          bodyRealHeight = innerHeight
          pageSize.value = Math.floor(innerHeight / (props.optionHeight || 1))
        }
      })
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

    function toggleSelectAll(event?: Event) {
      event?.preventDefault()

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
      emit('update:selected', currentSelected.value)
      emit('select')
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
      const options = currentOptions.value

      if (options[index]?.disabled) {
        index = queryEnabledIndex(index, sign)

        if (sign > 0 ? index >= options.length : index < 0) {
          index = queryEnabledIndex(index, -sign)

          // 全禁用
          if (sign > 0 ? index < 0 : index >= options.length) index = -1
        }
      }

      return index
    }

    function ensureOptionInView(index: number, direction: 'top' | 'bottom') {
      const option = props.options[index]

      if (props.paged || !option || !list.value) return

      if (direction === 'bottom') {
        const target = (index + 1) * props.optionHeight

        if (list.value.scrollOffset + bodyRealHeight < target) {
          list.value.scrollTo((index - pageSize.value + 1) * props.optionHeight)
        }
      } else {
        const target = index * props.optionHeight

        if (list.value.scrollOffset > target) {
          list.value.scrollTo(target)
        }
      }
    }

    const slotParams = reactive({
      type: toRef(props, 'type'),
      currentPage,
      pageSize,
      totalPages,
      allSelected,
      partial,
      selected: computed(() => Array.from(currentSelected.value)),
      options: computed(() => visibleOptions.value),
      toggleSelectAll,
      handleReverse
    })

    function renderOption({ option, index }: { option: TransferOptionState, index: number }) {
      const disabled = props.disabled || option.disabled
      const handleCheck = (event: MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        toggleSelect(option)
      }

      return (
        <li
          class={{
            [nh.be('option')]: true,
            [nh.bem('option', 'disabled')]: disabled,
            [nh.bem('option', 'hitting')]: currentHitting.value === index
          }}
          role={'option'}
          aria-disabled={disabled ? 'true' : undefined}
          onClick={() => toggleSelect(option)}
        >
          {slots.option
            ? renderSlot(slots, 'option', { type: props.type, option, index })
            : [
              <Checkbox
                key={1}
                class={nh.be('checkbox')}
                state={props.deepState ? props.state : undefined}
                checked={currentSelected.value.has(option.value)}
                disabled={disabled}
                tab-index={-1}
                onClick={handleCheck}
              ></Checkbox>,
              <span key={2} class={nh.be('label')}>
                {slots.label ? renderSlot(slots, 'label', { option, index }) : option.label}
              </span>
              ]}
        </li>
      )
    }

    function renderHeader() {
      return (
        <div ref={header} class={nh.be('header')}>
          {slots.header
            ? (
                renderSlot(slots, 'header', slotParams)
              )
            : (
              <>
                <Checkbox
                  inherit
                  control
                  class={nh.be('checkbox')}
                  state={props.deepState ? props.state : undefined}
                  checked={allSelected.value}
                  partial={partial.value}
                  disabled={props.disabled}
                  tab-index={-1}
                  onClick={toggleSelectAll}
                ></Checkbox>
                <div
                  class={[nh.be('reverse'), props.disabled && nh.bem('reverse', 'disabled')]}
                  title={props.locale.reverse}
                  onClick={handleReverse}
                >
                  <Icon {...icons.value.retweet} scale={1.2}></Icon>
                </div>
                <div class={nh.be('counter')}>
                  {`${currentSelected.value.size}/${visibleOptions.value.length}`}
                </div>
                {(props.title || slots.title) && (
                  <span class={nh.be('title')}>
                    {slots.title ? renderSlot(slots, 'title', slotParams) : props.title}
                  </span>
                )}
                <CollapseTransition appear horizontal fade-effect>
                  {props.loading && (
                    <div class={nh.be('loading')}>
                      <Icon
                        {...icons.value.loading}
                        effect={props.loadingEffect || icons.value.loading.effect}
                        icon={props.loadingIcon || icons.value.loading.icon}
                      ></Icon>
                    </div>
                  )}
                </CollapseTransition>
              </>
              )}
        </div>
      )
    }

    function renderFilter() {
      if (typeof props.filter !== 'function') return null

      const stop = (e: Event) => e.stopPropagation()
      // const setFilter = (value: string) => (currentFilter.value = value)

      return (
        <div ref={search} class={nh.be('filter')}>
          <Input
            ref={input}
            v-model:value={currentFilter.value}
            inherit
            clearable
            sync
            disabled={props.disabled}
            placeholder={searching.value ? undefined : props.locale.search}
            onKeydown={stop}
            onFocus={() => (searching.value = true)}
            onBlur={() => (searching.value = false)}
          >
            {{
              suffix: () => <Icon {...icons.value.search}></Icon>
            }}
          </Input>
        </div>
      )
    }

    function renderBody() {
      if (props.paged || slots.body) {
        return (
          <ResizeObserver throttle onResize={computePageSize}>
            <ul ref={body} class={nh.be('body')} role={'listbox'}>
              {slots.body
                ? (
                    renderSlot(slots, 'body', slotParams)
                  )
                : pagedOptions.value.length
                  ? (
                      pagedOptions.value.map((option, index) => renderOption({ option, index }))
                    )
                  : (
                    <div class={nh.be('empty')}>{props.emptyText || props.locale.empty}</div>
                    )}
            </ul>
          </ResizeObserver>
        )
      }

      return (
        <VirtualList
          ref={list}
          inherit
          class={nh.be('body')}
          items={visibleOptions.value}
          item-size={props.optionHeight}
          item-fixed
          use-y-bar
          id-key={'value'}
          items-attrs={{ role: 'listbox', ariaLabel: props.type }}
          onResize={computePageSize}
        >
          {{
            default: ({ item, index }: { item: TransferOptionState, index: number }) =>
              renderOption({ option: item, index }),
            empty: () => <div class={nh.be('empty')}>{props.emptyText || props.locale.empty}</div>
          }}
        </VirtualList>
      )
    }

    function renderFooter() {
      if (!props.paged && !slots.footer) return null

      return (
        <div ref={footer} class={nh.be('footer')}>
          {slots.footer
            ? (
                renderSlot(slots, 'footer', slotParams)
              )
            : (
              <div class={nh.be('pagination')}>
                <Icon
                  {...(isRtl.value ? icons.value.arrowRight : icons.value.arrowLeft)}
                  class={[
                    nh.be('page-plus'),
                    currentPage.value <= 1 && nh.bem('page-plus', 'disabled')
                  ]}
                  onClick={() => handlePageChange(currentPage.value - 1)}
                ></Icon>
                <NumberInput
                  inherit
                  value={currentPage.value}
                  class={nh.be('page-input')}
                  size={'small'}
                  min={1}
                  max={totalPages.value}
                  onChange={handlePageChange}
                ></NumberInput>
                <span style={'margin: 0 4px'}>{'/'}</span>
                <span>{totalPages.value}</span>
                <Icon
                  {...(isRtl.value ? icons.value.arrowLeft : icons.value.arrowRight)}
                  class={[
                    nh.be('page-minus'),
                    currentPage.value >= totalPages.value && nh.bem('page-minus', 'disabled')
                  ]}
                  onClick={() => handlePageChange(currentPage.value + 1)}
                ></Icon>
              </div>
              )}
        </div>
      )
    }

    return () => (
      <div ref={wrapper} class={className.value} tabindex={0} onBlur={handleBlur}>
        {renderHeader()}
        {renderFilter()}
        {renderBody()}
        {renderFooter()}
      </div>
    )
  }
})
