<template>
  <li ref="wrapper" :class="className" role="none">
    <Tooltip
      placement="right"
      :reverse="tooltipReverse"
      :transfer="true"
      :disabled="tooltipDisabled"
    >
      <template #trigger>
        <div
          ref="reference"
          :class="{
            [nh.be('label')]: true,
            [nh.bem('label', `marker-${markerType}`)]: true,
            [nh.bem('label', 'in-popper')]: isUsePopper
          }"
          role="menuitem"
          tabindex="0"
          :aria-disabled="props.disabled ? 'true' : undefined"
          :style="labelStyle"
          @click="handleSelect"
          @keydown.enter.stop="handleSelect"
          @keydown.space.stop.prevent="handleSelect"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <div v-if="$slots.icon || props.icon" :class="nh.be('icon')">
            <slot name="icon">
              <Renderer v-if="typeof props.icon === 'function'" :renderer="props.icon"></Renderer>
              <Icon v-else v-bind="props.iconProps" :icon="props.icon"></Icon>
            </slot>
          </div>
          <span
            :class="{
              [nh.be('title')]: true,
              [nh.bem('title', 'in-group')]: !isHorizontal && isGroup
            }"
          >
            <slot>
              {{ props.label }}
            </slot>
          </span>
          <Icon
            v-if="isGroup"
            :class="{
              [nh.be('arrow')]: true,
              [nh.bem('arrow', 'visible')]: groupExpanded
            }"
          >
            <ChevronDown></ChevronDown>
          </Icon>
        </div>
      </template>
      <span :class="nh.be('tooltip-title')">
        <slot>
          {{ props.label }}
        </slot>
      </span>
    </Tooltip>
    <CollapseTransition appear>
      <ul v-if="isGroup && !isUsePopper" v-show="showGroup" :class="nh.be('list')">
        <slot name="group">
          <Renderer :renderer="renderChildren"></Renderer>
        </slot>
      </ul>
    </CollapseTransition>
    <Portal v-if="isGroup && isUsePopper" :to="transferTo">
      <transition :name="transition" appear @after-leave="popperShow = false">
        <div
          v-if="popperShow"
          v-show="popperShow && showGroup"
          ref="popper"
          :class="[
            nh.be('popper'),
            nh.bs('vars'),
            isHorizontal && nh.bem('popper', 'drop'),
            transferTo !== 'body' && [nh.bem('popper', 'inherit')]
          ]"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <ul :class="nh.be('list')">
            <slot name="group">
              <Renderer :renderer="renderChildren"></Renderer>
            </slot>
          </ul>
        </div>
      </transition>
    </Portal>
  </li>
</template>

<script lang="tsx">
import {
  defineComponent,
  defineAsyncComponent,
  ref,
  reactive,
  computed,
  inject,
  provide,
  toRef,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick
} from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { Portal } from '@/components/portal'
import { Tooltip } from '@/components/tooltip'
import { Renderer } from '@/components/renderer'
import { ChevronDown } from '@vexip-ui/icons'
import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
import { usePopper, useSetTimeout, useClickOutside } from '@vexip-ui/hooks'
import { callIfFunc } from '@vexip-ui/utils'
import { menuItemProps } from './props'
import { baseIndentWidth, MENU_STATE, MENU_ITEM_STATE, MENU_GROUP_STATE } from './symbol'

import type { Placement } from '@vexip-ui/hooks'
import type { MenuOptions } from './symbol'

const MenuGroup = defineAsyncComponent(() => import('./menu-group'))

