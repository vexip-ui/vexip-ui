# Alert 警告提示

提供一个静态的警告提示，展现需要关注的内容，不会自动消失，可以由用户点击关闭。

## 代码示例

:::demo alert/basis

### 基础用法

通过设置 `type` 属性为 info、success、warning、error 以创建不同类型的警告提示。

:::

:::demo alert/title

### 带标题警告

当需要为警告添加一个简要的概括时，可以设置 `title` 属性或同名插槽添加一个标题。

:::

:::demo alert/closable

### 可关闭

添加 `closable` 属性可以显示关闭按钮，点击关闭按钮可关闭警告提示。

:::

:::demo alert/close

### 自定义关闭

使用 `close` 插槽可以自定义关闭按钮的内容。

:::

:::demo alert/icon

### 显示图标

添加 `icon` 属性可以显示图标，若指定一个图标组件，则会使用指定的图标。

:::

:::demo alert/colorful-text

### 有色的字体

添加 `colorful-text` 属性可以使警告的字体带有相应的颜色。

:::

:::demo alert/no-border

### 无边框

添加 `no-border` 属性可以禁用边框，在一些浅色调主题中可以让视觉效果更轻。

:::

:::demo alert/custom

### 自定义颜色

通过 `color` 属性可以定制化警告的主题色。

:::

:::demo alert/scroll

### 自动滚动

添加 `scroll` 属性可以使内容自动滚动，同时可以通过 `scroll-speed` 属性改变滚动速度。

:::

:::demo alert/carousel

### 轮播通知

这个示例展示了如何结合 Carousel 组件开发一个内容轮播的警告。

:::

## API

### 预设类型

```ts
type AlertType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
```

### Alert 属性

| 名称          | 类型                             | 说明                                                 | 默认值      | 始于     |
| ------------- | -------------------------------- | ---------------------------------------------------- | ----------- | -------- |
| type          | `AlertType`                      | 警告提示的类型                                       | `'primary'` | -        |
| title         | `string`                         | 设置警告提示标题，使用同名插槽后失效                 | `''`        | -        |
| colorful-text | `boolean`                        | 设置字体是否具有和类型一致的颜色                     | `false`     | -        |
| icon          | `boolean \| Record<string, any>` | 设置是否显示图标，可以直接传入图标进行显示           | `false`     | -        |
| closable      | `boolean`                        | 设置警告提示是否可以被关闭                           | `false`     | -        |
| icon-color    | `string`                         | 设置警告提示图标的颜色                               | `''`        | -        |
| no-border     | `boolean`                        | 设置是否禁用警告提示的边框                           | `false`     | -        |
| banner        | `boolean`                        | 设置是否作为顶部通告的形式，开启后样式会有相应的调整 | `false`     | -        |
| manual        | `boolean`                        | 设置在关闭警告时不自动收起                           | `false`     | `2.0.0`  |
| scroll        | `boolean`                        | 设置警告内容是否滚动                                 | `false`     | `2.0.4`  |
| scroll-speed  | `number`                         | 设置警告内容滚动的速度                               | `1`         | `2.0.4`  |
| color         | `string`                         | 设置警告的主题色                                     | `null`      | `2.2.23` |

### Alert 事件

| 名称       | 说明                   | 参数 | 始于    |
| ---------- | ---------------------- | ---- | ------- |
| close      | 当警告提示被关闭时触发 | -    | -       |
| hide       | 当警告提示消失时触发   | -    | -       |
| scroll-end | 每当一次滚动结束后触发 | -    | `2.0.4` |

### Alert 插槽

| 名称    | 说明                       | 参数 | 始于 |
| ------- | -------------------------- | ---- | ---- |
| default | 警告提示的内容插槽         | -    | -    |
| title   | 警告提示的标题内容插槽     | -    | -    |
| icon    | 警告提示的图标内容插槽     | -    | -    |
| close   | 警告提示的关闭按钮内容插槽 | -    | -    |
