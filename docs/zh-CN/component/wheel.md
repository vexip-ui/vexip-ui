# Wheel 滚轮

我将它用在了 TimePicker 上，不知道还有没有其他用途。

## 代码示例

:::demo wheel/basis

### 基础用法

简单的用法，通过滚轮选择值。

:::

:::demo wheel/empty

### 插入空值

添加 `insert-empty` 属性可以在开头插入一个空值。

传入字符串你还可以指定这个空值的显示值。

:::

:::demo wheel/arrow

### 箭头操作

添加 `arrow` 属性可以在两侧添加箭头操作。

:::

:::demo wheel/disabled

### 禁用选项

传入的选项通过 `disabled` 选项标识是否禁用。

:::

:::demo wheel/horizontal

### 横向滚动

添加 `horizontal` 属性变为横向滚轮。

:::

:::demo wheel/loading

### 加载状态

通过 `loading` 属性可以控制滚轮的加载状态。

如果你希望在加载中时为只读，你需要添加 `loading-lock` 属性。

:::

:::demo wheel/state

### 不同状态

通过 `state` 可以设置不同的状态。

:::

## API

### 预设类型

```ts
type WheelRawOption =
  | string
  | number
  | {
    value: string | number,
    label?: string,
    disabled?: boolean
  }
```

### Wheel 属性

| 名称          | 类型                                                         | 说明                                             | 默认值        | 始于     |
| ------------- | ------------------------------------------------------------ | ------------------------------------------------ | ------------- | -------- |
| state         | `'default' \| 'success' \| 'error' \| 'warning'`             | 设置滚轮的状态                                   | `'default'`   | `2.0.0`  |
| options       | `WheelRawOption[]`                                           | 设置滚轮的选项                                   | `[]`          | `2.0.0`  |
| horizontal    | `boolean`                                                    | 设置滚轮的是否为横向模式                         | `false`       | -        |
| value         | `string \| number`                                           | 当前激活元素的索引，可以使用 `v-model` 双向绑定  | `0`           | -        |
| candidate     | `number`                                                     | 设置滚轮上下的候选个数，可选范围为 0 ~ 3         | `2`           | -        |
| arrow         | `boolean`                                                    | 设置是否使用滚轮的箭头指示器                     | `false`       | -        |
| insert-empty  | `boolean \| string`                                          | 设置是否插入空值，传入字符串可以指定空值的显示值 | `false`       | `2.0.0`  |
| disabled      | `boolean`                                                    | 设置是否禁用滚轮                                 | `false`       | `2.0.0`  |
| loading       | `boolean`                                                    | 设置是否为加载中                                 | `false`       | `2.0.0`  |
| loading-lock  | `boolean`                                                    | 设置在加载中时是否为只读                         | `false`       | `2.0.0`  |
| disabled-item | `(value: string \| number, data: WheelRawOption) => boolean` | 设置禁用的元素                                   | `() => false` | `2.0.14` |
| no-transition | `boolean`                                                    | 是否禁用滚动过渡效果                             | `false`       | `2.2.17` |

### Wheel 事件

| 名称   | 说明                                               | 参数                        | 始于 |
| ------ | -------------------------------------------------- | --------------------------- | ---- |
| change | 当前激活的元素发生改变时触发，返回该元素的索引和值 | `(value: string \| number)` | -    |
