import { install as installDirectives } from '@/directives'

import { Affix } from './affix'
import { Alert } from './alert'
import { Anchor } from './anchor'
import { AnchorLink } from './anchor-link'
import { AutoComplete } from './auto-complete'
import { Avatar } from './avatar'
import { AvatarGroup } from './avatar-group'
import { Badge } from './badge'
import { Breadcrumb } from './breadcrumb'
import { BreadcrumbItem } from './breadcrumb-item'
import { Bubble } from './bubble'
import { Button } from './button'
import { ButtonGroup } from './button-group'
import { Calendar } from './calendar'
import { CalendarPanel } from './calendar-panel'
import { Card } from './card'
import { Carousel } from './carousel'
import { CarouselItem } from './carousel-item'
import { Cascader } from './cascader'
import { Cell } from './cell'
import { Checkbox } from './checkbox'
import { CheckboxGroup } from './checkbox-group'
import { Collapse } from './collapse'
import { CollapsePanel } from './collapse-panel'
import { CollapseTransition } from './collapse-transition'
import { ColorPicker } from './color-picker'
import { Column } from './column'
import { ConfigProvider } from './config-provider'
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
import { FullScreen } from './full-screen'
import { Grid } from './grid'
import { Highlight } from './highlight'
import { Icon } from './icon'
import { Image } from './image'
import { ImageGroup } from './image-group'
import { ImageViewer } from './image-viewer'
import { Input } from './input'
import { Layout } from './layout'
import { LayoutAside } from './layout-aside'
import { LayoutFooter } from './layout-footer'
import { LayoutHeader } from './layout-header'
import { LayoutMain } from './layout-main'
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
import { Overflow } from './overflow'
import { Pagination } from './pagination'
import { Popper } from './popper'
import { Popup } from './popup'
import { Portal } from './portal'
import { Progress } from './progress'
import { Radio } from './radio'
import { RadioGroup } from './radio-group'
import { Renderer } from './renderer'
import { ResizeObserver } from './resize-observer'
import { Result } from './result'
import { Row } from './row'
import { Scroll } from './scroll'
import { Scrollbar } from './scrollbar'
import { Select } from './select'
import { Skeleton } from './skeleton'
import { SkeletonGroup } from './skeleton-group'
import { Slider } from './slider'
import { Space } from './space'
import { Spin } from './spin'
import { Split } from './split'
import { Switch } from './switch'
import { TabNav } from './tab-nav'
import { TabNavItem } from './tab-nav-item'
import { TabPanel } from './tab-panel'
import { Table } from './table'
import { TableColumn } from './table-column'
import { TableSummary } from './table-summary'
import { Tabs } from './tabs'
import { Tag } from './tag'
import { Textarea } from './textarea'
import { TimeAgo } from './time-ago'
import { TimePicker } from './time-picker'
import { Timeline } from './timeline'
import { TimelineItem } from './timeline-item'
import { Toast } from './toast'
import { Tooltip } from './tooltip'
import { Transfer } from './transfer'
import { Tree } from './tree'
import { Upload } from './upload'
import { UploadFile } from './upload-file'
import { UploadList } from './upload-list'
import { Viewer } from './viewer'
import { VirtualList } from './virtual-list'
import { Wheel } from './wheel'

import { Blockquote, H1, H2, H3, H4, H5, H6, OL, P, Strong, Text, Title, UL } from './typography'

import { buildInstall } from './create'

export { version } from './version'
export * from './create'

export type { PropsOptions } from './props'

