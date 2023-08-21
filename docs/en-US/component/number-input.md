# NumberInput

Usually used in occasions where a more friendly interaction is required for numeric input.

## Demos

:::demo number-input/basis

### Basis Usage

Enter numbers directly, or use the controls on the right to add or subtract.

:::

:::demo number-input/disabled

### Disabled

Add the `disabled` prop to set the disabled state.

:::

:::demo number-input/size

### Change Size

Setting the value of the `size` attribute can change the size of the input. Currently, there are three sizes to choose from.

:::

:::demo number-input/clearable

### Clearable

Add the `clearable` prop to make the control value clearable.

:::

:::demo number-input/icon

### Inline Icon

Prefix and suffix icons can be added to input fields by setting the values of `prefix` and `suffix` or using the slots of the same name.

:::

:::demo number-input/range

### Number Range

The `min` and `max` props allow you to set the maximum and minimum values, respectively.

:::

:::demo number-input/precision

### Number Precision

The precision with which value is preserved can be set via the `precision` prop.

:::

:::demo number-input/formatter

### Formatter

A format method can be provided via the `formatter` prop, which will display the formatted value in the non-input state.

:::

:::demo number-input/step

### Change Step

Set the `step` prop to change the magnitude of each increment or decrement.

:::

:::demo number-input/loading

### Loading

The loading state of the number input can be controlled through the `loading` prop.

If you want to be read-only when loading, you need to add the `loading-lock` prop.

:::

:::demo number-input/sync

### Sync Input

By default two-way binding is based on the `change` event, adding the `sync` prop will make it based on the `input` event.

:::

:::demo number-input/control-type

### Action Type

The position and display of the control can be changed via the `action-type` prop.

:::

:::demo number-input/state

### Different States

Different states can be set via `state`.

:::

## API

### Preset Types

```ts
type NumberInputControlType = 'right' | 'left' | 'right-fade' | 'left-fade' | 'none'
type NumberInputEmptyType = 'NaN' | 'undefined' | 'null'
```

### NumberInput Props

| Name           | Type                                             | Description                                                                                                                | Default     | Since    |
| -------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ----------- | -------- |
| size           | `'small' \| 'default' \| 'large'`                | The size of the input, the optional value is                                                                               | `'default'` | -        |
| state          | `'default' \| 'success' \| 'error' \| 'warning'` | The state of the input                                                                                                     | `'default'` | -        |
| prefix         | `Record<string, any>`                            | The prefix icon, invalid when using prefix slot                                                                            | `''`        | -        |
| prefix-color   | `string`                                         | The color of the prefix content, affects the prefix slot                                                                   | `''`        | -        |
| suffix         | `Record<string, any>`                            | The suffix icon, invalid when using suffix slot                                                                            | `''`        | -        |
| suffix-color   | `string`                                         | The color of the suffix content, which affects the suffix slot                                                             | `''`        | -        |
| formatter      | `(value: number) => string`                      | Set the method to format the value of the input after each value change                                                    | `null`      | -        |
| accessor       | `(value: number \| null) => any`                 | Set the method for reading the input value when the event is called back                                                   | `null`      | -        |
| value          | `number \| null`                                 | Set the value of the input                                                                                                 | `null`      | -        |
| placeholder    | `string`                                         | Set the placeholder for the input                                                                                          | `''`        | -        |
| autofocus      | `boolean`                                        | Set the autofocus of the input field                                                                                       | `false`     | -        |
| spellcheck     | `boolean`                                        | Set spellcheck for input fields                                                                                            | `false`     | -        |
| autocomplete   | `boolean`                                        | Set autocomplete for input fields                                                                                          | `false`     | -        |
| precision      | `number`                                         | Set the precision of the value                                                                                             | `-1`        | -        |
| readonly       | `boolean`                                        | Set the read-only property of the input                                                                                    | `false`     | -        |
| step           | `number`                                         | Set the amplitude of the single change of the increase and decrease buttons                                                | `1`         | -        |
| min            | `number`                                         | Set min limit                                                                                                              | `-Infinity` | -        |
| max            | `number`                                         | Set max limit                                                                                                              | `Infinity`  | -        |
| disabled       | `boolean`                                        | Set whether to disable the input                                                                                           | `false`     | -        |
| control-class  | `ClassType`                                      | Set the class name of the control element                                                                                  | `null`      | `2.1.25` |
| debounce       | `boolean`                                        | Enable debounce for `input` event, by default is throttle, not reactive prop                                               | `false`     | -        |
| delay          | `number`                                         | Set `input` event throttle or debounce delay, the default throttle is `16` ms, and debounce is `100` ms, not reactive prop | `false`     | `2.1.25` |
| clearable      | `boolean`                                        | Set whether the value can be cleared                                                                                       | `false`     | -        |
| loading        | `boolean`                                        | Set whether is loading                                                                                                     | `false`     | `2.0.0`  |
| loading-icon   | `Record<string, any>`                            | Set the loading icon                                                                                                       | `Spinner`   | `2.0.0`  |
| loading-lock   | `boolean`                                        | Set whether to be read-only when loading                                                                                   | `false`     | `2.0.0`  |
| loading-effect | `string`                                         | Set the effect animation for the loading icon                                                                              | `false`     | `2.1.0`  |
| sync           | `boolean`                                        | Set whether sync input mode                                                                                                | `false`     | `2.0.6`  |
| control-type   | `NumberInputControlType`                         | Set the control type                                                                                                       | `'right'`   | `2.0.17` |
| locale         | `LocaleConfig['input']`                          | Set the locale config                                                                                                      | `null`      | `2.1.0`  |
| empty-type     | `NumberInputEmptyType`                           | Set the type of empty value                                                                                                | `'NaN'`     | `2.1.8`  |

### NumberInput Events

| Name         | Description                                                                                                                                                           | Parameters                                          | Since |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ----- |
| focus        | Emitted when the input is focused, returns the event object                                                                                                           | `(event: FocusEvent)`                               | -     |
| blur         | Emitted when the input loses focus, returns the event object                                                                                                          | `(event: FocusEvent)`                               | -     |
| change       | Emitted when the value of the input changes, there will be different trigger nodes according to the respond property, returning the read value and the original value | `(accessedValue: any, originValue: number \| null)` | -     |
| enter        | Emitted when enter, returns the key event                                                                                                                             | `(event: KeyboardEvent)`                            | -     |
| prefix-click | Emitted when the prefix part is clicked, returns the click event                                                                                                      | `(event: MouseEvent)`                               | -     |
| suffix-click | Emitted when the suffix part is clicked, returns the click event                                                                                                      | `(event: MouseEvent)`                               | -     |
| key-down     | Emitted when a key is pressed, returns the key event                                                                                                                  | `(event: KeyboardEvent)`                            | -     |
| key-press    | Emitted when the key is held down, returns the key event                                                                                                              | `(event: KeyboardEvent)`                            | -     |
| key-up       | Emitted when the key is released, returns the key event                                                                                                               | `(event: KeyboardEvent)`                            | -     |

### NumberInput Slots

| Name   | Description                                    | Parameters | Since |
| ------ | ---------------------------------------------- | ---------- | ----- |
| prefix | Slot for prefix content, usually a single icon | -          | -     |
| suffix | Slot for suffix content, usually a single icon | -          | -     |
