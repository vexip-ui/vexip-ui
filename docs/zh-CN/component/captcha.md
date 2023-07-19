# Captcha ^[Since v2.2.0](!s)

## Demos

:::demo captcha/basis

### 基础用法

最简单的用法，通过调用组件实例的 `reset` 方法可以重置验证。

:::

:::demo captcha/remote

### 远程验证

验证仅靠前端是不可靠的，所以通常我们都会将验证结果发送至远程进行校验。

我们可以选择将验证结果放入表单数据中一同发送，但这种方式可能导致前端显示验证成功而远程却验证失败，从而增加用户心智负担。

于是我们可以借助 `on-before-test` 属性先发送一次到远程进行验证，并采用远程验证的结果。

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

| 名称           | 类型                                             | 说明 | 默认值        | 始于 |
| -------------- | ------------------------------------------------ | ---- | ------------- | ---- |
| slide-target   | `number \| number[]`                             |      | `null`        | -    |
| title          | `string`                                         |      | `null`        | -    |
| tip            | `string`                                         |      | `null`        | -    |
| success-tip    | `string`                                         |      | `null`        | -    |
| image          | `string`                                         |      | `null`        | -    |
| tolerance      | `number`                                         |      | `null`        | -    |
| canvas-size    | `number[]`                                       |      | `[1000, 600]` | -    |
| refresh-icon   | `Record<string, any>`                            |      | `null`        | -    |
| disabled       | `boolean`                                        |      | `false`       | -    |
| loading        | `boolean`                                        |      | `false`       | -    |
| loading-icon   | `Record<string, any>`                            |      | `null`        | -    |
| loading-lock   | `boolean`                                        |      | `false`       | -    |
| loading-effect | `string`                                         |      | `null`        | -    |
| on-before-test | `(percent: number, matched: boolean) => unknown` |      | `null`        | -    |

### Captcha 事件

| 名称       | 说明 | 参数 | 始于 |
| ---------- | ---- | ---- | ---- |
| success    |      |      | -    |
| fail       |      |      | -    |
| drag-start |      |      | -    |
| drag       |      |      | -    |
| drag-end   |      |      | -    |
| refresh    |      |      | -    |

### Captcha 插槽

| 名称 | 说明 | 参数 | 始于 |
| ---- | ---- | ---- | ---- |
