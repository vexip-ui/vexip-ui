export interface ComponentConfig {
  name: string,
  since?: string
}

export interface ComponentGroup {
  name: string,
  components: ComponentConfig[]
}

export function getComponentConfig(): ComponentGroup[] {
  return [
    {
      name: 'basis',
      components: [
        { name: 'Button' },
        { name: 'Icon' },
        { name: 'Linker' }
      ]
    },
    {
      name: 'layout',
      components: [
        { name: 'Grid', since: '2.0.0' },
        { name: 'Divider' },
        { name: 'Row' },
        { name: 'Split' }
      ]
    },
    {
      name: 'navigation',
      components: [
        { name: 'Anchor' },
        { name: 'Breadcrumb' },
        { name: 'Dropdown' },
        { name: 'Menu' },
        { name: 'Pagination' }
      ]
    },
    {
      name: 'form',
      components: [
        { name: 'AutoComplete' },
        { name: 'Checkbox' },
        { name: 'ColorPicker' },
        { name: 'DatePicker' },
        { name: 'Form' },
        { name: 'Input' },
        { name: 'NumberInput' },
        { name: 'Radio' },
        { name: 'Select' },
        { name: 'Slider' },
        { name: 'Switcher' },
        { name: 'Textarea' },
        { name: 'TimePicker' },
        { name: 'Upload' },
        { name: 'Wheel' }
      ]
    },
    {
      name: 'data',
      components: [
        { name: 'Avatar', since: '2.0.0' },
        { name: 'Badge' },
        { name: 'Bubble' },
        { name: 'Calendar', since: '1.3.0' },
        { name: 'Card' },
        { name: 'Carousel' },
        { name: 'Collapse' },
        { name: 'Ellipsis', since: '1.1.3' },
        { name: 'Highlight', since: '1.3.1' },
        { name: 'Table' },
        { name: 'TabNav' },
        { name: 'Tabs' },
        { name: 'Tag' },
        { name: 'TimeAgo', since: '1.1.0' },
        { name: 'Timeline' },
        { name: 'Tooltip' },
        { name: 'Tree' }
      ]
    },
    {
      name: 'effect',
      components: [
        { name: 'Alert' },
        { name: 'Confirm' },
        { name: 'Contextmenu', since: '1.1.0' },
        { name: 'Drawer' },
        { name: 'Loading', since: '1.1.0' },
        { name: 'Message' },
        { name: 'Modal' },
        { name: 'Notice' },
        { name: 'Progress' },
        { name: 'Spin', since: '1.3.0' }
      ]
    },
    {
      name: 'else',
      components: [
        { name: 'ConfigProvider', since: '2.0.0' },
        { name: 'Masker' },
        { name: 'NativeScroll', since: '1.3.1' },
        { name: 'ResizeObserver', since: '2.0.0' },
        { name: 'Scroll' },
        { name: 'Scrollbar' },
        { name: 'VirtualList', since: '2.0.0' }
      ]
    }
  ]
}
