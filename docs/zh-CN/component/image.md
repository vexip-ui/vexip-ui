# Image 图片 ==!s|2.1.0==

用于为图片显示快速提供占位、懒加载等功能。

## 代码示例

:::demo image/basis

### 基础用法

一张平平无奇的图片。

:::

:::demo image/object-fit

### 填充方式

通过 `fit` 属性可以设置图片的填充方式，同 CSS 的 [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)。

:::

:::demo image/style

### 图片样式

通过 `radius` 属性可以快速设置图片的圆角半径。

通过 `border` 属性可以快速为图片添加一个边框，还可以传入一个有效颜色值指定边框颜色。

:::

:::demo image/fallback

### 失败处理

通过 `fallback-src` 属性可以设置回退源，当加载失败时会尝试使用。

你还可以通过 `error-tip` 属性或 `error` 插槽自定义错误内容。

当设置了回退源时，需要在回退源也加载失败时才会显示错误内容。

:::

:::demo image/lazy

### 懒加载

添加 `lazy` 属性可以开启懒加载。

默认会使用 `<img>` 的原生 `loading` 属性，在不支持的情况下将回退至使用 `IntersectionObserver`。

该示例需要打开开发者工具并禁用缓存后方可看到预期的效果。

:::

:::demo image/loading

### 占位内容

通过 `skeleton` 属性可以快速添加一个在图片加载时的骨架。

或者你可以通过 `placeholder` 插槽自定义加载时显示的内容。

:::

:::demo image/preview

### 预览

添加 `preview` 属性可以快速开启图片预览功能。

通过 `preview-src` 属性还可以指定预览源。

:::

:::demo image/group

### 图片组

多张图片放在一起，可以用于多张预览。

默认情况只会显示第一张，添加 `show-all` 属性可以显示全部图片。

:::

:::demo image/viewer

### 外部查看器

有时候你可能想使用外部查看器，或者使用单例查看器。

:::

## API

### 预设类型

```ts
type ImageObjectFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
type ImageSkeletonProps = Pick<
  SkeletonProps,
  'tag' | 'activated' | 'iconScale' | 'imageIcon'
> & {
  class?: ClassType,
  StyleType?: StyleType
}
```

### Image 属性

| 名称            | 类型                            | 说明                                           | 默认值    | 始于 |
| --------------- | ------------------------------- | ---------------------------------------------- | --------- | ---- |
| src             | `string`                        | 图片源                                         | `''`      | -    |
| fallback-src    | `string`                        | 图片源加载失败时的回退源                       | `''`      | -    |
| alt             | `string`                        | 图片描述                                       | `''`      | -    |
| fit             | `ImageObjectFit`                | 设置图片如何填充，同 `CSS` 的 `object-fit`     | `'cover'` | -    |
| width           | `string \| number`              | 图片的宽度                                     | `''`      | -    |
| height          | `string \| number`              | 图片的高度                                     | `''`      | -    |
| img-attrs       | `Record<string, any>`           | 设置内部 `<img>` 的属性                        | `{}`      | -    |
| lazy            | `string`                        | 是否开启懒加载                                 | `false`   | -    |
| root            | `unknown`                       | 同 `IntersectionObserver` 的 `root` 选项       | `null`    | -    |
| root-margin     | `string`                        | 同 `IntersectionObserver` 的 `rootMargin` 选项 | `''`      | -    |
| preview         | `boolean`                       | 是否可预览                                     | `false`   | -    |
| skeleton        | `boolean \| ImageSkeletonProps` | 加载时是否填充骨架                             | `false`   | -    |
| placeholder     | `string`                        | 加载时的占位内容                               | `''`      | -    |
| error-tip       | `string`                        | 加载错误时的提示内容                           | `''`      | -    |
| radius          | `number`                        | 设置图片的圆角半径                             | `0`       | -    |
| border          | `boolean \| string`             | 是否有边框，支持传入一个颜色值指定边框颜色     | `false`   | -    |
| preview-src     | `string`                        | 图片的预览源                                   | `''`      | -    |
| viewer-transfer | `boolean \| string`             | 设置查看器的 `transfer` 属性                   | `null`    | -    |

