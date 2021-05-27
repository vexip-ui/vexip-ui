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
import { CalendarPane } from '@/components/calendar-pane'
import { Card } from '@/components/card'
import { Checkbox } from '@/components/checkbox'
import { CheckboxGroup } from '@/components/checkbox-group'
import { Collapse } from '@/components/collapse'
import { CollapsePane } from '@/components/collapse-pane'
import { CollapseTransition } from '@/components/collapse-transition'
import { ColorPicker } from '@/components/color-picker'
import { Column } from '@/components/column'
import { Confirm } from '@/components/confirm'
import { DatePicker } from '@/components/date-picker'
import { Divider } from '@/components/divider'
import { Drawer } from '@/components/drawer'
import { Dropdown } from '@/components/dropdown'
import { DropdownItem } from '@/components/dropdown-item'
import { DropdownList } from '@/components/dropdown-list'
import { Form } from '@/components/form'
import { FormItem } from '@/components/form-item'
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import { Linker } from '@/components/linker'
import { Masker } from '@/components/masker'
import { Menu } from '@/components/menu'
import { Message } from '@/components/message'
import { Modal } from '@/components/modal'
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
import { Split } from '@/components/split'
import { Switcher } from '@/components/switcher'
import { TabNav } from '@/components/tab-nav'
import { TabNavItem } from '@/components/tab-nav-item'
import { Table } from '@/components/table'
import { TableColumn } from '@/components/table-column'
import { Tabs } from '@/components/tabs'
import { Tag } from '@/components/tag'
import { Textarea } from '@/components/textarea'
import { TimePicker } from '@/components/time-picker'
import { Timeline } from '@/components/timeline'
import { TimelineItem } from '@/components/timeline-item'
import { Tooltip } from '@/components/tooltip'
import { Tree } from '@/components/tree'
import { Upload } from '@/components/upload'
import { Wheel } from '@/components/wheel'
import { WheelItem } from '@/components/wheel-item'

import { config } from '@/common/config/install'
import { isObject } from '@/common/utils/common'

import '@/common/icons'

import type { App } from 'vue'
import type { InstallOptions } from '@/common/config/install'

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
  CalendarPane,
  Card,
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
  Form,
  FormItem,
  Icon,
  Input,
  Linker,
  Masker,
  Menu,
  Modal,
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
  Split,
  Switcher,
  TabNav,
  TabNavItem,
  Table,
  TableColumn,
  Tabs,
  Tag,
  Textarea,
  TimePicker,
  Timeline,
  TimelineItem,
  Tooltip,
  Tree,
  Upload,
  Wheel,
  WheelItem
]

const plugins = [Confirm, Message, Notice]

export const install = (
  app: App<unknown>,
  { prefix = '', ...options }: Partial<InstallOptions> & { prefix?: string } = {}
) => {
  config.defaults = { ...(options.defaults ?? {}) }

  Object.keys(options).forEach(key => {
    if (key !== 'defaults' && isObject(options[key])) {
      config[key] = { ...options[key] }
    }
  })

  components.forEach(component => {
    let name = component.name

    if (typeof prefix === 'string' && prefix.charAt(0).match(/[a-z]/)) {
      name = name.replace(/([A-Z])/g, '-$1').toLowerCase()
    }

    app.component(`${prefix}${name}`, component)
  })

  plugins.forEach(plugin => {
    app.use(plugin)
  })
}

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
  CalendarPane,
  Card,
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
  Form,
  FormItem,
  Icon,
  Input,
  Linker,
  Masker,
  Menu,
  Modal,
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
  Split,
  Switcher,
  TabNav,
  TabNavItem,
  Table,
  TableColumn,
  Tabs,
  Tag,
  Textarea,
  TimePicker,
  Timeline,
  TimelineItem,
  Tooltip,
  Tree,
  Upload,
  Wheel,
  WheelItem,
  Confirm,
  Message,
  Notice
}
