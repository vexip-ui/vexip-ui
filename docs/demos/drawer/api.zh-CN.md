### Drawer 属性

| 名称            | 类型                                     | 说明                                                                                              | 默认值    | 始于 |
| --------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------- | --------- | ---- |
| active          | `boolean`                                | 设置抽屉是否激活                                                                                  | `false`   | -    |
| placement       | `'top' \| 'right' \| 'bottom' \| 'left'` | 设置抽屉出现的方位                                                                                | `'right'` | -    |
| width           | `number`                                 | 当 placement 为 `right` 或 `left` 时用于设置抽屉的宽度，无单位，当小于 `100` 时会设置为百分比宽度 | `280`     | -    |
| height          | `number`                                 | 当 placement 为 `top` 或 `bottom` 时用于设置抽屉的宽度，无单位，当小于 `100` 时会设置为百分比高度 | `280`     | -    |
| title           | `string`                                 | 设置抽屉的标题，使用了 title 插槽后改属性无效                                                     | `''`      | -    |
| closable        | `boolean`                                | 设置抽屉是否具有关闭功能，开启时会添加关闭按钮                                                    | `false`   | -    |
| inner           | `boolean`                                | 设置是否为一个内联的抽屉，开启后定位从 fixed 变位 absolute                                        | `false`   | -    |
| mask-close      | `boolean`                                | 设置是否可以通关点击遮罩层关闭抽屉                                                                | `true`    | -    |
| drawer-class    | `string \| Record<string, boolean>`      | 定义抽屉容器的类名                                                                                | `null`    | -    |
| hide-mask       | `boolean`                                | 设置是否隐藏遮罩层                                                                                | `false`   | -    |
| transfer        | `boolean \| string`                      | 设置抽屉的渲染位置，设置为 `true` 时默认渲染至 `<body>`                                           | `false`   | -    |
| on-before-close | `() => any`                              | 设置抽屉的关闭前回调，支持异步函数和 Promise，返回值为 `false` 会阻止关闭                         | `null`    | -    |
| resizable       | `boolean`                                | 设置抽屉是否可以改变大小，当为左右抽屉时可以改变宽度，为上下抽屉时可以改变高度                    | `false`   | -    |

### Drawer 事件

| 名称         | 说明                                                   | 参数                                        | 始于 |
| ------------ | ------------------------------------------------------ | ------------------------------------------- | ---- |
| toggle       | 当抽屉的激活状态改变时触发，返回当前的激活状态         | `(active: boolean)`                         | -    |
| close        | 当用关闭功能触发关闭时 (包括遮罩层关闭) 触发，无返回值 | -                                           | -    |
| show         | 当抽屉打开后，过渡效果结束后触发，无返回值             | -                                           | -    |
| hide         | 当抽屉关闭后，过渡效果结束后触发，无返回值             | -                                           | -    |
| resize-start | 当抽屉将要开始调整大小时触发，无返回值                 | -                                           | -    |
| resize-move  | 当抽屉正在调整大小时触发，返回一个包含抽屉宽高的对象   | `(rect: { width: number, height: number })` | -    |
| resize-end   | 当抽屉结束调整大小时触发，无返回值                     | `(rect: { width: number, height: number })` | -    |

### Drawer 插槽

| 名称    | 说明                   | 参数                    | 始于 |
| ------- | ---------------------- | ----------------------- | ---- |
| default | 抽屉的内容插槽         | -                       | -    |
| title   | 抽屉的标题插槽         | -                       | -    |
| close   | 抽屉的关闭按钮插槽     | -                       | -    |
| handler | 抽屉调整大小手柄的插槽 | `{ resizing: boolean }` | -    |
