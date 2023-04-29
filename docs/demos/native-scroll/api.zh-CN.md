### 预设类型

```ts
interface NativeScrollState {
  scrollX: number,
  scrollY: number,
  percentX: number,
  percentY: number,
  enableXScroll: Readonly<boolean>,
  enableYScroll: Readonly<boolean>
}

interface NativeScrollSlotParams {
  getState: () => NativeScrollState,
  refresh: () => void,
  scrollTo: (clientX: number, clientY: number, duration?: number) => Promise<void>,
  scrollBy: (deltaX: number, deltaY: number, duration?: number) => Promise<void>,
  scrollToElement: (el: string | Element, duration?: number, offset?: number) => Promise<void>,
  ensureInView: (el: string | Element, duration?: number, offset?: number) => void
}
```

### NativeScroll 属性

| 名称             | 类型                                                     | 说明                                                                          | 默认值       | 始于     |
| ---------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------ | -------- |
| mode             | `'horizontal' \| 'vertical' \| 'both'`                   | 滚动的模式                                                                    | `'vertical'` | -        |
| scroll-class     | `ClassType`                                              | 滚动内容包围元素的自定义类名                                                  | `null`       | -        |
| scroll-style     | `StyleType`                                              | 滚动内容包围元素的自定义样式                                                  | `null`       | -        |
| scroll-attrs     | `Record<string, any>`                                    | 滚动内容包围元素的自定义属性                                                  | `null`       | `2.1.0`  |
| width            | `number \| string`                                       | 滚动视窗的宽度，内容的宽度大于视窗的宽度时才可滚动                            | `''`         | -        |
| height           | `number \| string`                                       | 滚动视窗的高度，内容的高度大于视窗的高度时才可滚动                            | `''`         | -        |
| disabled         | `boolean`                                                | 设置是否禁用滚动                                                              | `false`      | -        |
| pointer          | `boolean`                                                | 设置是否开启鼠标拖动滚动，在移动端时不应启用该属性，避免与原生交互发生冲突    | `false`      | -        |
| scroll-x         | `number`                                                 | 设置横向滚动的位置                                                            | `0`          | -        |
| scroll-y         | `number`                                                 | 设置纵向滚动的位置                                                            | `0`          | -        |
| use-x-bar        | `boolean`                                                | 设置是否使用横向滚动条                                                        | `false`      | -        |
| use-y-bar        | `boolean`                                                | 设置是否使用纵向滚动条                                                        | `false`      | -        |
| bar-fade         | `number`                                                 | 设置触发滚动条渐隐的等待毫秒，若小于 `300` 则关闭渐隐效果                     | `1500`       | -        |
| bar-class        | `ClassType`                                              | 设置滚动条的自定义类名                                                        | `null`       | -        |
| autoplay         | `boolean \| number`                                      | 设置滚动条自动滚动，当传入数字时，会作为一次完整滚动的所需毫秒数              | `false`      | -        |
| play-waiting     | `number`                                                 | 当开启了自动滚动时，设置每次开始滚动前和结束滚动后的暂缓毫秒数                | `500`        | -        |
| on-before-scroll | `(payload: { signX: number, signY: number }) => boolean` | 设置滚动前的回调，**不支持**异步函数和 `Promise`，返回值为 `false` 会阻止滚动 | `null`       | -        |
| appear           | `boolean`                                                | 设置滚动初始渲染时是否具有过渡效果，一般用于初始滚动位置为非 `0` 的场合       | `false`      | -        |
| bar-duration     | `number`                                                 | 设置滚动条过渡效果的持续时间                                                  | `null`       | -        |
| use-bar-track    | `boolean`                                                | 设置滚动条是否启用轨道交互                                                    | `false`      | -        |
| scroll-tag       | `string`                                                 | 滚动内容包围元素渲染的标签                                                    | `'div'`      | `2.0.13` |

### NativeScroll 事件

| 名称             | 说明                                                                                | 参数                                                                                                                    | 始于 |
| ---------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---- |
| scroll           | 当以任意交互形式进行了滚动后触发                                                    | `(scroll: { type?: 'vertical' \| 'horizontal', clientX: number, clientY: number, percentX: number, percnetY: number })` | -    |
| scroll-start     | 当使用 pointer 滚动开始时触发                                                       | `(scroll: { clientX: number, clientY: number, percentX: number, percnetY: number })`                                    | -    |
| scroll-end       | 当使用 pointer 滚动结束时触发                                                       | `(scroll: { clientX: number, clientY: number, percentX: number, percnetY: number })`                                    | -    |
| x-enable-change  | 当横向滚动的激活状态改变时触发，返回当前滚动状态                                    | `(enabled: boolean)`                                                                                                    | -    |
| y-enable-change  | 当纵向滚动的激活状态改变时触发，返回当前滚动状态                                    | `(enabled: boolean)`                                                                                                    | -    |
| bar-scroll-start | 当使用滚动条触发滚动开始时触发，返回当前触发的滚动条类型 `vertical` 或 `horizontal` | `(type: 'vertical' \| 'horizontal')`                                                                                    | -    |
| bar-scroll-end   | 当使用滚动条触发滚动结束时触发，返回当前触发的滚动条类型 `vertical` 或 `horizontal` | `(type: 'vertical' \| 'horizontal')`                                                                                    | -    |

### NativeScroll 插槽

| 名称    | 说明           | 参数                     | 始于    |
| ------- | -------------- | ------------------------ | ------- |
| defalut | 滚动内容的插槽 | `NativeScrollSlotParams` | -       |
| extra   | 额外内容的插槽 | `NativeScrollSlotParams` | `2.1.7` |

### NativeScroll 方法

| 名称            | 说明                                 | 签名                                                                           | 始于    |
| --------------- | ------------------------------------ | ------------------------------------------------------------------------------ | ------- |
| refresh         | 刷新滚动，将会触发滚动的重新计算大小 | `() => void`                                                                   | -       |
| scrollTo        | 滚动到指定位置                       | `(x: number, y: number, duration?: number) => Promise<void>`                   | -       |
| scrollBy        | 滚动指定的距离                       | `(dx: number, dy: number, duration?: number) => Promise<void>`                 | -       |
| scrollToElement | 滚动到指定元素所在的位置             | `(el: string \| Element, duration?: number, offset?: number) => Promise<void>` | -       |
| ensureInView    | 确保提供的元素在滚动的可视区内       | `(el: string \| Element, duration?: number, offset?: number) => void`          | `2.1.4` |
