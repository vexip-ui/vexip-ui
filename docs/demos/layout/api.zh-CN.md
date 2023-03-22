### 预设类型

```ts
import type { Router } from 'vue-router'
import type { IconMinorProps, MenuMarkerType, MenuGroupType } from 'vexip-ui'

type LayoutSignType = 'aside' | 'header'
type LayoutConfig = 'nav' | 'color' | 'theme'

interface LayoutMenuProps {
  accordion?: boolean,
  markerType?: MenuMarkerType,
  groupType?: MenuGroupType,
  tooltipTheme?: TooltipTheme,
  router?: Router,
  manualRoute?: boolean
}

interface LayoutHeaderAction {
  label: string,
  icon?: Record<string, any>,
  iconProps?: IconMinorProps,
  name?: string,
  disabled?: boolean,
  divided?: boolean,
  meta?: Record<string, any>
}

interface LayoutUser {
  name: string,
  email?: string,
  avatar?: string | Record<string, any>
}

interface LayoutFooterLink {
  name: string,
  subname?: string,
  icon?: Record<string, any>,
  iconProps?: IconMinorProps,
  to?: string,
  target?: string,
  children?: Array<Omit<LayoutFooterLink, 'children'>>
}
```

### Layout 属性

| 名称             | 类型                     | 说明                                                                                                        | 默认值                                                               | 始于    |
| ---------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------- |
| no-aside         | `boolean`                | 设置是否禁用边栏                                                                                            | `false`                                                              | -       |
| footer           | `boolean`                | 设置是否使用页脚                                                                                            | `false`                                                              | -       |
| tag              | `string`                 | 设置渲染的标签                                                                                              | `'section'`                                                          | -       |
| menus            | `MenuOptions[]`          | 设置菜单选项                                                                                                | `[]`                                                                 | -       |
| menu-props       | `LayoutMenuProps`        | 设置菜单属性                                                                                                | `null`                                                               | -       |
| logo             | `string`                 | 设置 Logo 图片地址                                                                                          | `''`                                                                 | -       |
| sign-name        | `string`                 | 设置标语                                                                                                    | `''`                                                                 | -       |
| config           | `LayoutConfig[]`         | 设置用户下拉面板具备的配置选项                                                                              | `['nav', 'theme', 'color']`                                          | -       |
| user             | `LayoutUser`             | 设置用户信息                                                                                                | `null`                                                               | -       |
| actions          | `LayoutHeaderAction[]`   | 设置用户下拉面板的操作选项                                                                                  | `[]`                                                                 | -       |
| reduced          | `boolean`                | 设置边栏是否为缩小状态，可以使用 `v-model` 双向绑定                                                         | `false`                                                              | -       |
| avatar-circle    | `boolean`                | 设置用户头像是否为圆形                                                                                      | `false`                                                              | -       |
| sign-type        | `'aside' \| 'header'`    | 设置标语所在的块，可以使用 `v-model` 双向绑定                                                               | `'aside'`                                                            | -       |
| header-fixed     | `boolean \| string`      | 设置头部是否固定，可以传入一个断点或媒体查询字符串，当满足该查询时才固定                                    | `'lg'`                                                               | -       |
| aside-fixed      | `boolean \| string`      | 设置边栏是否固定，可以传入一个断点或媒体查询字符串，当满足该查询时才固定                                    | `'lg'`                                                               | -       |
| copyright        | `string`                 | 设置页脚的版权信息                                                                                          | `''`                                                                 | -       |
| links            | `LayoutFooterLink[]`     | 设置页脚的链接选项                                                                                          | `[]`                                                                 | -       |
| colors           | `string[]`               | 设置主题色配置的候选值                                                                                      | `['#339af0', '#f03e3e', '#be4bdb', '#7950f2', '#1b9e44', '#f76707']` | -       |
| color            | `string`                 | 设置当前所选的主题色，可以使用 `v-model` 双向绑定                                                           | `''`                                                                 | -       |
| mini-header-sign | `boolean \| string`      | 设置头部的标语是否缩略，可以传入一个断点或媒体查询字符串，当满足该查询时才缩略                              | `lg`                                                                 | -       |
| vertical-links   | `boolean \| string`      | 设置页脚的链接是否纵向显示，可以传入一个断点或媒体查询字符串，当满足该查询时才纵向                          | `md`                                                                 | -       |
| locale           | `LocaleConfig['layout']` | 设置多语言配置                                                                                              | `null`                                                               | `2.1.0` |
| dark-mode        | `boolean`                | 手动设置当前主题模式，除了初始化时，其他时候改变时会修改 `<html>` 上相应的类名，可以使用 `v-model` 双向绑定 | `null`                                                               | `2.1.1` |

