### Confirm Options

| Name          | Type                         | Description                                                                                   | Default    | Since |
| ------------- | ---------------------------- | -------------------------------------------------------------------------------------- | --------- | --- |
| content | `string` | The prompt content of the confirm | `''` | - |
| style | `Record<string, any>` | Inline style for the confirm | `null` | - |
| parseHtml | `boolean` | Whether to parse html, if enabled, the content of `content` will be parsed as html | `false` | - |
| confirmType | `'default' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'error'` | Confirm button type | `'primary'` | - |
| confirmText | `string` | The content of the confirm button | `locale.confirm` | - |
| cancelText | `string` | The content of the cancel button | `locale.cancel` | - |
| icon | `Record<string, any> \| (() => any)` | The icon of the confirm, rendered as the render function when passed in the function | `null` | - |
| iconColor | `string` | The color of the icon of the confirm | `''` | - |
| onBeforeConfirm | `() => unknown` | Set the callback before confirm, supports async function and `Promise`, returns `false` will prevent closing | `null` | - |
| renderer | `() => any` | Use render function to render custom renderer | `null` | - |
