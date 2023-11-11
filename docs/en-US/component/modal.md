# Modal

Modal, place what you want.

## Demos

:::demo modal/basis

### Basis Usage

The simplest usage is to control the `active` prop through two-way binding to control the display of the modal box.

:::

:::demo modal/long-content

### Long Content

Can be used in combination with scroll component when the content is too long.

:::

:::demo modal/custom-action

### Adjust Buttons

^[Since v2.2.6](!s)

The confirm and cancel button types can be specified via the `confirm-type` and `cancel-type` props respectively.

The size of the confirm and cancel buttons can be modified via the `action-size` prop.

:::

:::demo modal/hide-mask

### Hide Mask

Add `hide-mask` prop to turn off the modal's masking effect.

:::

:::demo modal/drag

### Draggable

Add the `draggable` prop to enable dragging of modals.

:::

:::demo modal/loading

### Loading State

Add the `loading` prop to make the confirm button appear loading, usually used with `on-before-close`.

:::

:::demo modal/resize

### Adjust Size

Add the `resizable` prop to enable resizing of the modal box.

:::

:::demo modal/inner

### Inner Drawer

Adding the `inner` prop enables the modal to be positioned according to the nearest element with the positioned attribute, thus implementing a inner modal.

:::

:::demo modal/simple

### Simple Modal

The modal header can be hidden by not setting the `title` prop and the slot with the same name.

Add the `no-footer` prop to disable the modal's default bottom action bar.

:::

:::demo modal/undivided

### Undivided

^[Since v2.2.6](!s)

Adding the `undivided` prop removes the dividing lines between parts of the modal.

:::

:::demo modal/position

### Custom Position

Modal component has three properties in the vertical and horizontal directions: `top`, `bottom`, `height` and `left`, `right`, `width`.

Both directions can customize the spatial relationship of the modal by setting two properties.

:::

:::demo modal/hook

### Hook Method

Modal component provides a static `open` method that can directly create a disposable modal.

Or you can directly import `useModal` and use it as in the example.

:::

## API

### Preset Types

```ts
interface ModalSlotParams {
  dragging: boolean,
  resizing: boolean,
  handleResize: () => void,
  handleConfirm: () => void,
  handleCancel: () => void,
  handleClose: (isConfirm?: boolean) => Promise<unknown>
}
```

### Modal Props

