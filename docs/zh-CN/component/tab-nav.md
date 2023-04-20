# 标签导航 TabNav

## 代码示例

标签导航组件，标签页组件的基础组件，可以用于生成自定义的标签页结构。

:::demo tabnav/basis

### 基础用法

可以使用 `v-model:active` 进行双向绑定。

:::

:::demo tabnav/align

### 对齐

通过 `align` 属性可以设置导航标签的对齐位置。

:::

:::demo tabnav/card

### 卡片模式

添加 `card` 属性可以开启卡片模式。

:::

:::demo tabnav/closable

### 关闭按钮

添加 `closable` 属性可以显示关闭按钮，并在点击后触发 `close` 事件。

注意，标签的移除逻辑仍需要自行处理。

:::

:::demo tabnav/disabled

### 禁用状态

为 Item 添加 `disabled` 属性禁用某一个标签页导航。

:::

:::demo tabnav/dynamic

### 动态标签

这个例子演示了如何动态创建和删除标签导航。

:::

:::demo tabnav/extra

### 附加内容

通过 `prefix` 和 `suffix` 插槽可以分别在前后两端添加附加内容。

:::

:::demo tabnav/icon

### 内嵌图标

为 Item 设置 `icon` 属性的值可以快速添加一个前置图标。

后置的就自行用插槽加 Icon 组件咯。

:::

:::demo tabnav/options

### 使用选项

可以通过 `options` 属性快速创建标签导航。

:::

:::demo tabnav/placement

### 放置位置

通过 `placement` 属性可以设置导航标签的放置位置。

:::

:::demo tabnav/scroll

### 可滚动

当标签导航数量过多，会自动激活内部滚动。

:::

## API

### 预设类型

```ts
type TabNavAlign = 'left' | 'center' | 'right'
type TabNavPlacement = 'top' | 'right' | 'bottom' | 'left'

interface TabNavItemOptions {
  label: string | number,
  content?: string,
  icon?: Record<string, any>,
  disabled?: boolean,
  closable?: boolean,
  onToggle?: (active: boolean) => void
}

type TabNavOptions = TabNavItemOptions | string | number
```

### TabNav 属性

| 名称      | 类型               | 说明                                            | 默认值   | 始于     |
| --------- | ------------------ | ----------------------------------------------- | -------- | -------- |
| active    | `string \| number` | 设置当前激活的导航，可以使用 `v-model` 双向绑定 | `null`   | -        |
| card      | `boolean`          | 设置是否开启卡片模式                            | `false`  | -        |
| options   | `TabNavOptions[]`  | 快捷设置标签导航，使用插槽后失效                | `[]`     | `2.0.7`  |
| align     | `TabNavAlign`      | 设置标签导航的对齐位置                          | `'left'` | `2.0.11` |
| placement | `TabNavPlacement`  | 设置标签导航的放置位置                          | `'top'`  | `2.0.13` |
| show-add  | `boolean`          | 设置是否显示添加按钮                            | `false`  | `2.0.13` |
| closable  | `boolean`          | 设置是否显示关闭按钮                            | `false`  | `2.0.13` |

### TabNav 事件

| 名称   | 说明                                         | 参数                        | 始于     |
| ------ | -------------------------------------------- | --------------------------- | -------- |
| change | 当激活的导航发生变化时触发，返回当前激活标签 | `(label: string \| number)` | -        |
| add    | 当点击了添加按钮后触发                       | -                           | `2.0.13` |
| close  | 当点击了关闭按钮后触发，返回关闭的标签       | `(label: string \| number)` | `2.0.13` |

### TabNav 插槽

| 名称    | 说明               | 参数 | 始于     |
| ------- | ------------------ | ---- | -------- |
| default | 导航的内容插槽     | -    | -        |
| prefix  | 导航前置内容插槽   | -    | `2.0.7`  |
| suffix  | 导航后置内容插槽   | -    | `2.0.7`  |
| add     | 添加按钮的内容插槽 | -    | `2.0.13` |

### TabNavItem 属性

| 名称     | 类型               | 说明                                            | 默认值  | 始于     |
| -------- | ------------------ | ----------------------------------------------- | ------- | -------- |
| label    | `string \| number` | 导航的唯一索引，未设置时会采用内部的 `index` 值 | `null`  | -        |
| disabled | `boolean`          | 设置是否禁用该导航                              | `false` | -        |
| icon     | `string`           | 设置导航的前置图标                              | `''`    | -        |
| closable | `boolean`          | 设置是否显示关闭按钮                            | `false` | `2.0.13` |

### TabNavItem 事件

| 名称   | 说明                                           | 参数                | 始于 |
| ------ | ---------------------------------------------- | ------------------- | ---- |
| toggle | 当该导航被选择时触发，返回当前是否处于激活状态 | `(active: boolean)` | -    |
