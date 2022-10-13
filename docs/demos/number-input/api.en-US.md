### NumberInput Props

| Name         | Type                                             | Description                                                                 | Default     | Since   |
| ------------ | ------------------------------------------------ | --------------------------------------------------------------------------- | ----------- | ------- |
| size         | `'small' \| 'default' \| 'large'`                | The size of the input box, the optional value is                            | `'default'` | -       |
| state        | `'default' \| 'success' \| 'error' \| 'warning'` | The state of the input box                                                  | `'default'` | -       |
| prefix       | `Record<string, any>`                            | The prefix icon, invalid when using prefix slot                             | `''`        | -       |
| prefix-color | `string`                                         | The color of the prefix content, affects the prefix slot                    | `''`        | -       |
| suffix       | `Record<string, any>`                            | The suffix icon, invalid when using suffix slot                             | `''`        | -       |
| suffix-color | `string`                                         | The color of the suffix content, which affects the suffix slot              | `''`        | -       |
| formatter    | `(value: number) => string`                      | Set the method to format the value of the input box after each value change | `null`      | -       |
| accessor     | `(value: number \| null) => any`                 | Set the method for reading the input value when the event is called back    | `null`      | -       |
| value        | `number \| null`                                 | Set the value of the input box                                              | `null`      | -       |
| placeholder  | `string`                                         | Set the placeholder for the input box                                       | `''`        | -       |
| autofocus    | `boolean`                                        | Set the autofocus of the input field                                        | `false`     | -       |
| spellcheck   | `boolean`                                        | Set spellcheck for input fields                                             | `false`     | -       |
| autocomplete | `boolean`                                        | Set autocomplete for input fields                                           | `false`     | -       |
| precision    | `number`                                         | Set the precision of the value                                              | `0`         | -       |
| readonly     | `boolean`                                        | Set the read-only property of the input box                                 | `false`     | -       |
| step         | `number`                                         | Set the amplitude of the single change of the increase and decrease buttons | `1`         | -       |
| min          | `number`                                         | Set min limit                                                               | `-Infinity` | -       |
| max          | `number`                                         | Set max limit                                                               | `Infinity`  | -       |
| disabled     | `boolean`                                        | Set whether to disable the input box                                        | `false`     | -       |
| input-class  | `ClassType`                                      | Set the class name of the input box `<input>` element                       | `''`        | -       |
| debounce     | `boolean`                                        | Enable debounce, only trigger `input` event once when typing fast           | `false`     | -       |
| clearable    | `boolean`                                        | Set whether the value can be cleared                                        | `false`     | -       |
| loading      | `boolean`                                        | Set whether is loading                                                      | `false`     | `2.0.0` |
| loading-icon | `Record<string, any>`                            | Set the loading icon                                                        | `Spinner`   | `2.0.0` |
| loading-lock | `boolean`                                        | Set whether to be read-only when loading                                    | `false`     | `2.0.0` |
| loading-spin | `boolean`                                        | Set whether to use spin animation for the loading icon                      | `false`     | `2.0.0` |
| sync         | `boolean`                                        | Set whether sync input mode                                                 | `false`     | `2.0.6` |

### NumberInput Events

| Name         | Description                                                                                                                                                               | Parameters                                          | Since |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ----- |
| focus        | Emitted when the input box is focused, returns the event object                                                                                                           | `(event: FocusEvent)`                               | -     |
| blur         | Emitted when the input box loses focus, returns the event object                                                                                                          | `(event: FocusEvent)`                               | -     |
| change       | Emitted when the value of the input box changes, there will be different trigger nodes according to the respond property, returning the read value and the original value | `(accessedValue: any, originValue: number \| null)` | -     |
| enter        | Emitted when enter, returns the key event                                                                                                                                 | `(event: KeyboardEvent)`                            | -     |
| prefix-click | Emitted when the prefix part is clicked, returns the click event                                                                                                          | `(event: MouseEvent)`                               | -     |
| suffix-click | Emitted when the suffix part is clicked, returns the click event                                                                                                          | `(event: MouseEvent)`                               | -     |
| key-down     | Emitted when a key is pressed, returns the key event                                                                                                                      | `(event: KeyboardEvent)`                            | -     |
| key-press    | Emitted when the key is held down, returns the key event                                                                                                                  | `(event: KeyboardEvent)`                            | -     |
| key-up       | Emitted when the key is released, returns the key event                                                                                                                   | `(event: KeyboardEvent)`                            | -     |

### NumberInput Slots

| Name   | Description                                    | Parameters | Since |
| ------ | ---------------------------------------------- | ---------- | ----- |
| prefix | Slot for prefix content, usually a single icon | -          | -     |
| suffix | Slot for suffix content, usually a single icon | -          | -     |
