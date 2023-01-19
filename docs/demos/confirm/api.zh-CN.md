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
