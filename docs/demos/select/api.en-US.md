### Select Props

| Name            | Type                                                                                                                  | Description                                                                                                   | Default        | Since   |
| --------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------- | ------- |
| visible         | `boolean`                                                                                                             | Set whether the option list is displayed                                                                      | `false`        | -       |
| options         | `(string \| { value: string \| number, label?: string, disabled?: boolean, divided?: boolean, noTitle?: boolean })[]` | Set selector options, generally used for Simple and fast generation option, invalid after using default slot  | `[]`           | -       |
| size            | `'small' \| 'default' \| 'large'`                                                                                     | The size of selector                                                                                          | `'default'`    | -       |
| state           | `'default' \| 'success' \| 'error' \| 'warning'`                                                                      | The state of the selector                                                                                     | `'default'`    | -       |
| disabled        | `boolean`                                                                                                             | Set whether to disable the selector                                                                           | `false`        | -       |
| outside-close   | `boolean`                                                                                                             | Set whether to close the component by clicking outside                                                        | `false`        | -       |
| placeholder     | `string`                                                                                                              | Same as native palceholder                                                                                    | `''`           | -       |
| prefix          | `Record<string, any>`                                                                                                 | The prefix icon, invalid when using prefix slot                                                               | `''`           | -       |
| prefix-color    | `string`                                                                                                              | The color of the prefix content, affects the prefix slot                                                      | `''`           | -       |
| suffix          | `Record<string, any>`                                                                                                 | The suffix icon, invalid when using suffix slot                                                               | `''`           | -       |
| suffix-color    | `string`                                                                                                              | The color of the suffix content, which affects the suffix slot                                                | `''`           | -       |
| value           | `string \| number \| (string \| number)[]`                                                                            | The value of the selector, you can use `v-model` for two-way binding, and it is an array in multi-select mode | `null`         | -       |
| clearable       | `boolean`                                                                                                             | Set whether the value can be cleared                                                                          | `false`        | -       |
| max-list-height | `number`                                                                                                              | Set the max height of the option list, after which a scroll bar will appear                                   | `300`          | -       |
| transition-name | `string`                                                                                                              | The transition animation for options list                                                                     | `'vxp-drop'`   | -       |
| placement       | `Placement`                                                                                                           | The position of the option list, the optional value is the same as Popper.js                                  | `'bottom'`     | -       |
| transfer        | `boolean \| string`                                                                                                   | Set the rendering position of the option list, when set to `true`, it will render to `<body>` by default      | `false`        | -       |
| list-class      | `ClassType`                                                                                                           | Custom class name for option list                                                                             | `null`         | -       |
| multiple        | `boolean`                                                                                                             | Set whether to enable multiple selection mode                                                                 | `false`        | -       |
| option-check    | `boolean`                                                                                                             | Set to enable the check function of selected options                                                          | `false`        | -       |
| empty-text      | `string`                                                                                                              | Prompt for empty options                                                                                      | `locale.empty` | -       |
| key-config      | `{ value?: string, label?: string, disabled?: string, divided?: string, noTitle?: string }`                           | Set the key names of options when parsing `options`                                                           | `{}`           | `2.0.0` |

### Select Events

| Name          | Description                                                                                                                              | Parameters                                 | Since |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ----- |
| toggle        | Emitted when the option list display state changes, returns the current state                                                            | `(visible: boolean)`                       | -     |
| select        | Emitted when an option is selected (whether changed or not), returns the value and label of the selected option                          | `(value: string \| number, label: string)` | -     |
| cancel        | Emitted when an option is canceled, only in multi-select mode, returns the value and label of the canceled option                        | `(value: string \| number, label: string)` | -     |
| change        | Emitted when the selected value changes, returns the value and label of the option, the value array and label array in multi-select mode | `(value: string \| number, label: string)` | -     |
| outside-click | Emitted when clicking outside the selector, no return value                                                                              | -                                          | -     |
| outside-close | Emitted when the option list is closed by clicking outside, no return value                                                              | -                                          | -     |
| clear         | Emitted when the value is cleared by the clear button, no return value                                                                   | -                                          | -     |

### Select Slots

| Name    | Description                            | Parameters                                                                                             | Since |
| ------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----- |
| default | Slot for option content                | `(option: OptionState, index: number, selected: boolean, handleSelect: (option: OptionState) => void)` | -     |
| prefix  | Slot to prepend icon content           | -                                                                                                      | -     |
| control | Slot for selector main control content | -                                                                                                      | -     |
| suffix  | Slot for suffix icon content           | -                                                                                                      | -     |
| empty   | Slot for empty option prompt content   | -                                                                                                      | -     |

The options state type difinition:

```ts
type RawOption = string | Record<string, any>

interface OptionState {
  value: string | number,
  label: string,
  disabled: boolean,
  divided: boolean,
  noTitle: boolean,
  hidden: boolean,
  hitting: boolean,
  data: RawOption
}
```
