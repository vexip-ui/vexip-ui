### Checkbox Props

| Name         | Type                                             | Description                                                                                                                  | Default     | Since   |
| ------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| checked      | `boolean`                                        | Checked state of the checkbox, you can use `v-model` two-way binding                                                         | `false`     | -       |
| label        | `string`                                         | The label value of the checkbox, invalid after using the slot                                                                | `null`      | -       |
| value        | `string \| number`                               | The value associated with the checkbox, generally used with the CheckboxGroup, and should be unique within the CheckboxGroup | `null`      | -       |
| label-class  | `string \| Record<string, boolean>`              | The class name of label element                                                                                              | `null`      | -       |
| size         | `'small' \| 'default' \| 'large'`                | The size of the checkbox                                                                                                     | `'default'` | -       |
| state        | `'default' \| 'success' \| 'error' \| 'warning'` | The state of the checkbox                                                                                                    | `'default'` | -       |
| disabled     | `boolean`                                        | Set whether is disabled                                                                                                      | `false`     | -       |
| border       | `boolean`                                        | Set whether has outer border                                                                                                 | `false`     | -       |
| control      | `boolean`                                        | Set as a control, generally used with CheckboxGroup                                                                          | `false`     | -       |
| partial      | `boolean`                                        | Whether it is a partial selection state, valid when control is `true`                                                        | `false`     | -       |
| loading      | `boolean`                                        | Set whether is loading                                                                                                       | `false`     | `2.0.0` |
| loading-lock | `boolean`                                        | Set whether to be read-only when loading                                                                                     | `false`     | `2.0.0` |

### Checkbox Events

| Name   | Description                                                                | Parameters           | Since |
| ------ | -------------------------------------------------------------------------- | -------------------- | ----- |
| change | Emitted when the checkbox checked state changes, returns the checked state | `(checked: boolean)` | -     |

### CheckboxGroup Props

| Name         | Type                                                                           | Description                                                                                                                          | Default     | Since   |
| ------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ------- |
| value        | `(string \| number)[]`                                                         | Array of selected label values ​​for checkbox group, can use `v-model` two-way binding                                               | `[]`        | -       |
| vertical     | `boolean`                                                                      | Set whether is vertical layout                                                                                                       | `false`     | -       |
| size         | `'small' \| 'default' \| 'large'`                                              | The size of the checkbox in the group, which will override the `size` set by the checkbox individually                               | `'default'` | -       |
| state        | `'default' \| 'success' \| 'error' \| 'warning'`                               | The state of checkbox group                                                                                                          | `'default'` | -       |
| disabled     | `boolean`                                                                      | Whether the checkbox in the group is disabled, it will override the `disabled` set by the checkbox separately                        | `false`     | -       |
| border       | `boolean`                                                                      | Whether to set the outer border of the checkbox in the group                                                                         | `false`     | -       |
| options      | `(string \| { value: string \| number, label?: string, control?: boolean })[]` | Set options for selecting sub-check boxes, generally used to generate check box groups easily and quickly, after using slots invalid | `[]`        | -       |
| loading      | `boolean`                                                                      | Set whether is loading                                                                                                               | `false`     | `2.0.0` |
| loading-lock | `boolean`                                                                      | Set whether to be read-only when loading                                                                                             | `false`     | `2.0.0` |

### CheckboxGroup Events

| Name   | Description                                                                                             | Parameters                      | Since |
| ------ | ------------------------------------------------------------------------------------------------------- | ------------------------------- | ----- |
| change | Emitted when the checked state of the checkbox changes, returns the label array of the checked checkbox | `(value: (string \| number)[])` | -     |
