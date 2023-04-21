# 确认框 Confirm

通常用于一些重要操作的二次确认，以降低用户误操作的概率。

## 代码示例

:::demo confirm/basis

### 基础用法

最简单的用法，确认框内部使用 `Promise` 实现，可以结合 `async/await` 使用。

:::

:::demo confirm/icon

### 自定义图标

设置 `icon` 属性可以设置确认框的图标。

设置 `iconColor` 属性可以设置确认框图标的颜色。

当需要更细粒度地控制图标时，可以设置 `icon` 为函数，传函数时为自定义渲染方法。

:::

:::demo confirm/text

### 按钮文字

设置 `confirmType` 和 `cancelText` 选项自定义确认按钮和取消按钮的内容。

:::

:::demo confirm/title

### 添加标题

设置 `title` 选项可以添加标题，于是我们可以换种布局风格。

:::

:::demo confirm/type

### 确认类型

设置 `confirmType` 选项可以改变确认按钮的类型。

:::

## API

### 预设类型

```ts
type ConfirmType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
type ConfirmAlign = 'left' | 'center' | 'right'
type ConfirmRenderFn = (options: ConfirmOptions, confirm: () => Promise<void>, cancel: () => void) => any
```

### Confirm 选项

| 名称            | 类型                                 | 说明                                                                          | 默认值           | 始于     |
| --------------- | ------------------------------------ | ----------------------------------------------------------------------------- | ---------------- | -------- |
| content         | `string`                             | 确认框的提示内容                                                              | `''`             | -        |
| className       | `ClassType`                          | 提示的自定义类名                                                              | `null`           | -        |
| style           | `StyleType`                          | 确认框的内联样式                                                              | `null`           | -        |
| confirmType     | `ConfirmType`                        | 确认按钮的类型                                                                | `'primary'`      | -        |
| confirmText     | `string`                             | 确认按钮的内容                                                                | `locale.confirm` | -        |
| cancelText      | `string`                             | 取消按钮的内容                                                                | `locale.cancel`  | -        |
| maskClose       | `boolean`                            | 是否可以通过遮罩关闭                                                          | `false`          | -        |
| icon            | `Record<string, any> \| (() => any)` | 确认框的图标，传入函数时作为 render 函数渲染                                  | `null`           | -        |
| iconColor       | `string`                             | 确认框的图标的颜色                                                            | `''`             | -        |
| onBeforeConfirm | `() => unknown`                      | 设置确认框的确认前回调，支持异步函数和 `Promise`，返回值为 `false` 会阻止关闭 | `null`           | -        |
| renderer        | `ConfirmRenderFn`                    | 使用 render 函数渲染自定义渲染                                                | `null`           | -        |
| parseHtml       | `boolean`                            | 是否将 `content` 作为 html 解析                                               | `false`          | `2.0.14` |
| title           | `string`                             | 确认框的标题                                                                  | `''`             | `2.0.15` |
| closable        | `boolean`                            | 是否具有关闭按钮                                                              | `false`          | `2.0.15` |
| contentAlign    | `ConfirmAlign`                       | 内容的对齐                                                                    | `'center'`       | `2.0.15` |
| actionsAlign    | `ConfirmAlign`                       | 操作按钮的对齐                                                                | `'center'`       | `2.0.15` |
