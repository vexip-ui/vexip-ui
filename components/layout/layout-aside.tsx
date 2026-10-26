import { Icon } from '@/components/icon'
import { Menu } from '@/components/menu'
import { NativeScroll } from '@/components/native-scroll'

import {
  computed,
  defineComponent,
  reactive,
  ref,
  renderSlot,
  shallowReadonly,
  toRef,
  watch,
} from 'vue'

import { emitEvent, useIcons, useNameHelper, useProps } from '@vexip-ui/config'
import { layoutAsideProps } from './props'
import { useLayoutState, useMediaQuery, useUpdateCounter } from './helper'

import type { MenuExposed } from '@/components/menu'

export default defineComponent({
  name: 'LayoutAside',
  props: layoutAsideProps,
  emits: ['update:reduced', 'update:expanded'],
  setup(_props, { slots, emit, expose }) {
    const props = useProps('layoutAside', _props, {
      tag: 'aside',
      expanded: false,
      reduced: false,
      menus: {
        default: () => [],
        static: true,
      },
      menuProps: null,
      logo: '',
      signName: '',
      fixed: 'lg',
      signType: 'aside',
    })

    const nh = useNameHelper('layout')
    const icons = useIcons()

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
          [nh.bem('aside', 'reduced')]: currentReduced.value,
          [nh.bem('aside', 'no-sign')]: props.signType !== 'aside',
        },
        layoutState.classes.aside,
      ]
    })
    const hasTop = computed(() => {
      return !!(props.logo || props.signName || slots.top)
    })
    const hasMenu = computed(() => {
      return !!(props.menus?.length || props.menuProps?.router)
    })

    const slotParams = shallowReadonly(
      reactive({
        expanded: currentExpanded,
        reduced: currentReduced,
        toggleExpanded,
        toggleReduced,
      }),
    )

    expose({ menu, toggleExpanded, toggleReduced, expandMenuByLabel })

    watch(
      () => props.reduced,
      value => {
        currentReduced.value = value
      },
    )
    watch(
      () => props.expanded,
      value => {
        currentExpanded.value = value
      },
    )
    watch(
      matched,
      value => {
        layoutState.useExpand = !value
        value && toggleExpanded(false)
      },
      { immediate: true },
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

    function toggleExpanded(expanded = !currentExpanded.value) {
      currentExpanded.value = expanded

      emit('update:expanded', expanded)
      emitEvent(props.onExpandedChange, expanded)
    }

    function toggleReduced(reduced = !currentReduced.value) {
      currentReduced.value = reduced

      emit('update:reduced', reduced)
      emitEvent(props.onReducedChange, reduced)
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

    return () => {
      const CustomTag = (props.tag || 'aside') as any

      return (
        <CustomTag class={className.value}>
          {hasTop.value && (
            <div ref={top} class={[nh.be('aside-top'), layoutState.classes.asideTop]}>
              {slots.top ? (
                renderSlot(slots, 'top', slotParams)
              ) : (
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
          <NativeScroll
            class={[nh.be('aside-main'), layoutState.classes.main]}
            use-y-bar
            observe-deep
            height={scrollHeight.value}
          >
            {slots.default ? (
              renderSlot(slots, 'default', slotParams)
            ) : hasMenu.value ? (
              <Menu
                ref={menu}
                {...(props.menuProps || {})}
                transfer
                options={props.menus}
                reduced={currentReduced.value}
                onSelect={handleMenuSelect}
              ></Menu>
            ) : null}
          </NativeScroll>
          <div ref={bottom} class={[nh.be('aside-bottom'), layoutState.classes.asideBottom]}>
            {slots.bottom ? (
              renderSlot(slots, 'bottom', slotParams)
            ) : (
              <div class={nh.be('reduce-handler')} onClick={() => toggleReduced()}>
                {currentReduced.value ? (
                  <Icon {...icons.value.indent}></Icon>
                ) : (
                  <Icon {...icons.value.outdent}></Icon>
                )}
              </div>
            )}
          </div>
          <div
            class={[nh.be('expand-handler'), layoutState.classes.expandHandler]}
            onClick={() => toggleExpanded()}
          >
            {slots.expand ? (
              renderSlot(slots, 'expand', slotParams)
            ) : (
              <Icon {...icons.value.angleRight}></Icon>
            )}
          </div>
        </CustomTag>
      )
    }
  },
})
