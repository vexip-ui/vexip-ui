# 气泡框 Bubble

## 代码示例

:::demo bubble/basis

### 基础用法

随便放一个气泡聊天框。

:::

:::demo bubble/background

### 背景颜色

设置 `background` 属性的值可以指定气泡的颜色。

:::

:::demo bubble/example

### 一个例子

一个悲伤的聊天记录。

:::

## API

### Bubble 属性

| 名称          | 类型                | 说明                                           | 默认值    | 始于 |
| ------------- | ------------------- | ---------------------------------------------- | --------- | ---- |
| placement     | `Placement`         | 气泡框出现的位置，可选值同 Popper.js           | `'right'` | -    |
| background    | `string`            | 气泡的背景颜色                                 | `''`      | -    |
| shadow        | `boolean \| string` | 气泡是否使用阴影，传入字符串时会作为阴影的颜色 | `false`   | -    |
| content-class | `ClassType`         | 气泡内容的自定义类名                           | `null`    | -    |

### Bubble 插槽

| 名称    | 说明             | 参数 | 始于 |
| ------- | ---------------- | ---- | ---- |
| default | 气泡的内容的插槽 | -    | -    |
