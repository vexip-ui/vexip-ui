### Dropdown Props

| Name          | Type              | Description                                                                                                      | Default   | Since |
| ------------- | ----------------- | --------------------------------------------------------------------------------------------------------- | -------- | --- |
| visible       | `boolean`           | 下拉菜单的展开状态，可以使用 v-model 双向绑定                                                             | `false`    | - |
| label         | `string \| number`  | 在嵌套使用的时候，作为 item 的索引                                                                        | `null`     | - |
| outside-close | `boolean`           | 设置是否可以通过点击外部关闭                                                                              | `true`     | - |
| trigger       | `'hover' \| 'click' \| 'csutom'`            | 下拉菜单的触发方式，当为 `custom` 时，所有情景都需要手动控制 visible | `'hover'`  | - |
| placement     | `Placement`            | 菜单列表的出现位置，可选值同 Popper.js                                                                    | `'bottom'` | - |
| transfer      | `boolean` \| `string` | 设置菜单列表的渲染位置，设置为 `true` 时默认渲染至 `<body>`                                           | `false`    | - |

### Dropdown Events

| Name             | Description                                                                                                            | Parameters    | Since |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | ------- | --- |
| toggle        | 当下拉菜单的展开状态改变时触发，返回当前的状态                                                                  | `(visible: boolean)` | - |
| select        | 当下拉菜单的下级 item 被选取时触发，返回被选取的 item 的 label，如果是嵌套使用时，多级的值会被 '-' 连接一同返回 | `(label: string \| number)`   | - |
| outside-click | 当点击了元素外部时触发，无返回值                                                                                | -       | - |
| outside-close | 当点击了元素外部进行了下拉菜单的关闭时触发，无返回值                                                            | -       | - |

### Dropdown Slots

| Name    | Description                                             | Parameters | Since |
| ------- | ------------------------------------------------ | --- | --- |
| default | 下拉菜单的触发状态变化的部分         | - | - |
| drop    | 下拉菜单的候选列表，一般由 DropdownList 组件承担 | - | - |

### DropdownItem Props

| Name     | Type             | Description                                                              | Default | Since |
| -------- | ---------------- | ----------------------------------------------------------------- | ------ | --- |
| label    | `string \| number` | 选项的唯一索引，若不设置时，在初始化时会使用选项的 textContent 值 | `null`   | - |
| disabled | `boolean`          | 设置是否禁用选项                                                  | `false`  | - |
| selected | `boolean`          | 设置是否为选中状态                                                | `false`  | - |
| divided  | `boolean`          | 设置是否添加分割线，设置后将在选项下方添加分割线                  | `false`  | - |

### DropdownItem Events

| Name      | Description                                   | Parameters  | Since |
| --------- | -------------------------------------- | ----- | --- |
| select | 当该选项被选择时触发，返回选项的 label | `(label: string \| number)` | - |
