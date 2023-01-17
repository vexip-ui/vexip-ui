### Result Props

| Name        | Type                                          | Description                                                                          | Default     | Since |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------------------------ | ----------- | ----- |
| type        | `'info' \| 'success' \| 'warning' \| 'error'` | The type of result icon                                                              | `'info'`    | -     |
| size        | `'small' \| 'default' \| 'large'`             | The size of the result                                                               | `'default'` | -     |
| title       | `string`                                      | Set the title of the result, it will be invalid after using the same name slot       | `''`        | -     |
| description | `string`                                      | Set the description of the result, it will be invalid after using the same name slot | `''`        | -     |
| icon        | `Record<string, any>`                         | customize icons, prioritize over type                                                | `''`        | -     |
| icon-color  | `string`                                      | Set the color of the result icon                                                     | `''`        |

### Result Slots

| Name        | Description                                                  | Parameters | Since |
| ----------- | ------------------------------------------------------------ | ---------- | ----- |
| icon        | Customize icons or other content                             | -          | -     |
| title       | Customized title content                                     | -          | -     |
| description | Customized description content                               | -          | -     |
| extra       | Customize extra content, usually placing some action buttons | -          | -     |
