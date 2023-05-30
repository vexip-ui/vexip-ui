# 滚动 Scroll

用于需要展示超出一个区域范围的内容，可以使用户滚动浏览。

## 代码示例

:::demo scroll/basis

### 基础用法

最常用的用法，为滚动设置 `height` 属性的值，当内容的高度超过该值后即可滚动。

:::

:::demo scroll/bar

### 滚动条

添加 `use-y-bar` 属性，可以为滚动区域添加一个滚动条。

:::

:::demo scroll/height

### 自适应高度

设置 `height` 属性为一个有效的 css 高度百分比值，可以使滚动区域根据百分比自适应其父元素的高度。

:::

:::demo scroll/auto

### 自动滚动

同事说很需要一个这样的功能。

添加 `autoplay` 属性可以设置滚动区域自动滚动。

设置 `autoplay` 属性的值为一个数字时，将作为一次完整滚动所需的毫秒数进行自动滚动。

:::

:::demo scroll/track

### 滚动条轨道

添加 `use-bar-track` 属性可以开启滚动条的轨道交互，让它看起来像原生滚动条那样。

:::

:::demo scroll/horizontal

### 横向滚动

开启横向滚动需要设置 `mode` 属性为 `horizontal`，并设置 `width` 属性的值。

常规横向模式下，仍需按住 shift 键方可滚动，如果你希望直接滚动，可以设置 `mode` 为 `horizontal-exact`。

:::

:::demo scroll/extra

### 额外内容

通过 `extra` 插槽可以添加一些游离在滚动之外的内容。

这个例子演示了如何快速添加一个返回顶部的按钮。

:::

## API

### 预设类型

```ts
interface ScrollState {
  scrollX: number,
  scrollY: number,
  percentX: number,
  percentY: number,
  enableXScroll: number,
  enableYScroll: number
}

interface ScrollSlotParams {
  getState: () => ScrollState,
  refresh: () => void,
  scrollTo: (clientX: number, clientY: number, duration?: number) => void,
  scrollBy: (deltaX: number, deltaY: number, duration?: number) => void,
  scrollToElement: (el: string | Element, duration?: number, offset?: number) => void,
  ensureInView: (el: string | Element, duration?: number, offset?: number) => void
}
```

### Scroll 属性

| 名称             | 类型                                                         | 说明                                                                          | 默认值       | 始于     |
| ---------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------ | -------- |
| mode             | `'horizontal' \| 'horizontal-exact' \| 'vertical' \| 'both'` | 滚动的模式                                                                    | `'vertical'` | -        |
| scroll-class     | `ClassType`                                                  | 滚动内容包围元素的自定义类名                                                  | `null`       | -        |
| scroll-style     | `StyleType`                                                  | 滚动内容包围元素的自定义样式                                                  | `null`       | -        |
| scroll-attrs     | `Record<string, any>`                                        | 滚动内容包围元素的自定义属性                                                  | `null`       | `2.1.0`  |
| width            | `number \| string`                                           | 滚动视窗的宽度，内容的宽度大于视窗的宽度时才可滚动                            | `''`         | -        |
| height           | `number \| string`                                           | 滚动视窗的高度，内容的高度大于视窗的高度时才可滚动                            | `''`         | -        |
| delta-x          | `number`                                                     | 每次横向滚动的距离                                                            | `20`         | -        |
| delta-y          | `number`                                                     | 每次纵向滚动的距离                                                            | `20`         | -        |
| disabled         | `boolean`                                                    | 设置是否禁用滚动                                                              | `false`      | -        |
| pointer          | `boolean`                                                    | 设置是否开启鼠标拖动滚动                                                      | `false`      | -        |
| wheel            | `boolean`                                                    | 设置是否开启滚轮滚动                                                          | `true`       | -        |
| scroll-x         | `number`                                                     | 设置横向滚动的位置                                                            | `0`          | -        |
| scroll-y         | `number`                                                     | 设置纵向滚动的位置                                                            | `0`          | -        |
| use-x-bar        | `boolean`                                                    | 设置是否使用横向滚动条                                                        | `false`      | -        |
| use-y-bar        | `boolean`                                                    | 设置是否使用纵向滚动条                                                        | `false`      | -        |
| bar-fade         | `number`                                                     | 设置触发滚动条渐隐的等待毫秒，若小于 300 则关闭渐隐效果                       | `1500`       | -        |
| bar-class        | `ClassType`                                                  | 设置滚动条的自定义类名                                                        | `null`       | -        |
| autoplay         | `boolean \| number`                                          | 设置滚动条自动滚动，当传入数字时，会作为一次完整滚动的所需毫秒数              | `false`      | -        |
| play-waiting     | `number`                                                     | 当开启了自动滚动时，设置每次开始滚动前和结束滚动后的暂缓毫秒数                | `500`        | -        |
| on-before-scroll | `(payload: { signX: number, signY: number }) => boolean`     | 设置滚动前的回调，**不支持**异步函数和 `Promise`，返回值为 `false` 会阻止滚动 | `null`       | -        |
| use-bar-track    | `boolean`                                                    | 设置滚动条是否启用轨道交互                                                    | `false`      | -        |
| scroll-tag       | `string`                                                     | 滚动内容包围元素渲染的标签                                                    | `'div'`      | `2.0.13` |

