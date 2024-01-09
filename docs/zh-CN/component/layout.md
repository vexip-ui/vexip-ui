# Layout 布局 ==!s|2.0.0==

这是一个渐进式的强业务逻辑布局组件，根据需要可以进行不同程度的定制化。

:::warning
在生产实践中，一个应用中不该使用多个 Layout 组件，并且 Layout 组件应该占满窗口。
:::

通常情况下，Layout 组件的主内容是在 `main` 插槽对应的元素上滚动的，如果你希望滚动是发生在浏览器窗口上的，可以添加 `fit-window` 属性。

如果你希望主内容是一个固定的区域，并准备自行添加可滚动的包围元素，可以添加 `fix-main` 属性（参考下面 **固定主内容** 示例）。

## 代码示例

:::demo layout/basis

### 基础用法

通常情况下，只需要提供一些基础的配置即可快速布局。

:::

:::demo layout/actions

### 用户操作

通过 `actions` 属性可以快速配置自定义的用户操作。

:::

:::demo layout/footer

### 添加页脚

添加 `footer` 属性可以添加页脚，结合 `copyright` 和 `links` 属性可以快速配置页脚内容。

:::

:::demo layout/fixed-main

### 固定主内容

某些场合下，你可能希望主内容是一个固定的区域，就像画布一样，那么你可以添加 `fixed-main` 属性。

:::

:::demo layout/no-aside

### 无边栏

添加 `no-aside` 属性可以去掉边栏，此时菜单会在头部。

:::

:::demo layout/adjust

### 调整大小

通过 CSS 变量可以轻松调整头部高度和边栏的宽度。

:::

:::demo layout/media

### 媒体查询

默认情况下，头部和边栏会在 `lg` 这个断点发生行为变化，头部会在主内容滚动后收起，边栏会直接收起并通过手柄展开。

通过 `header-fixed` 和 `aside-fixed` 属性可以定制这些行为。

传入布尔值时，可以明确指定头部和边栏是否为一直固定或一直不固定，此外还可以传入一个断点或媒体查询字符串来指定行为变化应该在何时发生。

当使用字符串时，有两个特殊值 `max` 和 `min`，它们与 `true` 和 `false` 是等效的。

:::

:::demo layout/custom-header

### 自定义头部

可能你想要自定义头部的内容，你可以通过插槽轻松实现。

:::

:::demo layout/custom-aside

### 自定义边栏

可能你想要自定义边栏的内容，你可以通过插槽轻松实现。

:::

:::demo layout/slots

### 各种插槽

组件内有许多插槽提供自定义内容。有些相互嵌套的插槽在此并未演示，具体请查阅 Layout 插槽。

:::

:::demo layout/fit-window

### 适应窗口

添加 `fit-window` 属性可以使布局适应浏览器窗口。

添加后，内部的滚动组件将被禁用，布局将会跟随浏览器窗口的滚动，在移动端可以获得更好的滚动交互。

:::

## API

### 预设类型

```ts
import type { Router } from 'vue-router'
import type { IconMinorProps, MenuGroupType, MenuMarkerType } from 'vexip-ui'

type LayoutSignType = 'aside' | 'header'
type LayoutConfig = 'nav' | 'color' | 'theme'
type LayoutSection =
  | 'wrapper'
  | 'section'
  | 'header'
  | 'headerLeft'
  | 'headerMain'
  | 'headerRight'
  | 'headerUser'
  | 'sidebar'
  | 'aside'
  | 'asideTop'
  | 'asideMain'
  | 'asideBottom'
  | 'expandHandler'
  | 'main'
  | 'footer'
  | 'footerLinks'
  | 'copyright'
  | 'scrollbar'

type LayoutInnerClass = Partial<Record<LayoutSection, ClassType>>

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

interface LayoutSlotParams {
  expanded: boolean,
  reduced: boolean,
  toggleExpanded: (expanded?: boolean) => void,
  toggleReduced: (reduced: boolean) => void
}

interface LayoutHeaderSlotParams extends LayoutSlotParams {
  handleColorChange: (color: string) => void,
  toggleUserDropped: (dropped?: boolean) => void
}
```

