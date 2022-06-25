### Tooltip Props

| Name            | Type              | Description                                                                                                      | Default     | Since |
| --------------- | ----------------- | --------------------------------------------------------------------------------------------------------- | ---------- | --- |
| visible | `boolean` | The display state of the bubble box, you can use `v-model` two-way binding | `false` | - |
| trigger | `'hover' \| 'click' \| 'custom'` | The trigger method of the drop-down menu, when it is `custom`, all scenarios need to be manually controlled `visible` | `'hover'` | - |
| placement | `Placement` | The position where the bubble box appears, the optional value is the same as Popper.js | `'top'` | - |
| outside-close | `boolean` | Set whether to close by clicking outside | `true` | - |
| no-hover | `boolean` | Set whether to make the balloon unhoverable | `false` | - |
| tip-class | `string` \| Object | Custom class name for the content of the balloon | `null` | - |
| disabled | `boolean` | Sets whether to disable the bubble, after which nothing will be displayed | `false` | - |
| theme | `'light' \| 'dark'` | set the theme of the bubble | `'light'` | - |
| transfer | `boolean \| string` | Set the rendering position of the bubble. When set to `true`, it will render to `<body>` by default | `false` | - |
| transition-name | `string` | Sets the transition to show and hide the bubble | `'vxp-fade'` | - |

### Tooltip Events

| Name             | Description                                                 | Parameters    | Since |
| ---------------- | ---------------------------------------------------- | ------- | --- |
| toggle | Emitted when the display state of the bubble box changes, returns the current state | `(visible: boolean)` | - |
| tip-enter | Emitted when the mouse moves into the bubble, no return value | - | - |
| tip-leave | Emitted when the mouse moves out of the bubble, no return value | - | - |
| click-outside | Emitted when the outside of the element is clicked, no return value | - | - |
| outside-close | Emitted when the drop-down menu is closed by clicking outside the element, no return value | - | - |

### Tooltip Slots

| Name    | Description                 | Parameters | Since |
| ------- | -------------------- | --- | --- |
| default | The slot that triggers the content of the balloon | - | - |
| tip | Slot for the content of the balloon | - | - |
