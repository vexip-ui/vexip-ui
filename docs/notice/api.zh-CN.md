## API

### 方法

组件实例内提供了 5 种基础的打开提示的方法：

- `this.$notice.open(title[, content][, duration] | options)`
- `this.$notice.info(title[, content][, duration] | options)`
- `this.$notice.success(title[, content][, duration] | options)`
- `this.$notice.warning(title[, content][, duration] | options)`
- `this.$notice.error(title[, content][, duration] | options)`

以及 1 个复合的打开消息的方法：

- `this.$message.judge(state, successTitle | successOptions, errorTitle | errorOptions[, duration])`

> 在使用组合式 api 时需要 `import { Notice } from 'vexip-ui'` 后使用 `Notice.open(...)`。

此外，还提供了两个手动关闭提示的方法：

- `this.$notice.close(key)`
- `this.$notice.clear()`

> 当直接调用 `this.$notice.close()` 而不传入 key 时和 `this.$notice.clear()` 效果相同。

在打开提示的方法调用后会返回一个函数，该函数可以用于手动关闭刚刚打开的提示：

```js
const cancel = this.$notice.open(options)

// 立即关闭该提示
cancel()
```

需要修改组件的默认属性值时，可以这样做：

```js
// 除了选项值以外，还可以修改 placement 为 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' 来改变提示的位置
this.$notice.config({ placement, ...options })
```

甚至，有时需要创建多个提示管理器以便于管理各类提示：

```js
// 这是一个全新的提示组件
const myNotice = this.$notice.clone()

myNotice.config({ placement: 'bottom-right' })
```

或者在按需引入组件时进行克隆：

```js
import { createApp } from 'vue'
import { Notice } from 'vexip-ui'

const myNotice = Notice.clone()

myNotice.config({ placement: 'bottom-right' })
createApp().use(myNotice, { property: '$myNotice' })
```

### 选项

| 属性       | 类型                         | 说明                                                                                     | 默认值 |
| ---------- | ---------------------------- | ---------------------------------------------------------------------------------------- | ------ |
| type       | String                       | 内置的类型，可选值为 `info`、`success`、`warning`、`error`                               | -      |
| title      | String                       | 提示的标题                                                                               | -      |
| content    | String                       | 提示的内容                                                                               | -      |
| key        | Number \| String             | 提示的唯一索引，不设置时将使用内置的索引                                                 | -      |
| parseHtml  | Boolean                      | 是否解析 html，开启则将 title 和 content 内容作为 html 解析                              | false  |
| className  | String \| Object             | 提示的自定义类名                                                                         | null   |
| style      | Object                       | 提示的内联样式                                                                           | null   |
| duration   | Number                       | 提示的持续毫秒，设置为小于 500 时则不会自动关闭                                          | 4000   |
| background | Boolean \| String            | 是否显示背景颜色，传入有效颜色值时可以自定义颜色                                         | false  |
| color      | Boolean \| String            | 是否设置字体的颜色，传入有效颜色值时可以自定义颜色                                       | false  |
| titleColor | String                       | 单独设置提示标题字体的颜色                                                               | -      |
| closable   | Boolean                      | 是否有关闭按钮进行关闭                                                                   | false  |
| icon       | String \| Object \| Function | 提示前缀的图标，传入对象时每个属性会对应 Icon 组件的属性，传入函数时使用 render 函数渲染 | -      |
| iconColor  | String                       | 前缀图标的颜色，设置后会覆盖 type 的默认设置                                             | -      |
| renderer   | Function                     | 使用 Vue 的 render 函数渲染自定义内容                                                    | null   |
| marker     | Boolean                      | 是否显示侧边 marker                                                                      | true   |