const MenuItem = defineComponent({
  name: 'MenuItem',
  components: {
    CollapseTransition,
    Icon,
    Tooltip,
    Portal,
    Renderer,
    ChevronDown
  },
  props: menuItemProps,
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('menuItem', _props, {
      label: {
        default: null,
        static: true
      },
      icon: {
        isFunc: true,
        default: null
      },
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
    const baseClass = nh.be('item')
    const placement = ref('right-start' as Placement)
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
    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper
    })

    const className = computed(() => {
      return {
        [baseClass]: true,
        [`${baseClass}--disabled`]: props.disabled,
        [`${baseClass}--group-visible`]: isGroup.value && groupExpanded.value,
        [`${baseClass}--selected`]: selected.value,
        [`${baseClass}--no-icon`]: !props.icon,
        [`${baseClass}--son-selected`]: sonSelected.value
      }
    })
    const labelStyle = computed(() => {
      if (menuState?.horizontal || parentItemState?.isUsePopper) {
        return {}
      }

      return {
        paddingLeft:
          parentItemState && parentItemState.isUsePopper
            ? undefined
            : `${
                indent.value * baseIndentWidth +
                (menuState?.isReduced ? 0 : groupState?.indent ?? 0) * 0.25 * baseIndentWidth
              }px`
      }
    })
    const isGroup = computed(() => !!(slots.group || props.children?.length))
    const showGroup = computed(() => isGroup.value && groupExpanded.value)
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

    watch(showGroup, value => {
      if (value && isUsePopper.value) {
        popperShow.value = true
        updatePopper()
      }
    })
    watch(selected, value => {
      if (value) {
        emitEvent(props.onSelect)
        nextTick(() => {
          parentItemState?.updateSonSelected(value)
        })
      } else {
        parentItemState?.updateSonSelected(value)
      }
    })
    watch(groupExpanded, expanded => {
      if (typeof menuState?.handleExpand === 'function') {
        menuState.handleExpand(props.label, expanded, props.meta || {})
      }
    })
    watch(
      isHorizontal,
      value => {
        placement.value = value ? 'bottom' : 'right-start'
      },
      { immediate: true }
    )

    if (menuState) {
      watch(
        () => [props.label, menuState.currentActive],
        () => {
          selected.value = props.label === menuState.currentActive
        },
        { immediate: true }
      )
    }

    onMounted(() => {
      if (typeof menuState?.increaseItem === 'function') {
        menuState.increaseItem(itemState)
      }
    })

    onBeforeUnmount(() => {
      if (typeof menuState?.decreaseItem === 'function') {
        menuState.decreaseItem(itemState)
      }
    })

    function updateSonSelected(selected: boolean) {
      sonSelected.value = selected
      parentItemState?.updateSonSelected(selected)
    }

    const { timer } = useSetTimeout()

    function handleSelect() {
      clearTimeout(timer.hover)

      if (props.disabled) return

      if (isGroup.value) {
        if (isUsePopper.value && dropTrigger.value !== 'click') return

        menuState?.beforeExpand()
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

    function toggleGroupExpanded(expanded: boolean, upwrad = false) {
      clearTimeout(timer.hover)

      menuState?.beforeExpand()
      groupExpanded.value = expanded

      if (upwrad && typeof parentItemState?.toggleGroupExpanded === 'function') {
        parentItemState.toggleGroupExpanded(expanded, upwrad)
      }
    }

    function handleMouseEnter() {
      clearTimeout(timer.hover)

      if (props.disabled || !isUsePopper.value || dropTrigger.value !== 'hover') return

      if (typeof parentItemState?.handleMouseEnter === 'function') {
        parentItemState.handleMouseEnter()
      }

      if (!isGroup.value) return

      timer.hover = setTimeout(() => {
        groupExpanded.value = true
      }, 250)
    }

    function handleMouseLeave() {
      clearTimeout(timer.hover)

      if (props.disabled || !isUsePopper.value || dropTrigger.value !== 'hover') return

      if (typeof parentItemState?.handleMouseLeave === 'function') {
        parentItemState.handleMouseLeave()
      }

      if (!isGroup.value) return

      timer.hover = setTimeout(() => {
        groupExpanded.value = false
      }, 250)
    }

    function handleClickOutside() {
      if (dropTrigger.value === 'click') {
        nextTick(() => {
          groupExpanded.value = false
        })
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
        >
          {item.name ? callIfFunc(item.name) : item.label}
        </MenuItem>
      )

      return props.children.map(child => {
        if (child.group) {
          return (
            <MenuGroup label={child.name ? callIfFunc(child.name) : child.label}>
              {child.children?.map(renderItem)}
            </MenuGroup>
          )
        }

        return renderItem(child)
      })
    }

    return {
      props,
      nh,
      groupExpanded,
      transferTo,

      popperShow,
      className,
      labelStyle,
      isGroup,
      showGroup,
      isUsePopper,
      tooltipDisabled,
      markerType,
      tooltipReverse,
      isHorizontal,
      transition,
      dropTrigger,

      wrapper,
      reference,
      popper,

      handleSelect,
      handleMouseEnter,
      handleMouseLeave,
      renderChildren
    }
  }
})

// eslint-disable-next-line vue/require-direct-export
export default MenuItem
</script>
