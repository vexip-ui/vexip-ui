# Select 选择器

下拉选择器，当有较多的选项供用户选择时使用，选项较少时或许 RadioGroup 或 CheckboxGroup 的效果会更好。

## 代码示例

:::demo select/basis

### 基础用法

直接传入 `options` 提供选项。

:::

:::demo select/disabled

### 禁用状态

添加 `disabled` 属性可以设置禁用状态。

:::

:::demo select/size

### 改变尺寸

设置 `size` 属性的值可以改变尺寸，目前一共提供了三种尺寸供选择，或者使用样式自定义。

:::

:::demo select/height

### 列表高度

当选项数量过多时，会自动使用滚动条以方便用户浏览选项。

设置 `max-list-height` 属性可以调整选项列表的最大高度值。

:::

:::demo select/label

### 获取标签

当你需要快速获取 `label` 值时，可以通过 `@update:label` 事件获取。

当然你可以像示例一样使用 `v-model:label` 的写法，不过组件内部并不会根据 `label` 更新选项。

:::

:::demo select/custom

### 自定义选项

有的场合，需要选项显示内容、已选选项显示内容、选项值均不相同，可以结合 `label` 属性和插槽实现。

还可以通过 `selected` 插槽针对性地定制已选选项的显示内容。

:::

:::demo select/multiple

### 多选模式

添加 `multiple` 属性可以开启多选模式。

添加 `option-check` 属性可以开启被选选项打勾功能，通常配合多选模式一同使用。

:::

:::demo select/options

### 选项解析

`options` 属性可以直接传字符串，组件内部会自动处理。

:::

:::demo select/filter

### 过滤选项

添加 `filter` 属性可以开启选项过滤。

默认使用内置的过滤方法，如果你想要自定义过滤的方法可以传入一个函数。

添加 `ignore-case` 属性可以在使用内置过滤方法时忽略大小写。

:::

:::demo select/remote

### 远程模式

普通模式下，选项中未包含的值将会被忽略。

添加 `remote` 属性可以开启远程模式，在该模式下值将被缓存，过滤仅派发事件。

:::

:::demo select/creatable

### 创建选项

在开启了过滤选项功能后，

:::

:::demo select/prefix-suffix

### 前后置图标

通过 `prefix` 和 `suffix` 属性或同名插槽，可以为选择器添加前置或后置图标。

添加 `static-suffix` 属性可以使后置图标静止，或添加 `no-suffix` 属性禁用后置图标。

:::

:::demo select/custom-key

### 自定义键

通过 `key-config` 可以指定解析选项的各项键值，毕竟有时候处理选项也挺麻烦的。

:::

:::demo select/group

### 选项分组

传入选项时，设置 `group` 选项为 `true`，并将子项放在 `children` 选项下，可以实现分组。

通过 `group` 插槽可以自定义组标签的内容。

:::

:::demo select/loading

### 加载状态

通过 `loading` 属性可以控制选择器的加载状态。

如果你希望在加载中时为只读，你需要添加 `loading-lock` 属性。

:::

:::demo select/virtual

### 虚拟滚动

数据量再多个 `100` 倍，应该也不卡。

:::

:::demo select/transparent

### 透明模式

添加 `transparent` 属性可以消除原有的样式，然后你可以包裹上你喜欢的样式。

:::

:::demo select/popper-extra

### 列表额外内容

==!s|2.2.7==

通过 `prepend` 和 `append` 插槽可以分别为选项列表的前方和后方插入内容。

:::

## API

### 预设类型

```ts
export interface SelectKeyConfig {
  value?: string,
  label?: string,
  disabled?: string,
  divided?: string,
  title?: string,
  group?: string,
  children?: string
}

type SelectRawOption = string | Record<string, any>
type SelectBaseValue = string | number | boolean
type SelectValue = SelectBaseValue | SelectBaseValue[] | null

interface SelectOptionState {
  value: SelectValue,
  label: string,
  disabled: boolean,
  divided: boolean,
  title: string,
  hidden: boolean,
  hitting: boolean,
  group: boolean,
  depth: number,
  parent: SelectOptionState | null,
  data: SelectRawOption
}

type SelectFilter = (value: string, options: SelectOptionState) => boolean
```

