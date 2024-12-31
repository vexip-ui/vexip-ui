import { Icon } from '@/components/icon'
import { NumberInput } from '@/components/number-input'
import { Renderer } from '@/components/renderer'
import { Select } from '@/components/select'

import {
  Transition,
  computed,
  defineComponent,
  nextTick,
  onMounted,
  onUpdated,
  reactive,
  ref,
  renderSlot,
  toRef,
  watch
} from 'vue'

import {
  createSizeProp,
  emitEvent,
  getCountWord,
  getCountWordOnly,
  useIcons,
  useLocale,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { createSlotRender, useModifier, useRtl } from '@vexip-ui/hooks'
import { boundRange, decide, isClient, isNull, range } from '@vexip-ui/utils'
import { paginationProps } from './props'

const enum PaginationMode {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right'
}

export default defineComponent({
  name: 'Pagination',
  props: paginationProps,
  emits: ['update:active', 'update:page-size'],
  setup(_props, { slots, emit, expose }) {
    const props = useProps('pagination', _props, {
      size: createSizeProp(),
      locale: null,
      total: {
        default: 0,
        validator: value => value >= 0,
        static: true
      },
      noBorder: false,
      background: false,
      pageSize: {
        default: 10,
        validator: value => value > 0
      },
      sizeOptions: () => [10, 20, 50, 100],
      itemCount: {
        default: 7,
        validator: value => Number.isInteger(value) && value > 6
      },
      active: {
        default: 1,
        validator: value => value > 0,
        static: true
      },
      disabled: false,
      disableItem: {
        default: () => false,
        isFunc: true
      },
      turnPageCount: 5,
      itemUnit: null,
      plugins: {
        default: () => [],
        validator: value => Array.isArray(value)
      },
      noTitle: false,
      itemTag: 'li',
      listTag: null,
      slots: () => ({})
    })

    const { isRtl } = useRtl()
    const nh = useNameHelper('pagination')
    const icons = useIcons()
    const midPagers = ref<number[]>([])
    const currentActive = ref(props.active)
    const currentPageSize = ref(props.pageSize)
    const mode = ref(PaginationMode.LEFT)
    const inPrevEllipsis = ref(false)
    const inNextEllipsis = ref(false)
    const jumpValue = ref(props.active)
    const itemElList = reactive<HTMLElement[]>([])

    const locale = useLocale('pagination', toRef(props, 'locale'))

    const { target: wrapper } = useModifier({
      passive: false,
      onKeyDown: (event, modifier) => {
        if (props.disabled) return

        decide(
          [
            [
              () => modifier.up || modifier.down || modifier.left || modifier.right,
              () => {
                const sign = modifier.up || modifier.left ? -1 : 1

                if (isClient && document.activeElement) {
                  const index = itemElList.findIndex(el => el === document.activeElement)

                  if (!~index) return

                  const target = itemElList[boundRange(index + sign, 0, itemElList.length - 1)]

                  target.focus()
                }
              }
            ],
            [
              () => modifier.enter || modifier.space,
              () => {
                if (document && document.activeElement) {
                  const index = itemElList.findIndex(el => el === document.activeElement)

                  if (!~index) {
                    const activeClass = nh.bem('item', 'active')
                    const activeEl = itemElList.find(el => el.classList.contains(activeClass))

                    activeEl?.focus()
                  }
                }
              }
            ]
          ],
          {
            beforeMatchAny: () => event.preventDefault(),
            afterMatchAny: modifier.resetAll
          }
        )
      }
    })

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm(props.size)]: props.size !== 'default',
        [nh.bm('background')]: props.background,
        [nh.bm('no-border')]: props.noBorder,
        [nh.bm('disabled')]: props.disabled
      }
    })
    const pagerCount = computed(() => {
      return Math.ceil(props.total / (currentPageSize.value || 1)) || 1
    })
    const useEllipsis = computed(() => pagerCount.value > props.itemCount)
    const disabledPrev = computed(() => {
      const count = queryEnabledActive(1, 1)

      return count >= pagerCount.value || currentActive.value === count
    })
    const disabledNext = computed(() => {
      const count = queryEnabledActive(pagerCount.value, -1)

      return count <= 1 || currentActive.value === count
    })
    const prevTurnPageTitle = computed(() => {
      return `${locale.value.prev} ${getCountWord(locale.value.page, props.turnPageCount)}`
    })
    const nextTurnPageTitle = computed(() => {
      return `${locale.value.next} ${getCountWord(locale.value.page, props.turnPageCount)}`
    })
    const prevEllipsisTarget = computed(() => {
      if (!useEllipsis.value) return 0

      let active = queryEnabledActive(currentActive.value - props.turnPageCount, -1)

      if (active < 1) {
        active = queryEnabledActive(1, 1)

        if (active >= currentActive.value) return 0
      }

      return active
    })
    const nextEllipsisTarget = computed(() => {
      if (!useEllipsis.value) return 0

      let active = queryEnabledActive(currentActive.value + props.turnPageCount, 1)

      if (active > pagerCount.value) {
        active = queryEnabledActive(pagerCount.value, -1)

        if (active <= currentActive.value) return 0
      }

      return active
    })
    const sizeObjectOptions = computed(() => {
      return props.sizeOptions.map(size => {
        return {
          value: size,
          label: `${size} ${locale.value.perPage}`
        }
      })
    })
    const pluginOrders = computed(() => {
      const plugins = props.plugins
      const pagerPosition = plugins.findIndex(isNull)

      return {
        total: plugins.findIndex(p => p === 'total') - pagerPosition,
        size: plugins.findIndex(p => p === 'size') - pagerPosition,
        jump: plugins.findIndex(p => p === 'jump') - pagerPosition
      }
    })
    const jumpInputWidth = computed(() => {
      if (!props.plugins.includes('jump')) return 0

      let pageCount = 0

      if (props.plugins.includes('size')) {
        pageCount = Math.ceil(props.total / (Math.min(...props.sizeOptions) || 10))
      } else {
        pageCount = Math.ceil(props.total / (props.pageSize || 10))
      }

      return pageCount.toString().length * 10 + 30
    })

    watch(
      () => props.active,
      value => {
        changeActive(value, false)
      }
    )
    watch(() => props.itemCount, computePagers)
    watch(pagerCount, computePagers)
    watch(
      () => props.pageSize,
      value => {
        currentPageSize.value = value
      }
    )
    watch(currentPageSize, (value, prevValue) => {
      emit('update:page-size', value)
      emitEvent(props.onPageSizeChange, value)

      // 按当前页的第一条数据计算新的页码
      const anchor = Math.ceil((prevValue * (currentActive.value - 1) + 1) / value)

      let active = queryEnabledActive(anchor, 1)

      if (active > pagerCount.value) {
        active = queryEnabledActive(anchor - 1, -1)

        if (active < 1) active = 0
      }

      currentActive.value = active
      computePagers()
    })

    expose({ changeActive, handlePrev, handleNext })

    onMounted(() => {
      nextTick(computePagers)
    })

    onUpdated(() => {
      if (!wrapper.value) return

      itemElList.length = 0
      itemElList.push(
        ...Array.from(
          wrapper.value.querySelectorAll<HTMLElement>(
            `${nh.cbe('item')}:not(${nh.cbem('item', 'disabled')})`
          )
        )
      )
    })

    function queryEnabledActive(active: number, step: number) {
      step = step / Math.abs(step)

      while (props.disableItem(active)) {
        active += step

        if (active < 1 || active > pagerCount.value) break
      }

      return active
    }

    function handleChange(value: number) {
      if (currentActive.value === value) return

      currentActive.value = value
      jumpValue.value = value

      computePagers()
      emit('update:active', value)
      emitEvent(props.onChange, value)
    }

    function changeActive(active: number, focus = true) {
      active = parseInt(active.toString())

      if (props.disabled || active < 1 || active > pagerCount.value || props.disableItem(active)) {
        return
      }

      handleChange(active)

      if (isClient && focus) {
        const activeEl = itemElList.find(el => el === document.activeElement)

        activeEl?.blur()
        nextTick(() => {
          itemElList.find(el => el.tabIndex >= 0)?.focus()
        })
      }
    }

    function handlePrev() {
      if (!disabledPrev.value && !props.disabled) {
        const active = queryEnabledActive(currentActive.value - 1, -1)

        if (active >= 1) changeActive(active)
      }
    }

    function handleNext() {
      if (!disabledNext.value && !props.disabled) {
        const active = queryEnabledActive(currentActive.value + 1, 1)

        if (active <= pagerCount.value) changeActive(active)
      }
    }

    function computePagers() {
      let pagers: number[]

      if (pagerCount.value <= props.itemCount) {
        // 未超过最大值，显示所有页号
        pagers = range(pagerCount.value)
      } else {
        const numberCount = props.itemCount - 2 // 显示为数字的页号
        const criticalCount = Math.ceil(props.itemCount / 2) // 切换模式的关键计数

        if (currentActive.value < criticalCount) {
          // 出现后侧一个省略号，前侧连续
          pagers = range(numberCount)
          pagers.push(pagerCount.value)

          mode.value = PaginationMode.LEFT
        } else if (currentActive.value <= pagerCount.value - criticalCount) {
          // 出现两个省略号，中间连续
          let count = numberCount - 2

          // 保持中间数字的页号数目为单数
          if (count % 2 === 0) {
            count -= 1
          }

          pagers = range(count, currentActive.value - (count - 1) / 2) // 同 Math.floor(count / 2)
          pagers.unshift(1)
          pagers.push(pagerCount.value)

          mode.value = PaginationMode.CENTER
        } else {
          // 出现前侧一个省略号，后侧连续
          pagers = range(numberCount, pagerCount.value - numberCount + 1)
          pagers.unshift(1)

          mode.value = PaginationMode.RIGHT
        }
      }

      if (pagers.length === 1) {
        midPagers.value = []
      }

      midPagers.value = pagers.slice(1, -1)
    }

    function enterPrevEllipsis() {
      inPrevEllipsis.value = true
    }

    function leavePrevEllipsis() {
      inPrevEllipsis.value = false
    }

    function clickPrevEllipsis() {
      if (!props.disabled && prevEllipsisTarget.value) {
        changeActive(prevEllipsisTarget.value)
      }
    }

    function enterNextEllipsis() {
      inNextEllipsis.value = true
    }

    function leaveNextEllipsis() {
      inNextEllipsis.value = false
    }

    function clickNextEllipsis() {
      if (!props.disabled && nextEllipsisTarget.value) {
        changeActive(nextEllipsisTarget.value)
      }
    }

    function handleJumpPage(active: number) {
      active = Math.max(Math.min(parseInt(active.toString()), pagerCount.value), 1)

      const originActive = active

      if (active !== currentActive.value) {
        const step = active > currentActive.value ? 1 : -1

        active = queryEnabledActive(originActive, step)

        if (step > 0 ? active > pagerCount.value : active < 1) {
          active = queryEnabledActive(originActive, -step)

          if (step > 0 ? active < 1 : active > pagerCount.value) {
            active = 0
          }
        }

        handleChange(active)
      }

      nextTick(() => {
        jumpValue.value = currentActive.value
      })
    }

    function renderPrev(Tag: any) {
      const disabled = props.disabled || disabledPrev.value
      const arrow = isRtl.value ? icons.value.angleRight : icons.value.angleLeft

      return (
        <Tag
          ref={el => el && !disabledPrev.value && itemElList.push(el as any)}
          class={[
            nh.be('item'),
            nh.bem('item', 'prev'),
            disabled ? nh.bem('item', 'disabled') : ''
          ]}
          title={props.noTitle ? undefined : locale.value.prevPage}
          role={'menuitem'}
          tabindex={'-1'}
          aria-label={locale.value.prevPage}
          aria-hidden={disabled ? 'true' : undefined}
          onClick={handlePrev}
          onKeydownEnter={handlePrev}
          onKeydownSpace={handlePrev}
        >
          {renderSlot(slots, 'prev', { disabled }, () => [
            <Renderer renderer={props.slots.prev} data={{ disabled }}>
              <Icon {...arrow} scale={+(arrow.scale || 1)}></Icon>
            </Renderer>
          ])}
        </Tag>
      )
    }

    function renderNext(Tag: any) {
      const disabled = props.disabled || disabledNext.value
      const arrow = isRtl.value ? icons.value.angleLeft : icons.value.angleRight

      return (
        <Tag
          ref={el => el && !disabledNext.value && itemElList.push(el as any)}
          class={[
            nh.be('item'),
            nh.bem('item', 'next'),
            disabled ? nh.bem('item', 'disabled') : ''
          ]}
          title={props.noTitle ? undefined : locale.value.nextPage}
          role={'menuitem'}
          tabindex={'-1'}
          aria-label={locale.value.nextPage}
          aria-hidden={disabled ? 'true' : undefined}
          onClick={handleNext}
          onKeydownEnter={handleNext}
          onKeydownSpace={handleNext}
        >
          {renderSlot(slots, 'next', { disabled }, () => [
            <Renderer renderer={props.slots.next} data={{ disabled }}>
              <Icon {...arrow} scale={+(arrow.scale || 1)}></Icon>
            </Renderer>
          ])}
        </Tag>
      )
    }

    function renderPrevEllipsis(Tag: any) {
      if (!useEllipsis.value || mode.value === PaginationMode.LEFT) return null

      const disabled = props.disabled || !prevEllipsisTarget.value

      return (
        <Tag
          ref={el => el && prevEllipsisTarget.value && itemElList.push(el as any)}
          class={{
            [nh.be('item')]: true,
            [nh.bem('item', 'more')]: true,
            [nh.bem('item', 'disabled')]: disabled
          }}
          title={props.noTitle ? undefined : prevTurnPageTitle.value}
          role={'menuitem'}
          tabindex={'-1'}
          aria-label={prevTurnPageTitle.value}
          onClick={clickPrevEllipsis}
          onKeydownEnter={clickPrevEllipsis}
          onKeydownSpace={clickPrevEllipsis}
          onMouseenter={enterPrevEllipsis}
          onMouseleave={leavePrevEllipsis}
        >
          {createSlotRender(slots, ['prev-jump', 'prevJump'], () => {
            const arrow = isRtl.value ? icons.value.anglesRight : icons.value.anglesLeft

            return (
              <Transition name={nh.ns('fade')}>
                {!disabled && inPrevEllipsis.value ? (
                  <Icon {...arrow} scale={+(arrow.scale || 1)}></Icon>
                ) : (
                  <Icon
                    {...icons.value.ellipsis}
                    scale={+(icons.value.ellipsis.scale || 1)}
                    style={'position: absolute'}
                  ></Icon>
                )}
              </Transition>
            )
          })({ disabled, entered: inPrevEllipsis.value })}
        </Tag>
      )
    }

    function renderNextEllipsis(Tag: any) {
      if (!useEllipsis.value || mode.value === PaginationMode.RIGHT) return null

      const disabled = props.disabled || !nextEllipsisTarget.value

      return (
        <Tag
          ref={el => el && nextEllipsisTarget.value && itemElList.push(el as any)}
          class={{
            [nh.be('item')]: true,
            [nh.bem('item', 'more')]: true,
            [nh.bem('item', 'disabled')]: disabled
          }}
          title={props.noTitle ? undefined : nextTurnPageTitle.value}
          role={'menuitem'}
          tabindex={'-1'}
          aria-label={nextTurnPageTitle.value}
          onClick={clickNextEllipsis}
          onKeydownEnter={clickNextEllipsis}
          onKeydownSpace={clickNextEllipsis}
          onMouseenter={enterNextEllipsis}
          onMouseleave={leaveNextEllipsis}
        >
          {createSlotRender(slots, ['next-jump', 'nextJump'], () => {
            const arrow = isRtl.value ? icons.value.anglesLeft : icons.value.anglesRight

            return (
              <Transition name={nh.ns('fade')}>
                {!disabled && inNextEllipsis.value ? (
                  <Icon {...arrow} scale={+(arrow.scale || 1)}></Icon>
                ) : (
                  <Icon
                    {...icons.value.ellipsis}
                    scale={+(icons.value.ellipsis.scale || 1)}
                    style={'position: absolute'}
                  ></Icon>
                )}
              </Transition>
            )
          })({ disabled: !nextEllipsisTarget.value, entered: inNextEllipsis.value })}
        </Tag>
      )
    }

    function renderItem(Tag: any, page: number) {
      const disabled = props.disabled || props.disableItem(page)
      const active = currentActive.value === page

      return (
        <Tag
          ref={el => el && itemElList.push(el as any)}
          class={{
            [nh.be('item')]: true,
            [nh.bem('item', 'disabled')]: disabled,
            [nh.bem('item', 'active')]: active
          }}
          title={props.noTitle ? undefined : page}
          role={'menuitemradio'}
          tabindex={active ? '0' : '-1'}
          aria-posinset={page}
          aria-setsize={pagerCount.value}
          aria-disabled={disabled ? 'true' : undefined}
          onClick={() => changeActive(page)}
          onKeydownEnter={() => changeActive(page)}
          onKeydownSpace={() => changeActive(page)}
        >
          {renderSlot(slots, 'item', { page, disabled, active }, () => [
            <Renderer renderer={props.slots.item} data={{ page, disabled, active }}>
              {page}
            </Renderer>
          ])}
        </Tag>
      )
    }

    function renderTotalPlugin() {
      if (!props.plugins.includes('total')) return null

      return (
        <div
          class={[nh.be('total'), pluginOrders.value.total < 0 && nh.bem('total', 'prefix')]}
          style={{ order: pluginOrders.value.total }}
        >
          {`${locale.value.total} ${getCountWord(
            props.itemUnit ?? locale.value.itemUnit,
            props.total
          )}`}
        </div>
      )
    }

    function renderSizePlugin() {
      if (!props.plugins.includes('size')) return null

      return (
        <div
          class={[nh.be('size'), pluginOrders.value.size < 0 && nh.bem('size', 'prefix')]}
          style={{ order: pluginOrders.value.size }}
        >
          <Select
            v-model:value={currentPageSize.value}
            inherit
            class={nh.be('size-select')}
            options={sizeObjectOptions.value}
            filter={false}
            multiple={false}
            clearable={false}
          ></Select>
        </div>
      )
    }

    function renderJumpPlugin() {
      if (!props.plugins.includes('jump')) return null

      return (
        <div
          class={[nh.be('jump'), pluginOrders.value.jump < 0 && nh.bem('jump', 'prefix')]}
          style={{ order: pluginOrders.value.jump }}
        >
          {locale.value.jumpTo}
          <NumberInput
            v-model:value={jumpValue.value}
            inherit
            class={nh.be('jump-input')}
            clearable={false}
            sync={false}
            style={{ width: `${jumpInputWidth.value}px` }}
            onChange={handleJumpPage}
          ></NumberInput>
          {getCountWordOnly(locale.value.page, 1)}
        </div>
      )
    }

    return () => {
      const ItemTag = props.itemTag || 'li'
      const ListTag = (props.listTag as any) || (ItemTag === 'li' ? 'ul' : 'div')

      return (
        <div class={className.value}>
          <ListTag
            ref={wrapper}
            class={nh.be('list')}
            role={'menubar'}
            aria-label={'Pagination'}
            aria-disabled={props.disabled ? 'true' : undefined}
          >
            {renderPrev(ItemTag)}
            {renderItem(ItemTag, 1)}
            {renderPrevEllipsis(ItemTag)}
            {midPagers.value.map(page => renderItem(ItemTag, page))}
            {renderNextEllipsis(ItemTag)}
            {pagerCount.value > 1 && renderItem(ItemTag, pagerCount.value)}
            {renderNext(ItemTag)}
          </ListTag>
          {renderTotalPlugin()}
          {renderSizePlugin()}
          {renderJumpPlugin()}
        </div>
      )
    }
  }
})
