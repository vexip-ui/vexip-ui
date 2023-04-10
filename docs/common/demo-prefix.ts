import { ref } from 'vue'
import { isClient, toCapitalCase } from '@vexip-ui/utils'

const components = [
  'Alert',
  'Anchor',
  'AnchorLink',
  'AutoComplete',
  'Avatar',
  'AvatarGroup',
  'Badge',
  'Breadcrumb',
  'BreadcrumbItem',
  'Bubble',
  'Button',
  'ButtonGroup',
  'Calendar',
  'CalendarPanel',
  'Card',
  'Carousel',
  'CarouselItem',
  'Cascader',
  'Cell',
  'Checkbox',
  'CheckboxGroup',
  'Collapse',
  'CollapsePanel',
  'CollapseTransition',
  'ColorPicker',
  'Column',
  'ConfigProvider',
  'DatePicker',
  'Divider',
  'Drawer',
  'Dropdown',
  'DropdownItem',
  'DropdownList',
  'Ellipsis',
  'Form',
  'FormItem',
  'FormReset',
  'FormSubmit',
  'FullScreen',
  'Grid',
  'Highlight',
  'Icon',
  'Image',
  'ImageGroup',
  'ImageViewer',
  'Input',
  'Layout',
  'LayoutAside',
  'LayoutFooter',
  'LayoutHeader',
  'Linker',
  'Masker',
  'Menu',
  'MenuGroup',
  'MenuItem',
  'Modal',
  'NativeScroll',
  'NumberInput',
  'Option',
  'OptionGroup',
  'Overflow',
  'Pagination',
  'Popper',
  'Popup',
  'Portal',
  'Progress',
  'Radio',
  'RadioGroup',
  'Renderer',
  'ResizeObserver',
  'Result',
  'Row',
  'Scroll',
  'Scrollbar',
  'Select',
  'Skeleton',
  'SkeletonGroup',
  'Slider',
  'Space',
  'Spin',
  'Split',
  'Switch',
  'TabNav',
  'TabNavItem',
  'TabPanel',
  'Table',
  'TableColumn',
  'Tabs',
  'Tag',
  'Textarea',
  'TimeAgo',
  'TimePicker',
  'Timeline',
  'TimelineItem',
  'Tooltip',
  'Transfer',
  'Tree',
  'Upload',
  'UploadFile',
  'UploadList',
  'Viewer',
  'VirtualList',
  'Wheel',
  'Title',
  'Text',
  'Blockquote',
  'OL',
  'UL',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'P',
  'Strong'
]

const prefixKey = 'vexip-docs-prefer-demo-prefix'
const prefix = ref(isClient ? localStorage.getItem(prefixKey) || '' : '')

const templateRE = /<template>[\s\S]*<\/template>/
const replaceRE = new RegExp(`(${components.join('|')})`, 'g')

export function getDemoPrefix() {
  return prefix.value
}

export function setDemoPrefix(value: string) {
  prefix.value = value
  isClient && localStorage.setItem(prefixKey, prefix.value)
}

export function transformDemoCode(code: string) {
  return code.replace(templateRE, s => s.replace(replaceRE, `${toCapitalCase(prefix.value)}$1`))
}
