# Alert

## Demos

Provide a static alert, showing the content that needs attention, it will not disappear automatically, and can be closed by the user by clicking.

:::demo alert/basis

### Basis Usage

Create different types of alerts by setting the `type` prop to info, success, warning, error.

:::

:::demo alert/carousel

### Carousel Content

This example shows how to make a carousel content in Alert with the Carousel component.

:::

:::demo alert/closable

### Closable

Add the `closable` prop to display a close button, click the close button to close the alert.

:::

:::demo alert/close

### Custom Close

Use the `close` slot to customize the content of the close button.

:::

:::demo alert/colorful-text

### Colorful Text

Add the `colorful-text` prop to make the alert text colored accordingly.

:::

:::demo alert/icon

### Show Icon

Add the `icon` prop to display the icon. If you specify an icon component, the specified icon will be used.

:::

:::demo alert/no-border

### No Border

Add the `no-border` prop to disable borders, making it visually lighter in some light-toned themes.

:::

:::demo alert/scroll

### Auto Scroll

Adding the `scroll` prop makes the content scroll automatically, and the scroll speed can be changed with the `scroll-speed` prop.

:::

:::demo alert/title

### With Title

When you need to add a brief summary to the alert, you can set the `title` prop or slot with the same name to add a title.

:::

## API

### Alert Props

| Name          | Type                                          | Description                                                                                                  | Default  | Since   |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------- | ------- |
| type          | `'info' \| 'success' \| 'warning' \| 'error'` | The type of warning                                                                                          | `'info'` | -       |
| title         | `string`                                      | Set the title of the warning message, it will be invalid after using the same name slot                      | `''`     | -       |
| colorful-text | `boolean`                                     | Set whether the font has the same color as the type                                                          | `false`  | -       |
| icon          | `boolean \| Record<string, any>`              | Set whether to display the icon, you can directly pass the icon to display                                   | `false`  | -       |
| closable      | `boolean`                                     | Set whether the warning can be closed                                                                        | `false`  | -       |
| icon-color    | `string`                                      | Set the color of the alert icon                                                                              | `''`     | -       |
| no-border     | `boolean`                                     | Set whether to disable the border of the warning prompt                                                      | `false`  | -       |
| banner        | `boolean`                                     | Set whether to use as the form of the top announcement, the style will be adjusted accordingly after opening | `false`  | -       |
| manual        | `boolean`                                     | Set to not automatically collapse when alert are closed                                                      | `false`  | `2.0.0` |
| scroll        | `boolean`                                     | Set whether the content scrolls                                                                              | `false`  | `2.0.4` |
| scroll-speed  | `number`                                      | Set the scroll speed of the content                                                                          | `1`      | `2.0.4` |

### Alert Events

| Name       | Description                                                 | Parameters | Since   |
| ---------- | ----------------------------------------------------------- | ---------- | ------- |
| close      | Emitted when the warning prompt is closed, no return value  | -          | -       |
| hide       | Emitted when the warning prompt disappears, no return value | -          | -       |
| scroll-end | Emitted every time a content scroll ends                    | -          | `2.0.4` |

### Alert Slots

| Name    | Description                                  | Parameters | Since |
| ------- | -------------------------------------------- | ---------- | ----- |
| default | Content slot for warning prompt              | -          | -     |
| title   | Title content slot for warning prompt        | -          | -     |
| icon    | Icon content slot for warning prompt         | -          | -     |
| close   | Close button content slot for warning prompt | -          | -     |
