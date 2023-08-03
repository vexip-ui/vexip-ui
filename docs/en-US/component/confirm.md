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

Set the `icon` prop to set the icon of the confirm.

Set the `iconColor` prop to set the color of the confirm icon.

When you need more fine-grained control of the icon, you can set `icon` as a function, it will as a custom rendering method.

:::

:::demo confirm/title

### Add Title

Setting the `title` option can add a title, so we can change the layout style.

:::

## API

### Preset Types

```ts
type ConfirmType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
type ConfirmAlign = 'left' | 'center' | 'right'
type ConfirmRenderFn = (options: ConfirmOptions, confirm: () => Promise<void>, cancel: () => void) => any
```

### Confirm Options

| Name            | Type                                 | Description                                                                                                  | Default          | Since    |
| --------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ---------------- | -------- |
| content         | `string`                             | The prompt content of the confirm                                                                            | `''`             | -        |
| className       | `ClassType`                          | The custom class name for the confirm                                                                        | `null`           | -        |
| style           | `StyleType`                          | Inline style for the confirm                                                                                 | `null`           | -        |
| confirmType     | `ConfirmButtonType`                  | Confirm button type                                                                                          | `'primary'`      | -        |
| cancelType      | `ConfirmButtonType`                  | Cancel button type                                                                                           | `'default'`      | `2.1.30` |
| confirmText     | `string`                             | The content of the confirm button                                                                            | `locale.confirm` | -        |
| cancelText      | `string`                             | The content of the cancel button                                                                             | `locale.cancel`  | -        |
| maskClose       | `boolean`                            | Whether be closed by the mask                                                                                | `false`          | -        |
| icon            | `Record<string, any> \| (() => any)` | The icon of the confirm, rendered as the render function when passed in the function                         | `null`           | -        |
| iconColor       | `string`                             | The color of the icon of the confirm                                                                         | `''`             | -        |
| onBeforeConfirm | `() => unknown`                      | Set the callback before confirm, supports async function and `Promise`, returns `false` will prevent closing | `null`           | -        |
| renderer        | `ConfirmRenderFn`                    | Use render function to render custom renderer                                                                | `null`           | -        |
| parseHtml       | `boolean`                            | Whether to parse content as html                                                                             | `false`          | `2.0.14` |
| title           | `string`                             | Then title of the confirm                                                                                    | `''`             | `2.0.15` |
| closable        | `boolean`                            | Whether to have a close button                                                                               | `false`          | `2.0.15` |
| contentAlign    | `ConfirmAlign`                       | Alignment of content                                                                                         | `'center'`       | `2.0.15` |
| actionsAlign    | `ConfirmAlign`                       | Alignment of action buttons                                                                                  | `'center'`       | `2.0.15` |
