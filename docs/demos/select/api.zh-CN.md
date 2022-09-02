### 预设类型

```ts
export interface SelectKeyConfig {
  value?: string,
  label?: string,
  disabled?: string,
  divided?: string,
  noTitle?: string,
  group?: string,
  children?: string
}

type SelectRawOption = string | Record<string, any>
type SelectValue = string | number | (string | number)[]

interface SelectOptionState {
  value: string | number,
  label: string,
  disabled: boolean,
  divided: boolean,
  noTitle: boolean,
  hidden: boolean,
  hitting: boolean,
  group: boolean,
  depth: number,
  parent: SelectOptionState | null,
  data: SelectRawOption
}
```

### Select 属性

| 名称            | 类型                                                                           | 说明                                                        | 默认值         | 始于    |
| --------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------- | -------------- | ------- |
| visible         | `boolean`                                                                      | 设置选项列表是否显示                                        | `false`        | -       |
| options         | `SelectRawOption[]`                                                            | 设置选择器的选项                                            | `[]`           | -       |
| size            | `'small' \| 'default' \| 'large'`                                              | 选择器的大小                                                | `'default'`    | -       |
| state           | `'default' \| 'success' \| 'error' \| 'warning'`                               | 选择器的状态                                                | `'default'`    | -       |
| disabled        | `boolean`                                                                      | 设置是否禁用选择器                                          | `false`        | -       |
| outside-close   | `boolean`                                                                      | 设置是否可以通过点击组件外部进行关闭                        | `false`        | -       |
| placeholder     | `string`                                                                       | 同原生的 palceholder                                        | `''`           | -       |
| prefix          | `Record<string, any>`                                                          | 前缀图标，使用前缀插槽时无效                                | `null`         | -       |
| prefix-color    | `string`                                                                       | 前缀内容的颜色，会影响前缀插槽                              | `''`           | -       |
| suffix          | `Record<string, any>`                                                          | 后缀图标，使用后缀插槽时无效                                | `null`         | -       |
| suffix-color    | `string`                                                                       | 后缀内容的颜色，会影响后缀插槽                              | `''`           | -       |
| no-suffix       | `boolean`                                                                      | 设置是否禁用后缀图标                                        | `false`        | -       |
| static-suffix   | `boolean`                                                                      | 设置后缀图标是否为静态的                                    | `false`        | -       |
| value           | `SelectValue`                                                                  | 选择器的值，可以使用 `v-model` 双向绑定，多选模式时为数组   | `null`         | -       |
| clearable       | `boolean`                                                                      | 设置是否可以清空值                                          | `false`        | -       |
| max-list-height | `number`                                                                       | 设置选项列表的最大高度，超过高度后会出现滚动条              | `300`          | -       |
| transition-name | `string`                                                                       | 选项列表的过渡动画                                          | `'vxp-drop'`   | -       |
| placement       | `Placement`                                                                    | 选项列表的出现位置，可选值同 Popper.js                      | `'bottom'`     | -       |
| transfer        | `boolean \| string`                                                            | 设置选项列表的渲染位置，设置为 `true` 时默认渲染至 `<body>` | `false`        | -       |
| list-class      | `ClassType`                                                                    | 选项列表的自定义类名                                        | `null`         | -       |
| multiple        | `boolean`                                                                      | 设置是否开启多选模式                                        | `false`        | -       |
| option-check    | `boolean`                                                                      | 设置开启被选选项打勾功能                                    | `false`        | -       |
| empty-text      | `string`                                                                       | 设置空选项时的提示语                                        | `locale.empty` | -       |
| key-config      | `SelectKeyConfig`                                                              | 设置选项解析 `options` 时的各项键名                         | `{}`           | `2.0.0` |
| loading         | `boolean`                                                                      | 设置是否为加载中                                            | `false`        | `2.0.0` |
| loading-icon    | `Record<string, any>`                                                          | 设置加载中的图标                                            | `Spinner`      | `2.0.0` |
| loading-lock    | `boolean`                                                                      | 设置在加载中时是否为只读                                    | `false`        | `2.0.0` |
| loading-spin    | `boolean`                                                                      | 设置加载中图标是否使用旋转动画                              | `false`        | `2.0.0` |
| filter          | `boolean \| (value: string \| number, options: SelectOptionState) => boolean)` | 过滤 `options` 的方法，传入 `ture` 时会使用内置比较方法     | `false`        | `2.0.0` |
| ignore-case     | `boolean`                                                                      | 在使用内置的过滤时，设置是否忽略大小写                      | `false`        | `2.0.0` |
| creatable       | `boolean`                                                                      | 设置在开启了过滤选项功能后，是否支持动态创建选项            | `false`        | `2.0.0` |

### Select 事件

| 名称          | 说明                                                                 | 参数                                                               | 始于    |
| ------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| toggle        | 当选项列表显示状态改变时触发，返回当前的状态                         | `(visible: boolean)`                                               | -       |
| select        | 当选项被选时触发（无论是否改变），返回被选选项的值和标签             | `(value: string \| number, data: SelectRawOption)`                 | -       |
| cancel        | 当选项被取消时触发，仅在多选模式下触发，返回被取消选项的值和标签     | `(value: string \| number, data: SelectRawOption)`                 | -       |
| change        | 当被选值改变时触发，返回选项的值和标签，多选模式下为值数组和标签数组 | `(value: SelectValue, data: SelectRawOption \| SelectRawOption[])` | -       |
| outside-click | 当点击选择器外部是触发，无返回值                                     | -                                                                  | -       |
| outside-close | 当通过点击外部关闭选项列表时触发，无返回值                           | -                                                                  | -       |
| clear         | 当通过清除按钮清空值时触发，无返回值                                 | -                                                                  | -       |
| focus         | 当控件元素聚焦时触发，返回事件对象                                   | `(event: FocusEvent)`                                              | `2.0.0` |
| blur          | 当控件元素失去焦点时触发，返回事件对象                               | `(event: FocusEvent)`                                              | `2.0.0` |
| update:label  | 当选项值改变时触发，用于快速当前选项的标签值                         | `(label: string)`                                                  | `2.0.0` |

### Select 插槽

| 名称    | 说明                                         | 参数                                                              | 始于    |
| ------- | -------------------------------------------- | ----------------------------------------------------------------- | ------- |
| default | 选项内容的插槽                               | `{ option: SelectOptionState, index: number, selected: boolean }` | -       |
| group   | 组标签的内容插槽                             | `{ option: SelectOptionState, index: number }`                    | `2.0.0` |
| prefix  | 前置图标内容的插槽                           | -                                                                 | -       |
| control | 选择器主控件内容的插槽，通常情况下不应该使用 | -                                                                 | -       |
| suffix  | 后缀图标内容的插槽                           | -                                                                 | -       |
| empty   | 空选项提示内容的插槽                         | -                                                                 | -       |
