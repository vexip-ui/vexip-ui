import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { Popper } from '@/components/popper'
import { Tooltip } from '@/components/tooltip'

import {
  computed,
  defineAsyncComponent,
  defineComponent,
  inject,
  nextTick,
  onBeforeUnmount,
  // onMounted,
  provide,
  reactive,
  ref,
  renderSlot,
  toRef,
  watch
} from 'vue'

import {
  createIconProp,
  emitEvent,
  useHoverDelay,
  useIcons,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { useClickOutside, usePopper, useRtl, useSetTimeout } from '@vexip-ui/hooks'
import { callIfFunc } from '@vexip-ui/utils'
import { menuItemProps } from './props'
import { MENU_GROUP_STATE, MENU_ITEM_STATE, MENU_STATE } from './symbol'

// For types build
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { RouteLocationRaw } from 'vue-router'
import type { PopperExposed } from '@/components/popper'
import type { Placement } from '@vexip-ui/hooks'
import type { MenuOptions } from './symbol'

const MenuGroup = defineAsyncComponent(() => import('./menu-group'))

const MenuItem = defineComponent({
  name: 'MenuItem',
  props: menuItemProps,
  emits: [],
  setup(_props, { slots, expose }) {
    const props = useProps('menuItem', _props, {
      label: {
        default: null,
        static: true
      },
      icon: createIconProp(),
      iconProps: null,
      disabled: false,
      transfer: null,
      trigger: null,
      transitionName: null,
      meta: null,
      children: {
        default: () => [],
        static: true
      },
      route: null
    })

    const menuState = inject(MENU_STATE, null)
    const parentItemState = inject(MENU_ITEM_STATE, null)
    const groupState = inject(MENU_GROUP_STATE, null)

    const nh = useNameHelper('menu')
    const icons = useIcons()
    const hoverDelay = useHoverDelay()

    const { isRtl } = useRtl()

    const baseClass = nh.be('item')
    const placement = ref<Placement>(isRtl.value ? 'left-start' : 'right-start')
    const groupExpanded = ref(false)
    const selected = ref(false)
    const sonSelected = ref(false)
    const popperShow = ref(false)

    const indent = computed(() => (parentItemState?.indent ?? 0) + 1)
    const propTransfer = computed(() => props.transfer ?? menuState?.transfer ?? false)
    const inTransfer = computed(() => (parentItemState ? parentItemState.transfer : false))
    const transfer = computed(() => !inTransfer.value && propTransfer.value)
    const markerType = computed(() => menuState?.markerType || 'right')

    const wrapper = useClickOutside(handleClickOutside)
    const popper = ref<PopperExposed>()
    const { reference, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      popper: computed(() => popper.value?.wrapper),
      shift: { crossAxis: true }
    })

    const isGroup = computed(() => !!(slots.group || props.children?.length))
    const showGroup = computed(() => isGroup.value && groupExpanded.value)
    const className = computed(() => {
      return {
        [baseClass]: true,
        [`${baseClass}--disabled`]: props.disabled,
        [`${baseClass}--group-visible`]: showGroup.value,
        [`${baseClass}--selected`]: selected.value,
        [`${baseClass}--no-icon`]: !props.icon,
        [`${baseClass}--son-selected`]: sonSelected.value
      }
    })
    const labelStyle = computed(() => {
      if (menuState?.horizontal || parentItemState?.isUsePopper) {
        return {}
      }

      const indentWidth = nh.gcv('indent-width')
      const multiplier = indent.value + (menuState?.isReduced ? 0 : groupState?.indent ?? 0) * 0.25

      return {
        paddingInlineStart:
          parentItemState && parentItemState.isUsePopper
            ? undefined
            : `calc(${indentWidth} * ${multiplier})`
      }
    })
    const isUsePopper = computed(() => {
      return (
        (menuState && (menuState.horizontal || menuState.groupType === 'dropdown')) ||
        (isGroup.value && menuState?.isReduced && !parentItemState) ||
        !!parentItemState?.isUsePopper
      )
    })
    const tooltipDisabled = computed(() => {
      return (
        isGroup.value || !!(parentItemState?.isUsePopper || (menuState && !menuState.isReduced))
      )
    })
    const tooltipReverse = computed(() => !!menuState?.tooltipReverse)
    const isHorizontal = computed(() => menuState?.horizontal && !parentItemState)
    const transition = computed(() => {
      return props.transitionName ?? isHorizontal.value ? nh.ns('drop') : nh.ns('zoom')
    })
    const dropTrigger = computed(() => props.trigger || menuState?.trigger || 'hover')

    const itemState = reactive({
      el: wrapper,
      label: toRef(props, 'label'),
      indent,
      groupExpanded,
      showGroup,
      isUsePopper,
      parentState: parentItemState,
      transfer: computed(() => inTransfer.value || propTransfer.value),
      cachedExpanded: groupExpanded.value,
      updateSonSelected,
      toggleGroupExpanded,
      handleMouseEnter,
      handleMouseLeave
    })

    provide(MENU_ITEM_STATE, itemState)

    watch(
      showGroup,
      value => {
        if (value && isUsePopper.value) {
          popperShow.value = true
          updatePopper()
        }
      },
      { immediate: true }
    )
    watch(selected, value => {
      if (value) {
        emitEvent(props.onSelect)
      }

      menuState?.doForEachItem(item => item.updateSonSelected(false, false))
      value &&
        nextTick(() => {
          parentItemState?.updateSonSelected(value)
        })
    })
    watch(groupExpanded, expanded => {
      if (typeof menuState?.handleExpand === 'function') {
        menuState.handleExpand(props.label, expanded, props.meta || {})
      }
    })
    watch(
      isHorizontal,
      value => {
        placement.value = value ? 'bottom' : isRtl.value ? 'left-start' : 'right-start'
      },
      { immediate: true }
    )

    if (menuState) {
      watch(
        [() => props.label, () => menuState.currentActive],
        () => {
          selected.value = props.label === menuState.currentActive
        },
        { immediate: true }
      )

      if (typeof menuState.increaseItem === 'function') {
        menuState.increaseItem(itemState)
      }
    }

    // onMounted(() => {
    //   if (typeof menuState?.increaseItem === 'function') {
    //     menuState.increaseItem(itemState)
    //   }
    // })

    onBeforeUnmount(() => {
      if (typeof menuState?.decreaseItem === 'function') {
        menuState.decreaseItem(itemState)
      }
    })

    expose({
      groupExpanded,
      isGroup,
      showGroup,
      isUsePopper,
      handleSelect,
      handleMouseEnter,
      handleMouseLeave
    })

    function updateSonSelected(selected: boolean, upstream = true) {
      sonSelected.value = selected
      upstream && parentItemState?.updateSonSelected(selected)
    }

    const { timer } = useSetTimeout()

    function handleSelect() {
      clearTimeout(timer.hover)

      if (props.disabled) return

      if (isGroup.value) {
        if (isUsePopper.value && dropTrigger.value !== 'click') return

        menuState?.doForEachItem(item => {
          if (menuState.accordion) {
            item.groupExpanded = false
          }
        })
        groupExpanded.value = !groupExpanded.value
      } else {
        if (isUsePopper.value) {
          toggleGroupExpanded(false, true)
        }

        if (menuState) {
          menuState.handleSelect(props.label, props.meta || {}, props.route)
        }

        selected.value = true
      }
    }

    function toggleGroupExpanded(expanded: boolean, upward = false) {
      clearTimeout(timer.hover)

      menuState?.doForEachItem(item => {
        if (menuState.accordion) {
          item.groupExpanded = false
        }
      })
      groupExpanded.value = expanded

      if (upward && typeof parentItemState?.toggleGroupExpanded === 'function') {
        parentItemState.toggleGroupExpanded(expanded, upward)
      }
    }

    let mouseInList = false
    let reproduce = false

    function handleMouseEnter() {
      clearTimeout(timer.hover)

      if (mouseInList || !isUsePopper.value || dropTrigger.value !== 'hover') return

      if (!groupExpanded.value && popperShow.value) {
        reproduce = true
        return
      }

      if (typeof parentItemState?.handleMouseEnter === 'function') {
        parentItemState.handleMouseEnter()
      }

      if (props.disabled || !isGroup.value) return

      timer.hover = setTimeout(() => {
        groupExpanded.value = true
      }, hoverDelay.value)
    }

    function handleMouseLeave() {
      clearTimeout(timer.hover)

      if (mouseInList || !popperShow.value || !isUsePopper.value || dropTrigger.value !== 'hover') {
        return
      }

      if (typeof parentItemState?.handleMouseLeave === 'function') {
        parentItemState.handleMouseLeave()
      }

      if (props.disabled || !isGroup.value) return

      timer.hover = setTimeout(() => {
        groupExpanded.value = false
      }, hoverDelay.value)
    }

    function handleClickOutside() {
      if (isUsePopper.value && dropTrigger.value === 'click') {
        nextTick(() => {
          groupExpanded.value = false
        })
      }
    }

    function handlePopperHide() {
      popperShow.value = false
      groupExpanded.value = false

      if (reproduce) {
        reproduce = false

        if (typeof parentItemState?.handleMouseEnter === 'function') {
          parentItemState.handleMouseEnter()
        }

        if (props.disabled || !isGroup.value) return

        groupExpanded.value = true
      }
    }

    function handleKeySelect(event: KeyboardEvent) {
      const key = event.code || event.key

      if (key === 'Enter' || key === 'NumpadEnter') {
        event.stopPropagation()
        handleSelect()
      } else if (key === 'Space') {
        event.stopPropagation()
        event.preventDefault()
        handleSelect()
      }
    }

    function renderChildren() {
      if (!props.children?.length) {
        return null
      }

      const renderItem = (item: MenuOptions) => (
        <MenuItem
          label={item.label}
          icon={item.icon}
          icon-props={item.iconProps}
          disabled={item.disabled}
          children={item.children}
          route={item.route}
          meta={item.meta}
        >
          {item.name ? callIfFunc(item.name) : item.label}
        </MenuItem>
      )

      return props.children.map(child => {
        if (child.group) {
          return (
            <MenuGroup key={child.label} label={child.name ? callIfFunc(child.name) : child.label}>
              {child.children?.map(renderItem)}
            </MenuGroup>
          )
        }

        return renderItem(child)
      })
    }

    function renderLabel() {
      return (
        <Tooltip
          placement={isRtl.value ? 'left' : 'right'}
          reverse={tooltipReverse.value}
          shift
          transfer
          disabled={tooltipDisabled.value}
        >
          {{
            trigger: () => (
              <div
                ref={reference}
                class={{
                  [nh.be('label')]: true,
                  [nh.bem('label', `marker-${markerType.value}`)]: true,
                  [nh.bem('label', 'in-popper')]: parentItemState?.isUsePopper
                }}
                role={'menuitem'}
                tabindex={0}
                aria-disabled={props.disabled ? 'true' : undefined}
                style={labelStyle.value}
                onClick={handleSelect}
                onKeydown={handleKeySelect}
                onMouseenter={handleMouseEnter}
                onMouseleave={handleMouseLeave}
              >
                {(slots.icon || props.icon) && (
                  <div class={nh.be('icon')}>
                    {slots.icon ? (
                      renderSlot(slots, 'icon')
                    ) : (
                      <Icon {...props.iconProps} icon={props.icon}></Icon>
                    )}
                  </div>
                )}
                <span
                  class={{
                    [nh.be('title')]: true,
                    [nh.bem('title', 'in-group')]: !isHorizontal.value && isGroup.value
                  }}
                >
                  {slots.default ? renderSlot(slots, 'default') : props.label}
                </span>
                {isGroup.value && (
                  <Icon
                    {...icons.value.angleDown}
                    class={{
                      [nh.be('arrow')]: true,
                      [nh.bem('arrow', 'visible')]: groupExpanded.value,
                      [nh.bem('arrow', '')]: sonSelected.value
                    }}
                  ></Icon>
                )}
              </div>
            ),
            default: () => (
              <span class={nh.be('tooltip-title')}>
                {slots.default ? renderSlot(slots, 'default') : props.label}
              </span>
            )
          }}
        </Tooltip>
      )
    }

    return () => {
      return (
        <li ref={wrapper} class={className.value} role={'none'}>
          {renderLabel()}
          <CollapseTransition appear>
            {isGroup.value && !isUsePopper.value && (
              <ul v-show={showGroup.value} class={nh.be('list')}>
                {slots.group ? renderSlot(slots, 'group') : renderChildren()}
              </ul>
            )}
          </CollapseTransition>
          {isGroup.value && isUsePopper.value && (
            <Popper
              ref={popper}
              class={[
                nh.be('popper'),
                nh.bs('vars'),
                isHorizontal.value && nh.bem('popper', 'drop')
              ]}
              visible={popperShow.value && showGroup.value}
              alive={!transferTo.value || popperShow.value}
              to={transferTo.value}
              transition={transition.value}
              onAfterLeave={handlePopperHide}
              onMouseenter={() => ((mouseInList = true), handleMouseEnter())}
              onMouseleave={() => ((mouseInList = false), handleMouseLeave())}
            >
              <ul class={nh.be('list')}>
                {slots.group ? renderSlot(slots, 'group') : renderChildren()}
              </ul>
            </Popper>
          )}
        </li>
      )
    }
  }
})

export default MenuItem