### Layout 事件

| 名称           | 说明                                       | 参数                                         | 始于    |
| -------------- | ------------------------------------------ | -------------------------------------------- | ------- |
| reduced-change | 当边栏缩小状态改变时触发，返回当前缩小状态 | `(reduced: boolean)`                         | -       |
| sign-click     | 当标语被点击时触发                         | `(event: MouseEvent)`                        | -       |
| menu-select    | 当菜单被选择时触发                         | `(label: string, meta: Record<string, any>)` | -       |
| user-action    | 当用户下拉面板操作被点击时触发             | `(label: string, meta: Record<string, any>)` | -       |
| nav-change     | 当通过配置面板改变导航类型时触发           | `(type: LayoutSignType)`                     | -       |
| color-change   | 当通过配置面板改变主题色时触发             | `(color: string)`                            | -       |
| toggle-theme   | 当通过配置面板改变主题模式时触发           | `(isDark: boolean)`                          | `2.1.0` |

### Layout 插槽

| 名称             | 说明                                                                                    | 参数                                                                                                                                                   | 始于    |
| ---------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| sign             | 标语的内容插槽，默认情况下会根据 `sign-type` 作用在 `header-left` 或 `aside-top` 插槽上 | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                        | -       |
| header           | 头部的内容插槽，使用它将覆盖整个头部                                                    | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                        | -       |
| header-left      | 头部左侧的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }` | -       |
| header-main      | 头部中央的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }` | -       |
| header-right     | 头部右侧的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }` | -       |
| header-user      | 头部用户的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }` | -       |
| header-avatar    | 头部用户头像的内容插槽                                                                  | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }` | `2.0.7` |
| aside            | 标语的内容插槽，使用他将覆盖整个边栏                                                    | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                        | -       |
| aside-top        | 边栏上部的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void }`                                               | -       |
| aside-main       | 边栏中央的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void }`                                               | -       |
| aside-bottom     | 边栏下部的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void }`                                               | -       |
| aside-expand     | 边栏触发收起弹出的手柄的插槽                                                            | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void }`                                               | -       |
| default          | 主页面的内容插槽，使用它将覆盖整个主页面                                                | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                        | -       |
| main             | 主页面的内容插槽                                                                        | -                                                                                                                                                      | -       |
| footer           | 页脚的内容插槽，使用它将覆盖整个页脚                                                    | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                        | -       |
| footer-links     | 页脚链接的内容插槽                                                                      | -                                                                                                                                                      | -       |
| footer-copyright | 页脚版权信息的内容插槽                                                                  | -                                                                                                                                                      | -       |

### Layout 方法

| 名称              | 说明                     | 签名                      | 始于    |
| ----------------- | ------------------------ | ------------------------- | ------- |
| expandMenuByLabel | 根据标签值展开内部的菜单 | `(label: string) => void` | `2.0.2` |

### LayoutHeader 属性

| 名称          | 类型                     | 说明                           | 默认值                                                                      | 始于    |
| ------------- | ------------------------ | ------------------------------ | --------------------------------------------------------------------------- | ------- |
| tag           | `string`                 | 设置渲染的标签                 | `header`                                                                    | -       |
| logo          | `string`                 | 设置 Logo 图片地址             | `''`                                                                        | -       |
| sign-name     | `string`                 | 设置标语                       | `''`                                                                        | -       |
| user          | `LayoutUser`             | 设置用户信息                   | `{ name: '' }`                                                              | -       |
| user-dropped  | `boolean`                | 设置用户下拉面板是否打开       | `false`                                                                     | -       |
| avatar-circle | `boolean`                | 设置用户头像是否为圆形         | `false`                                                                     | -       |
| config        | `LayoutConfig[]`         | 设置用户下拉面板具备的配置选项 | `['nav', 'color']`                                                          | -       |
| actions       | `LayoutHeaderAction[]`   | 设置用户下拉面板的操作选项     | `[{ label: 'signOut', name: locale.signOut, icon: ArrowRightFromBracket }]` | -       |
| sign-type     | `LayoutSignType`         | 设置标语所在的块               | `'aside'`                                                                   | -       |
| colors        | `string[]`               | 设置主题色配置的候选值         | `['#339af0', '#f03e3e', '#be4bdb', '#7950f2', '#1b9e44', '#f76707']`        | -       |
| color         | `string`                 | 设置当前所选的主题色           | `''`                                                                        | -       |
| menus         | `MenuOptions[]`          | 设置菜单选项                   | `[]`                                                                        | -       |
| menu-props    | `LayoutMenuProps`        | 设置菜单属性                   | `null`                                                                      | -       |
| locale        | `LocaleConfig['layout']` | 设置多语言配置                 | `null`                                                                      | `2.1.0` |

### LayoutHeader 事件

| 名称         | 说明                             | 参数                                         | 始于    |
| ------------ | -------------------------------- | -------------------------------------------- | ------- |
| nav-change   | 当通过配置面板改变导航类型时触发 | `(type: LayoutSignType)`                     | -       |
| color-change | 当通过配置面板改变主题色时触发   | `(color: string)`                            | -       |
| user-action  | 当用户下拉面板操作被点击时触发   | `(label: string, meta: Record<string, any>)` | -       |
| sign-click   | 当标语被点击时触发               | `(event: MouseEvent)`                        | -       |
| drop-change  | 当用户下拉面板打开或关闭时触发   | `(target: boolean)`                          | -       |
| menu-select  | 当菜单被选择时触发               | `(label: string, meta: Record<string, any>)` | -       |
| toggle-theme | 当通过配置面板改变主题模式时触发 | `(isDark: boolean)`                          | `2.1.0` |

### LayoutHeader 插槽

| 名称    | 说明               | 参数                                                                                                                                                   | 始于 |
| ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| left    | 头部左侧的内容插槽 | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }` | -    |
| default | 头部中央的内容插槽 | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }` | -    |
| right   | 头部右侧的内容插槽 | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }` | -    |
| user    | 头部用户的内容插槽 | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }` | -    |

### LayoutAside 属性

| 名称       | 类型              | 说明                                                                     | 默认值  | 始于 |
| ---------- | ----------------- | ------------------------------------------------------------------------ | ------- | ---- |
| tag        | `string`          | 设置渲染的标签                                                           | `aside` | -    |
| expanded   | `boolean`         | 当边栏不固定时，设置边栏是否为展开状态，可以使用 `v-model` 双向绑定      | `false` | -    |
| reduced    | `boolean`         | 设置边栏是否为缩小状态，可以使用 `v-model` 双向绑定                      | `false` | -    |
| menus      | `MenuOptions[]`   | 设置菜单选项                                                             | `[]`    | -    |
| menu-props | `LayoutMenuProps` | 设置菜单属性                                                             | `null`  | -    |
| logo       | `string`          | 设置 Logo 图片地址                                                       | `''`    | -    |
| sign-name  | `string`          | 设置标语                                                                 | `''`    | -    |
| fixed      | `string`          | 设置边栏是否固定，可以传入一个断点或媒体查询字符串，当满足该查询时才固定 | `'lg'`  | -    |

### LayoutAside 事件

| 名称            | 说明                     | 参数                                         | 始于 |
| --------------- | ------------------------ | -------------------------------------------- | ---- |
| reduced-change  | 当边栏缩小状态改变时触发 | `(reduced: boolean)`                         | -    |
| expanded-change | 当边栏展开状态改变时触发 | `(expanded: boolean)`                        | -    |
| sign-click      | 当标语被点击时触发       | `(event: MouseEvent)`                        | -    |
| menu-select     | 当菜单被选择时触发       | `(label: string, meta: Record<string, any>)` | -    |

### LayoutAside 插槽

| 名称    | 说明                         | 参数                                                                                                       | 始于 |
| ------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------- | ---- |
| top     | 边栏上部的内容插槽           | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void } }` | -    |
| default | 边栏中央的内容插槽           | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void } }` | -    |
| bottom  | 边栏下部的内容插槽           | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void } }` | -    |
| expand  | 边栏触发收起弹出的手柄的插槽 | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void } }` | -    |

### LayoutFooter 属性

| 名称           | 类型                 | 说明                                                                               | 默认值   | 始于 |
| -------------- | -------------------- | ---------------------------------------------------------------------------------- | -------- | ---- |
| tag            | `string`             | 设置渲染的标签                                                                     | `footer` | -    |
| copyright      | `string`             | 设置页脚的版权信息                                                                 | `''`     | -    |
| links          | `LayoutFooterLink[]` | 设置页脚的链接选项                                                                 | `[]`     | -    |
| vertical-links | `boolean \| string`  | 设置页脚的链接是否纵向显示，可以传入一个断点或媒体查询字符串，当满足该查询时才纵向 | `md`     | -    |

### LayoutFooter 插槽

| 名称      | 说明                   | 参数 | 始于 |
| --------- | ---------------------- | ---- | ---- |
| links     | 页脚链接的内容插槽     | -    | -    |
| copyright | 页脚版权信息的内容插槽 | -    | -    |
