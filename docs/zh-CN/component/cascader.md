# 联级选择器 Cascader ^[Since v2.0.0](!s)

当需要从一组相关联的数据集合进行一系列选择时使用，常用于在选择省市区、分类的事物等。

## 代码示例

:::demo cascader/basis

### 基础用法

最简单的用法，在同一个父级下的选项的值须均不相同。

:::

:::demo cascader/hover

### 悬停触发

添加 `hover-trigger` 属性可以开启鼠标悬停触发展开下层面板。

该特性在开启了异步加载后无效。

:::

:::demo cascader/clearable

### 可清空

添加 `clearable` 属性可以开启清空值功能。

:::

:::demo cascader/multiple

### 多选模式

添加 `multiple` 属性可以开启多选模式。

:::

:::demo cascader/size

### 改变尺寸

设置 `size` 属性的值可以改变尺寸。

:::

:::demo cascader/max-count

### 标签数

通过 `max-tag-count` 属性可以设置多选模式下标签显示的最大值。

当设置为 `0` 时，组件内部会动态计算最大值以让标签维持在一行内显示。

如果你希望任何时候都显示所有标签，只需要将其设置为 `Infinity`。

:::

:::demo cascader/no-cascaded

### 非关联选项

添加 `no-cascaded` 属性可以使得每个选项都是独立可选的。

在该模式下，最好保证所有的父子级选项的 `label` 均不相同，否则在显示上会引发歧义。

:::

:::demo cascader/brief-label

### 简短标签

添加 `brief-label` 属性可以使得显示的标签只保留最后一节。

:::

:::demo cascader/merged

### 合并标签

在多选模式下添加 `merge-tags` 属性可以开启合并标签功能。

开启后，当某个选项的所有子级都被选择时，会合并显示为父选项的标签。

:::

:::demo cascader/async-load

### 异步加载

通过 `on-async-load` 属性可以开启异步加载模式。

在多选模式下添加 `merge-tags` 属性可以使得父选项在子级未完全加载完的情况下可被选择。

注意，在异步加载下开启 `merge-tags` 会使得控件的 `value` 也合并为父选项的值，这与非异步加载时的表现是不一样的。

:::

:::demo cascader/loading

### 加载状态

通过 `loading` 属性可以控制联级选择器的加载状态。

如果你希望在加载中时为只读，你需要添加 `loading-lock` 属性。

:::

## API

### 预设类型

```ts
type Data = Record<string, any>
type CascaderValue = (string | number)[] | (string | number)[][]

interface CascaderKeyConfig {
  value?: string,
  label?: string,
  children?: string,
  disabled?: string,
  hasChild?: string
}

interface CascaderOptionState {
  id: number,
  parent: number,
  value: string | number,
  fullValue: string,
  label: string,
  fullLabel: string,
  children: CascaderOptionState[],
  disabled: boolean,
  hasChild: boolean,
  checked: boolean,
  partial: boolean,
  loading: boolean,
  loaded: boolean,
  error: boolean,
  childrenLoaded: boolean,
  data: Data
}
```

### Cascader 属性

