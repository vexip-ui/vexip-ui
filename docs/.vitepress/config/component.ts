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
        { name: 'Linker' },
        { name: 'Typography', since: '2.0.0' }
      ]
    },
    {
      name: 'layout',
      components: [
        { name: 'Grid', since: '2.0.0' },
        { name: 'Divider' },
        { name: 'Layout', since: '2.0.0' },
        { name: 'NativeScroll', since: '1.3.1' },
        { name: 'Row' },
        { name: 'Scroll' },
        { name: 'Space', since: '2.0.0' },
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
        { name: 'Cascader', since: '2.0.0' },
        { name: 'Checkbox' },
        { name: 'ColorPicker' },
        { name: 'DatePicker' },
        { name: 'Form' },
        { name: 'Input' },
        { name: 'NumberInput' },
        { name: 'Radio' },
        { name: 'Select' },
        { name: 'Slider' },
        { name: 'Switch' },
        { name: 'Textarea' },
        { name: 'TimePicker' },
        { name: 'Transfer', since: '2.0.0' },
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
        { name: 'Image', since: '2.1.0' },
        { name: 'Result', since: '2.1.0' },
        { name: 'Table' },
        { name: 'TabNav' },
        { name: 'Tabs' },
        { name: 'Tag' },
        { name: 'TimeAgo', since: '1.1.0' },
        { name: 'Timeline' },
        { name: 'Tooltip' },
        { name: 'Tree' },
        { name: 'Viewer', since: '2.0.0' }
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
        { name: 'Skeleton', since: '2.0.0' },
        { name: 'Spin', since: '1.3.0' },
        { name: 'Toast', since: '2.0.0' }
      ]
    },
    {
      name: 'else',
      components: [
        { name: 'ConfigProvider', since: '2.0.0' },
        { name: 'FullScreen', since: '2.1.0' },
        { name: 'Masker' },
        { name: 'Overflow', since: '2.0.0' },
        { name: 'Renderer' },
        { name: 'ResizeObserver', since: '2.0.0' },
        { name: 'Scrollbar' },
        { name: 'VirtualList', since: '2.0.0' }
      ]
    }
  ]
}
