import { defineComponent, ref, toRef, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { Menu } from '@/components/menu'
import { NativeScroll } from '@/components/native-scroll'
import { Indent, Outdent, CaretRight } from '@vexip-ui/icons'
import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
import { layoutAsideProps } from './props'
import { useLayoutState, useMediaQuery, useUpdateCounter } from './helper'

import type { MenuExposed } from '@/components/menu'

export default defineComponent({
  name: 'LayoutAside',
  props: layoutAsideProps,
  emits: ['update:reduced', 'update:expanded'],
  setup(_props, { slots, emit, expose }) {
    const props = useProps('layout', _props, {
      tag: 'aside',
      reduced: false,
      menus: {
        default: () => [],
        static: true
      },
      menuProps: null,
      logo: '',
      signName: '',
      fixed: 'lg'
    })

    const nh = useNameHelper('layout')
    const layoutState = useLayoutState()
    const currentReduced = ref(props.reduced)
    const currentExpanded = ref(props.expanded)
    const scrollHeight = ref('100%')

    const matched = useMediaQuery(toRef(props, 'fixed'))
    const counter = useUpdateCounter()

    const top = ref<HTMLElement>()
    const bottom = ref<HTMLElement>()
    const menu = ref<MenuExposed>()

    const className = computed(() => {
      return [
        nh.be('aside'),
        {
          [nh.bs('vars')]: !layoutState.isLayout,
          [nh.bem('aside', 'inherit')]: layoutState.isLayout || props.inherit,
          [nh.bem('aside', 'fixed')]: matched.value,
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

    expose({ menu, expandMenuByLabel })

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

    function expandMenuByLabel(label: string) {
      menu.value?.expandItemByLabel(label)
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
                ref={menu}
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