### Select 属性

| 名称            | 类型                                             | 说明                                                                      | 默认值         | 始于     |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------------------- | -------------- | -------- |
| visible         | `boolean`                                        | 设置选项列表是否显示                                                      | `false`        | -        |
| options         | `SelectRawOption[]`                              | 设置选择器的选项                                                          | `[]`           | -        |
| size            | `'small' \| 'default' \| 'large'`                | 选择器的大小                                                              | `'default'`    | -        |
| state           | `'default' \| 'success' \| 'error' \| 'warning'` | 选择器的状态                                                              | `'default'`    | -        |
| disabled        | `boolean`                                        | 设置是否禁用选择器                                                        | `false`        | -        |
| outside-close   | `boolean`                                        | 设置是否可以通过点击组件外部进行关闭                                      | `false`        | -        |
| placeholder     | `string`                                         | 同原生的 placeholder                                                      | `''`           | -        |
| prefix          | `Record<string, any>`                            | 前缀图标，使用前缀插槽时无效                                              | `null`         | -        |
| prefix-color    | `string`                                         | 前缀内容的颜色，会影响前缀插槽                                            | `''`           | -        |
| suffix          | `Record<string, any>`                            | 后缀图标，使用后缀插槽时无效                                              | `null`         | -        |
| suffix-color    | `string`                                         | 后缀内容的颜色，会影响后缀插槽                                            | `''`           | -        |
| no-suffix       | `boolean`                                        | 设置是否禁用后缀图标                                                      | `false`        | -        |
| static-suffix   | `boolean`                                        | 设置后缀图标是否为静态的                                                  | `false`        | -        |
| value           | `SelectValue`                                    | 选择器的值，可以使用 `v-model` 双向绑定，多选模式时为数组                 | `null`         | -        |
| clearable       | `boolean`                                        | 设置是否可以清空值                                                        | `false`        | -        |
| max-list-height | `number`                                         | 设置选项列表的最大高度，超过高度后会出现滚动条                            | `300`          | -        |
| transition-name | `string`                                         | 选项列表的过渡动画                                                        | `'vxp-drop'`   | -        |
| placement       | `Placement`                                      | 选项列表的出现位置，可选值同 Popper.js                                    | `'bottom'`     | -        |
| transfer        | `boolean \| string`                              | 设置选项列表的渲染位置，设置为 `true` 时默认渲染至 `<body>`               | `false`        | -        |
| list-class      | `ClassType`                                      | 选项列表的自定义类名                                                      | `null`         | -        |
| multiple        | `boolean`                                        | 设置是否开启多选模式                                                      | `false`        | -        |
| option-check    | `boolean`                                        | 设置开启被选选项打勾功能                                                  | `false`        | -        |
| empty-text      | `string`                                         | 设置空选项时的提示语                                                      | `locale.empty` | -        |
| key-config      | `SelectKeyConfig`                                | 设置选项解析 `options` 时的各项键名                                       | `{}`           | `2.0.0`  |
| loading         | `boolean`                                        | 设置是否为加载中                                                          | `false`        | `2.0.0`  |
| loading-icon    | `Record<string, any>`                            | 设置加载中的图标                                                          | `Spinner`      | `2.0.0`  |
| loading-lock    | `boolean`                                        | 设置在加载中时是否为只读                                                  | `false`        | `2.0.0`  |
| loading-effect  | `string`                                         | 设置加载中图标的效果动画                                                  | `false`        | `2.1.0`  |
| filter          | `boolean \| SelectFilter`                        | 过滤 `options` 的方法，传入 `true` 时会使用内置比较方法                   | `false`        | `2.0.0`  |
| ignore-case     | `boolean`                                        | 在使用内置的过滤时，设置是否忽略大小写                                    | `false`        | `2.0.0`  |
| creatable       | `boolean`                                        | 设置在开启了过滤选项功能后，是否支持动态创建选项                          | `false`        | `2.0.0`  |
| transparent     | `boolean`                                        | 设置是否为透明模式                                                        | `false`        | `2.0.2`  |
| max-tag-count   | `number`                                         | 在多选模式下，设置显示的最大标签数，为 `0` 时会动态计算以确保在一行内显示 | `0`            | `2.1.0`  |
| no-rest-tip     | `boolean`                                        | 设置是否禁用额外标签的气泡提示                                            | `false`        | `2.1.0`  |
| tag-type        | `TagType`                                        | 设置多选模式下标签的类型                                                  | `null`         | `2.1.0`  |
| locale          | `LocaleConfig['select']`                         | 设置多语言配置                                                            | `null`         | `2.1.0`  |
| no-preview      | `boolean`                                        | 设置是否禁用选项标签动态预览功能                                          | `false`        | `2.1.10` |
| remote          | `boolean`                                        | 是否开启远程模式                                                          | `false`        | `2.1.12` |
| fit-popper      | `boolean \| number`                              | 设置选项列表与选择器是否强制等宽，也可以传入一个数值指定选项列表的宽度    | `false`        | `2.1.23` |
| name            | `string`                                         | 设置内部 `<input>` 的 `name` 属性，仅使用过滤时有效                       | `''`           | `2.2.2`  |
| popper-alive    | `boolean`                                        | 设置 Popper 元素是否持久化，默认会在未设置 `transfer` 属性时持久化        | `null`         | `2.2.3`  |
| count-limit     | `number`                                         | 多选时限制最大的可选数量，为 `0` 时不限制                                 | `0`            | `2.2.3`  |

