### Badge Props

| Name     | Type             | Description                                                                                  | Default  | Since |
| -------- | ---------------- | ------------------------------------------------------------------------------------- | ------- | --- |
| content | `number \| string` | The content of the logo | `null` | - |
| max | `number` | When the logo is a number, you can set the maximum value, after the maximum value is exceeded, it will be displayed as `` `${max}+` `` | `0` | - |
| disabled | `boolean` | Set whether the logo is disabled, no content will be displayed when disabled | `false` | - |
| is-dot | `boolean` | Set whether the logo is a status dot | `false` | - |
| type | `'error' \| 'primary' \| 'success' \| 'warning' \| 'info' \| 'disabled'` | Set the type of logo | `'error'` | - |
| color | `String` | Set the color of the logo, can be used when the built-in type cannot meet the needs | `null` | - |

### Badge Events

| Name           | Description                       | Parameters | Since |
| -------------- | -------------------------- | ---- | --- |
| badge-click | Emitted when the logo is clicked, no return value | - | - |

### Badge Slots

| Name    | Description                   | Parameters | Since |
| ------- | ---------------------- | ---- | --- |
| default | Content slot where logo needs to be set | - | - |
| content | Content slot for logo | - | - |
