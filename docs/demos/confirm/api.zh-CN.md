### Confirm 选项

| 名称            | 类型                                                                    | 说明                                                                          | 默认值           | 始于 |
| --------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------- | ---- |
| content         | `string`                                                                | 确认框的提示内容                                                              | `''`             | -    |
| style           | `Record<string, any>`                                                   | 确认框的内联样式                                                              | `null`           | -    |
| parseHtml       | `boolean`                                                               | 是否解析 html，开启则将 `content` 内容作为 html 解析                          | `false`          | -    |
| confirmType     | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | 确认按钮的类型                                                                | `'primary'`      | -    |
| confirmText     | `string`                                                                | 确认按钮的内容                                                                | `locale.confirm` | -    |
| cancelText      | `string`                                                                | 取消按钮的内容                                                                | `locale.cancel`  | -    |
| icon            | `Record<string, any> \| (() => any)`                                    | 确认框的图标，传入函数时作为 render 函数渲染                                  | `null`           | -    |
| iconColor       | `string`                                                                | 确认框的图标的颜色                                                            | `''`             | -    |
| onBeforeConfirm | `() => unknown`                                                         | 设置确认框的确认前回调，支持异步函数和 `Promise`，返回值为 `false` 会阻止关闭 | `null`           | -    |
| renderer        | `() => any`                                                             | 使用 render 函数渲染自定义渲染                                                | `null`           | -    |
