<template>
  <li ref="wrapper" :class="className">
    <Tooltip
      placement="right"
      :theme="tooltipTheme"
      :transfer="true"
      :disabled="tooltipDisabled"
    >
      <div
        ref="reference"
        :class="{
          [`${prefix}__label`]: true,
          [`${prefix}__label--in-popper`]: isUsePopper
        }"
        :style="labelStyle"
        @click="handleSelect"
        @mouseenter="handleMouseEnter"
      >
        <div v-if="icon" :class="`${prefix}__icon`">
          <slot name="icon">
            <Icon :name="icon"></Icon>
          </slot>
        </div>
        <span :class="`${prefix}__title`">
          <slot>
            {{ label }}
          </slot>
        </span>
        <Icon
          v-if="isGroup"
          name="chevron-down"
          :class="{
            [`${prefix}__arrow`]: true,
            [`${prefix}__arrow--visible`]: groupExpanded
          }"
        ></Icon>
      </div>
      <template #tip>
        <span :class="`${prefix}__tooltip-title`">
          <slot>
            {{ label }}
          </slot>
        </span>
      </template>
    </Tooltip>
    <span v-if="!isUsePopper">
      <CollapseTransition>
        <ul v-show="showGroup" :class="[`${prefix}__list`, `${prefix}__list--${theme}`]">
          <slot name="group"></slot>
        </ul>
      </CollapseTransition>
    </span>
    <Portal v-else-if="isGroup" :to="transferTo">
      <transition :name="transition">
        <div
          v-show="showGroup"
          ref="popper"
          :class="[`${prefix}__popper`, `${prefix}-vars`, isHorizontal ? `${prefix}__popper--drop` : '']"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <ul :class="[`${prefix}__list`, `${prefix}__list--${theme}`]">
            <slot name="group"></slot>
          </ul>
        </div>
      </transition>
    </Portal>
  </li>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  inject,
  provide,
  toRef,
  watch,
  onMounted,
  onBeforeUnmount
} from 'vue'

import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { Portal } from '@/components/portal'
import { Tooltip } from '@/components/tooltip'
import { useConfiguredProps } from '@vexip-ui/config'
import { usePopper } from '@vexip-ui/mixins'
import { baseIndentWidth, MENU_STATE, MENU_ITEM_STATE } from './symbol'

import '@/common/icons/chevron-down'

import type { Placement } from '@vexip-ui/mixins'

const props = useConfiguredProps('menuItem', {
  label: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  transfer: {
    type: [Boolean, String],
    default: null
  },
  transitionName: {
    type: String,
    default: null
  }
})

export default defineComponent({
  name: 'MenuItem',
  components: {
    CollapseTransition,
    Icon,
    Tooltip,
    Portal
  },
  props,
  emits: ['on-select'],
  setup(props, { slots, emit }) {
    const menuState = inject(MENU_STATE, null)
    const parentItemState = inject(MENU_ITEM_STATE, null)

    const prefix = 'vxp-menu'
    const baseClass = `${prefix}__item`
    const placement = ref('right-start' as Placement)
    const groupExpanded = ref(false)
    const selected = ref(false)
    const sonSelected = ref(false)
    const indent = ref(parentItemState ? parentItemState.indent + 1 : 1)

    const wrapper = ref<HTMLElement | null>(null)

    const propTransfer = computed(() => props.transfer ?? menuState?.transfer ?? false)
    const inTransfer = computed(() => parentItemState ? parentItemState.transfer : false)
    const transfer = computed(() => !inTransfer.value && propTransfer.value)

    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper
    })

    const className = computed(() => {
      return {
        [baseClass]: true,
        [`${baseClass}--disabled`]: props.disabled,
        [`${baseClass}--group-visible`]: groupExpanded.value,
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
            : `${indent.value * baseIndentWidth}px`
      }
    })
    const isGroup = computed(() => {
      return !!slots.group
    })
    const showGroup = computed(() => {
      return isGroup.value && groupExpanded.value
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
    const theme = computed(() => {
      return menuState ? menuState.theme : 'light'
    })
    const tooltipTheme = computed(() => {
      return menuState ? menuState.tooltipTheme : 'dark'
    })
    const isHorizontal = computed(() => {
      return menuState?.horizontal && !parentItemState
    })
    const transition = computed(() => {
      return props.transitionName ?? isHorizontal.value ? 'vxp-drop' : 'vxp-zoom'
    })

    const itemState = reactive({
      el: wrapper,
      label: toRef(props, 'label'),
      indent,
      groupExpanded,
      isUsePopper,
      parentState: parentItemState,
      transfer: computed(() => inTransfer.value || propTransfer.value),
      updateSonSelected,
      toggleGroupExpanded,
      handleMouseEnter,
      handleMouseLeave
    })

    provide(MENU_ITEM_STATE, itemState)

    watch(showGroup, value => {
      if (value && isUsePopper.value) {
        updatePopper()
      }
    })
    watch(selected, value => {
      if (value) {
        emit('on-select')
      }

      parentItemState?.updateSonSelected(value)
    })
    watch(groupExpanded, expanded => {
      if (typeof menuState?.handleExpand === 'function') {
        menuState.handleExpand(props.label, expanded)
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
        () => menuState.currentActive,
        value => {
          selected.value = props.label === value
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

    function handleSelect() {
      if (props.disabled) return

      if (isGroup.value) {
        if (isUsePopper.value) return

        groupExpanded.value = !groupExpanded.value
      } else {
        if (isUsePopper.value) {
          toggleGroupExpanded(false, true)
        }

        if (menuState) {
          menuState.handleSelect(props.label)
        }

        selected.value = true
      }
    }

    function toggleGroupExpanded(expanded: boolean, upwrad = false) {
      groupExpanded.value = expanded

      if (upwrad && typeof parentItemState?.toggleGroupExpanded === 'function') {
        parentItemState.toggleGroupExpanded(expanded, upwrad)
      }
    }

    let hoverTimer: number

    function handleMouseEnter() {
      if (props.disabled || !isUsePopper.value) return

      if (typeof parentItemState?.handleMouseEnter === 'function') {
        parentItemState.handleMouseEnter()
      }

      if (!isGroup.value) return

      window.clearTimeout(hoverTimer)

      hoverTimer = window.setTimeout(() => {
        groupExpanded.value = true
      }, 250)
    }

    function handleMouseLeave() {
      if (props.disabled || !isUsePopper.value) return

      if (typeof parentItemState?.handleMouseLeave === 'function') {
        parentItemState.handleMouseLeave()
      }

      if (!isGroup.value) return

      window.clearTimeout(hoverTimer)

      hoverTimer = window.setTimeout(() => {
        groupExpanded.value = false
      }, 250)
    }

    return {
      prefix,
      groupExpanded,
      transferTo,

      className,
      labelStyle,
      isGroup,
      showGroup,
      isUsePopper,
      tooltipDisabled,
      theme,
      tooltipTheme,
      isHorizontal,
      transition,

      wrapper,
      reference,
      popper,

      handleSelect,
      handleMouseEnter,
      handleMouseLeave
    }
  }
})
</script>
