# Confirm 确认框

通常用于一些重要操作的二次确认，以降低用户误操作的概率。

## 代码示例

:::demo confirm/basis

### 基础用法

最简单的用法，确认框内部使用 `Promise` 实现，可以结合 `async/await` 使用。

:::

:::demo confirm/type

### 按钮类型

设置 `confirmType` 和 `cancelType` 选项可以改变确认按钮和取消按钮的类型。

:::

:::demo confirm/text

### 按钮文字

设置 `confirmType` 和 `cancelText` 选项自定义确认按钮和取消按钮的内容。

:::

:::demo confirm/icon

### 自定义图标

设置 `icon` 选项可以修改确认框的图标，设置为 `false` 时将禁用图标。

当需要更细粒度地控制图标时，可以设置 `icon` 为函数，传函数时为自定义渲染方法。

:::

:::demo confirm/cancelable

### 禁用取消

==!s|2.2.6==

设置 `cancelable` 选项为 `false` 可以禁用取消按钮。

禁用取消按钮后确认框的默认图标将改变，你仍然可以自定义修改。

:::

:::demo confirm/title

### 添加标题

设置 `title` 选项可以添加标题，于是我们可以换种布局风格。

:::

:::demo confirm/renderer

### 自定义渲染

通过 `renderer` 选项可以自定义渲染确认框的内容。

一个更进阶的用法，你可以通过 [属性配置](/zh-CN/guide/global-config) 或者 `Confirm.defaults` 属性设置一个通用渲染方法。

:::

## API

某些场景下，需要在全屏元素上显示确认框，此时可以将组件的渲染位置迁移：

```ts
Confirm.transferTo('#a-new-place')

// 重新迁移回 body
Confirm.transferTo(document.body)
```

### 预设类型

```ts
type ConfirmButtonType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
type ConfirmAlign = 'left' | 'center' | 'right'

interface ConfirmState {
  visible: boolean,
  loading: boolean,
  title: string,
  content: string,
  icon: Record<string, any> | (() => any) | null | boolean,
  iconProps: IconMinorProps,
  className: string | Record<string, any>,
  style: string | Record<string, any>,
  confirmType: ConfirmButtonType,
  cancelType: ConfirmButtonType,
  confirmText: string,
  cancelText: string,
  maskClose: boolean,
  parseHtml: boolean,
  closable: boolean,
  contentAlign: ConfirmAlign,
  actionsAlign: ConfirmAlign,
  cancelable: boolean,
  width: number | string,
  height: number | string,
  top: number | string,
  right: number | string,
  bottom: number | string,
  left: number | string,
  xOffset: number | string,
  yOffset: number | string,
  raw: Record<any, any>
}

type ConfirmRenderFn = (options: ConfirmState, confirm: () => Promise<void>, cancel: () => void) => any

interface ConfirmOptions extends Partial<Omit<ConfirmState, 'visible' | 'loading' | 'raw'>>, Record<any, any> {
  renderer?: ConfirmRenderFn,
  onBeforeConfirm?: () => unknown
}
```

### Confirm 选项

| 名称            | 类型                                            | 说明                                                                          | 默认值           | 始于     |
| --------------- | ----------------------------------------------- | ----------------------------------------------------------------------------- | ---------------- | -------- |
| title           | `string`                                        | 确认框的标题                                                                  | `''`             | `2.0.15` |
| content         | `string`                                        | 确认框的提示内容                                                              | `''`             | -        |
| className       | `ClassType`                                     | 提示的自定义类名                                                              | `null`           | -        |
| style           | `StyleType`                                     | 确认框的内联样式                                                              | `null`           | -        |
| confirmType     | `ConfirmButtonType`                             | 确认按钮的类型                                                                | `'primary'`      | -        |
| cancelType      | `ConfirmButtonType`                             | 取消按钮的类型                                                                | `'default'`      | `2.1.30` |
| confirmText     | `string`                                        | 确认按钮的内容                                                                | `locale.confirm` | -        |
| cancelText      | `string`                                        | 取消按钮的内容                                                                | `locale.cancel`  | -        |
| maskClose       | `boolean`                                       | 是否可以通过遮罩关闭                                                          | `false`          | -        |
| icon            | `boolean \| Record<string, any> \| (() => any)` | 确认框的图标，传入函数时作为 render 函数渲染                                  | `null`           | -        |
| iconProps       | `IconProps`                                     | 确认框的图标的颜色                                                            | `''`             | -        |
| onBeforeConfirm | `() =>  unknown`                                | 设置确认框的确认前回调，支持异步函数和 `Promise`，返回值为 `false` 会阻止关闭 | `null`           | -        |
| renderer        | `ConfirmRenderFn`                               | 使用 render 函数渲染自定义渲染                                                | `null`           | -        |
| parseHtml       | `boolean`                                       | 是否将 `content` 作为 html 解析                                               | `false`          | `2.0.14` |
| closable        | `boolean`                                       | 是否具有关闭按钮                                                              | `false`          | `2.0.15` |
| contentAlign    | `ConfirmAlign`                                  | 内容的对齐                                                                    | `'center'`       | `2.0.15` |
| actionsAlign    | `ConfirmAlign`                                  | 操作按钮的对齐                                                                | `'center'`       | `2.0.15` |
| cancelable      | `boolean`                                       | 是否可取消                                                                    | `true`           | `2.2.6`  |
| width           | `number \| string`                              | 设置确认框的初始宽度，为 `'auto'` 时自动计算                                  | `420`            | `2.2.12` |
| height          | `number \| string`                              | 设置确认框的初始高度，为 `'auto'` 时自动计算                                  | `'auto'`         | `2.2.12` |
| top             | `number \| string`                              | 设置确认框距离顶部的初始距离，为 `'auto'` 时自动计算                          | `'auto'`         | `2.2.12` |
| right           | `number \| string`                              | 设置确认框距离左侧的初始距离，为 `'auto'` 时自动计算                          | `'auto'`         | `2.2.12` |
| bottom          | `number \| string`                              | 设置确认框距离底部的初始距离，为 `'auto'` 时自动计算                          | `'auto'`         | `2.2.12` |
| left            | `number \| string`                              | 设置确认框距离右侧的初始距离，为 `'auto'` 时自动计算                          | `'auto'`         | `2.2.12` |
| xOffset         | `number \| string`                              | 设置确认框横向的偏移量，与定位属性互不影响                                    | `'auto'`         | `2.2.12` |
| yOffset         | `number \| string`                              | 设置确认框纵向的偏移量，与定位属性互不影响                                    | `'auto'`         | `2.2.12` |