| 名称            | 类型                                             | 说明                                                                                                 | 默认值           | 始于    |
| --------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ---------------- | ------- |
| size            | `'small' \| 'default' \| 'large'`                | 联级选择器的大小                                                                                     | `'default'`      | -       |
| state           | `'default' \| 'success' \| 'error' \| 'warning'` | 联级选择器的状态                                                                                     | `'default'`      | -       |
| prefix          | `Record<string, any>`                            | 前缀图标，使用前缀插槽时无效                                                                         | `null`           | -       |
| prefix-color    | `string`                                         | 前缀内容的颜色，会影响前缀插槽                                                                       | `''`             | -       |
| suffix          | `Record<string, any>`                            | 后缀图标，使用后缀插槽时无效                                                                         | `null`           | -       |
| suffix-color    | `string`                                         | 后缀内容的颜色，会影响后缀插槽                                                                       | `''`             | -       |
| no-suffix       | `boolean`                                        | 设置是否禁用后缀图标                                                                                 | `false`          | -       |
| static-suffix   | `boolean`                                        | 设置后缀图标是否为静态的                                                                             | `false`          | -       |
| visible         | `boolean`                                        | 设置选项列表是否显，可以使用 `v-model` 双向绑定                                                      | `false`          | -       |
| options         | `Data[]`                                         | 设置联级选择器的选项                                                                                 | `[]`             | -       |
| value           | `CascaderValue`                                  | 联级选择器的值，可以使用 `v-model` 双向绑定                                                          | `null`           | -       |
| disabled        | `boolean`                                        | 设置是否禁用联级选择器                                                                               | `false`          | -       |
| multiple        | `boolean`                                        | 设置是否开启多选模式                                                                                 | `false`          | -       |
| no-cascaded     | `boolean`                                        | 设置是否解除父子选项的关联，解除后父选项可以被单独选择                                               | `false`          | -       |
| key-config      | `CascaderKeyConfig`                              | 配置解析 `options` 时的各项键名                                                                      | `{}`             | -       |
| separator       | `string`                                         | 设置选项值和标签的连接符，要求长度为 `1`，注意其会被用于内部构建选项值完整路径                       | `/`              | -       |
| hover-trigger   | `boolean`                                        | 设置是否开启鼠标移入触发展开下层面板，开启异步加载后无效                                             | `false`          | -       |
| max-tag-count   | `number`                                         | 在多选模式下，设置显示的最大标签数，为 `0` 时会动态计算以确保在一行内显示                            | `0`              | -       |
| brief-label     | `boolean`                                        | 设置是否显示简短标签值                                                                               | `false`          | -       |
| no-rest-tip     | `boolean`                                        | 设置是否禁用额外标签的气泡提示                                                                       | `false`          | -       |
| on-async-load   | `(data: Data) => any[] \| Promise<any[]>`        | 设置异步加载的回调函数，设置后将会开启异步加载                                                       | `null`           | -       |
| merge-tags      | `boolean`                                        | 在多选模式下，设置是否在所有子级选项均被选择时显示为父级选项，在异步加载下开启会使传值方式会发生改变 | `false`          | -       |
| tag-type        | `TagType`                                        | 设置多选模式下标签的类型                                                                             | `null`           | -       |
| outside-close   | `boolean`                                        | 设置是否可以通过点击组件外部进行关闭                                                                 | `false`          | -       |
| placeholder     | `string`                                         | 同原生的 `palceholder`                                                                               | `''`             | -       |
| clearable       | `boolean`                                        | 设置是否可以清空值                                                                                   | `false`          | -       |
| transition-name | `string`                                         | 选项列表的过渡动画                                                                                   | `'vxp-drop'`     | -       |
| placement       | `Placement`                                      | 选项列表的出现位置，可选值同 Popper.js                                                               | `'bottom-start'` | -       |
| transfer        | `boolean \| string`                              | 设置选项列表的渲染位置，设置为 `true` 时默认渲染至 `<body>`                                          | `false`          | -       |
| empty-text      | `string`                                         | 设置空选项时的提示语                                                                                 | `locale.empty`   | -       |
| loading         | `boolean`                                        | 设置是否为加载中                                                                                     | `false`          | -       |
| loading-icon    | `Record<string, any>`                            | 设置加载中的图标                                                                                     | `Spinner`        | -       |
| loading-lock    | `boolean`                                        | 设置在加载中时是否为只读                                                                             | `false`          | -       |
| loading-effect  | `string`                                         | 设置加载中图标的效果动画                                                                             | `false`          | `2.1.0` |
| transparent     | `boolean`                                        | 设置是否为透明模式                                                                                   | `false`          | `2.0.2` |
| locale          | `LocaleConfig['select']`                         | 设置多语言配置                                                                                       | `null`           | `2.1.0` |

### Cascader 事件

| 名称          | 说明                                                                                 | 参数                                               | 始于 |
| ------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------- | ---- |
| toggle        | 当选项列表显示状态改变时触发，返回当前的状态                                         | `(visible: boolean)`                               | -    |
| select        | 当选项被选时触发，返回被选选项的值路径和选项数据                                     | `(value: (string \| number)[], data: Data)`        | -    |
| cancel        | 当选项被取消时触发，仅在多选模式下触发，返回被取消选项的值路径和选项数据             | `(value: (string \| number)[], data: Data)`        | -    |
| change        | 当被选值改变时触发，返回选项的值路径和选项数据，多选模式下为值路径数组和选项数据数组 | `(value: CascaderValue, data: Data[] \| Data[][])` | -    |
| click-outside | 当点击联级选择器外部是触发，无返回值                                                 | -                                                  | -    |
| outside-close | 当通过点击外部关闭选项列表时触发，无返回值                                           | -                                                  | -    |
| clear         | 当通过清除按钮清空值时触发，无返回值                                                 | -                                                  | -    |

### Cascader 插槽

| 名称    | 说明                                                           | 参数                                                                                                      | 始于 |
| ------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ---- |
| default | 选项内容的插槽，其中参数提供的 `hasChild` 是内部计算后的结果   | `{ option: CascaderOptionState, index: number, selected: boolean, canCheck: boolean, hasChild: boolean }` | -    |
| label   | 选项标签值的插槽，其中参数提供的 `hasChild` 是内部计算后的结果 | `{ option: CascaderOptionState, index: number, selected: boolean, canCheck: boolean, hasChild: boolean }` | -    |
| prefix  | 前置图标内容的插槽                                             | -                                                                                                         | -    |
| control | 选择器主控件内容的插槽                                         | -                                                                                                         | -    |
| suffix  | 后缀图标内容的插槽                                             | -                                                                                                         | -    |
| empty   | 空选项提示内容的插槽                                           | -                                                                                                         | -    |
