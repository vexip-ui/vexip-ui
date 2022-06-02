### Switcher Props

| Name          | Type     | Description                                                                                                    | Default    | Since |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------- | --------- | --- |
| value         | `boolean`  | 开关的值，可以使用 v-model 双向绑定                                                                     | `false`     | - |
| disabled      | `boolean`  | 设置是否禁用开关                                                                                        | `false`     | - |
| size          | `'small' \| 'default' \| 'large'`   | 开关的大小                                                        | `'default'` | - |
| state        | `'default' \| 'success' \| 'error' \| 'warning'`           | 开关的状态                                   | `'default'` | - |
| open-color    | `string`   | 打开状态时开关的填充颜色                                                                                | `''`        | - |
| close-color   | `string`   | 关闭状态时开关的填充颜色                                                                                | `''`        | - |
| loading       | `boolean`  | 设置是否为加载状态                                                                                      | `false`     | - |
| icon | `Record<string, any>` | 开关手柄内非加载时的图标，使用了 `icon` 插槽后失效 | `null` | - |
| open-text     | `string`   | 打开状态时开关的填充文字                                                                                | `''`        | - |
| close-text    | `string`   | 关闭状态时开关的填充文字                                                                                | `''`        | - |
| on-before-change | `(checked: boolean) => unknown` | 设置开关的值变化前回调，接收一个参数标将要变化为的值，支持异步函数和 Promise，返回值为 `false` 会阻止变化 | `null`      | - |
| disable-validate | `boolean`                           | 是否禁用触发表单字段验证                                                         | ``false``                 | - |

### Switcher Events

| Name       | Description                                       | Parameters  | Since |
| ---------- | ------------------------------------------ | ----- | --- |
| change | 当开关的状态发生变化时触发，返回当前的状态 | `(value: boolean)` | - |

### Switcher Slots

| Name    | Description                     | Parameters | Since |
| ------- | ------------------------ | --- | --- |
| loading | 加载时图标的插槽         | - | - |
| icon | 非加载时的图标插槽 | - | - |
| open    | 打开状态时填充内容的插槽 | - | - |
| close   | 关闭状态时填充状态的插槽 | - | - |
