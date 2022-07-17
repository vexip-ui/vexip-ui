### Textarea Props

| Name         | Type                                             | Description                                                                         | Default              | Since |
| ------------ | ------------------------------------------------ | ----------------------------------------------------------------------------------- | -------------------- | ----- |
| state        | `'default' \| 'success' \| 'error' \| 'warning'` | The state of the input box                                                          | `'default'`          | -     |
| value        | `string`                                         | Set the value of the input box                                                      | `''`                 | -     |
| placeholder  | `string`                                         | Set the placeholder of the input box                                                | `locale.placeholder` | -     |
| rows         | `number`                                         | Set the default number of rows in the input box                                     | `2`                  | -     |
| no-resize    | `boolean`                                        | Set whether to disable resize                                                       | `false`              | -     |
| autofocus    | `boolean`                                        | Set the autofocus of the input field                                                | `false`              | -     |
| spellcheck   | `boolean`                                        | Set spellcheck for input fields                                                     | `false`              | -     |
| autocomplete | `boolean`                                        | Set autocomplete for input fields                                                   | `false`              | -     |
| readonly     | `boolean`                                        | Set the read-only property of the input box                                         | `false`              | -     |
| disabled     | `boolean`                                        | set whether to disable the input box                                                | `false`              | -     |
| debounce     | `boolean`                                        | Enable debounce, only trigger `input` event once when typing fast                   | `false`              | -     |
| max-length   | `number`                                         | Set the maximum length of the input content, if the value is `0`, there is no limit | `0`                  | -     |

### Textarea Events

| Name      | Description                                                                                    | Parameters                                  | Since |
| --------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------- | ----- |
| focus     | Emitter when the input box is focused, returns the event object                                | `(event: FocusEvent)`                       | -     |
| blur      | Emitter when the input box loses focus, returns the event object                               | `(event: FocusEvent)`                       | -     |
| change    | Emitter when the value of the input box changes, returns the read value and the original value | `(accessedValue: any, originValue: string)` | -     |
| input     | Emitter when a value is entered, returns the read value and the original value                 | `(accessedValue: any, originValue: string)` | -     |
| enter     | Emitter when enter, returns the key event                                                      | `(event: KeyboardEvent)`                    | -     |
| key-down  | Emitter when a key is pressed, returns the key event                                           | `(event: KeyboardEvent)`                    | -     |
| key-press | Emitter when the key is held down, returns the key event                                       | `(event: KeyboardEvent)`                    | -     |
| key-up    | Emitter when the key is released, returns the key event                                        | `(event: KeyboardEvent)`                    | -     |
| clear     | Emitter when the value is cleared by the clear button, no return value                         | -                                           | -     |