const components = [
  Affix,
  Alert,
  Anchor,
  AnchorLink,
  AutoComplete,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Bubble,
  Button,
  ButtonGroup,
  Calendar,
  CalendarPanel,
  Card,
  Carousel,
  CarouselItem,
  Cascader,
  Cell,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapsePanel,
  CollapseTransition,
  ColorPicker,
  Column,
  ConfigProvider,
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
  FullScreen,
  Grid,
  Highlight,
  Icon,
  Image,
  ImageGroup,
  ImageViewer,
  Input,
  Layout,
  LayoutAside,
  LayoutFooter,
  LayoutHeader,
  LayoutMain,
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
  Overflow,
  Pagination,
  Popper,
  Popup,
  Portal,
  Progress,
  Radio,
  RadioGroup,
  Renderer,
  ResizeObserver,
  Result,
  Row,
  Scroll,
  Scrollbar,
  Select,
  Skeleton,
  SkeletonGroup,
  Slider,
  Space,
  Spin,
  Split,
  Switch,
  TabNav,
  TabNavItem,
  TabPanel,
  Table,
  TableColumn,
  TableSummary,
  Tabs,
  Tag,
  Textarea,
  TimeAgo,
  TimePicker,
  Timeline,
  TimelineItem,
  Tooltip,
  Transfer,
  Tree,
  Upload,
  UploadFile,
  UploadList,
  Viewer,
  VirtualList,
  Wheel,
  // plugins
  Confirm,
  Contextmenu,
  Loading,
  Message,
  Notice,
  Toast,
  // typography
  Title,
  Text,
  Blockquote,
  OL,
  UL,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
  Strong,
  // directives
  installDirectives
]

export const install = buildInstall(components)

export * from './affix'
export * from './alert'
export * from './anchor'
export * from './anchor-link'
export * from './auto-complete'
export * from './avatar'
export * from './avatar-group'
export * from './badge'
export * from './breadcrumb'
export * from './breadcrumb-item'
export * from './bubble'
export * from './button'
export * from './button-group'
export * from './calendar'
export * from './calendar-panel'
export * from './card'
export * from './carousel'
export * from './carousel-item'
export * from './cascader'
export * from './cell'
export * from './checkbox'
export * from './checkbox-group'
export * from './collapse'
export * from './collapse-panel'
export * from './collapse-transition'
export * from './color-picker'
export * from './column'
export * from './config-provider'
export * from './confirm'
export * from './contextmenu'
export * from './date-picker'
export * from './divider'
export * from './drawer'
export * from './dropdown'
export * from './dropdown-item'
export * from './dropdown-list'
export * from './ellipsis'
export * from './form'
export * from './form-item'
export * from './form-reset'
export * from './form-submit'
export * from './full-screen'
export * from './grid'
export * from './highlight'
export * from './icon'
export * from './image'
export * from './image-group'
export * from './image-viewer'
export * from './input'
export * from './layout'
export * from './layout-aside'
export * from './layout-footer'
export * from './layout-header'
export * from './layout-main'
export * from './linker'
export * from './loading'
export * from './masker'
export * from './menu'
export * from './menu-group'
export * from './menu-item'
export * from './message'
export * from './modal'
export * from './native-scroll'
export * from './notice'
export * from './number-input'
export * from './option'
export * from './option-group'
export * from './overflow'
export * from './pagination'
export * from './popper'
export * from './popup'
export * from './portal'
export * from './progress'
export * from './radio'
export * from './radio-group'
export * from './renderer'
export * from './resize-observer'
export * from './result'
export * from './row'
export * from './scroll'
export * from './scrollbar'
export * from './select'
export * from './skeleton'
export * from './skeleton-group'
export * from './slider'
export * from './space'
export * from './spin'
export * from './split'
export * from './switch'
export * from './tab-nav'
export * from './tab-nav-item'
export * from './tab-panel'
export * from './table'
export * from './table-column'
export * from './table-summary'
export * from './tabs'
export * from './tag'
export * from './textarea'
export * from './time-ago'
export * from './time-picker'
export * from './timeline'
export * from './timeline-item'
export * from './toast'
export * from './tooltip'
export * from './transfer'
export * from './tree'
export * from './typography'
export * from './upload'
export * from './upload-file'
export * from './upload-list'
export * from './viewer'
export * from './virtual-list'
export * from './wheel'

export * from '@/directives/loading'
