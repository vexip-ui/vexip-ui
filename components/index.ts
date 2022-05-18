// import '@/style/preset.scss'

import { Alert } from './alert'
import { Anchor } from './anchor'
import { AnchorLink } from './anchor-link'
import { AutoComplete } from './auto-complete'
import { Badge } from './badge'
import { Breadcrumb } from './breadcrumb'
import { BreadcrumbItem } from './breadcrumb-item'
import { Bubble } from './bubble'
import { Button } from './button'
import { ButtonGroup } from './button-group'
import { Calendar } from './calendar'
import { CalendarPane } from './calendar-pane'
import { Card } from './card'
import { Carousel } from './carousel'
import { CarouselItem } from './carousel-item'
import { Cell } from './cell'
import { Checkbox } from './checkbox'
import { CheckboxGroup } from './checkbox-group'
import { Collapse } from './collapse'
import { CollapsePane } from './collapse-pane'
import { CollapseTransition } from './collapse-transition'
import { ColorPicker } from './color-picker'
import { Column } from './column'
import { Confirm } from './confirm'
import { Contextmenu } from './contextmenu'
import { DatePicker } from './date-picker'
import { Divider } from './divider'
import { Drawer } from './drawer'
import { Dropdown } from './dropdown'
import { DropdownItem } from './dropdown-item'
import { DropdownList } from './dropdown-list'
import { Ellipsis } from './ellipsis'
import { Form } from './form'
import { FormItem } from './form-item'
import { FormReset } from './form-reset'
import { FormSubmit } from './form-submit'
import { Grid } from './grid'
import { Highlight } from './highlight'
import { Icon } from './icon'
import { Input } from './input'
import { Linker } from './linker'
import { Loading } from './loading'
import { Masker } from './masker'
import { Menu } from './menu'
import { MenuGroup } from './menu-group'
import { MenuItem } from './menu-item'
import { Message } from './message'
import { Modal } from './modal'
import { NativeScroll } from './native-scroll'
import { Notice } from './notice'
import { NumberInput } from './number-input'
import { Option } from './option'
import { OptionGroup } from './option-group'
import { Pagination } from './pagination'
import { Popup } from './popup'
import { Portal } from './portal'
import { Progress } from './progress'
import { Radio } from './radio'
import { RadioGroup } from './radio-group'
import { Renderer } from './renderer'
import { Row } from './row'
import { Scroll } from './scroll'
import { Scrollbar } from './scrollbar'
import { Select } from './select'
import { Slider } from './slider'
import { Spin } from './spin'
import { Split } from './split'
import { Switcher } from './switcher'
import { TabNav } from './tab-nav'
import { TabNavItem } from './tab-nav-item'
import { TabPane } from './tab-pane'
import { Table } from './table'
import { TableColumn } from './table-column'
import { Tabs } from './tabs'
import { Tag } from './tag'
import { Textarea } from './textarea'
import { TimeAgo } from './time-ago'
import { TimePicker } from './time-picker'
import { Timeline } from './timeline'
import { TimelineItem } from './timeline-item'
import { Tooltip } from './tooltip'
import { Tree } from './tree'
import { Upload } from './upload'
import { UploadFile } from './upload-file'
import { UploadList } from './upload-list'
import { Wheel } from './wheel'
import { WheelItem } from './wheel-item'

import { configProp, configLocale } from '@vexip-ui/config'

import '@/common/icons'

import type { App } from 'vue'
import type { PropOptions, LocaleOptions } from '@vexip-ui/config'

export { configLocale }

export interface InstallOptions {
  prefix?: string,
  prop?: Partial<PropOptions>,
  locale?: LocaleOptions
}

const components = [
  Alert,
  Anchor,
  AnchorLink,
  AutoComplete,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Bubble,
  Button,
  ButtonGroup,
  Calendar,
  CalendarPane,
  Card,
  Carousel,
  CarouselItem,
  Cell,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapsePane,
  CollapseTransition,
  ColorPicker,
  Column,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownList,
  Ellipsis,
  Form,
  FormItem,
  FormReset,
  FormSubmit,
  Grid,
  Highlight,
  Icon,
  Input,
  Linker,
  Masker,
  Menu,
  MenuGroup,
  MenuItem,
  Modal,
  NativeScroll,
  NumberInput,
  Option,
  OptionGroup,
  Pagination,
  Popup,
  Portal,
  Progress,
  Radio,
  RadioGroup,
  Renderer,
  Row,
  Scroll,
  Scrollbar,
  Select,
  Slider,
  Spin,
  Split,
  Switcher,
  TabNav,
  TabNavItem,
  TabPane,
  Table,
  TableColumn,
  Tabs,
  Tag,
  Textarea,
  TimeAgo,
  TimePicker,
  Timeline,
  TimelineItem,
  Tooltip,
  Tree,
  Upload,
  UploadFile,
  UploadList,
  Wheel,
  WheelItem
]

const plugins = [
  Confirm,
  Contextmenu,
  Loading,
  Message,
  Notice
]

