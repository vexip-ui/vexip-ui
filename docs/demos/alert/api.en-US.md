### Alert Props

| Name          | Type              | Description                                                           | Default | Since |
| ------------- | ----------------- | -------------------------------------------------------------- | ------ | --- |
| type | `'info' \| 'success' \| 'warning' \| 'error'` | The type of warning | `'info'` | - |
| title | `string` | Set the title of the warning message, it will be invalid after using the same name slot | `''` | - |
| colorful-text | `boolean` | Set whether the font has the same color as the type | `false` | - |
| icon | `boolean \| Record<string, any>` | Set whether to display the icon, you can directly pass the icon to display | `false` | - |
| closable | `boolean` | Set whether the warning can be closed | `false` | - |
| icon-color | `string` | Set the color of the alert icon | `''` | - |
| no-border | `boolean` | Set whether to disable the border of the warning prompt | `false` | - |
| banner | `boolean` | Set whether to use as the form of the top announcement, the style will be adjusted accordingly after opening | `false` | - |

### Alert Events

| Name     | Description                             | Parameters | Since |
| -------- | -------------------------------- | ---- | --- |
| close | Emitted when the warning prompt is closed, no return value | - | - |
| hide | Emitted when the warning prompt disappears, no return value | - | - |

### Alert Slots

| Name    | Description                       | Parameters | Since |
| ------- | -------------------------- | --- | --- |
| default | Content slot for warning prompt | - | - |
| title | Title content slot for warning prompt | - | - |
| icon | Icon content slot for warning prompt | - | - |
| close | Close button content slot for warning prompt | - | - |
