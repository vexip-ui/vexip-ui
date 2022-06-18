### Split Props

| Name          | Type      | Description                                                                                                                              | Default | Since |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| value         | `number`  | The proportion of the left or top page, the value is between `0` ~ `1`                                                                       | `0.5`   | -     |
| min           | `number`  | Set the minimum value of the left or upper layout, when the value is between 0 ~ 1, it is a scale value, otherwise it is a pixel value   | `0.1`   | -     |
| max           | `number`  | Set the maximum value of the left or upper layout, when the value is between 0 ~ 1, it is a scale value, otherwise it is a pixel value   | `0.9`   | -     |
| vertical      | `boolean` | Set whether to split vertically                                                                                                          | `false` | -     |
| no-transition | `boolean` | Set whether to disable transition effects                                                                                                | `false` | -     |
| lazy          | `boolean` | When enabled, a virtual handle will appear during the adjustment process, and the panel will be resized after the adjustment is complete | `false` | -     |
| can-full      | `boolean` | set whether to have a full screen button                                                                                                 | `false` | -     |

### Split Events

| Name   | Description                                                                                       | Parameters                                       | Since |
| ------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----- |
| change | Triggered when the scale of the panel changes, returns the current scale of the left or top panel | `(value: number)`                                | -     |
| full   | Triggered when full screen mode is enabled, returns the current full screen panel                 | `(pane: 'top' \| 'right' \| 'bottom' \| 'left')` | -     |
| reset  | Triggered when fullscreen mode is closed, no return value                                         | -                                                | -     |

### Split Slots

| Name    | Description                                                                                   | Parameters | Since |
| ------- | --------------------------------------------------------------------------------------------- | ---------- | ----- |
| left    | Slot for left content when split horizontally, slot for upper content when split vertically   | -          | -     |
| right   | Slot for right content when split horizontally, slot for bottom content when split vertically | -          | -     |
| handler | When the full screen function is not enabled, the slot for the split panel handle             | -          | -     |
