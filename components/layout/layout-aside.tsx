import { defineComponent, ref, toRef, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { Menu } from '@/components/menu'
import { NativeScroll } from '@/components/native-scroll'
import { Indent, Outdent, CaretRight } from '@vexip-ui/icons'
import { useNameHelper, useProps, booleanProp, eventProp, emitEvent } from '@vexip-ui/config'
import { useLayoutState, useMediaQuery, useUpdateCounter } from './helper'

import type { PropType } from 'vue'
import type { MenuOptions } from '@/components/menu'
import type { AsideMenuProps } from './symbol'

export default defineComponent({
  name: 'LayoutAside',
  props: {
    tag: String,
    expanded: booleanProp,
    reduced: booleanProp,
    menus: Object as PropType<MenuOptions[]>,
    menuActive: String,
    menuProps: Object as PropType<AsideMenuProps>,
    logo: String,
    signName: String,
    expandedMedia: String,
    onReducedChange: eventProp<(reduced: boolean) => void>(),
    onExpandedChange: eventProp<(expanded: boolean) => void>(),
    onSignClick: eventProp<(event: MouseEvent) => void>(),
    onMenuSelect: eventProp<(label: string, meta: Record<string, any>) => void>()
  },
  emits: ['update:reduced', 'update:expanded'],
  setup(_props, { emit, slots }) {
    const props = useProps('layout', _props, {
      tag: 'aside',
      reduced: false,
      menus: {
        default: () => [],
        static: true
      },
      menuActive: {
        default: null,
        static: true
      },
      menuProps: null,
      logo: '',
      signName: '',
      expandedMedia: 'lg',
      onReducedChange: null,
      onExpandedChange: null,
      onSignClick: null,
      onMenuSelect: null
    })

    const nh = useNameHelper('layout')
    const layoutState = useLayoutState()
    const currentReduced = ref(props.reduced)
    const currentExpanded = ref(props.expanded)
    const scrollHeight = ref('100%')

    const matched = useMediaQuery(toRef(props, 'expandedMedia'))
    const counter = useUpdateCounter()

    const top = ref<HTMLElement | null>(null)
    const bottom = ref<HTMLElement | null>(null)

    const className = computed(() => {
      return [
        nh.be('aside'),
        {
          [nh.bs('vars')]: !layoutState.isLayout,
          [nh.bem('aside', 'fixed')]: layoutState.expandMatched,
          [nh.bem('aside', 'expanded')]: currentExpanded.value,
          [nh.bem('aside', 'reduced')]: currentReduced.value
        }
      ]
    })
    const hasTop = computed(() => {
      return !!(props.logo || props.signName || slots.top)
    })
    const hasMenu = computed(() => {
      return !!(props.menus?.length || props.menuProps?.router)
    })

    watch(
      () => props.reduced,
      value => {
        currentReduced.value = value
      }
    )
    watch(
      () => props.expanded,
      value => {
        currentExpanded.value = value
      }
    )
    watch(
      matched,
      value => {
        layoutState.expanded = !value
      },
      { immediate: true }
    )
    watch(counter, () => computeScrollHeight)

    function computeScrollHeight() {
      let topHeight = 0
      let bottomHeight = 0

      if (top.value) {
        topHeight = top.value.offsetHeight
      }

      if (bottom.value) {
        bottomHeight = bottom.value.offsetHeight
      }

      if (topHeight || bottomHeight) {
        scrollHeight.value = `calc(100% - ${topHeight + bottomHeight}px)`
      } else {
        scrollHeight.value = '100%'
      }
    }

    function toggleReduce(target = !currentReduced.value) {
      currentReduced.value = target

      emitEvent(props.onReducedChange, target)
      emit('update:reduced', target)
    }

    function toggleExpand(target = !currentExpanded.value) {
      currentExpanded.value = target

      emitEvent(props.onExpandedChange, target)
      emit('update:expanded', target)
    }

    function handleSignClick(event: MouseEvent) {
      emitEvent(props.onSignClick, event)
    }

    function handleMenuSelect(label: string, meta: Record<string, any>) {
      emitEvent(props.onMenuSelect, label, meta)
    }

    function getSlotParams() {
      return {
        reduced: currentReduced.value,
        toggleReduce,
        toggleExpand
      }
    }

    return () => {
      const CustomTag = (props.tag || 'aside') as any

      return (
        <CustomTag class={className.value}>
          {hasTop.value && (
            <div ref={top} class={nh.be('aside-top')}>
              {slots.top
                ? (
                    slots.top(getSlotParams())
                  )
                : (
                <div class={nh.be('sign')} onClick={handleSignClick}>
                  {props.logo && (
                    <div class={nh.be('logo')}>
                      <img src={props.logo} alt={'Logo'} />
                    </div>
                  )}
                  {props.signName && <span class={nh.be('sign-name')}>{props.signName}</span>}
                </div>
                  )}
            </div>
          )}
          <NativeScroll class={nh.be('aside-main')} height={scrollHeight.value}>
            {slots.default
              ? (
                  slots.default(getSlotParams())
                )
              : hasMenu.value
                ? (
              <Menu
                {...(props.menuProps || {})}
                transfer
                options={props.menus}
                reduced={currentReduced.value}
                onSelect={handleMenuSelect}
              ></Menu>
                  )
                : null}
          </NativeScroll>
          <div ref={bottom} class={nh.be('aside-bottom')}>
            {slots.bottom
              ? (
                  slots.bottom(getSlotParams())
                )
              : (
              <div class={nh.be('reduce-handler')} onClick={() => toggleReduce()}>
                <Icon icon={currentReduced.value ? Indent : Outdent}></Icon>
              </div>
                )}
          </div>
          <div class={nh.be('expand-handler')} onClick={() => toggleExpand()}>
            {slots.expand
              ? (
                  slots.expand(getSlotParams())
                )
              : (
              <Icon>
                <CaretRight></CaretRight>
              </Icon>
                )}
          </div>
        </CustomTag>
      )
    }
  }
})
