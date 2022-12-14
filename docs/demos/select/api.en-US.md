### Preset Types

```ts
export interface SelectKeyConfig {
  value?: string,
  label?: string,
  disabled?: string,
  divided?: string,
  noTitle?: string,
  group?: string,
  children?: string
}

type SelectRawOption = string | Record<string, any>
type SelectValue = string | number | null | (string | number)[]

interface SelectOptionState {
  value: string | number,
  label: string,
  disabled: boolean,
  divided: boolean,
  noTitle: boolean,
  hidden: boolean,
  hitting: boolean,
  group: boolean,
  depth: number,
  parent: SelectOptionState | null,
  data: SelectRawOption
}
```

### Select Props

| Name            | Type                                                                           | Description                                                                                                                                                   | Default        | Since   |
| --------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------- |
| visible         | `boolean`                                                                      | Set whether the option list is displayed                                                                                                                      | `false`        | -       |
| options         | `SelectRawOption[]`                                                            | Set the options of select                                                                                                                                     | `[]`           | -       |
| size            | `'small' \| 'default' \| 'large'`                                              | The size of selector                                                                                                                                          | `'default'`    | -       |
| state           | `'default' \| 'success' \| 'error' \| 'warning'`                               | The state of the selector                                                                                                                                     | `'default'`    | -       |
| disabled        | `boolean`                                                                      | Set whether to disable the selector                                                                                                                           | `false`        | -       |
| outside-close   | `boolean`                                                                      | Set whether to close the component by clicking outside                                                                                                        | `false`        | -       |
| placeholder     | `string`                                                                       | Same as native palceholder                                                                                                                                    | `''`           | -       |
| prefix          | `Record<string, any>`                                                          | The prefix icon, invalid when using prefix slot                                                                                                               | `null`         | -       |
| prefix-color    | `string`                                                                       | The color of the prefix content, affects the prefix slot                                                                                                      | `''`           | -       |
| suffix          | `Record<string, any>`                                                          | The suffix icon, invalid when using suffix slot                                                                                                               | `null`         | -       |
| suffix-color    | `string`                                                                       | The color of the suffix content, which affects the suffix slot                                                                                                | `''`           | -       |
| no-suffix       | `boolean`                                                                      | Set whether to disable suffix icon                                                                                                                            | `false`        | -       |
| static-suffix   | `boolean`                                                                      | Set whether the suffix icon is static                                                                                                                         | `false`        | -       |
| value           | `SelectValue`                                                                  | The value of the selector, you can use `v-model` for two-way binding, and it is an array in multi-select mode                                                 | `null`         | -       |
| clearable       | `boolean`                                                                      | Set whether the value can be cleared                                                                                                                          | `false`        | -       |
| max-list-height | `number`                                                                       | Set the max height of the option list, after which a scroll bar will appear                                                                                   | `300`          | -       |
| transition-name | `string`                                                                       | The transition animation for options list                                                                                                                     | `'vxp-drop'`   | -       |
| placement       | `Placement`                                                                    | The position of the option list, the optional value is the same as Popper.js                                                                                  | `'bottom'`     | -       |
| transfer        | `boolean \| string`                                                            | Set the rendering position of the option list, when set to `true`, it will render to `<body>` by default                                                      | `false`        | -       |
| list-class      | `ClassType`                                                                    | Custom class name for option list                                                                                                                             | `null`         | -       |
| multiple        | `boolean`                                                                      | Set whether to enable multiple selection mode                                                                                                                 | `false`        | -       |
| option-check    | `boolean`                                                                      | Set to add suffix check for selected options                                                                                                                  | `false`        | -       |
| empty-text      | `string`                                                                       | Prompt for empty options                                                                                                                                      | `locale.empty` | -       |
| key-config      | `SelectKeyConfig`                                                              | Set the key names of options when parsing `options`                                                                                                           | `{}`           | `2.0.0` |
| loading         | `boolean`                                                                      | Set whether is loading                                                                                                                                        | `false`        | `2.0.0` |
| loading-icon    | `Record<string, any>`                                                          | Set the loading icon                                                                                                                                          | `Spinner`      | `2.0.0` |
| loading-lock    | `boolean`                                                                      | Set whether to be read-only when loading                                                                                                                      | `false`        | `2.0.0` |
| loading-spin    | `boolean`                                                                      | Set whether to use spin animation for the loading icon                                                                                                        | `false`        | `2.0.0` |
| filter          | `boolean \| (value: string \| number, options: SelectOptionState) => boolean)` | The method of filtering `options`, the built-in filter method is used when `true` is passed                                                                   | `false`        | `2.0.0` |
| ignore-case     | `boolean`                                                                      | Set whether to ignore case when using built-in filtering                                                                                                      | `false`        | `2.0.0` |
| creatable       | `boolean`                                                                      | Set whether to support dynamic create options when filter options is enabled                                                                                  | `false`        | `2.0.0` |
| transparent     | `boolean`                                                                      | Set whether to be transparent                                                                                                                                 | `false`        | `2.0.2` |
| max-tag-count   | `number`                                                                       | In multi-select mode, set the maximum number of tags to display, when it is `0`, it will be dynamically calculated to ensure that it is displayed in one line | `0`            | `2.1.0` |
| no-rest-tip     | `boolean`                                                                      | Set whether to disable the bubble tip for extra tabs                                                                                                          | `false`        | `2.1.0` |
| tag-type        | `TagType`                                                                      | Set the type of label in multi-select mode                                                                                                                    | `null`         | `2.1.0` |

### Select Events

| Name          | Description                                                                                                                              | Parameters                                                         | Since   |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| toggle        | Emitted when the option list display state changes, returns the current state                                                            | `(visible: boolean)`                                               | -       |
| select        | Emitted when an option is selected (whether changed or not), returns the value and label of the selected option                          | `(value: string \| number, data: SelectRawOption)`                 | -       |
| cancel        | Emitted when an option is canceled, only in multi-select mode, returns the value and label of the canceled option                        | `(value: string \| number, data: SelectRawOption)`                 | -       |
| change        | Emitted when the selected value changes, returns the value and label of the option, the value array and label array in multi-select mode | `(value: SelectValue, data: SelectRawOption \| SelectRawOption[])` | -       |
| outside-click | Emitted when clicking outside the selector, no return value                                                                              | -                                                                  | -       |
| outside-close | Emitted when the option list is closed by clicking outside, no return value                                                              | -                                                                  | -       |
| clear         | Emitted when the value is cleared by the clear button, no return value                                                                   | -                                                                  | -       |
| focus         | Emitted when the control element is focused, returns the event object                                                                    | `(event: FocusEvent)`                                              | `2.0.0` |
| blur          | Emitted when the control element loses focus, returns the event object                                                                   | `(event: FocusEvent)`                                              | `2.0.0` |
| update:label  | Emitted when option value changes, used to quickly get label of current option                                                           | `(label: string)`                                                  | `2.0.0` |

### Select Slots

| Name    | Description                                                 | Parameters                                                        | Since   |
| ------- | ----------------------------------------------------------- | ----------------------------------------------------------------- | ------- |
| default | Slot for option content                                     | `{ option: SelectOptionState, index: number, selected: boolean }` | -       |
| group   | Slot for content of group label                             | `{ option: SelectOptionState, index: number }`                    | `2.0.0` |
| prefix  | Slot to prepend icon content                                | -                                                                 | -       |
| control | Slot for selector main control, should not normally be used | -                                                                 | -       |
| suffix  | Slot for suffix icon content                                | -                                                                 | -       |
| empty   | Slot for empty option prompt content                        | -                                                                 | -       |
