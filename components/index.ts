import '@/themes/common.scss'

import { Alert } from '@/components/alert'
import { Anchor } from '@/components/anchor'
import { AnchorLink } from '@/components/anchor-link'
import { AutoComplete } from '@/components/auto-complete'
import { Badge } from '@/components/badge'
import { Breadcrumb } from '@/components/breadcrumb'
import { BreadcrumbItem } from '@/components/breadcrumb-item'
import { Bubble } from '@/components/bubble'
import { Button } from '@/components/button'
import { ButtonGroup } from '@/components/button-group'
import { Calendar } from '@/components/calendar'
import { CalendarPane } from '@/components/calendar-pane'
import { Card } from '@/components/card'
import { Carousel } from '@/components/carousel'
import { CarouselItem } from '@/components/carousel-item'
import { Checkbox } from '@/components/checkbox'
import { CheckboxGroup } from '@/components/checkbox-group'
import { Collapse } from '@/components/collapse'
import { CollapsePane } from '@/components/collapse-pane'
import { CollapseTransition } from '@/components/collapse-transition'
import { ColorPicker } from '@/components/color-picker'
import { Column } from '@/components/column'
import { Confirm } from '@/components/confirm'
import { Contextmenu } from '@/components/contextmenu'
import { DatePicker } from '@/components/date-picker'
import { Divider } from '@/components/divider'
import { Drawer } from '@/components/drawer'
import { Dropdown } from '@/components/dropdown'
import { DropdownItem } from '@/components/dropdown-item'
import { DropdownList } from '@/components/dropdown-list'
import { Ellipsis } from '@/components/ellipsis'
import { Form } from '@/components/form'
import { FormItem } from '@/components/form-item'
import { FormReset } from '@/components/form-reset'
import { FormSubmit } from '@/components/form-submit'
import { Highlight } from '@/components/highlight'
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import { Linker } from '@/components/linker'
import { Loading } from '@/components/loading'
import { Masker } from '@/components/masker'
import { Menu } from '@/components/menu'
import { MenuGroup } from '@/components/menu-group'
import { MenuItem } from '@/components/menu-item'
import { Message } from '@/components/message'
import { Modal } from '@/components/modal'
import { NativeScroll } from '@/components/native-scroll'
import { Notice } from '@/components/notice'
import { NumberInput } from '@/components/number-input'
import { Option } from '@/components/option'
import { OptionGroup } from '@/components/option-group'
import { Pagination } from '@/components/pagination'
import { Popup } from '@/components/popup'
import { Portal } from '@/components/portal'
import { Progress } from '@/components/progress'
import { Radio } from '@/components/radio'
import { RadioGroup } from '@/components/radio-group'
import { Renderer } from '@/components/renderer'
import { Row } from '@/components/row'
import { Scroll } from '@/components/scroll'
import { Scrollbar } from '@/components/scrollbar'
import { Select } from '@/components/select'
import { Slider } from '@/components/slider'
import { Spin } from '@/components/spin'
import { Split } from '@/components/split'
import { Switcher } from '@/components/switcher'
import { TabNav } from '@/components/tab-nav'
import { TabNavItem } from '@/components/tab-nav-item'
import { TabPane } from '@/components/tab-pane'
import { Table } from '@/components/table'
import { TableColumn } from '@/components/table-column'
import { Tabs } from '@/components/tabs'
import { Tag } from '@/components/tag'
import { Textarea } from '@/components/textarea'
import { TimeAgo } from '@/components/time-ago'
import { TimePicker } from '@/components/time-picker'
import { Timeline } from '@/components/timeline'
import { TimelineItem } from '@/components/timeline-item'
import { Tooltip } from '@/components/tooltip'
import { Tree } from '@/components/tree'
import { Upload } from '@/components/upload'
import { Wheel } from '@/components/wheel'
import { WheelItem } from '@/components/wheel-item'

import { configProp } from '@/common/config/install'
import { configLocale } from '@/common/config/locale'

import '@/common/icons'

import type { App } from 'vue'
import type { PropOptions } from '@/common/config/install'
import type { LocaleOptions } from '@/common/config/locale'

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
  Wheel,
  WheelItem
]

const plugins = [Confirm, Contextmenu, Loading, Message, Notice]

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
  Notice,
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
