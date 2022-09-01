### Message 方法

组件实例内提供了 5 种基础的打开消息的方法：

- `this.$message.open(content[, duration] | options)`
- `this.$message.info(content[, duration] | options)`
- `this.$message.success(content[, duration] | options)`
- `this.$message.warning(content[, duration] | options)`
- `this.$message.error(content[, duration] | options)`

以及 1 个复合的打开消息的方法：

- `this.$message.judge(state, successContent | successOptions, errorContent | errorOptions[, duration])`

> 在使用组合式 api 时需要 `import { Message } from 'vexip-ui'` 后使用 `Message.open(...)`。

此外，还提供了两个手动关闭消息的方法：

- `this.$message.close(key)`
- `this.$message.clear()`

> 当直接调用 `this.$message.close()` 而不传入 key 时和 `this.$message.clear()` 效果相同。

在打开消息的方法调用后会返回一个函数，该函数可以用于手动关闭刚刚打开的消息：

```js
const cancel = this.$message.open(options)

// 立即关闭该消息
cancel()
```

需要修改组件的默认属性值时，可以这样做：

```js
// 除了选项值以外，还可以修改 placement 为 'top' | 'bottom' 来改变消息的位置
this.$message.config({ placement, ...options })
```

有时需要创建多个消息管理器以便于管理各类消息：

```js
// 这是一个全新的消息组件
const myMessage = this.$message.clone()

myMessage.config({ placement: 'bottom' })
```

或者在引入组件时进行克隆：

```js
import { createApp } from 'vue'
import { Message } from 'vexip-ui'

const myMessage = Message.clone()

myMessage.config({ placement: 'bottom' })
createApp().use(myMessage, { property: '$myMessage' })
```

### Message 选项

| 名称       | 类型                                          | 说明                                                 | 默认值  | 始于 |
| ---------- | --------------------------------------------- | ---------------------------------------------------- | ------- | ---- |
| type       | `'info' \| 'success' \| 'warning' \| 'error'` | 消息的类型                                           | `''`    | -    |
| content    | `string`                                      | 消息的内容                                           | `''`    | -    |
| key        | `number \| string`                            | 消息的唯一索引，不设置时将使用内置的索引             | `''`    | -    |
| parseHtml  | `boolean`                                     | 是否解析 html，开启则将 `content` 内容作为 html 解析 | `false` | -    |
| className  | `string \| Record<string, unknown>`           | 消息的自定义类名                                     | `null`  | -    |
| style      | `Record<string, any>`                         | 消息的内联样式                                       | `null`  | -    |
| duration   | `number`                                      | 消息的持续毫秒，设置为小于 `500` 时则不会自动关闭    | `3000`  | -    |
| background | `boolean \| string`                           | 是否显示背景颜色，传入有效颜色值时可以自定义颜色     | `false` | -    |
| color      | `boolean \| string`                           | 是否设置字体的颜色，传入有效颜色值时可以自定义颜色   | `false` | -    |
| closable   | `boolean`                                     | 是否有关闭按钮进行关闭                               | `false` | -    |
| icon       | `Record<string, any> \| (() => any)`          | 消息前缀的图标，传入函数时作为 render 函数渲染       | `null`  | -    |
| iconColor  | `string`                                      | 前缀图标的颜色，设置后会覆盖 `type` 的默认设置       | `''`    | -    |
| renderer   | `() => any`                                   | 使用 Vue 的 render 函数渲染自定义内容                | `null`  | -    |
