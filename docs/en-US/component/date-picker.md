# DatePicker

Used to select or input a date.

## Demos

:::demo date-picker/basis

### Basis Usage

For basic usage, you can use `v-model:value` for two-way binding.

By default, the date picker will appear unselected despite the initial value.

:::

:::demo date-picker/type

### Control Type

Setting the value of the `type` prop toggles the selection type of the date picker.

When the selection type is `'year'`, the return value of the date picker will become the year of type number.

:::

:::demo date-picker/labels

### Date Labels

Set the value of the `labels` prop to add labels to each date unit, often used to add units.

:::

:::demo date-picker/filler

### Custom Filler

Setting the value of the `filler` prop, you can specify the filler in the input control when selecting.

:::

:::demo date-picker/unit-readonly

### Input Readonly

Add `unit-readonly` prop to make the input control read-only, and the user can only select date via the panel.

Note that this will make impossible to type date, and the component lose some accessibility.

:::

:::demo date-picker/range

### Range Select

Add the `range` prop to enable range selection mode.

In range selection mode, the return value of the date picker will become an array containing the start and end dates.

When the selection type is `'datetime'`, it is recommended that the minimum width of the control be kept above 380px.

:::

:::demo date-picker/bound

### Limit Range

With the `min` and `max` props, you can quickly set the selectable range of dates.

Normally, these two props will limit to form a single-sided or double-sided, if you want an intermediate limit, you can make the value of `min` larger than `max`.

If they do not meet your needs, you should use the `disabled-date` prop.

:::

:::demo date-picker/shortcuts

### Shortcuts

Date shortcuts can be added via the `shortcuts` prop.

:::

:::demo date-picker/no-action

### Directly Select

If you want to be able to complete the select after a date is clicked, you can add the `no-action` prop to change the selection mode.

Note that the `outside-cancel` prop will always take effect after adding this prop.

When the `type` prop is `'datetime'`, it only disables the bottom action bar of the panel, and does not change the selection mode.

:::

:::demo date-picker/loading

### Loading

The loading state of the date picker can be controlled through the `loading` prop.

If you want to be read-only when loading, you need to add the `loading-lock` prop.

:::

## API

### Preset Types

```ts
type DateType = 'year' | 'month' | 'date'
type TimeType = 'hour' | 'minute' | 'second'
type DateTimeType = DateType | TimeType
type Dateable = number | string | Date
```

### DatePicker Props

