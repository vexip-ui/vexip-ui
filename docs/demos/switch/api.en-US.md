### Switch Props

| Name             | Type                                             | Description                                                                                                                                                                                                 | Default     | Since |
| ---------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----- |
| value            | `boolean`                                        | value of the switch, can use v-model two-way binding                                                                                                                                                        | `false`     | -     |
| disabled         | `boolean`                                        | set whether to disable the switch                                                                                                                                                                           | `false`     | -     |
| size             | `'small' \| 'default' \| 'large'`                | size of switch                                                                                                                                                                                              | `'default'` | -     |
| state            | `'default' \| 'success' \| 'error' \| 'warning'` | State of the switch                                                                                                                                                                                         | `'default'` | -     |
| open-color       | `string`                                         | The fill color of the switch when it is open                                                                                                                                                                | `''`        | -     |
| close-color      | `string`                                         | The fill color of the switch when closed                                                                                                                                                                    | `''`        | -     |
| loading          | `boolean`                                        | Set whether to load state                                                                                                                                                                                   | `false`     | -     |
| open-icon        | `Record<string, any>`                            | The icon in the handler when the switch is opened and not loading, invalid after using the `icon` slot                                                                                                           | `null`      | -     |
| close-icon       | `Record<string, any>`                            | The icon in the handler when the switch is closed and not loading, invalid after using the `icon` slot                                                                                                    | `null`      | -     |
| open-text        | `string`                                         | Fill text for the switch when open                                                                                                                                                                          | `''`        | -     |
| close-text       | `string`                                         | Fill text for the switch when closed                                                                                                                                                                        | `''`        | -     |
| on-before-change | `(checked: boolean) => unknown`                  | Set the callback before the value of the switch changes, receive a value that the parameter will be changed to, support asynchronous functions and Promise, the return value of `false` will prevent change | `null`      | -     |
| disable-validate | `boolean`                                        | Whether to disable triggering form field validation                                                                                                                                                         | ``false``   | -     |

### Switch Events

| Name   | Description                                                                 | Parameters         | Since |
| ------ | --------------------------------------------------------------------------- | ------------------ | ----- |
| change | Triggered when the state of the switch changes, returning the current state | `(value: boolean)` | -     |

### Switch Slots

| Name    | Description                                         | Parameters         | Since |
| ------- | --------------------------------------------------- | ------------------ | ----- |
| loading | Slot for icon when loading                          | -                  | -     |
| icon    | Non-loading icon slot                               | `(value: boolean)` | -     |
| open    | Slot filled with content when open                  | -                  | -     |
| close   | The slot to fill the state when the state is closed | -                  | -     |
