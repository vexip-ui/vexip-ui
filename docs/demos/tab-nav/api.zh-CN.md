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
| closable  | `boolean`          | 设置是否显示关闭按钮                            | `false`  | `2.0.13` |

### TabNav 事件

| 名称   | 说明                                               | 参数                        | 始于 |
| ------ | -------------------------------------------------- | --------------------------- | ---- |
| change | 当激活的导航发生变化时触发，返回当前激活导航的名字 | `(label: string \| number)` | -    |

### TabNav 插槽

| 名称    | 说明             | 参数 | 始于    |
| ------- | ---------------- | ---- | ------- |
| default | 导航的内容插槽   | -    | -       |
| prefix  | 导航前置内容插槽 | -    | `2.0.7` |
| suffix  | 导航后置内容插槽 | -    | `2.0.7` |

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
