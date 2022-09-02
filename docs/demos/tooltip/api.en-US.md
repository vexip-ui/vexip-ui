### Tooltip Props

| Name            | Type                                                              | Description                                                                                    | Default      | Since   |
| --------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------ | ------- |
| visible         | `boolean`                                                         | The display state of the tip, you can use `v-model` two-way binding                            | `false`      | -       |
| trigger         | `'hover' \| 'click' \| 'focus' \| 'custom'`                       | The trigger method of the tooltip, when it is `custom`, it need to manually controll `visible` | `'hover'`    | -       |
| placement       | `Placement`                                                       | The position where the tip appears, the optional value is the same as Popper.js                | `'top'`      | -       |
| outside-close   | `boolean`                                                         | Set whether to close by clicking outside                                                       | `true`       | -       |
| no-hover        | `boolean`                                                         | Set whether to make the tip unhoverable                                                        | `false`      | -       |
| tip-class       | `ClassType`                                                       | Custom class name for the tip                                                                  | `null`       | -       |
| tip-style       | `StyleType`                                                       | Custom styles for the tip                                                                      | `null`       | `2.0.0` |
| disabled        | `boolean`                                                         | Set whether to disable                                                                         | `false`      | -       |
| reverse         | `boolean`                                                         | Set whether to use reverse theme                                                               | `false`      | `2.0.0` |
| transfer        | `boolean \| string`                                               | Set the rendering place of tip. When set to `true`, it will render to `<body>` by default      | `false`      | -       |
| transition-name | `string`                                                          | Set the transition to show and hide the tip                                                    | `'vxp-fade'` | -       |
| wrapper         | `boolean \| string`                                               | Set whether to render a wrappering element                                                     | `false`      | `2.0.0` |
| no-arrow        | `boolean`                                                         | Set whether to disable arrow of tip                                                            | `false`      | `2.0.0` |
| raw             | `boolean`                                                         | Set whether to render tip without internal styles                                              | `false`      | `2.0.0` |
| tip-alive       | `boolean`                                                         | Set whether the tip will not be removed when hidden                                            | `false`      | `2.0.0` |
| width           | `number \| 'trigger' \| 'auto'`                                   | Set the width of the tip, can using trigger width when be set to `'trigger'`                   | `'auto'`     | `2.0.0` |
| virtual         | `{ $el: HTMLElement } \| HTMLElement \| { x: number, y: number }` | Set the virtual reference                                                                      | `null`       | `2.0.0` |

### Tooltip Events

| Name          | Description                                                                         | Parameters           | Since |
| ------------- | ----------------------------------------------------------------------------------- | -------------------- | ----- |
| toggle        | Emitted when the display state of the tip changes, returns the current state        | `(visible: boolean)` | -     |
| tip-enter     | Emitted when the mouse moves into the tip, no return value                          | -                    | -     |
| tip-leave     | Emitted when the mouse moves out of the tip, no return value                        | -                    | -     |
| click-outside | Emitted when the outside of the element is clicked, no return value                 | -                    | -     |
| outside-close | Emitted when the tooltip is closed by clicking outside the element, no return value | -                    | -     |

### Tooltip Slots

| Name    | Description                                       | Parameters | Since |
| ------- | ------------------------------------------------- | ---------- | ----- |
| default | The slot that triggers the content of the balloon | -          | -     |
| tip     | Slot for the content of the balloon               | -          | -     |
