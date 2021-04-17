import _Vue from 'vue'

import Alert from '../components/alert'
import Anchor from '../components/anchor'
import AnchorLink from '../components/anchor-link'
import AutoComplete from '../components/auto-complete'
import Badge from '../components/badge'
import Breadcrumb from '../components/breadcrumb'
import BreadcrumbItem from '../components/breadcrumb-item'
import Bubble from '../components/bubble'
import Button from '../components/button'
import ButtonGroup from '../components/button-group'
import Calendar from '../components/calendar'
import Card from '../components/card'
import Carousel from '../components/carousel'
import CarouselItem from '../components/carousel-item'
import Checkbox from '../components/checkbox'
import CheckboxGroup from '../components/checkbox-group'
import Collapse from '../components/collapse'
import CollapsePane from '../components/collapse-pane'
import CollapseTransition from '../components/collapse-transition'
import ColorPicker from '../components/color-picker'
import DatePicker from '../components/date-picker'
import Divider from '../components/divider'
import Drawer from '../components/drawer'
import Dropdown from '../components/dropdown'
import DropdownList from '../components/dropdown-list'
import DropdownItem from '../components/dropdown-item'
import Form from '../components/form'
import FormItem from '../components/form-item'
import Icon from '../components/icon'
import Input from '../components/input'
import Linker from '../components/linker'
import Masker from '../components/masker'
import Menu from '../components/menu'
import MenuGroup from '../components/menu-group'
import MenuItem from '../components/menu-item'
import Modal from '../components/modal'
import MultipleInput from '../components/multiple-input'
import NumberInput from '../components/number-input'
import Option from '../components/option'
import OptionGroup from '../components/option-group'
import Pagination from '../components/pagination'
import Picture from '../components/picture'
import PictureViewer from '../components/picture-viewer'
import Popup from '../components/popup'
import Progress from '../components/progress'
import Radio from '../components/radio'
import RadioGroup from '../components/radio-group'
import Scroll from '../components/scroll'
import Select from '../components/select'
import Slider from '../components/slider'
import Split from '../components/split'
import Stack from '../components/stack'
import StackItem from '../components/stack-item'
import Switcher from '../components/switcher'
import Table from '../components/table'
import TableColumn from '../components/table-column'
import TabNav from '../components/tab-nav'
import TabNavItem from '../components/tab-nav-item'
import Tabs from '../components/tabs'
import TabPane from '../components/tab-pane'
import Tag from '../components/tag'
import Textarea from '../components/textarea'
import TimePicker from '../components/time-picker'
import Timeline from '../components/timeline'
import TimelineItem from '../components/timeline-item'
import Tooltip from '../components/tooltip'
import Tree from '../components/tree'
import Upload from '../components/upload'
import Wheel from '../components/wheel'
import WheelItem from '../components/wheel-item'

// manager
import Confirm from '../components/confirm'
import Message from '../components/message'
import Notice from '../components/notice'

// layout
import Column from '../components/column'
import Row from '../components/row'

// icons
import '../icons'

// utils
// import * as Util from './utils/common'
// import * as ColorUtil from './utils/color'
// import * as DateUtil from './utils/date'

import { config } from './config/properties'

import './style/index.scss'

const components = {
  // layout
  Column,
  Row,
  // common
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
  Card,
  Carousel,
  CarouselItem,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapsePane,
  CollapseTransition,
  ColorPicker,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  DropdownList,
  DropdownItem,
  Form,
  FormItem,
  Icon,
  Input,
  Linker,
  Masker,
  Menu,
  MenuGroup,
  MenuItem,
  Modal,
  MultipleInput,
  NumberInput,
  Option,
  OptionGroup,
  Pagination,
  Picture,
  PictureViewer,
  Popup,
  Progress,
  Radio,
  RadioGroup,
  Scroll,
  Select,
  Slider,
  Split,
  Stack,
  StackItem,
  Switcher,
  Table,
  TableColumn,
  TabNav,
  TabNavItem,
  Tabs,
  TabPane,
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
}

export interface InstallOptions {
  prefix?: string,
  config?: { [x: string]: any }
}

const install = (Vue: typeof _Vue, options: InstallOptions = {}) => {
  const prefix = options.prefix ? `${options.prefix}` : ''

  Object.values(components).forEach(component => {
    let name = component.name

    if (prefix && prefix.charAt(0).match(/[a-z]/)) {
      name = name.replace(/([A-Z])/g, '-$1').toLowerCase()
    }

    Vue.component(`${prefix}${name}`, component)
  })

  Vue.prototype.$confirm = Confirm
  Vue.prototype.$message = Message
  Vue.prototype.$notice = Notice

  if (options.config) {
    Object.keys(options.config).forEach(key => {
      config[key] = options.config?.[key] ?? config[key]
    })
  }

  if (prefix) {
    config.defaults.prefixCls = prefix
  }

  Vue.prototype.$vexipConfig = config
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  // utils
  // Util,
  // ColorUtil,
  // DateUtil,
  // manager
  Confirm,
  Message,
  Notice,
  // layout
  Column,
  Row,
  // components
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
  Card,
  Carousel,
  CarouselItem,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapsePane,
  CollapseTransition,
  ColorPicker,
  DatePicker,
  Divider,
  Drawer,
  Dropdown,
  DropdownList,
  DropdownItem,
  Form,
  FormItem,
  Icon,
  Input,
  Linker,
  Masker,
  Menu,
  MenuGroup,
  MenuItem,
  Modal,
  MultipleInput,
  NumberInput,
  Option,
  OptionGroup,
  Pagination,
  Picture,
  PictureViewer,
  Popup,
  Progress,
  Radio,
  RadioGroup,
  Scroll,
  Select,
  Slider,
  Split,
  Stack,
  StackItem,
  Switcher,
  Table,
  TableColumn,
  TabNav,
  TabNavItem,
  Tabs,
  TabPane,
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
}

export default {
  install,
  version: process.env.VERSION,
  // Util,
  // ColorUtil,
  // DateUtil,
  Confirm,
  Message,
  Notice,
  ...components
}
