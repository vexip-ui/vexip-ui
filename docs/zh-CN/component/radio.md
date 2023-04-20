# 单选框 Radio

## 代码示例

需要在一组选项中进行单项选择时使用，或是结合单选框组用于需要表示两种状态之间的切换的场合。

:::demo radio/basis

### 基础用法

单选框具有 `label` 和 `value` 两个基础属性，当 `value` 的值与 `label` 全等时，单选框处于被选状态。

每个单选框的 `label` 属性都必须是一个有效的字符串或数字。

:::

:::demo radio/border

### 边框样式

添加 `border` 属性可以设置单选框组为边框样式。

:::

:::demo radio/button

### 按钮样式

添加 `button` 属性可以设置单选框组为按钮样式。

:::

:::demo radio/disabled

### 禁用状态

添加 `disabled` 属性可以设置禁用状态。

:::

:::demo radio/group

### 单选框组

使用单选框组可以轻松的通过数组结构生成系列单选框，这也是更常用的做法。

:::

:::demo radio/loading

### 加载状态

通过 `loading` 属性可以控制单选框的加载状态。

如果你希望在加载中时为只读，你需要添加 `loading-lock` 属性。

:::

:::demo radio/size

### 改变尺寸

设置 `size` 属性的值可以改变单选框的尺寸，目前一共提供了三种尺寸供选择。

:::

:::demo radio/state

### 不同状态

通过 `state` 可以设置不同的状态。

:::

:::demo radio/vertical

### 垂直排列

添加 `vertical` 属性可以设置单选框组垂直布局。

:::

## API

### Radio 属性

| 名称         | 类型                                             | 说明                                                                 | 默认值      | 始于    |
| ------------ | ------------------------------------------------ | -------------------------------------------------------------------- | ----------- | ------- |
| value        | `string \| number`                               | 单选框的值，通常配合 group 组件使用                                  | `null`      | -       |
| label        | `string \| number`                               | 单选框的标签值，当值与标签全等时，单选框将被选中，标签值**必需设置** | `null`      | -       |
| label-class  | `ClassType`                                      | 单选框的标签内容的自定义类名                                         | `null`      | -       |
| size         | `'small' \| 'default' \| 'large'`                | 单选框的大小                                                         | `'default'` | -       |
| state        | `'default' \| 'success' \| 'error' \| 'warning'` | 单选框的状态                                                         | `'default'` | -       |
| disabled     | `boolean`                                        | 设置是否禁用单选框                                                   | `false`     | -       |
| border       | `boolean`                                        | 设置单选框是否具有边框                                               | `false`     | -       |
| loading      | `boolean`                                        | 设置是否为加载中                                                     | `false`     | `2.0.0` |
| loading-lock | `boolean`                                        | 设置在加载中时是否为只读                                             | `false`     | `2.0.0` |

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
