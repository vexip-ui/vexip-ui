### Drawer Props

| Name         | Type              | Description                                                                                            | Default  | Since |
| ------------ | ----------------- | ----------------------------------------------------------------------------------------------- | ------- | --- |
| active | `boolean` | Set whether the drawer is active | `false` | - |
| placement | `'top' \| 'right' \| 'bottom' \| 'left'` | Set the orientation of the drawer | `'right'` | - |
| width | `number` | When placement is `right` or `left`, it is used to set the width of the drawer, no unit, when it is less than `100`, it will be set as a percentage width | `280` | - |
| height | `number` | When placement is `top` or `bottom`, it is used to set the width of the drawer, unitless, when it is less than `100`, it will be set as a percentage height | `280` | - |
| title | `string` | Set the title of the drawer, it is invalid after using the title slot | `''` | - |
| closable | `boolean` | Set whether the drawer has a close function, a close button will be added when it is opened | `false` | - |
| inner | `boolean` | Set whether it is an inline drawer, after opening, the positioning will change from fixed to absolute | `false` | - |
| mask-close | `boolean` | Set whether to close the drawer by clicking on the mask layer | `true` | - |
| drawer-class | `string \| Record<string, boolean>` | Class name that defines the drawer container | `null` | - |
| hide-mask | `boolean` | Set whether to hide the mask layer | `false` | - |
| transfer | `boolean \| string` | Set the rendering position of the drawer, when set to `true`, it will render to `<body>` by default | `false` | - |
| on-before-close | `() => any` | Set the drawer's callback before closing, supports asynchronous functions and promises, the return value of `false` will prevent closing | `null` | - |
| resizable | `boolean` | Set whether the drawer can be resized, the width can be changed when it is a left and right drawer, and the height can be changed when it is a top and bottom drawer | `false` | - |

### Drawer Events

| Name            | Description                                                   | Parameters              | Since |
| --------------- | ------------------------------------------------------ | ----------------- | --- |
| toggle | Emitted when the active state of the drawer changes, returns the current active state | `(active: boolean)` | - |
| close | Emitted when the close function is used to trigger the close (including the closing of the mask layer), no return value | - | - |
| show | When the drawer is opened, emitted after the transition effect ends, no return value | - | - |
| hide | When the drawer is closed, emitted after the transition effect ends, no return value | - | - |
| resize-start | Emitted when the drawer is about to start resize, no return value | - | - |
| resize-move | Emitted when the drawer is being resized, returns an object containing the width and height of the drawer | `(rect: { width: number, height: number })` | - |
| resize-end | Emitted when the drawer has finished resize, no return value | `(rect: { width: number, height: number })` | - |

### Drawer Slots

| Name    | Description                                                       | Parameters | Since |
| ------- | ---------------------------------------------------------- | --- | --- |
| default | Content slot for drawer | - | - |
| title | Title slot for drawer | - | - |
| close | Close button slot for drawer | - | - |
| handler | Slot for drawer resize handle | - | - |
