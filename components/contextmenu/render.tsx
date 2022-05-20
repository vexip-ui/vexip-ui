import { Dropdown } from '@/components/dropdown'
import { DropdownList } from '@/components/dropdown-list'
import { DropdownItem } from '@/components/dropdown-item'
import { Icon } from '@/components/icon'
import { ChevronRight } from '@vexip-ui/icons'

import type { MenuConfig } from './symbol'

const prefix = 'vxp-contextmenu'

function renderItemIcon(item: MenuConfig) {
  if (!item.icon) return null

  let icon: any

  if (typeof item.icon === 'function') {
    icon = item.icon()
  } else {
    icon = (
      <Icon icon={item.icon} style={[{ color: item.iconColor || item.color }, item.icon.style]}></Icon>
    )
  }

  return <div class={`${prefix}__icon`}>{icon}</div>
}

function renderItemShortcut(item: MenuConfig) {
  if (!item.shortcut) return null

  return <div class={`${prefix}__shortcut`}>{item.shortcut}</div>
}

function renderGroupItem(item: MenuConfig) {
  return (
    <Dropdown
      transfer={false}
      {...{
        onContextmenu: (event: MouseEvent) => {
          event.preventDefault()
          event.stopPropagation()
        }
      }}
    >
      {{
        default: () => (
          <DropdownItem
            class={`${prefix}__item`}
            label={item.key}
            divided={item.divided}
            disabled={item.disabled}
          >
            {renderItemIcon(item)}
            <span style={{ color: item.color }}>{item.label || item.key}</span>
            {renderItemShortcut(item)}
            <div class={[`${prefix}__icon`, `${prefix}__arrow`]}>
              <Icon icon={ChevronRight} style={{ color: item.iconColor || item.color }}></Icon>
            </div>
          </DropdownItem>
        ),
        drop: () => (
          <DropdownList
            class={[
              `${prefix}__list`,
              item.children!.some(c => c.icon)
                ? `${prefix}__list--icons`
                : `${prefix}__list--no-icon`,
              item.children!.some(c => c.children?.length)
                ? `${prefix}__list--arrows`
                : `${prefix}__list--no-arrow`
            ]}
          >
            {item.children!.map(renderItem)}
          </DropdownList>
        )
      }}
    </Dropdown>
  )
}

export function renderItem(item: MenuConfig) {
  if (item.children?.length) {
    return renderGroupItem(item)
  } else {
    return (
      <DropdownItem
        class={`${prefix}__item`}
        label={item.key}
        divided={item.divided}
        disabled={item.disabled}
      >
        {renderItemIcon(item)}
        <span style={{ color: item.color }}>{item.label || item.key}</span>
        {renderItemShortcut(item)}
      </DropdownItem>
    )
  }
}
