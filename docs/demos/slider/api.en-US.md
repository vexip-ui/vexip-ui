### Slider Props

| Name         | Type      | Description                                                                                    | Default | Since |
| ------------ | --------- | ---------------------------------------------------------------------------------------------- | ------- | ----- |
| value        | `number`  | The value of the sliding input bar, you can use `v-model` two-way binding                      | `0`     | -     |
| min          | `number`  | The min value of the slider                                                                    | `0`     | -     |
| max          | `number`  | The max value of the slider                                                                    | `100`   | -     |
| step         | `number`  | The span of each value change of the sliding input bar                                         | `1`     | -     |
| vertical     | `boolean` | Set whether the sliding input bar is vertical, the parent element needs to have a valid height | `false` | -     |
| hide-tip     | `boolean` | Set whether to disable tooltip                                                                 | `false` | -     |
| tip-transfer | `boolean` | Set Tooltip's `transfer` property                                                              | `false` | -     |

### Slider Events

| Name   | Description                                                                                                                                    | Parameters        | Since |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----- |
| input  | Emitted when the sliding input bar causes the value to change, returns the current value                                                       | `(value: number)` | -     |
| change | Emitted when the value of the sliding input bar changes (if sliding is used, it is triggered when the sliding ends), returns the current value | `(value: number)` | -     |

### Slider Slots

| Name | Description          | Parameters          | Since |
| ---- | -------------------- | ------------------- | ----- |
| tip  | Slot for tip content | `{ value: number }` | -     |