### Layout 属性

| 名称             | 类型                     | 说明                                                                                                        | 默认值                                                               | 始于     |
| ---------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------- |
| no-aside         | `boolean`                | 设置是否禁用边栏                                                                                            | `false`                                                              | -        |
| footer           | `boolean`                | 设置是否使用页脚                                                                                            | `false`                                                              | -        |
| tag              | `string`                 | 设置渲染的标签                                                                                              | `'section'`                                                          | -        |
| menus            | `MenuOptions[]`          | 设置菜单选项                                                                                                | `[]`                                                                 | -        |
| menu-props       | `LayoutMenuProps`        | 设置菜单属性，详见 [Menu 属性](/zh-CN/component/menu#menu-属性)                                             | `null`                                                               | -        |
| logo             | `string`                 | 设置 Logo 图片地址                                                                                          | `''`                                                                 | -        |
| sign-name        | `string`                 | 设置标语                                                                                                    | `''`                                                                 | -        |
| config           | `LayoutConfig[]`         | 设置用户下拉面板具备的配置选项                                                                              | `['nav', 'theme', 'color']`                                          | -        |
| user             | `LayoutUser`             | 设置用户信息                                                                                                | `null`                                                               | -        |
| actions          | `LayoutHeaderAction[]`   | 设置用户下拉面板的操作选项                                                                                  | `[]`                                                                 | -        |
| expanded         | `boolean`                | 当边栏不固定时，设置边栏是否为展开状态，可以使用 `v-model` 双向绑定                                         | `false`                                                              | `2.1.19` |
| reduced          | `boolean`                | 设置边栏是否为缩小状态，可以使用 `v-model` 双向绑定                                                         | `false`                                                              | -        |
| avatar-circle    | `boolean`                | 设置用户头像是否为圆形                                                                                      | `false`                                                              | -        |
| sign-type        | `'aside' \| 'header'`    | 设置标语所在的块，可以使用 `v-model` 双向绑定                                                               | `'aside'`                                                            | -        |
| header-fixed     | `boolean \| string`      | 设置头部是否固定，可以传入一个断点或媒体查询字符串，当满足该查询时才固定                                    | `'lg'`                                                               | -        |
| aside-fixed      | `boolean \| string`      | 设置边栏是否固定，可以传入一个断点或媒体查询字符串，当满足该查询时才固定                                    | `'lg'`                                                               | -        |
| copyright        | `string`                 | 设置页脚的版权信息                                                                                          | `''`                                                                 | -        |
| links            | `LayoutFooterLink[]`     | 设置页脚的链接选项                                                                                          | `[]`                                                                 | -        |
| colors           | `string[]`               | 设置主题色配置的候选值                                                                                      | `['#339af0', '#f03e3e', '#be4bdb', '#7950f2', '#1b9e44', '#f76707']` | -        |
| color            | `string`                 | 设置当前所选的主题色，可以使用 `v-model` 双向绑定                                                           | `''`                                                                 | -        |
| mini-header-sign | `boolean \| string`      | 设置头部的标语是否缩略，可以传入一个断点或媒体查询字符串，当满足该查询时才缩略                              | `lg`                                                                 | -        |
| vertical-links   | `boolean \| string`      | 设置页脚的链接是否纵向显示，可以传入一个断点或媒体查询字符串，当满足该查询时才纵向                          | `md`                                                                 | -        |
| locale           | `LocaleConfig['layout']` | 设置多语言配置                                                                                              | `null`                                                               | `2.1.0`  |
| dark-mode        | `boolean`                | 手动设置当前主题模式，除了初始化时，其他时候改变时会修改 `<html>` 上相应的类名，可以使用 `v-model` 双向绑定 | `null`                                                               | `2.1.1`  |
| fixed-main       | `boolean`                | 设置主内容是否为固定的                                                                                      | `false`                                                              | `2.1.14` |
| fit-window       | `boolean`                | 开启后将适应浏览器窗口并移除内置得滚动                                                                      | `false`                                                              | `2.1.24` |
| inner-classes    | `LayoutInnerClass`       | 设置内部元素的自定义类名                                                                                    | `{}`                                                                 | `2.1.24` |
| no-header        | `boolean`                | 设置是否禁用头部                                                                                            | `false`                                                              | `2.2.7`  |

### Layout 事件

| 名称            | 说明                             | 参数                                         | 始于     |
| --------------- | -------------------------------- | -------------------------------------------- | -------- |
| expanded-change | 当边栏展开状态改变时触发         | `(expanded: boolean)`                        | `2.1.19` |
| reduced-change  | 当边栏缩小状态改变时触发         | `(reduced: boolean)`                         | -        |
| sign-click      | 当标语被点击时触发               | `(event: MouseEvent)`                        | -        |
| menu-select     | 当菜单被选择时触发               | `(label: string, meta: Record<string, any>)` | -        |
| user-action     | 当用户下拉面板操作被点击时触发   | `(label: string, meta: Record<string, any>)` | -        |
| nav-change      | 当通过配置面板改变导航类型时触发 | `(type: LayoutSignType)`                     | -        |
| color-change    | 当通过配置面板改变主题色时触发   | `(color: string)`                            | -        |
| toggle-theme    | 当通过配置面板改变主题模式时触发 | `(isDark: boolean)`                          | `2.1.0`  |
| content-resize  | 当内容缩放时触发                 | -                                            | `2.1.23` |

### Layout 插槽

| 名称             | 说明                                                                                    | 参数                     | 始于    |
| ---------------- | --------------------------------------------------------------------------------------- | ------------------------ | ------- |
| sign             | 标语的内容插槽，默认情况下会根据 `sign-type` 作用在 `header-left` 或 `aside-top` 插槽上 | `LayoutSlotParams`       | -       |
| header           | 头部的内容插槽，使用它将覆盖整个头部                                                    | `LayoutSlotParams`       | -       |
| header-left      | 头部左侧的内容插槽                                                                      | `LayoutHeaderSlotParams` | -       |
| header-main      | 头部中央的内容插槽                                                                      | `LayoutHeaderSlotParams` | -       |
| header-right     | 头部右侧的内容插槽                                                                      | `LayoutHeaderSlotParams` | -       |
| header-user      | 头部用户的内容插槽                                                                      | `LayoutHeaderSlotParams` | -       |
| header-avatar    | 头部用户头像的内容插槽                                                                  | `LayoutHeaderSlotParams` | `2.0.7` |
| aside            | 标语的内容插槽，使用他将覆盖整个边栏                                                    | `LayoutSlotParams`       | -       |
| aside-top        | 边栏上部的内容插槽                                                                      | `LayoutSlotParams`       | -       |
| aside-main       | 边栏中央的内容插槽                                                                      | `LayoutSlotParams`       | -       |
| aside-bottom     | 边栏下部的内容插槽                                                                      | `LayoutSlotParams`       | -       |
| aside-expand     | 边栏触发收起弹出的手柄的插槽                                                            | `LayoutSlotParams`       | -       |
| default          | 主页面的内容插槽，使用它将覆盖整个主页面                                                | `LayoutSlotParams`       | -       |
| main             | 主页面的内容插槽                                                                        | -                        | -       |
| footer           | 页脚的内容插槽，使用它将覆盖整个页脚                                                    | `LayoutSlotParams`       | -       |
| footer-links     | 页脚链接的内容插槽                                                                      | -                        | -       |
| footer-copyright | 页脚版权信息的内容插槽                                                                  | -                        | -       |

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

| 名称            | 说明                             | 参数                                         | 始于     |
| --------------- | -------------------------------- | -------------------------------------------- | -------- |
| nav-change      | 当通过配置面板改变导航类型时触发 | `(type: LayoutSignType)`                     | -        |
| color-change    | 当通过配置面板改变主题色时触发   | `(color: string)`                            | -        |
| user-action     | 当用户下拉面板操作被点击时触发   | `(label: string, meta: Record<string, any>)` | -        |
| sign-click      | 当标语被点击时触发               | `(event: MouseEvent)`                        | -        |
| dropped-change  | 当用户下拉面板打开或关闭时触发   | `(dropped: boolean)`                         | -        |
| expanded-change | 当边栏展开状态改变时触发         | `(expanded: boolean)`                        | `2.1.19` |
| reduced-change  | 当边栏缩小状态改变时触发         | `(reduced: boolean)`                         | -        |
| menu-select     | 当菜单被选择时触发               | `(label: string, meta: Record<string, any>)` | -        |
| toggle-theme    | 当通过配置面板改变主题模式时触发 | `(isDark: boolean)`                          | `2.1.0`  |

### LayoutHeader 插槽

| 名称    | 说明               | 参数                     | 始于 |
| ------- | ------------------ | ------------------------ | ---- |
| left    | 头部左侧的内容插槽 | `LayoutHeaderSlotParams` | -    |
| default | 头部中央的内容插槽 | `LayoutHeaderSlotParams` | -    |
| right   | 头部右侧的内容插槽 | `LayoutHeaderSlotParams` | -    |
| user    | 头部用户的内容插槽 | `LayoutHeaderSlotParams` | -    |

### LayoutAside 属性

| 名称       | 类型                  | 说明                                                                     | 默认值    | 始于     |
| ---------- | --------------------- | ------------------------------------------------------------------------ | --------- | -------- |
| tag        | `string`              | 设置渲染的标签                                                           | `aside`   | -        |
| expanded   | `boolean`             | 当边栏不固定时，设置边栏是否为展开状态，可以使用 `v-model` 双向绑定      | `false`   | -        |
| reduced    | `boolean`             | 设置边栏是否为缩小状态，可以使用 `v-model` 双向绑定                      | `false`   | -        |
| menus      | `MenuOptions[]`       | 设置菜单选项                                                             | `[]`      | -        |
| menu-props | `LayoutMenuProps`     | 设置菜单属性                                                             | `null`    | -        |
| logo       | `string`              | 设置 Logo 图片地址                                                       | `''`      | -        |
| sign-name  | `string`              | 设置标语                                                                 | `''`      | -        |
| fixed      | `string`              | 设置边栏是否固定，可以传入一个断点或媒体查询字符串，当满足该查询时才固定 | `'lg'`    | -        |
| sign-type  | `'aside' \| 'header'` | 设置标语所在的块，非 `'aside'` 时边栏的上定位会调整                      | `'aside'` | `2.1.23` |

### LayoutAside 事件

| 名称            | 说明                     | 参数                                         | 始于 |
| --------------- | ------------------------ | -------------------------------------------- | ---- |
| expanded-change | 当边栏展开状态改变时触发 | `(expanded: boolean)`                        | -    |
| reduced-change  | 当边栏缩小状态改变时触发 | `(reduced: boolean)`                         | -    |
| sign-click      | 当标语被点击时触发       | `(event: MouseEvent)`                        | -    |
| menu-select     | 当菜单被选择时触发       | `(label: string, meta: Record<string, any>)` | -    |

### LayoutAside 插槽

| 名称    | 说明                         | 参数               | 始于 |
| ------- | ---------------------------- | ------------------ | ---- |
| top     | 边栏上部的内容插槽           | `LayoutSlotParams` | -    |
| default | 边栏中央的内容插槽           | `LayoutSlotParams` | -    |
| bottom  | 边栏下部的内容插槽           | `LayoutSlotParams` | -    |
| expand  | 边栏触发收起弹出的手柄的插槽 | `LayoutSlotParams` | -    |

### LayoutMain 属性

| 名称  | 类型      | 说明                   | 默认值  | 始于     |
| ----- | --------- | ---------------------- | ------- | -------- |
| tag   | `string`  | 设置渲染的标签         | `aside` | -        |
| fixed | `boolean` | 设置主内容是否为固定的 | `false` | `2.1.14` |

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
