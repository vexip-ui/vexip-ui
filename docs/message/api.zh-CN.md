## API

### 方法

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

甚至，有时需要创建多个消息管理器以便于管理各类消息：

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

### 选项

| 属性       | 类型                         | 说明                                                                                     | 默认值 |
| ---------- | ---------------------------- | ---------------------------------------------------------------------------------------- | ------ |
| type       | String                       | 内置的类型，可选值为 `info`、`success`、`warning`、`error`                               | -      |
| content    | String                       | 消息的内容                                                                               | -      |
| key        | Number \| String             | 消息的唯一索引，不设置时将使用内置的索引                                                 | -      |
| parseHtml  | Boolean                      | 是否解析 html，开启则将 content 内容作为 html 解析                                       | false  |
| className  | String \| Object             | 消息的自定义类名                                                                         | null   |
| style      | Object                       | 消息的内联样式                                                                           | null   |
| duration   | Number                       | 消息的持续毫秒，设置为小于 500 时则不会自动关闭                                          | 3000   |
| background | Boolean \| String            | 是否显示背景颜色，传入有效颜色值时可以自定义颜色                                         | false  |
| color      | Boolean \| String            | 是否设置字体的颜色，传入有效颜色值时可以自定义颜色                                       | false  |
| closable   | Boolean                      | 是否有关闭按钮进行关闭                                                                   | false  |
| icon       | String \| Object \| Function | 消息前缀的图标，传入对象时每个属性会对应 Icon 组件的属性，传入函数时使用 render 函数渲染 | -      |
| iconColor  | String                       | 前缀图标的颜色，设置后会覆盖 type 的默认设置                                             | -      |
| renderer   | Function                     | 使用 Vue 的 render 函数渲染自定义内容                                                    | null   |
