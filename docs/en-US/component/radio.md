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

:::demo radio/vertical

### Vertical Arrangement

Add the `vertical` prop to set the radio group to vertical layout.

:::

:::demo radio/border

### Border Type

Add the `border` prop to set the radios with border style in group.

:::

:::demo radio/button

### Button Type

Add the `button` prop to set the radios with button style in group.

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

### Radio Props

| Name         | Type                                             | Description                                                                                                                                    | Default     | Since   |
| ------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| value        | `string \| number`                               | The value of the radio box, usually used with the group component                                                                              | `null`      | -       |
| label        | `string \| number`                               | The label value of the radio box, when the value is equal to the label, the radio box will be selected, the label value **required to be set** | `null`      | -       |
| label-class  | `ClassType`                                      | Custom class name of the label content of the radio button                                                                                     | `null`      | -       |
| size         | `'small' \| 'default' \| 'large'`                | The size of the radio box                                                                                                                      | `'default'` | -       |
| state        | `'default' \| 'success' \| 'error' \| 'warning'` | The state of radio                                                                                                                             | `'default'` | -       |
| disabled     | `boolean`                                        | Set whether to disable the radio button                                                                                                        | `false`     | -       |
| border       | `boolean`                                        | Set whether the radio button has a border                                                                                                      | `false`     | -       |
| loading      | `boolean`                                        | Set whether is loading                                                                                                                         | `false`     | `2.0.0` |
| loading-lock | `boolean`                                        | Set whether to be read-only when loading                                                                                                       | `false`     | `2.0.0` |

### Radio Events

| Name   | Description                                                                   | Parameters                  | Since |
| ------ | ----------------------------------------------------------------------------- | --------------------------- | ----- |
| change | Emitted when the value of the radio button changes, returns the current value | `(value: string \| number)` | -     |

### Radio Slots

| Name    | Description                  | Parameters | Since |
| ------- | ---------------------------- | ---------- | ----- |
| defalut | Slot for radio label content | -          | -     |

### RadioGroup Props

| Name           | Type                                                                    | Description                                                                                                                            | Default     | Since   |
| -------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| value          | `string \| number`                                                      | The value of the radio group, the radio with the same label value will be selected                                                     | `null`      | -       |
| vertical       | `boolean`                                                               | Set whether to enable vertical display                                                                                                 | `false`     | -       |
| size           | `'small' \| 'default' \| 'large'`                                       | The size of the radio box, it will override the `size` set by the radio box alone                                                      | `'default'` | -       |
| disabled       | `boolean`                                                               | Set whether to disable the radio group                                                                                                 | `false`     | -       |
| button         | `boolean`                                                               | Set whether to enable button mode, it is not supported in vertical display                                                             | `false`     | -       |
| border         | `boolean`                                                               | Set whether the radio button has a border                                                                                              | `false`     | -       |
| options        | `(string \| number \| { label: string \| number, content?: string })[]` | Set the options of the sub-radio box, generally used for simple and quick generation of radio box groups, invalid after using the slot | `[]`        | -       |
| loading        | `boolean`                                                               | Set whether is loading                                                                                                                 | `false`     | `2.0.0` |
| loading-icon   | `Record<string, any>`                                                   | Set the loading icon, only effective in button mode                                                                                    | `Spinner`   | `2.0.0` |
| loading-lock   | `boolean`                                                               | Set whether to be read-only when loading                                                                                               | `false`     | `2.0.0` |
| loading-effect | `string`                                                                | Set the effect animation for the loading icon, only effective in button mode                                                           | `false`     | `2.0.0` |

### RadioGruop Events

| Name   | Description                                                                         | Parameters                  | Since |
| ------ | ----------------------------------------------------------------------------------- | --------------------------- | ----- |
| change | Emitted when the value of the radio button group changes, returns the current value | `(value: string \| number)` | -     |
