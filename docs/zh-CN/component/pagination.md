# Pagination 分页器

采用分页的形式分隔长列表，每次只加载一个页面。

## 代码示例

:::demo pagination/basis

### 基本使用

基本的分页。

:::

:::demo pagination/more

### 更多的分页

当页数过多时，会使用省略号的形式。

:::

:::demo pagination/style

### 不同样式

添加 `background` 属性可以使分页元素具有背景颜色。

添加 `no-border` 属性可以禁用分页元素边框。

:::

:::demo pagination/size

### 不同的大小

三种内置的大小，通过 `size` 设置，不够用可以自己设置。

:::

:::demo pagination/disabled

### 禁用状态

添加 `disabled` 属性可以禁用整个分页器。

:::

:::demo pagination/plugin

### 分页插件

通过 `plugins` 属性可以添加插件，包括：调整每页数量、显示条目总数、快速跳转页面。

数组内的顺序决定插件渲染的位置，其中空值表示分页器所在的位置。

:::

:::demo pagination/item-tag

### 自定义标签

==!s|2.2.0==

通过 `list-tag` 和 `item-tag` 属性可以自定义元素的标签。

未指定 `list-tag` 时，其会根据 `item-tag` 是否为 `'li'` 取值为 `'ul'` 或 `'div'`。

:::

:::demo pagination/slots

### 使用插槽

组件提供了数个插槽以满足自定义。

通过插槽你可以将分页器与 RouterLink 或者 NuxtLink 这样的组件结合使用。

:::

## API

### Pagination 属性

| 名称            | 类型                                                  | 说明                                                       | 默认值              | 始于     |
| --------------- | ----------------------------------------------------- | ---------------------------------------------------------- | ------------------- | -------- |
| total           | `number`                                              | 设置数据的总条数                                           | `0`                 | -        |
| size            | `'small' \| 'default' \| 'large'`                     | 设置页码的大小                                             | `'default'`         | -        |
| no-border       | `boolean`                                             | 设置页码是否禁用边框                                       | `false`             | -        |
| background      | `boolean`                                             | 设置页面是否具有背景颜色                                   | `false`             | -        |
| page-size       | `number`                                              | 设置每页显示的数据条数，可以使用 `v-model` 双向绑定        | `10`                | -        |
| size-options    | `number[]`                                            | 每页显示条目数的选项，用于 page-count 插件                 | `[10, 20, 50, 100]` | -        |
| ~~max-count~~   | `number`                                              | 设置页码数界限，最小值为 7，超过界限后会处理成省略号的形式 | `7`                 | -        |
| item-count      | `number`                                              | 设置页码数界限，最小值为 7，超过界限后会处理成省略号的形式 | `7`                 | `2.2.1`  |
| active          | `number \| string`                                    | 当前激活的页码数，从 1 开始，可以使用 `v-model` 双向绑定   | `1`                 | -        |
| disabled        | `boolean`                                             | 设置是否禁用分页器                                         | `false`             | -        |
| disable-item    | `(page: number) => boolean`                           | 设置禁用页码的判断方法                                     | `[]`                | -        |
| turn-page-count | `number`                                              | 设置大翻页的翻页页数                                       | `5`                 | -        |
| plugins         | `('total' \| 'jump' \|'size' \| undefined \| null)[]` | 设置插件及其渲染的位置                                     | `[]`                | `2.0.8`  |
| no-title        | `boolean`                                             | 设置是否禁用页码 title 属性                                | `false`             | `2.0.11` |
| locale          | `LocaleConfig['pagination']`                          | 设置多语言配置                                             | `null`              | `2.1.0`  |
| item-tag        | `string`                                              | 设置分页元素的标签                                         | `'li'`              | `2.2.0`  |
| list-tag        | `string`                                              | 设置分页列表的标签                                         | `null`              | `2.2.0`  |

### Pagination 事件

| 名称             | 说明                                       | 参数                 | 始于 |
| ---------------- | ------------------------------------------ | -------------------- | ---- |
| change           | 当页码发生改变时触发，返回当前页码         | `(active: number)`   | -    |
| page-size-change | 当每页条目数改变时触发，返回当前每页条目数 | `(pageSize: number)` | -    |

### Pagination 插槽

| 名称      | 说明               | 参数                                                 | 始于    |
| --------- | ------------------ | ---------------------------------------------------- | ------- |
| prev      | 向前翻页按钮的插槽 | `(disabled: boolean)`                                | -       |
| next      | 向后翻页按钮的插槽 | `(disabled: boolean)`                                | -       |
| item      | 页码显示内容的插槽 | `(page: number, disabled: boolean, active: boolean)` | -       |
| prev-jump | 向前跳页按钮的插槽 | `(disabled: boolean, entered: boolean)`              | `2.2.0` |
| next-jump | 向后跳页按钮的插槽 | `(disabled: boolean, entered: boolean)`              | `2.2.0` |
