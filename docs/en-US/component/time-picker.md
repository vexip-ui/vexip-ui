# TimePicker

It is used when you need to select a time or a time range.

## Demos

:::demo time-picker/basis

### Basis Usage

Two-way binding is possible using `v-model:value`.

By default, the time picker will appear unselected despite the initial value.

:::

:::demo time-picker/labels

### Time Labels

Set the `labels` prop to add labels to each time unit, often used to add units.

:::

:::demo time-picker/filler

### Custom Filler

Setting the value of the `filler` prop, you can specify the filler in the input control when selecting.

:::

:::demo time-picker/step

### Adjust Steps

The step of each time column can be adjusted via the `steps` prop.

It should be noted that the value of the hour column needs to be divisible by `24`, and the value passed in the minute and second columns need to be divisible by `60`.

:::

:::demo time-picker/range

### Range Select

Add the `range` prop to enable range selection mode.

In range selection mode, the return value of the time picker will become an array containing the start and end times.

:::

:::demo time-picker/bound

### Limit Range

With the `min` and `max` props, you can quickly set the selectable range of dates.

Normally, these two props will limit to form a single-sided or double-sided, if you want an intermediate limit, you can make the value of `min` larger than `max`.

:::

:::demo time-picker/shortcuts

### Shortcuts

Time shortcuts can be added via the `shortcuts` prop.

The placement of shortcuts can be set via the `shortcuts-placement` prop.

:::

:::demo time-picker/loading

### Loading

The loading state of the time picker can be controlled through the `loading` prop.

If you want to be read-only when loading, you need to add the `loading-lock` prop.

:::

## API

### Preset Types

```ts
type TimeType = 'hour' | 'minute' | 'second'
type TimeShortcutsPlacement = 'top' | 'right' | 'bottom' | 'left'

interface TimeShortcut {
  name: string,
  value: string | string[] | (() => string | string[])
}
```

### TimePicker Props

| Name                | Type                                | Description                                                                                                                    | Default          | Since    |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------- | -------- |
| value               | `string \| string[]`                | The value of the time picker, you can use `v-model:value` two-way binding                                                      | `'00:00:00'`     | -        |
| visible             | `boolean`                           | Set the initial open state of the time panel, you can use `v-model:visible` two-way binding                                    | `false`          | -        |
| placement           | `Placement`                         | The position where the time panel appears, the optional values ​​are the same as Popper.js                                     | `'bottom-start'` | -        |
| transfer            | `boolean \| string`                 | Set the rendering position of the time panel. When set to `true`, it will render to `<body>` by default                        | `false`          | -        |
| format              | `string`                            | Controls the display and hiding of time selection columns based on whether they have Hms                                       | `'HH:mm:ss'`     | -        |
| separator           | `string`                            | The time unit separator                                                                                                        | `':'`            | -        |
| filler              | `string`                            | Filler when time is not selected, the length is fixed to 1                                                                     | `'-'`            | -        |
| clearable           | `boolean`                           | whether to allow clear values                                                                                                  | `false`          | -        |
| no-action           | `boolean`                           | whether to disable the bottom action bar of the time panel                                                                     | `false`          | -        |
| no-arrow            | `boolean`                           | Whether to disable the wheel selector arrow indicator                                                                          | `false`          | -        |
| candidate           | `number`                            | Set the number of candidates up and down the wheel selector, the optional range is 0 ~ 3                                       | `3`              | -        |
| labels              | `Partial<Record<TimeType, string>>` | The label to set after each time unit                                                                                          | `{}`             | -        |
| shortcuts           | `TimeShortcut[]`                    | Set the candidate list for date shortcut selection, the element is an object of `{ name, value }`, where value can be function | `[]`             | -        |
| steps               | `number[]`                          | Set the scrolling span of each wheel of the time picker respectively                                                           | `[1, 1, 1]`      | -        |
| ctrl-steps          | `number[]`                          | Set the scroll span of each wheel of the time picker when Ctrl is held down                                                    | `[5, 5, 5]`      | -        |
| prefix              | `Record<string, any>`               | The prefix icon, invalid when using prefix slot                                                                                | `null`           | -        |
| prefix-color        | `string`                            | The color of the prefix content, affects the prefix slot                                                                       | `''`             | -        |
| suffix              | `Record<string, any>`               | The suffix icon, invalid when using suffix slot                                                                                | `null`           | -        |
| suffix-color        | `string`                            | The color of the suffix content, which affects the suffix slot                                                                 | `''`             | -        |
| no-suffix           | `boolean`                           | Set whether to disable suffix icon                                                                                             | `false`          | -        |
| disabled            | `boolean`                           | Set whether to disable the date picker                                                                                         | `false`          | -        |
| transition-name     | `string`                            | Set the transition to show and hide the time panel                                                                             | `'vxp-drop'`     | -        |
| ok-text             | `string`                            | The text content of the time panel confirm button                                                                              | `locale.confirm` | -        |
| cancel-text         | `string`                            | The text content of the cancel button in the time panel                                                                        | `locale.cancel`  | -        |
| loading             | `boolean`                           | Set whether is loading                                                                                                         | `false`          | `2.0.0`  |
| loading-icon        | `Record<string, any>`               | Set the loading icon                                                                                                           | `Spinner`        | `2.0.0`  |
| loading-lock        | `boolean`                           | Set whether to be read-only when loading                                                                                       | `false`          | `2.0.0`  |
| loading-effect      | `string`                            | Set the effect animation for the loading icon                                                                                  | `false`          | `2.1.0`  |
| min                 | `string`                            | Set the minimum time that can be selected                                                                                      | `null`           | `2.0.14` |
| max                 | `string`                            | Set the maximum time that can be selected                                                                                      | `null`           | `2.0.14` |
| outside-close       | `boolean`                           | Set whether the component can be closed by clicking outside                                                                    | `true`           | `2.0.20` |
| outside-cancel      | `boolean`                           | Set whether clicking outside the component to close is a cancel operation                                                      | `false`          | `2.0.20` |
| locale              | `LocaleConfig['timePicker']`        | Set the locale config                                                                                                          | `null`           | `2.1.0`  |
| range               | `boolean`                           | Set whether to enable range selection mode                                                                                     | `false`          | `2.1.1`  |
| placeholder         | `string \| string[]`                | Set placeholder for date picker                                                                                                | `null`           | `2.1.1`  |
| unit-readonly       | `boolean`                           | Set whether the input control is read-only                                                                                     | `false`          | `2.1.2`  |
| popper-alive        | `boolean`                           | Set whether the Popper is persistent, by default it will be persistent when the `transfer` prop is not set                     | `null`           | `2.2.3`  |
| shortcuts-placement | `TimeShortcutsPlacement`            | Set the placement of shortcuts                                                                                                 | `'left'`         | `2.2.18` |