| Name            | Type                              | Description                                                                                                                                                                                                             | Default          | Since    |
| --------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| active          | `boolean`                         | Set whether to display the modal, you can use `v-model` two-way binding                                                                                                                                                 | `false`          | -        |
| width           | `number \| string`                | Set the initial width of the modal, will automatically calculate when it is `'auto'`                                                                                                                                    | `'auto'`         | -        |
| height          | `number \| string`                | Set the initial height of the modal, will automatically calculate when it is `'auto'`                                                                                                                                   | `'auto'`         | -        |
| top             | `number \| string`                | Set the initial distance from the top of the modal, will automatically calculate when it is `'auto'`                                                                                                                    | `'auto'`         | -        |
| left            | `number \| string`                | Set the initial distance from the left side of the modal, will automatically calculate when it is `'auto'`                                                                                                              | `'auto'`         | -        |
| bottom          | `number \| string`                | Set the initial distance from the bottom of the modal, will automatically calculate when it is `'auto'`                                                                                                                 | `'auto'`         | -        |
| right           | `number \| string`                | Set the initial distance from the right side of the modal, will automatically calculate when it is `'auto'`                                                                                                             | `'auto'`         | -        |
| title           | `string`                          | Set the title of the modal                                                                                                                                                                                              | `''`             | -        |
| closable        | `boolean`                         | Set whether to display a close button                                                                                                                                                                                   | `true`           | -        |
| mask-close      | `boolean`                         | Set whether the mask layer can be closed by clicking                                                                                                                                                                    | `true`           | -        |
| inner           | `boolean`                         | Set whether it is an inline modal, after opening, the positioning will change from fixed to absolute                                                                                                                    | `false`          | -        |
| modal-class     | `ClassType`                       | Custom class name of the modal                                                                                                                                                                                          | `null`           | -        |
| no-footer       | `boolean`                         | Set whether to disable the bottom action buttons                                                                                                                                                                        | `false`          | -        |
| hide-mask       | `boolean`                         | Set whether to hide the mask layer                                                                                                                                                                                      | `false`          | -        |
| transfer        | `boolean \| string`               | Set the rendering position of the modal. When set to `true`, it will render to `<body>` by default                                                                                                                      | `false`          | -        |
| on-before-close | `(isConfirm: boolean) => any`     | Set the callback before the modal closes, receive a flag to distinguish whether to confirm or cancel the triggered close, supports asynchronous functions and Promise, the return value is `false` will prevent closing | `null`           | -        |
| draggable       | `boolean`                         | Set whether the modal is draggable                                                                                                                                                                                      | `false`          | -        |
| resizable       | `boolean`                         | Set whether the modal can be resized                                                                                                                                                                                    | `false`          | -        |
| loading         | `boolean`                         | Set whether the confirm button of the modal is in the loading state                                                                                                                                                     | `false`          | -        |
| min-width       | `number`                          | Set the minimum width of the modal, mainly used to set `resizable`                                                                                                                                                      | `150`            | -        |
| min-height      | `number`                          | Set the minimum height of the modal, mainly used to set `resizable`                                                                                                                                                     | `120`            | -        |
| confirm-text    | `string`                          | Set text of the confirm button                                                                                                                                                                                          | `locale.confirm` | -        |
| cancel-text     | `string`                          | Set text of the cancel button                                                                                                                                                                                           | `locale.cancel`  | -        |
| locale          | `LocaleConfig['modal']`           | Set the locale config                                                                                                                                                                                                   | `null`           | `2.1.0`  |
| auto-remove     | `boolean`                         | Set whether to automatically remove when not active                                                                                                                                                                     | `false`          | `2.0.13` |
| confirm-type    | `ButtonType`                      | Set the confirm button type                                                                                                                                                                                             | `'primary'`      | `2.2.6`  |
| cancel-type     | `ButtonType`                      | Set the cancel button type                                                                                                                                                                                              | `'default'`      | `2.2.6`  |
| action-size     | `'small' \| 'default' \| 'large'` | Set size of the confirm and cancel buttons                                                                                                                                                                              | `'small'`        | `2.2.6`  |
| undivided       | `boolean`                         | Remove the dividing lines between parts of the modal                                                                                                                                                                    | `false`          | `2.2.6`  |
| x-offset        | `number`                          | Set the horizontal offset of the modal, which do not effect the position props                                                                                                                                          | `0`              | `2.2.11` |
| y-offset        | `number`                          | Set the vertical offset of the modal, which do not effect the position props                                                                                                                                            | `0`              | `2.2.11` |

### Modal Events

| Name         | Description                                                                                             | Parameters                                  | Since |
| ------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ----- |
| toggle       | Emitted when the active state of the modal changes, returns the current active state                    | `(active: boolean)`                         | -     |
| confirm      | Emitted when the bottom confirm button is clicked                                                       | -                                           | -     |
| cancel       | Emitted when the cancel button at the bottom is clicked                                                 | -                                           | -     |
| close        | Emitted when the close function is used to trigger the close                                            | -                                           | -     |
| show         | When the modal is opened, emitted after the transition effect ends                                      | -                                           | -     |
| hide         | When the modal is closed, the transition effect ends, it is emitted when it disappears completely       | -                                           | -     |
| drag-start   | Emitted when dragging is about to start                                                                 | `(position: { top: number, left: number })` | -     |
| drag-move    | Emitted when dragging, returns an object containing position information                                | `(position: { top: number, left: number })` | -     |
| drag-end     | Emitted when the drag is finished                                                                       | `(position: { top: number, left: number })` | -     |
| resize-start | Emitted when the modal is about to start resize                                                         | `(size: { width: number, height: number })` | -     |
| resize-move  | Emitted when the modal is being resized, returns an object containing the width and height of the modal | `(size: { width: number, height: number })` | -     |
| resize-end   | Emitted when the modal finishes resize                                                                  | `(size: { width: number, height: number })` | -     |

### Modal Slots

| Name    | Description                     | Parameters        | Since |
| ------- | ------------------------------- | ----------------- | ----- |
| default | The content slot for modal      | `ModalSlotParams` | -     |
| title   | The title slot for modal        | `ModalSlotParams` | -     |
| close   | The close action slot for modal | `ModalSlotParams` | -     |
| header  | The header slot for modal       | `ModalSlotParams` | -     |
| footer  | The footer slot for modal       | `ModalSlotParams` | -     |
