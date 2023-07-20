# Captcha ^[Since v2.2.0](!s)

## Demos

:::demo captcha/basis

### 基础用法

最简单的用法，通过调用组件实例的 `reset` 方法可以重置验证。

:::

:::demo captcha/remote

### 远程验证

验证仅靠前端是不可靠的，所以通常我们都会将验证结果发送至远程进行校验。

我们可以借助 `on-before-test` 属性发送到远程进行验证，并采用远程验证的结果。

:::

:::demo captcha/refresh

### 刷新图片

通过监听 `refresh` 事件实现用户点击刷新按钮时重新从远程获取图片。

:::

:::demo captcha/slider

### 滑块验证

某些场合只需要简单的验证，此时可以单独使用 CaptchaSlider 组件。

:::

## API

### Captcha 属性

| 名称           | 类型                                             | 说明                                                                     | 默认值        | 始于 |
| -------------- | ------------------------------------------------ | ------------------------------------------------------------------------ | ------------- | ---- |
| slide-target   | `number \| number[]`                             | 设置滑动目标位置，传入数组时第二位为纵向位置                             | `null`        | -    |
| title          | `string`                                         | 设置验证的标题                                                           | `null`        | -    |
| tip            | `string`                                         | 设置验证的提示语                                                         | `null`        | -    |
| success-tip    | `string`                                         | 设置验证成功时的提示语                                                   | `null`        | -    |
| image          | `string`                                         | 设置验证用的图片                                                         | `null`        | -    |
| tolerance      | `number`                                         | 设置验证目标位置允许的误差范围                                           | `null`        | -    |
| canvas-size    | `number[]`                                       | 设置画布大小                                                             | `[1000, 600]` | -    |
| refresh-icon   | `Record<string, any>`                            | 设置验证的刷新图标                                                       | `null`        | -    |
| disabled       | `boolean`                                        | 设置是否禁用验证                                                         | `false`       | -    |
| loading        | `boolean`                                        | 设置是否为加载中                                                         | `false`       | -    |
| loading-icon   | `Record<string, any>`                            | 设置加载中的图标                                                         | `null`        | -    |
| loading-lock   | `boolean`                                        | 设置在加载中时是否为只读                                                 | `false`       | -    |
| loading-effect | `string`                                         | 设置加载中图标的效果动画                                                 | `null`        | -    |
| on-before-test | `(percent: number, matched: boolean) => unknown` | 设置验证前的回调，支持异步函数和 Promise，返回布尔值时将直接作为验证结果 | `null`        | -    |

### Captcha 事件

| 名称       | 说明                   | 参数                | 始于 |
| ---------- | ---------------------- | ------------------- | ---- |
| success    | 当验证成功时触发       | `(percent: number)` | -    |
| fail       | 当验证失败时触发       | -                   | -    |
| drag-start | 当开始滑动滑块时触发   | `(percent: number)` | -    |
| drag       | 当正在滑动滑块时触发   | `(percent: number)` | -    |
| drag-end   | 当结束滑动滑块时触发   | `(percent: number)` | -    |
| refresh    | 当刷新按钮被点击时触发 | -                   | -    |

### Captcha 插槽

| 名称    | 说明                     | 参数                   | 始于 |
| ------- | ------------------------ | ---------------------- | ---- |
| title   | 验证标题内容的插槽       | `{ success: boolean }` | -    |
| refresh | 验证刷新按钮的插槽       | -                      | -    |
| tip     | 验证滑动条中提示语的插槽 | `{ success: boolean }` | -    |