### TimePicker Events

| Name       | Description                                                                                                                                                            | Parameters                        | Since |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----- |
| toggle     | Emitted when the time panel display state changes, returns the current state                                                                                           | `(visible: boolean)`              | -     |
| focus      | Emitted when the control is focused                                                                                                                                    | -                                 | -     |
| blur       | Emitted when the control loses focus                                                                                                                                   | -                                 | -     |
| change     | Emitted when the selected time changes, depending on whether the range mode is enabled for the time picker type, it will return a standard time or standard time range | `(time: string \| string[])`      | -     |
| change-col | Emitted when the selected time type changes, returns the name of the current type                                                                                      | `(type: TimeType)`                | -     |
| input      | Emitted when the value of any type of time input by the key changes, returns the name of the current type and the input value                                          | `(type: TimeType, value: number)` | -     |
| enter      | Emitted when the enter key is used to confirm or the confirm button of the date selection window is clicked                                                            | -                                 | -     |
| cancel     | Emitted when the Esc key is closed or the cancel button of the date selection window is clicked                                                                        | -                                 | -     |
| shortcut   | Emitted when a date is selected using the shortcut function, returns the name of the shortcut selection and the value corresponding to the column                      | `(name: string, value: string)`   | -     |
| plus       | Emitted when the time value is incremented using the up arrow key, returns the name of the type name and the corresponding value                                       | `(type: TimeType, value: number)` | -     |
| minus      | Emitted when the time value is decremented using the down arrow key, returns the name of the type name and the value of the column                                     | `(type: TimeType, value: number)` | -     |
| clear      | Emitted when the value is cleared by the clear button                                                                                                                  | -                                 | -     |

### TimePicker Slots

| Name     | Description                                                       | Parameters | Since    |
| -------- | ----------------------------------------------------------------- | ---------- | -------- |
| prefix   | Slot for prefix content, usually is a icon                        | -          | -        |
| suffix   | Slot for suffix content, usually is a icon                        | -          | -        |
| exchange | The slot for the middle separator when range selection is enabled | -          | `2.0.14` |