export const install = (app: App<unknown>, options: InstallOptions = {}) => {
  const { prefix = '', prop = {}, locale = {} } = options

  configProp(prop)
  configLocale(locale)

  const formatName =
    typeof prefix === 'string' && prefix.charAt(0).match(/[a-z]/)
      ? (name: string) => name.replace(/([A-Z])/g, '-$1').toLowerCase()
      : (name: string) => name

  components.forEach(component => {
    app.component(`${prefix || ''}${formatName(component.name)}`, component)

    if (typeof component.installDirective === 'function') {
      component.installDirective(app)
    }
  })

  plugins.forEach(plugin => {
    app.use(plugin)
  })
}

export const version = __VERSION__

export {
  Alert,
  Anchor,
  AnchorLink,
  AutoComplete,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Bubble,
  Button,
  ButtonGroup,
  Calendar,
  CalendarPane,
  Card,
  Carousel,
  CarouselItem,
  Cell,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapsePane,
  CollapseTransition,
  ColorPicker,
  Column,
  Confirm,
  Contextmenu,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  DropdownItem,
  DropdownList,
  Ellipsis,
  Form,
  FormItem,
  FormReset,
  FormSubmit,
  Grid,
  Highlight,
  Icon,
  Input,
  Linker,
  Loading,
  Masker,
  Menu,
  MenuGroup,
  MenuItem,
  Message,
  Modal,
  NativeScroll,
  NumberInput,
  Option,
  OptionGroup,
  Pagination,
  Popup,
  Portal,
  Progress,
  Radio,
  RadioGroup,
  Renderer,
  Row,
  Scroll,
  Scrollbar,
  Select,
  Slider,
  Spin,
  Split,
  Switcher,
  TabNav,
  TabNavItem,
  TabPane,
  Table,
  TableColumn,
  Tabs,
  Tag,
  Textarea,
  TimeAgo,
  TimePicker,
  Timeline,
  TimelineItem,
  Tooltip,
  Tree,
  Upload,
  UploadFile,
  UploadList,
  Wheel,
  WheelItem
}

export interface VexipComponents {
  Alert: typeof Alert,
  Anchor: typeof Anchor,
  AnchorLink: typeof AnchorLink,
  AutoComplete: typeof AutoComplete,
  Badge: typeof Badge,
  Breadcrumb: typeof Breadcrumb,
  BreadcrumbItem: typeof BreadcrumbItem,
  Bubble: typeof Bubble,
  Button: typeof Button,
  ButtonGroup: typeof ButtonGroup,
  Calendar: typeof Calendar,
  CalendarPane: typeof CalendarPane,
  Card: typeof Card,
  Carousel: typeof Carousel,
  CarouselItem: typeof CarouselItem,
  Cell: typeof Cell,
  Checkbox: typeof Checkbox,
  CheckboxGroup: typeof CheckboxGroup,
  Collapse: typeof Collapse,
  CollapsePane: typeof CollapsePane,
  CollapseTransition: typeof CollapseTransition,
  ColorPicker: typeof ColorPicker,
  Column: typeof Column,
  DatePicker: typeof DatePicker,
  Divider: typeof Divider,
  Drawer: typeof Drawer,
  Dropdown: typeof Dropdown,
  DropdownItem: typeof DropdownItem,
  DropdownList: typeof DropdownList,
  Ellipsis: typeof Ellipsis,
  Form: typeof Form,
  FormItem: typeof FormItem,
  FormReset: typeof FormReset,
  FormSubmit: typeof FormSubmit,
  Grid: typeof Grid,
  Highlight: typeof Highlight,
  Icon: typeof Icon,
  Input: typeof Input,
  Linker: typeof Linker,
  Masker: typeof Masker,
  Menu: typeof Menu,
  MenuGroup: typeof MenuGroup,
  MenuItem: typeof MenuItem,
  Modal: typeof Modal,
  NativeScroll: typeof NativeScroll,
  NumberInput: typeof NumberInput,
  Option: typeof Option,
  OptionGroup: typeof OptionGroup,
  Pagination: typeof Pagination,
  Popup: typeof Popup,
  Portal: typeof Portal,
  Progress: typeof Progress,
  Radio: typeof Radio,
  RadioGroup: typeof RadioGroup,
  Renderer: typeof Renderer,
  Row: typeof Row,
  Scroll: typeof Scroll,
  Scrollbar: typeof Scrollbar,
  Select: typeof Select,
  Slider: typeof Slider,
  Spin: typeof Spin,
  Split: typeof Split,
  Switcher: typeof Switcher,
  TabNav: typeof TabNav,
  TabNavItem: typeof TabNavItem,
  TabPane: typeof TabPane,
  Table: typeof Table,
  TableColumn: typeof TableColumn,
  Tabs: typeof Tabs,
  Tag: typeof Tag,
  Textarea: typeof Textarea,
  TimeAgo: typeof TimeAgo,
  TimePicker: typeof TimePicker,
  Timeline: typeof Timeline,
  TimelineItem: typeof TimelineItem,
  Tooltip: typeof Tooltip,
  Tree: typeof Tree,
  Upload: typeof Upload,
  UploadFile: typeof UploadFile,
  UploadList: typeof UploadList,
  Wheel: typeof Wheel,
  WheelItem: typeof WheelItem
}

export interface VexipProperties {
  $confirm: typeof Confirm,
  $contextmenu: typeof Contextmenu,
  $loading: typeof Loading,
  $message: typeof Message,
  $notice: typeof Notice
}
