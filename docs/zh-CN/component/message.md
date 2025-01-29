# Message 消息提示

常用于全局展示一些轻量级的交互反馈信息，如操作成功、失败等。

## 代码示例

:::demo message/basis

### 基础用法

通过 `open` 方法打开一条消息提醒。

该方法可以接收一个字符串或对象，传入字符串时将作为消息内容，传入对象可以更细粒度地控制消息属性。

:::

:::demo message/type

### 消息类型

通过调用不同的方法，可以便捷地打开预设好的消息类型。

目前组件共内置了四种预设类型，分别调用 `info`、`success`、`warning`、 `error` 四种方法打开。

:::

:::demo message/style

### 预设样式

设置 `color` 属性为 `true` 可以使预设类型的消息具有字体颜色。

设置 `background` 属性为 `true` 可以使预设类型的消息具有背景颜色。

当预设的颜色不满足需求时，可以传入一个有效的颜色值，实现颜色自定义。

:::

:::demo message/close

### 可关闭

设置 `closable` 属性为 `true` 可以使打开的消息可以手动关闭。

:::

:::demo message/duration

### 修改时长

设置 `duration` 属性可以调整消息的持续时间。

当设置为 `0` 时，消息将不会自动关闭，需要添加可关闭或者手动控制关闭。

:::

:::demo message/icon

### 自定义图标

设置 `icon` 属性可以设置消息的前置图标。

设置 `iconColor` 属性可以设置消息前置图标的颜色。

当需要更细粒度地控制图标时，可以设置 `icon` 属性为一个函数，传函数时为自定义渲染方法。

:::

:::demo message/render

### 渲染函数

通过 `renderer` 属性可以设置消息的自定义渲染方法。

通常配合 `tsx` 使用会更好。

:::

:::demo message/live-on-enter

### 移入时不消失

==!s|2.2.11==

设置 `liveOnEnter` 属性为 `true` 可以使消息被悬停时不会自动关闭。

悬停结束后自动关闭计时将重新开始。

:::

## API

### Message 方法

组件实例内提供了几种基础的打开消息的方法：

- `Message.open(content[, duration] | options)`
- `Message.primary(content[, duration] | options)`
- `Message.info(content[, duration] | options)`
- `Message.success(content[, duration] | options)`
- `Message.warning(content[, duration] | options)`
- `Message.error(content[, duration] | options)`

以及 1 个复合的打开消息的方法：

- `Message.judge(state, successContent | successOptions, errorContent | errorOptions[, duration])`

> 在使用组合式 api 时需要 `import { Message } from 'vexip-ui'` 后使用 `Message.open(...)`。

此外，还提供了两个手动关闭消息的方法：

- `Message.close(key)`
- `Message.clear()`

> 当直接调用 `Message.close()` 而不传入 key 时和 `Message.clear()` 效果相同。

在打开消息的方法调用后会返回一个函数，该函数可以用于手动关闭刚刚打开的消息：

```ts
const cancel = Message.open(options)

// 立即关闭该消息
cancel()
```

需要修改组件的默认属性值时，可以这样做：

```ts
// 除了选项值以外，还可以修改 placement 为 'top' | 'bottom' 来改变消息的位置
Message.config({ placement, ...options })
```

有时需要创建多个消息管理器以便于管理各类消息：

```ts
// 这是一个全新的消息组件
const myMessage = Message.clone()

myMessage.config({ placement: 'bottom' })
```

或者在引入组件时进行克隆：

```ts
import { createApp } from 'vue'
import { Message } from 'vexip-ui'

const myMessage = Message.clone()

myMessage.config({ placement: 'bottom' })
createApp().use(myMessage, { property: '$myMessage' })
```

某些场景下，需要在全屏元素上显示消息，此时可以将组件的渲染位置迁移：

```ts
Message.transferTo('#a-new-place')

// 重新迁移回 body
Message.transferTo(document.body)
```

### 预设类型

```ts
type MessageType = 'primary' | 'info' | 'success' | 'warning' | 'error'
```

### Message 选项

| 名称        | 类型                                 | 说明                                               | 默认值  | 始于     |
| ----------- | ------------------------------------ | -------------------------------------------------- | ------- | -------- |
| type        | `MessageType`                        | 消息的类型                                         | `null`  | -        |
| content     | `string`                             | 消息的内容                                         | `''`    | -        |
| key         | `number \| string`                   | 消息的唯一索引，不设置时将使用内置的索引           | `''`    | -        |
| className   | `string \| Record<string, unknown>`  | 消息的自定义类名                                   | `null`  | -        |
| style       | `Record<string, any>`                | 消息的内联样式                                     | `null`  | -        |
| duration    | `number`                             | 消息的持续毫秒，设置为小于 `500` 时则不会自动关闭  | `3000`  | -        |
| background  | `boolean \| string`                  | 是否显示背景颜色，传入有效颜色值时可以自定义颜色   | `false` | -        |
| color       | `boolean \| string`                  | 是否设置字体的颜色，传入有效颜色值时可以自定义颜色 | `false` | -        |
| closable    | `boolean`                            | 是否有关闭按钮进行关闭                             | `false` | -        |
| icon        | `Record<string, any> \| (() => any)` | 消息前缀的图标，传入函数时作为 render 函数渲染     | `null`  | -        |
| iconColor   | `string`                             | 前缀图标的颜色，设置后会覆盖 `type` 的默认设置     | `''`    | -        |
| renderer    | `() => any`                          | 使用 Vue 的 render 函数渲染自定义内容              | `null`  | -        |
| parseHtml   | `boolean`                            | 是否将 `content` 作为 html 解析                    | `false` | `2.0.14` |
| liveOnEnter | `boolean`                            | 使消息被悬停时不自动关闭                           | `false` | `2.2.11` |
