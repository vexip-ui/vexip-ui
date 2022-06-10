### Select Props

| Name            | Type                      | Description                                                                | Default     | Since |
| --------------- | ------------------------- | ------------------------------------------------------------------- | ---------- | --- |
| visible         | `boolean`                   | 设置选项列表是否显示                                                | `false`      | - |
| options         | `(string \| { value: string \| number, label?: string, disabled?: boolean, divided?: boolean, noTitle?: boolean })[]`                     | 设置选择器的选项，一般用于简单快速生成选项，使用 default 插槽后失效 | `[]`         | - |
| size            | `'small' \| 'default' \| 'large'`                    | 选择器的大小                  | `'default'`  | - |
| state           | `'default' \| 'success' \| 'error' \| 'warning'`                    | 选择器的状态     | `'default'`  | - |
| disabled        | `boolean`                   | 设置是否禁用选择器                                                  | `false`      | - |
| outside-close   | `boolean`                   | 设置是否可以通过点击组件外部进行关闭                                | `false`      | - |
| placeholder     | `string`                    | 同原生的 palceholder                                                | `''` | - |
| prefix          | `Record<string, any>`                    | 前缀图标的名称，使用前缀插槽时无效                                  | `''`         | - |
| prefix-color    | `string`                    | 前缀内容的颜色，会影响前缀插槽                                      | `''`         | - |
| suffix          | `Record<string, any>`                    | 后缀图标的名称，使用后缀插槽时无效                                  | `''`         | - |
| suffix-color    | `string`                    | 后缀内容的颜色，会影响后缀插槽                                      | `''`         | - |
| value           | `string \| number \| (string \| number)[]` | 选择器的值，可以使用 v-model 双向绑定，多选模式时为数组             | `null`       | - |
| clearable       | `boolean`                   | 设置是否可以清空值                                                  | `false`      | - |
| max-list-height | Number                    | 设置选项列表的最大高度，超过高度后会出现滚动条                      | `300`        | - |
| transition-name | `string`                    | 选项列表的过渡动画                                                  | `'vxp-drop'` | - |
| placement       | `Placement`                    | 选项列表的出现位置，可选值同 Popper.js                              | `'bottom'`   | - |
| transfer        | `boolean \| string`         | 设置选项列表的渲染位置，设置为 `true` 时默认渲染至 `<body>`     | `false`      | - |
| list-class      | `string \| Record<string, boolean>`          | 选项列表的自定义类名                                                | `null`       | - |
| multiple        | `boolean`                   | 设置是否开启多选模式                                                | `false`      | - |
| option-check    | `boolean`                   | 设置开启被选选项打勾功能                                            | `false`      | - |
| empty-text      | `string`                    | 设置空选项时的提示语                                                | `locale.empty` | - |
| disable-validate | `boolean`                           | 是否禁用触发表单字段验证                                                         | `false`                 | - |
| value-key | `string` | 设置选项解析时 `value` 的键值 | `'value'` | `2.0.0` |
| label-key | `string` | 设置选项解析时 `label` 的键值 | `'label'` | `2.0.0` |

### Select Events

| Name             | Description                                                                 | Parameters         | Since |
| ---------------- | -------------------------------------------------------------------- | ------------ | --- |
| toggle        | 当选项列表显示状态改变时触发，返回当前的状态                         | `(visible: boolean)`      | - |
| select        | 当选项被选时触发（无论是否改变），返回被选选项的值和标签             | `(value: string \| number, label: string)` | - |
| cancel        | 当选项被取消时触发，仅在多选模式下触发，返回被取消选项的值和标签     | `(value: string \| number, label: string)` | - |
| change        | 当被选值改变时触发，返回选项的值和标签，多选模式下为值数组和标签数组 | `(value: string \| number, label: string)` | - |
| outside-click | 当点击选择器外部是触发，无返回值                                     | -            | - |
| outside-close | 当通过点击外部关闭选项列表时触发，无返回值                           | -            | - |
| clear         | 当通过清除按钮清空值时触发，无返回值                                 | -            | - |

### Select Slots

| Name    | Description                   | Parameters | Since |
| ------- | ---------------------- | --- | --- |
| default | 选项内容的插槽         | `(option: { value: string \| number, label?: string, disabled?: boolean, divided?: boolean, noTitle?: boolean }, index: number, selected: boolean, handleSelect: (value: string \| number, label: string) => void)` | - |
| prefix  | 前置图标内容的插槽     | - | - |
| control | 选择器主控件内容的插槽 | - | - |
| suffix  | 后缀图标内容的插槽     | - | - |
| empty   | 空选项提示内容的插槽   | - | - |
