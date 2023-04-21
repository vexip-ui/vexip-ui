# 滑动输入条 Slider

通过滑动来选定值。

## 代码示例

:::demo slider/basis

### 基础用法

最简单的用法，可以使用 `v-model:value` 双向绑定。

:::

:::demo slider/maxmin

### 设置边界

通过 `min` 和 `max` 属性可以设置滑动输入条的边界值。

:::

:::demo slider/step

### 调整幅度

设置 `step` 属性的值可以调整每次滑动的最小幅度。

:::

:::demo slider/range

### 范围选择

添加 `range` 属性可以开启范围选择模式。

:::

:::demo slider/vertical

### 纵向滑动

添加 `vertical` 属性可以使滑动输入条变为纵向滑动。

:::

:::demo slider/reverse

### 反向操作

添加 `reverse` 属性可以使得滑动输入条的操作变位反向。

:::

:::demo slider/markers

### 标记点

通过 `markers` 属性可以为滑动条设置标记点。

:::

:::demo slider/marker-only

### 仅标记点

当设置的标记点后，可以添加 `marker-only` 属性使的只有标记点对应的值可以被选择，添加后 `step` 属性将失效。

:::

:::demo slider/loading

### 加载状态

通过 `loading` 属性可以控制滑动输入条的加载状态。

如果你希望在加载中时为只读，你需要添加 `loading-lock` 属性。

:::

:::demo slider/state

### 不同状态

通过 `state` 可以设置不同的状态。

:::

## API

### 预设类型

```ts
interface SliderMarker {
  label?: string,
  class?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>
}
```

### Slider 属性

| 名称         | 类型                                               | 说明                                             | 默认值    | 始于    |
| ------------ | -------------------------------------------------- | ------------------------------------------------ | --------- | ------- |
| state        | `'default' \| 'success' \| 'error' \| 'warning'`   | 设置滑动输入条类型                               | `default` | `2.0.0` |
| value        | `number \| number[]`                               | 滑动输入条的值，可以使用 `v-model` 双向绑定      | `0`       | -       |
| min          | `number`                                           | 滑动输入条的最小值                               | `0`       | -       |
| max          | `number`                                           | 滑动输入条的最大值                               | `100`     | -       |
| step         | `number`                                           | 滑动输入条每次值变化的跨度                       | `1`       | -       |
| vertical     | `boolean`                                          | 设置滑动输入条是否为纵向，需要父元素具有有效高度 | `false`   | -       |
| hide-tip     | `boolean`                                          | 设置是否禁用 Tooltip                             | `false`   | -       |
| tip-transfer | `boolean`                                          | 设置 Tooltip 的 `transfer` 属性                  | `false`   | -       |
| disabled     | `boolean`                                          | 设置是否为禁用状态                               | `false`   | -       |
| loading      | `boolean`                                          | 设置是否为加载中                                 | `false`   | `2.0.0` |
| loading-lock | `boolean`                                          | 设置在加载中时是否为只读                         | `false`   | `2.0.0` |
| reverse      | `boolean`                                          | 设置是否为反向操作                               | `false`   | `2.0.0` |
| range        | `boolean`                                          | 设置是否为范围选择                               | `false`   | `2.0.0` |
| markers      | `Record<string \| number, string \| SliderMarker>` | 设置标记点                                       | `{}`      | `2.0.0` |
| marker-only  | `boolean`                                          | 设置是否只可选择标记点的值，设置后 `step` 失效   | `false`   | `2.0.0` |

### Slider 事件

| 名称   | 说明                                                                      | 参数                          | 始于 |
| ------ | ------------------------------------------------------------------------- | ----------------------------- | ---- |
| input  | 当滑动输入条在滑动引起值变化时触发，返回当前的值                          | `(value: number \| number[])` | -    |
| change | 当滑动输入条的值改变时触发 (若使用滑动，则在滑动结束时触发)，返回当前的值 | `(value: number \| number[])` | -    |

### Slider 插槽

| 名称   | 说明               | 参数                                                          | 始于    |
| ------ | ------------------ | ------------------------------------------------------------- | ------- |
| tip    | 提示气泡的内容插槽 | `{ value: number }`                                           | -       |
| marker | 标记点的内容插槽   | `{ marker: SliderMarker, percent: number, inRange: boolean }` | `2.0.0` |
