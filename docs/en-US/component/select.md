# Select

Dropdown selector, used when there are more options for the user to choose from, maybe RadioGroup or CheckboxGroup will be better when there are fewer options.

## Demos

:::demo select/basis

### Basis Usage

Set `options` prop to provide options directly.

:::

:::demo select/disabled

### Disabled

Add the `disabled` prop to set the disabled state.

:::

:::demo select/size

### Different Sizes

Three built-in sizes, set via `size` prop, can be set by yourself if they are not enough.

:::

:::demo select/height

### List Height

The scroll bar is automatically used to facilitate the user to browse the options when there are too many options.

Set the `max-list-height` prop to adjust the max height of the options list.

:::

:::demo select/label

### Get Label

When you need to quickly get the `label` value, you can get it through the `update:label` event.

Of course you can use `v-model:label` as in the example, but the component will not update option according to `label`.

:::

:::demo select/custom

### Custom Option

In some cases, the display of options, the display of the selected label, and the value of options need to be different, which can be implemented by combining the `label` prop and default slot.

You can also customize the display of selected label via the `selected` slot.

:::

:::demo select/multiple

### Multiple Select

Add the `multiple` prop to enable multiple selection mode.

Add the `option-check` prop to enable the check icon display of selected options, usually used in conjunction with multi-select mode.

:::

:::demo select/options

### Options Parsing

The `options` prop can directly pass a string, which will be automatically processed inside the component.

:::

:::demo select/filter

### Filter Options

Add the `filter` prop to enable option filter.

By default, the built-in filter method is used. If you want to customize the filter method, you can pass a function.

Add the `ignore-case` prop to ignore case when using built-in filter methods.

:::

:::demo select/filter-position

### Filter Position

You can change the position of the filter input via `filter-position` prop.

:::

:::demo select/remote

### Remote Mode

In normal mode, values not included in the options will be ignored.

By adding the `remote` prop, you can enable remote mode. In this mode, values not included in the options will still be cached.

In remote mode, only `filter-input` event will be dispatched when the user inputs, and the component will not perform any internal filtering.

:::

:::demo select/creatable

### Create Options

Add the `filter` prop to enable option filter.

By default, the built-in filter method is used. If you want to customize the filter method, you can pass a function.

Add the `ignore-case` prop to ignore case when using built-in filter methods.

:::

:::demo select/prefix-suffix

### Prefix and Suffix

Prefix or suffix icons can be added respectively through the `prefix` and `suffix` props or slots with the same name.

Add the `static-suffix` prop to make the suffix icon static, or add the `no-suffix` prop to disable the suffix icon.

:::

:::demo select/custom-key

### Custom Key

You can specify the keys of the parsing options via `key-config` prop. After all, sometimes processing options is quite troublesome.

:::

:::demo select/group

### Group Options

When passing the options, set the `group` option to `true`, and place the child options under the `children` option to achieve grouping.

The content of the group label can be customized via the `group` slot.

:::

:::demo select/loading

### Loading

The loading state of the select can be controlled through the `loading` prop.

If you want to be read-only when loading, you need to add the `loading-lock` prop.

:::

:::demo select/virtual

### Virtual Scroll

It should not be stuck if the options are `100` times more.

:::

:::demo select/transparent

### Transparent

Add the `transparent` prop to remove the original style, and then you can wrap the style you like.

:::

:::demo select/popper-extra

### List Extra Content

==!s|2.2.7==

Any content can be added before and after the list via the `prepend` and `append` slots respectively.

:::

## API

### Preset Types

```ts
export interface SelectKeyConfig {
  value?: string,
  label?: string,
  disabled?: string,
  divided?: string,
  title?: string,
  group?: string,
  children?: string
}

type SelectRawOption = string | Record<string, any>
type SelectBaseValue = string | number | boolean
type SelectValue = SelectBaseValue | SelectBaseValue[] | null

interface SelectOptionState {
  value: SelectBaseValue,
  label: string,
  disabled: boolean,
  divided: boolean,
  title: string,
  hidden: boolean,
  hitting: boolean,
  group: boolean,
  depth: number,
  parent: SelectOptionState | null,
  data: SelectRawOption
}

type SelectFilter = (value: string, options: SelectOptionState) => boolean
type SelectFilterPosition = 'in-control' | 'in-list'

interface SelectListSlotParams {
  options: SelectOptionState[],
  isSelected: (option: SelectOptionState) => boolean,
  handleSelect: (option?: SelectOptionState | null) => void
}
```

