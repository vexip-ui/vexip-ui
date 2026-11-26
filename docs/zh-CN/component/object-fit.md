# ObjectFit 自适应对象 ==!s|2.4.0==

是一个将 CSS 的 `object-fit` 功能实现到非可替换元素的组件。

一个响应式布局容器组件，能够根据父容器尺寸自动调整内容大小，同时保持宽高比。

## 代码示例

:::warning
示例中的右下角可以拖拽调整大小，方便查看效果。
:::

## 基础示例

:::demo object-fit/basis

### 基础用法

ObjectFit 组件会自动缩放内容以适应父容器，同时保持指定的宽高比。

:::

:::demo object-fit/scale

### 内容区域缩放

通过 `scale` 属性可以设置内容在容器中是否缩放，示例中为缩放区域增加了背景色。

:::

:::demo object-fit/position

### 对象定位

通过 `position` 属性可以调整内容在容器中的初始位置，例如 `top left` 表示内容从左上角开始布局。

其用法与 CSS 的 `object-position` 属性一致。默认值为center。

:::

:::demo object-fit/h5

### H5示例

拒绝代码移动端适配

可以用绝对单位开发H5页面，1:1 还原设计稿，如果有设计稿导出的页面也可快速开发。

:::

## API

### 预设类型

```ts
export type ObjectFitValue = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
export type ObjectFitPosition = 'top' | 'bottom' | 'left' | 'right' | 'center' | 'top left' | 'top right' | 'bottom left' | 'bottom right' | (string & {})
```

### ObjectFit 属性

| 名称           | 类型                | 说明                         | 默认值     |
| -------------- | ------------------- | ---------------------------- | ---------- |
| width          | `number`            | 内容的原始宽度               | `100`      |
| height         | `number`            | 内容的原始高度               | `100`      |
| fit            | `ObjectFitValue`    | 内容如何调整大小以适应其容器 | `'none'`   |
| position       | `ObjectFitPosition` | 内容的初始位置               | `'center'` |
| scale-disabled | `boolean`           | 是否对内容应用缩放变换       | `false`    |

### ObjectFit 插槽

| 名称    | 说明         | 参数 | 始于 |
| ------- | ------------ | ---- | ---- |
| default | 要渲染的内容 | -    | -    |

### ObjectFit Exposed

| 名称          | 类型     | 说明                 | 始于 |
| ------------- | -------- | -------------------- | ---- |
| innerWidth    | `number` | 当前计算出的内部宽度 | -    |
| innerHeight   | `number` | 当前计算出的内部高度 | -    |
| wrapperWidth  | `number` | 当前计算出的容器宽度 | -    |
| wrapperHeight | `number` | 当前计算出的容器高度 | -    |
| scaleX        | `number` | 当前水平缩放因子     | -    |
| scaleY        | `number` | 当前垂直缩放因子     | -    |
