import type { AlertCProps } from './alert'
import type { AnchorCProps } from './anchor'
import type { AutoCompleteCProps } from './auto-complete'
import type { AvatarCProps } from './avatar'
import type { AvatarGroupCProps } from './avatar-group'
import type { BadgeCProps } from './badge'
import type { BreadcrumbCProps } from './breadcrumb'
import type { BubbleCProps } from './bubble'
import type { ButtonCProps } from './button'
import type { ButtonGroupCProps } from './button-group'
import type { CalendarCProps } from './calendar'
import type { CalendarPanelCProps } from './calendar-panel'
import type { CardCProps } from './card'
import type { CarouselCProps } from './carousel'
import type { CascaderCProps } from './cascader'
import type { CellCProps } from './cell'
import type { CheckboxCProps } from './checkbox'
import type { CheckboxGroupCProps } from './checkbox-group'
import type { CollapseCProps } from './collapse'
import type { CollapsePanelCProps } from './collapse-panel'
import type { CollapseTransitionCProps } from './collapse-transition'
import type { ColumnCProps } from './column'
import type { ConfirmCProps } from './confirm'
import type { DatePickerCProps } from './date-picker'
import type { DividerCProps } from './divider'
import type { DrawerCProps } from './drawer'
import type { DropdownCProps } from './dropdown'
import type { EllipsisCProps } from './ellipsis'
import type { FormCProps } from './form'
import type { FormItemCProps } from './form-item'
import type { FormResetCProps } from './form-reset'
import type { FormSubmitCProps } from './form-submit'
import type { GridCProps } from './grid'
import type { HighlightCProps } from './highlight'
import type { IconCProps } from './icon'
import type { ImageCProps } from './image'
import type { ImageGroupCProps } from './image-group'
import type { ImageViewerCProps } from './image-viewer'
import type { InputCProps } from './input'
import type { LayoutCProps } from './layout'
import type { LayoutAsideCProps } from './layout-aside'
import type { LayoutFooterCProps } from './layout-footer'
import type { LayoutHeaderCProps } from './layout-header'
import type { LayoutMainCProps } from './layout-main'
import type { LinkerCProps } from './linker'
import type { MaskerCProps } from './masker'
import type { MenuCProps } from './menu'
import type { MenuItemCProps } from './menu-item'
import type { ModalCProps } from './modal'
import type { NativeScrollCProps } from './native-scroll'
import type { NumberInputCProps } from './number-input'
import type { OverflowCProps } from './overflow'
import type { PaginationCProps } from './pagination'
import type { PopperCProps } from './popper'
import type { ProgressCProps } from './progress'
import type { RadioCProps } from './radio'
import type { RadioGroupCProps } from './radio-group'
import type { ResizeObserverCProps } from './resize-observer'
import type { ResultCProps } from './result'
import type { RowCProps } from './row'
import type { ScrollCProps } from './scroll'
import type { ScrollbarCProps } from './scrollbar'
import type { SelectCProps } from './select'
import type { SkeletonCProps } from './skeleton'
import type { SkeletonGroupCProps } from './skeleton-group'
import type { SliderCProps } from './slider'
import type { SpaceCProps } from './space'
import type { SpinCProps } from './spin'
import type { SplitCProps } from './split'
import type { SwitchCProps } from './switch'
import type { TabNavCProps } from './tab-nav'
import type { TableCProps } from './table'
import type { TableColumnCProps } from './table-column'
import type { TabsCProps } from './tabs'
import type { TagCProps } from './tag'
import type { TextareaCProps } from './textarea'
import type { TimeAgoCProps } from './time-ago'
import type { TimePickerCProps } from './time-picker'
import type { TimelineCProps } from './timeline'
import type { TimelineItemCProps } from './timeline-item'
import type { ToastCProps } from './toast'
import type { TooltipCProps } from './tooltip'
import type { TransferCProps } from './transfer'
import type { TreeCProps } from './tree'
import type { UploadCProps } from './upload'
import type { UploadFileCProps } from './upload-file'
import type { UploadListCProps } from './upload-list'
import type { ViewerCProps } from './viewer'
import type { VirtualListCProps } from './virtual-list'
import type { WheelCProps } from './wheel'
import type {
  TitleCProps,
  TextCProps,
  BlockquoteCProps,
  OLCProps,
  ULCProps,
  H1CProps,
  H2CProps,
  H3CProps,
  H4CProps,
  H5CProps,
  H6CProps,
  PCProps,
  StrongCProps
} from './typography'

