# Radio

It is used when you need to make a single selection in a group of options, or when you need to use a radio group to indicate a switch between two states.

## Demos

:::demo radio/basis

### Basis Usage

Radio has two basic props: `label` and `value`. The radio will be selected when `value` is equal to `label`.

The `label` prop of each radio must be a valid string or number.

:::

:::demo radio/disabled

### Disabled

Add the `disabled` prop to disable radio.

:::

:::demo radio/group

### Radio Group

Using a radio group can easily generate a series of radios through a list, which is also a more common usage.

:::

:::demo radio/border

### Border Type

Set the `shape` prop to `'border'` to set the radio to border style.

:::

:::demo radio/button

### Button Type

Set the `shape` prop to `'button'` to set the radio to button style.

:::

:::demo radio/button-group

### Button Group Type

Set the `shape` prop to `'button-group'` to style the radio button group as a button group.

:::

:::demo radio/vertical

### Vertical Arrangement

Add the `vertical` prop to set the radio group to vertical layout.

:::

:::demo radio/size

### Different Sizes

There are three built-in sizes, which can be set via `size` prop.

:::

:::demo radio/loading

### Loading

The loading state of the radio can be controlled through the `loading` prop.

If you want to be read-only when loading, you need to add the `loading-lock` prop.

:::

:::demo radio/state

### Different States

Different states can be set via `state`.

:::

## API

### Preset Types

```ts
type RadioShape = 'default' | 'border' | 'button'
type RadioGroupShape = RadioShape | 'button-group'

type RadioRawOption =
  | string
  | {
    label: string | number | boolean,
    content?: string,
    disabled?: boolean
  }
```

### Radio Props

| Name         | Type                                             | Description                                                                                                              | Default     | Since   |
| ------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | ----------- | ------- |
| value        | `string \| number \| boolean`                    | The value of the radio, the radio will be checked when it is equal to `label`, not valid when used with RadioGroup       | `null`      | -       |
| label        | `string \| number \| boolean`                    | The label of the radio, **required**, the radio will be checked when it is equal to `value` or `value` of the RadioGroup | `null`      | -       |
| label-class  | `ClassType`                                      | Custom class name of the label content of the radio button                                                               | `null`      | -       |
| size         | `'small' \| 'default' \| 'large'`                | The size of the radio                                                                                                    | `'default'` | -       |
| state        | `'default' \| 'success' \| 'error' \| 'warning'` | The state of radio                                                                                                       | `'default'` | -       |
| disabled     | `boolean`                                        | Set whether to disable the radio button                                                                                  | `false`     | -       |
| loading      | `boolean`                                        | Set whether is loading                                                                                                   | `false`     | `2.0.0` |
| loading-lock | `boolean`                                        | Set whether to be read-only when loading                                                                                 | `false`     | `2.0.0` |
| name         | `string`                                         | set `name` attribute of internal `<input>`                                                                               | `''`        | `2.2.2` |
| shape        | `RadioGroupShape`                                | Set the shape of the radio                                                                                               | `'default'` | `2.2.8` |

### Radio Events

| Name   | Description                                                                   | Parameters                             | Since |
| ------ | ----------------------------------------------------------------------------- | -------------------------------------- | ----- |
| change | Emitted when the value of the radio button changes, returns the current value | `(value: string \| number \| boolean)` | -     |

### Radio Slots

| Name    | Description                  | Parameters | Since |
| ------- | ---------------------------- | ---------- | ----- |
| default | Slot for radio label content | -          | -     |

### RadioGroup Props

| Name           | Type                              | Description                                                                                                                       | Default     | Since   |
| -------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| value          | `string \| number \| boolean`     | The value of the radio group, the radio with the same label value will be selected                                                | `null`      | -       |
| vertical       | `boolean`                         | Set whether to enable vertical display                                                                                            | `false`     | -       |
| size           | `'small' \| 'default' \| 'large'` | The size of the radio box, it will override the `size` set by the radio box alone                                                 | `'default'` | -       |
| disabled       | `boolean`                         | Set whether to disable the radio group                                                                                            | `false`     | -       |
| options        | `RawOption[]`                     | Set the options of the radios, generally used for simple and quick generation of radios under group, invalid after using the slot | `[]`        | -       |
| loading        | `boolean`                         | Set whether is loading                                                                                                            | `false`     | `2.0.0` |
| loading-icon   | `VueComponent`                    | Set the loading icon, only effective in button mode                                                                               | `Spinner`   | `2.0.0` |
| loading-lock   | `boolean`                         | Set whether to be read-only when loading                                                                                          | `false`     | `2.0.0` |
| loading-effect | `string`                          | Set the effect animation for the loading icon, only effective in button mode                                                      | `false`     | `2.0.0` |
| shape          | `RadioGroupShape`                 | Set the shape of the radio group                                                                                                  | `'default'` | `2.2.8` |

### RadioGroup Events

| Name   | Description                                                                         | Parameters                             | Since |
| ------ | ----------------------------------------------------------------------------------- | -------------------------------------- | ----- |
| change | Emitted when the value of the radio button group changes, returns the current value | `(value: string \| number \| boolean)` | -     |
