# ObjectFit 自适应布局 ==!s|2.3.39==

是一个将 object-fit 功能实现到非可替换元素的组件。

一个响应式布局容器组件，能够根据父容器尺寸自动调整内容大小，同时保持宽高比。

## 基础示例

:::demo object-fit/basis

### 基础用法

ObjectFit 组件会自动缩放内容以适应父容器，同时保持指定的宽高比。

:::

## 高级示例

:::demo object-fit/advanced

### 高级用法

拒绝代码移动端适配

可以用绝对单位开发H5页面，1:1 还原设计稿，如果有设计稿导出的页面也可快速开发。

:::

## API

### 预设类型

```ts
interface ObjectFitExposed {
  innerWidth: number,
  innerHeight: number,
  wrapperWidth: number,
  wrapperHeight: number,
  scaleX: number,
  scaleY: number,
}
```

### ObjectFit 属性

| 名称     | 类型                                                       | 说明                         | 默认值   |
| -------- | ---------------------------------------------------------- | ---------------------------- | -------- |
| width    | `number`                                                   | 内容的原始宽度               | `100`    |
| height   | `number`                                                   | 内容的原始高度               | `100`    |
| fit      | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | 内容如何调整大小以适应其容器 | `'none'` |
| is-scale | `boolean`                                                  | 是否对内容应用缩放变换       | `false`  |

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
