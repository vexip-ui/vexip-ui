# Captcha ==!s|2.3.0==

在某些场合，要尽可能的防止脚本和机器人行为，此时便会用到人机验证。

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

:::demo captcha/hollow-shape

### 镂空形状

通过 `hollow-shape` 属性可以指定内置的镂空形状名称。

你也可以传入一个自定义的处理方法来画镂空的形状。

:::

:::demo captcha/point

### 点击验证

设置 `type` 属性为 `'point'` 可以使用点击图片特定元素的验证方式。

使用这种方式时需通过 `texts` 属性指定需要被依次点击的单字。

在未使用远程验证时，组件内部会根据传入的 `texts` 将其中的单字随机分布在图片中。

:::

:::demo captcha/remote-point

### 远程点击验证

同样地，如果想要更可靠的验证，需要借助服务端的力量。

在使用点击类型的验证时，需要添加 `remote-point` 属性方可开启远程验证模式。

同时需指定 `on-before-test` 属性并在其中完成远程验证的逻辑。

:::

:::demo captcha/trigger

### 使用触发器

添加 `use-trigger` 属性可以使用触发器触发验证。

通过 `trigger-size` 属性可以指定触发器的大小，或者使用 `trigger` 插槽自定义触发器。

:::

:::demo captcha/slider

### 滑块验证

某些场合只需要简单的验证，此时可以单独使用 CaptchaSlider 组件。

:::

## API

### 预设类型

```ts
type CaptchaType = 'slide' | 'point'

type CaptchaBeforeTest =
  | ((percent: number, matched: boolean) => unknown)
  | ((positions: number[]) => unknown)

interface CaptchaHollowOptions {
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
}

type CaptchaHollowResult = [x: number, y: number, width: number, height: number]
type CaptchaHollowProcess = (options: CaptchaHollowOptions) => CaptchaHollowResult

type CaptchaHollowType = 'square' | 'puzzle' | 'shield' | 'heart'
```

### Captcha 属性

| 名称           | 类型                                        | 说明                                                                     | 默认值        | 始于 |
| -------------- | ------------------------------------------- | ------------------------------------------------------------------------ | ------------- | ---- |
| type           | `CaptchaType`                               | 设置验证的交互类型                                                       | `'slide'`     | -    |
| slide-target   | `number \| number[]`                        | 设置滑动目标位置，传入数组时第二位为纵向位置                             | `null`        | -    |
| title          | `string`                                    | 设置验证的标题                                                           | `null`        | -    |
| tip            | `string`                                    | 设置验证的提示语                                                         | `null`        | -    |
| success-tip    | `string`                                    | 设置验证成功时的提示语                                                   | `null`        | -    |
| image          | `string`                                    | 设置验证用的图片                                                         | `null`        | -    |
| tolerance      | `number`                                    | 设置验证目标位置允许的误差范围                                           | `1`           | -    |
| canvas-size    | `number[]`                                  | 设置画布大小                                                             | `[1000, 600]` | -    |
| refresh-icon   | `VueComponent`                              | 设置验证的刷新图标                                                       | `null`        | -    |
| disabled       | `boolean`                                   | 设置是否禁用验证                                                         | `false`       | -    |
| loading        | `boolean`                                   | 设置是否为加载中                                                         | `false`       | -    |
| loading-icon   | `VueComponent`                              | 设置加载中的图标                                                         | `null`        | -    |
| loading-effect | `string`                                    | 设置加载中图标的效果动画                                                 | `null`        | -    |
| on-before-test | `CaptchaBeforeTest`                         | 设置验证前的回调，支持异步函数和 Promise，返回布尔值时将直接作为验证结果 | `null`        | -    |
| texts          | `string[]`                                  | 设置要依次点击的单字                                                     | `[]`          | -    |
| fail-limit     | `number`                                    | 设置验证失败的限制次数，达到或超出后需刷新                               | `0`           | -    |
| remote-point   | `boolean`                                   | 是否使用远程点击验证                                                     | `false`       | -    |
| use-trigger    | `boolean`                                   | 是否使用触发器                                                           | `false`       | -    |
| trigger-size   | `'small' \| 'default' \| 'large'`           | 设置触发器的大小                                                         | `'default'`   | -    |
| trigger-text   | `string`                                    | 设置触发器中的提示语                                                     | `null`        | -    |
| transfer       | `boolean \| string`                         | 设置验证面板的渲染位置，设置为 `true` 时默认渲染至 `<body>`              | `false`       | -    |
| hide-delay     | `number`                                    | 使用触发器时，设置验证成功后隐藏面板的延迟毫秒数                         | `3000`        | -    |
| hollow-shape   | `CaptchaHollowType \| CaptchaHollowProcess` | 设置镂空的形状                                                           | `'square'`    | -    |

