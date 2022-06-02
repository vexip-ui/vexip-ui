### Radio Props

| Name        | Type             | Description                                                             | Default    | Since |
| ----------- | ---------------- | ---------------------------------------------------------------- | --------- | --- |
| value       | `string \| number` | 单选框的值，通常配合 group 组件使用                              | `null`      | - |
| label       | `string \| number` | 单选框的标签值，当值与标签全等时，单选框将被选中，标签值**必需设置** | `null`         | - |
| label-class | `string \| Record<string, boolean>` | 单选框的标签内容的自定义类名                                     | `null`      | - |
| size        | `'small' \| 'default' \| 'large'`           | 单选框的大小               | `'default'` | - |
| state        | `'default' \| 'success' \| 'error' \| 'warning'`           | 单选框的状态                                   | `'default'` | - |
| disabled    | `boolean`          | 设置是否禁用单选框                                               | `false`     | - |
| border      | `boolean`          | 设置单选框是否具有边框                                           | `false`     | - |
| disable-validate | `boolean`                           | 是否禁用触发表单字段验证                                                         | ``false``                 | - |

### Radio Events

| Name      | Description                                   | Parameters  | Since |
| --------- | -------------------------------------- | ----- | --- |
| change | 当单选框的值发生变化时触发，返回当前值 | `(value: string \| number)` | - |

### Radio Slots

| Name    | Description                 | Parameters | Since |
| ------- | -------------------- | --- | --- |
| defalut | 单选框标签内容的插槽 | - | - |

### RadioGroup Props

| Name     | Type             | Description                                               | Default    | Since |
| -------- | ---------------- | -------------------------------------------------- | --------- | --- |
| value    | `string \| number` | 单选框组的值，标签值与该值相同的单选框将被选中     | `null`      | - |
| vertical | `boolean`          | 设置是否开启纵向显示                               | `false`         | - |
| size     | `'small' \| 'default' \| 'large'`           | 单选框的大小，会覆盖单选框单独设置的 `size` | `'default'` | - |
| disabled | `boolean`          | 设置是否禁用单选框组                               | `false`     | - |
| button   | `boolean`          | 设置是否开启按钮模式，在纵向显示时暂不支持         | `false`     | - |
| border   | `boolean`          | 设置单选框是否具有边框                             | `false`     | - |
| disable-validate | `boolean`                           | 是否禁用触发表单字段验证                                                         | `false`                 | - |
| options | `(string \| number)[]` | 设置选子单选框的选项，一般用于简单快速生成单选框组，使用插槽后失效 | `[]` | - |

### RadioGruop Events

| Name      | Description                                     | Parameters  | Since |
| --------- | ---------------------------------------- | ----- | --- |
| change | 当单选框组的值发生变化时触发，返回当前值 | `(value: string \| number)` | - |