| Name            | Type                                                      | Description                                                                                                                                   | Default                 | Since    |
| --------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------- |
| type            | `'date' \| 'datetime' \| 'year' \| 'month'`               | The type of date picker                                                                                                                       | `'date'`                | -        |
| value           | `Dateable \| Dateable[]`                                  | The value of the date selector, can use `v-model` two-way binding                                                                             | `new Date()`            | -        |
| size            | `'small' \| 'default' \| 'large'`                         | The size of input                                                                                                                             | `'default'`             | -        |
| state           | `'default' \| 'success' \| 'error' \| 'warning'`          | The state of the input                                                                                                                        | `'default'`             | -        |
| visible         | `boolean`                                                 | Set the initial open state of the date selection panel, you can use `v-model` two-way binding                                                 | `false`                 | -        |
| placement       | `Placement`                                               | The position where the date selection panel appears, the optional value is the same as Popper.js                                              | `'bottom'`              | -        |
| transfer        | `boolean \| string`                                       | Set the rendering position of the date selection panel. When enabled but no valid selector is specified, the default rendering is to `<body>` | `false`                 | -        |
| format          | `string`                                                  | In `datetime` type, it will control the display and hide of the time selection column according to whether it has `Hms`                       | `'yyyy-MM-dd HH:mm:ss'` | -        |
| filler          | `string`                                                  | Filler when the date is not selected, the length is fixed to 1                                                                                | `'-'`                   | -        |
| ~~no-filler~~   | `boolean`                                                 | Whether to disable initial filling, if disabled, the current `value`                                                                          | `false`                 | -        |
| clearable       | `boolean`                                                 | Whether to allow clearing of values                                                                                                           | `false`                 | -        |
| no-action       | `boolean`                                                 | Whether to disable the bottom actions of the date selection panel and change the selection mode                                               | `false`                 | -        |
| labels          | `Partial<Record<DateTimeType, string>>`                   | set at each date or time unit tag following                                                                                                   | `{}`                    | -        |
| date-separator  | `string`                                                  | The separator for date part                                                                                                                   | `'/'`                   | -        |
| time-separator  | `string`                                                  | The separator for time part                                                                                                                   | `':'`                   | -        |
| shortcuts       | `{ name: string, value: Dateable \| (() => Dateable) }[]` | Set the candidate list of date shortcuts                                                                                                      | `[]`                    | -        |
| disabled-date   | `(date: Date) => boolean`                                 | Determine whether the date is disabled, accept a date parameter, return `true` to disable                                                     | `() => false`           | -        |
| steps           | `number[]`                                                | Set the scroll span of each wheel of the date picker separately                                                                               | `[1, 1, 1]`             | -        |
| ctrl-steps      | `number[]`                                                | Set the scroll span of each wheel of the date picker when Ctrl is held down                                                                   | `[5, 5, 5]`             | -        |
| prefix          | `Record<string, any>`                                     | The prefix icon, invalid when using prefix slot                                                                                               | `null`                  | -        |
| prefix-color    | `string`                                                  | The color of the prefix content, affects the prefix slot                                                                                      | `''`                    | -        |
| suffix          | `Record<string, any>`                                     | The suffix icon, invalid when using suffix slot                                                                                               | `null`                  | -        |
| suffix-color    | `string`                                                  | The color of the suffix content, which affects the suffix slot                                                                                | `''`                    | -        |
| no-suffix       | `boolean`                                                 | Set whether to disable suffix icon                                                                                                            | `false`                 | -        |
| disabled        | `boolean`                                                 | Set whether to disable the date picker                                                                                                        | `false`                 | -        |
| transition-name | `string`                                                  | Set the transition between show and hide of the date selection panel                                                                          | `'vxp-drop'`            | -        |
| confirm-text    | `string`                                                  | The text content of the date selection panel confirm button                                                                                   | `locale.confirm`        | -        |
| cancel-text     | `string`                                                  | The text content of the cancel button of the date selection panel                                                                             | `locale.cancel`         | -        |
| today           | `Dateable`                                                | Set as today's date, which mainly affects some of the performance of the calendar in the date selection panel                                 | `new Date()`            | -        |
| ~~is-range~~    | `boolean`                                                 | Set whether to enable range selection mode                                                                                                    | `false`                 | -        |
| loading         | `boolean`                                                 | Set whether is loading                                                                                                                        | `false`                 | `2.0.0`  |
| loading-icon    | `Record<string, any>`                                     | Set the loading icon                                                                                                                          | `Spinner`               | `2.0.0`  |
| loading-lock    | `boolean`                                                 | Set whether to be read-only when loading                                                                                                      | `false`                 | `2.0.0`  |
| loading-effect  | `string`                                                  | Set the effect animation for the loading icon                                                                                                 | `false`                 | `2.1.0`  |
| min             | `Dateable`                                                | Set the minimum date that can be selected                                                                                                     | `null`                  | `2.0.14` |
| max             | `Dateable`                                                | Set the maximum date that can be selected                                                                                                     | `null`                  | `2.0.14` |
| outside-close   | `boolean`                                                 | Set whether the component can be closed by clicking outside                                                                                   | `true`                  | `2.0.20` |
| outside-cancel  | `boolean`                                                 | Set whether clicking outside the component to close is a cancel operation                                                                     | `false`                 | `2.0.20` |
| locale          | `LocaleConfig['calendar'] & LocaleConfig['dataPicker']`   | Set the locale config                                                                                                                         | `null`                  | `2.1.0`  |
| range           | `boolean`                                                 | Set whether to enable range selection mode                                                                                                    | `false`                 | `2.1.1`  |
| placeholder     | `string \| string[]`                                      | Set placeholder for date picker                                                                                                               | `null`                  | `2.1.1`  |
| unit-readonly   | `boolean`                                                 | Set whether the input control is read-only                                                                                                    | `false`                 | `2.1.2`  |
| week-start      | `number`                                                  | Set the first day of the week in date selection panel, the optional value is 0 ~ 7, where 0 is Sunday                                         | `null`                  | `2.1.9`  |

### DatePicker Events

| Name       | Description                                                                                                                                                                                                  | Parameters                                                  | Since |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- | ----- |
| toggle     | Emitted when the date panel display state changes, returns the current state                                                                                                                                 | `(visible: boolean)`                                        | -     |
| focus      | Emitted when the control is focused                                                                                                                                                                          | -                                                           | -     |
| blur       | Emitted when the control loses focus                                                                                                                                                                         | -                                                           | -     |
| change     | Emitted when the selected time changes, depending on whether the date picker type is `'year'` and whether the range mode is enabled, it will return a year, year range, standard date or standard date range | `(value: string \| number \| number[] \| string[] \| null)` | -     |
| change-col | Emitted when the selected date type changes, returns the name of the current type                                                                                                                            | `(type: DateTimeType \| null)`                              | -     |
| input      | Emitted when the value of any type of date entered by pressing the key changes, returns the name of the current type and the input value                                                                     | `(type: DateTimeType, value: number)`                       | -     |
| enter      | Emitted when the enter key is used to confirm or the confirm button of the date selection panel is clicked                                                                                                   | -                                                           | -     |
| cancel     | Emitted when the Esc key is closed or the cancel button of the date selection panel is clicked                                                                                                               | -                                                           | -     |
| shortcut   | Emitted when a date is selected using the shortcut function, returns the name and value of the shortcut selection                                                                                            | `(name: string, value: number \| string \| Date)`           | -     |
| plus       | Emitted when the date value is incremented using the up arrow key, returns the name of the type name and the corresponding value                                                                             | `(type: DateTimeType, value: number)`                       | -     |
| minus      | Emitted when a date value is decremented using the down arrow key, returns the name of the type name and the value of the column                                                                             | `(type: DateTimeType, value: number)`                       | -     |
| clear      | Emitted when the value is cleared by the clear button                                                                                                                                                        | -                                                           | -     |

### DatePicker Slots

| Name     | Description                                                       | Parameters | Since    |
| -------- | ----------------------------------------------------------------- | ---------- | -------- |
| prefix   | Slot for prefix content, usually a single icon                    | -          | -        |
| suffix   | Slot for suffix content, usually a single icon                    | -          | -        |
| exchange | The slot for the middle separator when range selection is enabled | -          | `2.0.14` |
