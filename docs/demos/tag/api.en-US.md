### Tag Props

| Name     | Type                                                                                                                                                              | Description                                                                                        | Default     | Since |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------- | ----- |
| type     | `'default' \| 'primary' \| 'success' \| 'error' \| 'warning' \| 'lime' \| 'pink' \| 'magenta' \| 'tomato' \| ' orange' \| 'cyan' \| 'navy' \| 'gold' \| 'purple'` | Set the type of label, including state type and color type                                         | `'default'` | -     |
| size     | `'small' \| 'default' \| 'large'`                                                                                                                                 | The size of the label, unlike other components, this property will also change the label font size | `'default'` | -     |
| border   | `boolean`                                                                                                                                                         | Set whether the label has a border                                                                 | `false`     | -     |
| closable | `boolean`                                                                                                                                                         | Set whether the label has a close function                                                         | `false`     | -     |
| color    | `string`                                                                                                                                                          | Set the custom color of the label, which takes precedence over the `type` preset type              | `null`      | -     |
| simple   | `boolean`                                                                                                                                                         | Set whether the label is in simple mode                                                            | `false`     | -     |
| circle   | `boolean`                                                                                                                                                         | Set whether the label is a rounded label                                                           | `false`     | -     |

### Tag Events

| Name  | Description                                                                         | Parameters | Since |
| ----- | ----------------------------------------------------------------------------------- | ---------- | ----- |
| close | Emitted when the tab can be closed and the close button is clicked, no return value | -          | -     |

### Tag Slots

| Name    | Description            | Parameters | Since |
| ------- | ---------------------- | ---------- | ----- |
| default | Slot for label content | -          | -     |
