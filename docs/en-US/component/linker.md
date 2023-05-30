# Linker

## Demos

:::demo linker/basis

### Basis Usage

Setting the `type` prop can generate different types of links.

:::

:::demo linker/disabled

### Disabled

Add the `disabled` prop to disable the link.

:::

:::demo linker/icon

### Add Icon

Use the `icon` prop or slot with the same name to add a prefix icon to a link.

:::

:::demo linker/underline

### Underline

Added the `underline` prop to display the underline when the hover a link.

:::

## API

### Linker Props

| Name      | Type                                                                    | Description                                           | Default     | Since |
| --------- | ----------------------------------------------------------------------- | ----------------------------------------------------- | ----------- | ----- |
| to        | `string`                                                                | Destination address of the link                       | `null`      | -     |
| type      | `'default' \| 'primary' \| 'success' \| 'error' \| 'warning' \| 'info'` | The types of link                                     | `'default'` | -     |
| icon      | `Record<string, any>`                                                   | Prefix icon of link                                   | `null`      | -     |
| underline | `boolean`                                                               | Set whether display underline when hover              | `false`     | -     |
| disabled  | `boolean`                                                               | Set whether is disabled                               | `false`     | -     |
| target    | `string`                                                                | ame as the `target` attribute of the native `<a>` tag | `'_blank'`  | -     |

### Linker Events

| Name  | Description                                        | Parameters            | Since |
| ----- | -------------------------------------------------- | --------------------- | ----- |
| click | Emitted when left clicked, returns the click event | `(event: MouseEvent)` | -     |

### Linker Slots

| Name    | Description              | Parameters | Since |
| ------- | ------------------------ | ---------- | ----- |
| default | Content slot of link     | -          | -     |
| icon    | Prefix icon slot of link | -          | -     |
