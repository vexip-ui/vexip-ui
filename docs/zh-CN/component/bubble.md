# Bubble 气泡框

常用作对话框或提示框。

在用作提示框的时候，我们通常会与 [Floating UI](https://floating-ui.com/) 一同使用，通过组件实例的 `arrow` 属性可以获取箭头的元素。

## 代码示例

:::demo bubble/basis

### 基础用法

随便放一个气泡框。

:::

:::demo bubble/placement

### 气泡位置

^[Since v2.2.0](!s)

通过 `placement` 属性可以设置气泡的位置。

:::

:::demo bubble/types

### 气泡类型

通过设置 `type` 属性的值为 `primary`、`info`、`success`、`warning` 和 `error` 来创建不同类型的气泡框。

:::

:::demo bubble/background

### 背景颜色

如果内置类型不满足你，可以通过设置 `background` 属性自定义背景颜色。

注意，设置 `background` 后，内容颜色默认变为白色，可通过样式覆盖。

:::

:::demo bubble/example

### 一个例子

一个悲伤的聊天记录。

:::

## API

### 预设类型

```ts
type BubbleType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
```

### Bubble 属性

| 名称          | 类型                | 说明                                                                                             | 默认值      | 始于    |
| ------------- | ------------------- | ------------------------------------------------------------------------------------------------ | ----------- | ------- |
| placement     | `Placement`         | 气泡框出现的位置，可选值同 [floating-ui](https://floating-ui.com/docs/computePosition#placement) | `'right'`   | -       |
| type          | `BubbleType`        | 气泡框的类型                                                                                     | `'default'` | `2.2.0` |
| background    | `string`            | 气泡的背景颜色                                                                                   | `''`        | -       |
| shadow        | `boolean \| string` | 气泡是否使用阴影，传入字符串时会作为阴影的颜色                                                   | `false`     | -       |
| content-class | `ClassType`         | 气泡内容的自定义类名                                                                             | `null`      | -       |

### Bubble 插槽

| 名称    | 说明             | 参数 | 始于 |
| ------- | ---------------- | ---- | ---- |
| default | 气泡的内容的插槽 | -    | -    |