### Image 事件

| 名称    | 说明                             | 参数             | 始于 |
| ------- | -------------------------------- | ---------------- | ---- |
| load    | 图片加载完成时触发，返回事件对象 | `(event: Event)` | -    |
| error   | 图片加载失败时触发，返回事件对象 | `(event: Event)` | -    |
| preview | 预览图片时触发，返回使用的预览源 | `(src: string)`  | -    |

### Image 插槽

| 名称        | 说明                       | 参数              | 始于 |
| ----------- | -------------------------- | ----------------- | ---- |
| placeholder | 图片加载时的占位内容的插槽 | -                 | -    |
| error       | 图片加载错误时的内容插槽   | -                 | -    |
| preview     | 图片预览时显示的内容插槽   | `{ src: string }` | -    |

### ImageGroup 属性

| 名称            | 类型                | 说明                         | 默认值  | 始于 |
| --------------- | ------------------- | ---------------------------- | ------- | ---- |
| show-all        | `boolean`           | 是否显示所有的图片           | `false` | -    |
| preview         | `boolean`           | 是否可预览                   | `false` | -    |
| viewer-transfer | `boolean \| string` | 设置查看器的 `transfer` 属性 | `null`  | -    |

### ImageGroup 事件

| 名称    | 说明                                         | 参数                               | 始于 |
| ------- | -------------------------------------------- | ---------------------------------- | ---- |
| preview | 预览图片时触发，返回使用的预览源和预览源列表 | `(src: string, srcList: string[])` | -    |

### ImageGroup 插槽

| 名称    | 说明                     | 参数              | 始于 |
| ------- | ------------------------ | ----------------- | ---- |
| default | 图片组的内容插槽         | -                 | -    |
| preview | 图片预览时显示的内容插槽 | `{ src: string }` | -    |

### ImageViewer 属性

| 名称     | 类型                 | 说明                                                          | 默认值  | 始于 |
| -------- | -------------------- | ------------------------------------------------------------- | ------- | ---- |
| active   | `boolean`            | 设置图片查看器是否显示，可以使用 `v-model` 双向绑定           | `false` | -    |
| index    | `number`             | 当前查看的图片的索引，可以使用 `v-model` 双向绑定             | `0`     | -    |
| srcs     | `string \| string[]` | 查看图片的源列表                                              | `''`    | -    |
| transfer | `boolean \| string`  | 设置图片查看器的渲染位置，设置为 `true` 时默认渲染至 `<body>` | `false` | -    |

### ImageViewer 事件

| 名称   | 说明                                                   | 参数                           | 始于 |
| ------ | ------------------------------------------------------ | ------------------------------ | ---- |
| toggle | 图片查看器的激活状态改变时触发，返回当前的激活状态     | `(active: boolean)`            | -    |
| change | 查看的图片发生改变时触发，返回当前查看的图片的索引和源 | `(index: number, src: string)` | -    |
| prev   | 查看上一张图片时触发，返回当前查看的图片的索引和源     | `(index: number, src: string)` | -    |
| next   | 查看下一张图片时触发，返回当前查看的图片的索引和源     | `(index: number, src: string)` | -    |
| close  | 当用关闭功能触发关闭时触发                             | -                              | -    |
| show   | 当图片查看器打开，过渡效果结束后触发                   | -                              | -    |
| hide   | 当图片查看器关闭，过渡效果结束后触发                   | -                              | -    |

### ImageViewer 插槽

| 名称    | 说明             | 参数                    | 始于 |
| ------- | ---------------- | ----------------------- | ---- |
| default | 查看的内容插槽   | -                       | -    |
| prev    | 上一张按钮的插槽 | `{ disabled: boolean }` | -    |
| next    | 下一张按钮的插槽 | `{ disabled: boolean }` | -    |
| close   | 关闭按钮的插槽   | -                       | -    |
