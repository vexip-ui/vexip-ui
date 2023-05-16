### Radio Props

| Name         | Type                                             | Description                                                                                                                                    | Default     | Since   |
| ------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| value        | `string \| number`                               | The value of the radio box, which is checked when it is equal to the label, but not valid when used with RadioGroup (or not necessary to set)  | `null`      | -       |
| label        | `string \| number`                               | The label of the radio box, which must be set so that the radio box is checked when it is equal to `value` or `value` of the RadioGroup | `null`      | -       |
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
