export interface ComponentConfig {
  name: string,
  cname: string,
  since?: string
}

export interface ComponentGroup {
  name: string,
  cname: string,
  components: ComponentConfig[]
}

export function getComponentConfig(): ComponentGroup[] {
  return [
    {
      name: 'basis',
      cname: '基础',
      components: [
        { name: 'Button', cname: '按钮' },
        { name: 'Icon', cname: '图标' },
        { name: 'Linker', cname: '链接' }
      ]
    },
    {
      name: 'layout',
      cname: '布局',
      components: [
        { name: 'Grid', cname: '栅格布局', since: '1.4.0' },
        { name: 'Divider', cname: '分割线' },
        { name: 'Row', cname: '行布局' },
        { name: 'Split', cname: '分割面板' }
      ]
    },
    {
      name: 'nav',
      cname: '导航',
      components: [
        { name: 'Anchor', cname: '锚点' },
        { name: 'Breadcrumb', cname: '面包屑' },
        { name: 'Dropdown', cname: '下拉菜单' },
        { name: 'Menu', cname: '导航菜单' },
        { name: 'Pagination', cname: '分页器' }
      ]
    },
    {
      name: 'form',
      cname: '表单',
      components: [
        { name: 'AutoComplete', cname: '自动完成' },
        { name: 'Checkbox', cname: '多选框' },
        { name: 'ColorPicker', cname: '颜色选择器' },
        { name: 'DatePicker', cname: '日期选择框' },
        { name: 'Form', cname: '表单' },
        { name: 'Input', cname: '输入框' },
        { name: 'NumberInput', cname: '数字输入框' },
        { name: 'Radio', cname: '单选框' },
        { name: 'Select', cname: '选择器' },
        { name: 'Slider', cname: '滑动输入条' },
        { name: 'Switcher', cname: '开关' },
        { name: 'TimePicker', cname: '时间选择框' },
        { name: 'Upload', cname: '上传' },
        { name: 'Wheel', cname: '滚轮' }
      ]
    },
    {
      name: 'data',
      cname: '数据',
      components: [
        { name: 'Badge', cname: '徽标' },
        { name: 'Bubble', cname: '气泡框' },
        { name: 'Calendar', cname: '日历', since: '1.3.0' },
        { name: 'Card', cname: '卡片' },
        { name: 'Carousel', cname: '轮播' },
        { name: 'Collapse', cname: '折叠面板' },
        { name: 'Ellipsis', cname: '省略', since: '1.1.3' },
        { name: 'Highlight', cname: '高亮', since: '1.3.1' },
        { name: 'Table', cname: '表格' },
        { name: 'TabNav', cname: '标签导航' },
        { name: 'Tabs', cname: '标签页' },
        { name: 'Tag', cname: '标签' },
        { name: 'TimeAgo', cname: '相对时间', since: '1.1.0' },
        { name: 'Timeline', cname: '时间线' },
        { name: 'Tooltip', cname: '提示' },
        { name: 'Tree', cname: '树形列表' }
      ]
    },
    {
      name: 'effect',
      cname: '反应',
      components: [
        { name: 'Alert', cname: '警告提示' },
        { name: 'Confirm', cname: '确认框' },
        { name: 'Contextmenu', cname: '右键菜单', since: '1.1.0' },
        { name: 'Drawer', cname: '抽屉' },
        { name: 'Loading', cname: '加载', since: '1.1.0' },
        { name: 'Message', cname: '消息提示' },
        { name: 'Modal', cname: '模态框' },
        { name: 'Notice', cname: '通知提醒' },
        { name: 'Progress', cname: '进度条' },
        { name: 'Spin', cname: '加载中', since: '1.3.0' }
      ]
    },
    {
      name: 'else',
      cname: '其他',
      components: [
        { name: 'Masker', cname: '遮罩' },
        { name: 'NativeScroll', cname: '原生滚动', since: '1.3.1' },
        { name: 'Scroll', cname: '滚动' },
        { name: 'Scrollbar', cname: '滚动条' }
      ]
    }
  ]
}
