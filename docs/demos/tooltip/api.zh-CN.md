### Tooltip 属性

| 名称            | 类型                                                              | 说明                                                                   | 默认值       | 始于    |
| --------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------ | ------- |
| visible         | `boolean`                                                         | 提示的显示状态，可以使用 `v-model` 双向绑定                            | `false`      | -       |
| trigger         | `'hover' \| 'click' \| 'focus' \| 'custom'`                       | 下拉菜单的触发方式，当为 `custom` 时，所有情景都需要手动控制 `visible` | `'hover'`    | -       |
| placement       | `Placement`                                                       | 提示出现的位置，可选值同 Popper.js                                     | `'top'`      | -       |
| outside-close   | `boolean`                                                         | 设置是否可以通过点击外部关闭                                           | `true`       | -       |
| no-hover        | `boolean`                                                         | 设置是否让提示变得无法捕捉                                             | `false`      | -       |
| tip-class       | `ClassType`                                                       | 提示内容的自定义类名                                                   | `null`       | -       |
| tip-style       | `StyleType`                                                       | 提示内容的自定义样式                                                   | `null`       | `2.0.0` |
| disabled        | `boolean`                                                         | 设置是否禁用提示，禁用后将不显示任何内容                               | `false`      | -       |
| reverse         | `boolean`                                                         | 设置气泡是否为反色主题                                                 | `false`      | `2.0.0` |
| transfer        | `boolean \| string`                                               | 设置气泡的渲染位置，设置为 `true` 时默认渲染至 `<body>`                | `false`      | -       |
| transition-name | `string`                                                          | 设置气泡的显示隐藏过渡效果                                             | `'vxp-fade'` | -       |
| wrapper         | `boolean \| string`                                               | 设置是否渲染包围元素                                                   | `false`      | `2.0.0` |
| no-arrow        | `boolean`                                                         | 设置是否禁用提示的箭头                                                 | `false`      | `2.0.0` |
| raw             | `boolean`                                                         | 设置是否不使用内置样式直接渲染提示                                     | `false`      | `2.0.0` |
| tip-alive       | `boolean`                                                         | 设置在隐藏时是否不移除提示元素                                         | `false`      | `2.0.0` |
| width           | `number \| 'trigger' \| 'auto'`                                   | 设置提示的宽度，设置为 `'trigger'` 时会使用触发器的宽度                | `'auto'`     | `2.0.0` |
| virtual         | `{ $el: HTMLElement } \| HTMLElement \| { x: number, y: number }` | 设置虚拟参考系                                                         | `null`       | `2.0.0` |

### Tooltip 事件

| 名称          | 说明                                                 | 参数                 | 始于 |
| ------------- | ---------------------------------------------------- | -------------------- | ---- |
| toggle        | 当提示的显示状态改变时触发，返回当前的状态           | `(visible: boolean)` | -    |
| tip-enter     | 当鼠标移入提示时触发，无返回值                       | -                    | -    |
| tip-leave     | 当鼠标移出提示时触发，无返回值                       | -                    | -    |
| click-outside | 当点击了元素外部时触发，无返回值                     | -                    | -    |
| outside-close | 当点击了元素外部进行了下拉菜单的关闭时触发，无返回值 | -                    | -    |

### Tooltip 插槽

| 名称    | 说明               | 参数 | 始于 |
| ------- | ------------------ | ---- | ---- |
| default | 触发提示内容的插槽 | -    | -    |
| tip     | 提示内容的插槽     | -    | -    |
