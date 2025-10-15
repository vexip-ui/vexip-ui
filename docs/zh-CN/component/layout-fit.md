# LayoutFit 自适应布局 ==!s|2.0.0==

一个响应式布局容器组件，能够根据父容器尺寸自动调整内容大小，同时保持宽高比。

## 代码示例

:::demo layout-fit/basis

### 基础用法

LayoutFit 组件会自动缩放内容以适应父容器，同时保持指定的宽高比。

:::

## API

### 预设类型

```ts
import type { ResizeInfo } from '@juggle/resize-observer'

interface LayoutFitExposed {
  currentWidth: number,
  currentHeight: number,
  scaleX: number,
  scaleY: number,
}
```

### LayoutFit 属性

| 名称     | 类型                                                       | 说明                         | 默认值   |
| -------- | ---------------------------------------------------------- | ---------------------------- | -------- |
| width    | `number`                                                   | 内容的原始宽度               | `100`    |
| height   | `number`                                                   | 内容的原始高度               | `100`    |
| fit      | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | 内容如何调整大小以适应其容器 | `'none'` |
| is-scale | `boolean`                                                  | 是否对内容应用缩放变换       | `false`  |

### LayoutFit 事件

| 名称   | 说明                 | 参数                                                                                                                                                                        | 始于 |
| ------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| resize | 当容器调整大小时触发 | `(data: { contentWidth: number, contentHeight: number, scaleX: number, scaleY: number, innerWidth: number, innerHeight: number, _entries: ResizeObserverEntry[] }) => void` | -    |

### LayoutFit 插槽

| 名称    | 说明         | 参数 | 始于 |
| ------- | ------------ | ---- | ---- |
| default | 要渲染的内容 | -    | -    |

### LayoutFit 暴露

| 名称          | 类型     | 说明             | 始于 |
| ------------- | -------- | ---------------- | ---- |
| currentWidth  | `number` | 当前计算出的宽度 | -    |
| currentHeight | `number` | 当前计算出的高度 | -    |
| scaleX        | `number` | 当前水平缩放因子 | -    |
| scaleY        | `number` | 当前垂直缩放因子 | -    |
