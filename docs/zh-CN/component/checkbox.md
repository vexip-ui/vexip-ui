# Checkbox 多选框

需要在一组选项中进行多项选择时使用，或是用于需要表示两种状态之间的切换的场合。

## 代码示例

:::demo checkbox/basis

### 基础用法

一个简单的 Checkbox，开关某些东西的时候可能会这样用。

:::

:::demo checkbox/disabled

### 禁用状态

添加 `disabled` 属性可以设置禁用状态。

:::

:::demo checkbox/size

### 三种尺寸

三种尺寸却有四个，正常的。

:::

:::demo checkbox/group

### 复选框组

使用复选框组可以轻松的通过数组结构生成系列复选框。

:::

:::demo checkbox/vertical

### 纵向布局

为 CheckboxGroup 添加 `vertical` 属性可以实现纵向排列。

:::

:::demo checkbox/total

### 全选控件

在需要实现全选时，只需要在复选框组内添加一个具有 `control` 属性的复选框即可。

:::

:::demo checkbox/layout

### 灵活布局

结合布局组件可以灵活地对复选框组进行自定义布局。

:::

:::demo checkbox/options

### 选项

通过 `options` 属性可以快速生成复选框组。

:::

:::demo checkbox/loading

### 加载状态

通过 `loading` 属性可以控制多选框的加载状态。

如果你希望在加载中时为只读，你需要添加 `loading-lock` 属性。

:::

:::demo checkbox/state

### 不同状态

通过 `state` 可以设置不同的状态。

:::

:::demo checkbox/color

### 自定义颜色

^[Since v2.2.5](!s)

通过 `color` 属性可以定制化复选框的主题色。

同时添加 `state-color` 属性可以让该颜色作为状态色。

:::

## API

### 预设类型

```ts
type RawOption =
  | string
  | {
    value: string | number,
    label?: string,
    control?: boolean,
    disabled?: boolean
  }
```

### Checkbox 属性

| 名称         | 类型                                             | 说明                                                                   | 默认值      | 始于    |
| ------------ | ------------------------------------------------ | ---------------------------------------------------------------------- | ----------- | ------- |
| checked      | `boolean`                                        | 复选框的勾选状态，可以使用 `v-model` 双向绑定                          | `false`     | -       |
| label        | `string`                                         | 复选框的标签值，使用插槽后失效                                         | `null`      | -       |
| value        | `string \| number`                               | 复选框关联的值，一般配合 CheckboxGroup 使用，在 CheckboxGroup 内应唯一 | `null`      | -       |
| label-class  | `ClassType`                                      | 标签元素的类名                                                         | `null`      | -       |
| size         | `'small' \| 'default' \| 'large'`                | 复选框的大小                                                           | `'default'` | -       |
| state        | `'default' \| 'success' \| 'error' \| 'warning'` | 复选框的状态                                                           | `'default'` | -       |
| disabled     | `boolean`                                        | 设置是否为禁用状态                                                     | `false`     | -       |
| border       | `boolean`                                        | 设置是否有外边框                                                       | `false`     | -       |
| control      | `boolean`                                        | 设置为控制性质，一般配合 CheckboxGroup 使用                            | `false`     | -       |
| partial      | `boolean`                                        | 是否为部分选择状态，control 为 `true` 时有效                           | `false`     | -       |
| loading      | `boolean`                                        | 设置是否为加载中                                                       | `false`     | `2.0.0` |
| loading-lock | `boolean`                                        | 设置在加载中时是否为只读                                               | `false`     | `2.0.0` |
| name         | `string`                                         | 设置内部 `<input>` 的 `name` 属性                                      | `''`        | `2.2.2` |
| color        | `string`                                         | 设置复选框的主题色                                                     | `null`      | `2.2.5` |
| state-color  | `boolean`                                        | 自定义主题色是否作为状态色                                             | `false`     | `2.2.5` |

### Checkbox 事件

| 名称   | 说明                                     | 参数                 | 始于 |
| ------ | ---------------------------------------- | -------------------- | ---- |
| change | 在复选框勾选状态改变时触发，返回勾选状态 | `(checked: boolean)` | -    |

### CheckboxGroup 属性

| 名称         | 类型                                             | 说明                                                               | 默认值      | 始于    |
| ------------ | ------------------------------------------------ | ------------------------------------------------------------------ | ----------- | ------- |
| value        | `(string \| number)[]`                           | 复选框组被选中的 label 值组成的数组，可以使用 `v-model` 双向绑定   | `[]`        | -       |
| vertical     | `boolean`                                        | 是否为纵向排列                                                     | `false`     | -       |
| size         | `'small' \| 'default' \| 'large'`                | 组内复选框的大小，会覆盖复选框单独设置的 `size`                    | `'default'` | -       |
| state        | `'default' \| 'success' \| 'error' \| 'warning'` | 复选框组的状态                                                     | `'default'` | -       |
| disabled     | `boolean`                                        | 组内复选框是否为禁用状态，会覆盖复选框单独设置的 `disabled`        | `false`     | -       |
| border       | `boolean`                                        | 组内复选框是否设置外边框                                           | `false`     | -       |
| options      | `RawOption[]`                                    | 设置选子复选框的选项，一般用于简单快速生成复选框组，使用插槽后失效 | `[]`        | -       |
| loading      | `boolean`                                        | 设置是否为加载中                                                   | `false`     | `2.0.0` |
| loading-lock | `boolean`                                        | 设置在加载中时是否为只读                                           | `false`     | `2.0.0` |
| locale       | `LocaleConfig['checkbox']`                       | 设置多语言配置                                                     | `null`      | `2.1.0` |
| color        | `string`                                         | 设置复选框组的主题色                                               | `null`      | `2.2.5` |
| state-color  | `boolean`                                        | 自定义主题色是否作为状态色                                         | `false`     | `2.2.5` |

### CheckboxGroup 事件

| 名称   | 说明                                                      | 参数                            | 始于 |
| ------ | --------------------------------------------------------- | ------------------------------- | ---- |
| change | 在复选框勾选状态改变时触发，返回勾选的复选框的 label 数组 | `(value: (string \| number)[])` | -    |
