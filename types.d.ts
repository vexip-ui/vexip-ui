declare module 'vue' {
  export interface GlobalComponents {
    Alert: typeof import('vexip-ui')['Alert'],
    Anchor: typeof import('vexip-ui')['Anchor'],
    AnchorLink: typeof import('vexip-ui')['AnchorLink'],
    AutoComplete: typeof import('vexip-ui')['AutoComplete'],
    Avatar: typeof import('vexip-ui')['Avatar'],
    AvatarGroup: typeof import('vexip-ui')['AvatarGroup'],
    Badge: typeof import('vexip-ui')['Badge'],
    Breadcrumb: typeof import('vexip-ui')['Breadcrumb'],
    BreadcrumbItem: typeof import('vexip-ui')['BreadcrumbItem'],
    Bubble: typeof import('vexip-ui')['Bubble'],
    Button: typeof import('vexip-ui')['Button'],
    ButtonGroup: typeof import('vexip-ui')['ButtonGroup'],
    Calendar: typeof import('vexip-ui')['Calendar'],
    CalendarPanel: typeof import('vexip-ui')['CalendarPanel'],
    Card: typeof import('vexip-ui')['Card'],
    Carousel: typeof import('vexip-ui')['Carousel'],
    CarouselItem: typeof import('vexip-ui')['CarouselItem'],
    Cascader: typeof import('vexip-ui')['Cascader'],
    Cell: typeof import('vexip-ui')['Cell'],
    Checkbox: typeof import('vexip-ui')['Checkbox'],
    CheckboxGroup: typeof import('vexip-ui')['CheckboxGroup'],
    Collapse: typeof import('vexip-ui')['Collapse'],
    CollapsePanel: typeof import('vexip-ui')['CollapsePanel'],
    CollapseTransition: typeof import('vexip-ui')['CollapseTransition'],
    ColorPicker: typeof import('vexip-ui')['ColorPicker'],
    Column: typeof import('vexip-ui')['Column'],
    ConfigProvider: typeof import('vexip-ui')['ConfigProvider'],
    DatePicker: typeof import('vexip-ui')['DatePicker'],
    Divider: typeof import('vexip-ui')['Divider'],
    Drawer: typeof import('vexip-ui')['Drawer'],
    Dropdown: typeof import('vexip-ui')['Dropdown'],
    DropdownItem: typeof import('vexip-ui')['DropdownItem'],
    DropdownList: typeof import('vexip-ui')['DropdownList'],
    Ellipsis: typeof import('vexip-ui')['Ellipsis'],
    Form: typeof import('vexip-ui')['Form'],
    FormItem: typeof import('vexip-ui')['FormItem'],
    FormReset: typeof import('vexip-ui')['FormReset'],
    FormSubmit: typeof import('vexip-ui')['FormSubmit'],
    Grid: typeof import('vexip-ui')['Grid'],
    Highlight: typeof import('vexip-ui')['Highlight'],
    Icon: typeof import('vexip-ui')['Icon'],
    Input: typeof import('vexip-ui')['Input'],
    Layout: typeof import('vexip-ui')['Layout'],
    LayoutAside: typeof import('vexip-ui')['LayoutAside'],
    LayoutFooter: typeof import('vexip-ui')['LayoutFooter'],
    LayoutHeader: typeof import('vexip-ui')['LayoutHeader'],
    Linker: typeof import('vexip-ui')['Linker'],
    Masker: typeof import('vexip-ui')['Masker'],
    Menu: typeof import('vexip-ui')['Menu'],
    MenuGroup: typeof import('vexip-ui')['MenuGroup'],
    MenuItem: typeof import('vexip-ui')['MenuItem'],
    Modal: typeof import('vexip-ui')['Modal'],
    NativeScroll: typeof import('vexip-ui')['NativeScroll'],
    NumberInput: typeof import('vexip-ui')['NumberInput'],
    Option: typeof import('vexip-ui')['Option'],
    OptionGroup: typeof import('vexip-ui')['OptionGroup'],
    Overflow: typeof import('vexip-ui')['Overflow'],
    Pagination: typeof import('vexip-ui')['Pagination'],
    Popup: typeof import('vexip-ui')['Popup'],
    Portal: typeof import('vexip-ui')['Portal'],
    Progress: typeof import('vexip-ui')['Progress'],
    Radio: typeof import('vexip-ui')['Radio'],
    RadioGroup: typeof import('vexip-ui')['RadioGroup'],
    Renderer: typeof import('vexip-ui')['Renderer'],
    ResizeObserver: typeof import('vexip-ui')['ResizeObserver'],
    Row: typeof import('vexip-ui')['Row'],
    Scroll: typeof import('vexip-ui')['Scroll'],
    Scrollbar: typeof import('vexip-ui')['Scrollbar'],
    Select: typeof import('vexip-ui')['Select'],
    Skeleton: typeof import('vexip-ui')['Skeleton'],
    SkeletonGroup: typeof import('vexip-ui')['SkeletonGroup'],
    Slider: typeof import('vexip-ui')['Slider'],
    Space: typeof import('vexip-ui')['Space'],
    Spin: typeof import('vexip-ui')['Spin'],
    Split: typeof import('vexip-ui')['Split'],
    Switch: typeof import('vexip-ui')['Switch'],
    TabNav: typeof import('vexip-ui')['TabNav'],
    TabNavItem: typeof import('vexip-ui')['TabNavItem'],
    TabPanel: typeof import('vexip-ui')['TabPanel'],
    Table: typeof import('vexip-ui')['Table'],
    TableColumn: typeof import('vexip-ui')['TableColumn'],
    Tabs: typeof import('vexip-ui')['Tabs'],
    Tag: typeof import('vexip-ui')['Tag'],
    Textarea: typeof import('vexip-ui')['Textarea'],
    TimeAgo: typeof import('vexip-ui')['TimeAgo'],
    TimePicker: typeof import('vexip-ui')['TimePicker'],
    Timeline: typeof import('vexip-ui')['Timeline'],
    TimelineItem: typeof import('vexip-ui')['TimelineItem'],
    Tooltip: typeof import('vexip-ui')['Tooltip'],
    Transfer: typeof import('vexip-ui')['Transfer'],
    Tree: typeof import('vexip-ui')['Tree'],
    Upload: typeof import('vexip-ui')['Upload'],
    UploadFile: typeof import('vexip-ui')['UploadFile'],
    UploadList: typeof import('vexip-ui')['UploadList'],
    Viewer: typeof import('vexip-ui')['Viewer'],
    VirtualList: typeof import('vexip-ui')['VirtualList'],
    Wheel: typeof import('vexip-ui')['Wheel']
  }

  interface ComponentCustomProperties {
    $confirm: typeof import('vexip-ui')['Confirm'],
    $contextmenu: typeof import('vexip-ui')['Contextmenu'],
    $loading: typeof import('vexip-ui')['Loading'],
    $message: typeof import('vexip-ui')['Message'],
    $notice: typeof import('vexip-ui')['Notice'],
    $toast: typeof import('vexip-ui')['Toast']
  }
}

export {}
