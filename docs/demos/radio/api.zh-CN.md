### Radio 属性

| 名称         | 类型                                             | 说明                                                                             | 默认值      | 始于    |
| ------------ | ------------------------------------------------ | -------------------------------------------------------------------------------- | ----------- | ------- |
| value        | `string \| number`                               | 单选框的值，通常搭配 group 组件使用（**label** 标签值与 group **value** 值绑定） | `null`      | -       |
| label        | `string \| number`                               | 单选框的标签值，当值与标签全等时，单选框将被选中，标签值**必需设置**             | `null`      | -       |
| label-class  | `ClassType`                                      | 单选框的标签内容的自定义类名                                                     | `null`      | -       |
| size         | `'small' \| 'default' \| 'large'`                | 单选框的大小                                                                     | `'default'` | -       |
| state        | `'default' \| 'success' \| 'error' \| 'warning'` | 单选框的状态                                                                     | `'default'` | -       |
| disabled     | `boolean`                                        | 设置是否禁用单选框                                                               | `false`     | -       |
| border       | `boolean`                                        | 设置单选框是否具有边框                                                           | `false`     | -       |
| loading      | `boolean`                                        | 设置是否为加载中                                                                 | `false`     | `2.0.0` |
| loading-lock | `boolean`                                        | 设置在加载中时是否为只读                                                         | `false`     | `2.0.0` |

### Radio 事件

| 名称   | 说明                                   | 参数                        | 始于 |
| ------ | -------------------------------------- | --------------------------- | ---- |
| change | 当单选框的值发生变化时触发，返回当前值 | `(value: string \| number)` | -    |

### Radio 插槽

| 名称    | 说明                 | 参数 | 始于 |
| ------- | -------------------- | ---- | ---- |
| defalut | 单选框标签内容的插槽 | -    | -    |

### RadioGroup 属性

| 名称           | 类型                                                                    | 说明                                                               | 默认值      | 始于    |
| -------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------- | ------- |
| value          | `string \| number`                                                      | 单选框组的值，标签值与该值相同的单选框将被选中                     | `null`      | -       |
| vertical       | `boolean`                                                               | 设置是否开启纵向显示                                               | `false`     | -       |
| size           | `'small' \| 'default' \| 'large'`                                       | 单选框的大小，会覆盖单选框单独设置的 `size`                        | `'default'` | -       |
| disabled       | `boolean`                                                               | 设置是否禁用单选框组                                               | `false`     | -       |
| button         | `boolean`                                                               | 设置是否开启按钮模式，在纵向显示时暂不支持                         | `false`     | -       |
| border         | `boolean`                                                               | 设置单选框是否具有边框                                             | `false`     | -       |
| options        | `(string \| number \| { label: string \| number, content?: string })[]` | 设置选子单选框的选项，一般用于简单快速生成单选框组，使用插槽后失效 | `[]`        | -       |
| loading        | `boolean`                                                               | 设置是否为加载中                                                   | `false`     | `2.0.0` |
| loading-icon   | `Record<string, any>`                                                   | 设置加载中的图标，只在按钮模式生效                                 | `Spinner`   | `2.0.0` |
| loading-lock   | `boolean`                                                               | 设置在加载中时是否为只读                                           | `false`     | `2.0.0` |
| loading-effect | `string`                                                                | 设置加载中图标的效果动画，只在按钮模式生效                         | `false`     | `2.0.0` |

### RadioGruop 事件

| 名称   | 说明                                     | 参数                        | 始于 |
| ------ | ---------------------------------------- | --------------------------- | ---- |
| change | 当单选框组的值发生变化时触发，返回当前值 | `(value: string \| number)` | -    |
