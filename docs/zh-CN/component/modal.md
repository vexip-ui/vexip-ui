# 模态框 Modal

模态框，用来放你想放的东西。

## 代码示例

:::demo modal/basis

### 基础用法

最简单的用法，通过双向绑定控制 `active` 属性进而控制模态框显示。

:::

:::demo modal/center

### 自动居中

默认情况下，模态框会自动计算并左右居中。

同时设置 `top` 属性的值为 `auto` 可以使模态框上下居中。

:::

:::demo modal/drag

### 可拖拽

添加 `draggable` 属性可以开启模态框的拖拽功能。

:::

:::demo modal/hide-mask

### 隐藏遮罩

添加 `hide-mask` 属性可以关闭模态框的遮罩效果。

:::

:::demo modal/loading

### 加载状态

添加 `loading` 属性可以使确认按钮显示为加载状态，通常配合 `on-before-close` 使用。

:::

:::demo modal/long-content

### 长内容

当内容过长时，可以结合滚动组件一同使用。

:::

:::demo modal/position

### 自定义位置

Modal 组件在纵横方向上分别有三个属性：`top`、`bottom`、`height` 和 `left`、`right`、`width`。

两个方向都可以通过设置其中的两个属性来自定义模态框的空间关系。

:::

:::demo modal/resize

### 调整大小

添加 `resizable` 属性可以开启模态框的调整大小功能。

:::

:::demo modal/simple

### 简单模态框

不设置 `title` 属性和同名插槽可以使模态框头部隐藏。

添加 `no-footer` 属性可以禁用模态框的默认底部操作栏。

:::

## API

### Modal 属性

| 名称            | 类型                                  | 说明                                                                                                                  | 默认值           | 始于    |
| --------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- |
| active          | `boolean`                             | 设置模态框是否显示，可以使用 `v-model` 双向绑定                                                                       | `false`          | -       |
| width           | `` number \| 'auto' \| `${number}` `` | 设置模态框的初始宽度，为 `'auto'` 时自动计算                                                                          | `'auto'`         | -       |
| height          | `` number \| 'auto' \| `${number}` `` | 设置模态框的初始高度，为 `'auto'` 时自动计算                                                                          | `'auto'`         | -       |
| top             | `` number \| 'auto' \| `${number}` `` | 设置模态框距离顶部的初始距离，为 `'auto'` 时自动计算                                                                  | `'auto'`         | -       |
| left            | `` number \| 'auto' \| `${number}` `` | 设置模态框距离左侧的初始距离，为 `'auto'` 时自动计算                                                                  | `'auto'`         | -       |
| bottom          | `` number \| 'auto' \| `${number}` `` | 设置模态框距离底部的初始距离，为 `'auto'` 时自动计算                                                                  | `'auto'`         | -       |
| right           | `` number \| 'auto' \| `${number}` `` | 设置模态框距离右侧的初始距离，为 `'auto'` 时自动计算                                                                  | `'auto'`         | -       |
| title           | `string`                              | 设置模态框的标题                                                                                                      | `''`             | -       |
| closable        | `boolean`                             | 设置是否具有关闭按钮                                                                                                  | `true`           | -       |
| mask-close      | `boolean`                             | 设置是否可以点击遮罩层关闭                                                                                            | `true`           | -       |
| inner           | `boolean`                             | 设置是否为一个内联的模态框，开启后定位从 fixed 变位 absolute                                                          | `false`          | -       |
| modal-class     | `ClassType`                           | 模态框的自定义类名                                                                                                    | `null`           | -       |
| no-footer       | `boolean`                             | 是否禁用底部的操作按钮                                                                                                | `false`          | -       |
| hide-mask       | `boolean`                             | 设置是否隐藏遮罩层                                                                                                    | `false`          | -       |
| transfer        | `boolean \| string`                   | 设置模态框的渲染位置，设置为 `true` 时默认渲染至 `<body>`                                                             | `false`          | -       |
| on-before-close | `(isConfirm: boolean) => any`         | 设置模态框的关闭前回调，接收一个标识区分是确认或是取消触发的关闭，支持异步函数和 Promise，返回值为 `false` 会阻止关闭 | `null`           | -       |
| draggable       | `boolean`                             | 设置模态框是否可以拖拽                                                                                                | `false`          | -       |
| resizable       | `boolean`                             | 设置模态框是否可以改变大小                                                                                            | `false`          | -       |
| loading         | `boolean`                             | 设置模态框的确认按钮是否为加载状态                                                                                    | `false`          | -       |
| min-width       | `number`                              | 设置模态框的的最小宽度，主要用于设置了 `resizable`                                                                    | `150`            | -       |
| min-height      | `number`                              | 设置模态框的的最小高度，主要用于设置了 `resizable`                                                                    | `120`            | -       |
| confirm-text    | `string`                              | 确认按钮的内容                                                                                                        | `locale.confirm` | -       |
| cancel-text     | `string`                              | 取消按钮的内容                                                                                                        | `locale.cancel`  | -       |
| locale          | `LocaleConfig['modal']`               | 设置多语言配置                                                                                                        | `null`           | `2.1.0` |

### Modal 事件

| 名称         | 说明                                                     | 参数                                        | 始于 |
| ------------ | -------------------------------------------------------- | ------------------------------------------- | ---- |
| toggle       | 当模态框的激活状态改变时触发，返回当前的激活状态         | `(active: boolean)`                         | -    |
| confirm      | 当点击了底部的确定按钮时触发，无返回值                   | -                                           | -    |
| cancel       | 当点击了底部的取消按钮时触发，无返回值                   | -                                           | -    |
| close        | 当用关闭功能触发关闭时触发，无返回值                     | -                                           | -    |
| show         | 当模态框打开后，过渡效果结束后触发，无返回值             | -                                           | -    |
| hide         | 当模态框关闭后，过渡效果结束，完全消失时触发，无返回值   | -                                           | -    |
| drag-start   | 当将要开始拖拽时触发，无返回值                           | -                                           | -    |
| drag-move    | 当正在拖拽时触发，返回一个包含位置信息的对象             | `(position: { top: number, left: number })` | -    |
| drag-end     | 当结束拖拽时触发，无返回值                               | `(position: { top: number, left: number })` | -    |
| resize-start | 当模态框将要开始调整大小时触发，无返回值                 | -                                           | -    |
| resize-move  | 当模态框正在调整大小时触发，返回一个包含模态框宽高的对象 | `(rect: { width: number, height: number })` | -    |
| resize-end   | 当模态框结束调整大小时触发，无返回值                     | `(rect: { width: number, height: number })` | -    |

### Modal 插槽

| 名称    | 说明             | 参数 | 始于 |
| ------- | ---------------- | ---- | ---- |
| default | 模态框的内容插槽 | -    | -    |
| close   | 关闭按钮的插槽   | -    | -    |
| header  | 模态框的头部插槽 | -    | -    |
| footer  | 模态框的底部插槽 | -    | -    |
| title   | 模态框的标题插槽 | -    | -    |
