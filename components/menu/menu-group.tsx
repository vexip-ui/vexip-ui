import { MenuItem } from '@/components/menu-item'

import { computed, defineComponent, inject, provide, reactive, ref } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { callIfFunc } from '@vexip-ui/utils'
import { MENU_GROUP_STATE, MENU_ITEM_STATE, MENU_STATE } from './symbol'
import { getSlotRealNodes } from './helper'

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
    const menuNh = useNameHelper('menu')
    const indent = ref(1)

    if (parentItemState) {
      indent.value = parentItemState.indent + 1
    }

    const titleStyle = computed(() => {
      return {
        paddingLeft: parentItemState?.isUsePopper
          ? undefined
          : `calc(${menuNh.gcv('indent-width')} * ${indent.value})`
      }
    })
    const onlyShowSlot = computed(() => {
      return menuState?.horizontal && !parentItemState
    })

    provide(MENU_GROUP_STATE, reactive({ indent }))

    function renderChildren() {
      const list = getSlotRealNodes(slots.default)

      if (list.length) {
        return list
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

    return () => {
      if (onlyShowSlot.value) {
        return slots.default?.()
      }

      return (
        <li class={nh.b()}>
          <div class={nh.be('label')}>
            <span class={nh.be('title')} style={titleStyle.value}>
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
