# Modal 模态框

模态框，用来放你想放的东西。

## 代码示例

:::demo modal/basis

### 基础用法

最简单的用法，通过双向绑定控制 `active` 属性进而控制模态框显示。

:::

:::demo modal/long-content

### 长内容

当内容过长时，可以结合滚动组件一同使用。

:::

:::demo modal/custom-action

### 调整按钮

==!s|2.2.6==

通过 `confirm-type` 和 `cancel-type` 属性可以分别指定确认和取消按钮的类型。

通过 `action-size` 属性可以修改确认和取消按钮的大小。

:::

:::demo modal/hide-mask

### 隐藏遮罩

添加 `hide-mask` 属性可以关闭模态框的遮罩效果。

:::

:::demo modal/drag

### 可拖拽

添加 `draggable` 属性可以开启模态框的拖拽功能。

:::

:::demo modal/loading

### 加载状态

添加 `loading` 属性可以使确认按钮显示为加载状态，通常配合 `on-before-close` 使用。

:::

:::demo modal/resize

### 调整大小

添加 `resizable` 属性可以开启模态框的调整大小功能。

:::

:::demo modal/inner

### 内置模态框

添加 `inner` 属性可以使模态框根据最近的具有定位属性的元素进行定位，从而实现内置模态框。

:::

:::demo modal/simple

### 简单模态框

不设置 `title` 属性和同名插槽可以使模态框头部隐藏。

添加 `no-footer` 属性可以禁用模态框的默认底部操作栏。

:::

:::demo modal/undivided

### 无分割线

==!s|2.2.6==

添加 `undivided` 属性可以去除模态框各部分间的分割线。

:::

:::demo modal/position

### 自定义位置

Modal 组件在纵横方向上分别有三个属性：`top`、`bottom`、`height` 和 `left`、`right`、`width`。

两个方向都可以通过设置其中的两个属性来自定义模态框的空间关系。

:::

:::demo modal/hook

### Hook 方式

Modal 组件提供了一个静态的 `open` 方法，可以直接创建一个一次性的模态框。

或者你可以像示例中那样引入 `useModal` 直接使用。

:::

## API

### 预设类型

```ts
interface ModalSlotParams {
  dragging: boolean,
  resizing: boolean,
  handleResize: () => void,
  handleConfirm: () => void,
  handleCancel: () => void,
  handleClose: (isConfirm?: boolean) => Promise<unknown>
}
```

### Modal 属性

