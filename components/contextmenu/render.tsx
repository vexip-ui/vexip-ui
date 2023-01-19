import { Dropdown } from '@/components/dropdown'
import { DropdownList } from '@/components/dropdown-list'
import { DropdownItem } from '@/components/dropdown-item'
import { Icon } from '@/components/icon'
import { ChevronRight } from '@vexip-ui/icons'
import type { NameHelper } from '@vexip-ui/config'

import type { ContextmenuConfig } from './symbol'

function renderItemIcon(item: ContextmenuConfig, nh: NameHelper) {
  if (!item.icon) return null

  let icon: any

  if (typeof item.icon === 'function') {
    icon = item.icon()
  } else {
    icon = (
      <Icon
        icon={item.icon}
        style={[{ color: item.iconColor || item.color }, item.icon.style]}
      ></Icon>
    )
  }

  return <div class={nh.be('icon')}>{icon}</div>
}

function renderItemShortcut(item: ContextmenuConfig, nh: NameHelper) {
  if (!item.shortcut) return null

  return <div class={nh.be('shortcut')}>{item.shortcut}</div>
}

function renderGroupItem(item: ContextmenuConfig, nh: NameHelper) {
  return (
    <Dropdown
      inherit
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
            class={nh.be('item')}
            label={item.key}
            divided={item.divided}
            disabled={item.disabled}
          >
            {renderItemIcon(item, nh)}
            <span class={nh.be('label')} style={{ color: item.color }}>
              {item.label || item.key}
            </span>
            {renderItemShortcut(item, nh)}
            <div class={[nh.be('icon'), nh.be('arrow')]}>
              <Icon icon={ChevronRight} style={{ color: item.iconColor || item.color }}></Icon>
            </div>
          </DropdownItem>
        ),
        drop: () => (
          <DropdownList
            class={[
              nh.be('list'),
              item.children!.some(c => c.icon)
                ? nh.bem('list', 'icons')
                : nh.bem('list', 'no-icon'),
              item.children!.some(c => c.children?.length)
                ? nh.bem('list', 'arrows')
                : nh.bem('list', 'no-arrow')
            ]}
          >
            {item.children!.map(i => renderItem({ nh, config: i }))}
          </DropdownList>
        )
      }}
    </Dropdown>
  )
}

export function renderItem({ config, nh }: { config: ContextmenuConfig, nh: NameHelper }) {
  if (config.children?.length) {
    return renderGroupItem(config, nh)
  } else {
    return (
      <DropdownItem
        class={nh.be('item')}
        label={config.key}
        divided={config.divided}
        disabled={config.disabled}
      >
        {renderItemIcon(config, nh)}
        <span class={nh.be('label')} style={{ color: config.color }}>
          {config.label || config.key}
        </span>
        {renderItemShortcut(config, nh)}
      </DropdownItem>
    )
  }
}
