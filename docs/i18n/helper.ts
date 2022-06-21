export interface I18nConfig {
  common: {
    language: string,
    makeInterest: string,
    slogan: string,
    getStarted: string,
    guides: string,
    components: string,
    playground: string,
    searchComponent: string,
    copyCode: string,
    showCode: string,
    hideCode: string,
    editInGithub: string,
    editInPlayground: string
  },
  alert: {
    info: string,
    warning: string,
    error: string
  },
  guides: {
    introduction: string,
    gettingStart: string,
    globalConfig: string,
    styleConfig: string
  },
  group: {
    basis: string,
    layout: string,
    navigation: string,
    form: string,
    data: string,
    effect: string,
    else: string
  },
  components: {
    Button: string,
    Icon: string,
    Linker: string,

    Grid: string,
    Divider: string,
    Row: string,
    Space: string,
    Split: string,

    Anchor: string,
    Breadcrumb: string,
    Dropdown: string,
    Menu: string,
    Pagination: string,

    AutoComplete: string,
    Cascader: string,
    Checkbox: string,
    ColorPicker: string,
    DatePicker: string,
    Form: string,
    Input: string,
    NumberInput: string,
    Radio: string,
    Select: string,
    Slider: string,
    Switch: string,
    Textarea: string,
    TimePicker: string,
    Upload: string,
    Wheel: string,

    Avatar: string,
    Badge: string,
    Bubble: string,
    Calendar: string,
    Card: string,
    Carousel: string,
    Collapse: string,
    Ellipsis: string,
    Highlight: string,
    Table: string,
    TabNav: string,
    Tabs: string,
    Tag: string,
    TimeAgo: string,
    Timeline: string,
    Tooltip: string,
    Tree: string,

    Alert: string,
    Confirm: string,
    Contextmenu: string,
    Drawer: string,
    Loading: string,
    Message: string,
    Modal: string,
    Notice: string,
    Progress: string,
    Skeleton: string,
    Spin: string,

    ConfigProvider: string,
    Masker: string,
    NativeScroll: string,
    ResizeObserver: string,
    Scroll: string,
    Scrollbar: string,
    VirtualList: string
  }
}

export function defineI18n(config: I18nConfig) {
  return config
}