| 名称            | 类型                              | 说明                                                                                                                  | 默认值           | 始于     |
| --------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| active          | `boolean`                         | 设置模态框是否显示，可以使用 `v-model` 双向绑定                                                                       | `false`          | -        |
| width           | `number \| string`                | 设置模态框的初始宽度，为 `'auto'` 时自动计算                                                                          | `'auto'`         | -        |
| height          | `number \| string`                | 设置模态框的初始高度，为 `'auto'` 时自动计算                                                                          | `'auto'`         | -        |
| top             | `number \| string`                | 设置模态框距离顶部的初始距离，为 `'auto'` 时自动计算                                                                  | `'auto'`         | -        |
| left            | `number \| string`                | 设置模态框距离左侧的初始距离，为 `'auto'` 时自动计算                                                                  | `'auto'`         | -        |
| bottom          | `number \| string`                | 设置模态框距离底部的初始距离，为 `'auto'` 时自动计算                                                                  | `'auto'`         | -        |
| right           | `number \| string`                | 设置模态框距离右侧的初始距离，为 `'auto'` 时自动计算                                                                  | `'auto'`         | -        |
| title           | `string`                          | 设置模态框的标题                                                                                                      | `''`             | -        |
| closable        | `boolean`                         | 设置是否具有关闭按钮                                                                                                  | `true`           | -        |
| mask-close      | `boolean`                         | 设置是否可以点击遮罩层关闭                                                                                            | `true`           | -        |
| inner           | `boolean`                         | 设置是否为一个内联的模态框，开启后定位从 fixed 变位 absolute                                                          | `false`          | -        |
| modal-class     | `ClassType`                       | 模态框的自定义类名                                                                                                    | `null`           | -        |
| no-footer       | `boolean`                         | 是否禁用底部的操作按钮                                                                                                | `false`          | -        |
| hide-mask       | `boolean`                         | 设置是否隐藏遮罩层                                                                                                    | `false`          | -        |
| transfer        | `boolean \| string`               | 设置模态框的渲染位置，设置为 `true` 时默认渲染至 `<body>`                                                             | `false`          | -        |
| on-before-close | `(isConfirm: boolean) => any`     | 设置模态框的关闭前回调，接收一个标识区分是确认或是取消触发的关闭，支持异步函数和 Promise，返回值为 `false` 会阻止关闭 | `null`           | -        |
| draggable       | `boolean`                         | 设置模态框是否可以拖拽                                                                                                | `false`          | -        |
| resizable       | `boolean`                         | 设置模态框是否可以改变大小                                                                                            | `false`          | -        |
| loading         | `boolean`                         | 设置模态框的确认按钮是否为加载状态                                                                                    | `false`          | -        |
| min-width       | `number`                          | 设置模态框的的最小宽度，主要用于设置了 `resizable`                                                                    | `150`            | -        |
| min-height      | `number`                          | 设置模态框的的最小高度，主要用于设置了 `resizable`                                                                    | `120`            | -        |
| confirm-text    | `string`                          | 确认按钮的内容                                                                                                        | `locale.confirm` | -        |
| cancel-text     | `string`                          | 取消按钮的内容                                                                                                        | `locale.cancel`  | -        |
| locale          | `LocaleConfig['modal']`           | 设置多语言配置                                                                                                        | `null`           | `2.1.0`  |
| auto-remove     | `boolean`                         | 设置不显示时是否自动移除                                                                                              | `false`          | `2.0.13` |
| confirm-type    | `ButtonType`                      | 设置确认按钮的类型                                                                                                    | `'primary'`      | `2.2.6`  |
| cancel-type     | `ButtonType`                      | 设置取消按钮的类型                                                                                                    | `'default'`      | `2.2.6`  |
| action-size     | `'small' \| 'default' \| 'large'` | 设置确认和取消按钮的大小                                                                                              | `'small'`        | `2.2.6`  |
| undivided       | `boolean`                         | 去除模态框各部分的分割线                                                                                              | `false`          | `2.2.6`  |
| x-offset        | `number`                          | 设置模态框横向的偏移量，与定位属性互不影响                                                                            | `0`              | `2.2.11` |
| y-offset        | `number`                          | 设置模态框纵向的偏移量，与定位属性互不影响                                                                            | `0`              | `2.2.11` |

### Modal 事件

| 名称         | 说明                                                     | 参数                                        | 始于 |
| ------------ | -------------------------------------------------------- | ------------------------------------------- | ---- |
| toggle       | 当模态框的激活状态改变时触发，返回当前的激活状态         | `(active: boolean)`                         | -    |
| confirm      | 当点击了底部的确定按钮时触发                             | -                                           | -    |
| cancel       | 当点击了底部的取消按钮时触发                             | -                                           | -    |
| close        | 当用关闭功能触发关闭时触发                               | -                                           | -    |
| show         | 当模态框打开后，过渡效果结束后触发                       | -                                           | -    |
| hide         | 当模态框关闭后，过渡效果结束，完全消失时触发             | -                                           | -    |
| drag-start   | 当将要开始拖拽时触发                                     | `(position: { top: number, left: number })` | -    |
| drag-move    | 当正在拖拽时触发，返回一个包含位置信息的对象             | `(position: { top: number, left: number })` | -    |
| drag-end     | 当结束拖拽时触发                                         | `(position: { top: number, left: number })` | -    |
| resize-start | 当模态框将要开始调整大小时触发                           | `(size: { width: number, height: number })` | -    |
| resize-move  | 当模态框正在调整大小时触发，返回一个包含模态框宽高的对象 | `(size: { width: number, height: number })` | -    |
| resize-end   | 当模态框结束调整大小时触发                               | `(size: { width: number, height: number })` | -    |

### Modal 插槽

| 名称    | 说明             | 参数              | 始于 |
| ------- | ---------------- | ----------------- | ---- |
| default | 模态框的内容插槽 | `ModalSlotParams` | -    |
| title   | 模态框的标题插槽 | `ModalSlotParams` | -    |
| close   | 关闭按钮的插槽   | `ModalSlotParams` | -    |
| header  | 模态框的头部插槽 | `ModalSlotParams` | -    |
| footer  | 模态框的底部插槽 | `ModalSlotParams` | -    |