### Select 事件

| 名称          | 说明                                                                 | 参数                                                               | 始于    |
| ------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| toggle        | 当选项列表显示状态改变时触发，返回当前的状态                         | `(visible: boolean)`                                               | -       |
| select        | 当选项被选时触发（无论是否改变），返回被选选项的值和标签             | `(value: SelectBaseValue, data: SelectRawOption)`                  | -       |
| cancel        | 当选项被取消时触发，仅在多选模式下触发，返回被取消选项的值和标签     | `(value: SelectBaseValue, data: SelectRawOption)`                  | -       |
| change        | 当被选值改变时触发，返回选项的值和标签，多选模式下为值数组和标签数组 | `(value: SelectValue, data: SelectRawOption \| SelectRawOption[])` | -       |
| outside-click | 当点击选择器外部是触发                                               | -                                                                  | -       |
| outside-close | 当通过点击外部关闭选项列表时触发                                     | -                                                                  | -       |
| clear         | 当通过清除按钮清空值时触发                                           | -                                                                  | -       |
| focus         | 当控件元素聚焦时触发，返回事件对象                                   | `(event: FocusEvent)`                                              | `2.0.0` |
| blur          | 当控件元素失去焦点时触发，返回事件对象                               | `(event: FocusEvent)`                                              | `2.0.0` |
| update:label  | 当选项值改变时触发，用于快速获取当前选项的标签值                     | `(label: string)`                                                  | `2.0.0` |
| filter-input  | 当搜索内容输入时触发，返回当前输入框的值                             | `(value: string)`                                                  | `2.1.4` |

### Select 插槽

| 名称     | 说明                                         | 参数                                                              | 始于    |
| -------- | -------------------------------------------- | ----------------------------------------------------------------- | ------- |
| default  | 选项内容的插槽                               | `{ option: SelectOptionState, index: number, selected: boolean }` | -       |
| group    | 组标签的内容插槽                             | `{ option: SelectOptionState, index: number }`                    | `2.0.0` |
| prefix   | 前置图标内容的插槽                           | -                                                                 | -       |
| control  | 选择器主控件内容的插槽，通常情况下不应该使用 | -                                                                 | -       |
| suffix   | 后缀图标内容的插槽                           | -                                                                 | -       |
| empty    | 空选项提示内容的插槽                         | -                                                                 | -       |
| selected | 已选选项的回显内容的插槽                     | `{ option: SelectOptionState, preview: boolean }`                 | `2.2.5` |
| prepend  | 选项列表上方内容的插槽                       | -                                                                 | `2.2.7` |
| append   | 选项列表下方内容的插槽                       | -                                                                 | `2.2.7` |