### Select Props

| Name            | Type                                             | Description                                                                                                                                                   | Default        | Since    |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | -------- |
| visible         | `boolean`                                        | Set whether the option list is displayed                                                                                                                      | `false`        | -        |
| options         | `SelectRawOption[]`                              | Set the options of select                                                                                                                                     | `[]`           | -        |
| size            | `'small' \| 'default' \| 'large'`                | The size of selector                                                                                                                                          | `'default'`    | -        |
| state           | `'default' \| 'success' \| 'error' \| 'warning'` | The state of the selector                                                                                                                                     | `'default'`    | -        |
| disabled        | `boolean`                                        | Set whether to disable the selector                                                                                                                           | `false`        | -        |
| outside-close   | `boolean`                                        | Set whether to close the component by clicking outside                                                                                                        | `false`        | -        |
| placeholder     | `string`                                         | Same as native placeholder                                                                                                                                    | `''`           | -        |
| prefix          | `VueComponent`                                   | The prefix icon, invalid when using prefix slot                                                                                                               | `null`         | -        |
| prefix-color    | `string`                                         | The color of the prefix content, affects the prefix slot                                                                                                      | `''`           | -        |
| suffix          | `VueComponent`                                   | The suffix icon, invalid when using suffix slot                                                                                                               | `null`         | -        |
| suffix-color    | `string`                                         | The color of the suffix content, which affects the suffix slot                                                                                                | `''`           | -        |
| no-suffix       | `boolean`                                        | Set whether to disable suffix icon                                                                                                                            | `false`        | -        |
| static-suffix   | `boolean`                                        | Set whether the suffix icon is static                                                                                                                         | `false`        | -        |
| value           | `SelectValue`                                    | The value of the selector, can use `v-model` two-way binding, and it is an array in multi-select mode                                                         | `null`         | -        |
| clearable       | `boolean`                                        | Set whether the value can be cleared                                                                                                                          | `false`        | -        |
| max-list-height | `number`                                         | Set the max height of the option list, after which a scroll bar will appear                                                                                   | `300`          | -        |
| transition-name | `string`                                         | The transition animation for options list                                                                                                                     | `'vxp-drop'`   | -        |
| placement       | `Placement`                                      | The position of the option list, the optional value is the same as Popper.js                                                                                  | `'bottom'`     | -        |
| transfer        | `boolean \| string`                              | Set the rendering position of the option list, when set to `true`, it will render to `<body>` by default                                                      | `false`        | -        |
| list-class      | `ClassType`                                      | Custom class name for option list                                                                                                                             | `null`         | -        |
| multiple        | `boolean`                                        | Set whether to enable multiple selection mode                                                                                                                 | `false`        | -        |
| option-check    | `boolean`                                        | Set to add suffix check for selected options                                                                                                                  | `false`        | -        |
| empty-text      | `string`                                         | Prompt for empty options                                                                                                                                      | `locale.empty` | -        |
| key-config      | `SelectKeyConfig`                                | Set the key names of options when parsing `options`                                                                                                           | `{}`           | `2.0.0`  |
| loading         | `boolean`                                        | Set whether is loading                                                                                                                                        | `false`        | `2.0.0`  |
| loading-icon    | `VueComponent`                                   | Set the loading icon                                                                                                                                          | `Spinner`      | `2.0.0`  |
| loading-lock    | `boolean`                                        | Set whether to be read-only when loading                                                                                                                      | `false`        | `2.0.0`  |
| loading-effect  | `string`                                         | Set the effect animation for the loading icon                                                                                                                 | `false`        | `2.1.0`  |
| filter          | `boolean \| SelectFilter`                        | The method of filtering `options`, the built-in filter method is used when `true` is passed                                                                   | `false`        | `2.0.0`  |
| ignore-case     | `boolean`                                        | Set whether to ignore case when using built-in filtering                                                                                                      | `false`        | `2.0.0`  |
| creatable       | `boolean`                                        | Set whether to support dynamic create options when filter options is enabled                                                                                  | `false`        | `2.0.0`  |
| transparent     | `boolean`                                        | Set whether to be transparent                                                                                                                                 | `false`        | `2.0.2`  |
| max-tag-count   | `number`                                         | In multi-select mode, set the maximum number of tags to display, when it is `0`, it will be dynamically calculated to ensure that it is displayed in one line | `0`            | `2.1.0`  |
| no-rest-tip     | `boolean`                                        | Set whether to disable the bubble tip for extra tabs                                                                                                          | `false`        | `2.1.0`  |
| tag-type        | `TagType`                                        | Set the type of label in multi-select mode                                                                                                                    | `null`         | `2.1.0`  |
| locale          | `LocaleConfig['select']`                         | Set the locale config                                                                                                                                         | `null`         | `2.1.0`  |
| no-preview      | `boolean`                                        | Set whether to disable the option label dynamic preview                                                                                                       | `false`        | `2.1.10` |
| remote          | `boolean`                                        | Whether to enable remote mode                                                                                                                                 | `false`        | `2.1.12` |
| fit-popper      | `boolean \| number`                              | Set whether the option list and the selector are forced to be of equal width, or you can pass in a value to specify the width of the option list              | `false`        | `2.1.23` |
| name            | `string`                                         | set `name` attribute of internal `<input>`, only effect when using filter                                                                                     | `''`           | `2.2.2`  |
| popper-alive    | `boolean`                                        | Set whether the Popper is persistent, by default it will be persistent when the `transfer` prop is not set                                                    | `null`         | `2.2.3`  |
| count-limit     | `number`                                         | Limit the maximum count of options for multiple selection, no limit when it is `0`                                                                            | `0`            | `2.2.3`  |
| filter-position | `SelectFilterPosition`                           | Set position of the filter input                                                                                                                              | `'in-control'` | `2.3.11` |
| shift           | `boolean`                                        | Whether to limit tip inside the visible area                                                                                                                  | `true`         | `2.3.29` |

