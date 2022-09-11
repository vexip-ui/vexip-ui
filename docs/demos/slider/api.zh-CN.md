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
