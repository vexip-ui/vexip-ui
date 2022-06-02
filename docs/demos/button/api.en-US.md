### Button Props

| Name         | Type                                                                    | Description                                                                            | Default     | Since |
| ------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------- | ----- |
| type         | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | Set the button type                                                                    | `'default'` | -     |
| simple       | `boolean`                                                               | Once set, the button will change to a minimalist style in light colors                 | `false`     | -     |
| ghost        | `boolean`                                                               | Once set, the button will be styled with a transparent background color                | `false`     | -     |
| text         | `boolean`                                                               | Set whether it is a text button                                                        | `false`     | `2.0.0`     |
| dsahed       | `boolean`                                                               | Set whether it is a dashed button                                                      | `false`     | `2.0.0`     |
| size         | `'small' \| 'default' \| 'large'`                                       | The size of the button                                                                 | `'default'` | -     |
| disabled     | `boolean`                                                               | Set whether it is a disabled button                                                    | `false`     | -     |
| loading      | `boolean`                                                               | Set whether it is a loading button                                                     | `false`     | -     |
| circle       | `boolean`                                                               | Set whether it is a circular button                                                    | `false`     | -     |
| icon         | `Record<string, any>`                                                   | Auxiliary icon of the button, it will switch to the loading icon when loading          | `''`        | -     |
| loading-icon | `string`                                                                | Icon displayed when loading state, with pulse effect                                   | `'spinner'` | -     |
| loading-spin | `boolean`                                                               | After set, the original pulse effect of the loading icon will be displaced and rotated | `false`     | -     |
| button-type  | `string`                                                                | Set the type property of the native button                                             | `'button'`  | -     |
| block        | `boolean`                                                               | Whether it is a block-level element, the width becomes 100% after setting              | `false`     | -     |
| color        | `string`                                                                | Set the major color of the button                                                      | `null`      | `2.0.0`     |

### Button Events

| Name  | Description                                                                 | Parameters            | Since |
| ----- | --------------------------------------------------------------------------- | --------------------- | ----- |
| click | Triggered when the button is left clicked, returns the clicked event object | `(event: MouseEvent)` | -     |

### Button Slots

| Name    | Description                                                            | Parameters | Since |
| ------- | ---------------------------------------------------------------------- | ---------- | ----- |
| default | Content slot for button                                                | -          | -     |
| loading | Loading icon slot, used when you need more custom loading icon effects | -          | -     |