### Select Events

| Name          | Description                                                                                                                              | Parameters                                                         | Since   |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| toggle        | Emitted when the option list display state changes, returns the current state                                                            | `(visible: boolean)`                                               | -       |
| select        | Emitted when an option is selected (whether changed or not), returns the value and label of the selected option                          | `(value: SelectBaseValue, data: SelectRawOption)`                  | -       |
| cancel        | Emitted when an option is canceled, only in multi-select mode, returns the value and label of the canceled option                        | `(value: SelectBaseValue, data: SelectRawOption)`                  | -       |
| change        | Emitted when the selected value changes, returns the value and label of the option, the value array and label array in multi-select mode | `(value: SelectValue, data: SelectRawOption \| SelectRawOption[])` | -       |
| outside-click | Emitted when clicking outside the selector                                                                                               | -                                                                  | -       |
| outside-close | Emitted when the option list is closed by clicking outside                                                                               | -                                                                  | -       |
| clear         | Emitted when the value is cleared by the clear button                                                                                    | -                                                                  | -       |
| focus         | Emitted when the control element is focused, returns the event object                                                                    | `(event: FocusEvent)`                                              | `2.0.0` |
| blur          | Emitted when the control element loses focus, returns the event object                                                                   | `(event: FocusEvent)`                                              | `2.0.0` |
| update:label  | Emitted when option value changes, used to quickly get label of current option                                                           | `(label: string)`                                                  | `2.0.0` |
| filter-input  | Emitted when the search content input, returns the value input                                                                           | `(value: string)`                                                  | `2.1.4` |

### Select Slots

| Name     | Description                                                 | Parameters                                                                               | Since    |
| -------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------- |
| default  | Slot for option content                                     | `{ option: SelectOptionState, index: number, selected: boolean }`                        | -        |
| group    | Slot for content of group label                             | `{ option: SelectOptionState, index: number }`                                           | `2.0.0`  |
| prefix   | Slot for prefix icon content                                | -                                                                                        | -        |
| control  | Slot for selector main control, should not normally be used | -                                                                                        | -        |
| suffix   | Slot for suffix icon content                                | -                                                                                        | -        |
| empty    | Slot for empty option prompt content                        | -                                                                                        | -        |
| selected | Slot for selected label content                             | `{ value: SelectBaseValue, option: SelectOptionState, preview: boolean }`                | `2.2.5`  |
| prepend  | Slot for content before the list                            | -                                                                                        | `2.2.7`  |
| append   | Slot for content after the list                             | -                                                                                        | `2.2.7`  |
| list     | Slot for list content                                       | `SelectListSlotParams`                                                                   | `2.3.7`  |
| tag      | Slot for render tag in control                              | `{ value: SelectBaseValue, option: SelectOptionState \| null, handleClose: () => void }` | `2.3.29` |
| restTag  | Slot for the rest tag in control                            | `{ restCount: number }`                                                                  | `2.3.29` |
