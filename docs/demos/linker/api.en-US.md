### Linker Props

| Name      | Type                                                                    | Description                                           | Default     |
| --------- | ----------------------------------------------------------------------- | ----------------------------------------------------- | ----------- |
| to        | `string`                                                                | Destination address of the link                       | `null`      |
| type      | `'default' \| 'primary' \| 'success' \| 'error' \| 'warning' \| 'info'` | The types of link                                     | `'default'` |
| icon      | `Record<string, any>`                                                   | Prefix icon of link                                   | `null`      |
| underline | `boolean`                                                               | Set whether display underline when hover              | `false`     |
| disabled  | `boolean`                                                               | Set whether is disabled                               | `false`     |
| target    | `string`                                                                | ame as the `target` attribute of the native `<a>` tag | `'_blank'`  |

### Linker Events

| Name  | Description                                          | Parameters            |
| ----- | ---------------------------------------------------- | --------------------- |
| click | Triggered when left clicked, returns the click event | `(event: MouseEvent)` |

### Linker Slots

| Name    | Description              | Parameters |
| ------- | ------------------------ | ---------- |
| default | Content slot of link     | -          |
| icon    | Prefix icon slot of link | -          |
