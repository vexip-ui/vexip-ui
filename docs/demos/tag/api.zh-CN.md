### 预设类型

```ts
type TagState = 'default' | 'primary' | 'info' | 'success' | 'error' | 'warning'

type TagNamedColor =
  | 'lime'
  | 'pink'
  | 'magenta'
  | 'tomato'
  | 'orange'
  | 'cyan'
  | 'navy'
  | 'gold'
  | 'purple'

type TagType = TagState | TagNamedColor
```

### Tag 属性

| 名称         | 类型                              | 说明                                                         | 默认值      | 始于    |
| ------------ | --------------------------------- | ------------------------------------------------------------ | ----------- | ------- |
| type         | `TagType`                         | 设置标签的类型，包含状态类型和颜色类型                       | `'default'` | -       |
| size         | `'small' \| 'default' \| 'large'` | 标签的大小，与其他组件不同的是，该属性会同时改变标签字体大小 | `'default'` | -       |
| border       | `boolean`                         | 设置标签是否具有边框                                         | `false`     | -       |
| closable     | `boolean`                         | 设置标签是否具有关闭功能                                     | `false`     | -       |
| color        | `string`                          | 设置标签的自定义颜色，其优先级高于 `type` 预设类型           | `null`      | -       |
| simple       | `boolean`                         | 设置标签是否为简约模式                                       | `false`     | -       |
| circle       | `boolean`                         | 设置标签是否为圆角标签                                       | `false`     | -       |
| prefix       | `string \| number`                | 设置标签的前置内容                                           | `''`        | `2.1.0` |
| prefix-bg    | `string`                          | 设置标签前置内容的背景颜色                                   | `''`        | `2.1.0` |
| prefix-color | `string`                          | 设置标签前置内容的颜色                                       | `''`        | `2.1.0` |
| suffix       | `string \| number`                | 设置标签的前置内容                                           | `''`        | `2.1.0` |
| suffix-bg    | `string`                          | 设置标签前置内容的背景颜色                                   | `''`        | `2.1.0` |
| suffix-color | `string`                          | 设置标签前置内容的颜色                                       | `''`        | `2.1.0` |

### Tag 事件

| 名称  | 说明                                         | 参数 | 始于 |
| ----- | -------------------------------------------- | ---- | ---- |
| close | 当标签可关闭，并点击关闭按钮时触发，无返回值 | -    | -    |

### Tag 插槽

| 名称    | 说明           | 参数 | 始于 |
| ------- | -------------- | ---- | ---- |
| default | 标签内容的插槽 | -    | -    |
