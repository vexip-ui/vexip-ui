# 排版 Typography

Vexip UI 提供了一些带有基本格式的文本组件。

## 代码示例

:::demo typography/basis

### 基础用法

Vexip UI 内置了一些与标签同名的组件，用以快速应用组件库的样式。

:::

:::demo typography/text

### 文本组件

提供了不同样式的文本。

当创建段落或加粗文本时可以使用快捷组件 P 和 Strong。

:::

:::demo typography/title

### 标题组件

快速创建不同级别的标题，如果你想要更快，你可以使用 H1、H2、H3、H4、H5、H6 快捷组件。

:::

:::demo typography/title-marker

### 标题标记

添加 `marker` 属性可以为标题快速添加一个标记，虽然它可能没什么实质性作用。

默认情况下标记的类型会跟随标题的类型，如果这不满足需求可以用 `marker-type` 属性指定标记的类型或自定义一个颜色。

:::

## API

### 预设类型

```ts
type TypographyType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6
```

### Text 属性

| 名称      | 类型             | 说明                                 | 默认值      | 始于 |
| --------- | ---------------- | ------------------------------------ | ----------- | ---- |
| type      | `TypographyType` | 设置文本的类型                       | `'default'` | -    |
| tag       | `string`         | 设置渲染的标签                       | `'span'`    | -    |
| delete    | `boolean`        | 是否添加删除线，设置后标签为 `<del>` | `false`     | -    |
| strong    | `boolean`        | 是否加粗                             | `false`     | -    |
| italic    | `boolean`        | 是否斜体                             | `false`     | -    |
| underline | `boolean`        | 是否添加下划线                       | `false`     | -    |
| code      | `boolean`        | 是否为代码，设置后标签为 `<code>`    | `false`     | -    |
| mark      | `boolean`        | 是否添加标记底色                     | `false`     | -    |
| disabled  | `boolean`        | 是否禁用                             | `false`     | -    |
| keyboard  | `boolean`        | 是否添加键盘按键样式                 | `false`     | -    |
| thin      | `boolean`        | 是否为细字体，与 `strong` 冲突       | `false`     | -    |
| reversed  | `boolean`        | 设置字体颜色是否取反色               | `false`     | -    |

> 其中 P 和 Strong 为 Text 的快捷组件。

### Title 属性

| 名称        | 类型             | 说明                                   | 默认值      | 始于 |
| ----------- | ---------------- | -------------------------------------- | ----------- | ---- |
| type        | `TypographyType` | 设置标题的类型                         | `'default'` | -    |
| level       | `TitleLevel`     | 设置标题的级别                         | `5`         | -    |
| top         | `boolean`        | 是否为置顶标题，置顶时上外边距为 `0`   | `false`     | -    |
| marker      | `boolean`        | 是否添加标记                           | `false`     | -    |
| aligned     | `boolean`        | 设置添加标记后的是否按标记对齐         | `false`     | -    |
| thin        | `boolean`        | 是否为细标题                           | `false`     | -    |
| marker-type | `string`         | 单独设置标记的类型，支持传入自定义颜色 | `null`      | -    |

> 其中 H1、H2、H3、H4、H5、H6 为 Title 的快捷组件。

### Blockquote 属性

| 名称 | 类型             | 说明             | 默认值      | 始于 |
| ---- | ---------------- | ---------------- | ----------- | ---- |
| type | `TypographyType` | 设置块引用的类型 | `'default'` | -    |

### OL 属性

| 名称 | 类型                              | 说明           | 默认值 | 始于 |
| ---- | --------------------------------- | -------------- | ------ | ---- |
| type | `'a' \| 'A' \| 'i' \| 'I' \| '1'` | 设置序号的类型 | `'1'`  | -    |

### UL 属性

| 名称       | 类型     | 说明               | 默认值     | 始于 |
| ---------- | -------- | ------------------ | ---------- | ---- |
| list-style | `string` | 设置 li 的标记类型 | `'circle'` | -    |