### Scroll 事件

| 名称             | 说明                                                                                | 参数                                                                                                                                   | 始于 |
| ---------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| scroll           | 当以任意交互形式进行了滚动后触发                                                    | `(scroll: { type?: 'vertical' \| 'horizontal', clientX: number, clientY: number, percentX: number, percentY: number })`                | -    |
| wheel            | 当用滚轮进行了滚动后触发，其中 `sign` 标记滚动的方向                                | `(scroll: { type?: 'vertical' \| 'horizontal', sign: -1 \| 1, clientX: number, clientY: number, percentX: number, percentY: number })` | -    |
| x-enable-change  | 当横向滚动的激活状态改变时触发，返回当前滚动状态                                    | `(enabled: boolean)`                                                                                                                   | -    |
| y-enable-change  | 当纵向滚动的激活状态改变时触发，返回当前滚动状态                                    | `(enabled: boolean)`                                                                                                                   | -    |
| ready            | 当滚动触发刷新，并在刷新成功即将进入正常可用状态时触发，无返回值                    | -                                                                                                                                      | -    |
| scroll-start     | 当使用 pointer 滚动开始时触发                                                       | `(scroll: { clientX: number, clientY: number, percentX: number, percentY: number })`                                                   | -    |
| scroll-end       | 当使用 pointer 滚动结束时触发                                                       | `(scroll: { clientX: number, clientY: number, percentX: number, percentY: number })`                                                   | -    |
| bar-scroll-start | 当使用滚动条触发滚动开始时触发，返回当前触发的滚动条类型 `vertical` 或 `horizontal` | `(type: 'vertical' \| 'horizontal')`                                                                                                   | -    |
| bar-scroll-end   | 当使用滚动条触发滚动结束时触发，返回当前触发的滚动条类型 `vertical` 或 `horizontal` | `(type: 'vertical' \| 'horizontal')`                                                                                                   | -    |

### Scroll 插槽

| 名称    | 说明           | 参数               | 始于    |
| ------- | -------------- | ------------------ | ------- |
| default | 滚动内容的插槽 | `ScrollSlotParams` | -       |
| extra   | 额外内容的插槽 | `ScrollSlotParams` | `2.1.7` |

### Scroll 方法

| 名称            | 说明                                 | 签名                                                                  | 始于 |
| --------------- | ------------------------------------ | --------------------------------------------------------------------- | ---- |
| refresh         | 刷新滚动，将会触发滚动的重新计算大小 | `() => void`                                                          | -    |
| scrollTo        | 滚动到指定位置                       | `(x: number, y: number, duration?: number) => void`                   | -    |
| scrollBy        | 滚动指定的距离                       | `(dx: number, dy: number, duration?: number) => void`                 | -    |
| scrollToElement | 滚动到指定元素所在的位置             | `(el: string \| Element, duration?: number, offset?: number) => void` | -    |
| ensureInView    | 确保提供的元素在滚动的可视区内       | `(el: string \| Element, duration?: number, offset?: number) => void` | -    |
