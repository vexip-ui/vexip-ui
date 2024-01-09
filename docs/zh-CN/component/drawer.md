# Drawer 抽屉

当你想要从屏幕的四边飞一些东西进来，抽屉是个不错的选择。

## 代码示例

:::demo drawer/basis

### 基础用法

简单的用法，通过双向绑定控制 `active` 属性进而控制抽屉显示，点击遮罩区域关闭抽屉。

:::

:::demo drawer/nesting

### 嵌套用法

在抽屉的内容插槽内可以在打开新的抽屉，可以解决内容需要多层多分支的情况。

:::

:::demo drawer/position

### 自定义位置

设置 `placement` 属性的值为 `top`、`right`、`bottom`、`left` 可以自定义抽屉出现的位置。

:::

:::demo drawer/long-content

### 长内容

当内容过长时，可以结合滚动组件一同使用。

:::

:::demo drawer/hide-mask

### 隐藏遮罩

添加 `hide-mask` 属性可以关闭抽屉的遮罩效果。

关闭了遮罩效果后，别忘了提供其他关闭途径。

:::

:::demo drawer/footer

### 添加脚部

添加 `footer` 属性可以快速添加脚部，或者你也可以直接使用同名插槽。

:::

:::demo drawer/custom-action

### 调整按钮

==!s|2.2.6==

通过 `confirm-type` 和 `cancel-type` 属性可以分别指定确认和取消按钮的类型。

通过 `action-size` 属性可以修改确认和取消按钮的大小。

:::

:::demo drawer/resize

### 调整大小

添加 `resizable` 属性可以开启抽屉的调整大小功能。

鼠标移至抽屉边缘会出现手柄，左右方向的抽屉可以调整宽度，上下方向的抽屉可以调整高度。

:::

:::demo drawer/inner

### 内置抽屉

添加 `inner` 属性可以使抽屉根据最近的具有定位属性的元素进行定位，从而实现内置抽屉。

:::

:::demo drawer/undivided

### 无分割线

==!s|2.2.6==

添加 `undivided` 属性可以去除抽屉各部分间的分割线。

:::

## API

### 预设类型

```ts
interface DrawerSlotParams {
  resizing: boolean,
  handleConfirm: () => void,
  handleCancel: () => void,
  handleClose: (isConfirm?: boolean) => Promise<unknown>
}
```

### Drawer 属性

| 名称            | 类型                                        | 说明                                                                           | 默认值           | 始于     |
| --------------- | ------------------------------------------- | ------------------------------------------------------------------------------ | ---------------- | -------- |
| active          | `boolean`                                   | 设置抽屉是否激活                                                               | `false`          | -        |
| placement       | `'top' \| 'right' \| 'bottom' \| 'left'`    | 设置抽屉出现的方位                                                             | `'right'`        | -        |
| width           | `` number \| `${number}` \| `${number}%` `` | 当 placement 为 `right` 或 `left` 时用于设置抽屉的宽度，可以传入百分比值       | `280`            | -        |
| height          | `` number \| `${number}` \| `${number}%` `` | 当 placement 为 `top` 或 `bottom` 时用于设置抽屉的宽度，可以传入百分比值       | `280`            | -        |
| title           | `string`                                    | 设置抽屉的标题，使用了 title 插槽后改属性无效                                  | `''`             | -        |
| closable        | `boolean`                                   | 设置抽屉是否具有关闭功能，开启时会添加关闭按钮                                 | `false`          | -        |
| inner           | `boolean`                                   | 设置是否为一个内联的抽屉，开启后定位从 fixed 变位 absolute                     | `false`          | -        |
| mask-close      | `boolean`                                   | 设置是否可以通关点击遮罩层关闭抽屉                                             | `true`           | -        |
| drawer-class    | `ClassType`                                 | 定义抽屉容器的类名                                                             | `null`           | -        |
| hide-mask       | `boolean`                                   | 设置是否隐藏遮罩层                                                             | `false`          | -        |
| transfer        | `boolean \| string`                         | 设置抽屉的渲染位置，设置为 `true` 时默认渲染至 `<body>`                        | `false`          | -        |
| on-before-close | `(isConfirm?: boolean) => any`              | 设置抽屉的关闭前回调，支持异步函数和 Promise，返回值为 `false` 会阻止关闭      | `null`           | -        |
| resizable       | `boolean`                                   | 设置抽屉是否可以改变大小，当为左右抽屉时可以改变宽度，为上下抽屉时可以改变高度 | `false`          | -        |
| footer          | `boolean`                                   | 是否添加底部的操作按钮                                                         | `false`          | `2.0.0`  |
| loading         | `boolean`                                   | 设置抽屉的确认按钮是否为加载状态                                               | `false`          | `2.0.0`  |
| confirm-text    | `string`                                    | 确认按钮的内容                                                                 | `locale.confirm` | `2.0.0`  |
| cancel-text     | `string`                                    | 取消按钮的内容                                                                 | `locale.cancel`  | `2.0.0`  |
| locale          | `LocaleConfig['drawer']`                    | 设置多语言配置                                                                 | `null`           | `2.1.0`  |
| auto-remove     | `boolean`                                   | 设置不显示时是否自动移除                                                       | `false`          | `2.0.13` |
| confirm-type    | `ButtonType`                                | 设置确认按钮的类型                                                             | `'primary'`      | `2.2.6`  |
| cancel-type     | `ButtonType`                                | 设置取消按钮的类型                                                             | `'default'`      | `2.2.6`  |
| action-size     | `'small' \| 'default' \| 'large'`           | 设置确认和取消按钮的大小                                                       | `'small'`        | `2.2.6`  |
| undivided       | `boolean`                                   | 去除抽屉各部分的分割线                                                         | `false`          | `2.2.6`  |

### Drawer 事件

| 名称         | 说明                                                 | 参数                                        | 始于    |
| ------------ | ---------------------------------------------------- | ------------------------------------------- | ------- |
| toggle       | 当抽屉的激活状态改变时触发，返回当前的激活状态       | `(active: boolean)`                         | -       |
| close        | 当用关闭功能触发关闭时 (包括遮罩层关闭) 触发         | `(isConfirm: boolean)`                      | -       |
| show         | 当抽屉打开后，过渡效果结束后触发                     | -                                           | -       |
| hide         | 当抽屉关闭后，过渡效果结束后触发                     | -                                           | -       |
| resize-start | 当抽屉将要开始调整大小时触发                         | -                                           | -       |
| resize-move  | 当抽屉正在调整大小时触发，返回一个包含抽屉宽高的对象 | `(rect: { width: number, height: number })` | -       |
| resize-end   | 当抽屉结束调整大小时触发                             | `(rect: { width: number, height: number })` | -       |
| confirm      | 当点击了底部的确定按钮时触发                         | -                                           | `2.0.0` |
| cancel       | 当点击了底部的取消按钮时触发                         | -                                           | `2.0.0` |

### Drawer 插槽

| 名称    | 说明                   | 参数               | 始于    |
| ------- | ---------------------- | ------------------ | ------- |
| default | 抽屉的内容插槽         | `DrawerSlotParams` | -       |
| title   | 抽屉的标题插槽         | `DrawerSlotParams` | -       |
| close   | 抽屉的关闭按钮插槽     | `DrawerSlotParams` | -       |
| header  | 抽屉的头部插槽         | `DrawerSlotParams` | -       |
| handler | 抽屉调整大小手柄的插槽 | `DrawerSlotParams` | -       |
| footer  | 抽屉的底部插槽         | `DrawerSlotParams` | `2.0.0` |
