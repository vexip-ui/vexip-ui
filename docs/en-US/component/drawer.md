# Drawer

Drawer is a great option when you want to make something fly in from the sides of the screen.

## Demos

:::demo drawer/basis

### Basis Usage

Simple usage, control the `active` prop through two-way binding to control the display of the drawer, and click the mask area to close the drawer.

:::

:::demo drawer/inner

### Inner Drawer

Adding the `inner` prop enables the drawer to be positioned according to the nearest element with the positioned attribute, thus implementing a inner drawer.

:::

:::demo drawer/nesting

### Nesting Usage

In the content slot of the drawer, a new drawer can be opened, which can solve the situation that the content needs to be multi-layered and multi-branched.

:::

:::demo drawer/position

### Custom Placement

Set the `placement` prop to `top`, `right`, `bottom`, `left` to customize the position of the drawer.

:::

:::demo drawer/long-content

### Long Content

Can be used in combination with scroll component when the content is too long.

:::

:::demo drawer/hide-mask

### Hide Mask

Add `hide-mask` prop to turn off the drawer's masking effect.

After turning off the mask effect, don't forget to provide other ways to turn it off.

:::

:::demo drawer/footer

### Add Footer

Add the `footer` prop to quickly add feet, or you can directly use the slot of the same name.

:::

:::demo drawer/custom-action

### Adjust Buttons

^[Since v2.2.6](!s)

The confirm and cancel button types can be specified via the `confirm-type` and `cancel-type` props respectively.

The size of the confirm and cancel buttons can be modified via the `action-size` prop.

:::

:::demo drawer/resize

### Resizable

Add the `resizable` prop to enable resizing of the drawer.

Move the mouse to the edge of the drawer and a handle will appear. The width of the drawer in the left and right directions can be adjusted, and the height of the drawer in the up and down direction can be adjusted.

:::

## API

### Drawer Props

| Name            | Type                                        | Description                                                                                                                                                          | Default          | Since    |
| --------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------- |
| active          | `boolean`                                   | Set whether the drawer is active                                                                                                                                     | `false`          | -        |
| placement       | `'top' \| 'right' \| 'bottom' \| 'left'`    | Set the orientation of the drawer                                                                                                                                    | `'right'`        | -        |
| width           | `` number \| `${number}` \| `${number}%` `` | When placement is `right` or `left`, it is used to set the width of the drawer, can pass a percentage value                                                          | `280`            | -        |
| height          | `` number \| `${number}` \| `${number}%` `` | When placement is `top` or `bottom`, it is used to set the width of the drawer, can pass a percentage value                                                          | `280`            | -        |
| title           | `string`                                    | Set the title of the drawer, it is invalid after using the title slot                                                                                                | `''`             | -        |
| closable        | `boolean`                                   | Set whether the drawer has a close function, a close button will be added when it is opened                                                                          | `false`          | -        |
| inner           | `boolean`                                   | Set whether it is an inline drawer, after opening, the positioning will change from fixed to absolute                                                                | `false`          | -        |
| mask-close      | `boolean`                                   | Set whether to close the drawer by clicking on the mask layer                                                                                                        | `true`           | -        |
| drawer-class    | `ClassType`                                 | Class name that defines the drawer container                                                                                                                         | `null`           | -        |
| hide-mask       | `boolean`                                   | Set whether to hide the mask layer                                                                                                                                   | `false`          | -        |
| transfer        | `boolean \| string`                         | Set the rendering position of the drawer, when set to `true`, it will render to `<body>` by default                                                                  | `false`          | -        |
| on-before-close | `(isConfirm?: boolean) => any`              | Set the drawer's callback before closing, supports asynchronous functions and promises, the return value of `false` will prevent closing                             | `null`           | -        |
| resizable       | `boolean`                                   | Set whether the drawer can be resized, the width can be changed when it is a left and right drawer, and the height can be changed when it is a top and bottom drawer | `false`          | -        |
| footer          | `boolean`                                   | whether to add footer with action buttons                                                                                                                            | `false`          | `2.0.0`  |
| loading         | `boolean`                                   | Set whether the confirm button of the drawer is in the loading state                                                                                                 | `false`          | `2.0.0`  |
| confirm-text    | `string`                                    | Confirm button content                                                                                                                                               | `locale.confirm` | `2.0.0`  |
| cancel-text     | `string`                                    | Cancel button content                                                                                                                                                | `locale.cancel`  | `2.0.0`  |
| locale          | `LocaleConfig['drawer']`                    | Set the locale config                                                                                                                                                | `null`           | `2.1.0`  |
| auto-remove     | `boolean`                                   | Set whether to automatically remove when not active                                                                                                                  | `false`          | `2.0.13` |
| confirm-type    | `ButtonType`                                | Set the confirm button type                                                                                                                                          | `'primary'`      | `2.2.6`  |
| cancel-type     | `ButtonType`                                | Set the cancel button type                                                                                                                                           | `'default'`      | `2.2.6`  |
| action-size     | `'small' \| 'default' \| 'large'`           | Set size of the confirm and cancel buttons                                                                                                                           | `'small'`        | `2.2.6`  |

### Drawer Events

| Name         | Description                                                                                               | Parameters                                  | Since   |
| ------------ | --------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------- |
| toggle       | Emitted when the active state of the drawer changes, returns the current active state                     | `(active: boolean)`                         | -       |
| close        | Emitted when the close function is used to trigger the close (including the closing of the mask layer)    | `(isConfirm: boolean)`                      | -       |
| show         | When the drawer is opened, emitted after the transition effect ends                                       | -                                           | -       |
| hide         | When the drawer is closed, emitted after the transition effect ends                                       | -                                           | -       |
| resize-start | Emitted when the drawer is about to start resize                                                          | -                                           | -       |
| resize-move  | Emitted when the drawer is being resized, returns an object containing the width and height of the drawer | `(rect: { width: number, height: number })` | -       |
| resize-end   | Emitted when the drawer has finished resize                                                               | `(rect: { width: number, height: number })` | -       |
| confirm      | Emitted when the bottom confirm button is clicked                                                         | -                                           | `2.0.0` |
| cancel       | Emitted when the cancel button at the bottom is clicked                                                   | -                                           | `2.0.0` |

### Drawer Slots

| Name    | Description                        | Parameters              | Since   |
| ------- | ---------------------------------- | ----------------------- | ------- |
| default | The content slot for drawer        | -                       | -       |
| title   | The title slot for drawer          | -                       | -       |
| close   | The close action slot for drawer   | -                       | -       |
| handler | The resize handler slot for drawer | `{ resizing: boolean }` | -       |
| footer  | The footer slot for drawer         | -                       | `2.0.0` |
