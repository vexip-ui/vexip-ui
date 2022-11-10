### Message Methods

There are 5 basic methods of opening a message within a component instance:

- `this.$message.open(content[, duration] | options)`
- `this.$message.info(content[, duration] | options)`
- `this.$message.success(content[, duration] | options)`
- `this.$message.warning(content[, duration] | options)`
- `this.$message.error(content[, duration] | options)`

And a composite method of opening the message:

- `this.$message.judge(state, successContent | successOptions, errorContent | errorOptions[, duration])`

> `Message.open(...)` is required after `import { Message } from 'vexip-ui'` when using the composition api.

In addition, two methods to manually close the message are provided:

- `this.$message.close(key)`
- `this.$message.clear()`

> When `this.$message.close()` is called directly without passing a key, it has the same effect as `this.$message.clear()`.

After the method call to open the message will return a function that can be used to manually close the message that was just opened:

```js
const cancel = this.$message.open(options)

// close the message immediately
cancel()
```

When you need to modify the default value of options, you can do this:

```js
// In addition to the option value, you can also modify placement
// to 'top' | 'bottom' to change the position of the message
this.$message.config({ placement, ...options })
```

Sometimes it is necessary to create multiple message managers to manage various types of messages:

```js
// This is a new message manager
const myMessage = this.$message.clone()

myMessage.config({ placement: 'bottom' })
```

Or clone when importing the component:

```js
import { createApp } from 'vue'
import { Message } from 'vexip-ui'

const myMessage = Message.clone()

myMessage.config({ placement: 'bottom' })
createApp().use(myMessage, { property: '$myMessage' })
```

### Message Options

| Name       | Type                                          | Description                                                                                                | Default | Since    |
| ---------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------- | -------- |
| type       | `'info' \| 'success' \| 'warning' \| 'error'` | The type of message                                                                                        | `''`    | -        |
| content    | `string`                                      | The content of the message                                                                                 | `''`    | -        |
| key        | `number \| string`                            | The unique index of the message, if not set, the built-in index will be used                               | `''`    | -        |
| className  | `string \| Record<string, unknown>`           | Custom class for the message                                                                               | `null`  | -        |
| style      | `Record<string, any>`                         | Inline style for the message                                                                               | `null`  | -        |
| duration   | `number`                                      | Message duration in milliseconds, set to less than `500` to not close automatically                        | `3000`  | -        |
| background | `boolean \| string`                           | Whether to display the background color, the color can be customized when a valid color value is passed in | `false` | -        |
| color      | `boolean \| string`                           | Whether to set the color of the font, you can customize the color when a valid color value is passed in    | `false` | -        |
| closable   | `boolean`                                     | Whether there is a close button to close                                                                   | `false` | -        |
| icon       | `Record<string, any> \| (() => any)`          | The prefix icon of message, rendered as render function when passed in function                            | `null`  | -        |
| iconColor  | `string`                                      | The color of the prefix icon, after setting it will override the default setting of `type`                 | `''`    | -        |
| renderer   | `() => any`                                   | Render custom content using Vue's render function                                                          | `null`  | -        |
| parseHtml  | `boolean`                                     | Whether to parse html, if enabled, the content of `content` will be parsed as html                         | `false` | `2.0.13` |
