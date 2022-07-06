### Wheel Props

| Name      | Type    | Description                                          | Default       | Since |
| --------- | ------- | --------------------------------------------- | ------------ | --- |
| horizontal | `boolean` | Set whether the scroll wheel is in landscape mode | `false` | - |
| value | `string \| number` | The index of the currently active element, can use `v-model` two-way binding | `0` | - |
| candidate | `number` | Set the number of candidates up and down the scroll wheel, the optional range is 0 ~ 3 | `2` | - |
| arrow | `boolean` | Set whether to use the scroll wheel arrow indicator | `false` | - |
| disable-validate | `boolean` | Whether to disable triggering form field validation | `false` | - |

### Wheel Events

| Name      | Description                                               | Parameters          | Since |
| --------- | -------------------------------------------------- | ------------- | --- |
| change | Triggered when the currently active element changes, returns the element's index and value | `(value: string \| number)` | - |

### WheelItem Props

| Name  | Type                        | Description         | Default | Since |
| ----- | --------------------------- | ------------ | ------ | --- |
| value | `number \| string` | The index value of wheel item | `null` | - |
| disabled | `boolean` | Set whether to disable the element | `false` | - |
