# Input

Entering data by typing is the most basic form field wrapper.

## Demos

:::demo input/basis

### Basis Usage

For basic usage, you can use `v-model:value` for two-way binding.

:::

:::demo input/disabled

### Disabled

Add the `disabled` prop to set the disabled state.

:::

:::demo input/clearable

### Clearable

Add the `clearable` prop to make the control value clearable.

:::

:::demo input/icon

### Inline Icon

Prefix and suffix icons can be added to input fields by setting the values of `prefix` and `suffix` or using the slots of the same name.

:::

:::demo input/size

### Change Size

Setting the value of the `size` attribute can change the size of the input. Currently, there are three sizes to choose from.

:::

:::demo input/sync

### Sync Input

By default two-way binding is based on the `change` event, adding the `sync` prop will make it based on the `input` event.

:::

:::demo input/before

### Before or After Slots

Use the `before` and `after` slots to combine some content with the input.

If you want to place a button, select or other control, you should use the `before-action` and `after-action` slots.

:::

:::demo input/password

### Password

Set the `type` prop to `'password'` to enable password input.

Adding the `plain-password` prop in password mode can turn on the suffix button to toggle the cipher text.

:::

:::demo input/loading

### Loading

The loading state of the input can be controlled through the `loading` prop.

If you want to be read-only when loading, you need to add the `loading-lock` prop.

:::

:::demo input/max-length

### Word Limit

The max length of the content can be set via the `max-length` prop.

:::

:::demo input/state

### Different States

Different states can be set via `state`.

:::

:::demo input/transparent

### Transparent

Add the `transparent` prop to remove the original style, and then you can wrap the style you like.

:::

## API

### Input Props

| Name           | Type                                                     | Description                                                                                                                | Default     | Since    |
| -------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| type           | `'text' \| 'password' \| 'date' \| 'datetime' \| 'time'` | The type of input, where the time-related type is the native type                                                          | `'text'`    | -        |
| size           | `'small' \| 'default' \| 'large'`                        | The size of input                                                                                                          | `'default'` | -        |
| state          | `'default' \| 'success' \| 'error' \| 'warning'`         | The state of input                                                                                                         | `'default'` | -        |
| prefix         | `Record<string, any>`                                    | Prefix icon, invalid when using prefix slot                                                                                | `null`      | -        |
| prefix-color   | `string`                                                 | The color of the prefix content, affects the prefix slot                                                                   | `''`        | -        |
| suffix         | `Record<string, any>`                                    | Suffix icon, invalid when using suffix slot                                                                                | `null`      | -        |
| suffix-color   | `string`                                                 | The color of the suffix content, which affects the suffix slot                                                             | `''`        | -        |
| formatter      | `(value: string \| number) => string \| number`          | Set the method to format the value of the input after each value change                                                    | `null`      | -        |
| accessor       | `(value: string) => any`                                 | Set the method for reading the input value when the event is called back                                                   | `null`      | -        |
| value          | `string \| number`                                       | Set the value of the input, can use `v-model` two-way binding                                                              | `''`        | -        |
| placeholder    | `string`                                                 | Set the placeholder for the input                                                                                          | `''`        | -        |
| autofocus      | `boolean`                                                | Set the autofocus of the input field                                                                                       | `false`     | -        |
| spellcheck     | `boolean`                                                | Set spellcheck for input fields                                                                                            | `false`     | -        |
| autocomplete   | `boolean`                                                | Set autocomplete for input fields                                                                                          | `false`     | -        |
| readonly       | `boolean`                                                | Set the read-only property of the input                                                                                    | `false`     | -        |
| disabled       | `boolean`                                                | Det whether to disable the input                                                                                           | `false`     | -        |
| control-class  | `ClassType`                                              | Set the class name of the control element                                                                                  | `null`      | `2.1.25` |
| debounce       | `boolean`                                                | Enable debounce for `input` event, by default is throttle, not reactive prop                                               | `false`     | -        |
| delay          | `number`                                                 | Set `input` event throttle or debounce delay, the default throttle is `16` ms, and debounce is `100` ms, not reactive prop | `false`     | `2.1.25` |
| clearable      | `boolean`                                                | Set whether the value can be cleared                                                                                       | `false`     | -        |
| max-length     | `number`                                                 | Set the maximum length of the input content, when the value is `0`, there is no limit                                      | `0`         | -        |
| before         | `string`                                                 | Set the front content of the input                                                                                         | `''`        | -        |
| after          | `string`                                                 | Set the content after the input                                                                                            | `''`        | -        |
| plain-password | `boolean`                                                | Set whether to show the button to toggle show plain password                                                               | `false`     | -        |
| clearable      | `boolean`                                                | Set whether the value can be cleared                                                                                       | `false`     | -        |
| loading        | `boolean`                                                | Set whether is loading                                                                                                     | `false`     | `2.0.0`  |
| loading-icon   | `Record<string, any>`                                    | Set the loading icon                                                                                                       | `Spinner`   | `2.0.0`  |
| loading-lock   | `boolean`                                                | Set whether to be read-only when loading                                                                                   | `false`     | `2.0.0`  |
| loading-effect | `string`                                                 | Set the effect animation for the loading icon                                                                              | `false`     | `2.1.0`  |
| transparent    | `boolean`                                                | Set whether to be transparent                                                                                              | `false`     | `2.0.2`  |
| sync           | `boolean`                                                | Set whether enable sync input mode                                                                                         | `false`     | `2.0.6`  |
| locale         | `LocaleConfig['input']`                                  | Set the locale config                                                                                                      | `null`      | `2.1.0`  |
| control-attrs  | `Record<string, any>`                                    | Set the attributes of the control element                                                                                  | `null`      | `2.2.2`  |
| name           | `string`                                                 | set `name` attribute of internal `<input>`                                                                                 | `''`        | `2.2.2`  |

