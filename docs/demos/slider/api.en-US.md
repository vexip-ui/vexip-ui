### Slider Props

| Name         | Type      | Description                                                                                    | Default | Since   |
| ------------ | --------- | ---------------------------------------------------------------------------------------------- | ------- | ------- |
| value        | `number`  | The value of the sliding input bar, you can use `v-model` two-way binding                      | `0`     | -       |
| min          | `number`  | The min value of the slider                                                                    | `0`     | -       |
| max          | `number`  | The max value of the slider                                                                    | `100`   | -       |
| step         | `number`  | The span of each value change of the sliding input bar                                         | `1`     | -       |
| disabled     | `boolean` | Set whether to disable                                                                         | `false` | -       |
| vertical     | `boolean` | Set whether the sliding input bar is vertical, the parent element needs to have a valid height | `false` | -       |
| hide-tip     | `boolean` | Set whether to disable tooltip                                                                 | `false` | -       |
| tip-transfer | `boolean` | Set Tooltip's `transfer` property                                                              | `false` | -       |
| loading      | `boolean` | Set whether is loading                                                                         | `false` | `2.0.0` |
| loading-lock | `boolean` | Set whether to be read-only when loading                                                       | `false` | `2.0.0` |
| reverse      | `boolean` | Set whether to reverse operation                                                               | `false` | `2.0.0` |

### Slider Events

| Name   | Description                                                                                                                                    | Parameters        | Since |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----- |
| input  | Emitted when the sliding input bar causes the value to change, returns the current value                                                       | `(value: number)` | -     |
| change | Emitted when the value of the sliding input bar changes (if sliding is used, it is triggered when the sliding ends), returns the current value | `(value: number)` | -     |

### Slider Slots

| Name | Description          | Parameters          | Since |
| ---- | -------------------- | ------------------- | ----- |
| tip  | Slot for tip content | `{ value: number }` | -     |
