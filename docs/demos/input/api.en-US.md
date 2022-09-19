### Input Props

| Name         | Type                                                     | Description                                                                           | Default     | Since   |
| ------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------- | ------- |
| type         | `'text' \| 'password' \| 'date' \| 'datetime' \| 'time'` | The type of the input box, where the time-related type is the native type             | `'text'`    | -       |
| size         | `'small' \| 'default' \| 'large'`                        | the size of input box                                                                 | `'default'` | -       |
| state        | `'default' \| 'success' \| 'error' \| 'warning'`         | the state of input                                                                    | `'default'` | -       |
| prefix       | `Record<string, any>`                                    | prefix icon, invalid when using prefix slot                                           | `null`      | -       |
| prefix-color | `string`                                                 | The color of the prefix content, affects the prefix slot                              | `''`        | -       |
| suffix       | `Record<string, any>`                                    | suffix icon, invalid when using suffix slot                                           | `null`      | -       |
| suffix-color | `string`                                                 | The color of the suffix content, which affects the suffix slot                        | `''`        | -       |
| formatter    | `(value: string) => string`                              | Set the method to format the value of the input box after each value change           | `null`      | -       |
| accessor     | `(value: string) => any`                                 | Set the method for reading the input value when the event is called back              | `null`      | -       |
| value        | `string`                                                 | Set the value of the input box                                                        | `''`        | -       |
| placeholder  | `string`                                                 | Set the placeholder for the input box                                                 | `''`        | -       |
| autofocus    | `boolean`                                                | Set the autofocus of the input field                                                  | `false`     | -       |
| spellcheck   | `boolean`                                                | Set spellcheck for input fields                                                       | `false`     | -       |
| autocomplete | `boolean`                                                | Set autocomplete for input fields                                                     | `false`     | -       |
| readonly     | `boolean`                                                | Set the read-only property of the input box                                           | `false`     | -       |
| disabled     | `boolean`                                                | Det whether to disable the input box                                                  | `false`     | -       |
| input-class  | `ClassType`                                              | Set the class name of the input box `<input>` element                                 | `''`        | -       |
| debounce     | `boolean`                                                | Enable debounce, only trigger `input` event once when typing fast                     | `false`     | -       |
| clearable    | `boolean`                                                | Set whether the value can be cleared                                                  | `false`     | -       |
| max-length   | `number`                                                 | Set the maximum length of the input content, when the value is `0`, there is no limit | `0`         | -       |
| before       | `string`                                                 | Set the front content of the input box                                                | `''`        | -       |
| after        | `string`                                                 | Set the content after the input box                                                   | `''`        | -       |
| password     | `boolean`                                                | Set whether to show the button to toggle the visible password                         | `false`     | -       |
| clearable    | `boolean`                                                | Set whether the value can be cleared                                                  | `false`     | -       |
| loading      | `boolean`                                                | Set whether is loading                                                                | `false`     | `2.0.0` |
| loading-icon | `Record<string, any>`                                    | Set the loading icon                                                                  | `Spinner`   | `2.0.0` |
| loading-lock | `boolean`                                                | Set whether to be read-only when loading                                              | `false`     | `2.0.0` |
| loading-spin | `boolean`                                                | Set whether to use spin animation for the loading icon                                | `false`     | `2.0.0` |
| transparent  | `boolean`                                                | Set whether to be transparent                                                         | `false`     | `2.0.2` |

### Input Events

| Name         | Description                                                                                    | Parameters                                  | Since |
| ------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------- | ----- |
| focus        | Emitted when the input box is focused, returns the event object                                | `(event: FocusEvent)`                       | -     |
| blur         | Emitted when the input box loses focus, returns the event object                               | `(event: FocusEvent)`                       | -     |
| change       | Emitted when the value of the input box changes, returns the read value and the original value | `(accessedValue: any, originValue: string)` | -     |
| input        | Emitted when a value is entered, returns the read value and the original value                 | `(accessedValue: any, originValue: string)` | -     |
| enter        | Emitted when enter, returns the key event                                                      | `(event: KeyboardEvent)`                    | -     |
| prefix-click | Emitted when the prefix part is clicked, returns the click event                               | `(event: MouseEvent)`                       | -     |
| suffix-click | Emitted when the suffix part is clicked, returns the click event                               | `(event: MouseEvent)`                       | -     |
| key-down     | Emitted when the key is pressed, returns the key event                                         | `(event: KeyboardEvent)`                    | -     |
| key-press    | Emitted when the key is held down, returns the key event                                       | `(event: KeyboardEvent)`                    | -     |
| key-up       | Emitted when the key is released, returns the key event                                        | `(event: KeyboardEvent)`                    | -     |
| clear        | Emitted when the value is cleared by the clear button, no return value                         | -                                           | -     |

### Input Slots

| Name          | Description                                                                                   | Parameters | Since   |
| ------------- | --------------------------------------------------------------------------------------------- | ---------- | ------- |
| prefix        | Slot for prefix content, usually a single icon                                                | -          | -       |
| suffix        | Slot for suffix content, usually a single icon                                                | -          | -       |
| before        | Slot for the before content, usually text content                                             | -          | -       |
| after         | Slot for the after content, usually text content                                              | -          | -       |
| before-action | Before button slot, which takes precedence over the `before` slot, is used to place a control | -          | `2.0.0` |
| after-action  | After button slot, which takes precedence over the `after` slot, is used to place a control   | -          | `2.0.0` |
