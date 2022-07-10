import { defineComponent, ref, reactive, computed, inject, provide } from 'vue'
import { MenuItem } from '@/components/menu-item'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { baseIndentWidth, MENU_STATE, MENU_ITEM_STATE, MENU_GROUP_STATE } from './symbol'

import type { PropType } from 'vue'
import type { MenuOptions } from './symbol'

const MenuGroup = defineComponent({
  name: 'MenuGroup',
  props: {
    label: String,
    children: Array as PropType<MenuOptions[]>
  },
  setup(_props, { slots }) {
    const props = useProps('menuGroup', _props, {
      label: {
        default: '',
        static: true
      },
      children: {
        default: () => [],
        static: true
      }
    })

    const menuState = inject(MENU_STATE, null)
    const parentItemState = inject(MENU_ITEM_STATE, null)

    const nh = useNameHelper('menu-group')
    const indent = ref(1)

    if (parentItemState) {
      indent.value = parentItemState.indent + 1
    }

    const labelStyle = computed(() => {
      return {
        paddingLeft: parentItemState?.isUsePopper
          ? undefined
          : `${indent.value * baseIndentWidth}px`
      }
    })
    const onlyShowSlot = computed(() => {
      return menuState?.horizontal && !parentItemState
    })

    provide(MENU_GROUP_STATE, reactive({ indent }))

    function renderChildren() {
      if (slots.default) {
        return slots.default()
      }

      if (!props.children?.length) {
        return null
      }

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
        >
          {item.name || item.label}
        </MenuItem>
      )

      return props.children.map(child => {
        if (child.group) {
          return (
            <MenuGroup label={child.name || child.label}>
              {child.children?.map(renderItem)}
            </MenuGroup>
          )
        }

        return renderItem(child)
      })
    }

    return () => {
      if (onlyShowSlot.value) {
        return slots.default?.()
      }

      return (
        <li class={nh.b()}>
          <div class={nh.be('title')}>
            <span class={nh.be('label')} style={labelStyle.value}>
              {slots.label ? slots.label() : props.label}
            </span>
          </div>
          <ul class={nh.be('list')}>{renderChildren()}</ul>
        </li>
      )
    }
  }
})

export default MenuGroup
