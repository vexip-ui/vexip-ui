### Preset Types

```ts
export interface AutoCompleteKeyConfig {
  value?: string,
  disabled?: string,
  divided?: string,
  noTitle?: string,
  group?: string,
  children?: string
}

type AutoCompleteRawOption = string | Record<string, any>

interface AutoCompleteOptionState {
  value: string | number,
  disabled: boolean,
  divided: boolean,
  noTitle: boolean,
  hidden: boolean,
  hitting: boolean,
  group: boolean,
  depth: number,
  parent: AutoCompleteOptionState | null,
  data: AutoCompleteRawOption
}
```

### AutoComplete Props

| Name          | Type                                                                                 | Description                                                                                 | Default     | Since   |
| ------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ----------- | ------- |
| value         | `string \| number`                                                                   | Value of Input control                                                                      | `''`        | -       |
| options       | `AutoCompleteRawOption[]`                                                            | list of options, can be a string or object conforming to `ObjectOption`                     | `[]`        | -       |
| filter        | `boolean \| (value: string \| number, options: AutoCompleteOptionState) => boolean)` | The method of filtering `options`, the built-in filter method is used when `true` is passed | `false`     | -       |
| prefix        | `Record<string, any>`                                                                | The prefix icon, invalid when using prefix slot                                             | `null`      | -       |
| prefix-color  | `string`                                                                             | The color of the prefix content, affects the prefix slot                                    | `''`        | -       |
| suffix        | `Record<string, any>`                                                                | The suffix icon, invalid when using suffix slot                                             | `null`      | -       |
| suffix-color  | `string`                                                                             | The color of the suffix content, which affects the suffix slot                              | `''`        | -       |
| placeholder   | `string`                                                                             | Input control placeholder                                                                   | `null`      | -       |
| size          | `'small' \| 'default' \| 'large'`                                                    | Set input control size                                                                      | `'default'` | -       |
| state         | `'default' \| 'success' \| 'error' \| 'warning'`                                     | state of the input box                                                                      | `'default'` | -       |
| disabled      | `boolean`                                                                            | Set whether to disable                                                                      | `false`     | -       |
| drop-disabled | `boolean`                                                                            | whether to allow drop-down list display                                                     | `false`     | -       |
| placement     | `Placement`                                                                          | The position where the option list appears, the optional value is the same as Popper.js     | `'bottom'`  | -       |
| clearable     | `boolean`                                                                            | Set whether the value can be cleared                                                        | `false`     | -       |
| ignore-case   | `boolean`                                                                            | Set whether to ignore case when using built-in filtering                                    | `false`     | -       |
| key-config    | `AutoCompleteKeyConfig`                                                              | Set the key names of options when parsing `options`                                         | `{}`        | `2.0.0` |
| loading       | `boolean`                                                                            | Set whether is loading                                                                      | `false`     | `2.0.0` |
| loading-icon  | `Record<string, any>`                                                                | Set the loading icon                                                                        | `Spinner`   | `2.0.0` |
| loading-lock  | `boolean`                                                                            | Set whether to be read-only when loading                                                    | `false`     | `2.0.0` |
| loading-spin  | `boolean`                                                                            | Set whether to use spin animation for the loading icon                                      | `false`     | `2.0.0` |

### AutoComplete Events

| Name   | Description                                                                        | Parameters                                               | Since |
| ------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------- | ----- |
| input  | When input is triggered in the Input control, return the current input value       | `(value: string)`                                        | -     |
| toggle | Emitted when the candidate list display state changes, returns the current state   | `(visible: boolean)`                                     | -     |
| change | Emitted when the value changes and the focus disappears, returns the current value | `(value: number \| string, data: AutoCompleteRawOption)` | -     |
| select | Emitted when an option is used, returns the current value                          | `(value: number \| string, data: AutoCompleteRawOption)` | -     |
| enter  | Emitted when Enter is pressed, returns the current value                           | `(value: number \| string)`                              | -     |
| clear  | Emitted when the clear button is used to clear, no return value                    | -                                                        | -     |

### AutoComplete Slots

| Name    | Description                                                                                                                                                                                      | Parameters                                                                                                                             | Since |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| default | The slot of the option list. Using the slot to pass in options will invalidate the built-in option filtering, key selection and other functions. These functions need to be implemented manually | -                                                                                                                                      | -     |
| prefix  | Slot to prepend icon content                                                                                                                                                                     | -                                                                                                                                      | -     |
| suffix  | Slot for suffix icon content                                                                                                                                                                     | -                                                                                                                                      | -     |
| control | The slot of the input control, accepts 5 parameters, which are the current value and 4 event callback methods                                                                                    | `(value: number \| string, onInput: (event: string \| Event) => void, onChange: () => void, onEnter: () => void, onClear: () => void)` | -     |
