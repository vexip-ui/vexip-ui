### Radio Props

| Name        | Type             | Description                                                             | Default    | Since |
| ----------- | ---------------- | ---------------------------------------------------------------- | --------- | --- |
| value | `string \| number` | The value of the radio box, usually used with the group component | `null` | - |
| label | `string \| number` | The label value of the radio box, when the value is equal to the label, the radio box will be selected, the label value **required to be set** | `null` | - |
| label-class | `string \| Record<string, boolean>` | Custom class name of the label content of the radio button | `null` | - |
| size | `'small' \| 'default' \| 'large'` | The size of the radio box | `'default'` | - |
| state | `'default' \| 'success' \| 'error' \| 'warning'` | The state of radio | `'default'` | - |
| disabled | `boolean` | Set whether to disable the radio button | `false` | - |
| border | `boolean` | Set whether the radio button has a border | `false` | - |
| disable-validate | `boolean` | Set whether to disable triggering form field validation | ``false`` | - |

### Radio Events

| Name      | Description                                   | Parameters  | Since |
| --------- | -------------------------------------- | ----- | --- |
| change | Emitted when the value of the radio button changes, returns the current value | `(value: string \| number)` | - |

### Radio Slots

| Name    | Description                 | Parameters | Since |
| ------- | -------------------- | --- | --- |
| defalut | Slot for radio label content | - | - |

### RadioGroup Props

| Name     | Type             | Description                                               | Default    | Since |
| -------- | ---------------- | -------------------------------------------------- | --------- | --- |
| value | `string \| number` | The value of the radio group, the radio with the same label value will be selected | `null` | - |
| vertical | `boolean` | Set whether to enable vertical display | `false` | - |
| size | `'small' \| 'default' \| 'large'` | The size of the radio box, it will override the `size` set by the radio box alone | `'default'` | - |
| disabled | `boolean` | Set whether to disable the radio group | `false` | - |
| button | `boolean` | Set whether to enable button mode, it is not supported in vertical display | `false` | - |
| border | `boolean` | Set whether the radio button has a border | `false` | - |
| disable-validate | `boolean` | Set whether to disable triggering form field validation | `false` | - |
| options | `(string \| number)[]` | Set the options of the sub-radio box, generally used for simple and quick generation of radio box groups, invalid after using the slot | `[]` | - |

### RadioGruop Events

| Name      | Description                                     | Parameters  | Since |
| --------- | ---------------------------------------- | ----- | --- |
| change | Emitted when the value of the radio button group changes, returns the current value | `(value: string \| number)` | - |