### Input Events

| Name              | Description                                                      | Parameters                  | Since    |
| ----------------- | ---------------------------------------------------------------- | --------------------------- | -------- |
| focus             | Emitted when the input is focused, returns the event object      | `(event: FocusEvent)`       | -        |
| blur              | Emitted when the input loses focus, returns the event object     | `(event: FocusEvent)`       | -        |
| change            | Emitted when the value of the input changes                      | `(value: string \| number)` | -        |
| input             | Emitted when a value is entered                                  | `(value: string \| number)` | -        |
| enter             | Emitted when enter, returns the key event                        | `(event: KeyboardEvent)`    | -        |
| prefix-click      | Emitted when the prefix part is clicked, returns the click event | `(event: MouseEvent)`       | -        |
| suffix-click      | Emitted when the suffix part is clicked, returns the click event | `(event: MouseEvent)`       | -        |
| key-down          | Emitted when the key is pressed, returns the key event           | `(event: KeyboardEvent)`    | -        |
| key-press         | Emitted when the key is held down, returns the key event         | `(event: KeyboardEvent)`    | -        |
| key-up            | Emitted when the key is released, returns the key event          | `(event: KeyboardEvent)`    | -        |
| clear             | Emitted when the value is cleared by the clear button            | -                           | -        |
| composition-start | Emitted when composition start                                   | `(event: CompositionEvent)` | `2.1.28` |
| composition-end   | Emitted when composition end                                     | `(event: CompositionEvent)` | `2.1.28` |

### Input Slots

| Name          | Description                                                                                   | Parameters           | Since    |
| ------------- | --------------------------------------------------------------------------------------------- | -------------------- | -------- |
| prefix        | Slot for prefix content, usually a single icon                                                | -                    | -        |
| suffix        | Slot for suffix content, usually a single icon                                                | -                    | -        |
| before        | Slot for the before content, usually text content                                             | -                    | -        |
| after         | Slot for the after content, usually text content                                              | -                    | -        |
| before-action | Before button slot, which takes precedence over the `before` slot, is used to place a control | -                    | `2.0.0`  |
| after-action  | After button slot, which takes precedence over the `after` slot, is used to place a control   | -                    | `2.0.0`  |
| count         | Word count content slot                                                                       | `{ value: string }`  | `2.0.12` |
| password      | Slot for plain password button, usually a single icon                                         | `{ plain: boolean }` | `2.1.0`  |

### Input Methods

| Name      | Description                                        | Signature       | Since    |
| --------- | -------------------------------------------------- | --------------- | -------- |
| copyValue | Copy the current content of input to the clipboard | `() => boolean` | `2.1.21` |
