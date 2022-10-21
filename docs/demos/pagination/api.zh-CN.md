### Pagination 属性

| 名称            | 类型                                                  | 说明                                                     | 默认值              | 始于    |
| --------------- | ----------------------------------------------------- | -------------------------------------------------------- | ------------------- | ------- |
| total           | `number`                                              | 设置数据的总条数                                         | `0`                 | -       |
| size            | `'small' \| 'default' \| 'large'`                     | 设置页码的大小                                           | `'default'`         | -       |
| no-border       | `boolean`                                             | 设置页码是否具有边框                                     | `false`             | -       |
| background      | `boolean`                                             | 设置页面是否具有背景颜色                                 | `false`             | -       |
| page-size       | `number`                                              | 设置每页显示的数据条数，可以使用 `v-model` 双向绑定      | `10`                | -       |
| size-options    | `number[]`                                            | 每页显示条目数的选项，用于 page-count 插件               | `[10, 20, 50, 100]` | -       |
| max-count       | `number`                                              | 设置页码数界限，最小为 7，超过界限后会处理成省略号的形式 | `7`                 | -       |
| active          | `number \| string`                                    | 当前激活的页码数，从 1 开始，可以使用 `v-model` 双向绑定 | `1`                 | -       |
| disabled        | `boolean`                                             | 设置是否禁用分页器                                       | `false`             | -       |
| disable-item    | `(page: number) => boolean`                           | 设置禁用页码的判断方法                                   | `[]`                | -       |
| turn-page-count | `number`                                              | 设置大翻页的翻页页数                                     | `5`                 | -       |
| ~~page-jump~~   | `boolean`                                             | 是否开启页码跳转插件                                     | `false`             | -       |
| ~~page-count~~  | `boolean`                                             | 是否开启切换每页条数的插件                               | `false`             | -       |
| ~~page-total~~  | `boolean`                                             | 是否开启显示总条数的插件                                 | `false`             | -       |
| plugins         | `('total' \| 'jump' \|'size' \| undefined \| null)[]` | 设置插件及其渲染的位置                                   | `[]`                | `2.0.8` |

### Pagination 事件

| 名称             | 说明                                       | 参数                 | 始于 |
| ---------------- | ------------------------------------------ | -------------------- | ---- |
| change           | 当页码发生改变时触发，返回当前页码         | `(active: number)`   | -    |
| page-size-change | 当每页条目数改变时触发，返回当前每页条目数 | `(pageSize: number)` | -    |

### Pagination 插槽

| 名称 | 说明               | 参数             | 始于 |
| ---- | ------------------ | ---------------- | ---- |
| prev | 向前翻页按钮的插槽 | -                | -    |
| next | 向后翻页按钮的插槽 | -                | -    |
| item | 页码显示内容的插槽 | `(page: number)` | -    |
