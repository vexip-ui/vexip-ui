# Confirm

It is usually used for the secondary confirmation of some important operations to reduce the probability of user misoperation.

## Demos

:::demo confirm/basis

### Basis Usage

Simplest usage. Confirm is using `Promise` inside, which can be used with `async/await`.

:::

:::demo confirm/type

### Button Type

Set the `confirmType` and `cancelType` options to change the type of the confirm and cancel buttons.

:::

:::demo confirm/text

### Button Text

Set the `confirmType` and `cancelText` options to customize the content of the confirm and cancel buttons.

:::

:::demo confirm/icon

### Custom Icon

Set the `icon` option to change the icon of the Confirm, and set it to `false` to disable the icon.

When you need more fine-grained control of the icon, you can set `icon` as a function, it will as a custom rendering method.

:::

:::demo confirm/cancelable

### Disable Cancel

^[Since v2.2.6](!s)

Set the `cancelable` option to `false` to disable the cancel button.

After disabling the cancel button, the default icon of the Confirm will change, you can still make custom it.

:::

:::demo confirm/title

### Add Title

Setting the `title` option can add a title, so we can change the layout style.

:::

:::demo confirm/renderer

### Custom Render

You can specify a custom rendering method via the `renderer` option.

For a advanced usage, you can set a general rendering method via [Props Config](/en-US/guide/global-config) or `Confirm.defaults` property.

:::

## API

### Preset Types

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
  raw: Record<any, any>
}

type ConfirmRenderFn = (options: ConfirmState, confirm: () => Promise<void>, cancel: () => void) => any
```

### Confirm Options

| Name            | Type                                            | Description                                                                                                  | Default          | Since    |
| --------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------- | -------- |
| title           | `string`                                        | Then title of the confirm                                                                                    | `''`             | `2.0.15` |
| content         | `string`                                        | The prompt content of the confirm                                                                            | `''`             | -        |
| className       | `ClassType`                                     | The custom class name for the confirm                                                                        | `null`           | -        |
| style           | `StyleType`                                     | Inline style for the confirm                                                                                 | `null`           | -        |
| confirmType     | `ConfirmButtonType`                             | Confirm button type                                                                                          | `'primary'`      | -        |
| cancelType      | `ConfirmButtonType`                             | Cancel button type                                                                                           | `'default'`      | `2.1.30` |
| confirmText     | `string`                                        | The content of the confirm button                                                                            | `locale.confirm` | -        |
| cancelText      | `string`                                        | The content of the cancel button                                                                             | `locale.cancel`  | -        |
| maskClose       | `boolean`                                       | Whether be closed by the mask                                                                                | `false`          | -        |
| icon            | `boolean \| Record<string, any> \| (() => any)` | The icon of the confirm, rendered as the render function when passed in the function                         | `null`           | -        |
| iconProps       | `IconProps`                                     | The color of the icon of the confirm                                                                         | `''`             | -        |
| onBeforeConfirm | `() => unknown`                                 | Set the callback before confirm, supports async function and `Promise`, returns `false` will prevent closing | `null`           | -        |
| renderer        | `ConfirmRenderFn`                               | Use render function to render custom renderer                                                                | `null`           | -        |
| parseHtml       | `boolean`                                       | Whether to parse content as html                                                                             | `false`          | `2.0.14` |
| closable        | `boolean`                                       | Whether to have a close button                                                                               | `false`          | `2.0.15` |
| contentAlign    | `ConfirmAlign`                                  | Alignment of content                                                                                         | `'center'`       | `2.0.15` |
| actionsAlign    | `ConfirmAlign`                                  | Alignment of action buttons                                                                                  | `'center'`       | `2.0.15` |
| cancelable      | `boolean`                                       | Whether can be canceled                                                                                      | `true`           | `2.2.6`  |