### Captcha 事件

| 名称       | 说明                                           | 参数                          | 始于 |
| ---------- | ---------------------------------------------- | ----------------------------- | ---- |
| success    | 当验证成功时触发，使用点击验证时参数为系列坐标 | `(value: number \| number[])` | -    |
| fail       | 当验证失败时触发                               | -                             | -    |
| drag-start | 当开始滑动滑块时触发                           | `(percent: number)`           | -    |
| drag       | 当正在滑动滑块时触发                           | `(percent: number)`           | -    |
| drag-end   | 当结束滑动滑块时触发                           | `(percent: number)`           | -    |
| refresh    | 当刷新按钮被点击时触发                         | -                             | -    |

### Captcha 插槽

| 名称         | 说明                                                | 参数                                     | 始于 |
| ------------ | --------------------------------------------------- | ---------------------------------------- | ---- |
| title        | 验证标题内容的插槽                                  | `{ success: boolean }`                   | -    |
| refresh      | 验证刷新按钮的插槽                                  | -                                        | -    |
| tip          | 验证滑动条中提示语的插槽                            | `{ success: boolean }`                   | -    |
| texts        | 依次点击单字的内容插槽，使用时仍需要传 `texts` 属性 | `{ texts: string[] }`                    | -    |
| loading-icon | 加载图标的插槽                                      | -                                        | -    |
| trigger      | 触发器的内容插槽                                    | `{ visible: boolean, success: boolean }` | -    |

### CaptchaSlide 属性

| 名称           | 类型                                             | 说明                                                                     | 默认值      | 始于 |
| -------------- | ------------------------------------------------ | ------------------------------------------------------------------------ | ----------- | ---- |
| size           | `'small' \| 'default' \| 'large'`                | 设置滑动验证器的大小                                                     | `'default'` | -    |
| target         | `number`                                         | 设置滑动目标位置，通常不需要修改                                         | `100`       | -    |
| tip            | `string`                                         | 设置验证的提示语                                                         | `null`      | -    |
| success-tip    | `string`                                         | 设置验证成功时的提示语                                                   | `null`      | -    |
| tolerance      | `number`                                         | 设置验证目标位置允许的误差范围                                           | `1`         | -    |
| disabled       | `boolean`                                        | 设置是否禁用验证                                                         | `false`     | -    |
| loading        | `boolean`                                        | 设置是否为加载中                                                         | `false`     | -    |
| loading-icon   | `Record<string, any>`                            | 设置加载中的图标                                                         | `null`      | -    |
| loading-lock   | `boolean`                                        | 设置在加载中是否为只读                                                   | `false`     | -    |
| loading-effect | `string`                                         | 设置加载中图标的效果动画                                                 | `null`      | -    |
| on-before-test | `(percent: number, matched: boolean) => unknown` | 设置验证前的回调，支持异步函数和 Promise，返回布尔值时将直接作为验证结果 | `null`      | -    |

### CaptchaSlide 事件

| 名称       | 说明                 | 参数                | 始于 |
| ---------- | -------------------- | ------------------- | ---- |
| success    | 当验证成功时触发     | `(percent: number)` | -    |
| fail       | 当验证失败时触发     | -                   | -    |
| drag-start | 当开始滑动滑块时触发 | `(percent: number)` | -    |
| drag       | 当正在滑动滑块时触发 | `(percent: number)` | -    |
| drag-end   | 当结束滑动滑块时触发 | `(percent: number)` | -    |
