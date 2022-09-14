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
