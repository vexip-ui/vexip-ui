# Textarea

## Demos

:::demo textarea/basis

### Basis Usage

Simplest usage.

:::

:::demo textarea/disabled

### Disabled

Add the `disabled` prop to set the disabled state.

:::

:::demo textarea/sync

### Sync Input

By default two-way binding is based on the `change` event, adding the `sync` prop will make it based on the `input` event.

:::

:::demo textarea/max-length

### Max Length

The maximum length of text can be set via the `max-length` prop.

:::

:::demo textarea/no-resize

### Disable Resize

Add the `no-resize` prop to disable resizing.

:::

:::demo textarea/loading

### Loading

The loading state of the textarea can be controlled through the `loading` prop.

If you want to be read-only when loading, you need to add the `loading-lock` prop.

:::

:::demo textarea/state

### Different States

Different states can be set via `state`.

:::

## API

### Textarea Props

| Name           | Type                                             | Description                                                                                            | Default              | Since   |
| -------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | -------------------- | ------- |
| state          | `'default' \| 'success' \| 'error' \| 'warning'` | The state of the input                                                                                 | `'default'`          | -       |
| value          | `string`                                         | Set the value of the input                                                                             | `''`                 | -       |
| placeholder    | `string`                                         | Set the placeholder of the input                                                                       | `locale.placeholder` | -       |
| rows           | `number`                                         | Set the default number of rows in the input                                                            | `2`                  | -       |
| no-resize      | `boolean`                                        | Set whether to disable resize                                                                          | `false`              | -       |
| autofocus      | `boolean`                                        | Set the autofocus of the input field                                                                   | `false`              | -       |
| spellcheck     | `boolean`                                        | Set spellcheck for input fields                                                                        | `false`              | -       |
| autocomplete   | `boolean`                                        | Set autocomplete for input fields                                                                      | `false`              | -       |
| readonly       | `boolean`                                        | Set the read-only property of the input                                                                | `false`              | -       |
| disabled       | `boolean`                                        | set whether to disable the input                                                                       | `false`              | -       |
| debounce       | `boolean`                                        | Enable debounce, only trigger `input` event once when typing fast, note that this prop is not reactive | `false`              | -       |
| max-length     | `number`                                         | Set the maximum length of the input content, if the value is `0`, there is no limit                    | `0`                  | -       |
| loading        | `boolean`                                        | Set whether is loading                                                                                 | `false`              | `2.0.0` |
| loading-icon   | `Record<string, any>`                            | Set the loading icon                                                                                   | `Spinner`            | `2.0.0` |
| loading-lock   | `boolean`                                        | Set whether to be read-only when loading                                                               | `false`              | `2.0.0` |
| loading-effect | `string`                                         | Set the effect animation for the loading icon                                                          | `false`              | `2.0.0` |
| sync           | `boolean`                                        | Set whether sync input mode                                                                            | `false`              | `2.0.6` |
| locale         | `LocaleConfig['input']`                          | Set the locale config                                                                                  | `null`               | `2.1.0` |

### Textarea Events

| Name      | Description                                                                                | Parameters               | Since |
| --------- | ------------------------------------------------------------------------------------------ | ------------------------ | ----- |
| focus     | Emitted when the input is focused, returns the event object                                | `(event: FocusEvent)`    | -     |
| blur      | Emitted when the input loses focus, returns the event object                               | `(event: FocusEvent)`    | -     |
| change    | Emitted when the value of the input changes, returns the read value and the original value | `(value: string)`        | -     |
| input     | Emitted when a value is entered, returns the read value and the original value             | `(value: string)`        | -     |
| enter     | Emitted when enter, returns the key event                                                  | `(event: KeyboardEvent)` | -     |
| key-down  | Emitted when a key is pressed, returns the key event                                       | `(event: KeyboardEvent)` | -     |
| key-press | Emitted when the key is held down, returns the key event                                   | `(event: KeyboardEvent)` | -     |
| key-up    | Emitted when the key is released, returns the key event                                    | `(event: KeyboardEvent)` | -     |
| clear     | Emitted when the value is cleared by the clear button, no return value                     | -                        | -     |

### Textarea Slots

| Name  | Description             | Parameters          | Since    |
| ----- | ----------------------- | ------------------- | -------- |
| count | Word count content slot | `{ value: string }` | `2.0.12` |
