### Checkbox 属性

| 名称        | 类型             | 说明                                                   | 默认值    | 始于 |
| ----------- | ---------------- | ------------------------------------------------------ | --------- | --- |
| checked     | `boolean`          | 复选框的勾选状态，可以使用 `v-model` 双向绑定            | `false`     | - |
| label       | `string`           | 复选框的标签值，使用插槽后失效                         | `null`      | - |
| value       | `string \| number` | 复选框关联的值，一般配合 CheckboxGroup 使用，在 CheckboxGroup 内应唯一 | `null`      | - |
| label-class | `string \| Record<string, boolean>` | 标签元素的类名                                         | `null`      | - |
| size        | `'small' \| 'default' \| 'large'`          | 复选框的大小      | `'default'` | - |
| disabled    | `boolean`          | 设置是否为禁用状态                                         | `false`     | - |
| border      | `boolean`          | 设置是否有外边框                                         | `false`     | - |
| control     | `boolean`          | 设置为控制性质，一般配合 CheckboxGroup 使用                    | `false`     | - |
| partial     | `boolean`          | 是否为部分选择状态，control 为 `true` 时有效           | `false`     | - |
| disable-validate | `boolean`                           | 是否禁用触发表单字段验证                                                         | `false`                 | - |

### Checkbox 事件

| 名称      | 说明                                     | 参数    | 始于 |
| --------- | ---------------------------------------- | ------- | --- |
| change | 在复选框勾选状态改变时触发，返回勾选状态 | `(checked: boolean)` | - |

### CheckboxGroup 属性

| 名称     | 类型    | 说明                                                                                | 默认值    | 始于 |
| -------- | ------- | ----------------------------------------------------------------------------------- | --------- | --- |
| value    | `(string \| number)[]`   | 复选框组被选中的 label 值组成的数组，可以使用 `v-model` 双向绑定                      | `[]`        | - |
| vertical | `boolean` | 是否为纵向排列                                                                      | `false`     | - |
| size     | `'small' \| 'default' \| 'large'`  | 组内复选框的大小，会覆盖复选框单独设置的 `size` | `'default'` | - |
| state    | `'default' \| 'success' \| 'error' \| 'warning'`  | 复选框组的状态                   | `'default'` | - |
| disabled | `boolean` | 组内复选框是否为禁用状态，会覆盖复选框单独设置的 `disabled`                           | `false`     | - |
| border   | `boolean` | 组内复选框是否设置外边框                                                            | `false`     | - |
| options  | `(string \| { value: string \| number, label?: string })[]`   | 设置选子复选框的选项，一般用于简单快速生成复选框组，使用插槽后失效                  | `[]`        | - |
| disable-validate | `boolean`                           | 是否禁用触发表单字段验证                                                         | `false`                 | - |

### CheckboxGroup 事件

| 名称      | 说明                                                      | 参数  | 始于 |
| --------- | --------------------------------------------------------- | ----- | --- |
| change | 在复选框勾选状态改变时触发，返回勾选的复选框的 label 数组 | `(value: (string \| number)[])` | - |
