# Masker

## Demos

:::demo masker/basis

### Basis Usage

Open the mask directly, and of course you can render something on the mask.

:::

## API

### Masker Props

| Name            | Type                        | Description                                                                                                                                     | Default      | Since    |
| --------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------- |
| active          | `boolean`                   | Set whether to display the mask, you can use `v-model` two-way binding                                                                          | `false`      | -        |
| closable        | `boolean`                   | Set whether the mask layer can be closed by clicking                                                                                            | `false`      | -        |
| inner           | `boolean`                   | Set whether it is an inline drawer, after opening, the positioning will change from fixed to absolute                                           | `false`      | -        |
| mask-transition | `string`                    | The transition name of the mask layer                                                                                                           | `'vxp-fade'` | -        |
| transition-name | `string`                    | Display layer transition name                                                                                                                   | `'vxp-fade'` | -        |
| disabled        | `boolean`                   | Set whether to disable the mask layer, this property only affects the mask layer, the display layer is not affected                             | `false`      | -        |
| on-before-close | `() => any \| Promise<any>` | Set the callback before the mask is closed, supports asynchronous functions and `Promise`, the return value of `false` will prevent the closure | `null`       | -        |
| transfer        | `boolean \| string`         | Set the rendering position of the mask, when set to `true`, it will render to `<body>` by default                                               | `false`      | -        |
| auto-remove     | `boolean`                   | Set whether to automatically remove when not active                                                                                             | `false`      | `2.0.13` |

### Masker Events

| Name   | Description                                                                                                       | Parameters          | Since |
| ------ | ----------------------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| toggle | Emitted when the active state of the mask changes, returns the current active state                               | `(active: boolean)` | -     |
| close  | Emitted when the close function is used to trigger the close, no return value                                     | -                   | -     |
| show   | When the mask is opened, emitted after the transition effect, no return value                                     | -                   | -     |
| hide   | When the mask is closed, the transition effect ends, it is emitted when it disappears completely, no return value | -                   | -     |

### Masker Slots

| Name    | Description        | Parameters          | Since |
| ------- | ------------------ | ------------------- | ----- |
| default | show layer content | `{ show: boolean }` | -     |
