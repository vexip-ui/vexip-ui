### Result Props

| Name        | Type                                          | Description                                                                           | Default     | Since |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------------------------- | ----------- | ----- |
| type        | `'info' \| 'success' \| 'warning' \| 'error'` | Set the type of result icon, not effect when using the `icon` prop or the `icon` slot | `'info'`    | -     |
| size        | `'small' \| 'default' \| 'large'`             | Set the size of the result, which will affect the icon and font size in it            | `'default'` | -     |
| title       | `string`                                      | Set the title of the result, it will be invalid after using the same name slot        | `''`        | -     |
| description | `string`                                      | Set the description of the result, it will be invalid after using the same name slot  | `''`        | -     |
| icon        | `Record<string, any>`                         | Set the custom icon                                                                   | `''`        | -     |
| icon-color  | `string`                                      | Set the color of the result icon                                                      | `''`        | -     |

### Result Slots

| Name        | Description                                                        | Parameters | Since |
| ----------- | ------------------------------------------------------------------ | ---------- | ----- |
| icon        | The slot for the icon, you can put any content                     | -          | -     |
| title       | The slot for title                                                 | -          | -     |
| description | The slot for description                                           | -          | -     |
| extra       | The slot for extra content, usually some action buttons are placed | -          | -     |
