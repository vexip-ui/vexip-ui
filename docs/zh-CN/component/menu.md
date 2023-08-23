# 导航菜单 Menu

为页面和功能提供导航的菜单列表。

## 代码示例

:::demo menu/basis

### 基本使用

垂直菜单，子菜单内嵌在菜单区域。

:::

:::demo menu/group

### 菜单组

使用 MenuGroup 组件可以将一些菜单归类为一组。

:::

:::demo menu/options

### 菜单选项

通过 `options` 属性以配置的形式创建菜单。

:::

:::demo menu/reduce

### 收缩菜单

通过设置 `reduced` 属性可以使菜单收缩或展开。

:::

:::demo menu/horizontal

### 横向菜单

添加 `horizontal` 属性可以使菜单变为横向显示。

:::

:::demo menu/meta

### 元数据

通过 MenuItem 的 `meta` 属性可以为每个菜单配置元数据。

:::

:::demo menu/router

### 使用路由

通过 `router` 属性传入一个 `vue-router` 的 Router 对象可以快速根据路由创建菜单。

使用路由时，会假定每个 `route.meta` 为选项进行解析，并自动将路由本身作为 `option.route` 属性。

配置 `route.meta.menu` 为 `false` 可以将特定的路由排除在解析外。

如果你不希望组件自动地处理路由变化，可以添加 `manual-route` 属性。

:::

## API

### 预设类型

```ts
import type { RouteLocationRaw } from 'vue-router'

interface MenuOptions {
  label: string,
  icon?: Record<string, any> | (() => any),
  iconProps?: IconMinorProps,
  name?: string | (() => string),
  disabled?: boolean,
  group?: boolean,
  meta?: Record<string, any>,
  route?: RouteLocationRaw,
  children?: MenuOptions[]
}
```

### Menu 属性

| 名称          | 类型                                               | 说明                                                                           | 默认值       | 始于    |
| ------------- | -------------------------------------------------- | ------------------------------------------------------------------------------ | ------------ | ------- |
| active        | `string`                                           | 设置默认激活的菜单                                                             | `null`       | -       |
| accordion     | `boolean`                                          | 设置是否开启手风琴模式，该模式下同级菜单只能展开一个                           | `0`          | -       |
| marker-type   | `'top' \| 'right' \| 'bottom' \| 'left' \| 'none'` | 设置选中菜单的标记的类型                                                       | `'right'`    | -       |
| reduced       | `boolean`                                          | 设置菜单是否收缩                                                               | `false`      | -       |
| horizontal    | `boolean`                                          | 设置是否为横向菜单                                                             | `false`      | -       |
| group-type    | `'collapse' \| 'dropdown'`                         | 在展开状态时子菜单的形式                                                       | `'collapse'` | -       |
| theme         | `'light' \| 'dark'`                                | 设置菜单的主题                                                                 | `'light'`    | -       |
| tooltip-theme | `'light' \| 'dark'`                                | 设置菜单气泡提示的主题                                                         | `'dark'`     | -       |
| transfer      | `boolean \| string`                                | 设置其下 MenuItem 的 `transfer` 属性，当 MenuItem 单独设置了该属性时优先级更高 | `false`      | -       |
| options       | `MenuOptions[]`                                    | 设置菜单的配置                                                                 | `[]`         | `2.0.0` |
| router        | `Router`                                           | 设置 Router 对象，并自动解析生成菜单，会优先使用 `options` 解析                | `null`       | `2.0.0` |
| manual-route  | `boolean`                                          | 设置是否为手动路由模式，开启后将不会自动处理路由变化                           | `false`      | `2.0.0` |
| indent        | `string \| number`                                 | 置每层菜单的基础缩进距离                                                       | `null`       | `2.1.2` |

### Menu 事件

| 名称   | 说明                                                       | 参数                                         | 始于 |
| ------ | ---------------------------------------------------------- | -------------------------------------------- | ---- |
| select | 当菜单被选择时触发，返回被选菜单的 label                   | `(label: string, meta: Record<string, any>)` | -    |
| expand | 当菜单被展开组 (子菜单) 时触发，返回被展开组的菜单的 label | `(label: string, meta: Record<string, any>)` | -    |
| reduce | 当菜单被收起组 (子菜单) 时触发，返回被收起组的菜单的 label | `(label: string, meta: Record<string, any>)` | -    |

### Menu 方法

| 名称              | 说明               | 签名                      | 始于    |
| ----------------- | ------------------ | ------------------------- | ------- |
| expandItemByLabel | 根据标签值展开菜单 | `(label: string) => void` | `2.0.0` |

### MenuItem 属性

| 名称            | 类型                  | 说明                                                                                                            | 默认值  | 始于    |
| --------------- | --------------------- | --------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| label           | `string`              | 菜单的唯一标识                                                                                                  | `null`  | -       |
| icon            | `string`              | 设置菜单的图标，菜单收缩状态的图标需通过该属性或同名插槽设置                                                    | `null`  | -       |
| icon-props      | `IconProps`           | 设置菜单图标的属性                                                                                              | `null`  | `2.0.0` |
| disabled        | `boolean`             | 设置菜单是否为禁用状态                                                                                          | `false` | -       |
| transfer        | `boolean \| string`   | 当子元素处于下拉状态时，设置其子元素的渲染位置，设置为 `true` 时默认渲染至 `<body>`                             | `false` | -       |
| transition-name | `string`              | 当子元素处于下拉状态时，设置子元素的过渡效果，未设置时会根据是否为横向菜单分别取值 `'vxp-drop'` 或 `'vxp-zoom'` | `null`  | -       |
| meta            | `Record<string, any>` | 设置菜单的元数据                                                                                                | `null`  | `2.0.0` |
| children        | `MenuOptions[]`       | 设置菜单的子级配置                                                                                              | `[]`    | `2.0.0` |
| route           | `RouteLocationRaw`    | 设置菜单关联的路由，如果设置的 Router 对象默认情况下会自动处理路由的变化                                        | `null`  | `2.0.0` |

### MenuItem 插槽

| 名称    | 说明                 | 参数 | 始于 |
| ------- | -------------------- | ---- | ---- |
| default | 菜单的内容插槽       | -    | -    |
| icon    | 菜单的图标内容插槽   | -    | -    |
| group   | 菜单的子菜单内容插槽 | -    | -    |

### MenuGroup 属性

| 名称     | 类型            | 说明               | 默认值 | 始于    |
| -------- | --------------- | ------------------ | ------ | ------- |
| label    | `string`        | 分组的名称         | `''`   | -       |
| children | `MenuOptions[]` | 设置分组的子级配置 | `[]`   | `2.0.0` |
