import { defineI18n } from './helper'

export const zhCN = defineI18n({
  common: {
    language: '中文',
    makeInterest: '创造有趣的开发体验',
    slogan: '高度可定制化，全量 TypeScript，性能很不错',
    getStarted: '开始使用',
    getComponents: '浏览组件',
    changePrefix: '换个组件名前缀',
    apply: '应用',
    prefixChanged: '组件名前缀修改成功',
    invalidPrefix: '前缀必须以字母开头，只包含字母和数字',
    changeColor: '换个主题色',
    rollColor: '随机一个颜色，可能很奇怪',
    resetColor: '重置主题色',
    guides: '指南',
    components: '组件',
    playground: '游乐场',
    searchComponent: '在 Vexip UI 中搜索组件',
    copyCode: '复制代码',
    copySuccess: '复制成功',
    copyFail: '复制失败',
    showCode: '展开代码',
    hideCode: '收起代码',
    editOnGithub: '在 GitHub 上编辑',
    editOnPlayground: '在 Playground 上编辑',
    editPage: '在 GitHub 上编辑此页',
    pageNotFound: '页面不见了',
    backHomepage: '返回首页',
    lastUpdated: '上次更新',
    contributors: '贡献者',
    thanksContribute: '感谢他们的所做的一切贡献！'
  },
  alert: {
    info: '提示',
    warning: '注意',
    error: '警告'
  },
  guide: {
    introduction: '介绍',
    vexipui: '欢迎来到 Vexip UI',
    gettingStarted: '快速上手',
    nameOrigin: '为什么叫 Vexip？',
    logoOrigin: 'Logo 的由来',
    further: '更进一步',
    globalConfig: '全局配置',
    styleConfig: '样式配置',
    i18n: '国际化',
    ssr: '服务端渲染',
    customFormControl: '自定义表单控件',
    developmentGuide: '开发指南'
  },
  group: {
    basis: '基础',
    layout: '布局',
    navigation: '导航',
    form: '表单',
    data: '数据',
    effect: '反应',
    else: '其他'
  },
  footer: {
    resources: '资源',
    lintConfigSet: 'Lint 配置集',
    createProject: '创建 Vexip 项目',
    gridLayout: 'Vue3 栅格布局',
    hooksLib: 'Vue3 Hooks 库',
    logoDesign: 'Logo 设计',
    help: '帮助',
    changelog: '更新日志',
    issue: '议题',
    contribute: '参与贡献',
    qqGroup: '技术支持 Q 群',
    sponsor: '赞助一杯喜茶'
  },
  component: {
    // Basis
    Button: '按钮',
    Icon: '图标',
    Linker: '链接',
    Typography: '排版',

    // Layout
    Grid: '栅格布局',
    Divider: '分割线',
    Layout: '布局',
    NativeScroll: '原生滚动',
    Row: '行布局',
    Scroll: '滚动',
    Space: '间距',
    Split: '分割面板',

    // Navigation
    Anchor: '锚点',
    Breadcrumb: '面包屑',
    Dropdown: '下拉菜单',
    Menu: '导航菜单',
    Pagination: '分页器',

    // Form
    AutoComplete: '自动完成',
    Cascader: '联级选择器',
    Checkbox: '多选框',
    ColorPicker: '颜色选择器',
    DatePicker: '日期选择器',
    Form: '表单',
    FullScreen: '全屏',
    Input: '输入框',
    NumberInput: '数字输入框',
    Radio: '单选框',
    Result: '结果',
    Select: '选择器',
    Slider: '滑动输入条',
    Switch: '开关',
    Textarea: '多行输入框',
    TimePicker: '时间选择器',
    Transfer: '穿梭框',
    Upload: '上传',
    Wheel: '滚轮',

    // Data
    Avatar: '头像',
    Badge: '徽标',
    Bubble: '气泡框',
    Calendar: '日历',
    Card: '卡片',
    Carousel: '轮播',
    Collapse: '折叠面板',
    Ellipsis: '省略',
    Highlight: '高亮',
    Image: '图片',
    Table: '表格',
    TabNav: '标签导航',
    Tabs: '标签页',
    Tag: '标签',
    TimeAgo: '相对时间',
    Timeline: '时间线',
    Tooltip: '提示',
    Tree: '树形列表',
    Viewer: '查看器',

    // Effect
    Alert: '警告提示',
    Confirm: '确认框',
    Contextmenu: '右键菜单',
    Drawer: '抽屉',
    Loading: '加载',
    Message: '消息提示',
    Modal: '模态框',
    Notice: '通知提醒',
    Progress: '进度条',
    Skeleton: '骨架屏',
    Spin: '加载中',
    Toast: '吐司提示',

    // Else
    Affix: '固钉',
    ConfigProvider: '配置注入',
    Masker: '遮罩',
    Overflow: '溢出',
    Renderer: '渲染器',
    ResizeObserver: '缩放观察',
    Scrollbar: '滚动条',
    VirtualList: '虚拟列表'
  }
})