export interface PropsOptions {
  default?: Record<string, any>,
  alert?: AlertCProps,
  anchor?: AnchorCProps,
  autoComplete?: AutoCompleteCProps,
  avatar?: AvatarCProps,
  avatarGroup?: AvatarGroupCProps,
  badge?: BadgeCProps,
  breadcrumb?: BreadcrumbCProps,
  bubble?: BubbleCProps,
  button?: ButtonCProps,
  buttonGroup?: ButtonGroupCProps,
  calendar?: CalendarCProps,
  calendarPanel?: CalendarPanelCProps,
  card?: CardCProps,
  carousel?: CarouselCProps,
  cascader?: CascaderCProps,
  cell?: CellCProps,
  checkbox?: CheckboxCProps,
  checkboxGroup?: CheckboxGroupCProps,
  collapse?: CollapseCProps,
  collapsePanel?: CollapsePanelCProps,
  collapseTransition?: CollapseTransitionCProps,
  column?: ColumnCProps,
  confirm?: ConfirmCProps,
  datePicker?: DatePickerCProps,
  divider?: DividerCProps,
  drawer?: DrawerCProps,
  dropdown?: DropdownCProps,
  ellipsis?: EllipsisCProps,
  form?: FormCProps,
  formItem?: FormItemCProps,
  formReset?: FormResetCProps,
  formSubmit?: FormSubmitCProps,
  grid?: GridCProps,
  highlight?: HighlightCProps,
  icon?: IconCProps,
  image?: ImageCProps,
  imageGroup?: ImageGroupCProps,
  imageViewer?: ImageViewerCProps,
  input?: InputCProps,
  layout?: LayoutCProps,
  layoutAside?: LayoutAsideCProps,
  layoutFooter?: LayoutFooterCProps,
  layoutHeader?: LayoutHeaderCProps,
  layoutMain?: LayoutMainCProps,
  linker?: LinkerCProps,
  masker?: MaskerCProps,
  menu?: MenuCProps,
  menuItem?: MenuItemCProps,
  modal?: ModalCProps,
  nativeScroll?: NativeScrollCProps,
  numberInput?: NumberInputCProps,
  overflow?: OverflowCProps,
  pagination?: PaginationCProps,
  popper?: PopperCProps,
  progress?: ProgressCProps,
  radio?: RadioCProps,
  radioGroup?: RadioGroupCProps,
  resizeObserver?: ResizeObserverCProps,
  result?: ResultCProps,
  row?: RowCProps,
  scroll?: ScrollCProps,
  scrollbar?: ScrollbarCProps,
  select?: SelectCProps,
  skeleton?: SkeletonCProps,
  skeletonGroup?: SkeletonGroupCProps,
  slider?: SliderCProps,
  space?: SpaceCProps,
  spin?: SpinCProps,
  split?: SplitCProps,
  switch?: SwitchCProps,
  tabNav?: TabNavCProps,
  table?: TableCProps,
  tableColumn?: TableColumnCProps,
  tabs?: TabsCProps,
  tag?: TagCProps,
  textarea?: TextareaCProps,
  timeAgo?: TimeAgoCProps,
  timePicker?: TimePickerCProps,
  timeline?: TimelineCProps,
  timelineItem?: TimelineItemCProps,
  toast?: ToastCProps,
  tooltip?: TooltipCProps,
  transfer?: TransferCProps,
  tree?: TreeCProps,
  upload?: UploadCProps,
  uploadFile?: UploadFileCProps,
  uploadList?: UploadListCProps,
  viewer?: ViewerCProps,
  virtualList?: VirtualListCProps,
  wheel?: WheelCProps,
  title?: TitleCProps,
  text?: TextCProps,
  blockquote?: BlockquoteCProps,
  ol?: OLCProps,
  ul?: ULCProps,
  h1?: H1CProps,
  h2?: H2CProps,
  h3?: H3CProps,
  h4?: H4CProps,
  h5?: H5CProps,
  h6?: H6CProps,
  p?: PCProps,
  strong?: StrongCProps
}
