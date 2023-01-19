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
| confirmType     | `ConfirmType`                        | Confirm button type                                                                                          | `'primary'`      | -        |
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
